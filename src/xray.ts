/**
 * X-Ray Source Code Easter Egg
 *
 * Press "x" on the keyboard to toggle an X-ray lens that follows
 * the mouse. Through the lens, the page content appears restyled
 * as monospaced "source code" with syntax-highlighted colors on
 * a dark translucent background. The lens has a glass border and
 * backdrop blur for a physical magnifying-glass feel.
 *
 * The real page underneath remains fully interactive because the
 * overlay uses pointer-events: none.
 */

const LENS_RADIUS = 140;

let container: HTMLElement | null = null;
let blurLayer: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let inner: HTMLElement | null = null;
let ring: HTMLElement | null = null;
let styleEl: HTMLStyleElement | null = null;
let fontLink: HTMLLinkElement | null = null;
let active = false;
let mouseX = -300;
let mouseY = -300;

function ensureFont() {
  if (document.getElementById("xray-font")) return;
  fontLink = document.createElement("link");
  fontLink.id = "xray-font";
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap";
  document.head.appendChild(fontLink);
}

function injectStyles() {
  styleEl = document.createElement("style");
  styleEl.id = "xray-styles";
  styleEl.textContent = `
    #xray-overlay * {
      font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace !important;
      box-shadow: none !important;
    }

    #xray-inner {
      background: rgba(22, 22, 35, 0.85) !important;
    }

    #xray-overlay h1, #xray-overlay h2, #xray-overlay h3, #xray-overlay h4 {
      color: #ff79c6 !important;
    }
    #xray-overlay p, #xray-overlay li {
      color: #50fa7b !important;
    }
    #xray-overlay a {
      color: #8be9fd !important;
      text-decoration: underline !important;
    }
    #xray-overlay button, #xray-overlay [role="button"] {
      color: #f1fa8c !important;
      background: rgba(255,255,255,0.06) !important;
      border-color: rgba(255,255,255,0.15) !important;
    }
    #xray-overlay span {
      color: #bd93f9 !important;
    }
    #xray-overlay svg {
      color: #ffb86c !important;
      stroke: #ffb86c !important;
    }
    #xray-overlay img {
      filter: grayscale(1) brightness(0.6) contrast(1.2) !important;
    }
    #xray-overlay section, #xray-overlay div {
      background: transparent !important;
      border-color: rgba(255,255,255,0.08) !important;
    }
  `;
  document.head.appendChild(styleEl);
}

function createLayers() {
  const root = document.getElementById("root");
  if (!root) return;

  container = document.createElement("div");
  container.id = "xray-container";
  container.style.cssText =
    "position:fixed;inset:0;z-index:9998;pointer-events:none;";

  // Blur layer — sits between real page and code overlay
  blurLayer = document.createElement("div");
  blurLayer.style.cssText = [
    "position:fixed;inset:0;",
    "backdrop-filter:blur(4px);",
    "-webkit-backdrop-filter:blur(4px);",
    "clip-path:circle(0px at -300px -300px);",
  ].join("");
  container.appendChild(blurLayer);

  // Code overlay — cloned content restyled as "source code"
  overlay = document.createElement("div");
  overlay.id = "xray-overlay";
  overlay.style.cssText = [
    "position:fixed;inset:0;",
    "overflow:hidden;",
    "clip-path:circle(0px at -300px -300px);",
  ].join("");

  inner = document.createElement("div");
  inner.id = "xray-inner";
  inner.style.cssText = "min-height:100%;";

  const clone = root.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");

  inner.appendChild(clone);
  overlay.appendChild(inner);
  container.appendChild(overlay);

  // Lens ring — thin white glass border
  ring = document.createElement("div");
  ring.style.cssText = [
    "position:fixed;",
    `width:${LENS_RADIUS * 2}px;`,
    `height:${LENS_RADIUS * 2}px;`,
    "border:1.5px solid rgba(255,255,255,0.35);",
    "border-radius:50%;",
    "pointer-events:none;",
    "box-shadow:0 0 20px 2px rgba(255,255,255,0.08),inset 0 0 20px 2px rgba(255,255,255,0.04);",
    "transform:translate(-50%,-50%);",
    "left:-300px;top:-300px;",
  ].join("");
  container.appendChild(ring);

  document.body.appendChild(container);
}

function updateLens() {
  const clip = `circle(${LENS_RADIUS}px at ${mouseX}px ${mouseY}px)`;
  if (blurLayer) blurLayer.style.clipPath = clip;
  if (overlay) overlay.style.clipPath = clip;
  if (ring) {
    ring.style.left = `${mouseX}px`;
    ring.style.top = `${mouseY}px`;
  }
}

function syncScroll() {
  if (inner) {
    inner.style.transform = `translateY(${-window.scrollY}px)`;
  }
}

function onMouseMove(e: MouseEvent) {
  if (!active) return;
  mouseX = e.clientX;
  mouseY = e.clientY;
  requestAnimationFrame(() => {
    updateLens();
    syncScroll();
  });
}

function onScroll() {
  if (!active) return;
  requestAnimationFrame(syncScroll);
}

function teardown() {
  active = false;
  container?.remove();
  styleEl?.remove();
  container = null;
  blurLayer = null;
  overlay = null;
  inner = null;
  ring = null;
  styleEl = null;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("scroll", onScroll);
}

export function activateXRay() {
  if (active) {
    teardown();
    return;
  }
  active = true;
  ensureFont();
  injectStyles();
  createLayers();
  syncScroll();

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll, { passive: true });
}

/**
 * Initialise keyboard listener. Press "x" to toggle the X-ray lens.
 * Returns a cleanup function.
 */
export function initXRay() {
  const onKeyDown = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "x" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      activateXRay();
    }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    if (active) teardown();
  };
}
