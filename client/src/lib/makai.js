function scoreReducer(currentScore, card) {
  let cardValue = card.number > 7 ? 10 : card.number;
  return currentScore + cardValue;
}

export function getScore(cards) {
  const score = cards.reduce(scoreReducer, 0);
  return score === 30 ? 8.5 : score % 10;
}
