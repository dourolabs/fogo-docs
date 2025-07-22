# Wormhole Bridge

Wormhole provides cross-chain solutions for moving assets and data
between blockchain networks. Fogo ecosystem developers can use Wormhole's
infrastructure to implement cross-chain functionality in their applications.

Transfers to and from Fogo are already live and available for testing on Portal
Bridge. Visit [Portalbridge.com](https://portalbridge.com/testnet) to try
cross-chain transfers between Fogo and other supported networks.

The following Wormhole products are available on Fogo:

## Native Token Transfers (NTT)

Native Token Transfers is a framework for transferring native tokens across
blockchains while maintaining their original properties such as metadata,
ownership, upgradeability, and custom features, without requiring wrapped token
intermediaries.

Check out [Native Token Transfers documentation](https://wormhole.com/docs/products/native-token-transfers/overview/).

## Connect

Wormhole Connect is a widget that enables multichain asset transfers within
your application. It provides an interface for moving assets across blockchains
without requiring users to navigate to external platforms.

Check out [Connect documentation](https://wormhole.com/docs/products/connect/overview/).

## Queries

Queries provide on-demand access to Guardian-attested on-chain data, allowing
smart contracts to fetch real-time, verifiable data from across the multichain
ecosystem, such as prices, rates, and liquidity.

Check out [Queries documentation](https://wormhole.com/docs/products/queries/overview/).

## Messaging

Wormhole Messaging is the core protocol that enables secure, multichain
communication and coordination across blockchains.

**How It Works:**
1. **Source chain**: Contract emits message by calling Wormhole Core Contract
2. **Guardian Network**: Guardians observe message, validate it, and generate signed VAA
3. **Relayers**: Relayers transport VAA to destination chain
4. **Target chain**: Core Contract verifies VAA and triggers specified application logic

Check out [Messaging documentation](https://wormhole.com/docs/products/messaging/overview/).

## Settlement

Wormhole Settlement is a transfer protocol that allows developers to compose
actions on cross-chain token transfers. Off-chain agents called solvers fulfill
user-specified actions, removing the need for manual execution by users.

Check out [Settlement documentation](https://wormhole.com/docs/products/settlement/overview/).

## TypeScript SDK

The Wormhole TypeScript SDK provides a unified interface for building
cross-chain applications across Wormhole protocols giving developers a
consistent API across multiple chains.

Check out [TypeScript SDK documentation](https://wormhole.com/docs/tools/typescript-sdk/get-started/).
