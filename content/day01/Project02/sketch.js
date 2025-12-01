// Pixel Sunset – animated version
// Fotoğraftan ilham alan, kodla üretilmiş piksel sahne
// Nevzat'ın proje sketch'i

let cellSize = 16; // kare büyüklüğü ne kadar büyükse o kadar "piksel" görünür
let cols, rows;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  recalcGrid();
}

function draw() {
  background(0);
  t += 0.01;

  // Güneşin konumu (hafif yukarı aşağı animasyon)
  let sunX = width * 0.5;
  let sunY = height * 0.4 + sin(t * 0.7) * 20;
  let sunR = 90;

  // Bulutların x konumları (sağa doğru kayıyorlar)
  let cloud1x = (width * 0.2 + t * 80) % (width + 200) - 100;
  let cloud2x = (width * 0.7 + t * 50) % (width + 200) - 100;
  let cloud1y = height * 0.23;
  let cloud2y = height * 0.18;

  let horizonY = height * 0.55;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * cellSize;
      let y = j * cellSize;
      let cx = x + cellSize / 2;
      let cy = y + cellSize / 2;
      let baseCol;

      // Gökyüzü mü deniz mi
      if (cy < horizonY) {
        // Gökyüzü için dikey gradient
        let amt = cy / horizonY;
        let topColor = color(255, 140, 120);   // ufka yakın turuncu / pembe
        let bottomColor = color(80, 90, 200);  // üst taraf daha soğuk mor-mavi
        baseCol = lerpColor(topColor, bottomColor, amt);
      } else {
        // Deniz için gradient
        let amt = (cy - horizonY) / (height - horizonY);
        let topSea = color(20, 40, 120);
        let deepSea = color(5, 10, 40);
        baseCol = lerpColor(topSea, deepSea, amt);

        // Dalgalar için hafif parlama
        let wave = sin(cx * 0.08 + t * 3 + cy * 0.15);
        let waveBoost = map(wave, -1, 1, -10, 40);
        baseCol = brighten(baseCol, waveBoost);
      }

      // Güneşin piksel formu
      let d = dist(cx, cy, sunX, sunY);
      if (d < sunR) {
        let sunAmt = d / sunR;
        let inner = color(255, 250, 200);
        let outer = color(255, 150, 80);
        baseCol = lerpColor(inner, outer, sunAmt);
      }

      // Bulut 1
      if (
        cy < horizonY &&
        cx > cloud1x - 80 && cx < cloud1x + 80 &&
        cy > cloud1y - 25 && cy < cloud1y + 25
      ) {
        let cloudBase = color(255, 245, 245);
        baseCol = lerpColor(baseCol, cloudBase, 0.8);
      }

      // Bulut 2
      if (
        cy < horizonY &&
        cx > cloud2x - 60 && cx < cloud2x + 60 &&
        cy > cloud2y - 20 && cy < cloud2y + 20
      ) {
        let cloudBase = color(255, 250, 250);
        baseCol = lerpColor(baseCol, cloudBase, 0.85);
      }

      // Hafif rastgelelik ile daha organik piksel görünümü
      let noiseJitter = random(-8, 8);
      baseCol = brighten(baseCol, noiseJitter);

      fill(baseCol);
      rect(x, y, cellSize, cellSize);
    }
  }
}

function recalcGrid() {
  // Hücre boyutunu ekran boyutuna göre ayarla (yakın görünümü engelle)
  cellSize = max(8, round(min(windowWidth, windowHeight) / 40));
  cols = ceil(windowWidth / cellSize);
  rows = ceil(windowHeight / cellSize);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalcGrid();
}
// Rengi güvenli şekilde aydınlatan helper fonksiyon
function brighten(col, amt) {
  let r = constrain(red(col) + amt, 0, 255);
  let g = constrain(green(col) + amt, 0, 255);
  let b = constrain(blue(col) + amt, 0, 255);
  return color(r, g, b);
}

