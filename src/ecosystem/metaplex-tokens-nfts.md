# Metaplex Tokens & NFTs

## Overview

The Metaplex Protocol is a decentralized protocol for the SVM ecosystem, designed to facilitate the creation, sale, and management of digital assets.

The following Metaplex products deployed on Fogo:

- **Token Metadata**
- **Core**
- **Candy Machine**

## Token Metadata

Metadata can be attached to SPL-Tokens using the Token Metadata program to make Fungible or Semi-Fungible tokens. The Token Metadata program attaches a Metadata account to tokens to make them recognized and readable across dApps, protocols and explorers.

Token Metadata also offers a basic standard for supporting non-fungible digital assets, allowing users to create onchain art, PFPs, or other singular assets. It supports common functionality such as delegation, sales, owned escrow (e.g. ERC-6551 equivalent) and more.

Programmable NFTs support attaching a ruleset to an NFT that can prevent the asset from being sold or delegated to malicious platforms, marketplaces that don't support royalties, and more.

Token Metadata also includes the ability to print editions, commonly used for 1/1 or prints of artwork. The protocol utilizes a Master Edition NFT that can have derivative artworks printed off as numbered edition copies.

### Developer Resources

* [Documentation](https://developers.metaplex.com/token-metadata)
* [Javascript Package](https://www.npmjs.com/package/@metaplex-foundation/mpl-token-metadata)
* [Rust Crate](https://docs.rs/mpl-token-metadata/latest/mpl_token_metadata/)

## Core

Core supports the same features as Token Metadata such as Editions and Royalties enforcement, while also enabling new functionality through a Plugin system that provids a common interface for additional features to be added to an asset dynamically such as Royalty, Attributes, and Autograph.

The Core protocol utilizes a single account design that allows it to achieve the smallest onchain footprint, reducing the overall rent cost to the smallest possible amount. This compact, single account also allows the protocol to abstract away many of the complexities of SVM by utilizing its advanced Plugin system, allowing users to have all of the flexibility of a custom protocol without having to develop a new program.

### Developer Resources

* [Documentation](https://developers.metaplex.com/core)
* [Javascript Package](https://www.npmjs.com/package/@metaplex-foundation/mpl-core)
* [Rust Crate](https://docs.rs/mpl-core/latest/mpl_core/)

## Candy Machine

The Candy Machine protocol is a mechanism for deploying and launching NFT collections on Fogo. It works by deploying a lazy-minting protocol that stores the asset data for an entire collection and allows minters to mint assets from the collection.

Candy Machine supports "Guards" that offer a range of conditions that must first be met in order to mint an asset from the collection, such as:

- **Sol Payment**: Represents the sale price
- **Token Gate**: Can be used to gate the collection to an allowlist token mint
- **Token Payment**: Allows payment in a custom token of the creator's choosing
- **Start Date**: Establishes the start time of the sale

### Developer Resources

- [Candy Machine for Token Metadata](https://developers.metaplex.com/candy-machine)
- [Candy Machine for Core](https://developers.metaplex.com/core-candy-machine)
