interface Game {
  deck: Deck;
  cardsToDeal: number;

  roomId: string;
  players: Player[];

  bots: Player[];

  hasBots: boolean;
  canAddBot: boolean;
  canStart: boolean;

  allPlayersReady: boolean;
  isEmpty: boolean;
  isFull: boolean;
  isPlaying: boolean;

  isRoundOver: boolean;
  hasStarted: boolean;

  info: GameInfo;
  results: GameResult;
  playersInfo: PlayerInfo[];
  
  canPlayerJoin(playerName: string): [canJoin: boolean, error: string];
  createPlayer(playerName: string, isBot?: boolean): Player;
  addPlayer(playerName: string, isBot?: boolean): Player;
  removePlayer(playerName: string): Player | undefined;

  addBot(): Player;
  fillWithBots(): void;
  removeBot(): Player | undefined;

  getWinner(): Player;

  startRound(): void;
  dealCards(): void;
  roundEnded(): void;

  reset(): void;
}

interface GameInfo {
  roomId: string;
  allowBots: boolean;
  maxPlayers: number;
  roundsPlayed: number;
}

interface GameResult {
  players: PlayerInfo[];
  winner: PlayerInfo;
}

interface GameConfig {
  deck: Deck;
  cardsToDeal: number;
}

interface GameOptions {
  maxPlayers?: number;
  allowBots?: boolean;
  roomId?: string;
}

type GameSetup = GameConfig & GameOptions;

interface RoomStorage {
  [gameType: string]: {
    [roomId: string]: Game | undefined;
  };
}
