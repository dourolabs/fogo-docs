# Building on Fogo

Fogo provides a high-performance blockchain platform for DeFi applications with full Solana compatibility and innovative UX improvements through Fogo Sessions.

## SVM Compatibility

Fogo is fully compatible with the Solana Virtual Machine (SVM), which means any Solana program can be deployed on Fogo without modification. The blockchain maintains 100% compatibility at the execution layer, ensuring that your existing Solana applications work seamlessly on Fogo's high-performance network.

This compatibility extends to all aspects of Solana development, including program structure, account models, instruction processing, and runtime behavior. Applications built for Solana can leverage Fogo's infrastructure benefits, such as 40ms block times and geographic zone optimization, without requiring any code changes.

## Deploying Programs on Fogo

To deploy a Solana program on Fogo, you can use the same tools you're already familiar with from Solana development. The key difference is simply pointing these tools to a Fogo RPC endpoint instead of a Solana endpoint.

### Using the Solana CLI

Configure the Solana CLI to use a Fogo Testnet RPC endpoint:

```bash
solana config set --url https://testnet.fogo.io
```

Once configured, deploy your program using the standard deployment command:

```bash
solana program deploy <PATH_TO_PROGRAM_SO>
```

The program will be deployed to Fogo with the sender keypair as the authority. You can verify the deployment and interact with your program using the Solana CLI tools, just as you would on Solana.

### Using Anchor

Anchor, the popular Solana development framework, works seamlessly with Fogo. Update your `Anchor.toml` configuration file to point to the Fogo RPC endpoint:

```toml
[provider]
cluster = "https://testnet.fogo.io"
```

Then deploy your Anchor program as usual:

```bash
anchor build
anchor deploy
```

All Anchor features, including IDL generation, client libraries, and testing frameworks, are fully compatible with Fogo.

## Integrating Fogo Sessions

Many Fogo applications integrate Fogo Sessions to provide users with a gasless, no-approve UX. Fogo Sessions is a chain primitive that combines account abstraction with paymasters, enabling users to interact with your application without signing individual transactions or paying gas fees.

Fogo Sessions includes robust user protection features such as spending limits and domain verification, allowing users to explore new applications without risking their entire wallet balance. This significantly lowers the barrier to entry for users and creates a more accessible DeFi ecosystem.

To integrate Fogo Sessions into your application, refer to the [Integrating Fogo Sessions](/user-guides/integrating-fogo-sessions) guide. The guide covers the React SDK, including setup with `FogoSessionProvider`, user interface components like `SessionButton`, and programmatic session management with the `useSession` hook.

For a deeper understanding of how Fogo Sessions work and the user protections they provide, see the [Fogo Sessions](/fogo-sessions) documentation.
