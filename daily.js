
(function() {
  const root = document.getElementById("daily-altar");
  if (!root) return;
  let activeDate = new Date();

  function getAstrologicalMoon(date) {
    const jd = (date.getTime() / 86400000) + 2440587.5;
    const T = (jd - 2451545.0) / 36525.0;

    let L0 = 218.3164477 + 481267.88128 * T - 0.0015786 * T * T;
    let M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
    let Mprime = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
    let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;

    const toRad = Math.PI / 180;
    let lambda = L0
      + 6.288774 * Math.sin(M * toRad)
      + 1.274027 * Math.sin((2 * D - M) * toRad)
      + 0.658314 * Math.sin(2 * D * toRad)
      + 0.213618 * Math.sin(2 * M * toRad)
      - 0.185116 * Math.sin(Mprime * toRad)
      - 0.114332 * Math.sin(2 * D * toRad);

    lambda = ((lambda % 360) + 360) % 360;

    let normD = ((D % 360) + 360) % 360;
    let illumination = Math.round((1 - Math.cos(normD * toRad)) / 2 * 100);

    let phaseName = "New Moon";
    let glyph = "🌑";
    if (normD >= 22.5 && normD < 67.5) { phaseName = "Waxing Crescent"; glyph = "🌒"; }
    else if (normD >= 67.5 && normD < 112.5) { phaseName = "First Quarter"; glyph = "🌓"; }
    else if (normD >= 112.5 && normD < 157.5) { phaseName = "Waxing Gibbous"; glyph = "🌔"; }
    else if (normD >= 157.5 && normD < 202.5) { phaseName = "Full Moon"; glyph = "🌕"; }
    else if (normD >= 202.5 && normD < 247.5) { phaseName = "Waning Gibbous"; glyph = "🌖"; }
    else if (normD >= 247.5 && normD < 292.5) { phaseName = "Last Quarter"; glyph = "🌗"; }
    else if (normD >= 292.5 && normD < 337.5) { phaseName = "Waning Crescent"; glyph = "🌘"; }

    const signs = [
      { name: "Aries", glyph: "♈", elem: "Fire", quality: "Cardinal", msg: "Pioneering impulse. Take initiative and embrace direct clarity." },
      { name: "Taurus", glyph: "♉", elem: "Earth", quality: "Fixed", msg: "Grounding and steady. Focus on material stability and comfort." },
      { name: "Gemini", glyph: "♊", elem: "Air", quality: "Mutable", msg: "Quick mental connections, curiosity, and rapid exchange of ideas." },
      { name: "Cancer", glyph: "♋", elem: "Water", quality: "Cardinal", msg: "Emotional depth and sanctuary. Nurture what is close to home." },
      { name: "Leo", glyph: "♌", elem: "Fire", quality: "Fixed", msg: "Creative warmth and heart-centered expression take center stage." },
      { name: "Virgo", glyph: "♍", elem: "Earth", quality: "Mutable", msg: "Discerning craft, refined systems, and practical service." },
      { name: "Libra", glyph: "♎", elem: "Air", quality: "Cardinal", msg: "Aesthetic harmony, partnership clarity, and peaceful balance." },
      { name: "Scorpio", glyph: "♏", elem: "Water", quality: "Fixed", msg: "Subconscious instincts, deep truth-seeking, and transformation." },
      { name: "Sagittarius", glyph: "♐", elem: "Fire", quality: "Mutable", msg: "Expansive horizons, optimism, and thirst for philosophical truth." },
      { name: "Capricorn", glyph: "♑", elem: "Earth", quality: "Cardinal", msg: "Discipline, strategic longevity, and grounded ambition." },
      { name: "Aquarius", glyph: "♒", elem: "Air", quality: "Fixed", msg: "Unconventional perspectives and collective progress." },
      { name: "Pisces", glyph: "♓", elem: "Water", quality: "Mutable", msg: "Mystical flow, dreamlike intuition, and poetic release." }
    ];

    const signIndex = Math.floor(lambda / 30);
    const sign = signs[signIndex];
    const degreeInSign = lambda % 30;
    

    return { phaseName, glyph, illumination, sign };
  }

  const tarotCards = [
    { num: "0", name: "The Fool", glyph: "🎒", keywords: "Beginnings & Trust", advice: "Step boldly into the new without overthinking." },
    { num: "I", name: "The Magician", glyph: "🪄", keywords: "Manifestation & Focus", advice: "Direct your intentions; your tools are already at hand." },
    { num: "II", name: "The High Priestess", glyph: "🌙", keywords: "Intuition & Mystery", advice: "Listen to the quiet murmur of your inner knowing." },
    { num: "III", name: "The Empress", glyph: "🌾", keywords: "Abundance & Creation", advice: "Nurture what brings tangible beauty and growth." },
    { num: "IV", name: "The Emperor", glyph: "👑", keywords: "Structure & Sovereignty", advice: "Bring order to chaos. Maintain clear, quiet boundaries." },
    { num: "V", name: "The Hierophant", glyph: "📜", keywords: "Wisdom & Tradition", advice: "Honor time-tested methods and trusted guides." },
    { num: "VI", name: "The Lovers", glyph: "❤️", keywords: "Alignment & Choice", advice: "Choose in direct harmony with your deepest personal values." },
    { num: "VII", name: "The Chariot", glyph: "🛡️", keywords: "Momentum & Will", advice: "Focus conflicting drives into a singular path forward." },
    { num: "VIII", name: "Strength", glyph: "🦁", keywords: "Courage & Patience", advice: "Quiet grace achieves far more than force today." },
    { num: "IX", name: "The Hermit", glyph: "🏮", keywords: "Solitude & Inner Light", advice: "Step back from external noise to find your inner compass." },
    { num: "X", name: "Wheel of Fortune", glyph: "☸️", keywords: "Cycles & Turning Points", advice: "Flow with the turning current; change brings renewal." },
    { num: "XI", name: "Justice", glyph: "⚖️", keywords: "Truth & Cause/Effect", advice: "Weigh matters with honest, unbiased discernment." },
    { num: "XII", name: "The Hanged Man", glyph: "🪞", keywords: "Surrender & New Angles", advice: "Pause and look at the situation upside down." },
    { num: "XIII", name: "Death", glyph: "🥀", keywords: "Release & Renewal", advice: "Let what is done fall away with complete peace." },
    { num: "XIV", name: "Temperance", glyph: "🏺", keywords: "Patience & Alchemy", advice: "Blend extremes into an elegant, tranquil middle way." },
    { num: "XV", name: "The Devil", glyph: "⛓️", keywords: "Shadow & Release", advice: "Spot self-imposed chains and step free of them." },
    { num: "XVI", name: "The Tower", glyph: "⚡", keywords: "Awakening & Truth", advice: "Welcome whatever clears obsolete illusions." },
    { num: "XVII", name: "The Star", glyph: "⭐", keywords: "Hope & Serenity", advice: "Breathe in trust; your healing path is opening." },
    { num: "XVIII", name: "The Moon", glyph: "🌘", keywords: "Dreams & Depth", advice: "Navigate by intuition rather than hasty assumptions." },
    { num: "XIX", name: "The Sun", glyph: "☀️", keywords: "Vitality & Radiance", advice: "Express your joy and gifts without reservation." },
    { num: "XX", name: "Judgement", glyph: "📯", keywords: "Calling & Rebirth", advice: "Answer your higher inner calling; forgive the past." },
    { num: "XXI", name: "The World", glyph: "🌐", keywords: "Wholeness & Completion", advice: "A cycle reaches fruitful, beautiful fruition." }
  ];

  function getDailyCard(date) {
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    return tarotCards[(seed * 9301 + 49297) % tarotCards.length];
  }

  const numDictionary = {
    1: { title: "Initiation & Action", summary: "Plant new seeds and initiate fresh momentum with boldness." },
    2: { title: "Receptivity & Harmony", summary: "Practice patience, sensitive partnership, and quiet listening." },
    3: { title: "Creative Expression", summary: "Share your voice, indulge in artistic joy, and foster connection." },
    4: { title: "Structure & Foundation", summary: "Ground down into methodical craft, discipline, and stable routine." },
    5: { title: "Flow & Exploration", summary: "Embrace unexpected shifts and lean into adaptable curiosity." },
    6: { title: "Nurturance & Sanctuary", summary: "Harmonize domestic spaces and tend carefully to close bonds." },
    7: { title: "Introspection & Study", summary: "Turn inward for philosophical discernment, research, and stillness." },
    8: { title: "Authority & Manifestation", summary: "Step into executive command and direct practical resources." },
    9: { title: "Completion & Surrender", summary: "Tie up loose threads and gently release what has completed its cycle." },
    11: { title: "Illuminated Epiphany", summary: "Stay attentive to sudden intuitive revelations and cosmic nudges." },
    22: { title: "Master Architecture", summary: "Translate large visionary concepts into tangible physical reality." }
  };

  function reduceNum(n, allowMaster = true) {
    if (allowMaster && (n === 11 || n === 22 || n === 33)) return n;
    while (n > 9) {
      if (allowMaster && (n === 11 || n === 22 || n === 33)) return n;
      n = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return n;
  }

  function getUniversalNumerology(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const uYear = reduceNum(y.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0), false);
    const uMonth = reduceNum(m + uYear, false);
    const uDay = reduceNum(d + uMonth, true);

    return {
      uDay,
      uMonth,
      uYear,
      dayData: numDictionary[uDay] || numDictionary[reduceNum(uDay, false)]
    };
  }

  function renderAltar() {
    document.getElementById('active-date-display').textContent = activeDate.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    const lunar = getAstrologicalMoon(activeDate);
    const tarot = getDailyCard(activeDate);
    const num = getUniversalNumerology(activeDate);

    document.getElementById('moon-glyph').textContent = lunar.glyph;
    document.getElementById('moon-sign').textContent = `Moon in ${lunar.sign.name} ${lunar.sign.glyph}`;
    document.getElementById('moon-element-quality').textContent = `${lunar.sign.elem} • ${lunar.sign.quality} Modality`;
    document.getElementById('lunar-illumination').textContent = `${lunar.illumination}% Lit (${lunar.phaseName})`;
    document.getElementById('moon-transit-message').textContent = lunar.sign.msg;

    document.getElementById('u-day-badge').textContent = num.uDay;
    document.getElementById('u-day-title').textContent = num.dayData.title;
    document.getElementById('u-day-summary').textContent = num.dayData.summary;
    document.getElementById('u-month-val').textContent = num.uMonth;
    document.getElementById('u-year-val').textContent = num.uYear;

    document.getElementById('tarot-num').textContent = `ARCANA ${tarot.num}`;
    document.getElementById('tarot-glyph').textContent = tarot.glyph;
    document.getElementById('tarot-title').textContent = tarot.name;
    document.getElementById('tarot-essence').textContent = tarot.keywords;

    const cardInner = document.getElementById('tarot-card-inner');
    cardInner.classList.remove('flipped');
    syncCardAccessibility(false);
    document.getElementById('card-state-label').textContent = "Tap to Reveal";
    document.getElementById('tarot-message').textContent = "Tap the sigil to reveal your archetypal guide for the day.";

    calculatePersonalNumerology(false);
    document.getElementById("date-note").textContent = "Your local date · Lunar estimate at " + activeDate.toLocaleTimeString([], {hour:"numeric", minute:"2-digit",timeZoneName:"short"});
  }

  const cardTrigger = document.getElementById('tarot-card-trigger');
  const cardInner = document.getElementById('tarot-card-inner');
  cardTrigger.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
    const isFlipped = cardInner.classList.contains('flipped');
    syncCardAccessibility(isFlipped);
    const tarot = getDailyCard(activeDate);

    if (isFlipped) {
      document.getElementById('card-state-label').textContent = "Revealed";
      document.getElementById('tarot-message').textContent = `${tarot.name}: ${tarot.advice}`;
    } else {
      document.getElementById('card-state-label').textContent = "Tap to Reveal";
      document.getElementById('tarot-message').textContent = "Tap the sigil to reveal your archetypal guide for the day.";
    }
  });

  function syncCardAccessibility(revealed) {
    const trigger = document.getElementById('tarot-card-trigger');
    trigger.setAttribute('aria-pressed', String(revealed));
    trigger.setAttribute('aria-label', revealed ? 'Conceal daily tarot card' : 'Reveal daily tarot card');
    root.querySelector('.card-front').setAttribute('aria-hidden', String(revealed));
    root.querySelector('.card-back').setAttribute('aria-hidden', String(!revealed));
  }
  cardTrigger.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); cardTrigger.click(); }
  });
  function clearPersonalResult() {
    document.getElementById('personal-day-result').classList.remove('show');
    document.getElementById('birth-error').textContent = '';
  }
  function calculatePersonalNumerology(showError = true) {
    clearPersonalResult();
    const bMonth = Number(document.getElementById('birth-month').value);
    const bDay = Number(document.getElementById('birth-day').value);
    const maxDays = [31,29,31,30,31,30,31,31,30,31,30,31];
    if (!Number.isInteger(bMonth) || bMonth < 1 || bMonth > 12 || !Number.isInteger(bDay) || bDay < 1 || bDay > maxDays[bMonth-1]) {
      if(showError) document.getElementById('birth-error').textContent = 'Choose a valid birth month and day. February 29 is welcome.';
      return;
    }
    const curYear = activeDate.getFullYear();
    const curYearReduced = reduceNum(curYear.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0), false);

    const pYear = reduceNum(bMonth + bDay + curYearReduced, false);
    const curMonth = activeDate.getMonth() + 1;
    const pMonth = reduceNum(pYear + curMonth, false);
    const curDay = activeDate.getDate();
    const pDay = reduceNum(pMonth + curDay, true);
    const pDayData = numDictionary[pDay] || numDictionary[reduceNum(pDay, false)];

    const resultBox = document.getElementById('personal-day-result');
    resultBox.classList.add('show');
    document.getElementById('p-day-title').textContent = `Personal Day ${pDay} (${pDayData.title}):`;
    document.getElementById('p-day-summary').textContent = pDayData.summary;
    document.getElementById('p-month-badge').textContent = `Personal Month ${pMonth}`;
    document.getElementById('p-year-badge').textContent = `Personal Year ${pYear}`;
  }

  document.getElementById('calc-pday-btn').addEventListener('click', () => calculatePersonalNumerology(true));

  document.getElementById('prev-day-btn').addEventListener('click', () => {
    activeDate.setDate(activeDate.getDate() - 1);
    renderAltar();
  });
  document.getElementById('next-day-btn').addEventListener('click', () => {
    activeDate.setDate(activeDate.getDate() + 1);
    renderAltar();
  });

  document.getElementById('today-btn').addEventListener('click', () => { activeDate = new Date(); renderAltar(); });
  ['birth-month', 'birth-day'].forEach(id => {
    document.getElementById(id).addEventListener('input', clearPersonalResult);
    document.getElementById(id).addEventListener('change', clearPersonalResult);
  });
  renderAltar();
})();
