/* Elder Futhark Rune Casting: original app logic, isolated from the site namespace. */
(() => {
// Complete 24 Elder Futhark Runes Dataset
    const ELDER_FUTHARK = [
      {
        id: 1,
        symbol: "ᚠ",
        name: "Fehu",
        phonetic: "F",
        literal: "Cattle / Mobile Wealth",
        aett: "Freyja's Aett",
        element: "Fire & Earth",
        deity: "Freyr & Freyja",
        reversible: true,
        keywordsUpright: ["Abundance", "Earned Nourishment", "Creative Fire", "Generosity"],
        keywordsReversed: ["Stagnation", "Depleted Resources", "Clinging", "Burnout"],
        upright: "Fehu channels dynamic, circulating abundance and the tangible fruits of dedicated craft. It signals a fertile season where your energy, skill, and stewardship bring material and spiritual nourishment—reminding you that true wealth grows when shared and kept in motion.",
        reversed: "In Merkstave, Fehu cautions against scattering your vital force or Measuring worth solely through anxious accumulation. Pause to see where energy is leaking, tend to your foundational resources, and release attachment to outcomes that have already run their course.",
        whisper: "Tend the hearth fire; what you nourish with steady hands returns tenfold."
      },
      {
        id: 2,
        symbol: "ᚢ",
        name: "Uruz",
        phonetic: "U",
        literal: "Aurochs (Wild Ox) / Primal Strength",
        aett: "Freyja's Aett",
        element: "Earth",
        deity: "Thor & Jord",
        reversible: true,
        keywordsUpright: ["Vitality", "Untamed Endurance", "Resilience", "Shaping Power"],
        keywordsReversed: ["Hesitation", "Misdirected Force", "Fatigue", "Resistance"],
        upright: "Uruz embodies raw, grounded life force and unwavering stamina. Like the ancient wild ox of the northern forests, you carry the constitutional strength to weather heavy burdens, forge new form out of raw potential, and stand rooted in your authentic power.",
        reversed: "Reversed, Uruz suggests either holding back your own natural strength out of self-doubt or pushing stubbornly against a door that requires finesse rather than force. Honour your body's need for restoration before charging ahead.",
        whisper: "Your roots run deeper than the frost; trust the quiet power in your bones."
      },
      {
        id: 3,
        symbol: "ᚦ",
        name: "Thurisaz",
        phonetic: "TH",
        literal: "Thorn / Giant's Might",
        aett: "Freyja's Aett",
        element: "Fire",
        deity: "Thor",
        reversible: true,
        keywordsUpright: ["Protective Boundary", "Catalyst", "Focused Breakthrough", "Discernment"],
        keywordsReversed: ["Impulsiveness", "Defensiveness", "Unchecked Friction", "Haste"],
        upright: "Thurisaz is the sacred thorn upon the rose and the lightning strike that clears stagnant air. It calls for sharp boundaries, deliberate pause before crossing a threshold, and decisive protection of your sacred space and creative work.",
        reversed: "In Merkstave, Thurisaz warns against reactive temperament or charging forward while guards are raised in anger. Step back from the bramble rather than forcing your way through; let clarity replace urgency.",
        whisper: "Stand at the gate and look both ways; a strong boundary protects the garden within."
      },
      {
        id: 4,
        symbol: "ᚨ",
        name: "Ansuz",
        phonetic: "A",
        literal: "Ancestral God (Odin) / Sacred Breath",
        aett: "Freyja's Aett",
        element: "Air",
        deity: "Odin & Bragi",
        reversible: true,
        keywordsUpright: ["Inspired Voice", "Wisdom", "Clear Signs", "Poetic Craft"],
        keywordsReversed: ["Miscommunication", "Noise", "Blocked Expression", "Doubt"],
        upright: "Ansuz is the wind whispering through ancient ash branches—the rune of song, eloquent truth, and inspired counsel. Listen closely to synchronicities, mentors, and your own inner voice; speak and create with honesty and reverence.",
        reversed: "Merkstave Ansuz points to crossed signals, overthinking, or withholding your truth out of fear of being misunderstood. Clear away mental clutter and verify assumptions before taking someone's words at face value.",
        whisper: "Listen beneath the noise; the wisest counsel arrives on a quiet breath."
      },
      {
        id: 5,
        symbol: "ᚱ",
        name: "Raidho",
        phonetic: "R",
        literal: "Wagon / Rhythmic Journey",
        aett: "Freyja's Aett",
        element: "Air & Fire",
        deity: "Forseti & Nerthus",
        reversible: true,
        keywordsUpright: ["Right Action", "Momentum", "Aligned Travel", "Natural Rhythm"],
        keywordsReversed: ["Detour", "Impatience", "Disrupted Cadence", "Restlessness"],
        upright: "Raidho governs the turning wheel and the road that rises to meet purposeful steps. Whether an outer journey or an inner transition, your path gains momentum when you move in harmony with natural timing rather than fighting the terrain.",
        reversed: "Reversed, Raidho indicates an unexpected detour, delay, or feeling out of step with your schedule. Treat the pause as protection rather than punishment—check the wheels and realign your compass.",
        whisper: "Every mile of the road has its own rhythm; honour the pace of the wheel."
      },
      {
        id: 6,
        symbol: "ᚲ",
        name: "Kenaz",
        phonetic: "K",
        literal: "Torch / Artisan's Flame",
        aett: "Freyja's Aett",
        element: "Fire",
        deity: "Heimdall & Freyja",
        reversible: true,
        keywordsUpright: ["Illumination", "Craftsmanship", "Creative Spark", "Clarity"],
        keywordsReversed: ["Dimmed Vision", "Creative Block", "False Leads", "Overexposure"],
        upright: "Kenaz is the controlled torchlight of the master artisan and forge-worker. It brings warm illumination to hidden corners, ignites creative breakthroughs, and empowers you to transform raw materials into enduring beauty.",
        reversed: "In Merkstave, Kenaz suggests a flickering lamp—feeling uninspired, working in the dark, or refusing to see a truth that has outgrown its shadow. Tend your inner ember gently until clear sight returns.",
        whisper: "A single carving torch lights the entire hall; bring your craft into the light."
      },
      {
        id: 7,
        symbol: "ᚷ",
        name: "Gebo",
        phonetic: "G",
        literal: "Gift / Sacred Exchange",
        aett: "Freyja's Aett",
        element: "Air",
        deity: "Odin & Gefjon",
        reversible: false,
        keywordsUpright: ["Reciprocity", "Sacred Partnership", "Generosity", "Equilibrium"],
        keywordsReversed: ["Over-giving", "Obligation", "Imbalanced Exchange"],
        upright: "Gebo—drawn as two intersecting staves—knows no reversal. It signifies a gift freely given and nobly received, uniting two forces while preserving each one's sovereignty. Partnerships, collaborations, and blessings flourish through mutual respect.",
        reversed: "Though Gebo never reverses, its shadow invites you to examine whether you are giving to exhaustion or accepting strings that compromise your independence. True reciprocity leaves both spirits freer.",
        whisper: "A gift offered from a full heart binds two paths in golden balance."
      },
      {
        id: 8,
        symbol: "ᚹ",
        name: "Wunjo",
        phonetic: "W / V",
        literal: "Joy / Harmonious Kinship",
        aett: "Freyja's Aett",
        element: "Earth & Water",
        deity: "Freyr",
        reversible: true,
        keywordsUpright: ["Fulfillment", "Belonging", "Shared Harmony", "Gratitude"],
        keywordsReversed: ["Discord", "Delayed Gratification", "Alienation", "perfectionism"],
        upright: "Wunjo is the banner raised in celebration after faithful labour. It brings a sense of alignment, warmth among kindred spirits, and deep appreciation for the craft and community you have cultivated.",
        reversed: "Reversed, Wunjo asks you not to force cheerfulness when something feels out of tune. Acknowledge unspoken friction gently, release unrealistic expectations, and reconnect with simple, grounded pleasures.",
        whisper: "Joy is not the absence of winter, but the warmth of the hall you have built."
      },
      {
        id: 9,
        symbol: "ᚺ",
        name: "Hagalaz",
        phonetic: "H",
        literal: "Hailstone / Sudden Awakening",
        aett: "Heimdall's Aett",
        element: "Ice & Air",
        deity: "Urd & Ymir",
        reversible: false,
        keywordsUpright: ["Radical Clearing", "Liberation", "Pattern Disruption", "Renewal"],
        keywordsReversed: ["Shock", "Temporary Turmoil", "Resisting Necessary Change"],
        upright: "Hagalaz is the crystalline hailstone that shatters brittle structures only to melt into life-giving water for the soil. Though sudden change may feel disruptive, it sweeps away outdated constraints and clears space for authentic growth.",
        reversed: "Symmetrical and unyielding, Hagalaz reminds you that weather beyond your control is not a personal failing. Let the storm pass without clinging to broken branches; the ground beneath will soon drink the rain.",
        whisper: "The hailstone melts into clear spring water; trust what remains after the storm."
      },
      {
        id: 10,
        symbol: "ᚾ",
        name: "Nauthiz",
        phonetic: "N",
        literal: "Need-Fire / Sacred Necessity",
        aett: "Heimdall's Aett",
        element: "Fire",
        deity: "Skuld",
        reversible: false,
        keywordsUpright: ["Self-Reliance", "Forged Resilience", "Essential Focus", "Patience"],
        keywordsReversed: ["Scarcity Mindset", "Impatience", "Unnecessary Worry"],
        upright: "Nauthiz is the friction of two sticks rubbed together in the dark to kindle the need-fire. Constraint and necessity become your greatest teachers right now—stripping away distractions so you discover just how resourceful and self-sufficient you truly are.",
        reversed: "Because Nauthiz cannot be inverted, its caution lies in distinguishing real needs from restless cravings. Slow down, simplify your commitments, and let friction polish your resolve.",
        whisper: "From honest friction springs the brightest ember; let necessity sharpen your focus."
      },
      {
        id: 11,
        symbol: "ᛁ",
        name: "Isa",
        phonetic: "I",
        literal: "Ice / Stillness & Concentration",
        aett: "Heimdall's Aett",
        element: "Ice",
        deity: "Verdandi & Rindr",
        reversible: false,
        keywordsUpright: ["Sacred Stillness", "Crystallization", "Preservation", "Calm Focus"],
        keywordsReversed: ["Emotional Frost", "Rigidity", "Waiting Out Thin Ice"],
        upright: "Isa is the mirror-bright glacier—pure, quiet, and unhurried. When action seems stalled, Isa counsels deliberate stillness rather than frantic pushing. Use this crystalline pause to consolidate your intentions, rest deeply, and observe with cool clarity.",
        reversed: "Symmetrical as an icicle, Isa warns against mistaking winter dormancy for permanent loss—or letting healthy boundaries harden into isolation. Wait until the thaw is firm before stepping onto the river.",
        whisper: "Beneath the silent ice, the deep river gathers its strength for spring."
      },
      {
        id: 12,
        symbol: "ᛃ",
        name: "Jera",
        phonetic: "J / Y",
        literal: "Harvest Year / Fruitful Cycle",
        aett: "Heimdall's Aett",
        element: "Earth",
        deity: "Freyr & Sif",
        reversible: false,
        keywordsUpright: ["Earned Harvest", "Divine Timing", "Patience Rewarded", "Natural Cycles"],
        keywordsReversed: ["Rushing the Season", "Skipping Steps", "Unripe Effort"],
        upright: "Jera is the turning of the four seasons and the golden sheaves gathered at autumn's peak. Every seed you have tended with patience and integrity is ripening on schedule. Trust the natural cadence of cause and effect.",
        reversed: "Never reversed, Jera gently reminds the impatient heart that no farmer pulls on the sprout to make it grow faster. Keep tending the soil faithfully; your harvest arrives in its appointed season.",
        whisper: "What was planted in devotion ripens in its true season—neither early nor late."
      },
      {
        id: 13,
        symbol: "ᛇ",
        name: "Eihwaz",
        phonetic: "EI",
        literal: "Yew Tree / World Axis",
        aett: "Heimdall's Aett",
        element: "Earth, Air, Fire & Water",
        deity: "Ullr & Odin",
        reversible: false,
        keywordsUpright: ["Endurance", "Deep Transformation", "Spine of Integrity", "Protection"],
        keywordsReversed: ["Fear of Depth", "Lingering in the Past", "Inflexibility"],
        upright: "Eihwaz is the evergreen Yew—flexible enough to bend like a bow yet enduring for a thousand years, bridging root and crown. You are supported through a profound transition; trust your deepest instincts and stand steady between worlds.",
        reversed: "Unchanged when turned, Eihwaz asks you to release old ghosts that no longer serve your evolution. Bend without breaking, and let deep roots anchor your highest vision.",
        whisper: "Like the ancient yew, bend with the gale and let your roots drink from the well."
      },
      {
        id: 14,
        symbol: "ᛈ",
        name: "Perthro",
        phonetic: "P",
        literal: "Dice Cup / Well of Wyrd",
        aett: "Heimdall's Aett",
        element: "Water",
        deity: "Frigg & The Norns",
        reversible: true,
        keywordsUpright: ["Mystery Revealed", "Intuition", "Synchronicity", "Sovereign Choice"],
        keywordsReversed: ["Hidden Agendas", "Superstition", "Forcing Secrets", "Avoidance"],
        upright: "Perthro is the rune pouch itself and the deep waters of Urd's Well. Something previously hidden is coming into view. While fate deals the stones, your agency decides how they are played—trust your intuition and embrace life's sacred mystery.",
        reversed: "In Merkstave, Perthro advises against peering anxiously into the fog or relying on chance where grounded action is required. Keep your counsel private until the pieces on the board are clear.",
        whisper: "The Norns weave the threads, yet your hand holds the shuttle."
      },
      {
        id: 15,
        symbol: "ᛉ",
        name: "Algiz",
        phonetic: "Z / -R",
        literal: "Elk Sedge / Sanctuary Shield",
        aett: "Heimdall's Aett",
        element: "Air",
        deity: "Heimdall & The Valkyries",
        reversible: true,
        keywordsUpright: ["Sacred Protection", "Higher Instinct", "Sanctuary", "Awakened Vigilance"],
        keywordsReversed: ["Lowered Guard", "Porous Boundaries", "Ignoring Gut Instinct"],
        upright: "Algiz rises like the antlers of the great elk and the sharp marsh reed that guards the shore. You are surrounded by strong spiritual protection and heightened intuition. Stay connected to your guiding principles and honour your instinctual awareness.",
        reversed: "Reversed, Algiz signals that your energetic boundaries may be stretched thin by taking on responsibilities that are not yours to carry. Step back into your sanctuary and restore your shield.",
        whisper: "Raise your branches toward the light; your intuition is a watchman that never sleeps."
      },
      {
        id: 16,
        symbol: "ᛊ",
        name: "Sowilo",
        phonetic: "S",
        literal: "Sun Wheel / Guiding Radiance",
        aett: "Heimdall's Aett",
        element: "Fire & Air",
        deity: "Sol & Baldr",
        reversible: false,
        keywordsUpright: ["Vitality", "Triumph", "Wholeness", "Unmistakable Clarity"],
        keywordsReversed: ["Overexertion", "Vanity", "Chasing Glamour Over Substance"],
        upright: "Sowilo is the unconquered northern sun returning after the long dark. It floods your path with warmth, vitality, and unmistakable direction. Step forward with confidence—your authentic radiance naturally dissolves doubt and illuminates the way.",
        reversed: "Possessing no reversal, Sowilo's shadow simply reminds you that even the midsummer sun must set so the earth can cool. Shine generously without burning through your reserves.",
        whisper: "The sun asks no permission to rise; let your true work speak in full daylight."
      },
      {
        id: 17,
        symbol: "ᛏ",
        name: "Tiwaz",
        phonetic: "T",
        literal: "Tyr's Star / Steadfast Honour",
        aett: "Tyr's Aett",
        element: "Air",
        deity: "Tyr",
        reversible: true,
        keywordsUpright: ["Integrity", "Courageous Resolve", "True North", "Fair Victory"],
        keywordsReversed: ["Wavering Purpose", "Misplaced Sacrifice", "Imbalance", "Self-Doubt"],
        upright: "Tiwaz is the Pole Star by which night mariners steer—the rune of unwavering integrity, disciplined focus, and honourable action. Align your decisions with your highest ethics, and be willing to release lesser distractions for what truly matters.",
        reversed: "In Merkstave, Tiwaz asks whether you are fighting a battle that is no longer yours or sacrificing your well-being where it isn't respected. Recalibrate your compass to your true north.",
        whisper: "Steer by the North Star; integrity is the victory that cannot be taken."
      },
      {
        id: 18,
        symbol: "ᛒ",
        name: "Berkano",
        phonetic: "B",
        literal: "Birch Goddess / New Budding",
        aett: "Tyr's Aett",
        element: "Earth & Water",
        deity: "Frigg & Nerthus",
        reversible: true,
        keywordsUpright: ["Gentle Renewal", "Fertile Creation", "Nurturing", "Sanctuary Growth"],
        keywordsReversed: ["Stifled Growth", "Over-caretaking", "Neglecting Self-Care", "Haste"],
        upright: "Berkano is the silver birch—the first tree to unfurl green leaves after winter snow. It blesses new beginnings, handmade creations, and tender ideas that flourish through gentle, consistent care rather than harsh exposure.",
        reversed: "Reversed, Berkano suggests that a fledgling project or personal need requires quieter shelter before being shown to the world—or that you have been tending everyone else's garden while neglecting your own.",
        whisper: "Shelter the young sprout from the wind; gentle hands bring the tallest grove."
      },
      {
        id: 19,
        symbol: "ᛖ",
        name: "Ehwaz",
        phonetic: "E",
        literal: "Twin Horses / Trusted Partnership",
        aett: "Tyr's Aett",
        element: "Earth & Air",
        deity: "Freyr, Freyja & Sleipnir",
        reversible: true,
        keywordsUpright: ["Loyal Synergy", "Harmonious Progress", "Trust", "Fluid Transition"],
        keywordsReversed: ["Mismatched Pace", "Restlessness", "Lack of Trust", "Pulling Apart"],
        upright: "Ehwaz represents horse and rider—or two matched steeds—moving as one mind across great distances. Progress comes swiftly now through trusted partnership, mutual loyalty, and harmonizing your intuition with practical action.",
        reversed: "In Merkstave, Ehwaz highlights a partnership or workflow where two sides are pulling at different speeds. Pause to communicate openly rather than tugging harder on the reins.",
        whisper: "When trust holds the reins, two strengths travel twice as far with half the strain."
      },
      {
        id: 20,
        symbol: "ᛗ",
        name: "Mannaz",
        phonetic: "M",
        literal: "Humanity / Mind & Mirror",
        aett: "Tyr's Aett",
        element: "Air",
        deity: "Heimdall & Odin",
        reversible: true,
        keywordsUpright: ["Self-Awareness", "Shared Wisdom", "Clear Intellect", "Community"],
        keywordsReversed: ["Self-Criticism", "Isolation", "Projection", "Groupthink"],
        upright: "Mannaz reflects the sovereign human spirit standing within the wider web of community. It calls for honest self-reflection, integrating memory and intuition, and recognizing how your gifts uplift those around you.",
        reversed: "Reversed, Mannaz asks you to soften harsh inner judgment and notice where you may be projecting your own doubts onto others. Seek clarity within before looking for external approval.",
        whisper: "Know your own heart first, and every relationship becomes a clear mirror."
      },
      {
        id: 21,
        symbol: "ᛚ",
        name: "Laguz",
        phonetic: "L",
        literal: "Water / Deep Tidal Flow",
        aett: "Tyr's Aett",
        element: "Water",
        deity: "Njord & Nerthus",
        reversible: true,
        keywordsUpright: ["Intuitive Flow", "Emotional Depth", "Adaptability", "Dream Wisdom"],
        keywordsReversed: ["Overwhelm", "Swimming Upstream", "Emotional Avoidance"],
        upright: "Laguz is the deep ocean current and the mountain stream that effortlessly finds its way around stone. Trust your emotional intelligence, creative imagination, and subtle intuition to guide you where rigid logic cannot reach.",
        reversed: "In Merkstave, Laguz cautions against fighting the tide or letting unexpressed emotions pool into stagnation. Step onto solid ground, breathe, and let the waters settle until they run clear.",
        whisper: "Water yields to every stone on the hillside, yet carves the canyon over time."
      },
      {
        id: 22,
        symbol: "ᛜ",
        name: "Ingwaz",
        phonetic: "NG",
        literal: "Seed of Ing / Gestation & Peace",
        aett: "Tyr's Aett",
        element: "Earth & Water",
        deity: "Ing (Freyr)",
        reversible: false,
        keywordsUpright: ["Focused Gestation", "Inner Wholeness", "Grounded Potential", "Milestone"],
        keywordsReversed: ["Restless Anticipation", "Scattering Unfinished Energy"],
        upright: "Ingwaz is the diamond-shaped seed resting safely in dark, warm soil. It marks a sacred period of quiet incubation, inner peace, and gathering strength before a major new chapter bursts into bloom. Protect your focus.",
        reversed: "Symmetrical in every direction, Ingwaz reminds you to complete one chapter cleanly before scattering your energy into ten new directions. Everything needed for the bloom is already inside the seed.",
        whisper: "In the quiet dark of the soil, the seed gathers all it needs to bloom."
      },
      {
        id: 23,
        symbol: "ᛞ",
        name: "Dagaz",
        phonetic: "D",
        literal: "Daybreak / Awakening Threshold",
        aett: "Tyr's Aett",
        element: "Fire & Air",
        deity: "Heimdall & Dagr",
        reversible: false,
        keywordsUpright: ["Breakthrough", "Dawn after Dusk", "Synthesis of Opposites", "Clarity"],
        keywordsReversed: ["Blinding Haste", "Ignoring the Liminal Moment"],
        upright: "Dagaz is the infinity-like threshold where twilight turns into golden daybreak. It heralds a sudden shift in perspective, an awakening of hope, and the harmonious union of seemingly opposite forces in your life.",
        reversed: "Holding no reversal, Dagaz invites you to stay awake at the threshold of change—welcoming the new dawn with gratitude while honouring the wisdom earned in the night.",
        whisper: "Between one breath and the next, the long night yields to golden dawn."
      },
      {
        id: 24,
        symbol: "ᛟ",
        name: "Othala",
        phonetic: "O",
        literal: "Ancestral Homestead / Sacred Sanctuary",
        aett: "Tyr's Aett",
        element: "Earth",
        deity: "Odin & Frigg",
        reversible: true,
        keywordsUpright: ["Sanctuary", "Enduring Legacy", "Rooted Sovereignty", "True Home"],
        keywordsReversed: ["Outgrowing Old Walls", "Clinging to Convention", "Disorder"],
        upright: "Othala—the emblem of your sanctuary—represents the sacred enclosure, enduring heritage, and the sovereign space you build with your own hands. Claim your hard-earned wisdom, honour your roots, and cultivate a home and craft that stand the test of time.",
        reversed: "In Merkstave, Othala encourages you to release inherited beliefs or rigid routines that have become too small for your spirit. Keep the foundational timber that serves you, and open the windows to fresh air.",
        whisper: "Honour the foundation beneath your feet, and build a sanctuary worthy of your spirit."
      }
    ];

    // Spread Definitions
    const SPREAD_CONFIGS = {
      1: {
        name: "Odin's Token (1-Rune Spread)",
        subtitle: "Single-stone clarity & daily focus",
        positions: [
          {
            index: 1,
            title: "I. The Present Thread",
            role: "Core Focus & Immediate Counsel",
            promptContext: "As the singular voice of your cast, this stone anchors your immediate center of gravity."
          }
        ]
      },
      3: {
        name: "The Norns' Thread (3-Rune Spread)",
        subtitle: "Urd (Past) · Verdandi (Present) · Skuld (Emerging Path)",
        positions: [
          {
            index: 1,
            title: "I. Urd — What Was",
            role: "Root Foundation & Past Momentum",
            promptContext: "Rising from Urd's Well, this stone reveals the foundational roots and past currents shaping your path."
          },
          {
            index: 2,
            title: "II. Verdandi — What Is",
            role: "Present Crossroads & Active Energy",
            promptContext: "At the center of the loom, Verdandi illuminates your immediate threshold and the choice in your hands."
          },
          {
            index: 3,
            title: "III. Skuld — What Shall Be",
            role: "Emerging Horizon & Guiding Trajectory",
            promptContext: "Looking toward the horizon, Skuld points to the unfolding outcome if you walk with awareness."
          }
        ]
      },
      5: {
        name: "Cross of the Elements (5-Rune Spread)",
        subtitle: "West (Past) · Center (Heart) · North (Guidance) · South (Challenge) · East (Destiny)",
        positions: [
          {
            index: 1,
            title: "I. West — The Root",
            role: "Origin & Underlying Influence",
            promptContext: "In the Western quarter, this rune anchors the unspoken origin of your current inquiry."
          },
          {
            index: 2,
            title: "II. Center — The Nexus",
            role: "Heart of the Matter",
            promptContext: "Resting at the center of the altar cloth, this stone holds the core pulse of your situation."
          },
          {
            index: 3,
            title: "III. North — The Crown",
            role: "Higher Guidance & Unseen Ally",
            promptContext: "Above the cross, the Northern stone reveals the higher perspective and spiritual ally guiding you."
          },
          {
            index: 4,
            title: "IV. South — The Forge",
            role: "Earthly Challenge & Needed Discipline",
            promptContext: "Beneath the center, the Southern stone names the practical friction that tempers your resolve."
          },
          {
            index: 5,
            title: "V. East — The Dawn",
            role: "Emerging Destiny & Resolution",
            promptContext: "At the Eastern gate of daybreak, this rune illuminates the synthesis and path forward."
          }
        ]
      }
    };

    // Application State
    const state = {
      activeTab: 'altar',
      spreadSize: 1,
      allowReversed: true,
      manualFlip: false,
      intention: '',
      shakeCount: 0,
      isShaking: false,
      hasCast: false,
      drawnRunes: [], // [{ rune, isReversed, revealed, position }]
      soundEnabled: true,
      journal: []
    };

    // Web Audio API Sound Synthesizer (No external audio files required)
    let audioCtx = null;
    function getAudioCtx() {
      if (!state.soundEnabled) return null;
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Wooden rune clack / rattle sound during bag shake
    function playWoodClackSound() {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const offset = i * 0.065 + Math.random() * 0.025;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const baseFreq = 260 + Math.random() * 190;
        osc.frequency.setValueAtTime(baseFreq, now + offset);
        osc.frequency.exponentialRampToValueAtTime(75, now + offset + 0.055);

        gain.gain.setValueAtTime(0.16, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.065);
      }
    }

    // Resonant chime + wood thud when runes fall onto the altar
    function playRuneCastSound(count) {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [293.66, 369.99, 440.00, 554.37, 659.25]; // D major pentatonic mystical chord
      for (let i = 0; i < count; i++) {
        const start = now + i * 0.14;
        // Soft wood landing thud
        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = 'sine';
        thudOsc.frequency.setValueAtTime(140, start);
        thudOsc.frequency.exponentialRampToValueAtTime(45, start + 0.09);
        thudGain.gain.setValueAtTime(0.22, start);
        thudGain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);
        thudOsc.connect(thudGain);
        thudGain.connect(ctx.destination);
        thudOsc.start(start);
        thudOsc.stop(start + 0.11);

        // Golden harmonic overtone
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(notes[i % notes.length], start + 0.02);
        chimeGain.gain.setValueAtTime(0.09, start + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0008, start + 0.85);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(start + 0.02);
        chimeOsc.stop(start + 0.9);
      }
    }

    // Soft flip chime
    function playFlipSound() {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    // Safe localStorage helpers for Journal
    function loadJournalFromStorage() {
      try {
        const raw = localStorage.getItem('gilded_sigil_rune_journal_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            state.journal = parsed;
          }
        }
      } catch (e) {
        state.journal = [];
      }
      updateJournalBadge();
    }

    function saveJournalToStorage() {
      try {
        localStorage.setItem('gilded_sigil_rune_journal_v1', JSON.stringify(state.journal));
      } catch (e) {
        // Ignore storage errors in restricted iframes
      }
      updateJournalBadge();
    }

    function updateJournalBadge() {
      const badge = document.getElementById('journalCountBadge');
      if (badge) badge.textContent = String(state.journal.length);
    }

    function showToast(message) {
      const toast = document.getElementById('toastBanner');
      const text = document.getElementById('toastText');
      if (!toast || !text) return;
      text.textContent = message;
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 2800);
    }

    // ==================== ALTAR PARTICLE SYSTEM ====================
    const particles = [];
    let canvasEl, canvasCtx;

    function initAltarCanvas() {
      canvasEl = document.getElementById('altarCanvas');
      if (!canvasEl) return;
      canvasCtx = canvasEl.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      for (let i = 0; i < 32; i++) {
        particles.push(createParticle(false));
      }
      requestAnimationFrame(animateParticles);
    }

    function resizeCanvas() {
      if (!canvasEl || !canvasEl.parentElement) return;
      canvasEl.width = canvasEl.parentElement.clientWidth;
      canvasEl.height = canvasEl.parentElement.clientHeight;
    }

    function createParticle(burst = false) {
      const w = canvasEl ? canvasEl.width : 600;
      const h = canvasEl ? canvasEl.height : 420;
      if (burst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.4;
        return {
          x: w / 2 + (Math.random() - 0.5) * 40,
          y: h / 2 + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          radius: 1.5 + Math.random() * 2.5,
          alpha: 0.9,
          decay: 0.012 + Math.random() * 0.015,
          burst: true
        };
      }
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        radius: 0.8 + Math.random() * 1.8,
        alpha: 0.15 + Math.random() * 0.45,
        decay: 0,
        burst: false
      };
    }

    function spawnBurstParticles(count = 24) {
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    }

    function animateParticles() {
      if (canvasCtx && canvasEl) {
        canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.burst) {
            p.alpha -= p.decay;
            if (p.alpha <= 0) {
              particles.splice(i, 1);
              continue;
            }
          } else {
            if (p.y < -10) p.y = canvasEl.height + 10;
            if (p.x < -10) p.x = canvasEl.width + 10;
            if (p.x > canvasEl.width + 10) p.x = -10;
          }
          canvasCtx.beginPath();
          canvasCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          canvasCtx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, p.alpha)})`;
          canvasCtx.fill();
        }
      }
      requestAnimationFrame(animateParticles);
    }

    // ==================== SHAKING & CASTING MECHANICS ====================
    function updateShakeUIState() {
      const maxShakes = state.spreadSize;
      const progressEl = document.getElementById('shakeProgressBar');
      const countText = document.getElementById('shakeCountText');
      const statusText = document.getElementById('shakeStatusText');
      const shakeBtn = document.getElementById('shakeBagBtn');
      const bagEl = document.getElementById('runeBagInteractive');

      const pct = Math.min(100, Math.round((state.shakeCount / maxShakes) * 100));
      if (progressEl) progressEl.style.width = `${pct}%`;
      if (countText) {
        countText.textContent = `${state.shakeCount} / ${maxShakes} ${maxShakes === 1 ? 'shake' : 'shakes'}`;
      }

      const isCapped = state.shakeCount >= maxShakes;
      if (shakeBtn) {
        shakeBtn.disabled = isCapped;
        if (isCapped) {
          shakeBtn.classList.add('opacity-50', 'cursor-not-allowed');
          shakeBtn.classList.remove('hover:bg-gilded/20', 'hover:border-gilded', 'active:scale-95');
        } else {
          shakeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
          shakeBtn.classList.add('hover:bg-gilded/20', 'hover:border-gilded', 'active:scale-95');
        }
      }

      if (bagEl) {
        bagEl.setAttribute('aria-disabled', isCapped ? 'true' : 'false');
      }

      if (statusText) {
        if (state.shakeCount === 0) {
          statusText.textContent = `Shake the bag ${maxShakes} ${maxShakes === 1 ? 'time' : 'times'} to attune your ${maxShakes}-rune spread`;
        } else if (isCapped) {
          statusText.textContent = `Bag fully attuned (${maxShakes}/${maxShakes}) — ready to cast your ${maxShakes === 1 ? 'rune' : 'runes'}!`;
        } else {
          const remaining = maxShakes - state.shakeCount;
          statusText.textContent = `Stones clattering... ${remaining} more ${remaining === 1 ? 'shake' : 'shakes'} remaining`;
        }
      }
    }

    function triggerBagShake() {
      const maxShakes = state.spreadSize;
      if (state.shakeCount >= maxShakes) {
        showToast(`Maximum of ${maxShakes} ${maxShakes === 1 ? 'shake' : 'shakes'} reached for the ${maxShakes}-rune spread. Ready to cast!`);
        return;
      }

      const bagEl = document.getElementById('runeBagInteractive');
      const auraEl = document.getElementById('bagAura');

      state.shakeCount += 1;
      playWoodClackSound();
      spawnBurstParticles(14);

      if (bagEl) {
        bagEl.classList.remove('bag-idle');
        bagEl.classList.add('bag-shaking');
        clearTimeout(window.__shakeStopTimer);
        window.__shakeStopTimer = setTimeout(() => {
          bagEl.classList.remove('bag-shaking');
          bagEl.classList.add('bag-idle');
        }, 420);
      }

      if (auraEl) {
        auraEl.classList.add('scale-125', 'bg-gilded/40');
        setTimeout(() => auraEl.classList.remove('scale-125', 'bg-gilded/40'), 380);
      }

      updateShakeUIState();
    }

    function castRunesFromBag() {
      state.intention = (document.getElementById('intentionInput')?.value || '').trim();
      state.allowReversed = Boolean(document.getElementById('allowReversedToggle')?.checked);
      state.manualFlip = Boolean(document.getElementById('manualFlipToggle')?.checked);

      // Shuffle a copy of the 24 Elder Futhark runes using Fisher-Yates
      const pool = [...ELDER_FUTHARK];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      const config = SPREAD_CONFIGS[state.spreadSize];
      const selected = pool.slice(0, state.spreadSize).map((rune, idx) => {
        const isReversed = state.allowReversed && rune.reversible ? Math.random() < 0.38 : false;
        return {
          rune,
          isReversed,
          revealed: !state.manualFlip,
          position: config.positions[idx]
        };
      });

      state.drawnRunes = selected;
      state.hasCast = true;

      spawnBurstParticles(40);
      playRuneCastSound(state.spreadSize);

      // Transition UI from Bag Stage to Spread Stage
      document.getElementById('bagStage')?.classList.add('hidden');
      const spreadStage = document.getElementById('spreadStage');
      if (spreadStage) {
        spreadStage.classList.remove('hidden');
        spreadStage.classList.add('flex');
      }

      renderCastSpread();
      renderReadingPanel();
    }

    function resetToBagStage() {
      state.hasCast = false;
      state.shakeCount = 0;
      state.drawnRunes = [];

      updateShakeUIState();

      document.getElementById('spreadStage')?.classList.add('hidden');
      document.getElementById('spreadStage')?.classList.remove('flex');
      document.getElementById('readingResultPanel')?.classList.add('hidden');
      document.getElementById('bagStage')?.classList.remove('hidden');
    }

    // ==================== RENDER CAST RUNES ON ALTAR CLOTH ====================
    function renderCastSpread() {
      const config = SPREAD_CONFIGS[state.spreadSize];
      const titleEl = document.getElementById('activeSpreadTitle');
      const intentionEl = document.getElementById('activeIntentionDisplay');
      const revealAllBtn = document.getElementById('revealAllBtn');
      const container = document.getElementById('castStonesContainer');

      if (titleEl) titleEl.textContent = config.name;
      if (intentionEl) {
        intentionEl.textContent = state.intention
          ? `Intention: "${state.intention}"`
          : 'Intention: Open Oracle Guidance';
      }

      const anyHidden = state.drawnRunes.some(item => !item.revealed);
      if (revealAllBtn) {
        if (anyHidden) {
          revealAllBtn.classList.remove('hidden');
        } else {
          revealAllBtn.classList.add('hidden');
        }
      }

      if (!container) return;
      container.innerHTML = '';

      if (state.spreadSize === 1) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex justify-center py-4';
        wrapper.appendChild(createRuneStoneElement(state.drawnRunes[0], 0));
        container.appendChild(wrapper);
      } else if (state.spreadSize === 3) {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 w-full max-w-3xl place-items-center py-2';
        state.drawnRunes.forEach((item, idx) => {
          grid.appendChild(createRuneStoneElement(item, idx));
        });
        container.appendChild(grid);
      } else if (state.spreadSize === 5) {
        // 5-Rune Cross Layout:
        // Desktop/Tablet 3x3 cross grid; Mobile responsive stack/grid
        const crossLayout = document.createElement('div');
        crossLayout.className = 'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full max-w-4xl place-items-center py-1';

        // Order for 3-column cross on sm+:
        // Top row: [ empty, Pos 3 (North/Index 2), empty ]
        // Mid row: [ Pos 1 (West/Index 0), Pos 2 (Center/Index 1), Pos 5 (East/Index 4) ]
        // Bot row: [ empty, Pos 4 (South/Index 3), empty ]
        const slots = [
          { empty: true },
          { item: state.drawnRunes[2], idx: 2 },
          { empty: true },
          { item: state.drawnRunes[0], idx: 0 },
          { item: state.drawnRunes[1], idx: 1 },
          { item: state.drawnRunes[4], idx: 4 },
          { empty: true },
          { item: state.drawnRunes[3], idx: 3 },
          { empty: true }
        ];

        slots.forEach(slot => {
          if (slot.empty) {
            const spacer = document.createElement('div');
            spacer.className = 'hidden sm:block';
            crossLayout.appendChild(spacer);
          } else {
            crossLayout.appendChild(createRuneStoneElement(slot.item, slot.idx));
          }
        });
        container.appendChild(crossLayout);
      }
    }

    function createRuneStoneElement(item, idx) {
      const { rune, isReversed, revealed, position } = item;
      const card = document.createElement('div');
      card.className = 'rune-drop-anim flex flex-col items-center text-center group cursor-pointer select-none w-44 sm:w-48';
      card.style.animationDelay = `${idx * 130}ms`;

      const orientationBadge = isReversed
        ? `<span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-900/60 border border-amber-400/40 text-amber-200">Merkstave (Reversed)</span>`
        : `<span class="px-2 py-0.5 rounded-full text-[10px] bg-gilded/15 border border-gilded/40 text-gilded-light">${rune.reversible ? 'Upright' : 'Sacred Axis'}</span>`;

      card.innerHTML = `
        <div class="text-[11px] font-display uppercase tracking-wider text-gilded mb-1.5">${position.title}</div>
        <div class="perspective-1000 w-28 h-36 sm:w-32 sm:h-40">
          <div class="transform-style-3d relative w-full h-full ${revealed ? '' : 'rotate-y-180'}">
            <!-- Front Face (Carved Rune Revealed) -->
            <div class="backface-hidden absolute inset-0 rounded-2xl wood-tile flex flex-col items-center justify-between p-3 transition-transform group-hover:-translate-y-1">
              <div class="w-full flex items-center justify-between text-[10px] text-gilded/70 font-mono">
                <span>#${rune.id}</span>
                <span>${rune.phonetic}</span>
              </div>
              <div class="text-5xl sm:text-6xl rune-carving select-none transition-transform ${isReversed ? 'rotate-180' : ''}">
                ${rune.symbol}
              </div>
              <div class="font-display text-xs font-bold tracking-wider text-parchment">
                ${rune.name}
              </div>
            </div>

            <!-- Back Face (Unrevealed Carved Sigil Back) -->
            <div class="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl wood-tile flex flex-col items-center justify-center p-3 border-dashed border-gilded/50">
              <div class="w-16 h-16 rounded-full border border-gilded/40 flex items-center justify-center text-gilded/70 text-2xl">
                ✦
              </div>
              <span class="mt-2 text-[10px] font-display uppercase tracking-widest text-gilded-light/80">Tap to Reveal</span>
            </div>
          </div>
        </div>
        <div class="mt-2 min-h-[40px] flex flex-col items-center">
          ${revealed ? `
            ${orientationBadge}
            <span class="text-[11px] text-parchment/75 mt-1 font-serif italic">"${rune.literal}"</span>
          ` : `
            <span class="text-[11px] text-parchment/50 italic">Stone awaits your touch</span>
          `}
        </div>
      `;

      card.addEventListener('click', () => {
        if (!item.revealed) {
          item.revealed = true;
          playFlipSound();
          renderCastSpread();
          renderReadingPanel();
        } else {
          openRuneModal(rune);
        }
      });

      return card;
    }

    // ==================== RENDER READING & PERSONAL MESSAGE ====================
    function renderReadingPanel() {
      const panel = document.getElementById('readingResultPanel');
      const synthesisEl = document.getElementById('personalSynthesisText');
      const metaTagsEl = document.getElementById('readingMetaTags');
      const breakdownGrid = document.getElementById('stoneBreakdownGrid');

      if (!panel || !synthesisEl || !breakdownGrid) return;

      const allRevealed = state.drawnRunes.every(r => r.revealed);
      if (!allRevealed) {
        panel.classList.add('hidden');
        return;
      }

      panel.classList.remove('hidden');

      // Build cohesive Personal Oracle Message
      synthesisEl.innerHTML = generatePersonalSynthesisHTML();

      // Build Elemental & Aett summary tags
      if (metaTagsEl) {
        const aettCounts = {};
        const elements = new Set();
        state.drawnRunes.forEach(({ rune }) => {
          aettCounts[rune.aett] = (aettCounts[rune.aett] || 0) + 1;
          rune.element.split('&').forEach(el => elements.add(el.trim()));
        });

        let tagsHTML = `<span class="text-xs text-parchment/60 mr-1">Resonant Currents:</span>`;
        Object.entries(aettCounts).forEach(([aett, count]) => {
          tagsHTML += `<span class="px-2.5 py-1 rounded-full text-xs bg-obsidian/90 border border-gilded/30 text-gilded-light">${aett} (${count})</span>`;
        });
        Array.from(elements).forEach(el => {
          tagsHTML += `<span class="px-2.5 py-1 rounded-full text-xs bg-mahogany/80 border border-gilded/20 text-parchment/85">Element: ${el}</span>`;
        });
        metaTagsEl.innerHTML = tagsHTML;
      }

      // Build Stone-by-Stone Cards
      breakdownGrid.innerHTML = '';
      if (state.spreadSize === 1) {
        breakdownGrid.className = 'grid grid-cols-1 max-w-2xl mx-auto gap-4';
      } else if (state.spreadSize === 3) {
        breakdownGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-4';
      } else {
        breakdownGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      }

      state.drawnRunes.forEach(({ rune, isReversed, position }) => {
        const card = document.createElement('div');
        card.className = 'bg-walnut/85 border border-gilded/25 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-gilded/50 transition-all';
        const keywords = isReversed ? rune.keywordsReversed : rune.keywordsUpright;
        const meaningText = isReversed ? rune.reversed : rune.upright;

        card.innerHTML = `
          <div>
            <div class="flex items-start justify-between gap-3 border-b border-gilded/15 pb-3 mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg wood-tile flex items-center justify-center text-2xl rune-carving shrink-0 ${isReversed ? 'rotate-180' : ''}">
                  ${rune.symbol}
                </div>
                <div>
                  <span class="text-[11px] font-display uppercase tracking-wider text-gilded block">${position.title}</span>
                  <h4 class="font-display text-base font-bold text-parchment">${rune.name} <span class="text-xs font-normal text-parchment/60">(${rune.phonetic})</span></h4>
                  <span class="text-[11px] text-parchment/70 italic font-serif">${position.role}</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-medium ${isReversed ? 'bg-amber-900/50 text-amber-200 border border-amber-400/30' : 'bg-gilded/15 text-gilded-light border border-gilded/30'}">
                ${isReversed ? 'Merkstave' : 'Upright'}
              </span>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-3">
              ${keywords.map(kw => `<span class="text-[10px] px-2 py-0.5 rounded bg-obsidian/80 border border-gilded/20 text-gilded-light/90">${kw}</span>`).join('')}
            </div>

            <p class="text-xs text-parchment/65 italic mb-2">${position.promptContext}</p>
            <p class="text-xs sm:text-sm text-parchment/90 leading-relaxed">${meaningText}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-gilded/15 flex items-center justify-between">
            <span class="font-serif italic text-xs text-gilded-light/90">"${rune.whisper}"</span>
            <button type="button" class="inspect-lore-btn text-[11px] text-gilded hover:underline shrink-0 ml-2">Lore →</button>
          </div>
        `;

        card.querySelector('.inspect-lore-btn')?.addEventListener('click', () => openRuneModal(rune));
        breakdownGrid.appendChild(card);
      });
    }

    function generatePersonalSynthesisHTML() {
      const intentionLead = state.intention
        ? `<p class="text-gilded-light/95">Regarding your intention—<em>"${escapeHTML(state.intention)}"</em>—the carved stones have settled upon the cloth with a clear message:</p>`
        : `<p class="text-gilded-light/95">You approached the sacred cloth with an open spirit, and the Elder Futhark stones have aligned to offer this counsel:</p>`;

      if (state.spreadSize === 1) {
        const { rune, isReversed } = state.drawnRunes[0];
        const orientationPhrase = isReversed
          ? `arrives in <strong>Merkstave (Reversed)</strong> alignment, inviting gentle introspection around <em>${rune.keywordsReversed.slice(0, 2).join(' and ').toLowerCase()}</em>`
          : `stands <strong>Upright</strong> in full strength, illuminating <em>${rune.keywordsUpright.slice(0, 2).join(' and ').toLowerCase()}</em>`;

        return `
          ${intentionLead}
          <p>
            Single-stone casts cut straight to the marrow. <strong>${rune.name} (${rune.symbol})</strong>, the rune of <em>${rune.literal.toLowerCase()}</em> within ${rune.aett}, ${orientationPhrase}.
            ${isReversed ? rune.reversed : rune.upright}
          </p>
          <p class="text-gilded-light italic border-l-2 border-gilded pl-3">
            Guiding Whisper: "${rune.whisper}"
          </p>
        `;
      }

      if (state.spreadSize === 3) {
        const [past, present, future] = state.drawnRunes;
        const pKw = (past.isReversed ? past.rune.keywordsReversed[0] : past.rune.keywordsUpright[0]).toLowerCase();
        const cKw = (present.isReversed ? present.rune.keywordsReversed[0] : present.rune.keywordsUpright[0]).toLowerCase();
        const fKw = (future.isReversed ? future.rune.keywordsReversed[0] : future.rune.keywordsUpright[0]).toLowerCase();

        return `
          ${intentionLead}
          <p>
            The Three Norns weave your reading from root to branch. In <strong>Urd's position (The Root)</strong>, <strong>${past.rune.name} (${past.rune.symbol}${past.isReversed ? ' · Merkstave' : ''})</strong> shows that your current circumstances grew from a season of <em>${pKw}</em> (${past.rune.literal.toLowerCase()}).
            Now, at <strong>Verdandi's crossroads (The Present)</strong>, <strong>${present.rune.name} (${present.rune.symbol}${present.isReversed ? ' · Merkstave' : ''})</strong> asks you to meet the moment through <em>${cKw}</em>.
          </p>
          <p>
            As these threads converge toward <strong>Skuld's horizon (The Emerging Path)</strong>, <strong>${future.rune.name} (${future.rune.symbol}${future.isReversed ? ' · Merkstave' : ''})</strong> heralds a chapter shaped by <em>${fKw}</em>.
            Honour the foundation of ${past.rune.name}, act with the awareness of ${present.rune.name}, and let ${future.rune.name} guide your steps: <em>"${future.rune.whisper}"</em>
          </p>
        `;
      }

      // 5-Rune Cross of the Elements
      const [west, center, north, south, east] = state.drawnRunes;
      return `
        ${intentionLead}
        <p>
          At the very heart of your Five-Rune Cross sits <strong>${center.rune.name} (${center.rune.symbol}${center.isReversed ? ' · Merkstave' : ''})</strong>, anchoring the reading in themes of <em>${(center.isReversed ? center.rune.keywordsReversed : center.rune.keywordsUpright).slice(0, 2).join(' and ').toLowerCase()}</em>.
          Behind you in the West, <strong>${west.rune.name} (${west.rune.symbol})</strong> reveals the underlying root of <em>${west.rune.literal.toLowerCase()}</em> that set this cycle in motion.
        </p>
        <p>
          Look to the vertical axis for equilibrium: above you in the North, <strong>${north.rune.name} (${north.rune.symbol}${north.isReversed ? ' · Merkstave' : ''})</strong> offers higher counsel through <em>${(north.isReversed ? north.rune.keywordsReversed[0] : north.rune.keywordsUpright[0]).toLowerCase()}</em>, while below you in the South, <strong>${south.rune.name} (${south.rune.symbol}${south.isReversed ? ' · Merkstave' : ''})</strong> names the earthly forge of <em>${(south.isReversed ? south.rune.keywordsReversed[0] : south.rune.keywordsUpright[0]).toLowerCase()}</em> that tempers your resolve.
          When you integrate both, the Eastern gate opens with <strong>${east.rune.name} (${east.rune.symbol}${east.isReversed ? ' · Merkstave' : ''})</strong>: <em>"${east.rune.whisper}"</em>
        </p>
      `;
    }

    function escapeHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // ==================== CODEX RENDERING & MODAL ====================
    function renderCodex() {
      const grid = document.getElementById('codexGrid');
      const searchVal = (document.getElementById('codexSearchInput')?.value || '').trim().toLowerCase();
      const aettVal = document.getElementById('codexAettFilter')?.value || 'all';
      if (!grid) return;

      const filtered = ELDER_FUTHARK.filter(r => {
        const matchesAett = aettVal === 'all' || r.aett === aettVal;
        const matchesSearch = !searchVal ||
          r.name.toLowerCase().includes(searchVal) ||
          r.literal.toLowerCase().includes(searchVal) ||
          r.element.toLowerCase().includes(searchVal) ||
          r.keywordsUpright.some(k => k.toLowerCase().includes(searchVal));
        return matchesAett && matchesSearch;
      });

      grid.innerHTML = '';
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-parchment/60">No runes match your filter.</div>`;
        return;
      }

      filtered.forEach(rune => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'wood-tile rounded-xl p-3.5 text-left flex flex-col justify-between transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gilded';
        item.innerHTML = `
          <div class="flex items-center justify-between text-[10px] text-gilded/75 font-mono w-full">
            <span>#${rune.id}</span>
            <span>${rune.phonetic}</span>
          </div>
          <div class="my-3 text-4xl text-center rune-carving w-full">${rune.symbol}</div>
          <div>
            <div class="font-display text-sm font-bold text-gilded-light">${rune.name}</div>
            <div class="text-[11px] text-parchment/70 truncate font-serif italic">${rune.literal}</div>
            <div class="text-[10px] text-gilded/80 mt-1">${rune.aett}</div>
          </div>
        `;
        item.addEventListener('click', () => openRuneModal(rune));
        grid.appendChild(item);
      });
    }

    function openRuneModal(rune) {
      const overlay = document.getElementById('runeModalOverlay');
      if (!overlay) return;
      document.getElementById('modalRuneTile').textContent = rune.symbol;
      document.getElementById('modalRuneAett').textContent = rune.aett;
      document.getElementById('modalRuneNumber').textContent = `Rune #${rune.id}`;
      document.getElementById('modalRuneName').textContent = rune.name;
      document.getElementById('modalRuneTranslation').textContent = `Literal: "${rune.literal}" · Phonetic: ${rune.phonetic}`;
      document.getElementById('modalRuneElement').textContent = `Element: ${rune.element}`;
      document.getElementById('modalRuneDeity').textContent = `Deity: ${rune.deity}`;
      document.getElementById('modalRuneReversible').textContent = rune.reversible ? 'Can Fall Merkstave (Reversed)' : 'Symmetrical (Never Reverses)';
      document.getElementById('modalRuneUpright').textContent = rune.upright;
      document.getElementById('modalRuneMerkstaveTitle').textContent = rune.reversible
        ? '✦ Merkstave (Reversed) Meaning'
        : '✦ Shadow / Caution Aspect (Irreversible Stone)';
      document.getElementById('modalRuneReversed').textContent = rune.reversed;
      document.getElementById('modalRuneWhisper').textContent = `"${rune.whisper}"`;

      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    }

    function closeRuneModal() {
      const overlay = document.getElementById('runeModalOverlay');
      if (!overlay) return;
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }

    // ==================== JOURNAL SAVING & RENDERING ====================
    function saveCurrentReadingToJournal() {
      if (!state.hasCast || state.drawnRunes.length === 0) return;
      const entry = {
        id: 'cast_' + Date.now(),
        timestamp: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
        spreadSize: state.spreadSize,
        spreadName: SPREAD_CONFIGS[state.spreadSize].name,
        intention: state.intention || 'Open Oracle Guidance',
        runes: state.drawnRunes.map(r => ({
          id: r.rune.id,
          symbol: r.rune.symbol,
          name: r.rune.name,
          isReversed: r.isReversed,
          positionTitle: r.position.title,
          whisper: r.rune.whisper
        }))
      };
      state.journal.unshift(entry);
      saveJournalToStorage();
      renderJournalList();
      showToast('Reading inscribed in your Casting Journal');
    }

    function copyCurrentReadingToClipboard() {
      if (!state.hasCast || state.drawnRunes.length === 0) return;
      const config = SPREAD_CONFIGS[state.spreadSize];
      const lines = [
        `✦ THE GILDED SIGIL — ELDER FUTHARK RUNE READING ✦`,
        `Spread: ${config.name}`,
        `Intention: ${state.intention || 'Open Oracle Guidance'}`,
        ``
      ];
      state.drawnRunes.forEach(({ rune, isReversed, position }) => {
        lines.push(`${position.title}: ${rune.symbol} ${rune.name} (${isReversed ? 'Merkstave / Reversed' : 'Upright'}) — ${rune.literal}`);
        lines.push(`Counsel: ${isReversed ? rune.reversed : rune.upright}`);
        lines.push(`Whisper: "${rune.whisper}"`);
        lines.push(``);
      });
      const text = lines.join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Reading copied to clipboard');
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Reading copied to clipboard');
      } catch (e) {
        showToast('Unable to copy in this browser');
      }
      document.body.removeChild(ta);
    }

    function renderJournalList() {
      const container = document.getElementById('journalListContainer');
      if (!container) return;
      if (state.journal.length === 0) {
        container.innerHTML = `
          <div class="bg-walnut/50 border border-gilded/20 rounded-xl p-8 text-center">
            <div class="text-3xl text-gilded mb-2">ᛟ</div>
            <h3 class="font-display text-base text-parchment">Your Casting Journal is Empty</h3>
            <p class="text-xs text-parchment/65 mt-1 max-w-md mx-auto">
              After casting a 1, 3, or 5 rune spread on the Sacred Altar, click "Save to Journal" to preserve your personal messages here.
            </p>
          </div>
        `;
        return;
      }

      container.innerHTML = '';
      state.journal.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'bg-walnut/85 border border-gilded/25 rounded-xl p-4 sm:p-5';
        card.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-gilded/15 pb-3 mb-3">
            <div>
              <span class="text-[11px] font-mono text-gilded">${escapeHTML(entry.timestamp)}</span>
              <h4 class="font-display text-base font-bold text-gilded-light">${escapeHTML(entry.spreadName)}</h4>
              <p class="text-xs text-parchment/75 italic font-serif">Intention: "${escapeHTML(entry.intention)}"</p>
            </div>
            <button type="button" data-delete-id="${entry.id}" class="delete-entry-btn text-xs text-parchment/50 hover:text-red-300 px-2 py-1">
              Remove ✕
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            ${entry.runes.map(r => `
              <div class="p-2.5 rounded-lg bg-obsidian/70 border border-gilded/20 flex items-center gap-2.5">
                <div class="w-9 h-11 rounded wood-tile flex items-center justify-center text-xl rune-carving shrink-0 ${r.isReversed ? 'rotate-180' : ''}">
                  ${r.symbol}
                </div>
                <div class="min-w-0">
                  <div class="text-[10px] text-gilded truncate">${escapeHTML(r.positionTitle)}</div>
                  <div class="font-display text-xs font-bold text-parchment">${escapeHTML(r.name)}</div>
                  <div class="text-[10px] text-parchment/60">${r.isReversed ? 'Merkstave' : 'Upright'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        card.querySelector('.delete-entry-btn')?.addEventListener('click', () => {
          state.journal = state.journal.filter(j => j.id !== entry.id);
          saveJournalToStorage();
          renderJournalList();
        });
        container.appendChild(card);
      });
    }

    // ==================== NAVIGATION & EVENT LISTENERS ====================
    function switchTab(tabName) {
      state.activeTab = tabName;
      const views = {
        altar: document.getElementById('viewAltar'),
        codex: document.getElementById('viewCodex'),
        journal: document.getElementById('viewJournal')
      };
      const btns = {
        altar: document.getElementById('tabBtnAltar'),
        codex: document.getElementById('tabBtnCodex'),
        journal: document.getElementById('tabBtnJournal')
      };

      Object.keys(views).forEach(k => {
        if (k === tabName) {
          views[k]?.classList.remove('hidden');
          btns[k]?.classList.add('bg-gilded', 'text-obsidian', 'font-semibold', 'shadow-sm');
          btns[k]?.classList.remove('text-parchment/80');
        } else {
          views[k]?.classList.add('hidden');
          btns[k]?.classList.remove('bg-gilded', 'text-obsidian', 'font-semibold', 'shadow-sm');
          btns[k]?.classList.add('text-parchment/80');
        }
      });

      if (tabName === 'codex') renderCodex();
      if (tabName === 'journal') renderJournalList();
      if (tabName === 'altar') setTimeout(resizeCanvas, 30);
    }

    function selectSpreadSize(size) {
      state.spreadSize = size;
      const config = SPREAD_CONFIGS[size];
      const subtitleEl = document.getElementById('spreadSubtitle');
      const releaseBtnLabel = document.getElementById('releaseBtnLabel');
      if (subtitleEl && config) subtitleEl.textContent = config.subtitle;
      if (releaseBtnLabel) releaseBtnLabel.textContent = `Cast ${size} ${size === 1 ? 'Rune' : 'Runes'}`;

      document.querySelectorAll('.spread-option-btn').forEach(btn => {
        const btnSize = Number(btn.getAttribute('data-spread'));
        if (btnSize === size) {
          btn.className = 'spread-option-btn group relative rounded-xl p-3 text-left transition-all border-2 border-gilded bg-mahogany/90 shadow-md';
        } else {
          btn.className = 'spread-option-btn group relative rounded-xl p-3 text-left transition-all border border-gilded/25 bg-obsidian/60 hover:border-gilded/60';
        }
      });

      if (state.hasCast) {
        resetToBagStage();
      } else {
        state.shakeCount = 0;
        updateShakeUIState();
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      loadJournalFromStorage();
      initAltarCanvas();
      renderCodex();

      // Tab buttons
      document.getElementById('tabBtnAltar')?.addEventListener('click', () => switchTab('altar'));
      document.getElementById('tabBtnCodex')?.addEventListener('click', () => switchTab('codex'));
      document.getElementById('tabBtnJournal')?.addEventListener('click', () => switchTab('journal'));

      // Sound Toggle
      document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        const icon = document.getElementById('soundIcon');
        const label = document.getElementById('soundLabel');
        if (icon) icon.textContent = state.soundEnabled ? '🔊' : '🔇';
        if (label) label.textContent = state.soundEnabled ? 'Chimes On' : 'Muted';
      });

      // Spread Selection Buttons
      document.querySelectorAll('.spread-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const size = Number(btn.getAttribute('data-spread'));
          selectSpreadSize(size);
        });
      });

      // Intention Pills
      document.querySelectorAll('.intention-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const promptText = pill.getAttribute('data-prompt') || '';
          const input = document.getElementById('intentionInput');
          if (input) {
            input.value = promptText;
            state.intention = promptText;
          }
        });
      });

      // Bag Shake & Cast Interactions
      const bagInteractive = document.getElementById('runeBagInteractive');
      bagInteractive?.addEventListener('click', triggerBagShake);
      bagInteractive?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerBagShake();
        }
      });

      document.getElementById('shakeBagBtn')?.addEventListener('click', triggerBagShake);
      document.getElementById('releaseRunesBtn')?.addEventListener('click', () => {
        if (state.shakeCount === 0) {
          triggerBagShake();
          setTimeout(castRunesFromBag, 360);
        } else {
          castRunesFromBag();
        }
      });

      // Reshake & Reveal All
      document.getElementById('reshakeBtn')?.addEventListener('click', resetToBagStage);
      document.getElementById('revealAllBtn')?.addEventListener('click', () => {
        state.drawnRunes.forEach(item => { item.revealed = true; });
        playFlipSound();
        renderCastSpread();
        renderReadingPanel();
      });

      // Save & Copy Reading
      document.getElementById('saveReadingBtn')?.addEventListener('click', saveCurrentReadingToJournal);
      document.getElementById('copyReadingBtn')?.addEventListener('click', copyCurrentReadingToClipboard);

      // Codex Filters
      document.getElementById('codexSearchInput')?.addEventListener('input', renderCodex);
      document.getElementById('codexAettFilter')?.addEventListener('change', renderCodex);

      // Journal Actions
      document.getElementById('NewCastFromJournalBtn')?.addEventListener('click', () => switchTab('altar'));
      document.getElementById('clearJournalBtn')?.addEventListener('click', () => {
        state.journal = [];
        saveJournalToStorage();
        renderJournalList();
        showToast('Journal cleared');
      });

      // Modal Close
      document.getElementById('closeModalBtn')?.addEventListener('click', closeRuneModal);
      document.getElementById('runeModalOverlay')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('runeModalOverlay')) {
          closeRuneModal();
        }
      });
    });

})();
