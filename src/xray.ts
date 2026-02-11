/**
 * X-Ray Source Code Easter Egg
 *
 * Press "x" on the keyboard to toggle an X-ray lens that follows
 * the mouse. Through the lens the site's actual minified source
 * code (the JS bundle) is revealed with Dracula-theme
 * syntax highlighting on a dark background.
 *
 * The real page underneath remains fully interactive because the
 * overlay uses pointer-events: none.
 */

const LENS_RADIUS = 140;

/* ── Catppuccin Mocha palette ── */

const C = {
  bg: "#1e1e2e",
  fg: "#cdd6f4",
  overlay: "#6c7086",
  blue: "#89b4fa",
  green: "#a6e3a1",
  teal: "#94e2d5",
  mauve: "#cba6f7",
  peach: "#fab387",
  red: "#f38ba8",
  yellow: "#f9e2af",
} as const;

/* ── State ── */

let container: HTMLElement | null = null;
let blurLayer: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let inner: HTMLElement | null = null;
let ring: HTMLElement | null = null;
let fontLink: HTMLLinkElement | null = null;
let active = false;
let mouseX = -300;
let mouseY = -300;
let cachedSourceHTML: string | null = null;

/* ── Escape HTML entities ── */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ── Single-pass regex syntax highlighter ── */

type Rule = readonly [RegExp, string];

function highlight(code: string, rules: readonly Rule[]): string {
  if (!code) return "";
  const combined = new RegExp(
    rules.map((r) => `(${r[0].source})`).join("|"),
    "gm",
  );
  let out = "";
  let last = 0;
  for (const m of code.matchAll(combined)) {
    // Unmatched text before this token — inherits default color from <pre>
    if (m.index! > last) out += esc(code.slice(last, m.index!));
    // Determine which capture group matched and apply its color
    for (let i = 0; i < rules.length; i++) {
      if (m[i + 1] !== undefined) {
        out += `<span style="color:${rules[i][1]};text-shadow:0 0 6px ${rules[i][1]}80,0 0 14px ${rules[i][1]}40">${esc(m[0])}</span>`;
        break;
      }
    }
    last = m.index! + m[0].length;
  }
  if (last < code.length) out += esc(code.slice(last));
  return out;
}

/* ── Language rules (order matters — first match wins) ── */

const JS_RULES: Rule[] = [
  [/"(?:[^"\\]|\\.)*"/, C.green],
  [/'(?:[^'\\]|\\.)*'/, C.green],
  [/`(?:[^`\\]|\\.)*`/, C.green],
  [
    /\b(?:const|let|var|function|return|if|else|for|while|class|import|export|from|new|this|typeof|instanceof|async|await|try|catch|throw|switch|case|default|break|continue|do|in|of|void|delete|yield|extends|super|static|get|set)\b/,
    C.mauve,
  ],
  [/\b(?:true|false|null|undefined|NaN|Infinity)\b/, C.peach],
  [
    /\b(?:console|document|window|Math|Object|Array|String|Number|Promise|Error|Map|Set|JSON|Date|RegExp|Symbol|Proxy|Reflect)\b/,
    C.blue,
  ],
  [/\.[\w$]+/, C.teal],
  [/\b\d+\.?\d*(?:e[+-]?\d+)?\b/i, C.peach],
  [/=>/, C.mauve],
  [/[{}()\[\];,]/, C.overlay],
];

/* ── Collapse whitespace so dev-mode source looks minified ── */

function compact(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── Fetch & highlight the site's JS bundle(s) ── */

async function buildSource(): Promise<string> {
  if (cachedSourceHTML) return cachedSourceHTML;

  const chunks: string[] = [];
  const scripts = document.querySelectorAll<HTMLScriptElement>("script[src]");
  for (const script of scripts) {
    try {
      const text = await (await fetch(script.src)).text();
      chunks.push(text);
    } catch {
      /* skip unavailable scripts */
    }
  }

  const raw = compact(chunks.join(";"));
  cachedSourceHTML = highlight(raw, JS_RULES);
  return cachedSourceHTML;
}

/* ── Font ── */

function ensureFont() {
  if (document.getElementById("xray-font")) return;
  fontLink = document.createElement("link");
  fontLink.id = "xray-font";
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap";
  document.head.appendChild(fontLink);
}

/* ── Build DOM layers ── */

function createLayers(sourceHTML: string) {
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

  // Code overlay — syntax-highlighted source visible through the lens
  overlay = document.createElement("div");
  overlay.id = "xray-overlay";
  overlay.style.cssText = [
    "position:fixed;inset:0;",
    "overflow:hidden;",
    "clip-path:circle(0px at -300px -300px);",
  ].join("");

  inner = document.createElement("div");
  inner.id = "xray-inner";
  inner.style.cssText = `background:${C.bg};min-height:100vh;`;

  const pre = document.createElement("pre");
  pre.style.cssText = [
    `color:${C.fg};`,
    `text-shadow:0 0 6px ${C.fg}80,0 0 14px ${C.fg}40;`,
    `background:${C.bg};`,
    "font-family:'JetBrains Mono','Fira Code','Courier New',monospace;",
    "font-size:13.5px;",
    "line-height:1.35;",
    "padding:12px;",
    "margin:0;",
    "white-space:pre-wrap;",
    "word-wrap:break-word;",
    "overflow-wrap:break-word;",
  ].join("");
  pre.innerHTML = sourceHTML;

  inner.appendChild(pre);
  overlay.appendChild(inner);
  container.appendChild(overlay);

  // Lens ring — thin white glass border
  ring = document.createElement("div");
  ring.style.cssText = [
    "position:fixed;",
    `width:${LENS_RADIUS * 2}px;`,
    `height:${LENS_RADIUS * 2}px;`,
    "border:1.5px solid rgba(180,190,254,0.4);",
    "border-radius:50%;",
    "pointer-events:none;",
    "box-shadow:0 0 20px 2px rgba(137,180,250,0.1),inset 0 0 20px 2px rgba(137,180,250,0.05);",
    "transform:translate(-50%,-50%);",
    "left:-300px;top:-300px;",
  ].join("");
  container.appendChild(ring);

  document.body.appendChild(container);
}

/* ── Lens position & proportional scroll ── */

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
  if (!inner) return;
  const maxPageScroll = document.body.scrollHeight - window.innerHeight;
  const maxCodeScroll = inner.scrollHeight - window.innerHeight;
  if (maxPageScroll <= 0) {
    inner.style.transform = "translateY(0)";
    return;
  }
  const fraction = Math.min(window.scrollY / maxPageScroll, 1);
  const codeOffset = fraction * Math.max(0, maxCodeScroll);
  inner.style.transform = `translateY(${-codeOffset}px)`;
}

/* ── Event handlers ── */

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

/* ── Teardown ── */

function teardown() {
  active = false;
  container?.remove();
  container = null;
  blurLayer = null;
  overlay = null;
  inner = null;
  ring = null;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("scroll", onScroll);
}

/* ── Public API ── */

export async function activateXRay() {
  if (active) {
    teardown();
    return;
  }
  active = true;
  ensureFont();
  const sourceHTML = await buildSource();
  if (!active) return; // user toggled off during fetch
  createLayers(sourceHTML);
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
