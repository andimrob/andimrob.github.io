export const LENS_RADIUS = 140;

export const C = {
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

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Rule = readonly [RegExp, string];

export function highlight(code: string, rules: readonly Rule[]): string {
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

export const JS_RULES: Rule[] = [
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

let cachedSourceHTML: string | null = null;

export async function buildSource(): Promise<string> {
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

export function ensureFont() {
  if (document.getElementById("xray-font")) return;
  const link = document.createElement("link");
  link.id = "xray-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap";
  document.head.appendChild(link);
}
