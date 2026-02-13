import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import './custom.css'
import Logo from "./logo.vue";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app, router }) => {
    app.component("Fogo", Logo);

    if (typeof window === "undefined") {
      return;
    }

    const ENHANCED_ATTR = "data-mermaid-fullscreen-enhanced";
    const BUTTON_CLASS = "mermaid-fullscreen-toggle";
    const ACTIVE_CLASS = "mermaid-fs-fallback";
    const BODY_ACTIVE_CLASS = "mermaid-fs-active";
    let observer: MutationObserver | null = null;

    const isSequenceDiagram = (container: HTMLElement): boolean => {
      const svg = container.querySelector("svg");
      if (!svg) {
        return false;
      }
      return Boolean(svg.querySelector(".messageText, .sequenceNumber"));
    };

    const updateButtonLabel = (container: HTMLElement, button: HTMLButtonElement): void => {
      const isFullscreen = document.fullscreenElement === container || container.classList.contains(ACTIVE_CLASS);
      button.textContent = isFullscreen ? "Exit fullscreen" : "Fullscreen";
    };

    const exitFallbackFullscreen = (container: HTMLElement): void => {
      container.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);
    };

    const toggleFullscreen = async (container: HTMLElement, button: HTMLButtonElement): Promise<void> => {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
        updateButtonLabel(container, button);
        return;
      }

      if (container.requestFullscreen) {
        await container.requestFullscreen();
        updateButtonLabel(container, button);
        return;
      }

      if (container.classList.contains(ACTIVE_CLASS)) {
        exitFallbackFullscreen(container);
      } else {
        container.classList.add(ACTIVE_CLASS);
        document.body.classList.add(BODY_ACTIVE_CLASS);
      }
      updateButtonLabel(container, button);
    };

    const enhanceDiagram = (container: HTMLElement): void => {
      if (container.getAttribute(ENHANCED_ATTR) === "true") {
        return;
      }
      if (!isSequenceDiagram(container)) {
        return;
      }

      container.setAttribute(ENHANCED_ATTR, "true");
      container.classList.add("mermaid-has-fullscreen");

      const button = document.createElement("button");
      button.type = "button";
      button.className = BUTTON_CLASS;
      button.textContent = "Fullscreen";
      button.addEventListener("click", () => {
        void toggleFullscreen(container, button);
      });
      container.prepend(button);
    };

    const refresh = (): void => {
      const mermaidBlocks = document.querySelectorAll<HTMLElement>(".VPDoc .mermaid");
      mermaidBlocks.forEach(enhanceDiagram);
    };

    const setupObserver = (): void => {
      if (observer) {
        observer.disconnect();
      }
      observer = new MutationObserver(() => {
        refresh();
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const handleFullscreenChange = (): void => {
      const mermaidBlocks = document.querySelectorAll<HTMLElement>(".VPDoc .mermaid");
      mermaidBlocks.forEach((container) => {
        const button = container.querySelector<HTMLButtonElement>(`.${BUTTON_CLASS}`);
        if (button) {
          updateButtonLabel(container, button);
        }
        if (document.fullscreenElement && document.fullscreenElement !== container) {
          exitFallbackFullscreen(container);
        }
      });
    };

    const closeFallbackOnEscape = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }
      const active = document.querySelector<HTMLElement>(`.${ACTIVE_CLASS}`);
      if (active) {
        exitFallbackFullscreen(active);
        const button = active.querySelector<HTMLButtonElement>(`.${BUTTON_CLASS}`);
        if (button) {
          updateButtonLabel(active, button);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", closeFallbackOnEscape);

    const previousAfterRouteChanged = router.onAfterRouteChanged;
    router.onAfterRouteChanged = (to) => {
      previousAfterRouteChanged?.(to);
      refresh();
    };

    setupObserver();
    window.setTimeout(refresh, 0);
  }
} satisfies Theme
