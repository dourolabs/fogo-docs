# Releases

The Fogo validator client is distributed as a source code tarball. See [Running a Node](/user-guides/running-a-node) for instructions.

## Fogo v20.0.0

This releases includes multiple changes, including pulling gossip, repair serving under XDP, and support for native token wrapping ant transfering with sessions, reducing consequtive leader slots. It also fixes, an IPv4 networking issue.

### Breaking changes:
- Gossip, repair and ancestor hashes default ports changed due to switching them to use XDP:
  - Gossip default port now is: `9010` to ensure you can connect to the network, make sure to update your entrypoints array to point to both `8001` and `9010` ports of the hosts that it contains. See [Testnet Connection Parameters](https://docs.fogo.io/testnet.html#connection-parameters) or [Mainnet Connection Parameters](https://docs.fogo.io/mainnet.html#connection-parameters) for an example of the entrypoints variable.
- `expected_shred_version` is now a mandatory field in the config, see the relevant Running a node guide for the cluster you are joining to get the current shred version, and set it before startup.
- Memory layout of the validator was changed, this means the configuration needs to be re-initialized: `fdctl fini all --config <config>` and `fdctl init all --config <config>` commands with the required configuration need to be re-run, if memory is too fragmanted, this might require restarting the machine.
  - If you see this kind of error in the logs: `ENOMEM-Out of memory when trying to reserve gigantic pages for it means the hugepages are not correctly initialized, and you have to re-initialize them.`
  - If the error contains `This error can also happen because system uptime is high and memory is fragmented. You can fix this by rebooting the machine and running the hugetlbfs stage immediately on boot.` it means you have to restart the machine due to memory being too fragmanted to reserve the new pages.

- Source: [fogo-v20.0.0.tar.gz](https://static.fogo.io/fogo-v20.0.0.tar.gz)
- SHA1 Checksum: `0fac807bb47179bb4eff427a83a66fc922eb46e4`


## Fogo v19.0.1

This releases includes a fix in the build dependencies script to work outside a git repository.

- Source: [fogo-v19.0.1.tar.gz](https://static.fogo.io/fogo-v19.0.1.tar.gz)
- SHA1 Checksum: `f7033371dab0a73fcee0dafaf8c1aa12beb0b158`

## Fogo v19.0.0

This release sets inflation to a fixed 2%, adds priority repair support, updates block limits, and improves RPC CPU usage.

- Source: [fogo-v19.0.0.tar.gz](https://static.fogo.io/fogo-v19.0.0.tar.gz)
- SHA1 Checksum: `9154095b0e21c4133be855b66f561f2a8d826921`

## Fogo v18.0.0

This release adds repair whitelist and fixes for stake weight

- Source: [fogo-v18.0.0.tar.gz](https://static.fogo.io/fogo-v18.0.0.tar.gz)
- SHA1 Checksum: `3bfaa77791659f985dcfa274999fac23906bf3e9`
  
## Fogo v17.0.0

This release adjusts the account CU limit parameters on the leader code path.

- Source: [fogo-v17.0.0.tar.gz](https://static.fogo.io/fogo-v17.0.0.tar.gz)
- SHA1 Checksum: `ae33bdce1929be90e8a1ea8ff1ac03221c7b3189`

## Fogo v16.0.0

This release contains bug fixes for two conditions that could prevent nodes from reaching consensus.

- Source: [fogo-v16.0.0.tar.gz](https://static.fogo.io/fogo-v16.0.0.tar.gz)
- SHA1 Checksum: `f68da7ebb614f4bcafe563471aab7b31745ff973`

## Fogo v15.0.0

This release introduces a verification mechanism for genesis on new Fogo instances.

- Source: [fogo-v15.0.0.tar.gz](https://static.fogo.io/fogo-v15.0.0.tar.gz)
- SHA1 Checksum: `fbdec608e9db4fdf5e9612016ba562d203df64a7`

## Fogo v14.0.0

This release includes firedancer net tile fix, ip_whitelist for xdp tile, replace core bpf programs (Config/AddressLookup/FeatureGate).

- Source: [fogo-v14.0.0.tar.gz](https://static.fogo.io/fogo-v14.0.0.tar.gz)
- SHA1 Checksum: `d5e3493a7192cbb3713f92870205c085b0fa163d`

## Fogo v13.0.0

This release introduces the `fdgenesis` tool, brings back support for built-in programs (config, alt, feature gate), and readds a feature to move the Token2022 program.

- Source: [fogo-v13.0.0.tar.gz](https://static.fogo.io/fogo-v13.0.0.tar.gz)
- SHA1 Checksum: `02cf1989ea50808c247407584a2715c49e9b3034`

## Fogo v12.0.0

This release rebases Fogo to Firedancer v0.703.20300, introduces inflation, and adds a feature to move the Token2022 program.

- Source: [fogo-v12.0.0.tar.gz](https://static.fogo.io/fogo-v12.0.0.tar.gz)
- SHA1 Checksum: `3581b03d5b2bff037a6a28c7c3509c827927aac2`

## Fogo v11.0.0

This release introduces a new lockout formula, and modifies the addresses of feature activations.

- Source: [fogo-v11.0.0.tar.gz](https://static.fogo.io/fogo-v11.0.0.tar.gz)
- SHA1 Checksum: `dcdb5306f1d95a9332c263beff53664ac342a526`

## Fogo v10.0.0

This release contains several reliability and stability improvements, and turns off voting outside the active consensus zone.

- Source: [fogo-v10.0.0.tar.gz](https://static.fogo.io/fogo-v10.0.0.tar.gz)
- SHA1 Checksum: `5b7b7a18849deb5fd09185828b8c556facd51626`

## Fogo v8.0.0

This release introduces a fix for snapshot validation at startup.

- Source: [fogo-v8.0.0.tar.gz](https://static.fogo.io/fogo-v8.0.0.tar.gz)
- SHA1 Checksum: `b9281739fa5d80fc4aa18f00b49e4ef6150474dd`

## Fogo v7.0.0

This release introduces a feature activate that adjusts the status cache.

- Source: [fogo-v7.0.0.tar.gz](https://static.fogo.io/fogo-v7.0.0.tar.gz)
- SHA1 Checksum: `7d2ca6e4e47bf31ffd1c4e04634895acd820984d`

## Fogo v6.0.0

This release adjustes the blockhash lifetime to 2 minutes and introduces a feature activation for deploying the memo program.

- Source: [fogo-v6.0.0.tar.gz](https://static.fogo.io/fogo-v6.0.0.tar.gz)
- SHA1 Checksum: `817533105183734d5f4dffb4f0b11b0de2adf38b`

## Fogo v5.0.0

This release contains improvement on vote forwarding and introduces a feature activation that enables the wrapped native token mint account.

- Source: [fogo-v5.0.0.tar.gz](https://static.fogo.io/fogo-v5.0.0.tar.gz)
- SHA1 Checksum: `fe4126739790f6c90eaec59c81ad99131037454c`

## Fogo v4.0.0

This release introduces a feature activation for deploying the SPL token and associated token account programs.

- Source: [fogo-v4.0.0.tar.gz](https://static.fogo.io/fogo-v4.0.0.tar.gz)
- SHA1 Checksum: `51bc7d0197400aa73164e7b99bc7748b3e24cb02`

## Fogo v3.0.0

This is the first Fogo release based on Firedancer 0.408.20113.

- Source: [fogo-v3.0.0.tar.gz](https://static.fogo.io/fogo-v3.0.0.tar.gz)
- SHA1 Checksum: `50ea5912554204ff2f904a3725f065b12afc2aa7`
