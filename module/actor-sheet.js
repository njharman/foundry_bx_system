import {BX} from './config.js';

/**
 * Extend the basic ActorSheet with some modifications.
 * @extends {ActorSheet}
 */
export class BXActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      // css classes
      classes: ["bx", "sheet", "actor"],
      template: "systems/bx/templates/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.config = CONFIG.BX;

    data.dtypes = ["String", "Number", "Boolean"];
    // for ( let attr of Object.values(data.data.attributes) ) {
    //   attr.isCheckbox = attr.dtype === "Boolean";
    // }
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Rollables.
    html.find('.abilitycheck').click(this._onAbilityCheck.bind(this));
    html.find('.savingthrow').click(this._onSavingThrow.bind(this));
    html.find('.skillcheck').click(this._onSkillCheck.bind(this));
    html.find('.rebukeundead').click(this._onRebukeUndead.bind(this));
    html.find('.roll-tohit').click(this._onRollTohit.bind(this));
    html.find('.roll-hitdie').click(this._onRollHitDie.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options={}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /* -------------------------------------------- */

  /** @override */
  // _updateObject(event, formData) {
  // }

  _onAbilityCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let result = roll.roll();
      let flavor = (result.total <= this.actor.data.data.abilities[dataset.ability].score ? '<span class="success">Passed</span> ' : '<span class="failed">Failed</span> ');
      result.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor:  flavor + (dataset.label ? `${dataset.label} ` : '')
      });
    }
  }

  _onSavingThrow(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    if (! dataset.save) return;

    let data = this.actor.data.data;
    // Add user set modifier.
    let bonus = data.saves[dataset.save].bonus;
    // add Ability modifier, per system settings.
    let ability = game.settings.get("bx", `save${dataset.save.toUpperCase()}Modifier`);
    if (ability) {
      bonus += data.abilities[ability].mod;
      ability = ` [${ability.toUpperCase()}]`;
    }
    let result = new Roll(bonus ? `d20+${bonus}` : "d20", data).roll();
    let success = (result.total >= data.saves[dataset.save].value ? '<span class="success">Passed</span> ' : '<span class="failed">Failed</span> ');
    result.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: `${success} ${BX.saveNames[dataset.save].name} saving throw >= ${data.saves[dataset.save].value} ${ability}`
    });
  }

  _onSkillCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // TODO: if 6/6 skill, if 6 rolled, check 3 in 6 still fails.
    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let result = roll.roll();
      let flavor = (result.total <= this.actor.data.data.skills[dataset.skill].value ? '<span class="success">Passed</span> ' : '<span class="failed">Failed</span> ');
      result.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: flavor + (dataset.label ? `${dataset.label}` : '')
      }, {rollMode: dataset.blind ? DICE_ROLL_MODES.BLIND : DICE_ROLL_MODES.PUBLIC});
    }
  }

  _onRebukeUndead(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    let data = this.actor.data.data;
    // Add user set modifier.
    let bonus = data.rebukeundead.bonus;
    let result = new Roll(bonus ? `2d6+${bonus}` : "2d6", data).roll();
    // 2 or greater required cause '1' encoded as Destroyed.
    let total = Math.max(2, result.total);
    let turn = BX.classDetails["cl"].turn[game.settings.get("bx", "turnProgression")];
    let flavor = "Rebuke Undead";
    for (var hd in turn) {
      // TODO: fix commas, figure out join in javascript.
      let needed = turn[hd][data.level.value];
      if (1 == needed) {
        flavor += `, <span class="failed">D ${hd}</span>`;
      } else if (total >= needed) {
        flavor += `, ${hd}`;
      }
    }
    result.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: flavor,
    }, {rollMode: DICE_ROLL_MODES.BLIND});
  }

  _onRollTohit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    let data = this.actor.data.data;
    let bonus = data.thac0.bonus ? `+${data.thac0.bonus}` : '';
    let result = new Roll(`d20${bonus}`, data).roll();
    let achit = data.thac0.value - result.total;
    // TODO: Find target token's AC.
    let flavor = (game.settings.get("bx", "ac9Limit") && achit > 9) ? '<span class="failed">Missed.</span>' : `Hit AC ${achit}`;
    if (result.dice[0].total == 20) {
      flavor = game.settings.get("bx", "autoHitMiss") ? '<span class="success">Hit!</span>' : flavor;
      let crit = game.settings.get("bx", "tohitNat20");
      if (crit === "report") {flavor = `<span class="bold">Critical</span> ${flavor}`};
    } else if (result.dice[0].total == 1) {
      flavor = game.settings.get("bx", "autoHitMiss") ? '<span class="failed">Missed.</span>' : flavor;
      let fumb = game.settings.get("bx", "tohitNat1");
      if (fumb === "report") {flavor = '<span class="failed">Fumble.</span>'};
    }
    result.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: flavor,
    });
  }

  _onRollHitDie(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    let data = this.actor.data.data;
    let result = new Roll(data.hd.value, data).roll();
    result.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: "Hit Die"
    });
  }

}
