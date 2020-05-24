import {BX} from './config.js';

/**
 * Extend the base Actor entity.
 * @extends {Actor}
 */
export class BXActor extends Actor {

  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  _prepareCharacterData(actorData) {
    const data = actorData.data;

    // Set class label. TODO: Should be in an on class change event handler.
    data.class.label = BX.actorClasses[data.class.value];
    const class_info = BX.classDetails[data.class.value];

    // Set Ability modifiers.
    let ability_mod = game.settings.get("bx", "abilityMod")
    if (ability_mod == "bx" || ability_mod == "wbx") {
      // Loop through ability scores, and add their modifiers to our sheet output.
      for (let [key, ability] of Object.entries(data.abilities)) {
        if (ability.score <= 3) {
          ability.mod = -3;
        } else if (ability.score <= 5) {
          ability.mod = -2;
        } else if (ability.score <= 8) {
          ability.mod = -1;
        } else if (ability.score >= 18) {
          ability.mod = 3;
        } else if (ability.score >= 16) {
          ability.mod = 2;
        } else if (ability.score >= 13) {
          ability.mod = 1;
        } else {
          ability.mod = 0;
        }
      }
      // Set bonus languages able to learn.
      data.languages.bonus = data.abilities.int.mod;
    }
    if (ability_mod == "odd") {
      for (let [key, ability] of Object.entries(data.abilities)) {
          ability.mod = 0;
        // TODO: odd ability mods.
        }
      // Set bonus/extra languages.
      data.languages.bonus = 0;
    }

    // Set Hit Die from class.
    data.hd.value = class_info.hd[game.settings.get("bx", "hitDieStyle")];

    // Set THAC0 from class. str/dex mod added by individual weapon.
    data.thac0.value = class_info.thac0[game.settings.get("bx", "tohitProgression")][data.level.value];
    data.thac0.value -= data.thac0.bonus;  // User entered bonus.

    // Set saves from class.
    // TODO: ability mods
    data.saves.d.value = class_info.save[game.settings.get("bx", "saveProgression")].d[data.level.value];
    data.saves.w.value = class_info.save[game.settings.get("bx", "saveProgression")].w[data.level.value];
    data.saves.p.value = class_info.save[game.settings.get("bx", "saveProgression")].p[data.level.value];
    data.saves.b.value = class_info.save[game.settings.get("bx", "saveProgression")].b[data.level.value];
    data.saves.s.value = class_info.save[game.settings.get("bx", "saveProgression")].s[data.level.value];

    // Set AC from items/DEX.
    data.ac.value = (9 - data.abilities.dex.mod)
    data.ac.value -= data.ac.bonus;  // User entered bonus.

    if (game.settings.get("bx", "strScoreEncumbrance")) {
      // Set max encumbrance to 10 * Strength.
      data.encumbrance.max = data.abilities.str.value * 10;
    } else if (game.settings.get("bx", "strModEncumbrance")) {
      // Set max encumbrance 160 + 10 * STR Mod.
      data.encumbrance.max = 160 + (data.abilities.str.mod * 10);
    } else {
      data.encumbrance.max = 160;  // B/X max.
    }

    // Set encumbrance from items.
    data.encumbrance.value = 0;
    // Set movement from armor/encumbrance. max is what is entered by user.
    data.movement.value = data.movement.max;
    // TODO: Calc max xp (needed for next level)

    // Set Bash and Force to be 2 + StrMod.
    data.skills.bash.value = Math.max(1, Math.min(6, 2 + data.abilities.str.mod));
    data.skills.force.value = Math.max(1, Math.min(6, 2 + data.abilities.str.mod));
    // Set Racial Listen or Search and Sense.
    if (["alt","elf","dw", "whe","wde"].includes(data.class.value)) {
      data.skills.listen.value = 2;
      data.skills.sense.value = 2;
    }

    // Set class based languages.
    // TODO: Should be class change event handler.
    let class_mechanics = game.settings.get("bx", "classMechanics")
    if (class_mechanics == "bx") {
      data.languages.class = BX.languagesKnownBX[data.class.value].slice();
    }
    if (class_mechanics == "wbx") {
      data.languages.class = BX.languagesKnownWBX[data.class.value].slice();
      // Magic-Users learn one language per level.
      if (data.class.value === "mu") {
        data.languages.extra = data.level.value;
      }
      // Law priest know Logos, Chaos know Eris.
      if (data.class.value === "cl") {
        if (BX.lawNames.includes(data.alignment.value) && ! data.languages.class.includes("Logos")) {
          data.languages.class.push("Logos");
        }
        if (BX.chaosNames.includes(data.alignment.value) && ! data.languages.class.includes("Eris")) {
          data.languages.class.push("Eris");
        }
      }
    }

  return data;
  }

}
