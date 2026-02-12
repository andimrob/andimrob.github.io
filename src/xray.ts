/**
 * X-Ray Source Code Easter Egg
 *
 * Press "x" on the keyboard to toggle an X-ray lens that follows
 * the mouse. Through the lens the site's actual minified source
 * code (the JS bundle) is revealed with syntax highlighting
 * on a dark background.
 *
 * The real page underneath remains fully interactive because the
 * overlay uses pointer-events: none.
 */

/* ================================================================== */
/*  State                                                              */
/* ================================================================== */

let active = false;
const listeners = new Set<(active: boolean) => void>();

export function onXRayChange(fn: (active: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notifyListeners() {
  listeners.forEach((fn) => fn(active));
}

/* ================================================================== */
/*  Mode 1 — X-Ray (existing)                                         */
/* ================================================================== */

const LENS_RADIUS = 140;

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

let xrayContainer: HTMLElement | null = null;
let xrayBlur: HTMLElement | null = null;
let xrayOverlay: HTMLElement | null = null;
let xrayInner: HTMLElement | null = null;
let xrayRing: HTMLElement | null = null;
let mouseX = -300;
let mouseY = -300;

export function getMousePosition() {
  return { x: mouseX, y: mouseY };
}
let cachedSourceHTML: string | null = null;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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
    if (m.index! > last) out += esc(code.slice(last, m.index!));
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
  [/[{}()[\];,]/, C.overlay],
];

function compact(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function buildSource(): Promise<string> {
  if (cachedSourceHTML) return cachedSourceHTML;
  const chunks: string[] = [];
  const scripts = document.querySelectorAll<HTMLScriptElement>("script[src]");
  for (const script of scripts) {
    try {
      const text = await (await fetch(script.src)).text();
      chunks.push(text);
    } catch {
      /* skip */
    }
  }
  const raw = compact(chunks.join(";"));
  cachedSourceHTML = highlight(raw, JS_RULES);
  return cachedSourceHTML;
}

function ensureFont() {
  if (document.getElementById("xray-font")) return;
  const link = document.createElement("link");
  link.id = "xray-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap";
  document.head.appendChild(link);
}

function xrayCreateLayers(sourceHTML: string) {
  xrayContainer = document.createElement("div");
  xrayContainer.id = "xray-container";
  xrayContainer.style.cssText =
    "position:fixed;inset:0;z-index:9998;pointer-events:none;";

  xrayBlur = document.createElement("div");
  xrayBlur.style.cssText = [
    "position:fixed;inset:0;",
    "backdrop-filter:blur(4px);",
    "-webkit-backdrop-filter:blur(4px);",
    "clip-path:circle(0px at -300px -300px);",
  ].join("");
  xrayContainer.appendChild(xrayBlur);

  xrayOverlay = document.createElement("div");
  xrayOverlay.id = "xray-overlay";
  xrayOverlay.style.cssText = [
    "position:fixed;inset:0;",
    "overflow:hidden;",
    "clip-path:circle(0px at -300px -300px);",
  ].join("");

  xrayInner = document.createElement("div");
  xrayInner.id = "xray-inner";
  xrayInner.style.cssText = `background:${C.bg};min-height:100vh;`;

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

  xrayInner.appendChild(pre);
  xrayOverlay.appendChild(xrayInner);
  xrayContainer.appendChild(xrayOverlay);

  xrayRing = document.createElement("div");
  xrayRing.style.cssText = [
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
  xrayContainer.appendChild(xrayRing);

  document.body.appendChild(xrayContainer);
}

function xrayUpdateLens() {
  const clip = `circle(${LENS_RADIUS}px at ${mouseX}px ${mouseY}px)`;
  if (xrayBlur) xrayBlur.style.clipPath = clip;
  if (xrayOverlay) xrayOverlay.style.clipPath = clip;
  if (xrayRing) {
    xrayRing.style.left = `${mouseX}px`;
    xrayRing.style.top = `${mouseY}px`;
  }
}

function xraySyncScroll() {
  if (!xrayInner) return;
  const maxPage = document.body.scrollHeight - window.innerHeight;
  const maxCode = xrayInner.scrollHeight - window.innerHeight;
  if (maxPage <= 0) {
    xrayInner.style.transform = "translateY(0)";
    return;
  }
  const fraction = Math.min(window.scrollY / maxPage, 1);
  xrayInner.style.transform = `translateY(${-(fraction * Math.max(0, maxCode))}px)`;
}

function trackMouse(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function xrayOnMouseMove() {
  if (!active) return;
  requestAnimationFrame(() => {
    xrayUpdateLens();
    xraySyncScroll();
  });
}

function xrayOnScroll() {
  if (!active) return;
  requestAnimationFrame(xraySyncScroll);
}

async function activateXRay() {
  if (active) {
    deactivateXRay();
    return;
  }
  active = true;
  notifyListeners();
  ensureFont();
  const sourceHTML = await buildSource();
  if (!active) return; // user toggled off during fetch
  xrayCreateLayers(sourceHTML);
  xrayUpdateLens();
  xraySyncScroll();
  window.addEventListener("mousemove", xrayOnMouseMove);
  window.addEventListener("scroll", xrayOnScroll, { passive: true });
}

function deactivateXRay() {
  active = false;
  notifyListeners();
  xrayContainer?.remove();
  xrayContainer = null;
  xrayBlur = null;
  xrayOverlay = null;
  xrayInner = null;
  xrayRing = null;
  window.removeEventListener("mousemove", xrayOnMouseMove);
  window.removeEventListener("scroll", xrayOnScroll);
}

/* ================================================================== */
/*  Public API                                                         */
/* ================================================================== */

/**
 * Initialise keyboard listener. Press "x" to toggle the X-ray lens.
 * Returns a cleanup function.
 */
export function initXRay() {
  window.addEventListener("mousemove", trackMouse);

  const onKeyDown = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "x" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      activateXRay();
    }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("mousemove", trackMouse);
    window.removeEventListener("keydown", onKeyDown);
    if (active) deactivateXRay();
  };
}
