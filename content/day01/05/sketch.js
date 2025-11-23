// Parametric Face Generator (simplified)
let faces = [];
const NUM_FACES = 12;

const buttonX = 20, buttonY = 20, buttonW = 200, buttonH = 40;
let hover = false;

function setup() {
  createCanvas(900, 600);
  stroke(0); strokeWeight(2);
  textFont('sans-serif'); textSize(16);
  noFill(); noLoop();
  generateFaces();
}

function generateFaces() {
  faces = [];
  for (let i = 0; i < NUM_FACES; i++) faces.push(makeRandomFace());
}

function draw() {
  background(255);
  drawButton();

  const cols = 4, rows = 3, cellW = width / cols;
  const cellH = (height - 80) / rows, offsetY = 80;
  for (let i = 0; i < faces.length; i++) {
    const col = i % cols, row = floor(i / cols);
    const x = cellW * col + cellW / 2;
    const y = offsetY + cellH * row + cellH / 2;
    drawFace(x, y, faces[i]);
  }
}

function drawButton() {
  fill(hover ? 230 : 245); stroke(0);
  rect(buttonX, buttonY, buttonW, buttonH, 8);
  fill(0); noStroke(); textAlign(CENTER, CENTER);
  text("Generate New Faces", buttonX + buttonW / 2, buttonY + buttonH / 2);
  noFill(); stroke(0);
}

function mouseMoved() {
  hover = mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY + buttonH;
  redraw();
}

function mousePressed() {
  if (hover) { generateFaces(); redraw(); }
}

function makeRandomFace() {
  const p = {
    headWidth: random(120, 200),
    headHeight: random(140, 220),
    eyeSize: random(10, 30),
    eyeSpacing: random(30, 80),
    eyeOffsetY: random(-20, 10),
    mouthWidth: random(40, 100),
    mouthCurvature: random(-25, 25),
    browTilt: random(-15, 15),
    numEyes: random([1, 2, 3]),
    hasBlush: random() < 0.5,
    hasHair: random() < 0.5,
    eyeShape: random(["round", "oval"])
  };
  p.mood = map(p.mouthCurvature, -25, 25, -1, 1);
  return p;
}

function drawFace(cx, cy, p) {
  push(); translate(cx, cy); noFill(); stroke(0);

  beginShape();
  curveVertex(-p.headWidth/2, -p.headHeight/2);
  curveVertex(-p.headWidth/2, -p.headHeight/2);
  curveVertex(0, -p.headHeight/2 - 10);
  curveVertex(p.headWidth/2, -p.headHeight/2);
  curveVertex(p.headWidth/2 + 10, p.headHeight/4);
  curveVertex(0, p.headHeight/2 + 10);
  curveVertex(-p.headWidth/2 - 10, p.headHeight/4);
  curveVertex(-p.headWidth/2, -p.headHeight/2);
  curveVertex(-p.headWidth/2, -p.headHeight/2);
  endShape();

  line(-p.headWidth/2, 0, -p.headWidth/2 - 20, 0);
  line(p.headWidth/2, 0, p.headWidth/2 + 20, 0);

  if (p.hasHair) for (let x = -20; x <= 20; x += 10) line(x, -p.headHeight/2 - 5, x, -p.headHeight/2 - random(15, 25));

  const y0 = p.eyeOffsetY;
  if (p.numEyes === 1) drawEye(0, y0, p);
  if (p.numEyes === 2) { drawEye(-p.eyeSpacing/2, y0, p); drawEye(p.eyeSpacing/2, y0, p); }
  if (p.numEyes === 3) { drawEye(-p.eyeSpacing/1.5, y0, p); drawEye(0, y0 + 5, p); drawEye(p.eyeSpacing/1.5, y0, p); }

  const browY = y0 - 25, tilt = p.browTilt + p.mood * 10;
  if (p.numEyes >= 2) {
    line(-p.eyeSpacing/2 - 10, browY - tilt, -p.eyeSpacing/2 + 10, browY + tilt);
    line(p.eyeSpacing/2 - 10, browY + tilt, p.eyeSpacing/2 + 10, browY - tilt);
  } else {
    line(-20, browY + tilt, 20, browY - tilt);
  }

  const noseLen = map(p.mood, -1, 1, 35, 15);
  line(0, y0, 0, y0 + noseLen);

  const mouthY = y0 + 50, w = p.mouthWidth, c = p.mouthCurvature;
  beginShape(); vertex(-w/2, mouthY); quadraticVertex(0, mouthY + c, w/2, mouthY); endShape();

  if (p.hasBlush) {
    noStroke(); fill(255, 150, 180, 120);
    ellipse(-p.eyeSpacing/2, y0 + 30, 18, 12);
    ellipse(p.eyeSpacing/2, y0 + 30, 18, 12);
    noFill(); stroke(0);
  }
  pop();
}

function drawEye(x, y, p) {
  push(); translate(x, y);
  if (p.eyeShape === "round") ellipse(0, 0, p.eyeSize, p.eyeSize);
  else ellipse(0, 0, p.eyeSize*1.4, p.eyeSize*0.8);
  fill(0); ellipse(0, 0, p.eyeSize/3, p.eyeSize/3); noFill();
  pop();
}