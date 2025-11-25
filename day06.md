# Day#06 Pixels

## Nevzat's GENCG Portfolio


In this project, I treated pixels as raw material. I loaded an image, read its pixel colors and positions, and used that data to build a new composition rather than drawing shapes first. The goal was to flip the usual workflow: instead of “draw a circle and let the computer paint pixels,” I started from the pixels themselves and decided how they should be rearranged and reinterpreted.


{% raw %}
![Sunset Reference](./content/day01/06/sunset.png)
{% endraw %}

{% raw %}
<iframe src="content/day01/06/embed.html?v=2" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

```js
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

```

# Week 6

## Exploration & Experimentation
I chose a sunset photo and rebuilt it with very simple “pixel bricks.” The sky is drawn as flat color bands, the sun as a circle, and the waves as small rectangles that march toward the shore. Each column of pixels moves with a sine wave, so the sea feels alive. It’s a clean, pixel‑style version of the reference.

## Influences & References
Lesson 6’s “pixels as material” idea guided my choices. The sunset gave me a clear structure (sky, horizon, sea) and a small set of colors to pick from. That kept the image readable while simplifying it into blocks.

## Algorithmic Thinking
I set a pixelSize and loop across the canvas in steps of that size. For each x I compute a wave offset using sin(x + time) and draw narrow rectangles for the water and foam. The sky is built from a few horizontal color bands. With just a handful of numbers (pixelSize, speeds, colors), the scene is easy to tune.

## Critical Reflection
Keeping the rules small made the result clear and calm. The hardest part was picking a pixel size that feels crisp but not noisy. Next, I want to sample actual image pixels to color the blocks, or sort pixels by brightness for a more data‑driven remake.

