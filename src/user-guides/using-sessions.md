# Using Sessions

Currently the main intended mechanism for using sessions is by using the
`@fogo/sessions-sdk-react` typescript package.

You can see a sample of a nextjs app that uses sessions
[here](https://github.com/fogo-foundation/sessions-example), or an example of a
Vite application that uses sessions
[here](https://github.com/fogo-foundation/sessions-example-vite).

To use the sdk to create a React app that uses sessions, you'll primarily use the following APIs:

- `<FogoSessionProvider />`: This component sets up the React app to be able to
  use Sessions, and it adds the necessary context and modal components for users
  to be able to go through the flow of creating, interacting with, and managing
  an app session.  This component takes the following props:
  - `sponsor`: the public key of the paymaster sponsor account.  Soon, public
    paymasters will be available and this prop will not be required.  Until
    then, use `8HnaXmgFJbvvJxSdjeNyWwMXZb85E35NM4XNg6rxuw3w`
  - `paymasterUrl`: the URL of the paymaster.  Again, this prop will soon not be
    necessary once public paymasters are available; in the meantime use
    `https://sessions-example.fogo.io/paymaster`.
  - `domain`: Fogo Sessions includes a mapping indicating which domains are
    allowed to access which contracts.  This prop should be `undefined` if
    `NODE_ENV === 'production'`, but in lower environments, it allows you to
    override the domain in the intent message so you can create sessions for
    your production contracts.
  - `endpoint`: The RPC url for Fogo
  - `tokens`: An array of token mint addresses which this app may request
    permissions for
  - `defaultRequestedLimits`: An object or map that maps token mints to
    requested amounts.  When establishing the session, if you aren't passing a
    specific set of requested limits in the button or callback that requests
    establishing the session, then these are the limits that the user will be
    asked to approve the app to access.
- `<SessionButton />`: This component adds a button to the page which enables
  users to connect to the app using Sessions.  When connected, the button opens
  a panel that allows users to see and interact with their wallet balances, and
  to manage, extend, or clear the session.  This component accepts the following
  props:
  - `requestedLimits`: if you want to prompt users for trading limits that
    differ from `defaultRequestedLimits` when clicking this button, then you can
    pass the limits you want to request here.
- `useSession()`: This hook returns the current state of the session.  The
  return type is a discriminated union of possible states, and if the session is
  in an established state, it includes session information like the session key,
  wallet public key, and a function `sendTransaction` which takes an array of
  web3.js `TransactionInstruction` objects, packages the transaction, and sends
  it to the paymaster (and then to the chain).  Here are some props of the
  object returned from `useSession` depending on the state:
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
  
Here's a simple example of setting up the context for the app:

```tsx
export default ({ children, }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <FogoSessionProvider
        sponsor="8HnaXmgFJbvvJxSdjeNyWwMXZb85E35NM4XNg6rxuw3w"
        paymasterUrl="https://sessions-example.fogo.io/paymaster"
        domain={process.env.NODE_ENV === "production" ? undefined : "https://foo.bar"}
        endpoint="https://testnet.fogo.io/"
        tokens={[NATIVE_MINT.toBase58()]}
        defaultRequestedLimits={{
          [NATIVE_MINT.toBase58()]: 1_500_000_000n,
        }}
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
