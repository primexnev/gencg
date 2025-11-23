// FAST DIGITAL HARMONOGRAPH — Drawing Machine
// Inspired by mechanical drawing arms and spirographs
// Press SPACE for a new pattern, S to save

let t = 0;
let arms = [];
let numArms = 3;
let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetMachine();
  frameRate(120);
}

function draw() {
  background(245, 245, 240, 30);

  translate(width / 2, height / 2);
  stroke(20, 20, 20, 150);
  strokeWeight(1.8);
  noFill();

  let x = 0;
  let y = 0;

  for (let i = 0; i < arms.length; i++) {
    let a = arms[i];
    x += sin(t * a.speed + a.phase) * a.length;
    y += cos(t * a.speed * a.dir + a.phase) * a.length;
  }

  trail.push(createVector(x, y));
  if (trail.length > 1000) trail.shift();

  beginShape();
  for (let v of trail) vertex(v.x, v.y);
  endShape();

  fill(0);
  noStroke();
  circle(x, y, 6);

  t += 0.04;
}

function resetMachine() {
  background(245, 245, 240);
  arms = [];
  trail = [];
  for (let i = 0; i < numArms; i++) {
    arms.push({
      length: random(60, 200),
      speed: random(1.0, 3.5),
      phase: random(TWO_PI),
      dir: random([1, -1])
    });
  }
  t = 0;
}

function keyPressed() {
  if (key === ' ') resetMachine();
  if (key === 'S' || key === 's') saveCanvas('drawing_machine', 'png');
}