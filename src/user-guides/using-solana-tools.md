# Using Solana Tools

Fogo is fully compatible with Solana runtime (SVM) and RPC interface which means you can use the standard Solana toolkit to interact with Fogo. Fogo wallet keypairs are also compatible with Solana.

Fogo will soon have its own CLI toolkit, but in the meantime you can follow the [Install the Solana CLI](https://docs.anza.xyz/cli/install) guide to get started.

Once you have the Solana CLI, point it to the Fogo Mainnet RPC endpoint:

```bash
solana config set --url https://mainnet.fogo.io
```

For testnet RPCs and other RPC providers, see the [RPCs](/rpcs) page.

Now you can interact with Fogo using the Solana CLI. You can also pass the RPC endpoint as the value of the `--url` parameter in a command.

## Using file keypairs

To create a new wallet keypair, run the following command:

```bash
solana-keygen new --outfile <PATH>
```

To find the address of a keypair, run the following command:

```bash
solana-keygen pubkey <PATH>
```

You can then execute commands on behalf of a keypair using the Solana CLI by passing the `--keypair` argument. For example to send native FOGO tokens to another address:

```bash
solana --keypair <PATH> transfer <DESTINATION_ADDRESS> <AMOUNT>
```

The Solana CLI toolkit contains a `spl-token` command for interacting with SPL tokens. For example to send FOGO SPL tokens to another address:

```bash
spl-token --keypair <PATH> transfer So11111111111111111111111111111111111111112 <DESTINATION_ADDRESS> <AMOUNT>
```

In the command above, `So11111111111111111111111111111111111111112` is the token account of the FOGO SPL token. For the fUSD stablecoin, use `fUSDNGgHkZfwckbr5RLLvRbvqvRcTLdH9hcHJiq4jry` as the token account.

## Deploying a program

First, build a program from its source code. If you don't have a program and just want to give it a try, you can take the [SPL Memo Program](https://github.com/solana-program/memo). Go to Releases and download the `spl_memo.so` file. Then run:

```bash
solana program deploy <PATH_TO_SPL_MEMO_SO>
```

The program will be be deployed at a random address with the sender keypair as the authority. It will be printed in the deployment output. You can now use one of the clients from the Memo program repository to interact with the new program.
