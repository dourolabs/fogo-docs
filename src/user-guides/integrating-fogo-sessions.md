# Integrating Fogo Sessions

Within the Sessions ecosystem, each app is identified by their base URL aka its **domain** (for example `https://sessions-example.fogo.io`).

Integrating Fogo Sessions requires the following steps:
- [Creating an account in the paymaster server](/user-guides/integrating-fogo-sessions#creating-an-account-in-the-paymaster-server) for your **domain**
- [Setting up your domain's program **registry**](/user-guides/integrating-fogo-sessions#setting-up-your-domain-s-program-registry): this is an on-chain account that contains the program ids that the sessions for your domain are allowed to interact with
- [Setting up your paymaster **filters**](/user-guides/integrating-fogo-sessions#setting-up-your-paymaster-filters): these define the set of transactions your app's paymaster wallet is willing to sponsor
- [Upgrading your on-chain program](/user-guides/integrating-fogo-sessions#upgrading-your-on-chain-program) to accept instructions signed by session keys
- [Updating your frontend](/user-guides/integrating-fogo-sessions#updating-your-frontend) to support Sessions

https://sessions-example.fogo.io hosts a working example that integrates Fogo Sessions and may be used as a starting point or reference
- Its program registry uniquely contains the program id `Examtz9qAwhxcADNFodNA2QpxK7SM9bCHyiaUvWvFBM3`. 
- Its paymaster filters will only accept either transactions involving session management or calling the `ExampleTransfer` instruction of `Examtz9qAwhxcADNFodNA2QpxK7SM9bCHyiaUvWvFBM3`
- The example program can be found [here](https://github.com/fogo-foundation/fogo-sessions/tree/main/programs/example)
- The frontend code for the example app can be found [here](https://github.com/fogo-foundation/sessions-example)

## Creating an account in the paymaster server

Currently this is a permissioned step, please contact the Fogo team with your domain's base URL.

The paymaster API is available at:
- https://fogo-testnet.dourolabs-paymaster.xyz/ for testnet
- https://fogo-mainnet.dourolabs-paymaster.xyz/ for mainnet

Once your domain is registered, the API call to https://fogo-testnet.dourolabs-paymaster.xyz/api/sponsor_pubkey?domain=https://sessions-example.fogo.io should be succesful (replace `https://sessions-example.fogo.io` by your domain).

## Setting up your domain's program registry

Currently this is a permissioned step, please contact the Fogo team with your program ids and any time you need to add another program id or would like to remove an outdated program id.

## Setting up your paymaster filters

The [paymaster runbook](https://dourolabs.notion.site/paymaster-runbook) is a great resource to learn about how to set up the filters and protect your paymaster wallet from being drained.

## Upgrading your on-chain program

Check out the [example program](https://github.com/fogo-foundation/fogo-sessions/tree/main/programs/example) for an example of a program that integrates Sessions using [`fogo-sessions-sdk`](https://crates.io/crates/fogo-sessions-sdk).

### Resolving the user's wallet public key

In SVM programs, it is common to check whether the user's wallet is a signer to authenticate them in permissioned instruction calls. In Sessions, a session key signs the instruction instead of the user's wallet. The [`fogo-sessions-sdk` crate](https://crates.io/crates/fogo-sessions-sdk) provides the helper function [`Session::extract_user_from_signer_or_session`](https://docs.rs/fogo-sessions-sdk/latest/fogo_sessions_sdk/session/struct.Session.html#method.extract_user_from_signer_or_session) to resolve the user's wallet public key from a session account. 

This helper takes in an `AccountInfo` and your program's program id, checks that the `AccountInfo` is a signer and will return:
- The public key that has delegated permissions to the session if the account is a valid session account
- The public key of the `AccountInfo` if the account was a signer but not a session account
- An error if the account was an invalid sessions account (for example if the session is expired or the session was not intended to interact with the current program because the program is not in the domain's [domain registry](/user-guides/integrating-fogo-sessions#setting-up-your-domain-s-program-registry)).

### Making token transfers 

In-session token transfers, in addition to requiring a valid session for the owner of the token account to sign the instruction, may only occur as CPIs from an **authorized program** (a program that is present in the [domain registry](/user-guides/integrating-fogo-sessions#setting-up-your-domain-s-program-registry) for the app). This is a security measure aiming to restrict the scope of token transfers a session may do.

For the token program to verify that its being called with these requirements, it will check that a PDA of an authorized program with seeds [`fogo_session_program_signer`](https://docs.rs/fogo-sessions-sdk/latest/fogo_sessions_sdk/token/constant.PROGRAM_SIGNER_SEED.html) has signed the transfer. Helpers to craft transfer (and burn) instructions are available in the sdk in [`fogo_sessions_sdk::token::instruction`](https://docs.rs/fogo-sessions-sdk/latest/fogo_sessions_sdk/token/instruction/index.html).

## Updating your frontend

Currently the main intended mechanism for using sessions is by using the
`@fogo/sessions-sdk-react` typescript package.

Refer to the following example apps:
- [NextJS Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example)
- [Vite Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example-vite)

### React API

#### `<FogoSessionProvider />`

The `<FogoSessionProvider />` component sets up the React app to be able to use
Fogo Sessions, and adds the necessary context and modal components for creating,
interacting with, and managing an app session.

The component takes the following props:

- `network`: Whether this app is for Fogo Testnet or Fogo Mainnet.
- `domain`: Fogo Sessions includes a mapping indicating which domains are
  allowed to access which contracts.  This prop should be `undefined` if
  `NODE_ENV === 'production'`, but in lower environments, it allows you to
  override the domain in the intent message so you can create sessions for your
  production contracts.
- `tokens`: An array of token mint addresses which this app may request
  permissions for
- `defaultRequestedLimits`: An object or map that maps token mints to
  requested amounts.  When establishing the session, if you aren't passing a
  specific set of requested limits in the button or callback that requests
  establishing the session, then these are the limits that the user will be
  asked to approve the app to access.
- `enableUnlimited`: Whether this app can request sessions without token limits.

#### `<SessionButton />`

The `<SessionButton />` component adds a button to the page which enables users
to connect to the app using Fogo Sessions. When connected, the button opens a
panel that allows users to see and interact with their wallet balances, and to
manage, extend, or clear the session.

The component accepts the following props:

- `requestedLimits`: if you want to prompt users for trading limits that
  differ from `defaultRequestedLimits` when clicking this button, then you can
  pass the limits you want to request here.

#### `useSession()`

This hook returns the current state of the session. The return type is a
discriminated union of possible states, and if the session is in an established
state, it includes session information like the session key, wallet public key,
and a function `sendTransaction` which takes an array of web3.js
`TransactionInstruction` objects, packages the transaction, and sends it to the
paymaster (and then to the chain).

The object returned from `useSession` includes different props depending on the
current state:

- When `useSession().type === SessionStateType.NotEstablished`:
  - `useSession().establish(requestedLimits)`: Start the flow to establish a
    new session.  Optionally pass `requestedLimits` to override
    `defaultRequestLimits` in the context if you want to request specific
    limits from the user in this instance.

- When the session is in one of the established states (you can use
  `isEstablished` to determine this):
  - `useSession().walletPublicKey`: The public key of the wallet that created
    the session
  - `useSession().sessionPublicKey`: The public key of the session
  - `useSession().expiration`: The `Date` of expiration of the session
  - `useSession().sendTransaction()`: Pass a list of `TransactionInstruction`
    objects to this function to send the transaction to the paymaster. See the next section for more
  - `useSession().payer`: The public key of the paymaster sponsor
  - `useSession().endSession()`: Call this to destroy the session key and end
    the session
  - `useSession().getSessionWrapInstructions()`: This function returns a set of instructions such that after executing, the user will have at least `amount` Wrapped FOGO tokens that the session may subsequently use (sessions don't have access to the users native balance directly). This is useful if you need your app to interact with the user's FOGO balance.
  - `useSession().getSessionUnwrapInstructions()`: This function returns a set of instructions such that after executing, the user will have no Wrapped FOGO, in other words, all the user's FOGO balance will be unwrapped. By convention, this should be called at the end of any transaction where the user may receive Wrapped FOGO, so that FOGO in users' wallets is fully unwrapped "at rest".

### `sendTransaction`

`sendTransaction` accepts the instructions to send to the paymaster in the following formats:
- an array of `@solana/web3.js` `TransactionInstruction`
- an array of `@solana/kit` `Instruction`
- a `@solana/web3.js` `VersionedTransaction`
- a `@solana/kit` `Transaction & TransactionWithLifetime`

Moreover, this method can be configured by passing a `SendTransactionOptions` object as the second argument with the following keys:
- `variation` gives the paymaster server a hint of which transaction filter to match against, resulting in better error messages if the paymaster server rejects the transaction
- `feeMint`: in which mint to charge the paymaster fee to the user if the paymaster is configured to charge a fee. Currently Wrapped FOGO and USDC are supported. This field, in combination with `variation` (which is also required in this scenario) will help the client generate the instruction that transfers the paymaster fee from the user to the paymaster. This instruction may also be crafted manually and passed to `sendTransaction` by using `createPaymasterFeeInstruction` in [`@fogo/sessions-sdk`](https://www.npmjs.com/package/@fogo/sessions-sdk)
- `extraSigners`: extra signers that will be used to sign the transaction before being sent to the paymaster
- `addressLookupTable`: a custom address lookup table to be used by the transaction to be sent to the paymaster

Note that `feeMint`, `extraSigners` and `addressLookupTable` will only have an effect if `sendTransaction` receives an array of instructions and not a transaction since editing the transaction would invalidate any pre-existing signatures.

### Context Setup

The following example demonstrates setting up the context for the app:

```tsx
export default ({ children, }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <FogoSessionProvider
        network={Network.Testnet}
        domain={process.env.NODE_ENV === "production" ? undefined : "https://sessions-example.fogo.io"}
        tokens={[NATIVE_MINT.toBase58(), "fUSDNGgHkZfwckbr5RLLvRbvqvRcTLdH9hcHJiq4jry"]}
        defaultRequestedLimits={{
          [NATIVE_MINT.toBase58()]: 1_500_000_000n,
          "fUSDNGgHkZfwckbr5RLLvRbvqvRcTLdH9hcHJiq4jry": 1_000_000_000n
        }}
        enableUnlimited
      >
        <header>
          <h1>Fogo Sessions Example</h1>
          <SessionButton />
        </header>
        <hr />
        <main>
          {children}
        </main>
      </FogoSessionProvider>
    </body>
  </html>
);
```
