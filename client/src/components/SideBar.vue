<template>
  <aside class="sidebar" :class="{ open: showSideBar }">
    <Header />
    <transition name="fade">
      <RoomInfo v-if="roomInfo.roomId" />
      <GameButtons v-else />
    </transition>

    <Footer v-if="!roomInfo.roomId" />
  </aside>
</template>

<script>
import { mapState } from "vuex";

import GameButtons from "./SideBar/GameButtons";
import RoomInfo from "./SideBar/RoomInfo";
import Header from "./SideBar/Header";
import Footer from "./SideBar/Footer";

export default {
  name: "SideBar",
  components: {
    GameButtons,
    RoomInfo,
    Header,
    Footer,
  },
  computed: mapState(["showSideBar", "roomInfo"]),
};
</script>

<style lang="css" scoped>
.sidebar {
  flex-shrink: 0;
  display: flex !important;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
  /* width: 320px; */
  min-height: 100vh;
  color: white;
  z-index: 100;
  overflow: auto;
  background: #071a52;
  transition: transform 0.2s ease-in;
}
@media (max-width: 1199px) {
  .sidebar {
    position: absolute;
    transform: translateX(-100vh);
  }
  .sidebar.open {
    transform: translateX(0px);
  }
}
</style>
