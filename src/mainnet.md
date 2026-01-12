# Mainnet

Fogo Mainnet is live. Everyone is welcome to join Mainnet to deploy and interact with on-chain programs.

## Current Setup

Mainnet currently runs with a single active zone. The active zone and validator identities are listed below:

- Zone 1 (APAC)
  - #1: `3ayHBu7k7aWBJxp8dLEuVYFatn2V2frqcxDvTCpmyCsn`
  - #2: `xL7s7AC4AZYkAtc5CAiBMMhAiNfk24BywqZa6NQETjo`
  - #3: `H1KAR18HdQhPqXNHZibdGTFtVfEveDsYsc7aag4ENedG`
  - #4: `FLXAfPmtiDgNCyuwVHKZBVzswy82W3exL4mYAhKKMt2X`
  - #5: `6TSDMQd3EBvjFHXrTEcKdodgMcd4Pze7sDoNXP4xpRcT`
  - #6: `Fogeeb6AJcPewoEJ3DBqpBq4VD8H5nUJ91re12QnVVf`
  - #7: `ARi7JKhd2RnCA1iKPeXcvRF72iM5hqbfevdCPjkVfdXr`

## Connection Parameters

A public RPC endpoint is available for users to interact with Mainnet. Users are welcome to download the client source code, build it, and join the network.

- RPC URL: `https://mainnet.fogo.io`
- Entrypoints: `["entrypoint1.mainnet.fogo.io:9010", "entrypoint2.mainnet.fogo.io:9010", "entrypoint3.mainnet.fogo.io:9010"]`
- Genesis hash: `CDLtwKnaCoK157uaHQDj4fHu72AyD2519Cphmpiq6hvT`
- Shred version: `715`

## Example Configuration

```toml
user = "fogo"

[gossip]
# Set host to the public IP address that other nodes can use to exchange traffic
# with this node.
host = "<YOUR_PUBLIC_IP>"

entrypoints = ["entrypoint1.mainnet.fogo.io:9010", "entrypoint2.mainnet.fogo.io:9010", "entrypoint3.mainnet.fogo.io:9010"]

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

expected_genesis_hash = "CDLtwKnaCoK157uaHQDj4fHu72AyD2519Cphmpiq6hvT"
expected_shred_version = 715

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
