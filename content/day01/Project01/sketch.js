let pixelSize = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Ölçek faktörü (orijinal 600x400'e göre)
  const s = height / 400;

  // --- GRADIENT SKY (manual color bands for pixel style) ---

  // Top: deep blue
  fill(40, 60, 130);
  rect(0, 0, width, 110 * s);

  // Mid: purple
  fill(120, 70, 150);
  rect(0, 110 * s, width, 90 * s);

  // Lower mid: pink-purple
  fill(200, 100, 160);
  rect(0, 200 * s, width, 70 * s);

  // Near-horizon: warm yellow
  fill(255, 200, 120);
  rect(0, 270 * s, width, 40 * s);

  // --- SUN ---
  fill(255, 230, 180);
  circle(width / 2, 260 * s, 120 * s);

  // --- BACK OCEAN ---
  fill(30, 100, 190);
  rect(0, 270 * s, width, 110 * s);

  // --- MOVING PIXEL WAVES ---
  let t = frameCount * 0.5;
  let baseY = 260 * s + (t % (110 * s)); // moves toward shore

  const step = max(6, pixelSize * s);
  for (let x = 0; x < width; x += step) {
    let waveOffset = sin(x * 0.15 + frameCount * 0.1) * (12 * s);
    let y = baseY + waveOffset;

    // wave body
    fill(15, 70, 160);
    rect(x, y, step, 200 * s);

    // foam
    fill(240, 250, 255);
    rect(x, y - step, step, step);
  }

  // --- BEACH ---
  fill(255, 170, 150);
  rect(0, 340 * s, width, 60 * s);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

