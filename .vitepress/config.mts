import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fogo",
  description: "Fogo docs site",
  srcDir: "src",
  themeConfig: {
    siteTitle: "Fogo",
    sidebar: [
      {
        text: "",
        items: [
          { text: "About", link: "/" },
          { text: "Running a Node", link: "/running-a-node" },
          { text: "Releases", link: "/releases" },
          { text: "Testnet", link: "/testnet" },
        ],
      },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/fogochain" }],
  },
  // Redirect root to API examples
  rewrites: {},
});
