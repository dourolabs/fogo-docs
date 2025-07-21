# Wormhole Bridge

Wormhole provides a comprehensive suite of cross-chain transfer solutions that enable seamless asset and data movement 
across multiple blockchain networks. This partnership empowers Fogo ecosystem developers to build on Wormhole's robust, battle-tested infrastructure for secure and efficient cross-chain functionality.

## Core Products

### Native Token Transfers (NTT)

Native Token Transfers provides an adaptable framework for transferring native tokens across different blockchains while maintaining their original properties. Unlike traditional wrapped assets, NTT preserves tokens to retain their native characteristics on every chain, including metadata, ownership, upgradeability, and custom features.

**Key Features:**
- **Advanced rate limiting**: Set rate limits per chain to prevent abuse and manage network congestion
- **Global accountant**: Ensures burned and transferred amounts never exceed minted tokens
- **No wrapped tokens**: Direct use within native ecosystems, eliminating intermediary steps
- **NTT CLI**: A powerful command-line interface that makes deployments to Fogo, Solana and EVM chains fast and easy. The CLI provides commands for initializing deployments, managing configurations, upgrading contracts, setting token authorities and more.

For detailed implementation guides, see the [Native Token Transfers documentation](https://wormhole.com/docs/products/native-token-transfers/overview/).

### Connect

Wormhole Connect provides a user-friendly widget that enables in-app multichain asset transfers without requiring users to leave your application. It simplifies the complexity of cross-chain trasnfers by offering a single, intuitive interface for moving assets across diverse blockchains.

**Key Features:**
- **In-app multichain transfers**: Transfer assets across chains without leaving your app
- **Customizable features**: Specify chains, custom RPCs, manage tokens, and select cross-chain routes
- **Customizable UI**: Style the interface to match your brand
- **Optional destination gas**: Provide gas for initial transactions on the target chain


For implementation details, see the [Connect documentation](https://wormhole.com/docs/products/connect/overview/).

### Queries

Queries provide on-demand access to Guardian-attested on-chain data, allowing smart contracts to fetch real-time, verifiable data from across the multichain ecosystem, such as prices, rates, and liquidity.

**Key Features:**
- **On-demand data access**: Fetch price feeds, interest rates, and other data in real-time
- **Guardian attested**: All data is signed by Guardians for trustless validation
- **Cross-chain ready**: Request data on one chain, use it on another
- **Chain agnostic**: Works across supported EVM chains, Solana, Fogo, and more

For detailed setup instructions, see the [Queries documentation](https://wormhole.com/docs/products/queries/overview/).

### Messaging

Wormhole Messaging is the core protocol that enables secure, multichain communication and coordination across blockchains. It solves the critical problem of blockchain isolation by allowing data and assets to move freely across networks.

**Key Features:**
- **Multichain messaging**: Send arbitrary data between blockchains
- **Composable architecture**: Works with smart contracts or decentralized applications

**How It Works:**
1. **Source chain**: Contract emits message by calling Wormhole Core Contract
2. **Guardian Network**: Guardians observe message, validate it, and generate signed VAA
3. **Relayers**: Relayers transport VAA to destination chain
4. **Target chain**: Core Contract verifies VAA and triggers specified application logic

For implementation guides, see the [Messaging documentation](https://wormhole.com/docs/products/messaging/overview/).

Wormhole Settlement is a permissionless, faster-than-finality transfer protocol that enables developers to compose actions on top of cross-chain token transfers. Off-chain agents called solvers compete to fulfill these user-specified actions, eliminating the need for users to handle execution manually.

**Key Features:**
- **Competitive auctions**: Solvers compete in auctions to fulfill user intents
- **Speed with reliability**: Combines high-speed execution with reliable fallback path
- **On-chain verifiability**: All settlement steps remain verifiable on-chain via Wormhole messages

For detailed architecture and setup, see the [Settlement documentation](https://wormhole.com/docs/products/settlement/overview/).

## TypeScript SDK

The Wormhole TypeScript SDK provides a unified interface for building cross-chain applications. It is a foundational toolkit that supports interaction with all core Wormhole protocols, including Native Token Transfers, Token Bridge, CCTP, and Settlement, giving developers a consistent API across multiple chains.

**Key Benefits:**
- **Unified interface**: Single SDK for all Wormhole protocols and platforms
- **Cross-platform support**: Works with Fogo, Solana, Evm chains, Sui and many more
- **Easy integration**: Simple installation and initialization process

For detailed setup and usage instructions, see the [TypeScript SDK documentation](https://wormhole.com/docs/tools/typescript-sdk/get-started/).

## Example Use Cases of Wormhole 

### Cross-Chain Swaps and Liquidity Aggregation
- **Native Token Transfers**: Transmit native assets across chains
- **Connect**: Manage user-friendly asset transfers
- **Queries**: Acquire real-time prices for optimal trade execution

### Borrowing and Lending Across Chains
- **Native Token Transfers**: Move collateral as native assets
- **Messaging**: Propagate loan requests and liquidations across chains
- **Queries**: Retrieve interest rates and asset prices in real-time

### Gas Abstraction
- **Native Token Transfers**: Facilitate native token conversion for gas payments
- **Messaging**: Send gas fee payments across chains

### Cross-Chain Payment Widgets
- **Native Token Transfers**: Ensure direct, native asset transfers
- **Connect**: Facilitate seamless payments in various tokens

### Cross-Chain Staking
- **Native Token Transfers**: Transfer staked assets natively between networks
- **Messaging**: Move staking rewards and governance signals across chains


## Try It Now

**Ready to experience cross-chain transfers with Fogo?** Transfers to and from Fogo are already live and available for testing on Portal Bridge. Visit [Portalbridge.com](https://portalbridge.com/testnet) to try cross-chain transfers involving Fogo and other supported networks.

For comprehensive implementation guides and API references, visit the [Wormhole documentation](https://wormhole.com/docs/).
