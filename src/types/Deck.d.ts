interface Deck {
  getCard(num?: number): Card[];
  reset(): void;
}

interface DeckOptions {
  maxNum: number;
  suitNames: string[];
  numsToExclude?: number[];
}
