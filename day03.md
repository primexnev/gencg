# Day#03  Clock / Time

## Nevzat's GENCG Portfolio


In this project, I created a colorful geometric pattern inspired by the visual examples we explored during the class. My main reference, however, came from the Doctor Strange scene where space bends and circular portals open in mid-air. The composition of glowing rings, floating rocks, and intersecting energy lines influenced the circular rhythm of my design.
Using p5.js, I experimented with arcs arranged in a grid to recreate that sense of movement and dimensional distortion. I combined bright, contrasting colors to evoke the magical and cosmic feeling of the scene, turning simple shapes into an illusion of depth and flow. This project helped me understand how repetition, symmetry, and color harmony can convey motion and energy within a static digital composition.


![Example Image](content\day01\03\week03image.png)


<iframe src="content/day01/003/embed.html" width="100%" height="450" frameborder="no"></iframe>


```js
let t=0,pg,stars=[];
const P={bg:"#0B0F14",gold:"#E6C14A",aqua:"#20E3D6"};

function setup(){
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
  pg=createGraphics(width,height);
  drawGlowBackdrop();
  for(let i=0;i<160;i++){
    stars.push({
      r: random(min(width,height)*0.18, min(width,height)*0.45),
      a: random(TWO_PI),
      s: random(0.3,1.8),
      sp: random(0.0008,0.003)
    });
  }
  noCursor();
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  pg=createGraphics(width,height);
  drawGlowBackdrop();
}

function drawGlowBackdrop(){
  pg.clear();
  pg.noStroke();
  pg.background(P.bg);
  for(let i=0;i<5000;i++){
    const x=random(width),y=random(height);
    const a=random(12);
    pg.fill(255,255,255,a);
    pg.circle(x,y,random(0.3,1.1));
  }
  for(let r=0;r<160;r++){
    const a=map(r,0,159,0,70);
    pg.fill(230,193,74,a*0.16);
    pg.circle(width/2,height/2, max(width,height)*1.3 - r*6);
  }
}

function draw(){
  background(P.bg);
  image(pg,0,0);
  translate(width/2,height/2);

  const R=min(width,height)*0.38;
  const now=new Date();
  const hr=((now.getHours()%12)+now.getMinutes()/60)/12;
  const mn=(now.getMinutes()+now.getSeconds()/60)/60;
  const sc=(now.getSeconds()+now.getMilliseconds()/1000)/60;

  push();
  rotate(sin(frameCount*0.0012)*0.06);
  ring(R*1.02, 6, 0.006, P.gold, 6);
  ring(R*0.86, 9, -0.01, P.aqua, 5);
  ring(R*0.70, 12, 0.015, P.gold, 4);
  arcRunes(R*0.56, 32, 0.007, P.aqua);
  arcRunes(R*0.44, 24, -0.011, P.gold);
  lissajousSigil(R*0.52, 0.65, P.aqua);
  lissajousSigil(R*0.35, 1.05, P.gold);
  pop();

  for(let s of stars){
    s.a+=s.sp;
    const x=cos(s.a)*s.r,y=sin(s.a)*s.r;
    noStroke(); fill(255,235,180,140);
    circle(x,y,s.s);
  }

  hand(sc, R*0.92, 2.6, color(P.aqua));
  hand(mn, R*0.75, 5, color(P.gold));
  hand(hr, R*0.55, 7.5, color(P.gold));

  centerGem();

  timeBadge(now);

  t+=0.006;
}

function ring(r, spokes, rotSpeed, col, weight){
  push();
  rotate(frameCount*rotSpeed);
  noFill();
  stroke(col); strokeWeight(weight);
  circle(0,0,r*2);
  strokeWeight(max(1,weight*0.5));
  for(let i=0;i<spokes;i++){
    const a=TWO_PI*(i/spokes);
    const n=(noise(i*0.2+t)-0.5)*r*0.04;
    const x1=cos(a)*(r*0.86+n), y1=sin(a)*(r*0.86+n);
    const x2=cos(a)*(r*1.04+n), y2=sin(a)*(r*1.04+n);
    line(x1,y1,x2,y2);
  }
  pop();
}

function arcRunes(r, count, rotSpeed, col){
  push();
  rotate(frameCount*rotSpeed);
  noFill();
  stroke(col); strokeWeight(2);
  const dash=PI*1.3/count;
  for(let i=0;i<count;i++){
    const a=i*TWO_PI/count;
    arc(0,0,r*2, r*2, a+0.1, a+0.1+dash);
    push();
    const rr=r*0.92;
    const x=cos(a+dash*0.5)*rr, y=sin(a+dash*0.5)*rr;
    translate(x,y);
    rotate(a*3.0);
    glyph(col, r*0.06);
    pop();
  }
  pop();
}

function glyph(col, sz){
  stroke(col); strokeWeight(2); noFill();
  const k=sz;
  line(-k,0,k,0);
  line(0,-k*0.9,0,k*0.9);
  push(); rotate(PI/4); rectMode(CENTER); rect(0,0,k*0.9,k*0.22,2); pop();
  circle(0,0,k*0.55);
}

function lissajousSigil(r, speed, col){
  noFill();
  stroke(col); strokeWeight(1.8);
  beginShape();
  const n=260;
  for(let i=0;i<=n;i++){
    const u=i/n;
    const a=TWO_PI*u;
    const x=r*0.9*sin(3*a + frameCount*0.002*speed);
    const y=r*0.9*sin(4*a + frameCount*0.003*speed + PI/6);
    vertex(x,y);
  }
  endShape();
}

function hand(norm,len,w,col){
  const a=-HALF_PI + TWO_PI*norm;
  push();
  rotate(a);
  const g=color(red(col),green(col),blue(col),70);
  noStroke(); fill(g);
  for(let i=0;i<12;i++){
    const rr=map(i,0,11,0,len);
    circle(0,-rr,map(i,0,11,w*0.4,1));
  }
  stroke(col); strokeWeight(w);
  line(0,0,0,-len);
  glowDot(0,-len,col,w*1.2);
  pop();
}

function glowDot(x,y,col,sz){
  push();
  translate(x,y);
  noStroke();
  for(let i=10;i>=1;i--){
    const a=map(i,1,10,220,10);
    fill(red(col),green(col),blue(col),a);
    circle(0,0, map(i,1,10,sz*2.6,sz*0.6));
  }
  fill(255,240,200,230); circle(0,0,sz*0.5);
  pop();
}

function centerGem(){
  push();
  noStroke();
  for(let i=12;i>=1;i--){
    const a=map(i,1,12,220,20);
    fill(230,193,74,a);
    circle(0,0,map(i,1,12,36,10));
  }
  stroke(P.aqua); noFill(); strokeWeight(2);
  rotate(frameCount*0.01);
  polygon(0,0,16,6);
  rotate(-frameCount*0.02);
  polygon(0,0,11,5);
  pop();
}

function polygon(x,y,r,n){
  beginShape();
  for(let i=0;i<n;i++){
    const a=TWO_PI*i/n;
    vertex(x+cos(a)*r,y+sin(a)*r);
  }
  endShape(CLOSE);
}

function timeBadge(now){
  const pad=n=>(n<10?"0":"")+n;
  const ts=`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const ds=`${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()}`;
  push();
  translate(0,height*0.38);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(0,0,0,120); rectMode(CENTER);
  rect(0,0, textWidth(ts)+90, 58, 10);
  fill(P.gold); textSize(30); text(ts,0,-2);
  fill(P.aqua); textSize(14); text(ds,0,18);
  pop();
}

```
# Week 3

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
