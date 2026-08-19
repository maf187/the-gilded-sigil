const canvas = document.getElementById('sigilCanvas');
const ctx = canvas.getContext('2d');
const intentInput = document.getElementById('intentInput');
const generateBtn = document.getElementById('generateBtn');
const consonantsDisplay = document.getElementById('consonantsDisplay');
const downloadBtn = document.getElementById('downloadBtn');

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const RADIUS = 180;
const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

let currentAnimationFrameId = null;

// Map each of the 21 consonants to fixed equidistant coordinates around a circle
const letterPositions = {};
for (let i = 0; i < CONSONANTS.length; i++) {
  const angle = (2 * Math.PI / CONSONANTS.length) * i - (Math.PI / 2);
  letterPositions[CONSONANTS[i]] = {
    x: CENTER_X + RADIUS * Math.cos(angle),
    y: CENTER_Y + RADIUS * Math.sin(angle)
  };
}

function reduceIntent(text) {
  // Strip out numbers, whitespace, punctuation, vowels, and remove duplicate consonants
  const sanitized = text.toUpperCase().replace(/[^A-Z]/g, '');
  const noVowels = sanitized.replace(/[AEIOU]/g, '');
  return [...new Set(noVowels)];
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#28251e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawTerminalCrossbar(pPrev, pLast) {
  const angle = Math.atan2(pLast.y - pPrev.y, pLast.x - pPrev.x) + (Math.PI / 2);
  const barLength = 12;

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pLast.x - barLength * Math.cos(angle), pLast.y - barLength * Math.sin(angle));
  ctx.lineTo(pLast.x + barLength * Math.cos(angle), pLast.y + barLength * Math.sin(angle));
  ctx.stroke();
}

function animateSigil(letters) {
  if (currentAnimationFrameId) {
    cancelAnimationFrame(currentAnimationFrameId);
  }

  drawBackground();

  if (letters.length === 0) return;

  const points = letters
    .filter(char => letterPositions[char])
    .map(char => letterPositions[char]);

  if (points.length === 0) return;

  // Single letter case (draws node circle only)
  if (points.length === 1) {
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, 6, 0, 2 * Math.PI);
    ctx.fill();
    return;
  }

  let currentSegment = 0;
  let progress = 0;
  const speed = 0.05; // Adjust stroke drawing speed (0.01 - 0.1)

  function renderFrame() {
    drawBackground();

    // 1. Draw starting origin node
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, 6, 0, 2 * Math.PI);
    ctx.fill();

    // 2. Set line stroke styling
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 3. Draw all fully completed segments
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i <= currentSegment; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    // 4. Interpolate and draw currently active segment
    if (currentSegment < points.length - 1) {
      const p1 = points[currentSegment];
      const p2 = points[currentSegment + 1];
      const curX = p1.x + (p2.x - p1.x) * progress;
      const curY = p1.y + (p2.y - p1.y) * progress;

      ctx.lineTo(curX, curY);
      ctx.stroke();

      progress += speed;
      if (progress >= 1) {
        progress = 0;
        currentSegment++;
      }
      currentAnimationFrameId = requestAnimationFrame(renderFrame);
    } else {
      ctx.stroke();
      // 5. Draw terminal crossbar upon completion
      drawTerminalCrossbar(points[points.length - 2], points[points.length - 1]);
    }
  }

  currentAnimationFrameId = requestAnimationFrame(renderFrame);
}

function handleGenerate() {
  const letters = reduceIntent(intentInput.value);
  consonantsDisplay.textContent = letters.length > 0 ? letters.join(' ') : 'NONE';
  animateSigil(letters);
}

generateBtn.addEventListener('click', handleGenerate);
intentInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleGenerate();
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'gilded-sigil.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Initial blank render on page load
drawBackground();
