class BasePlayer implements Player {
  name: string;
  gamesWon = 0;
  private cards_: Card[] = [];
  private isBot_ = false;
  hasPlayed = false;
  isReady = false;

  constructor(name?: string) {
    this.name = name || "Anonymous";
  }

  get isBot() {
    return this.isBot_;
  }

  set isBot(val: boolean) {
    this.isBot_ = this.hasPlayed = this.isReady = val;
  }

  addCard(newCard: Card | Card[]) {
    this.cards_ = this.cards_.concat(newCard);
  }

  getInfo(getCards?: boolean): PlayerInfo {
    const cards: Card[] = getCards
      ? this.cards
      : this.cards.map(() => ({ number: 0, suit: "", toString: "" }));

    return {
      cards,
      name: this.name,
      isBot: this.isBot,
      isReady: this.isReady,
      gamesWon: this.gamesWon,
      hasPlayed: this.hasPlayed,
    };
  }

  get cards(): Card[] {
    return this.cards_;
  }

  get score(): number {
    return 0;
  }

  resetHand() {
    this.cards_ = [];
    this.isReady = this.hasPlayed = this.isBot;
  }

  restart() {
    this.resetHand();

    this.gamesWon = 0;
  }
}

export default BasePlayer;
