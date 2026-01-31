# Integrating Fogo Sessions

Fogo provides multiple SDKs for integrating Fogo Sessions into your applications. For most web applications using React, the **React SDK** (`@fogo/sessions-sdk-react`) is the recommended choice as it provides the most complete and user-friendly integration. For non-React web applications or Node.js backends, the **Web SDK** (`@fogo/sessions-sdk-web`) and **TypeScript SDK** (`@fogo/sessions-sdk`) are available. For on-chain programs written in Rust, use the **Rust SDK** (`fogo-sessions-sdk`).

Refer to the following example apps:
- [NextJS Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example)
- [Vite Fogo Sessions Example](https://github.com/fogo-foundation/sessions-example-vite)

## Choosing the Right SDK

### React SDK (Recommended for Web Apps)
**NPM Package**: `@fogo/sessions-sdk-react` (latest: v0.0.25)

Use this SDK if you're building a React-based web application. It provides:
- Pre-built UI components (`<SessionButton />`)
- React hooks (`useSession()`) for session state management
- Automatic wallet integration
- Built-in session persistence and management

**When to use**: React applications (Next.js, Create React App, Vite, etc.)

### Web SDK
**NPM Package**: `@fogo/sessions-sdk-web` (latest: v0.0.10)

Use this SDK for browser-based applications that don't use React. It provides:
- Session storage utilities using IndexedDB
- Framework-agnostic session management
- Browser-compatible cryptographic operations

**When to use**: Vanilla JavaScript, Vue.js, Svelte, or other non-React web frameworks

### TypeScript SDK
**NPM Package**: `@fogo/sessions-sdk` (latest: v0.0.16)

Use this SDK for Node.js backends or when you need low-level session control. It provides:
- Core session establishment and management functions
- Transaction signing and submission
- Session account queries
- Adapter pattern for custom wallet integrations

**When to use**: Node.js servers, custom integrations, or when you need direct control over session lifecycle

### Rust SDK
**Crate**: `fogo-sessions-sdk` (latest: v0.6.1)

Use this SDK when writing Solana programs (smart contracts) that need to interact with Fogo Sessions. It provides:
- Session validation in on-chain programs
- CPI (Cross-Program Invocation) helpers
- Session account deserialization

**When to use**: Solana/SVM programs written in Rust (Anchor or native)

## React SDK API Reference

### `<FogoSessionProvider />`

The `<FogoSessionProvider />` component sets up the React app to be able to use Fogo Sessions, and adds the necessary context and modal components for creating, interacting with, and managing an app session. It should wrap your entire application or the portion that needs access to sessions.

#### Required Props

- **`endpoint`**: `string` - The RPC URL for Fogo (e.g., `"https://testnet.fogo.io/"`)
- **`tokens`**: `string[]` - Array of SPL token mint addresses that your app may request permissions for

#### Optional Props

- **`domain`**: `string | undefined` - Override the domain in the intent message. This should be `undefined` in production (`NODE_ENV === 'production'`), but in development/staging environments it allows you to create sessions for your production contracts while testing on localhost or staging domains.

- **`defaultRequestedLimits`**: `Record<string, bigint> | Map<string, bigint>` - Maps token mint addresses to requested amounts (in base units). When establishing a session, these are the default limits the user will be asked to approve unless overridden by `requestedLimits` on the button or in the `establish()` call.

- **`enableUnlimited`**: `boolean` - When `true`, allows users to grant unlimited spending permissions for tokens. Use with caution and only when appropriate for your use case.

- **`sponsor`**: `string` - The public key of the paymaster sponsor account. Currently defaults to a public sponsor if not provided. This prop is optional as public paymasters are now available.

- **`paymasterUrl`**: `string` - The URL of the paymaster service. Defaults to the public paymaster if not provided. This prop is optional as public paymasters are now available.

### `<SessionButton />`

The `<SessionButton />` component renders a button that enables users to connect to your app using Fogo Sessions. When not connected, clicking the button initiates the session establishment flow. When connected, it opens a panel showing wallet balances and provides options to manage, extend, or clear the session.

#### Props

- **`requestedLimits`**: `Record<string, bigint> | Map<string, bigint>` *(optional)* - Override the `defaultRequestedLimits` from the provider for this specific button. Use this when you want to request different spending limits than the default (e.g., a "Trade 1 SOL" button vs "Trade 10 SOL" button).

### `useSession()`

This hook returns the current state of the session. The return type is a discriminated union based on `SessionStateType`, providing type-safe access to session data and methods based on the current state.

#### Return Value

The hook returns an object with different properties depending on the session state. Use the `type` property or the `isEstablished()` helper function to determine which state you're in.

#### When Not Established (`SessionStateType.NotEstablished`)

- **`type`**: `SessionStateType.NotEstablished`
- **`establish(requestedLimits?)`**: `(requestedLimits?: Record<string, bigint> | Map<string, bigint>) => void` - Initiates the session establishment flow. Optionally pass `requestedLimits` to override the `defaultRequestedLimits` from the provider.

#### When Established (check with `isEstablished(sessionState)`)

- **`type`**: `SessionStateType.Established` | `SessionStateType.Refreshing` | other established variants
- **`walletPublicKey`**: `PublicKey` - The public key of the user's wallet that created the session
- **`sessionPublicKey`**: `PublicKey` - The public key of the session account
- **`payer`**: `PublicKey` - The public key of the paymaster sponsor paying for transactions
- **`connection`**: `Connection` - The Solana RPC connection instance
- **`sendTransaction(instructions)`**: `(instructions: TransactionInstruction[]) => Promise<TransactionResult>` - Sends a transaction with the provided instructions through the paymaster. Returns a promise that resolves with the transaction result.
- **`endSession()`**: `() => void` - Destroys the session key and ends the current session

#### Helper Functions

- **`isEstablished(sessionState)`**: Type guard function to check if a session is in an established state. Use this for TypeScript type narrowing.

## React SDK Usage Examples

### Basic Setup

Install the React SDK:

```bash
npm install @fogo/sessions-sdk-react @solana/web3.js @solana/spl-token
```

Set up the provider in your app layout:

```tsx
import { FogoSessionProvider, SessionButton } from "@fogo/sessions-sdk-react";
import { NATIVE_MINT } from "@solana/spl-token";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <FogoSessionProvider
        endpoint="https://testnet.fogo.io/"
        tokens={[
          NATIVE_MINT.toBase58(), // FOGO SPL token
          "fUSDNGgHkZfwckbr5RLLvRbvqvRcTLdH9hcHJiq4jry" // fUSD stablecoin
        ]}
        defaultRequestedLimits={{
          [NATIVE_MINT.toBase58()]: 1_500_000_000n, // 1.5 FOGO
          "fUSDNGgHkZfwckbr5RLLvRbvqvRcTLdH9hcHJiq4jry": 1_000_000_000n // 1 fUSD
        }}
        domain={process.env.NODE_ENV === "production" ? undefined : "https://sessions-example.fogo.io"}
        enableUnlimited
      >
        <header>
          <h1>My Fogo App</h1>
          <SessionButton />
        </header>
        <main>{children}</main>
      </FogoSessionProvider>
    </body>
  </html>
);
```

### Using the Session in Components

```tsx
"use client"

import { useSession, isEstablished, type EstablishedSessionState } from "@fogo/sessions-sdk-react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, NATIVE_MINT } from "@solana/spl-token";

export default function TradingComponent() {
  const sessionState = useSession();

  if (!isEstablished(sessionState)) {
    return <div>Please connect your wallet to start trading</div>;
  }

  return <TradeButton sessionState={sessionState} />;
}

function TradeButton({ sessionState }: { sessionState: EstablishedSessionState }) {
  const handleTrade = async () => {
    try {
      // Create your transaction instructions
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: sessionState.sessionPublicKey, isSigner: true, isWritable: false },
          { pubkey: sessionState.walletPublicKey, isSigner: false, isWritable: true },
          // ... other account keys
        ],
        programId: new PublicKey("YourProgramId"),
        data: Buffer.from([/* your instruction data */])
      });

      // Send the transaction through the session
      const result = await sessionState.sendTransaction([instruction]);
      
      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <button onClick={handleTrade}>
      Execute Trade
    </button>
  );
}
```

## TypeScript SDK API Reference

The TypeScript SDK (`@fogo/sessions-sdk`) provides core session management functionality for Node.js backends and custom integrations.

### Installation

```bash
npm install @fogo/sessions-sdk @solana/web3.js
```

### Core Functions

#### `establishSession(options)`

Creates a new Fogo session by signing an intent message and creating a session account on-chain.

**Parameters:**
- `adapter`: `SessionAdapter` - Adapter for interacting with the blockchain (e.g., from `createSolanaWalletAdapter()`)
- `walletPublicKey`: `PublicKey` - The user's wallet public key
- `signMessage`: `(message: Uint8Array) => Promise<Uint8Array>` - Function to sign the intent message
- `expires`: `Date` - Session expiration date
- `extra?`: `Record<string, string>` - Optional metadata to store with the session
- `createUnsafeExtractableSessionKey?`: `boolean` - Allow extracting the session private key (for advanced use cases)
- Either:
  - `limits?`: `Map<PublicKey, bigint>` - Spending limits per token
  - `unlimited`: `true` - Enable unlimited spending (use with caution)

**Returns:** `Promise<EstablishSessionResult>` - Contains the session key and public key

#### `replaceSession(options)`

Replaces an existing session with updated limits or expiration.

**Parameters:** Similar to `establishSession` but includes:
- `session`: `Session` - The existing session to replace

#### `revokeSession(options)`

Revokes a session by closing the session account on-chain.

**Parameters:**
- `adapter`: `SessionAdapter`
- `session`: `Session` - The session to revoke

#### `reestablishSession(adapter, walletPublicKey, sessionKey)`

Restores a session from a stored session key (e.g., from browser storage).

**Parameters:**
- `adapter`: `SessionAdapter`
- `walletPublicKey`: `PublicKey`
- `sessionKey`: `CryptoKeyPair` - Previously stored session key pair

**Returns:** `Promise<Session | undefined>` - The restored session if valid

#### `getSessionAccount(connection, sessionPublicKey)`

Queries on-chain session account data.

**Parameters:**
- `connection`: `Connection` - Solana RPC connection
- `sessionPublicKey`: `PublicKey` - Session account public key

**Returns:** Promise with session account data including authorized programs, tokens, expiration, etc.

### Example: Node.js Backend

```typescript
import { establishSession, createSolanaWalletAdapter } from "@fogo/sessions-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { sign } from "@noble/ed25519";

const connection = new Connection("https://testnet.fogo.io");
const wallet = Keypair.generate(); // In practice, load from secure storage

const adapter = createSolanaWalletAdapter(connection);

const sessionResult = await establishSession({
  adapter,
  walletPublicKey: wallet.publicKey,
  signMessage: async (message) => {
    return sign(message, wallet.secretKey.slice(0, 32));
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  limits: new Map([
    [new PublicKey("So11111111111111111111111111111111111111112"), 1_000_000_000n] // 1 FOGO SPL
  ])
});

console.log("Session created:", sessionResult.sessionPublicKey.toBase58());
```

## Web SDK API Reference

The Web SDK (`@fogo/sessions-sdk-web`) provides browser-specific utilities for session persistence using IndexedDB.

### Installation

```bash
npm install @fogo/sessions-sdk-web @solana/web3.js
```

### Functions

#### `getStoredSession(walletPublicKey)`

Retrieves a stored session from browser storage.

**Parameters:**
- `walletPublicKey`: `PublicKey` - The wallet's public key

**Returns:** `Promise<{ walletPublicKey: PublicKey; sessionKey: CryptoKeyPair } | undefined>`

#### `setStoredSession(sessionData)`

Stores a session in browser storage (IndexedDB).

**Parameters:**
- `sessionData`: Object containing:
  - `walletPublicKey`: `PublicKey`
  - `sessionKey`: `CryptoKeyPair`

**Returns:** `Promise<string>` - Storage key

#### `clearStoredSession(walletPublicKey)`

Removes a stored session from browser storage.

**Parameters:**
- `walletPublicKey`: `PublicKey`

**Returns:** `Promise<void>`

### Example: Vanilla JavaScript

```typescript
import { getStoredSession, setStoredSession, clearStoredSession } from "@fogo/sessions-sdk-web";
import { establishSession, createSolanaWalletAdapter } from "@fogo/sessions-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://testnet.fogo.io");
const adapter = createSolanaWalletAdapter(connection);
const walletPublicKey = new PublicKey("Your-Wallet-PublicKey");

// Check for existing session
let storedSession = await getStoredSession(walletPublicKey);

if (!storedSession) {
  // Create new session
  const result = await establishSession({
    adapter,
    walletPublicKey,
    signMessage: async (msg) => {
      // Use wallet adapter to sign
      return await window.solana.signMessage(msg);
    },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    limits: new Map([
      [new PublicKey("So11111111111111111111111111111111111111112"), 5_000_000_000n]
    ])
  });

  // Store the session
  await setStoredSession({
    walletPublicKey,
    sessionKey: result.sessionKey
  });
}

// Later: clear the session
await clearStoredSession(walletPublicKey);
```

## Rust SDK for On-Chain Programs

The Rust SDK (`fogo-sessions-sdk`) is used in Solana/SVM programs to validate and interact with Fogo Sessions.

### Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
fogo-sessions-sdk = "0.6.1"
```

### Usage in Anchor Programs

The Rust SDK provides utilities for validating that a transaction is authorized by a Fogo Session and enforcing session limits.

#### Example: Session-Authorized Transfer

```rust
use anchor_lang::prelude::*;
use fogo_sessions_sdk::SessionValidator;

#[program]
pub mod my_program {
    use super::*;

    pub fn session_transfer(
        ctx: Context<SessionTransfer>,
        amount: u64,
    ) -> Result<()> {
        // Validate that the signer is either the user's wallet or their session
        let session_validator = SessionValidator::new(
            &ctx.accounts.signer_or_session,
            &ctx.accounts.user_wallet,
        )?;

        // The session validator ensures that:
        // 1. If it's a session, it's not expired
        // 2. The session is authorized for this program
        // 3. Token limits are enforced (if applicable)
        
        session_validator.validate()?;

        // Proceed with your program logic
        // Transfer tokens, update state, etc.

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SessionTransfer<'info> {
    /// Either the user's wallet or their session account
    pub signer_or_session: Signer<'info>,
    
    /// CHECK: The user's actual wallet (when using session)
    pub user_wallet: AccountInfo<'info>,
    
    // ... other accounts
}
```

### Key Concepts

**Session Validation**: The SDK provides macros and functions to validate that a signer is either:
1. The user's wallet directly (standard signing)
2. A valid, non-expired session that belongs to the user

**Program Authorization**: Sessions can be restricted to specific programs. Your program should verify it's in the authorized programs list.

**Token Limits**: Sessions may have spending limits per token. The SDK helps enforce these limits within your program logic.

For detailed Rust API documentation, see [docs.rs/fogo-sessions-sdk](https://docs.rs/fogo-sessions-sdk).
