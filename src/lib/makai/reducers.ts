import { MakaiPlayer } from "./player";

export function winnerReducer(playerA: MakaiPlayer, playerB: MakaiPlayer) {
  let playerAWins =
    playerA.score > playerB.score ||
    (playerA.score === playerB.score &&
      playerA.cards.length <= playerB.cards.length);

  return playerAWins ? playerA : playerB;
}

export function loserReducer(playerA: MakaiPlayer, playerB: MakaiPlayer) {
  let playerAWins =
    playerA.score > playerB.score ||
    (playerA.score === playerB.score &&
      playerA.cards.length <= playerB.cards.length);

  return playerAWins ? playerB : playerA;
}

export function scoreReducer(currentScore: number, card: Card): number {
  let cardValue = card.number > 7 ? 10 : card.number;
  return currentScore + cardValue;
}
