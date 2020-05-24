/**
 * Extend the basic Item.
 * @extends {Item}
 */
export class BXItem extends Item {
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;
  }
}
