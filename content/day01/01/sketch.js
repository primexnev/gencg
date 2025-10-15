let canvas, video;

// Default P5 setup function
let R = 28
let rings = 4
let prog = []
let cols, rows, unitX, unitY

function setup() {
  createCanvas(640, 640)
  colorMode(HSB, 360, 100, 100)
  noCursor()

  unitX = sqrt(3) * R
  unitY = 1.5 * R
  cols = floor(width / unitX) + 2
  rows = floor(height / unitY) + 2

  for (let j = 0; j < rows; j++) {
    prog[j] = []
    for (let i = 0; i < cols; i++) prog[j][i] = 0
  }
}

function draw() {
  let h = (frameCount * 0.3) % 360
  background(h, 30, 95)
  let fg = color((h + 180) % 360, 70, 25)

  stroke(fg)
  strokeWeight(2)
  noFill()

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cx = unitX * (i + (j % 2 ? 0.5 : 0)) + 10
      let cy = unitY * j + 10

      let over = dist(mouseX, mouseY, cx, cy) < R * 0.9
      prog[j][i] = constrain(prog[j][i] + (over ? 0.08 : -0.05), 0, 1)

      if (prog[j][i] > 0.98) {
        noStroke()
        fill(fg)
        hex(cx, cy, R)
        noFill()
        stroke(fg)
      } else {
        for (let n = 0; n < rings; n++) {
          let r = lerp(R * (0.25 + 0.18 * n), R, prog[j][i])
          hex(cx, cy, r)
        }
      }
    }
  }
}

function hex(x, y, r) {
  beginShape()
  for (let a = 0; a < 360; a += 60) {
    vertex(x + r * cos(radians(a)), y + r * sin(radians(a)))
  }
  endShape(CLOSE)
}

