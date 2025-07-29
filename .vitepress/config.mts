import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fogo Docs",
  description: "Fogo docs site",
  srcDir: "src",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  ],
  markdown: {
    component: {
      inlineTags: ['Fogo'],
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: false,
    sidebar: [
      {
        text: "",
        items: [
          { text: "Overview", link: "/" },
          { text: "Architecture", link: "/architecture" },
          { text: "Fogo Sessions", link: "/fogo-sessions" },
          { text: "Releases", link: "/releases" },
          { text: "Testnet", link: "/testnet" },
        ],
      },
      {
        text: "User Guides",
        items: [
          {
            text: "Getting Testnet Tokens",
            link: "/user-guides/getting-testnet-tokens",
          },
          {
            text: "Using Solana Tools",
            link: "/user-guides/using-solana-tools",
          },
          {
            text: "Integrating Fogo Sessions",
            link: "/user-guides/integrating-fogo-sessions",
          },
          { text: "Running a Node", link: "/user-guides/running-a-node" },
        ],
      },
      {
        text: "Ecosystem",
        items: [
          { text: "Pyth Lazer Oracle", link: "/ecosystem/pyth-lazer-oracle" },
          { text: "Wormhole Bridge", link: "/ecosystem/wormhole-bridge" },
          {
            text: "Metaplex Tokens & NFTs",
            link: "/ecosystem/metaplex-tokens-nfts",
          },
          { text: "Fogoscan Explorer", link: "/ecosystem/fogoscan-explorer" },
          { text: "Goldsky Indexer", link: "/ecosystem/goldsky-indexer" },
          { text: "FluxRPC", link: "/ecosystem/md_fluxrpc" },
        ],
      },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/fogochain" }],
  },
  // Redirect root to API examples
  rewrites: {},
});
