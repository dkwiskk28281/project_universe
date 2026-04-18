const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateCosmosIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;

  // Deep space background gradient
  const bgGrad = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, size * 0.7);
  bgGrad.addColorStop(0, '#0a0a2e');
  bgGrad.addColorStop(0.4, '#060618');
  bgGrad.addColorStop(0.7, '#030310');
  bgGrad.addColorStop(1, '#010108');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Nebula glow layers
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

  // Purple nebula (left-center)
  drawNebula(cx * 0.6, cy * 0.9, size * 0.45, 'rgba(80,20,140,0.6)', 'rgba(40,10,80,0.3)', 0.5);
  // Blue nebula (right)
  drawNebula(cx * 1.3, cy * 0.7, size * 0.35, 'rgba(20,50,180,0.5)', 'rgba(10,25,90,0.2)', 0.4);
  // Crimson accent (bottom)
  drawNebula(cx * 0.8, cy * 1.4, size * 0.3, 'rgba(150,20,60,0.4)', 'rgba(80,10,30,0.2)', 0.35);
  // Warm core glow
  drawNebula(cx, cy * 0.75, size * 0.2, 'rgba(255,200,100,0.3)', 'rgba(200,100,50,0.1)', 0.4);

  ctx.globalAlpha = 1;

  // Stars - multiple layers
  function seededRandom(seed) {
    let x = Math.sin(seed) * 43758.5453;
    return x - Math.floor(x);
  }

  // Background dim stars
  for (let i = 0; i < 300; i++) {
    const x = seededRandom(i * 1.1 + 0.3) * size;
    const y = seededRandom(i * 2.3 + 0.7) * size;
    const brightness = seededRandom(i * 3.7 + 1.1) * 0.4 + 0.1;
    const starSize = seededRandom(i * 4.3 + 2.1) * 1.2 + 0.3;

    ctx.globalAlpha = brightness;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, starSize * (size / 1024), 0, Math.PI * 2);
    ctx.fill();
  }

  // Bright stars with glow
  for (let i = 0; i < 30; i++) {
    const x = seededRandom(i * 5.7 + 10.3) * size;
    const y = seededRandom(i * 7.3 + 20.7) * size;
    const brightness = seededRandom(i * 9.1 + 5.1) * 0.5 + 0.5;
    const starSize = seededRandom(i * 11.3 + 3.1) * 2.5 + 1;
    const s = starSize * (size / 1024);

    // Glow
    const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, s * 4);
    glowGrad.addColorStop(0, `rgba(200,220,255,${brightness * 0.3})`);
    glowGrad.addColorStop(1, 'rgba(200,220,255,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(x, y, s * 4, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.globalAlpha = brightness;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  // Central luminous orb — the "encounter entity"
  const orbY = cy * 0.72;
  const orbRadius = size * 0.06;

  // Outer halo
  const haloGrad = ctx.createRadialGradient(cx, orbY, 0, cx, orbY, orbRadius * 8);
  haloGrad.addColorStop(0, 'rgba(150,180,255,0.25)');
  haloGrad.addColorStop(0.3, 'rgba(100,140,255,0.1)');
  haloGrad.addColorStop(1, 'rgba(80,120,255,0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(cx, orbY, orbRadius * 8, 0, Math.PI * 2);
  ctx.fill();

  // Mid glow
  const midGrad = ctx.createRadialGradient(cx, orbY, 0, cx, orbY, orbRadius * 3);
  midGrad.addColorStop(0, 'rgba(220,230,255,0.6)');
  midGrad.addColorStop(0.5, 'rgba(160,190,255,0.2)');
  midGrad.addColorStop(1, 'rgba(120,150,255,0)');
  ctx.fillStyle = midGrad;
  ctx.beginPath();
  ctx.arc(cx, orbY, orbRadius * 3, 0, Math.PI * 2);
  ctx.fill();

  // Core bright orb
  const coreGrad = ctx.createRadialGradient(cx, orbY, 0, cx, orbY, orbRadius);
  coreGrad.addColorStop(0, 'rgba(255,250,240,0.95)');
  coreGrad.addColorStop(0.5, 'rgba(220,230,255,0.7)');
  coreGrad.addColorStop(1, 'rgba(160,190,255,0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, orbY, orbRadius, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

// Generate all required sizes
const projectRoot = path.join(__dirname, '..');
const iconDir = path.join(projectRoot, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');

// iOS requires 1024x1024 universal icon
const sizes = [
  { name: 'AppIcon-1024.png', size: 1024 },
  { name: 'AppIcon-180.png', size: 180 },   // iPhone @3x (60pt)
  { name: 'AppIcon-120.png', size: 120 },   // iPhone @2x (60pt)
  { name: 'AppIcon-167.png', size: 167 },   // iPad Pro @2x (83.5pt)
  { name: 'AppIcon-152.png', size: 152 },   // iPad @2x (76pt)
  { name: 'AppIcon-80.png', size: 80 },     // Spotlight @2x (40pt)
  { name: 'AppIcon-120-spotlight.png', size: 120 }, // Spotlight @3x
  { name: 'AppIcon-58.png', size: 58 },     // Settings @2x
  { name: 'AppIcon-87.png', size: 87 },     // Settings @3x
  { name: 'AppIcon-40.png', size: 40 },     // Notification @2x
  { name: 'AppIcon-60.png', size: 60 },     // Notification @3x
  { name: 'AppIcon-76.png', size: 76 },     // iPad 76pt @1x
  { name: 'AppIcon-1024-store.png', size: 1024 }, // App Store
];

for (const { name, size } of sizes) {
  const canvas = generateCosmosIcon(size);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconDir, name), buffer);
  console.log(`Generated ${name} (${size}x${size})`);
}

// Also generate the required AppIcon-512@2x.png (Capacitor default name)
const main = generateCosmosIcon(1024);
fs.writeFileSync(path.join(iconDir, 'AppIcon-512@2x.png'), main.toBuffer('image/png'));
console.log('Generated AppIcon-512@2x.png (1024x1024)');

// Update Contents.json
const contentsJson = {
  images: [
    { filename: 'AppIcon-512@2x.png', idiom: 'universal', platform: 'ios', size: '1024x1024' },
  ],
  info: { author: 'xcode', version: 1 },
};
fs.writeFileSync(path.join(iconDir, 'Contents.json'), JSON.stringify(contentsJson, null, 2));
console.log('Updated Contents.json');

// Generate splash screen icon (centered on black)
const splashDir = path.join(projectRoot, 'ios/App/App/Assets.xcassets/Splash.imageset');
for (const variant of [
  { name: 'splash-2732x2732.png', size: 2732 },
  { name: 'splash-2732x2732-1.png', size: 2732 },
  { name: 'splash-2732x2732-2.png', size: 2732 },
]) {
  const canvas = createCanvas(variant.size, variant.size);
  const ctx = canvas.getContext('2d');

  // Black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, variant.size, variant.size);

  // Central glow orb (same as icon but bigger and centered)
  const cx = variant.size / 2;
  const cy = variant.size / 2;
  const orbRadius = variant.size * 0.03;

  // Outer halo
  const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 12);
  haloGrad.addColorStop(0, 'rgba(150,180,255,0.2)');
  haloGrad.addColorStop(0.3, 'rgba(100,140,255,0.08)');
  haloGrad.addColorStop(1, 'rgba(80,120,255,0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 12, 0, Math.PI * 2);
  ctx.fill();

  // Core
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 2);
  coreGrad.addColorStop(0, 'rgba(255,250,240,0.9)');
  coreGrad.addColorStop(0.4, 'rgba(200,220,255,0.5)');
  coreGrad.addColorStop(1, 'rgba(140,170,255,0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 2, 0, Math.PI * 2);
  ctx.fill();

  fs.writeFileSync(path.join(splashDir, variant.name), canvas.toBuffer('image/png'));
  console.log(`Generated ${variant.name}`);
}

console.log('\nAll icons and splash screens generated!');
