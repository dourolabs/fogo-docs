# Testnet

Fogo is currently running in Testnet. Everyone is welcome to join Testnet to deploy and interact with on-chain programs.

As a reminder, Testnet tokens have no financial value, and ongoing development may cause network disruptions. Fogo Testnet is also not incentivized, and activity on testnet will have no effect on the upcoming Mainnet deployment.

## Current Setup

Fogo Testnet is currently set up to target 40-millisecond blocks. The duration of the leader term in Fogo is 1500 blocks which means a leader validator will produce at blocks for at least one minute before passing leadership on to the next validator.

Testnet epochs run for 90,000 blocks or about one hour. Each epoch moves consensus to a different zone. The current zones and their respective validator identities are listed below:

- Zone 1 (APAC)
  - #1: `14bHRv5iPWfvrgnjwwKVzXwQkVVXPr542uR3WUftf9GY`
  - #2: `26KHFKDHUaD4HRX1eUPcrXJwCD5XrrtPda7CnH4M32ZC`
  - #3: `4GCrA5ATXg5GixzjW9ZZTXNh5fjWPvhanN5p7YEgxwuA`
  - #4: `GWSLKT1wLchB5tHcaUK4JRsYaGAtREYv8r4fgcyYAhe8`

- Zone 2 (Europe)
  - #1: `Bb6g5P2wqzDwJ9faNVqTxEZJj17UbLzNa2fu8wGCdC8M`
  - #2: `AVfZ4PP1j171wMqZ2FsmCAG5844LhNc2hVHPuVbDCsmd`
  - #3: `BdjekJZHqD1NLci4kPRZaBnPpdoeCm5wFwrJnxBkgWVY`
  - #4: `DeAvtKnoG53uHPvfhCtrQcwGTxMvGkf7ChYCifVKvVcX`

- Zone 3 (North America)
  - #1: `7XbXiCuLnTvV74ZqKpf3w2zL1HfNpYPTgRcvpei5nVkG`
  - #2: `EFvgxLbUFEPsWTdLXEr32peGvcofpa6WWHDk9gwKFCqU`
  - #3: `3Hz6CJyPnpDxrEvstwRmishS1JGU5fMdCS1PMFjue1Um`
  - #4: `2WvEuYVh9CJm7PHoETAvHbXBu5ov7xtGc2nbBC93rgRf`

## Connection Parameters

Douro Labs currently runs a public RPC endpoint for users to interact with Testnet. Users are welcome to download the client source code, build it and join the network.

- RPC URL: `https://testnet.fogo.io`
- Entrypoint: `testnet-entrypoint.fogo.io:8001`

- Genesis hash: `9GGSFo95raqzZxWqKM5tGYvJp5iv4Dm565S4r8h5PEu9`
- Shred version: `298`

## Example Configuration

```toml
user = "fogo"

[gossip]
# Set host to the public IP address that other nodes can use to exchange traffic
# with this node.
host = "<YOUR_PUBLIC_IP>"

entrypoints = ["testnet-entrypoint.fogo.io:8001"]

[tiles.poh]
lagged_consecutive_leader_start = false

[ledger]
# Set `path` to where you want the ledger to be stored. This directory will grow
# to ~500GB by default. It should live in fast storage, preferably NVMe SSD.
path = "<YOUR_LEDGER_PATH>"

[consensus]
# Set `identity_path` to the path of your Solana-compatible identity keypair
# file (generated with solana-keygen new).
identity_path = "<YOUR_IDENTITY_KEYPAIR_PATH>"

expected_genesis_hash = "9GGSFo95raqzZxWqKM5tGYvJp5iv4Dm565S4r8h5PEu9"
expected_bank_hash = "4bNWYnpUKqMjoZUNUGtc1ZKXpCVGUkZgGCVpc8BQNenn"
expected_shred_version = 34883

[snapshots]
full_snapshot_interval_slots = 22500

[log]
level_logfile = "INFO"
path = "-" # Defaults to stdout, but you can set this to a file to persist logs.

[rpc]
port = 8899
full_api = true
only_known = false
transaction_history = true
extended_tx_metadata_storage = true
```
