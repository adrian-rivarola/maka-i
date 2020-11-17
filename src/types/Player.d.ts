interface PlayerInfo {
  name: string;
  cards: Card[];
  isBot: boolean;
  isReady: boolean;
  gamesWon: number;
  hasPlayed?: boolean;
}

interface Player {
  name: string;
  cards: Card[];
  isBot: boolean;
  isReady?: boolean;
  hasPlayed?: boolean;
  gamesWon: number;
  score: number;

  addCard(card: Card | Card[]): void;
  getInfo(getCards?: boolean): PlayerInfo;
  restart(): void;
  resetHand(): void;
}

interface PlayerSocket extends SocketIO.Socket {
  username: string;
  player?: Player;
  game?: Game;
  roomId?: string;
}
