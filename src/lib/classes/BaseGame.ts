abstract class BaseGame implements Game {
  deck: Deck;
  cardsToDeal: number;
  players: Array<Player> = [];

  isPlaying = false;
  info: GameInfo;

  constructor(gameSetup: GameSetup) {
    this.deck = gameSetup.deck;
    this.cardsToDeal = gameSetup.cardsToDeal;

    this.info = {
      roomId: gameSetup.roomId || "",
      allowBots: !!gameSetup.allowBots,
      maxPlayers: gameSetup.maxPlayers || 2,
      roundsPlayed: 0,
    };
  }
  set roomId(id: string) {
    this.info.roomId = id;
  }

  get roomId(): string {
    return this.info.roomId;
  }

  get isFull(): boolean {
    return this.players.length === this.info.maxPlayers;
  }

  get isEmpty(): boolean {
    return this.players.filter((player) => !player.isBot).length === 0;
  }

  get allPlayersReady(): boolean {
    return this.players.every((player) => player.isReady);
  }

  get canStart(): boolean {
    return (
      (this.isFull || this.info.roundsPlayed > 0) &&
      this.players.length > 1 &&
      this.allPlayersReady
    );
  }

  get hasStarted(): boolean {
    return this.info.roundsPlayed > 0;
  }

  get bots(): Player[] {
    return this.players.filter((player) => player.isBot);
  }

  get canAddBot(): boolean {
    return !this.isFull && !this.hasStarted;
  }

  get hasBots(): boolean {
    return this.bots.length > 0;
  }

  get isRoundOver(): boolean {
    return this.isFull && this.players.every((player) => player.hasPlayed);
  }

  get results(): GameResult {
    return {
      winner: this.getWinner().getInfo(true),
      players: this.playersInfo,
    };
  }
  get playersInfo(): PlayerInfo[] {
    const getCards = this.isRoundOver;
    return this.players.map((player) => player.getInfo(getCards));
  }

  canPlayerJoin(playerName: string): [canJoin: boolean, error: string] {
    // if (this.hasBots) return [true, ""];

    let error = "";
    if (this.hasStarted)
      error = `Game #${this.info.roomId} has already started`;
    else if (this.players.find((player) => player.name === playerName))
      error = `Username "${playerName}" is taken`;
    else if (this.isFull) error = `Game "${this.info.roomId}" is full`;

    return [error === "", error];
  }

  // takeOverBot(playerName: string): Player {
  //   let player = this.bots.find((player) => player.name === playerName);

  //   if (!player) player = this.bots[0];

  //   player.name = playerName;
  //   player.isBot = false;
  //   player.isReady = false;
  //   return player;
  // }

  addPlayer(playerName: string, isBot?: boolean): Player {
    // if (this.isFull && this.hasBots) return this.takeOverBot(playerName);

    const newPlayer = this.createPlayer(playerName, isBot);
    this.players.push(newPlayer);

    return newPlayer;
  }

  addBot(): Player {
    return this.addPlayer("Bot #" + this.players.length, true);
  }

  removePlayer(playerName: string): Player | undefined {
    const idx = this.players.findIndex((player) => player.name === playerName);

    if (idx === -1) return;

    let player = this.players.splice(idx, 1)[0];
    return player;
  }

  fillWithBots(): void {
    const playersToAdd = this.info.maxPlayers - this.players.length;

    for (let i = 0; i < playersToAdd; i++) {
      this.addBot();
    }
  }

  removeBot(): Player | undefined {
    const botName = this.bots[0].name;
    return this.removePlayer(botName);
  }

  abstract getWinner(): Player;
  abstract createPlayer(playerName: string, isBot?: boolean): Player;

  dealCards() {
    this.players.forEach((player) => {
      let cards = this.deck.getCard(this.cardsToDeal);
      player.addCard(cards);
    });
  }

  startRound(): void {
    this.reset();
    this.dealCards();

    ++this.info.roundsPlayed;
    this.isPlaying = true;
  }

  roundEnded() {
    this.isPlaying = false;
    this.getWinner().gamesWon++;
  }

  reset() {
    this.deck.reset();
    this.players.forEach((player) => player.resetHand());
  }
}

export default BaseGame;
