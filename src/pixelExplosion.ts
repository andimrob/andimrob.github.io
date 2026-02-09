/**
 * Pixel explosion effect: the nav bar area "shatters" into pixel blocks
 * that scatter outward with physics, spin, and fade out.
 */
export function firePixelExplosion() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText =
    "position:fixed;inset:0;z-index:9999;pointer-events:none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;

  // Nav bar approximate bounds
  const barX = Math.max(16, (canvas.width - 1024) / 2);
  const barY = 16;
  const barW = Math.min(1024, canvas.width - 32);
  const barH = 48;

  const pixelSize = 8;
  const cols = Math.ceil(barW / pixelSize);
  const rows = Math.ceil(barH / pixelSize);

  // Color palette — vibrant pixel shards
  const colors = [
    "#2563eb",
    "#7c3aed",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#14b8a6",
  ];

  interface Pixel {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    rot: number;
    rotSpeed: number;
    color: string;
    opacity: number;
    gravity: number;
  }

  const pixels: Pixel[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = barX + c * pixelSize + pixelSize / 2;
      const cy = barY + r * pixelSize + pixelSize / 2;

      // Explosion vector from center of bar
      const centerX = barX + barW / 2;
      const centerY = barY + barH / 2;
      const dx = cx - centerX;
      const dy = cy - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = 3 + Math.random() * 8;

      pixels.push({
        x: cx,
        y: cy,
        w: pixelSize - 1,
        h: pixelSize - 1,
        vx: (dx / dist) * speed + (Math.random() - 0.5) * 4,
        vy: (dy / dist) * speed + (Math.random() - 0.5) * 4 - 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        gravity: 0.15 + Math.random() * 0.1,
      });
    }
  }

  const start = performance.now();
  const duration = 1400;

  function animate(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pixels) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotSpeed;
      p.vx *= 0.98;

      // Fade out in the last 40%
      p.opacity = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}
