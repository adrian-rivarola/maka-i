<template>
  <div class="player-info">
    <p class="text-center m-0">
      {{ player.name }}
    </p>
    <Hand :cards="player.cards" />
  </div>
</template>

<script>
import Hand from "./Hand";

export default {
  name: "Player",
  components: {
    Hand,
  },
  props: {
    player: { type: Object },
  },
};
</script>

<style lang="css" scoped>
.player-info {
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 1.5em;
  color: white;
  margin: 2em;
}

.player-info p {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.25em;
  font-size: 1rem;
}
</style>
