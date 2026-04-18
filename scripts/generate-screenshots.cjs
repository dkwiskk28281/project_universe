const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const screenshotDir = path.join(projectRoot, 'fastlane/screenshots');

// App Store required screenshot sizes
const DEVICES = {
  'iPhone-6.7': { w: 1290, h: 2796, label: 'iPhone 15 Pro Max' },
  'iPhone-6.5': { w: 1284, h: 2778, label: 'iPhone 14 Plus' },
  'iPhone-5.5': { w: 1242, h: 2208, label: 'iPhone 8 Plus' },
  'iPad-12.9': { w: 2048, h: 2732, label: 'iPad Pro 12.9' },
};

function seededRandom(seed) {
  let x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

function renderCosmosScene(ctx, w, h) {
  // Deep space gradient
  const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
  bgGrad.addColorStop(0, '#0c0c30');
  bgGrad.addColorStop(0.3, '#060618');
  bgGrad.addColorStop(0.6, '#030310');
  bgGrad.addColorStop(1, '#010108');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Nebula glow
  function drawNebula(x, y, radius, color1, color2, alpha) {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, color1);
    grad.addColorStop(0.5, color2);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = alpha;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNebula(w * 0.3, h * 0.4, w * 0.5, 'rgba(60,15,120,0.5)', 'rgba(30,8,60,0.2)', 0.5);
  drawNebula(w * 0.7, h * 0.3, w * 0.4, 'rgba(15,40,150,0.4)', 'rgba(8,20,80,0.15)', 0.45);
  drawNebula(w * 0.5, h * 0.7, w * 0.35, 'rgba(130,15,50,0.35)', 'rgba(60,8,25,0.15)', 0.35);
  drawNebula(w * 0.4, h * 0.25, w * 0.15, 'rgba(200,150,80,0.25)', 'rgba(150,80,30,0.08)', 0.4);

  ctx.globalAlpha = 1;

  // Stars
  for (let i = 0; i < 500; i++) {
    const x = seededRandom(i * 1.1 + 0.3) * w;
    const y = seededRandom(i * 2.3 + 0.7) * h;
    const brightness = seededRandom(i * 3.7 + 1.1) * 0.5 + 0.1;
    const size = (seededRandom(i * 4.3 + 2.1) * 1.5 + 0.4) * (w / 1290);

    ctx.globalAlpha = brightness;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bright stars with glow
  for (let i = 0; i < 40; i++) {
    const x = seededRandom(i * 5.7 + 10.3) * w;
    const y = seededRandom(i * 7.3 + 20.7) * h;
    const brightness = seededRandom(i * 9.1 + 5.1) * 0.4 + 0.6;
    const size = (seededRandom(i * 11.3 + 3.1) * 2.5 + 1.5) * (w / 1290);

    const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
    glowGrad.addColorStop(0, `rgba(200,220,255,${brightness * 0.25})`);
    glowGrad.addColorStop(1, 'rgba(200,220,255,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(x, y, size * 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = brightness;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function renderEncounterOrb(ctx, w, h, cx, cy) {
  const orbRadius = w * 0.02;

  // Outer halo
  const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 10);
  haloGrad.addColorStop(0, 'rgba(150,180,255,0.2)');
  haloGrad.addColorStop(0.3, 'rgba(100,140,255,0.08)');
  haloGrad.addColorStop(1, 'rgba(80,120,255,0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 10, 0, Math.PI * 2);
  ctx.fill();

  // Core
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 2);
  coreGrad.addColorStop(0, 'rgba(255,250,240,0.95)');
  coreGrad.addColorStop(0.5, 'rgba(200,220,255,0.6)');
  coreGrad.addColorStop(1, 'rgba(140,170,255,0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 2, 0, Math.PI * 2);
  ctx.fill();
}

// Screenshot 1: Main universe view
function screenshot1_MainView(w, h) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  renderCosmosScene(ctx, w, h);
  return canvas;
}

// Screenshot 2: Encounter — orb with "life detected"
function screenshot2_Encounter(w, h) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  renderCosmosScene(ctx, w, h);

  renderEncounterOrb(ctx, w, h, w * 0.55, h * 0.38);

  // Encounter border glow
  ctx.strokeStyle = 'rgba(100,150,255,0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, w, h);

  // Inner glow
  const borderGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.4, w / 2, h / 2, Math.max(w, h) * 0.7);
  borderGrad.addColorStop(0, 'rgba(100,150,255,0)');
  borderGrad.addColorStop(1, 'rgba(100,150,255,0.03)');
  ctx.fillStyle = borderGrad;
  ctx.fillRect(0, 0, w, h);

  // "life detected" text
  const fontSize = Math.round(w * 0.014);
  ctx.font = `200 ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(180, 200, 255, 0.35)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = `${fontSize * 0.4}px`;
  ctx.fillText('LIFE DETECTED', w / 2, h * 0.88);

  return canvas;
}

// Screenshot 3: Settings overlay
function screenshot3_Settings(w, h) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  renderCosmosScene(ctx, w, h);

  // Online count (top-left)
  const uiFont = Math.round(w * 0.016);
  ctx.font = `300 ${uiFont}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(100,200,150,0.6)';
  ctx.beginPath();
  ctx.arc(w * 0.04, h * 0.035, 4 * (w / 1290), 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.textAlign = 'left';
  ctx.fillText('7 in the universe', w * 0.055, h * 0.04);

  // Settings gear (top-right)
  ctx.beginPath();
  ctx.arc(w * 0.96, h * 0.035, 18 * (w / 1290), 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = `${Math.round(w * 0.022)}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('×', w * 0.96, h * 0.04);

  // Settings panel
  const panelX = w * 0.55;
  const panelY = h * 0.06;
  const panelW = w * 0.42;
  const panelH = h * 0.13;
  const radius = 12 * (w / 1290);

  // Panel background
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.beginPath();
  ctx.roundRect(panelX, panelY, panelW, panelH, radius);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Volume label
  const labelFont = Math.round(w * 0.013);
  ctx.font = `300 ${labelFont}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.textAlign = 'left';
  ctx.fillText('VOLUME', panelX + panelW * 0.08, panelY + panelH * 0.25);

  // Volume slider track
  const sliderY = panelY + panelH * 0.38;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.roundRect(panelX + panelW * 0.08, sliderY, panelW * 0.84, 4 * (w / 1290), 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(100,150,255,0.6)';
  ctx.beginPath();
  ctx.roundRect(panelX + panelW * 0.08, sliderY, panelW * 0.84 * 0.6, 4 * (w / 1290), 2);
  ctx.fill();

  // Quality label
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('QUALITY', panelX + panelW * 0.08, panelY + panelH * 0.65);

  // Quality buttons
  const btnY = panelY + panelH * 0.72;
  const btnH = panelH * 0.22;
  const btnW = panelW * 0.26;
  const labels = ['LOW', 'MEDIUM', 'HIGH'];
  for (let i = 0; i < 3; i++) {
    const bx = panelX + panelW * 0.08 + i * (btnW + panelW * 0.03);
    const isActive = i === 2;
    ctx.fillStyle = isActive ? 'rgba(100,150,255,0.2)' : 'rgba(255,255,255,0.05)';
    ctx.strokeStyle = isActive ? 'rgba(100,150,255,0.4)' : 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.roundRect(bx, btnY, btnW, btnH, 6 * (w / 1290));
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = `300 ${Math.round(w * 0.011)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], bx + btnW / 2, btnY + btnH * 0.7);
  }

  return canvas;
}

// Screenshot 4: Loading screen
function screenshot4_Loading(w, h) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  // Subtle nebula background
  const nebGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.6);
  nebGrad.addColorStop(0, 'rgba(10,10,40,1)');
  nebGrad.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = nebGrad;
  ctx.fillRect(0, 0, w, h);

  // A few faint stars
  for (let i = 0; i < 100; i++) {
    const x = seededRandom(i * 1.3 + 100) * w;
    const y = seededRandom(i * 2.7 + 200) * h;
    ctx.globalAlpha = seededRandom(i * 3.1 + 300) * 0.15;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 1 * (w / 1290), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // COSMOS title
  const titleSize = Math.round(w * 0.06);
  ctx.font = `100 ${titleSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = `${titleSize * 0.6}px`;
  ctx.fillText('COSMOS', w / 2, h * 0.44);

  // "touch to enter" text
  const subSize = Math.round(w * 0.014);
  ctx.font = `200 ${subSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillText('TOUCH TO ENTER THE UNIVERSE', w / 2, h * 0.52);

  return canvas;
}

// Generate all screenshots for each device
const generators = [
  { suffix: '01_main', fn: screenshot1_MainView },
  { suffix: '02_encounter', fn: screenshot2_Encounter },
  { suffix: '03_settings', fn: screenshot3_Settings },
  { suffix: '04_loading', fn: screenshot4_Loading },
];

for (const [deviceKey, device] of Object.entries(DEVICES)) {
  const deviceDir = path.join(screenshotDir, deviceKey);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }

  for (const gen of generators) {
    const canvas = gen.fn(device.w, device.h);
    const filename = `${gen.suffix}.png`;
    fs.writeFileSync(path.join(deviceDir, filename), canvas.toBuffer('image/png'));
    console.log(`Generated ${deviceKey}/${filename} (${device.w}x${device.h})`);
  }
}

console.log('\nAll screenshots generated!');
