import Vue from "vue";
// import { getScore } from "../lib/makai";
import { DEFAULT_DELAY } from "./index";

export default {
  SOCKET_disconnect({ dispatch }) {
    dispatch("leaveRoom");
    Vue.toasted.error("Disconnected", {
      position: "bottom-center",
      theme: "outline",
    });
  },
  SOCKET_connect() {
    Vue.toasted.clear();
  },
  SOCKET_userConnected({ commit, state }, username) {
    commit("setUsername", username);

    if (state.modalContent === "change-username") window.history.back();

    Vue.toasted
      .success("Connected", { position: "bottom-center", theme: "outline" })
      .goAway(3000);
  },
  SOCKET_roomInfo({ commit, state }, info) {
    commit("setRoomInfo", info.game);
    commit("setPlayers", info.players);
    commit("updatePlayer", info.myInfo);

    commit("setGameState", "Waiting");

    state.showModal && window.history.back();
  },
  SOCKET_updatePlayers({ commit }, players) {
    commit("setPlayers", players);
  },
  SOCKET_playerJoined({ commit }, player) {
    commit("addPlayer", player);

    !player.isBot &&
      Vue.toasted.global
        .roomInfo({ message: `${player.name} joined` })
        .goAway(2000);
  },
  SOCKET_playerLeft({ commit, state }, playerName) {
    Vue.toasted.global.roomInfo({ message: `${playerName} left` }).goAway(2000);

    state.roomInfo.roundsPlayed
      ? commit("toggleBotState", playerName)
      : commit("removePlayer", playerName);
  },
  SOCKET_playerReady({ commit }, playerName) {
    commit("setPlayerReady", playerName);
  },
  SOCKET_errorMsg({ state }, message) {
    state.showModal && window.history.back();

    Vue.toasted.error(message, { position: "bottom-center" }).goAway(4000);
  },
  SOCKET_roundStarted({ commit, dispatch }) {
    commit("toggleSideBar", { show: false });
    commit("resetPlayers");
    commit("setGameState", "Playing");
    commit("incrementRoundsPlayed");

    dispatch("dealCards");
  },
  SOCKET_cardWanted({ commit }, { playerName, value }) {
    commit("setPlayerHasPlayed", playerName);
    value && commit("dealBlankCard", playerName);
  },
  SOCKET_updateCards({ commit, state }, cards) {
    setTimeout(() => {
      this.getters.roundsPlayed > 0 &&
        commit("setPlayerCards", {
          playerName: state.username,
          cards,
        });
      commit("setUserCanPlay", true);
    }, state.players.length * DEFAULT_DELAY * 2 + 500);
  },
  SOCKET_gameResults({ dispatch, commit, state }, { players, winner }) {
    setTimeout(() => {
      commit("setPlayers", players);
      commit("setGameState", "Waiting");
    }, 2000);

    setTimeout(() => {
      let className = "justify-content-center";

      if (winner.name === state.username) className += " text-success";
      else if (!winner.isBot) className += " text-primary";

      Vue.toasted
        .show(`${winner.name} wins this round!`, {
          position: "bottom-center",
          theme: "outline",
          className,
        })
        .goAway(4000);
    }, 3000);

    setTimeout(() => dispatch("setReady"), 7000);
  },
};
