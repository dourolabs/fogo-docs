# Fogo Sessions

Fogo Sessions are a novel chain primitive that enable users to interact with apps on the chain without paying for gas or signing individual transactions.

Fogo Sessions are a combination of an account abstraction mechanism and paymasters for handling transaction fees.  Fogo Sessions contain robust user protection features which enable users to explore Fogo apps without fear of their wallets being compromised.  Fogo Sessions also includes a set of widgets for interacting with their wallets, providing a consistent user experience across all Fogo apps.

## Account Abstraction

Fogo Sessions allows users to create an intent message and sign that message with a keypair which proves ownership over the private key.  As a result, users can create & sign an intent message using any Solana wallet, regardless of whether that wallet directly supports Fogo natively.

## Paymaster

Fogo Sessions includes centralized paymasters, which enable users to transact on the chain without paying gas fees.

## User Protection

The intent message includes some mechanisms to protect users:

- Fogo Sessions have a `domain` field which restricts which on-chain programs the session is allow to interact with.
- Fogo Sessions can either be limited or unlimited.  A limited session includes a list of tokens and the limit to how many of those tokens the app is allowed to interact with.  This mechanism enables users to explore new apps they may not yet trust, without having to create and fund a separate wallet.
- Fogo Sessions have an expiry and must be renewed after expiring.

## More information 

To learn more about how Sessions works under the hood, read the [Deep Dive](/deep-dives/fogo-sessions).