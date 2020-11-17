abstract class BaseDeck implements Deck {
  private maxNum: number;
  private suitNames: string[];
  private numsToExclude: number[];
  private deck: Card[] = [];

  constructor(deckOptions: DeckOptions) {
    this.maxNum = deckOptions.maxNum;
    this.suitNames = deckOptions.suitNames;
    this.numsToExclude = deckOptions.numsToExclude || [];

    this.reset();
  }

  reset() {
    this.deck = [];
    for (let number = 1; number <= this.maxNum; number++) {
      if (!this.numsToExclude.includes(number))
        for (let suit of this.suitNames) {
          this.deck.push({
            number,
            suit,
            toString: `${number} of ${suit}`,
          });
        }
    }
    this.shuffle();
  }

  private shuffle() {
    let i: number, j: number, temp: Card;

    for (i = this.deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }

  getCard(num: number = 1): Card[] {
    const cards: Card[] = [];

    while (num--) {
      const card = this.deck.pop();
      if (!card) throw new Error("Trying to pop from an empty array!");
      cards.push(card);
    }
    return cards;
  }
}

export default BaseDeck;
