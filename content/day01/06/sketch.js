let pixelSize = 12;

// Pixels-as-material: remake an image with sampled dots (and optional polar remap)
let img;
let step = 6;        // sampling stride in pixels
let usePolar = false;
let jitter = 0.0;    // slight random offset
let useRGB = true;   // true: use original image colors, false: HSB mapping

function preload() {
  img = loadImage('sunset.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  pixelDensity(1);
  noStroke();
}

function draw() {
  background(10);

  // Compute how the image maps to canvas, preserving aspect
  const imgRatio = img.width / img.height;
  let drawW = width;
  let drawH = width / imgRatio;
  if (drawH > height) {
    drawH = height;
    drawW = height * imgRatio;
  }
  const offX = (width - drawW) * 0.5;
  const offY = (height - drawH) * 0.5;

  img.loadPixels();
  if (!useRGB) colorMode(HSB, 360, 100, 100, 100);
  for (let y = 0; y < drawH; y += step) {
    for (let x = 0; x < drawW; x += step) {
      // sample source image coordinates
      const sx = floor(map(x, 0, drawW, 0, img.width - 1));
      const sy = floor(map(y, 0, drawH, 0, img.height - 1));
      const c = img.get(sx, sy);
      const b = useRGB ? luminance01(c) * 100 : brightness(c); // 0..100

      // size by brightness, color from pixel
      const sz = map(b, 0, 100, 1.5, step * 1.1);
      if (useRGB) {
        colorMode(RGB, 255);
        fill(c);
      } else {
        fill(hue(c), saturation(c), b, 100);
      }

      // optional polar remap to "unglue" the grid
      let dx = offX + x + random(-jitter, jitter);
      let dy = offY + y + random(-jitter, jitter);
      if (usePolar) {
        const u = x / drawW;         // 0..1 across width
        const v = y / drawH;         // 0..1 down height
        const ang = u * TWO_PI;
        const rad = v * min(drawW, drawH) * 0.48;
        dx = width * 0.5 + cos(ang) * rad + random(-jitter, jitter);
        dy = height * 0.5 + sin(ang) * rad + random(-jitter, jitter);
      }
      ellipse(dx, dy, sz, sz);
    }
  }
  colorMode(RGB, 255);
}

function keyPressed() {
  if (key === ' ') { usePolar = !usePolar; redraw(); }
  if (key === 'S' || key === 's') saveCanvas('pixels_as_material', 'png');
  if (key === '1') { step = 4; redraw(); }
  if (key === '2') { step = 8; redraw(); }
  if (key === '3') { step = 12; redraw(); }
  if (key === 'C' || key === 'c') { useRGB = !useRGB; redraw(); }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

// Perceptual luminance 0..1 from RGB color
function luminance01(col) {
  const r = red(col) / 255;
  const g = green(col) / 255;
  const b = blue(col) / 255;
  return constrain(0.2126 * r + 0.7152 * g + 0.0722 * b, 0, 1);
}