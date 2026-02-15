# Integrating Fogo Sessions

Within the Sessions ecosystem, each app is identified by their base URL aka its domain (for example https://sessions-example.fogo.io).

Integrating Fogo Sessions requires the following steps:
- Registering your domain in the paymaster server.
- Setting up your domain's program registry: these are the custom program ids that the sessions for your domain are allowed to interact with.
- Setting up your paymaster filters.
- Upgrade your program to accept instructions signed by session keys 
- Update your frontend to use the FogoSessionProvider.

https://sessions-example.fogo.io is a working example that integrates Fogo Sessions and may be used as a starting point or reference. It uses the pre-configured domain https://sessions-example.fogo.io. Its program registry uniquely contains the program id Examtz9qAwhxcADNFodNA2QpxK7SM9bCHyiaUvWvFBM3 and its paymaster filters will only accept either transactions involving creating or revoking sessions or calling the ExampleTransfer instruction of Examtz9qAwhxcADNFodNA2QpxK7SM9bCHyiaUvWvFBM3.

- The frontend code for the example app can be found: 
- The example program can be found

## Registering your domain in the paymaster server

Currently this is a permissioned step, please contact the Fogo team with your domain's base URL.

The paymaster API is available at:
- https://fogo-testnet.dourolabs-paymaster.xyz/ for testnet
- https://fogo-mainnet.dourolabs-paymaster.xyz/ for mainnet

Once registered, the call to https://fogo-testnet.dourolabs-paymaster.xyz/api/sponsor_pubkey?domain=https://sessions-example.fogo.io should be succesful (replace https://sessions-example.fogo.io by your domain).

## Setting up your paymaster filters

Link to the paymaster runbook.

## Setting up your domain program registry

Currently this is a permissioned step, please contact the Fogo team with your program ids and any time you need to add another program id.

## Upgrade your program to accept instructions signed by session keys

In SVM programs, it is common to check whether the user's wallet is a signer to manage permissioned instruction calls. As explained in the Deep Dive, this is not the case in sessions. The fogo-sessions-sdk crate provides the helper Session::extract_user_from_signer_or_session. This helper takes in an AccountInfo and your program's program id, checks that the AccountInfo is a signer and will return:
- The user public key that has delegated permissions to the session if the account was a valid session account
- The account public key if the account was a signer but not a session account
- An error if the account was an invalid sessions account (for example if the session is expired or the session was not intended to interact with the current program).

In-session token transfers, in addition to requiring a valid session for the token owner to sign the instruction may only occur as CPIs from an authorized program. This is a security measure aiming to restrict the scope of token transfers a session may do.

For the token program to verify that its being called with these requirements, it will check that a PDA of an authorized program with seeds `fogo_session_program_signer` has signed the transfer. Helpers to craft transfer (and burn) instructions are available in the sdk in fogo_sessions_sdk::token::instruction.

## Updating your frontend

Currently the main intended mechanism for using sessions is by using the
`@fogo/sessions-sdk-react` typescript package.

Refer to the following example apps:
- [NextJS Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example)
- [Vite Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example-vite)

## React API

### `<FogoSessionProvider />`

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

### `<SessionButton />`

The `<SessionButton />` component adds a button to the page which enables users
to connect to the app using Fogo Sessions. When connected, the button opens a
panel that allows users to see and interact with their wallet balances, and to
manage, extend, or clear the session.

The component accepts the following props:

- `requestedLimits`: if you want to prompt users for trading limits that
  differ from `defaultRequestedLimits` when clicking this button, then you can
  pass the limits you want to request here.

### `useSession()`

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
  - `useSession().sendTransaction()`: Pass a list of `TransactionInstruction`
    objects to this function to send the transaction to the paymaster, and
    then on to the chain.
  - `useSession().payer`: The public key of the paymaster sponsor
  - `useSession().endSession()`: Call this to destroy the session key and end
    the session

## Context Setup

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
