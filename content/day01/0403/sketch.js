// Doctor Strange Style Portal — p5.js
// Move mouse to slightly distort energy flow.
// Press SPACE to restart animation, S to save.

let particles = [];
let angleOff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
  noStroke();
  for (let i = 0; i < 600; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(5, 40); // fade trail
  translate(width / 2, height / 2);
  angleOff += 0.01;

  // glowing inner ring
  drawGlow(0, 0, 180, color(255, 160, 30), 10);
  drawGlow(0, 0, 260, color(255, 120, 20), 6);

  // particle system (rotating sparks)
  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.a = random(TWO_PI);
    this.r = random(160, 300);
    this.speed = random(0.008, 0.02);
    this.size = random(1, 3);
    this.alpha = random(80, 200);
  }
  update() {
    this.a += this.speed + sin(frameCount * 0.002) * 0.0008;
    this.r += sin(frameCount * 0.01 + this.a) * 0.1;
  }
  show() {
    const x = cos(this.a + angleOff) * this.r;
    const y = sin(this.a + angleOff) * this.r;
    const flicker = random(0.7, 1.3);
    fill(255 * flicker, 140 * flicker, 40, this.alpha);
    circle(x, y, this.size * flicker * 2);
  }
}

function drawGlow(x, y, r, c, layers) {
  noStroke();
  for (let i = layers; i > 0; i--) {
    const alpha = map(i, layers, 0, 100, 0);
    fill(red(c), green(c), blue(c), 60);
    circle(x, y, r * (i / layers) * 2);
  }
}

function keyPressed() {
  if (key === ' ') {
    particles = [];
    for (let i = 0; i < 600; i++) particles.push(new Particle());
  }
  if (key === 'S' || key === 's') saveCanvas('doctor_strange_portal', 'png');
}