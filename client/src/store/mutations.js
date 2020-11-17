const BLANK_CARD = {
  number: 0,
  suit: null,
};

export default {
  toggleSideBar(state, { show } = {}) {
    state.showSideBar = show === undefined ? !state.showSideBar : show;
  },
  toggleModal(state, { show } = {}) {
    state.showModal = show === undefined ? !state.showModal : show;
  },
  setModalContent(state, modalContent) {
    state.modalContent = modalContent;
  },
  setPlayers(state, players) {
    state.players = players;
  },
  addPlayer(state, player) {
    state.players = [...state.players, player];
  },
  updatePlayer(state, playerInfo = {}) {
    state.players = state.players.map((player) =>
      player.name !== playerInfo.name ? player : playerInfo
    );
  },
  toggleBotState(state, playerName) {
    state.players = state.players.map((player) => ({
      ...player,
      isBot: player.isBot || player.name === playerName,
    }));
  },
  resetPlayers(state) {
    state.players = state.players.map((player) => ({
      ...player,
      cards: [],
      hasPlayed: player.isBot || player.name === state.username,
      isReady: player.isBot,
    }));
  },
  removeAllPlayers(state) {
    state.players = [];
  },
  removePlayer(state, playerName) {
    state.players = state.players.filter(
      (player) => player.name !== playerName
    );
  },
  setUsername(state, name) {
    state.username = name;
    localStorage.setItem("username", name);
  },
  setGameState(state, newGameState) {
    state.roomInfo = {
      ...state.roomInfo,
      gameState: newGameState,
    };
  },
  setRoomInfo(state, info) {
    state.roomInfo = info;
  },
  incrementRoundsPlayed(state) {
    state.roomInfo = {
      ...state.roomInfo,
      roundsPlayed: state.roomInfo.roundsPlayed + 1,
    };
  },
  setPlayerCards(state, { playerName, cards }) {
    state.players = state.players.map((player) => ({
      ...player,
      cards: playerName === player.name ? cards : player.cards,
    }));
  },
  setPlayerHasPlayed(state, playerName) {
    state.players = state.players.map((player) => ({
      ...player,
      hasPlayed: player.hasPlayed || player.name === playerName,
    }));
  },
  setUserCanPlay(state) {
    state.players = state.players.map((player) => ({
      ...player,
      hasPlayed: player.name === state.username ? false : player.hasPlayed,
    }));
  },
  setPlayerReady(state, playerName) {
    state.players = state.players.map((player) => ({
      ...player,
      isReady: player.isReady || player.name === playerName,
    }));
  },
  dealBlankCard(state, playerName) {
    const player = state.players.find((player) => player.name === playerName);
    if (!player) return;

    player.cards.push(BLANK_CARD);
  },
};
