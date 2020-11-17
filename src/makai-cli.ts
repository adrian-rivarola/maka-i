import center from "center-align";
import prompt from "prompt-sync";

import { MakaiGame, MakaiPlayer } from "./lib/makai";

const input = prompt({ sigint: true }),
  log = console.log;

const C_WIDTH = 32,
  BORDER1 = "=".repeat(C_WIDTH),
  BORDER2 = "-".repeat(C_WIDTH);

function printMenu() {
  log(BORDER1);
  log("-" + center("Maka'i", C_WIDTH - 2) + "-");
  log(BORDER1);
  log();
}

function createPlayer(game: MakaiGame): MakaiPlayer {
  log(BORDER2);
  log("Enter username:");
  const username = input("> ");

  return game.addPlayer(username) as MakaiPlayer;
}

function getAnswer(question: string): boolean {
  const validAnswers = ["y", "n"];
  let answer: string;

  log(question + " (y/n)");

  do {
    answer = input("> ").trim().toLowerCase();
  } while (!validAnswers.includes(answer));

  return answer === "y";
}

function getNumber(min: number, max: number): number {
  let num: number;

  do {
    num = parseInt(input("> ").trim());
  } while (isNaN(num) || num < min || num > max);

  return num;
}

function getGameOptions(): GameOptions {
  log(BORDER2);
  log("Enter number of bots: (1-12)");

  const maxPlayers = 1 + getNumber(1, 12);

  return {
    allowBots: true,
    maxPlayers,
  };
}

function printPlayerInfo(player: MakaiPlayer) {
  log(BORDER2);
  log(center(`${player.name} - ${player.score} points`, C_WIDTH));
  log(BORDER2);

  player.cards.forEach((card) => log(`\t- ${card.toString}`));

  log(BORDER2);
  log();
}

function printRoundInfo(info: GameInfo) {
  log(BORDER1);
  log(center(`Round ${info.roundsPlayed}`, C_WIDTH));
  log(BORDER1);
  log();
}

function printWinnerInfo(winner: MakaiPlayer) {
  log(BORDER1);
  log(center(`Winner: ${winner.name}`, C_WIDTH));
  log(center(`Score: ${winner.score} points`, C_WIDTH));
  log(BORDER1);
  log();
}

function playGame() {
  printMenu();

  const gameOpts = getGameOptions(),
    game = new MakaiGame(gameOpts);

  const player = createPlayer(game);

  game.fillWithBots();

  let keepPlaying: boolean;
  do {
    game.startRound();

    console.clear();
    printRoundInfo(game.info);
    printPlayerInfo(player);

    player.wantsCard = getAnswer("Pick another card?");
    game.roundEnded();

    console.clear();
    game.players.forEach(printPlayerInfo);

    printWinnerInfo(game.getWinner() as MakaiPlayer);

    keepPlaying = getAnswer("Keep playing?");
  } while (keepPlaying);

  console.clear();
}

playGame();
