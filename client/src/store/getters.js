export default {
  userIsReady(state) {
    const player = state.players.find(
      (player) => player.name === state.username
    );
    return player.isReady;
  },
  userCanAddBot(state) {
    const players = state.players.filter((player) => !player.isBot);
    return (
      state.roomInfo.allowBots &&
      state.players.length < state.roomInfo.maxPlayers &&
      players[0].name === state.username
    );
  },
  isPlaying(state) {
    return state.roomInfo.gameState === "Playing";
  },
  roundsPlayed(state) {
    return state.roomInfo.roundsPlayed;
  },
  localPlayer(state) {
    return state.players.find((player) => player.name === state.username);
  },
  opponents(state) {
    return state.players.filter((player) => player.name !== state.username);
  },
};
