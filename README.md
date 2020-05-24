# BX System

A [Foundry VTT](https://foundryvtt.com/) Game System for playing B/X D&D, OD&D,
and author's houserules Wilderlands BX D&D. Focusing on automation.

__WARNING:__ This project is not even in an Alpha state yet. Things are incomplete, broke, will change and no migrations will be provided.

The default will be to follow B/X rules. Specifically, the Necrotic
Gnome's [Old-School Essentials](https://necroticgnome.com/collections/old-school-essentials) version.
System settings will enable OD&D rules, and the author's Wilderlands BX options, among others.


## Credits

Forked from Simple WorldBuilding System by Atropos.
With code and ideas from DnD5E System also by Atropos.


## Rough Feature Road Map

1. Get B/X stuff working.
2. Get whatever needed for author to run Wilderlands Campaign.
3. Get OD&D stuff working.

  - Optional and House Rules
    + Wilderlands classes.
    + Make dwarf, hobbit, elf, thief optional.
    + To-hit progression options; B/X, smoothed B/X, OD&D.
    + Saving throw progression options; B/X, smoothed B/X, OD&D.
    + Turn undead progression options; B/X, Wilderlands B/X, OD&D.
    + Hit Die options; B/X, OD&D, "d4+X" where X enough to match B/X HD.
    + Saving throw Ability modifiers.
    + Strength determines/adds to encumbrance.
    - Encumbrance effects on movmement is scaled.
    - Simple (armor based encumbrance) or track weight.
    - STR/DEX mod to melee/thrown/missile weapon damage.
    - Variable weapon damage.
    - d6-1 / d6 / d6 +1 damage for small / 1h / 2h weapons.
    - Movement Rate displayed: combat (default) or exploration.
    - Player Critical on to-hit nat 20.
      + Report.
      - Only for fighters.
      - max damage.
      - max damage + rolled weapon damage.
      - 2x rolled weapon damage.
      - roll dice twice, add modifiers.
      - Wilderlands text "Fighter gets another attack".
      - Wilderlands 1) max damage or 2) whatever player can convince referee of happening.
    - Player Fumble on to-hit nat 1.
      + Report.
      - Wilderlands Fumble Results.
      - Planet Eris Fumble Results.

  - Character Sheet
    - Find someone willing to make the CSS/HTML not ugly.
    + Ability Checks (d20 <=).
    + Saving Throws.
      + Auto set saves from class and level.
      + Arbitary user settable saving throw mod.
    + Skill Checks (x-in-6 chance).
    + Wilderlands (LotFP) thief skills.
    + Wilderlands (LotFP) Altanan Barbarian skills.
    + To-hit Roll.
      + Auto set THACO from class and level
      + Arbitary user settable THACO mod.
    + Auto set Hit Die from class.
    + Roll Hit Die.
    + Arbitary user settable AC mod.
    + Auto adjust AC from Dex mod.
    + Blind Turning undead Attempt.
    - Auto set B/X thief skills.
    - Auto set Prime Requisite XP bonus.

  - Inventory
    - Using lbs instead of coins for encumbrance.
    - Worn/carrying vs what is at "base", in bank.
    - Automatic Encumbrance calculation.
    - Auto set AC from Armor, shield, other items.
    - Auto set move from encumbrance.
    - Weapons have to-hit roll with mods for weapon, ablility.
    - Light sources that automatically add light to token.
    - Items that consume after duration: torches, lantern oil, rations
    - [not sure possible] containers (backback, sack) that have limit and hold other items.
    - What is in "hand"s.

  - Add B/X Spell Compendium
  - Add B/X Monster Compendium
  - Add B/X Mundane Item Compendium
  - Add B/X Magic Item Compendium
  - Add Language Compendium
  - Add Wilderlands BX Spell Compendium
  - Add Wilderlands BX Item Compendium
  - Add Wilderlands BX Language Compendium
  - Add OSE OGL rules journal(s)
  - Add Wilderlands rules journal(s)
    - Specifically the various Sequences (Dungeon Exploration, Wilderness, etc) annoted with rolls etc.
    - Death and Dismemberment rollable table.
    - Other tables.

  - Auto roll initial 3d6 in order ability scores.
  - Wilderlands add starting equipement by class.
  - Wilderlands Auto reroll Hit Dice.
  - Wilderlands bash/force door check specific effects.
  - Reaction Roll macro.
  - Suprise Roll macro.
  - Sense / Secret door GM Roll macro.

  - OD&D all the things!
    - OD&D stat mods.
    - OD&D classes/progressions.
    - OD&D to-hit progression.
    - OD&D saving throw progression.
    - OD&D Greyhawk maybe other supplement options.

  - Dungeon Exploration Turn tracker.
    - Running count, increment, decrement of turns.
    - Prompts 6th turn rest
    - Rolls random encounter check
    - Supports "callback" to announce expiration of light sources, spells, potions, etc.
    - [Maybe] track party exploration movement rate and how much they've traveled this turn...

  - Marching Order tool.
    - automatically arranges tokens into single, double, triple, quad file.
    - random selection form front, left, right, rear "X" ranks.
    - check trigger trap in marching order

  - Wilderlands combat sequence tool.

  - Auto XP log
    - token marked defeated goes here.
    - Referee ad hoc add amounts.
    - calc X shares / "zero out".
