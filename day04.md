# Day#04  Drawing Machines

## Nevzat's GENCG Portfolio


In this project, I created a colorful geometric pattern inspired by the visual examples we explored during the class. My main reference, however, came from the Doctor Strange scene where space bends and circular portals open in mid-air. The composition of glowing rings, floating rocks, and intersecting energy lines influenced the circular rhythm of my design.
Using p5.js, I experimented with arcs arranged in a grid to recreate that sense of movement and dimensional distortion. I combined bright, contrasting colors to evoke the magical and cosmic feeling of the scene, turning simple shapes into an illusion of depth and flow. This project helped me understand how repetition, symmetry, and color harmony can convey motion and energy within a static digital composition.

### IMAGE01
{% raw %}
![Example Image](./content/day01/week04.jpg)
{% endraw %}

{% raw %}
<iframe src="content/day01/04/embed.html" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

```js
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
  frameRate(120); // 🚀 faster drawing
}

function draw() {
  // fade background slightly for trailing effect
  background(245, 245, 240, 30);

  translate(width / 2, height / 2);
  stroke(20, 20, 20, 150);
  strokeWeight(1.8);
  noFill();

  let x = 0;
  let y = 0;

  // combine sinusoidal arms
  for (let i = 0; i < arms.length; i++) {
    let a = arms[i];
    x += sin(t * a.speed + a.phase) * a.length;
    y += cos(t * a.speed * a.dir + a.phase) * a.length;
  }

  // store trail (shorter for faster clearing)
  trail.push(createVector(x, y));
  if (trail.length > 1000) trail.shift();

  // draw the trail line
  beginShape();
  for (let v of trail) vertex(v.x, v.y);
  endShape();

  // draw the pen tip
  fill(0);
  noStroke();
  circle(x, y, 6);

  // ⏩ increase time faster
  t += 0.04;
}

function resetMachine() {
  background(245, 245, 240);
  arms = [];
  trail = [];
  for (let i = 0; i < numArms; i++) {
    arms.push({
      length: random(60, 200),
      speed: random(1.0, 3.5), // faster oscillation
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

```

### IMAGE02
{% raw %}
![Example Image](./content/day01/04/week401.jpg)
{% endraw %}

<iframe src="content/day01/0401/embed.html" width="100%" height="450" frameborder="no"></iframe>



# Week 4

## Exploration & Experimentation
For this week’s project, I explored how time can be expressed visually without using traditional numbers or letters. I designed an abstract clock that constantly evolves—its appearance shifts smoothly throughout the day, making every moment look unique.
Inspired by circular motion and rhythmic cycles, I experimented with rotating geometric shapes and color transitions that correspond to different temporal rhythms. Instead of showing time as hours and minutes, my design represents cycles: the rhythm of seconds through small continuous motion, the rhythm of minutes through color changes, and the rhythm of hours through larger transformations in form and scale.
Through this exploration, I learned to think of time as movement, repetition, and change—something that can be felt rather than read.

## Influences & References
The main inspiration came from discussions about cyclical vs. linear time, biological rhythms, and celestial motion. I was intrigued by how natural systems—like day and night, moon phases, or breathing patterns—visualize time in repeating cycles.
Artistically, I was influenced by kinetic art and generative animation, where subtle continuous change creates a meditative experience. The concept of subjective time also influenced my approach: how humans perceive moments differently depending on emotion or attention.
By merging these ideas, I aimed to create a digital object that behaves almost like a living organism—breathing, expanding, and contracting as time flows.

![Example Image](content\day01\03\week03image.png)

## Algorithmic Thinking
The clock is built using clear algorithmic structures to represent multiple time cycles.
	•	Rotation and oscillation are mapped to the current second and minute, producing continuous motion.
	•	Color transitions are controlled by the hour, shifting gradually to mark different times of day.
	•	To make the visual never repeat exactly, I incorporated randomness and smooth interpolation using Perlin noise, ensuring each moment looks slightly different.
This system transforms abstract time units into dynamic visual behavior—an algorithmic ecosystem of motion, rhythm, and color.

## Critical Reflection
This week taught me that time can be visualized beyond numbers—it can be experienced through transformation, rhythm, and emotion.
Designing a clock without digits was challenging because it forced me to communicate time symbolically, through motion and atmosphere. Yet, that limitation opened creative possibilities: the clock became more poetic and expressive.
I also learned that balance between predictability (cyclical order) and variation (random change) is crucial for maintaining interest. Too much structure feels mechanical, but too much chaos loses meaning.
Ultimately, this project helped me appreciate how code can capture the fluid, organic nature of time—turning an abstract concept into something visual, living, and immersive.
