# Day#03  Clock / Time

## Nevzat's GENCG Portfolio


In this project, I created a colorful geometric pattern inspired by the visual examples we explored during the class. I was particularly influenced by the reference images from the lesson materials that focused on repeating circular and wave-like forms. Using p5.js, I experimented with arcs arranged in a grid to create a smooth, overlapping rhythm. I introduced multiple bright colors to make the pattern feel playful and dynamic, resembling layered rainbows across the canvas. This helped me understand how repetition, symmetry, and color harmony can transform a simple shape into a visually engaging composition.


![Example Image](content\day01\weektwo.png)


<iframe src="content/day01/01/embed.html" width="100%" height="450" frameborder="no"></iframe>




```js
// Javascript code with syntax highlighting.
let step = 70
let r = 25
let prog = []
let cols, rows

function setup() {
  createCanvas(640, 640)
  colorMode(HSB, 360, 100, 100)
  noCursor()

  cols = ceil(width / (step * 1.5))
  rows = ceil(height / (sqrt(3) * step)) + 1

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
      let x = i * step * 1.5 + step / 2
      let y = j * sqrt(3) * step + step / 2
      if (j % 2 == 1) x += step * 0.75

      let over = dist(mouseX, mouseY, x, y) < step * 0.6
      prog[j][i] = constrain(prog[j][i] + (over ? 0.08 : -0.05), 0, 1)

      let rr = lerp(r, step * 0.9, prog[j][i])

      if (prog[j][i] > 0.98) {
        noStroke()
        fill(fg)
        drawHex(x, y, rr)
        noFill()
        stroke(fg)
      } else {
        drawHex(x, y, rr)
      }
    }
  }
}

function drawHex(cx, cy, rr) {
  beginShape()
  for (let a = 0; a < 360; a += 60) {
    vertex(cx + rr * cos(radians(a)), cy + rr * sin(radians(a)))
  }
  endShape(CLOSE)
}

```
# Week 2

## Exploration & Experimentation
In these projects, I experimented with creating grid-based patterns using p5.js.
First, I worked on a colorful circular pattern inspired by the visual materials from class, arranging arcs in a repeating rhythm to form rainbow-like rows.
Then, I developed an interactive hexagon grid where each hexagon reacts to the mouse, growing larger and changing color when hovered over.
Through both works, I explored how repetition, spacing, and color can turn simple geometry into playful and dynamic compositions.

## Influences & References
The main inspiration came from the visual examples and references we studied in class that focused on wave-like and geometric repeating patterns.
I didn’t follow any specific artist, but I was influenced by the style of colorful and symmetrical visual systems shown in the lesson materials.
My goal was to understand how those ideas could be recreated and personalized through code.

![Example Image](content\day01\02\week02reference.png)

## Algorithmic Thinking
Both patterns are based on clear and simple systems.
For the rainbow pattern, I used nested loops to position arcs row by row, adjusting their spacing to overlap smoothly and form continuous waves.
For the hexagon grid, I calculated precise coordinates using mathematical relationships so that each shape connected perfectly with its neighbors.
In both cases, the use of color (based on hue, saturation, and brightness) helped me create smooth transitions and a sense of rhythm across the canvas.

## Critical Reflection
I learned that even small changes in spacing or color can completely change how a pattern feels.
It was challenging to make the grids align perfectly, but achieving that precision made the results look clean and satisfying.
Adding interaction to the hexagon grid made the work feel more alive, while the rainbow arcs allowed me to explore emotion and contrast through color.
Overall, these projects taught me how structure and creativity can work together to produce expressive, visually balanced generative artworks.

### Webcam tests

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.



Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

{% raw %}
<iframe src="content/day01/02/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

## Computing with computer

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

{% raw %}
<iframe src="content/day01/03/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

* Lorem ipsum dolor sit amet
* Consetetur sadipscing elitr, sed diam nonumy.
* At vero eos et accusam et justo duo dolores et ea rebum. 
