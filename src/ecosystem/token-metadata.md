# Token Metadata

The Metaplex Token Metadata Program is the de facto standard for Fungible Tokens on Solana and across all SVMs, offering the widest level of support by SVM dApps and protocols. It is built on the SPL-Token and SPL-Token-2022 token programs.

The Token Metadata program supports a wide array of Token Standards depending on the requirements of the creator.

## Fungible Tokens

Metadata can easily be attached to SPL-Tokens using the Token Metadata program to make Fungible or Semi-Fungible tokens. The Token Metadata program attaches a Metadata account to tokens to make them recognized and readable across dApps, protocols and explorers.

## Non-Fungible Tokens

Token Metadata offers a basic standard for supporting non-fungible digital assets, allowing users to create onchain art, PFPs, or other singular assets. It supports common functionality such as delegation, sales, owned escrow (e.g. ERC-6551 equivalent) and more.

## Programmable Non-Fungible Tokens

All of the same functionality of Non-Fungible Tokens with additional programmability and royalty enforcement. Programmable NFTs support attaching a ruleset to an NFT that can prevent the asset from being sold or delegated to malicious platforms, marketplaces that don't support royalties, and more.

## Editions

Token Metadata also includes the ability to print editions, commonly used for 1/1 or prints of artwork. The protocol utilizes a Master Edition NFT that can have derivative artworks printed off as numbered edition copies.

## Developer Resources

* Documentation: [https://developers.metaplex.com/token-metadata](https://developers.metaplex.com/token-metadata)  
* Javascript Package: [https://www.npmjs.com/package/@metaplex-foundation/mpl-token-metadata](https://www.npmjs.com/package/@metaplex-foundation/mpl-token-metadata)  
* Rust Crate: [https://docs.rs/mpl-token-metadata/latest/mpl_token_metadata/](https://docs.rs/mpl-token-metadata/latest/mpl_token_metadata/)
