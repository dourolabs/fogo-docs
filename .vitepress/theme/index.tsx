import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import './custom.css'
import Logo from "./logo.vue";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("Fogo", Logo);
  }
} satisfies Theme
