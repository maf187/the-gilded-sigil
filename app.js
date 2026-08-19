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

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFaintGuideRing() {
  ctx.strokeStyle = '#28251e';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawNode(point) {
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function animateSigil(letters) {
  if (currentAnimationFrameId) {
    cancelAnimationFrame(currentAnimationFrameId);
  }

  clearCanvas();
  drawFaintGuideRing();

  if (letters.length === 0) return;

  const points = letters
    .filter(char => letterPositions[char])
    .map(char => letterPositions[char]);

  if (points.length === 0) return;

  // Single consonant edge case
  if (points.length === 1) {
    clearCanvas();
    drawNode(points[0]);

    // Draw full gold containment circle
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
    return;
  }

  let phase = 'lines'; // 'lines' -> 'circle' -> 'complete'
  let currentSegment = 0;
  let lineProgress = 0;
  let circleProgress = 0;

  const lineSpeed = 0.05;    // Segment interpolation speed
  const circleSpeed = 0.035; // Ring sweeping speed

  function renderFrame() {
    clearCanvas();
    drawFaintGuideRing();

    // 1. Draw starting origin node
    drawNode(points[0]);

    // 2. Set gold line styling
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 3. Draw fully completed line segments
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i <= currentSegment; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    // 4. Phase A: Interpolate active line segment
    if (phase === 'lines') {
      if (currentSegment < points.length - 1) {
        const p1 = points[currentSegment];
        const p2 = points[currentSegment + 1];
        const curX = p1.x + (p2.x - p1.x) * lineProgress;
        const curY = p1.y + (p2.y - p1.y) * lineProgress;

        ctx.lineTo(curX, curY);
        ctx.stroke();

        lineProgress += lineSpeed;
        if (lineProgress >= 1) {
          lineProgress = 0;
          currentSegment++;
        }
      } else {
        ctx.stroke();
        drawNode(points[points.length - 1]); // Draw terminal endpoint node
        phase = 'circle';
      }
      currentAnimationFrameId = requestAnimationFrame(renderFrame);
    } 
    // 5. Phase B: Animate sweeping gold containment circle
    else if (phase === 'circle') {
      ctx.stroke();
      drawNode(points[points.length - 1]); // Maintain terminal endpoint node

      const startAngle = -Math.PI / 2;
      const currentAngle = startAngle + (2 * Math.PI * circleProgress);

      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, RADIUS, startAngle, currentAngle);
      ctx.stroke();

      circleProgress += circleSpeed;
      if (circleProgress >= 1) {
        phase = 'complete';
      }
      currentAnimationFrameId = requestAnimationFrame(renderFrame);
    } 
    // 6. Phase C: Final full render on canvas
    else if (phase === 'complete') {
      ctx.stroke();
      drawNode(points[points.length - 1]); // Maintain terminal endpoint node

      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, 2 * Math.PI);
      ctx.stroke();
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
clearCanvas();
drawFaintGuideRing();
