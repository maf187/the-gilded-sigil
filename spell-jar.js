document.addEventListener('DOMContentLoaded', () => {
  const intentInput = document.getElementById('intentInput');
  const formulateBtn = document.getElementById('formulateBtn');
  const reShuffleBtn = document.getElementById('reShuffleBtn');
  const intentFeedback = document.getElementById('intentFeedback');
  const recipeOutput = document.getElementById('recipeOutput');
  const ingredientStack = document.getElementById('ingredientStack');
  const sealingSection = document.getElementById('sealingSection');
  const corkSeal = document.getElementById('corkSeal');

  // Layer visual elements
  const visualBase = document.getElementById('visualBase');
  const visualHerb1 = document.getElementById('visualHerb1');
  const visualHerb2 = document.getElementById('visualHerb2');
  const visualCrystal = document.getElementById('visualCrystal');

  // Synonym dictionary mapping freeform terms to grimoire correspondence tags
  const INTENT_SYNONYMS = {
    protection: ["protect", "protection", "shield", "ward", "defense", "defend", "safe", "boundary", "home", "security", "guard", "barrier"],
    prosperity: ["money", "wealth", "prosperity", "abundance", "business", "career", "success", "riches", "fortune", "cash", "growth", "finance", "gain"],
    love: ["love", "romance", "passion", "relationship", "attract", "beauty", "affection", "self-love", "marriage", "soulmate", "heart", "lust"],
    purification: ["cleanse", "cleansing", "purify", "purification", "clear", "fresh", "stale", "clean", "reset", "smudge", "wash"],
    healing: ["heal", "healing", "health", "recovery", "soothe", "restoration", "vitality", "body", "illness", "wellness", "cure", "pain"],
    peace_sleep: ["peace", "calm", "sleep", "rest", "insomnia", "tranquility", "anxiety", "serenity", "dreams", "nightmare", "relax", "stress"],
    psychic_intuition: ["psychic", "intuition", "divination", "tarot", "third eye", "vision", "astral", "spirits", "clarity", "wisdom", "dream", "oracle"],
    courage: ["courage", "brave", "strength", "confidence", "willpower", "bold", "fear", "overcome", "power", "fortitude"],
    banishing: ["banish", "hex", "curse", "uncross", "remove", "negative", "repel", "evil", "gossip", "unbind", "rid", "enemy"]
  };

  // Helper to grab random items without repetition
  function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function parseFreeformIntent(inputText) {
    const cleanText = inputText.toLowerCase().replace(/[^a-z\s]/g, '');
    const words = cleanText.split(/\s+/);
    
    const scores = {};
    Object.keys(INTENT_SYNONYMS).forEach(intent => scores[intent] = 0);

    words.forEach(word => {
      for (const [intent, synonyms] of Object.entries(INTENT_SYNONYMS)) {
        if (synonyms.some(syn => syn === word || word.startsWith(syn))) {
          scores[intent] += 1;
        }
      }
    });

    let dominantIntent = null;
    let highestScore = 0;

    for (const [intent, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        dominantIntent = intent;
      }
    }

    return dominantIntent || "protection";
  }

  function findSubstitutes(missingItemName, selectedIntent, isMineral = false) {
    const pool = isMineral ? GRIMOIRE_DATA.minerals : GRIMOIRE_DATA.herbs;
    return pool.filter(item => item.name !== missingItemName && item.correspondences.includes(selectedIntent));
  }

  function renderCard(item, layerNumber, layerRole, selectedIntent, isMineral = false) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.id = `layer-card-${layerNumber}`;

    // Clean up raw database tags into polished Title Case
    const rawForm = item.form || item.type || 'botanical';
    const cleanForm = rawForm
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    let subListHtml = '';
    
    if (item.substitutes && item.substitutes.length > 0) {
      // Use hardcoded substitutes if you defined them in GRIMOIRE_DATA
      subListHtml = item.substitutes.map(sub => `<li><strong>${sub}</strong></li>`).join('');
    } else {
      // Otherwise, dynamically search the Grimoire
      const substitutes = findSubstitutes(item.name, selectedIntent, isMineral);
      subListHtml = substitutes.length > 0
        ? substitutes.map(sub => `<li><strong>${sub.name}</strong> — ${sub.description}</li>`).join('')
        : '<li>No direct match in the grimoire archives. Substitute with standard Sea Salt or Clear Quartz for universal amplification.</li>';
    }

    card.innerHTML = `
      <div class="card-header">
        <span class="layer-badge">Layer ${layerNumber}: ${layerRole}</span>
        <h4 class="item-title">${item.name}</h4>
      </div>
      <p class="item-desc">${item.description}</p>
      <div class="item-meta">
        <span class="meta-tag">Form: ${cleanForm}</span>
        ${item.safety_note ? `<p class="safety-warning"><strong>Safety / Usage:</strong> ${item.safety_note}</p>` : ''}
      </div>
      
      <div class="substitute-toggle-wrapper">
        <button type="button" class="sub-toggle-btn" data-target="sub-${layerNumber}">
          Don't have ${item.name}? View Substitutions
        </button>
      </div>

      <div class="substitutes-panel" id="sub-${layerNumber}" style="display: none;">
        <h5>Recommended Grimoire Substitutes:</h5>
        <ul>${subListHtml}</ul>
      </div>
    `;

    return card;
  }

  function formulateRecipe() {
    const rawInput = intentInput.value.trim();
    if (!rawInput) return;

    const detectedIntent = parseFreeformIntent(rawInput);
    
    // Provide clean feedback to the user
    const formattedIntentName = detectedIntent.replace('_', ' ').toUpperCase();
    intentFeedback.innerHTML = `Aligning correspondence matrix to: <span style="color: #d4af37; font-weight: 600;">${formattedIntentName}</span>`;

    // Filter matching herbs and minerals
    const matchingHerbs = GRIMOIRE_DATA.herbs.filter(h => h.correspondences.includes(detectedIntent));
    const matchingMinerals = GRIMOIRE_DATA.minerals.filter(m => m.correspondences.includes(detectedIntent));
    const matchingWax = GRIMOIRE_DATA.waxColors.find(w => w.correspondences.includes(detectedIntent)) 
      || GRIMOIRE_DATA.waxColors.find(w => w.color === "White");

    // Dynamic selection of minerals and herbs
    const matchingBases = matchingMinerals.filter(m => m.form === "granular_base");
    
    const baseMineral = matchingBases.length > 0 
      ? getRandomItems(matchingBases, 1)[0] 
      : GRIMOIRE_DATA.minerals.find(m => m.name === "Sea Salt");
    
    // Randomize botanical selections from matches
    const selectedHerbs = getRandomItems(matchingHerbs, 2);
    const primaryHerb = selectedHerbs[0] || GRIMOIRE_DATA.herbs[0];
    const secondaryHerb = selectedHerbs[1] || (matchingHerbs.find(h => h.name !== primaryHerb.name) || GRIMOIRE_DATA.herbs[1]);

    // Randomize crystal selection from matches (excluding the base mineral)
    const matchingCrystals = matchingMinerals.filter(m => m.type === "crystal" && m.name !== baseMineral.name);
    const crystal = matchingCrystals.length > 0
      ? getRandomItems(matchingCrystals, 1)[0]
      : GRIMOIRE_DATA.minerals.find(m => m.name === "Clear Quartz");

    // Clear previous output
    ingredientStack.innerHTML = '';

    // Render Recipe Cards
    ingredientStack.appendChild(renderCard(baseMineral, 1, "Mineral Foundation", detectedIntent, true));
    ingredientStack.appendChild(renderCard(primaryHerb, 2, "Primary Botanical Anchor", detectedIntent, false));
    ingredientStack.appendChild(renderCard(secondaryHerb, 3, "Secondary Botanical Catalyst", detectedIntent, false));
    ingredientStack.appendChild(renderCard(crystal, 4, "Top Focal Crystal", detectedIntent, true));

    // Render Sealing Wax Section
    sealingSection.innerHTML = `
      <div class="wax-seal-card" style="border-left: 4px solid ${matchingWax.hex};">
        <h4 style="color: #d4af37; margin-bottom: 0.3rem;">Vessel Seal: ${matchingWax.color} Wax</h4>
        <p style="color: #c2beaf; font-size: 1.05rem;">${matchingWax.description}</p>
      </div>
    `;

    // Update Visual Jar Layer Labels
    visualBase.textContent = baseMineral.name;
    visualHerb1.textContent = primaryHerb.name;
    visualHerb2.textContent = secondaryHerb.name;
    visualCrystal.textContent = crystal.name;
    corkSeal.style.backgroundColor = matchingWax.hex;
    corkSeal.style.boxShadow = `0 0 10px ${matchingWax.hex}88`;

    // Reveal output
    recipeOutput.style.display = 'block';

    // Attach Toggle Listeners for Substitutes
    document.querySelectorAll('.sub-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const panel = document.getElementById(targetId);
        const isOpen = panel.style.display === 'block';
        panel.style.display = isOpen ? 'none' : 'block';
        e.target.textContent = isOpen 
          ? e.target.textContent.replace('Hide', 'View')
          : e.target.textContent.replace('View', 'Hide');
      });
    });
  }

  formulateBtn.addEventListener('click', formulateRecipe);
  
  if (reShuffleBtn) {
    reShuffleBtn.addEventListener('click', formulateRecipe);
  }

  intentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') formulateRecipe();
  });
});
