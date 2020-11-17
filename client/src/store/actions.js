import { DEFAULT_DELAY } from "./index";

export default {
  openModal({ commit, state }, modalContent) {
    state.showModal
      ? window.history.replaceState("modalOpen", "", modalContent)
      : window.history.pushState("modalOpen", "", modalContent);

    commit("setModalContent", modalContent);
    commit("toggleModal", { show: true });
  },
  closeModal({ commit }) {
    commit("setModalContent", "");
    commit("toggleModal", { show: false });
  },
  dealCards({ state, commit }) {
    const playerNames = state.players.map((player) => player.name),
      dealQueue = playerNames.concat(playerNames);

    dealQueue.forEach((playerName, idx) => {
      setTimeout(() => {
        this.getters.roundsPlayed > 0 && commit("dealBlankCard", playerName);
      }, DEFAULT_DELAY * (idx + 1));
    });
  },
  userWantsCard({ dispatch, commit, state }, value) {
    dispatch("emitEvent", ["wantsCard", value]);
    commit("setPlayerHasPlayed", state.username);
  },
  setReady({ dispatch }) {
    dispatch("emitEvent", ["setReady"]);
  },
  addBots({ dispatch, state }) {
    const botsToAdd = state.roomInfo.maxPlayers - state.players.length;

    for (let i = 0; i < botsToAdd; i++)
      setTimeout(() => dispatch("emitEvent", ["addBot"]), 100 * i + 1);
  },
  leaveRoom({ commit, dispatch }) {
    dispatch("emitEvent", ["leaveRoom"]);

    commit("setRoomInfo", {});
    commit("setPlayers", []);
  },
  endRound({ commit }) {
    commit("resetPlayers");
  },
  emitEvent(context, [eventName, payload]) {
    this._vm.$socket.emit(eventName, payload);
  },
};
