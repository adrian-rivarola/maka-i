<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <p class="d-inline my-auto">
      <IsReadyIcon
        :isReady="player.isReady"
        v-if="$store.state.roomInfo.roundsPlayed === 0"
      />
      {{ player.isBot ? "[Bot] - " : "" }}
      {{ player.name }}
    </p>

    {{ player.gamesWon || "" }}
  </li>
</template>

<script>
import IsReadyIcon from "./IsReadyIcon";

export default {
  name: "PlayerDetails",
  components: { IsReadyIcon },
  props: ["player"]
};
</script>

<style lang="css" scoped>
li {
  background-color: inherit;
  border-color: #6c757d;
  border-left: none;
  border-right: none;
  font-size: 1rem;
}
</style>
