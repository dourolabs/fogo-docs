# Candy Machine

The Metaplex Candy Machine protocol is the simplest way to deploy and launch NFT collections on the SVM. It works by deploying a lazy-minting protocol that stores the asset data for an entire collection and allows minters to mint assets from the collection.

## Guards System

Candy Machine supports a wide array of "Guards" which offer a range of conditions that must first be met in order to mint an asset from the collection.

Popular Guards include:

- **Sol Payment**: Represents the sale price
- **Token Gate**: Can be used to gate the collection to an allowlist token mint
- **Token Payment**: Allows payment in a custom token of the creator's choosing
- **Start Date**: Establishes the start time of the sale

Candy Machine currently supports over 20 guards with more being added regularly!

## Developer Resources

- Candy Machine for Token Metadata: [https://developers.metaplex.com/candy-machine](https://developers.metaplex.com/candy-machine)  
- Candy Machine for Core: [https://developers.metaplex.com/core-candy-machine](https://developers.metaplex.com/core-candy-machine)
