// PEN-DRAWN SKETCH — p5.js
// Hold mouse to draw. Press C to clear, S to save.

let paperG, last, speedAvg = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  paperG = createGraphics(width, height);
  drawPaper(paperG);
  background(247, 244, 236);
  image(paperG, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  paperG = createGraphics(width, height);
  drawPaper(paperG);
  background(247, 244, 236);
  image(paperG, 0, 0);
}

function draw() {
  if (mouseIsPressed) penStroke();
}

function penStroke() {
  const p = createVector(mouseX, mouseY);
  if (!last) last = p.copy();

  const v = p5.Vector.sub(p, last);
  const sp = constrain(v.mag(), 0, 40);
  speedAvg = lerp(speedAvg, sp, 0.3);

  const pressure = map(speedAvg, 0, 40, 0.85, 0.25); // slower -> more pressure
  const baseW = map(pressure, 0.25, 0.85, 0.7, 2.6);
  const ink = map(pressure, 0.25, 0.85, 70, 180);

  const nLayers = 5; // micro-hatching layers
  for (let k = 0; k < nLayers; k++) {
    const t = k / (nLayers - 1);
    const w = baseW * (0.6 + 0.8 * (1 - abs(t - 0.5) * 2));
    const jitter = 0.9 * (1 - pressure) + 0.2;
    const off = p5.Vector.fromAngle(v.heading() + HALF_PI)
      .setMag((t - 0.5) * w * 2.2 + (noise(frameCount * 0.02 + k) - 0.5) * w * jitter);

    const a1 = createVector(last.x + off.x, last.y + off.y);
    const a2 = createVector(p.x + off.x, p.y + off.y);

    const dash = 6 + noise(k * 20 + frameCount * 0.02) * 8;
    const len = p5.Vector.dist(a1, a2);
    const dir = p5.Vector.sub(a2, a1).normalize();

    let drawn = 0;
    while (drawn < len) {
      const seg = min(dash, len - drawn);
      const s1 = p5.Vector.add(a1, p5.Vector.mult(dir, drawn));
      const s2 = p5.Vector.add(a1, p5.Vector.mult(dir, drawn + seg));
      const alpha = ink * random(0.7, 1.0);
      stroke(20, alpha);
      strokeWeight(1);
      line(s1.x, s1.y, s2.x, s2.y);
      drawn += seg + random(2, 5); // tiny gaps for pen texture
    }
  }

  // micro scribble around the path for fiber look
  for (let i = 0; i < 10; i++) {
    const a = random(TWO_PI);
    const r = random(baseW * 0.5, baseW * 2.2);
    const px = p.x + cos(a) * r, py = p.y + sin(a) * r;
    const len = random(1, 6);
    const ang = a + random(-0.7, 0.7);
    stroke(20, random(40, 120));
    strokeWeight(0.6);
    line(px, py, px + cos(ang) * len, py + sin(ang) * len);
  }

  // occasional ink dot when moving slowly
  if (random() < 0.1 && speedAvg < 6) {
    noStroke();
    fill(20, random(40, 120));
    const r = random(0.6, 2.4) * map(pressure, 0.25, 0.85, 0.8, 1.8);
    circle(p.x + random(-1, 1), p.y + random(-1, 1), r);
  }

  last = p.copy();
}

function mouseReleased() {
  last = null;
  speedAvg = 0;
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    background(247, 244, 236);
    image(paperG, 0, 0);
  }
  if (key === 'S' || key === 's') saveCanvas('pen_drawn', 'png');
}

function drawPaper(g) {
  g.background(247, 244, 236);
  g.noStroke();
  for (let i = 0; i < width * height * 0.015; i++) {
    const x = random(width), y = random(height);
    const a = random(6, 16);
    g.fill(0, 0, 0, a);
    g.circle(x, y, random(0.4, 1.2));
  }
  g.noFill();
  for (let r = 0; r < 120; r++) {
    g.stroke(0, 0, 0, map(r, 0, 119, 2, 12));
    g.rect(8 + r * 0.5, 8 + r * 0.5, width - 16 - r, height - 16 - r, 10);
  }
}