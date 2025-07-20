# Architecture

The Fogo protocol introduces the following architectural innovations that work together to deliver significantly enhanced throughput and latency.

## Solana Foundation

Fogo builds upon Solana's proven blockchain architecture, inheriting its key technical components:

- **Proof of History (PoH)**: Provides cryptographic timestamping for global clock synchronization across the network
- **Tower BFT**: The consensus mechanism that enables fast finality and fork choice
- **Turbine**: Block propagation protocol that efficiently distributes blocks across the network
- **Solana Virtual Machine (SVM)**: The execution environment that processes transactions and smart contracts
- **Leader Rotation**: Deterministic scheduling system that rotates block production responsibilities

#### Compatibility Strategy

Fogo maintains **full compatibility at the SVM execution layer**, ensuring that existing Solana programs, tooling, and infrastructure can migrate seamlessly without modification. The protocol preserves all core networking and consensus components while optimizing their implementation for maximum performance.

This compatibility strategy allows Fogo to benefit from continuous upstream improvements in the Solana ecosystem while providing a clear migration path for developers and users.

## Unified Client Implementation

Traditional blockchain networks suffer from client diversity bottlenecks, where network performance is constrained by the slowest client implementation. While client diversity provides theoretical security benefits, it creates practical performance limitations as networks must maintain compatibility across different client speeds and optimization levels.

Fogo solves this bottleneck by adopting a single canonical client based on **Firedancer**, Jump Crypto's high-performance Solana-compatible implementation. Firedancer achieves substantially higher transaction processing throughput through:

- Optimized parallel processing architectures
- Advanced memory management techniques
- SIMD instruction utilization
- Complete C networking stack rewrite

The network will initially deploy using **Frankendancer** (a hybrid implementation) before transitioning to the full Firedancer client as development completes.

### Performance Impact

By standardizing on the highest-performance client, Fogo eliminates the compatibility overhead that limits other networks. The protocol creates natural economic incentives for validators to adopt optimal client implementations, as running slower clients results in missed blocks and reduced revenue in Fogo's high-performance environment.

## Multi-Local Consensus

### Zone-Based Architecture

Fogo implements a novel **multi-local consensus** system where validators operate in close physical proximity to optimize performance while preserving decentralization benefits.

**Zones** represent geographical areas where validators co-locate to achieve optimal consensus performance. Ideally, zones are single data centers where network latency between validators approaches hardware limits, enabling **ultra-low latency consensus with block times under 100ms**.

### Dynamic Zone Rotation

The network maintains decentralization through **zone rotation across epochs**. This rotation provides:

- **Jurisdictional Decentralization**: Prevents capture by any single government or regulatory authority
- **Infrastructure Resilience**: Protects against regional failures, natural disasters, or infrastructure outages
- **Strategic Optimization**: Allows positioning near sources of price-sensitive financial information

Zone selection occurs through on-chain voting mechanisms, with validators achieving supermajority consensus on future epoch locations. This advance coordination ensures validators have adequate time to establish secure infrastructure in selected zones.

## Curated Validator Set

Fogo utilizes a **curated validator set** to ensure consistent high performance and prevent network degradation from under-provisioned nodes. Validators must meet dual requirements:

- **Minimum stake thresholds** maintaining economic security
- **Validator set approval** ensuring operational capabilities

This model recognizes that even small fractions of poorly performing validators can prevent networks from reaching physical performance limits.

### Network Quality Control

The curated validator set enables **social layer enforcement** of behaviors that benefit network health but may be difficult to encode in protocol rules:

- **MEV abuse prevention**: Ejection of validators engaging in harmful extraction practices
- **Performance standard maintenance**: Removal of persistently underperforming nodes
- **Network stability**: Prevention of behaviors that destabilize consensus or block propagation

This governance mechanism aligns validator incentives with long-term network health while maintaining decentralization properties comparable to traditional proof-of-stake networks, where two-thirds of stake already holds significant protocol influence.
