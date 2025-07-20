# Sessions

Fogo Sessions are a novel chain primitive that enable users to interact with apps on the chain without paying for gas or signing individual transactions.

Sessions are a combination of an account abstraction mechanism and paymasters for handling transaction fees.  Sessions contain robust user protection features which enables users to explore Fogo apps without fear of their wallets being compromised.  Sessions also includes a set of widgets for interacting with their wallets, providing a consistent user experience across all Fogo apps.

Note that Sessions only allows interacting with SPL tokens -- in particular, Sessions do not allow interacting with native FOGO.  The intention is that all user activity on Fogo will happen with SPL tokens, and native FOGO will only be used by paymaster and other low-level primitives on-chain.

## Account Abstraction

Fogo Sessions allows users to create an intent message and sign that message with a keypair which proves ownership over the private key.  As a result, users can create & sign an intent message using any Solana wallet, regardless of whether that wallet directly supports Fogo natively.

## Paymaster

Fogo Sessions includes centralized paymasters, which enable users to transact on the chain without paying gas fees.  Note that the specific economics and limitations that will be applied to paymasters are under active development and are subject to change.

## User Protection

The intent message includes some mechanisms to protect users:

- There is a `domain` field which must match the origin domain of the running app.  This helps prevent XSS attacks involving phishing a user to sign a session for a different app.
- Sessions can either be limited or unlimited.  A limited session includes a list of tokens and the limit to how many of those tokens the app is allowed to interact with.  This mechanism enables users to explore new apps they may not yet trust, without having to create a separate & fund a separate wallet.
- Sessions have an expiry and must be renewed after expiring.
