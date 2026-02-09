/**
 * Paper lamp effect: the nav bar glows warmly like a lit paper lantern,
 * pulsing with soft light before gently fading back to normal.
 */
export function firePaperLamp(el: HTMLElement) {
  // Warm glow colors
  const glowColor = "rgba(251, 191, 36, 0.6)";
  const glowColorStrong = "rgba(251, 191, 36, 0.85)";

  const start = performance.now();
  const duration = 2000;

  // Store original styles to restore later
  const origTransition = el.style.transition;
  const origBoxShadow = el.style.boxShadow;
  const origBackground = el.style.background;

  // Disable CSS transitions so we drive the animation manually
  el.style.transition = "none";

  function animate(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);

    // Pulse: quick rise, gentle breathe, then fade
    let intensity: number;
    if (t < 0.15) {
      // Fast rise
      intensity = t / 0.15;
    } else if (t < 0.6) {
      // Gentle breathing pulse
      const breathe = (t - 0.15) / 0.45;
      intensity = 1 - 0.2 * Math.sin(breathe * Math.PI * 3);
    } else {
      // Fade out
      intensity = 1 - (t - 0.6) / 0.4;
    }

    intensity = Math.max(0, Math.min(1, intensity));

    const spread = 20 + intensity * 30;
    const blur = 15 + intensity * 25;
    const alpha = 0.3 + intensity * 0.55;

    el.style.boxShadow = [
      `0 0 ${blur}px ${spread}px rgba(251, 191, 36, ${alpha})`,
      `0 0 ${blur * 0.5}px ${spread * 0.4}px rgba(251, 146, 36, ${alpha * 0.6})`,
      `inset 0 0 ${blur * 0.6}px rgba(251, 191, 36, ${alpha * 0.3})`,
    ].join(", ");

    // Warm tint overlay via background blend
    const bgAlpha = intensity * 0.12;
    el.style.background = `linear-gradient(rgba(251, 191, 36, ${bgAlpha}), rgba(251, 146, 36, ${bgAlpha * 0.7}))`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      // Restore originals
      el.style.transition = origTransition;
      el.style.boxShadow = origBoxShadow;
      el.style.background = origBackground;
    }
  }

  // Add a brief flicker at the very start
  el.style.boxShadow = `0 0 30px 15px ${glowColor}, 0 0 60px 30px ${glowColorStrong}`;
  requestAnimationFrame(animate);
}
