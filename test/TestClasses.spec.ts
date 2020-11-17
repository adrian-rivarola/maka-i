import { BasePlayer, BaseDeck, BaseGame } from "../src/lib/classes";

export class Tester extends BasePlayer {
  constructor(name?: string) {
    super(name || "Tester");
    if (!name) this.isBot = true;
  }
}

export class TestingDeck extends BaseDeck {
  constructor(suits?: Array<string>) {
    if (!suits) {
      suits = ["s1", "s2", "s3", "s4"];
    }
    super({
      maxNum: 12,
      suitNames: suits,
    });
  }
}

export class TestingGame extends BaseGame {
  constructor(gameOpts?: GameOptions) {
    super({
      cardsToDeal: 3,
      deck: new TestingDeck(),
      ...gameOpts,
    });
  }

  createPlayer(name: string): Tester {
    return new Tester(name);
  }

  getWinner() {
    return this.players[0];
  }
}
