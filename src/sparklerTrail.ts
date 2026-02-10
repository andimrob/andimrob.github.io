/**
 * Sparkler Trail Easter Egg
 *
 * Hold down and drag anywhere on the page to leave a trail of
 * colorful sparks that arc, fade, and fall with gravity.
 * Works on both mouse (desktop) and touch (mobile) devices.
 */

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const GRAVITY = 0.12;
const FRICTION = 0.98;
const SPARKS_PER_MOVE = 3;
const SPARK_MAX_LIFE = 50;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let sparks: Spark[] = [];
let animId = 0;
let isDown = false;
let hueOffset = 0;

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function spawnSparks(x: number, y: number) {
  for (let i = 0; i < SPARKS_PER_MOVE; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2, // slight upward bias
      life: SPARK_MAX_LIFE,
      maxLife: SPARK_MAX_LIFE,
      size: 2 + Math.random() * 3,
      hue: (hueOffset + Math.random() * 60) % 360,
    });
  }
  hueOffset = (hueOffset + 2) % 360;
}

function tick() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.vy += GRAVITY;
    s.vx *= FRICTION;
    s.vy *= FRICTION;
    s.x += s.vx;
    s.y += s.vy;
    s.life--;

    if (s.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }

    const alpha = s.life / s.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `hsl(${s.hue}, 90%, 60%)`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  if (sparks.length > 0 || isDown) {
    animId = requestAnimationFrame(tick);
  } else {
    // Hide canvas when idle to avoid blocking pointer events
    if (canvas) canvas.style.display = "none";
    animId = 0;
  }
}

function ensureRunning() {
  if (!canvas) return;
  canvas.style.display = "block";
  if (!animId) {
    animId = requestAnimationFrame(tick);
  }
}

function handlePointerDown() {
  isDown = true;
}

function handlePointerUp() {
  isDown = false;
}

function handlePointerMove(e: PointerEvent) {
  if (!isDown) return;
  // Don't interfere with text selection or interactive elements
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === "A" || tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA")
    return;
  spawnSparks(e.clientX, e.clientY);
  ensureRunning();
}

export function initSparklerTrail() {
  canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;z-index:9998;pointer-events:none;display:none;";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();

  window.addEventListener("resize", resize);
  window.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("pointercancel", handlePointerUp);
  window.addEventListener("pointermove", handlePointerMove);

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointerdown", handlePointerDown);
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointercancel", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
    cancelAnimationFrame(animId);
    canvas?.remove();
    canvas = null;
    ctx = null;
    sparks = [];
    animId = 0;
  };
}
