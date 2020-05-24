/**
 * B/X, OD&D, and author's houseruled Wilderlands BX
 * Author: njharman
 * Software License: GNU GPLv3
 */

// Import Modules
import { BX } from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { registerHandlebarHelpers } from "./handlebars.js";
import { BXActor } from "./actor.js";
import { BXItem } from "./item.js";
import { BXItemSheet } from "./item-sheet.js";
import { BXActorSheet } from "./actor-sheet.js";

// Import Helpers
import * as migrations from "./migration.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function() {
  console.log(`Initializing BX System`);

  // Record Configuration Values
  CONFIG.BX = BX;

  // Define custom Entity classes
  CONFIG.Actor.entityClass = BXActor;
  CONFIG.Item.entityClass = BXItem;

  // Register System Settings
  registerSystemSettings();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("bx", BXActorSheet, {makeDefault: true});
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("bx", BXItemSheet, {makeDefault: true});

  // Register Handlebar Helpers
  registerHandlebarHelpers();
});

Hooks.once("ready", async function() {

  // Determine whether a system migration is required and feasible
  const currentVersion = game.settings.get("bx", "systemMigrationVersion");
  const NEEDS_MIGRATION_VERSION = 0.1;
  const COMPATIBLE_MIGRATION_VERSION = 0.1;
  let needMigration = (currentVersion < NEEDS_MIGRATION_VERSION) || (currentVersion === null);
  // Perform the migration
  if ( needMigration && game.user.isGM ) {
    if ( currentVersion && (currentVersion < COMPATIBLE_MIGRATION_VERSION) ) {
      ui.notifications.error(`Your BX system data is from too old a Foundry version and cannot be reliably migrated to the latest version. The process will be attempted, but errors may occur.`, {permanent: true});
    }
    migrations.migrateWorld();
  }

  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createBXMacro(data, slot));

  // B/X classes (not availalbe in ODD/Wilderlands).
  if (game.settings.get("bx", "useDwarf")) {
    BX.actorClasses["dw"] = "Dwarf";
  } else {
    delete BX.actorClasses.dw;
  }
  if (game.settings.get("bx", "useElf")) {
    BX.actorClasses["elf"] = "Elf";
  } else {
    delete BX.actorClasses.elf;
  }
  if (game.settings.get("bx", "useHobbit")) {
    if (game.settings.get("bx", "hobbitsarereal")) {
      BX.actorClasses["hob"] = "Hobbit";
    } else {
      BX.actorClasses["hob"] = "Halfling";
    }
  } else {
    delete BX.actorClasses.hob;
  }
  if (game.settings.get("bx", "useThief")) {
    BX.actorClasses["th"] = "Thief";
  } else {
    delete BX.actorClasses.th;
  }

  // Wilderland classes.
  if (game.settings.get("bx", "useAltanan")) {
    BX.actorClasses["alt"] = "Barbarian";
  } else {
    delete BX.actorClasses.alt;
  }
  if (game.settings.get("bx", "useWhiteElf")) {
    BX.actorClasses["whe"] = "White Elf";
  } else {
    delete BX.actorClasses.whe;
  }
  if (game.settings.get("bx", "useWoodElf")) {
    BX.actorClasses["wde"] = "Wood Elf";
  } else {
    delete BX.actorClasses.wde;
  }

  // Class Name changes
  let class_mechanics = game.settings.get("bx", "classMechanics")
  if (class_mechanics == "bx") {
    BX.actorClasses["cl"] = "Cleric";
    BX.actorClasses["ftr"] = "Fighter";
  }
  if (class_mechanics == "wbx") {
    BX.actorClasses["cl"] = "Priest";
    BX.actorClasses["ftr"] = "Fighter";
  }
  if (class_mechanics == "odd") {
    BX.actorClasses["cl"] = "Cleric";
    BX.actorClasses["ftr"] = "Fighting Man";
  }

});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createBXMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.bx.rollItemMacro("${item.name}");`;
  let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "bx.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find(i => i.name === itemName) : null;
  if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

  // Trigger the item roll
  return item.roll();
}
