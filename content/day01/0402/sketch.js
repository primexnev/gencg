// LED Light Trail — dark bg + 3D feel (p5.js)

let t = 0, pts = [];
let style = 0;
const styles = [
  {ax:1.2, ay:0.9, az:1.6, rx:300, ry:180, rz:220},    // lissajous
  {ax:1.0, ay:1.7, az:0.7, rx:260, ry:220, rz:160},    // swirl
  {ax:0.8, ay:1.3, az:2.1, rx:320, ry:130, rz:210},    // chaotic
];

function setup(){
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  background(5);                 // stay dark
  blendMode(ADD);                // additive glow
  noFill();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(5);
}

function draw(){
  // subtle fade so old lines linger (never turns white)
  noStroke(); fill(0, 18); rect(0,0,width,height);

  // 3D parametric point
  const st = styles[style];
  const x3 = sin(t*st.ax)*st.rx + sin(t*0.37)*40;
  const y3 = cos(t*st.ay)*st.ry + cos(t*0.29)*30;
  const z3 = sin(t*st.az)*st.rz;
  pts.push(createVector(x3,y3,z3));
  if (pts.length > 380) pts.shift();

  // camera/perspective
  const fov = 520, camZ = 800;

  // draw glowing tube along the path
  for (let i=1; i<pts.length; i++){
    const a = project(pts[i-1], fov, camZ);
    const b = project(pts[i],   fov, camZ);

    // thickness & brightness by depth (near = brighter, thicker)
    const nz = norm((pts[i].z+camZ), camZ-st.rz, camZ+st.rz);
    const w  = lerp(2, 10, 1-nz);
    const al = lerp(40, 240, 1-nz);

    // multi-stroke glow (outer faint → inner bright)
    for (let k=5; k>=0; k--){
      const f = k/5;
      stroke(200+30*f, 220+20*f, 255, al*(0.18+0.16*f));
      strokeWeight(w*(0.6 + 0.9*f));
      line(a.x, a.y, b.x, b.y);
    }

    // occasional sparkle
    if (i%95===0){
      glowDot(b.x, b.y, lerp(6,14,1-nz));
    }
  }

  t += 0.02;
}

function project(v, fov, camZ){
  const z = v.z + camZ;
  const s = fov / z;
  return { x: width/2 + v.x*s, y: height/2 + v.y*s };
}

function glowDot(x,y,sz){
  noStroke();
  for (let i=8;i>=1;i--){
    fill(255,255,255, map(i,1,8,220,10));
    circle(x,y, map(i,1,8,sz*2.6, sz*0.5));
  }
}

function keyPressed(){
  if (key==='S' || key==='s') saveCanvas('led_trail','png');
  if (key==='C' || key==='c') { background(5); pts=[]; }
  if (key===' ') { style = (style+1)%styles.length; pts=[]; }
}