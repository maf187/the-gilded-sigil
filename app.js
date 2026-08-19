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

function drawSigil(letters) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background circle guide
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke();

  if (letters.length === 0) return;

  const points = letters
    .filter(char => letterPositions[char])
    .map(char => letterPositions[char]);

  if (points.length === 0) return;

  // Set line styling
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw starting node circle at the first point
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(points[0].x, points[0].y, 6, 0, 2 * Math.PI);
  ctx.fill();

  // Draw path connecting consonants
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // Draw terminal crossbar on final node
  if (points.length > 1) {
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    const angle = Math.atan2(last.y - prev.y, last.x - prev.x) + (Math.PI / 2);
    const barLength = 12;

    ctx.beginPath();
    ctx.moveTo(last.x - barLength * Math.cos(angle), last.y - barLength * Math.sin(angle));
    ctx.lineTo(last.x + barLength * Math.cos(angle), last.y + barLength * Math.sin(angle));
    ctx.stroke();
  }
}

function handleGenerate() {
  const letters = reduceIntent(intentInput.value);
  consonantsDisplay.textContent = letters.length > 0 ? letters.join(' ') : 'NONE';
  drawSigil(letters);
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

// Initial blank render
drawSigil([]);
