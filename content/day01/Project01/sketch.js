let pixelSize = 12;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  // --- GRADIENT SKY (manual color bands for pixel style) ---

  // Top: deep blue
  fill(40, 60, 130);
  rect(0, 0, width, 110);

  // Mid: purple
  fill(120, 70, 150);
  rect(0, 110, width, 90);

  // Lower mid: pink-purple
  fill(200, 100, 160);
  rect(0, 200, width, 70);

  // Near-horizon: warm yellow
  fill(255, 200, 120);
  rect(0, 270, width, 40);

  // --- SUN ---
  fill(255, 230, 180);
  circle(width / 2, 260, 120);

  // --- BACK OCEAN ---
  fill(30, 100, 190);
  rect(0, 270, width, 110);

  // --- MOVING PIXEL WAVES ---
  let t = frameCount * 0.5;
  let baseY = 260 + (t % 110); // moves toward shore

  for (let x = 0; x < width; x += pixelSize) {
    let waveOffset = sin(x * 0.15 + frameCount * 0.1) * 12;
    let y = baseY + waveOffset;

    // wave body
    fill(15, 70, 160);
    rect(x, y, pixelSize, 200);

    // foam
    fill(240, 250, 255);
    rect(x, y - pixelSize, pixelSize, pixelSize);
  }

  // --- BEACH ---
  fill(255, 170, 150);
  rect(0, 340, width, 60);
}

