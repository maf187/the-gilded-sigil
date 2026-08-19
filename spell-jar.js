document.addEventListener('DOMContentLoaded', () => {
  const intentSelect = document.getElementById('intentSelect');
  const formulateBtn = document.getElementById('formulateBtn');
  const recipeOutput = document.getElementById('recipeOutput');
  const ingredientStack = document.getElementById('ingredientStack');
  const sealingSection = document.getElementById('sealingSection');
  const corkSeal = document.getElementById('corkSeal');

  // Layer visual elements
  const visualBase = document.getElementById('visualBase');
  const visualHerb1 = document.getElementById('visualHerb1');
  const visualHerb2 = document.getElementById('visualHerb2');
  const visualCrystal = document.getElementById('visualCrystal');

  function findSubstitutes(missingItemName, selectedIntent, isMineral = false) {
    const pool = isMineral ? GRIMOIRE_DATA.minerals : GRIMOIRE_DATA.herbs;
    return pool.filter(item => item.name !== missingItemName && item.correspondences.includes(selectedIntent));
  }

  function renderCard(item, layerNumber, layerRole, selectedIntent, isMineral = false) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.id = `layer-card-${layerNumber}`;

    const substitutes = findSubstitutes(item.name, selectedIntent, isMineral);
    const subListHtml = substitutes.length > 0
      ? substitutes.map(sub => `<li><strong>${sub.name}</strong> — ${sub.description}</li>`).join('')
      : '<li>No direct match in the current grimoire archives. Substitute with standard Sea Salt or Clear Quartz for universal amplification.</li>';

    card.innerHTML = `
      <div class="card-header">
        <span class="layer-badge">Layer ${layerNumber}: ${layerRole}</span>
        <h4 class="item-title">${item.name}</h4>
      </div>
      <p class="item-desc">${item.description}</p>
      <div class="item-meta">
        <span class="meta-tag">Form: ${item.form || item.type}</span>
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
    const selectedIntent = intentSelect.value;
    if (!selectedIntent) return;

    // Filter matching herbs and minerals
    const matchingHerbs = GRIMOIRE_DATA.herbs.filter(h => h.correspondences.includes(selectedIntent));
    const matchingMinerals = GRIMOIRE_DATA.minerals.filter(m => m.correspondences.includes(selectedIntent));
    const matchingWax = GRIMOIRE_DATA.waxColors.find(w => w.correspondences.includes(selectedIntent)) 
      || GRIMOIRE_DATA.waxColors.find(w => w.color === "White");

    // Fallbacks if intent has limited matches
    const baseMineral = matchingMinerals.find(m => m.form === "granular_base" || m.name === "Sea Salt") 
      || GRIMOIRE_DATA.minerals.find(m => m.name === "Sea Salt");
    
    const primaryHerb = matchingHerbs[0] || GRIMOIRE_DATA.herbs[0];
    const secondaryHerb = matchingHerbs[1] || (matchingHerbs[0] ? matchingHerbs[0] : GRIMOIRE_DATA.herbs[1]);
    const crystal = matchingMinerals.find(m => m.type === "crystal" && m.name !== baseMineral.name) 
      || GRIMOIRE_DATA.minerals.find(m => m.name === "Clear Quartz");

    // Clear previous output
    ingredientStack.innerHTML = '';

    // Render Recipe Cards
    ingredientStack.appendChild(renderCard(baseMineral, 1, "Mineral Foundation", selectedIntent, true));
    ingredientStack.appendChild(renderCard(primaryHerb, 2, "Primary Botanical Anchor", selectedIntent, false));
    ingredientStack.appendChild(renderCard(secondaryHerb, 3, "Secondary Botanical Catalyst", selectedIntent, false));
    ingredientStack.appendChild(renderCard(crystal, 4, "Top Focal Crystal", selectedIntent, true));

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

    // Show output container
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
  intentSelect.addEventListener('change', formulateRecipe);
});
