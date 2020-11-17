import Vue from "vue";
import Vuex from "vuex";

import socketActions from "./socketActions";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export const DEFAULT_DELAY = 500;
const username = localStorage.getItem("username") || "";

const state = {
  username,
  roomInfo: {
    roomId: "",
    maxWins: -1,
    allowBots: true,
    maxPlayers: 2,
    roundsPlayed: 0,
    gameState: "Waiting",
  },
  players: [],
  showSideBar: true,
  showModal: false,
  modalContent: "",
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {
    ...actions,
    ...socketActions
  },
});
