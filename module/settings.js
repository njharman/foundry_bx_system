export const registerSystemSettings = function() {
  // Track the system version upon which point a migration was last applied
  game.settings.register("bx", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
  });

  // Register Stat Mod Style
  game.settings.register("bx", "abilityMod", {
    name: "Ability Modifier",
    hint: "What rule set is used to calculate Ability Modifiers",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "bx": "B/X",
      "odd": "OD&D",
    },
    default: "bx",
  // TODO: trigger actor.js to recalc modifiers.
  });

  // Register Class Mechanics
  game.settings.register("bx", "classMechanics", {
    name: "Class Mechanics",
    hint: "What rule set is used to determine Class Mechanics",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "bx": "B/X",
      "odd": "OD&D",
      "wbx": "Wilderlands BX",
    },
    default: "bx",
  });

  // Register Skill style
  game.settings.register("bx", "thiefSkills", {
    name: "Thief Skills",
    hint: "What rule set is used to determine thief skills.",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "bx": "B/X",
      "odd": "OD&D",
      "wbx": "Wilderlands BX",
    },
    default: "bx",
  });

  // Character hit die style
  game.settings.register("bx", "hitDieStyle", {
    name: "Hit dice",
    hint: "What style of hit dice to use.",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "bx": "B/X variable",
      "alt": "Alt variable d4+X",
      "odd": "OD&D d6 +/- 1",
    },
    default: "bx",
  });

  // To-hit Progression
  game.settings.register("bx", "tohitProgression", {name: "To-hit Progression", hint: "What style to-hit progression to use.", scope: "world", config: true, type: String,
    choices: {
      "bx": "B/X",
      "wbx": "Smoothed B/X",
      "odd": "OD&D",
    },
    default: "bx",
  });

  // Save Progression
  game.settings.register("bx", "saveProgression", {name: "Save Progression", hint: "What style saving throw progression to use.", scope: "world", config: true, type: String,
    choices: {
      "bx": "B/X",
      "wbx": "Smoothed B/X",
      "odd": "OD&D",
    },
    default: "bx",
  });

  // Turn Undead Progression
  game.settings.register("bx", "turnProgression", {name: "Turn Progression", hint: "What style turn undead progression to use.", scope: "world", config: true, type: String,
    choices: {
      "bx": "B/X",
      "wbx": "Wilderlands",
      "odd": "OD&D",
    },
    default: "bx",
  });

  // B/X classes.
  game.settings.register("bx", "useDwarf", { name: "Dwarf Class", hint: "Allow Dwarf Class.", scope: "world", config: true, type: Boolean, default: true});
  game.settings.register("bx", "useElf", { name: "Elf Class", hint: "Allow Elf Class.", scope: "world", config: true, type: Boolean, default: true});
  game.settings.register("bx", "useHobbit", { name: "Halfling Class", hint: "Allow Halfling Class.", scope: "world", config: true, type: Boolean, default: true});
  game.settings.register("bx", "useThief", { name: "Thief Class", hint: "Allow Thief Class.", scope: "world", config: true, type: Boolean, default: true});

  // Wilderlands classes.
  game.settings.register("bx", "useAltanan", { name: "Altanan Barbarian Class", hint: "Allow Wilderlands Altanan Barbarian Class.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "useWhiteElf", { name: "White Elf Class", hint: "Allow Wilderlands White Elf Class.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "useWoodElf", { name: "Wood Elf Class", hint: "Allow Wilderlands Wood Elf Class.", scope: "world", config: true, type: Boolean, default: false});

  // How to apply ability modifiers to damage.
  game.settings.register("bx", "strMeleeDamage", {name: "STR Melee Damage", hint: "Add Strenth modifier to melee damage.", scope: "world", config: true, type: Boolean, default: true});
  game.settings.register("bx", "strThrownDamage", {name: "STR Thrown Damage", hint: "Add Strenth modifier to thrown damage.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "dexThrownDamage", {name: "DEX Thrown Damage", hint: "Add Dexterity modifier to thrown damage.", scope: "world", config: true, type: Boolean, default: true});
  game.settings.register("bx", "dexMissileDamage", {name: "DEX Missile Damage", hint: "Add Dexterity modifier to missile damage.", scope: "world", config: true, type: Boolean, default: true});

  // If to apply ability modifiers to saves.
  game.settings.register("bx", "saveDModifier", {name: "Death / Poison Saves", hint: "What Ability modifier to automatically apply to saving throws vs death or poison.", scope: "world", config: true, type: String,
    choices: {"": "None", "con": "Constitution"},
    default: ""});
  game.settings.register("bx", "saveWModifier", {name: "Wand Saves", hint: "What Ability modifier to automatically apply to saving throws vs wand.", scope: "world", config: true, type: String,
    choices: {"": "None", "dex": "Dexterity", "wis": "Wisdom"},
    default: ""});
  game.settings.register("bx", "savePModifier", {name: "Paralyzation / Petrification Saves", hint: "What Ability modifier to automatically apply to saving throws vs paralization or petrification.", scope: "world", config: true, type: String,
    choices: {"": "None", "con": "Constituion"},
    default: ""});
  game.settings.register("bx", "saveBModifier", {name: "Breath Weapon Saves", hint: "What Ability modifier to automatically apply to saving throws vs breath weapons.", scope: "world", config: true, type: String,
    choices: {"": "None", "dex": "Dexterity"},
    default: ""});
  game.settings.register("bx", "saveSModifier", {name: "Spell / Device Saves", hint: "What Ability modifier to automatically apply to saving throws vs spells or devices.", scope: "world", config: true, type: String,
    choices: {"": "None", "wis": "Wisdom"},
    default: "wis"});

  // Use Strength to calc encumbrance limits.
  game.settings.register("bx", "strModEncumbrance", {name: "STR Mod encumbrance", hint: "Strenth Modifier adds to encumbrancel limit.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "strScoreEncumbrance", {name: "STR Score encumbrance", hint: "Strenth Score determines encumbrancel limit.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "encumbranceScaled", {name: "Scale encumbrance", hint: "If encumbrance is modified, scale all levels of encumbrance. Otherwise it just adds to maximum.", scope: "world", config: true, type: Boolean, default: false});

  // Display Combat movement rates.
  // game.settings.register("bx", "combatMoveRate", { name: "Combat Move Rate", hint: "Display combat movement rate (feet per round, a third of B/X's rate). Default is exploration rate (feet per Turn).", scope: "world", config: true, type: Boolean, default: false});

  game.settings.register("bx", "ac9Limit", { name: "AC9 Lower Limit", hint: "A to-hit roll that hits less than AC 9 is a miss.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "autoHitMiss", { name: "Automatic Hit/Miss", hint: "A natural 20 always hits. A natural 1 always misses.", scope: "world", config: true, type: Boolean, default: false});
  game.settings.register("bx", "tohitNat20", {name: "Nat20 To-hit", hint: "How to treat natural 20 to-hit rolls.", scope: "world", config: true, type: String,
    choices: {"": "Do Nothing", "report": "Report Critical"},
    default: ""});
  game.settings.register("bx", "tohitNat1", {name: "Nat1 To-hit", hint: "How to treat natural 1 to-hit rolls.", scope: "world", config: true, type: String,
    choices: {"": "Do Nothing", "report": "Report Fumble"},
    default: ""});

  // Enable B/X Prime Req XP Adjustment
  game.settings.register("bx", "xpBonus", {
    name: "Prime Requisite Adjustment",
    hint: "Display Prime Requisite XP Adjustment",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  // Proper name for hobbits.
  game.settings.register("bx", "hobbitsarereal", { name: "Hobbit", hint: "Do not be cowed by author estate's legal teams, use the proper name for halflings.", scope: "world", config: true, type: Boolean, default: false});

};
