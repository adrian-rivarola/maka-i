<template>
  <div class="main">
    <SideBar />
    <SideBarControl />
    <Modal v-if="showModal" />
    <Makai v-if="roomInfo.roomId" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Makai from "./components/Makai";
import Modal from "./components/Modal";
import SideBar from "./components/SideBar";
import SideBarControl from "./components/SideBarControl";

export default {
  name: "App",
  components: {
    Modal,
    SideBar,
    SideBarControl,
    Makai,
  },
  computed: mapState(["showModal", "roomInfo"]),
  mounted() {
    location.pathname !== "/" && window.history.replaceState({}, "Home", "/");

    window.addEventListener("popstate", () =>
      this.$store.dispatch("closeModal")
    );
  },
};
</script>

<style>
html,
body,
.main {
  min-height: 100vh;
  margin: 0;
  font-size: calc(0.75vh + 8px);
}
.main {
  display: flex;
  flex-flow: row nowrap;
  background-image: linear-gradient(to bottom, #1a936f, #1a9333);
}
.fade-enter-active,
.fade-enter-active {
  transition: opacity 500ms;
  transition-delay: 250ms;
}
.fade-enter,
.fade-enter-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 750ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}
@media (max-width: 450px) {
  :focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
}
</style>
