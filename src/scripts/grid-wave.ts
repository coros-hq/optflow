export function initGridWave(container: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  container.appendChild(canvas);

  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  let step = 0;

  const handleResize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener("resize", handleResize);

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(47, 111, 214, 0.12)";
    ctx.lineWidth = 1;

    const gridGap = 40;
    step += 0.02;

    for (let x = 0; x < width; x += gridGap) {
      ctx.beginPath();
      for (let y = 0; y < height; y += 10) {
        const distortion = Math.sin(x * 0.005 + y * 0.008 + step) * 12;
        if (y === 0) ctx.moveTo(x + distortion, y);
        else ctx.lineTo(x + distortion, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
}
