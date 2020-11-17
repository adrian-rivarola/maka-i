import Vue from "vue";
import Toasted from "vue-toasted";

import App from "./App.vue";
import VueSocketIO from "vue-socket.io";

import store from "./store";

let SERVER_URL = window.location.origin + "/makai";

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.VUE_APP_SERVER_PORT || 5000;

  SERVER_URL = SERVER_URL.replace(location.port, PORT);
}

Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV !== "production",
    connection: SERVER_URL,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
    options: {
      query: {
        username: store.state.username,
      },
    },
  })
);

Vue.use(Toasted);

Vue.toasted.register("roomInfo", ({ message }) => message, {
  position: "bottom-left",
  theme: "outline",
  type: "info",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
