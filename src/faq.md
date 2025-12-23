# FAQ

# About
Fogo is a fully SVM compatible chain, with Solana feature and RPC compatibility.

## General Parameters
- 40ms Slot time
  - 64 Ticks per slot, 625µs each
- 90,000 Slots per epoch
- Epoch duration is 1 hour
- Genesis hashes:
  - Mainnet: CDLtwKnaCoK157uaHQDj4fHu72AyD2519Cphmpiq6hvT
  - Testnet: 9GGSFo95raqzZxWqKM5tGYvJp5iv4Dm565S4r8h5PEu9
- Finality: 32 votes, ~ 1.2 seconds
- Optimistic confirmation requires 66% of stake to vote, usually happens in the next slot ~40ms after the transaction's block is published, so around ~60ms for most transactions. 

## Public RPCs
Public RPCs are available with low rate limits.
- Mainnet: https://mainnet.fogo.io
- Testnet: https://testnet.fogo.io

## Questions

### Where are the releases with changelogs?
The can be found at: https://docs.fogo.io/releases.html

### How do I build the node from source
Can be found at:  https://docs.fogo.io/user-guides/running-a-node.html#build-instructions

### Where can I access the explorer?
There are two explorers currently available, https://fogoscan.com and https://explorer.fogo.io
