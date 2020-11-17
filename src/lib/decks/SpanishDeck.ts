import BaseDeck from "../classes/BaseDeck";

export default class SpanishDeck extends BaseDeck {
  constructor(numsToExclude?: number[]) {
    super({
      suitNames: ["cups", "coins", "clubs", "swords"],
      maxNum: 12,
      numsToExclude,
    });
  }
}
