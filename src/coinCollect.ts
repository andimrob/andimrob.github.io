/**
 * Coin-collect effect: a spinning gold coin pops out of the nav bar
 * with a Mario-style "+1" that floats upward and fades out.
 */
export function fireCoinCollect() {
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;overflow:hidden";
  document.body.appendChild(wrapper);

  // Position coin roughly at center-top where the nav bar lives
  const coinX = window.innerWidth / 2;
  const coinStartY = 48;

  // --- Coin element ---
  const coin = document.createElement("div");
  coin.style.cssText = `
    position:absolute;
    left:${coinX - 16}px;
    top:${coinStartY}px;
    width:32px;
    height:32px;
    border-radius:50%;
    background:radial-gradient(circle at 35% 35%, #ffe066, #f5b800 50%, #c49000);
    box-shadow:0 0 8px rgba(245,184,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.2);
    transform-style:preserve-3d;
    will-change:transform,opacity;
  `;

  // Inner coin face detail (the "1" stamp)
  const face = document.createElement("div");
  face.textContent = "1";
  face.style.cssText = `
    position:absolute;
    inset:0;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:18px;
    font-weight:800;
    color:rgba(160,100,0,0.7);
    line-height:1;
  `;
  coin.appendChild(face);
  wrapper.appendChild(coin);

  // --- "+1" text ---
  const label = document.createElement("div");
  label.textContent = "+1";
  label.style.cssText = `
    position:absolute;
    left:${coinX + 20}px;
    top:${coinStartY}px;
    font-size:20px;
    font-weight:800;
    color:#f5b800;
    text-shadow:0 1px 3px rgba(0,0,0,0.3);
    opacity:1;
    will-change:transform,opacity;
  `;
  wrapper.appendChild(label);

  // --- Sparkle particles ---
  const sparkles: { el: HTMLDivElement; vx: number; vy: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("div");
    const size = 3 + Math.random() * 3;
    s.style.cssText = `
      position:absolute;
      left:${coinX - size / 2}px;
      top:${coinStartY + 16}px;
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:#ffe066;
      opacity:1;
      will-change:transform,opacity;
    `;
    wrapper.appendChild(s);
    const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
    sparkles.push({
      el: s,
      vx: Math.cos(angle) * (1.5 + Math.random() * 2),
      vy: Math.sin(angle) * (1.5 + Math.random() * 2) - 1,
    });
  }

  const start = performance.now();
  const duration = 900;

  function animate(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);

    // Coin: spins and arcs upward then falls
    const coinY = coinStartY - 60 * Math.sin(t * Math.PI);
    const spinDeg = t * 720;
    const coinScale = 1 + 0.3 * Math.sin(t * Math.PI);
    const coinOpacity = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
    coin.style.transform = `translateY(${coinY - coinStartY}px) rotateY(${spinDeg}deg) scale(${coinScale})`;
    coin.style.opacity = `${coinOpacity}`;

    // "+1" label: floats up and fades
    const labelY = -60 * t;
    const labelOpacity = t < 0.5 ? 1 : 1 - (t - 0.5) / 0.5;
    label.style.transform = `translateY(${labelY}px)`;
    label.style.opacity = `${labelOpacity}`;

    // Sparkles: expand outward and fade
    for (const sp of sparkles) {
      const sx = sp.vx * t * 40;
      const sy = sp.vy * t * 40;
      const sOpacity = t < 0.4 ? 1 : 1 - (t - 0.4) / 0.6;
      sp.el.style.transform = `translate(${sx}px, ${sy}px)`;
      sp.el.style.opacity = `${Math.max(0, sOpacity)}`;
    }

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      wrapper.remove();
    }
  }

  requestAnimationFrame(animate);
}
