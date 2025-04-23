# Testnet

## Parameters

- Public RPC endpoint: `https://testnet.fogo.io`
- Entrypoint: `testnet-entrypoint.fogo.io:8001`

- Genesis hash: `9GGSFo95raqzZxWqKM5tGYvJp5iv4Dm565S4r8h5PEu9`
- Bank hash: `9eKZiUAPxtujFimGxnGEi7AW8kJCxk9jz21Z9GqfF6Dv`
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
