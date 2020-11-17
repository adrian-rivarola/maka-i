import BasePlayer from "../classes/BasePlayer";

import { scoreReducer } from "./reducers";

export class MakaiPlayer extends BasePlayer {
  private wantsCard_ = false;

  constructor(name: string, isBot?: boolean) {
    super(name);

    this.isBot = this.isReady = this.hasPlayed = isBot;
  }

  addCard(newCard: Card | Card[]) {
    super.addCard(newCard);
    
    if (this.isBot) {
      const score = this.score;
      this.wantsCard_ = score === 5 ? Math.random() > 0.5 : score < 5
    }
  }

  get wantsCard(): boolean {
    return this.wantsCard_
  }

  set wantsCard(val: boolean) {
    this.wantsCard_ = val;
    this.hasPlayed = true;
  }
  get score(): number {
    let score = this.cards.reduce(scoreReducer, 0);
    return score === 30 ? 8.5 : score % 10;
  }

  set score(n: number) {}
}
