import BaseGame from "../classes/BaseGame";
import SpanishDeck from "../decks/SpanishDeck";
import { MakaiPlayer } from "./player";

import { winnerReducer } from "./reducers";

export class MakaiGame extends BaseGame {
  players: Array<MakaiPlayer> = [];

  constructor(gameOpts?: GameOptions) {
    super({
      deck: new SpanishDeck([8, 9]),
      cardsToDeal: 2,
      ...gameOpts,
    });
  }
  createPlayer(playerName: string, isBot: boolean): Player {
    return new MakaiPlayer(playerName, isBot);
  }

  dealThirdCard(): void {
    this.players.forEach((player) => {
      player.wantsCard && player.addCard(this.deck.getCard());
    });
  }

  getWinner(): Player {
    return this.players.reduce(winnerReducer);
  }

  roundEnded() {
    this.dealThirdCard();
    super.roundEnded();
  }
}
