const GRIMOIRE_DATA = {
  herbs: [
    { 
      name: "Lavender", 
      correspondences: ["peace_sleep", "purification", "calm"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_infusion", 
      safety_note: "Culinary-grade buds only; avoid essential oil ingestion.", 
      description: "Induces deep tranquility, calm slumber, and emotional balance." 
    },
    { 
      name: "Rosemary", 
      correspondences: ["protection", "purification", "memory"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_culinary_rinse", 
      safety_note: "Culinary herb; use high medicinal doses with caution if pregnant.", 
      description: "Powerful all-purpose defensive botanical; cleanses and wards spaces." 
    },
    { 
      name: "Sage", 
      correspondences: ["purification", "wisdom"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_culinary_smudge", 
      safety_note: "Common Garden Sage (Salvia officinalis) is culinary; White Sage is traditionally for smoke cleansing.", 
      description: "Clears lingering negative energy and invites mental clarity." 
    },
    { 
      name: "Basil", 
      correspondences: ["prosperity", "protection", "love"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "culinary_infusion", 
      safety_note: "Standard culinary herb; safe for food and beverage infusions.", 
      description: "Draws steady wealth, financial luck, and domestic harmony." 
    },
    { 
      name: "Peppermint", 
      correspondences: ["prosperity", "healing", "safe_travel"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_infusion", 
      safety_note: "Safe in teas; avoid strong essential oils near infants or pets.", 
      description: "High-vibration botanical for rapid abundance and renewed vitality." 
    },
    { 
      name: "Thyme", 
      correspondences: ["courage", "healing", "psychic_intuition"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_culinary_steam", 
      safety_note: "Standard culinary seasoning; safe in tea and steam inhalations.", 
      description: "Dispels fear, builds internal fortitude, and enhances psychic dreams." 
    },
    { 
      name: "Chamomile", 
      correspondences: ["peace_sleep", "prosperity", "luck"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_infusion", 
      safety_note: "Safe in teas; check for ragweed/daisy family allergies.", 
      description: "Solar flower used to soothe stress and attract gentle wealth." 
    },
    { 
      name: "Cinnamon", 
      correspondences: ["prosperity", "passion", "courage"], 
      form: "bark", 
      consumable: true, 
      consumable_form: "infusion_culinary_spice", 
      safety_note: "Ceylon preferred for high daily intake; can cause skin irritation in bath water.", 
      description: "Accelerates spell speed, adding heat, drive, and rapid financial luck." 
    },
    { 
      name: "Bay Leaf", 
      correspondences: ["wishes", "protection", "prosperity"], 
      form: "whole_leaf", 
      consumable: true, 
      consumable_form: "broth_infusion_smoke", 
      safety_note: "Safe to simmer/infuse; remove whole rigid leaf before swallowing.", 
      description: "Traditional talisman for manifesting written intentions and boundary warding." 
    },
    { 
      name: "Rose Petals", 
      correspondences: ["love", "beauty", "healing"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_syrup_infusion", 
      safety_note: "Ensure petals are food-grade and pesticide-free (not florist roses).", 
      description: "Attracts unconditional affection, self-worth, and emotional restoration." 
    },
    { 
      name: "Jasmine Flower", 
      correspondences: ["love", "psychic_intuition", "prosperity"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_blend", 
      safety_note: "Jasminum sambac/officinale only; avoid yellow star jasmine which is toxic.", 
      description: "Lunar flower associated with spiritual romance and intuitive dreams." 
    },
    { 
      name: "Lemon Balm", 
      correspondences: ["healing", "love", "peace_sleep"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_infusion", 
      safety_note: "Mild sedative and mood lifter; safe for regular culinary and tea use.", 
      description: "Restores vitality, lifts melancholic moods, and dispels tension." 
    },
    { 
      name: "Yarrow", 
      correspondences: ["courage", "love", "psychic_intuition"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_tincture_wash", 
      safety_note: "Avoid internal use during pregnancy; check for Asteraceae allergies.", 
      description: "Ancient boundary herb; binds love connections and protects against energetic drain." 
    },
    { 
      name: "Calendula", 
      correspondences: ["joy", "protection", "legal_matters"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_oil_infusion", 
      safety_note: "Calendula officinalis is food-grade; do not confuse with ornamental Tagetes marigolds.", 
      description: "Brings radiant solar light, legal success, and optimistic vitality." 
    },
    { 
      name: "Lemongrass", 
      correspondences: ["purification", "psychic_intuition"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_culinary", 
      safety_note: "Safe for food and tea; avoid medicinal-strength oils while pregnant.", 
      description: "Cuts through energetic fog and sharpens divination faculties." 
    },
    { 
      name: "Clove", 
      correspondences: ["protection", "prosperity", "banishing"], 
      form: "spice", 
      consumable: true, 
      consumable_form: "culinary_mulled_tea", 
      safety_note: "Potent spice; use sparingly in foods and avoid pure clove oil on skin.", 
      description: "Drives away gossip and malevolent intent while guarding wealth." 
    },
    { 
      name: "Dill", 
      correspondences: ["protection", "prosperity", "luck"], 
      form: "seed", 
      consumable: true, 
      consumable_form: "culinary_seasoning", 
      safety_note: "Standard culinary herb and seed; safe for general consumption.", 
      description: "Shields against unwanted intrusions and preserves material gains." 
    },
    { 
      name: "Fennel Seed", 
      correspondences: ["protection", "purification", "longevity"], 
      form: "seed", 
      consumable: true, 
      consumable_form: "tea_culinary", 
      safety_note: "Safe digestive aid; avoid excessive therapeutic doses during pregnancy.", 
      description: "Cleanses stale energetic buildup and guards spiritual longevity." 
    },
    { 
      name: "Hyssop", 
      correspondences: ["purification", "protection"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_ritual_wash", 
      safety_note: "Contains pinocamphone; avoid prolonged high-dose consumption or if prone to seizures.", 
      description: "Sacred cleansing botanical for absolute spiritual purification." 
    },
    { 
      name: "Marjoram", 
      correspondences: ["happiness", "protection", "healing"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_culinary", 
      safety_note: "Standard sweet culinary herb; safe for cooking and light tea.", 
      description: "Promotes home peace, familial joy, and gentle protection." 
    },
    { 
      name: "Nettle", 
      correspondences: ["protection", "banishing", "healing"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "tea_decoction", 
      safety_note: "Dry or boil thoroughly to neutralize stinging hairs before ingesting.", 
      description: "Fierce warding herb that reflects negative energy back to its source." 
    },
    { 
      name: "Vervain", 
      correspondences: ["protection", "love", "purification"], 
      form: "herb", 
      consumable: true, 
      consumable_form: "bitter_tea_infusion", 
      safety_note: "Very bitter taste; avoid in high therapeutic doses during pregnancy.", 
      description: "Ancient folk catalyst that amplifies accompanying botanical energies." 
    },
    { 
      name: "Mugwort", 
      correspondences: ["psychic_intuition", "protection", "peace_sleep"], 
      form: "herb", 
      consumable: false, 
      consumable_form: "smoke_incense_dream_pillow", 
      safety_note: "Strictly avoid internally during pregnancy; best used as incense or sachet filler.", 
      description: "Awakens the third eye and guards astral travel during rest." 
    },
    { 
      name: "Dandelion", 
      correspondences: ["wishes", "psychic_intuition"], 
      form: "root_flower", 
      consumable: true, 
      consumable_form: "roasted_root_tea_leaves", 
      safety_note: "Food-safe root and greens; natural mild diuretic.", 
      description: "Carries prayers and deep desires to the spiritual plane." 
    },
    { 
      name: "Elder Flower", 
      correspondences: ["protection", "prosperity", "healing"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tea_cordial", 
      safety_note: "Use flowers and cooked ripe berries only; stems, leaves, and raw berries contain toxins.", 
      description: "Connects with woodland lore for deep shielding and blessing." 
    },
    { 
      name: "Hibiscus", 
      correspondences: ["love", "passion", "psychic_intuition"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "tart_tea_infusion", 
      safety_note: "Tart, vitamin C-rich tea; avoid high therapeutic quantities during pregnancy.", 
      description: "Ignites romance, sensual attraction, and passionate willpower." 
    },
    { 
      name: "Comfrey Leaf", 
      correspondences: ["safe_travel", "prosperity", "healing"], 
      form: "herb", 
      consumable: false, 
      consumable_form: "external_poultice_salve", 
      safety_note: "Contains pyrrolizidine alkaloids; do NOT ingest or use on open skin.", 
      description: "Guards luggage and travelers; repairs fragmented energy externally." 
    },
    { 
      name: "St. John's Wort", 
      correspondences: ["protection", "courage", "happiness"], 
      form: "herb", 
      consumable: false, 
      consumable_form: "infused_oil_topical", 
      safety_note: "Interacts heavily with numerous prescription medications (SSRIs, birth control); best kept external.", 
      description: "Solar talisman against darkness, nightmares, and despair." 
    },
    { 
      name: "Lilac", 
      correspondences: ["protection", "memory"], 
      form: "flower", 
      consumable: true, 
      consumable_form: "infused_honey_syrup", 
      safety_note: "Syringa vulgaris blossoms are edible; ensure flowers are clean and pesticide-free.", 
      description: "Soft spiritual barrier that preserves sacred memories." 
    },
    { 
      name: "Patchouli Leaf", 
      correspondences: ["prosperity", "grounding", "passion"], 
      form: "herb", 
      consumable: false, 
      consumable_form: "incense_sachet_oil", 
      safety_note: "Non-culinary botanical; strictly for aromatic incense, oils, and spell jars.", 
      description: "Rich, earthy botanical for anchoring money and physical manifestation." 
    }
  ],
  minerals: [
    { 
      name: "Clear Quartz", 
      type: "crystal", 
      correspondences: ["amplification", "clarity", "purification"], 
      form: "point_chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Never submerge raw crystal chips directly into drinking liquids.", 
      description: "Universal amplifier; magnifies the intention of every neighboring ingredient." 
    },
    { 
      name: "Rose Quartz", 
      type: "crystal", 
      correspondences: ["love", "healing", "calm"], 
      form: "chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Non-consumable mineral; use in dry jar layers or holding during meditation.", 
      description: "Softens emotional tension and broadcasts gentle romantic energy." 
    },
    { 
      name: "Black Tourmaline", 
      type: "crystal", 
      correspondences: ["protection", "grounding", "banishing"], 
      form: "chunk", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Non-consumable mineral containing complex borosilicate compounds.", 
      description: "Premier energetic shield; absorbs and grounds heavy or harmful vibrations." 
    },
    { 
      name: "Citrine", 
      type: "crystal", 
      correspondences: ["prosperity", "courage", "joy"], 
      form: "chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Non-consumable mineral; ideal for prosperity jars and altar matrices.", 
      description: "Solar abundance stone that continually attracts success and opportunities." 
    },
    { 
      name: "Amethyst", 
      type: "crystal", 
      correspondences: ["psychic_intuition", "protection", "peace_sleep"], 
      form: "cluster_chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Non-consumable quartz variety; keeps third-eye energy clear.", 
      description: "Spiritual sentinel; quiets overactive minds and guards against psychic attack." 
    },
    { 
      name: "Tiger's Eye", 
      type: "crystal", 
      correspondences: ["courage", "luck", "protection"], 
      form: "chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Contains asbestos fibers bound in quartz; never ingest, grind, or inhale dust.", 
      description: "Sharpens focus, protects personal boundaries, and brings luck." 
    },
    { 
      name: "Hematite", 
      type: "crystal", 
      correspondences: ["grounding", "protection", "banishing"], 
      form: "tumbled", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Iron oxide mineral; do not soak in water as it may rust. Non-consumable.", 
      description: "Reflective grounding stone; anchors root energy and deflects negativity." 
    },
    { 
      name: "Selenite", 
      type: "crystal", 
      correspondences: ["purification", "clarity", "amplification"], 
      form: "wand_chip", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Water-soluble gypsum; dissolves and degrades in water. Keep strictly dry.", 
      description: "Self-cleansing crystal that maintains energetic hygiene within the vessel." 
    },
    { 
      name: "Pyrite", 
      type: "mineral", 
      correspondences: ["prosperity", "luck", "courage"], 
      form: "cluster", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Iron sulfide; releases toxic compounds in water. Keep strictly dry.", 
      description: "Gold-hued mineral that acts as an energetic magnet for wealth and bold action." 
    },
    { 
      name: "Carnelian", 
      type: "crystal", 
      correspondences: ["passion", "courage", "creativity"], 
      form: "tumbled", 
      consumable: false, 
      consumable_form: "none_crystal", 
      safety_note: "Non-consumable chalcedony crystal; keep for dry altar and jar use.", 
      description: "Ignites passion, bold self-expression, and vital creative drive." 
    },
    { 
      name: "Frankincense", 
      type: "resin", 
      correspondences: ["purification", "protection", "psychic_intuition"], 
      form: "resin_tears", 
      consumable: false, 
      consumable_form: "incense_smoke_oil_infusion", 
      safety_note: "Raw resin tears are for burning or jar layers; do not swallow.", 
      description: "Sacred resin tears that elevate vibrational frequencies." 
    },
    { 
      name: "Myrrh", 
      type: "resin", 
      correspondences: ["healing", "protection", "banishing"], 
      form: "resin_tears", 
      consumable: false, 
      consumable_form: "incense_smoke_anointing_oil", 
      safety_note: "Use for charcoal incense or jar layers; avoid internal use during pregnancy.", 
      description: "Ancient restorative resin for grounding and warding." 
    },
    { 
      name: "Dragon's Blood", 
      type: "resin", 
      correspondences: ["protection", "passion", "amplification"], 
      form: "resin_powder", 
      consumable: false, 
      consumable_form: "incense_smoke_jar_powder", 
      safety_note: "Inedible resin; strictly for burning, spell jars, or sealing wax.", 
      description: "Potent crimson resin that drastically boosts the potency of defensive workings." 
    },
    { 
      name: "Copal", 
      type: "resin", 
      correspondences: ["purification", "clarity"], 
      form: "resin_tears", 
      consumable: false, 
      consumable_form: "incense_smoke", 
      safety_note: "Inedible tree resin; burns cleanly on charcoal for sacred space cleansing.", 
      description: "Bright, fragrant resin that purifies the aura and cleanses tools." 
    },
    { 
      name: "Sea Salt", 
      type: "mineral", 
      correspondences: ["purification", "protection", "grounding"], 
      form: "granular_base", 
      consumable: true, 
      consumable_form: "culinary_salt_water_bath", 
      safety_note: "Pure sea salt is food-safe; craft-dyed or black witch salt is external only.", 
      description: "Essential foundation layer for casting wards and anchoring intention." 
    }
  ],
  waxColors: [
    { color: "Pink", correspondences: ["love", "harmony", "beauty"], hex: "#d4889c", description: "Seals gentle romantic love, self-worth, emotional restoration, and friendship." },
    { color: "Red", correspondences: ["passion", "love", "courage"], hex: "#8a2424", description: "Infuses fiery drive, sensual attraction, and swift energetic action." },
    { color: "Black", correspondences: ["protection", "banishing", "grounding"], hex: "#1c1b1a", description: "Seals out external interference, binds wards, and dispels toxicity." },
    { color: "Gold", correspondences: ["prosperity", "courage", "wishes"], hex: "#d4af37", description: "Channels solar vitality, regal abundance, and rapid success." },
    { color: "Green", correspondences: ["prosperity", "healing"], hex: "#2e5a36", description: "Anchors earthly abundance, physical recovery, and steady financial growth." },
    { color: "White", correspondences: ["purification", "peace_sleep", "clarity"], hex: "#e8e2cf", description: "Universal sealing color for peace, spiritual alignment, and purity." },
    { color: "Purple", correspondences: ["psychic_intuition", "wisdom"], hex: "#4a2a68", description: "Deepens divination, astral perception, and spiritual authority." },
    { color: "Blue", correspondences: ["peace_sleep", "healing", "calm"], hex: "#2b4c6f", description: "Soothes internal turbulence, invites restful sleep, and speeds recovery." }
  ]
};
