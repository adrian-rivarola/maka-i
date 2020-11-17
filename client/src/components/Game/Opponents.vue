<template>
  <transition-group
    name="fade"
    tag="div"
    class="player-list"
  >
    <player
      v-for="player in $store.getters.opponents"
      :key="player.name"
      :player="player"
    />
  </transition-group>
</template>

<script>
import Player from "./Player";

export default {
  name: "Opponents",
  components: { Player }
};
</script>

<style lang="css">
.player-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  min-height: 15em;
  font-size: 0.75em;
  margin: 3em;
}
@media (max-width: 700px) {
  .player-list {
    font-size: 0.5em;
    margin: 0;
  }
}
</style>
