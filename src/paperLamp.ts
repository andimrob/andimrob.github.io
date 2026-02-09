/**
 * Paper lamp effect: the nav bar area glows warmly like a lit paper
 * lantern, pulsing with soft light before gently fading back to normal.
 *
 * Uses an overlay element so the glow is not affected by the prism's
 * preserve-3d transforms.
 */
export function firePaperLamp(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  // Create an overlay positioned exactly over the nav bar
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;
    top:${rect.top}px;
    left:${rect.left}px;
    width:${rect.width}px;
    height:${rect.height}px;
    z-index:9998;
    pointer-events:none;
    border-radius:2px;
  `;
  document.body.appendChild(overlay);

  const start = performance.now();
  const duration = 2000;

  function animate(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);

    // Pulse: quick rise, gentle breathe, then fade
    let intensity: number;
    if (t < 0.15) {
      intensity = t / 0.15;
    } else if (t < 0.6) {
      const breathe = (t - 0.15) / 0.45;
      intensity = 1 - 0.2 * Math.sin(breathe * Math.PI * 3);
    } else {
      intensity = 1 - (t - 0.6) / 0.4;
    }

    intensity = Math.max(0, Math.min(1, intensity));

    const spread = 20 + intensity * 30;
    const blur = 15 + intensity * 25;
    const alpha = 0.3 + intensity * 0.55;

    overlay.style.boxShadow = [
      `0 0 ${blur}px ${spread}px rgba(251, 191, 36, ${alpha})`,
      `0 0 ${blur * 0.5}px ${spread * 0.4}px rgba(251, 146, 36, ${alpha * 0.6})`,
      `inset 0 0 ${blur * 0.6}px rgba(251, 191, 36, ${alpha * 0.3})`,
    ].join(", ");

    const bgAlpha = intensity * 0.12;
    overlay.style.background = `linear-gradient(rgba(251, 191, 36, ${bgAlpha}), rgba(251, 146, 36, ${bgAlpha * 0.7}))`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      overlay.remove();
    }
  }

  requestAnimationFrame(animate);
}
