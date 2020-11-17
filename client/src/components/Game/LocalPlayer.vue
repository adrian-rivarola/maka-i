<template>
  <div class="mx-auto mb-2" v-if="localPlayer">
    <Player :player="localPlayer" class="user-info mb-3" />
    <PlayerActions
      v-if="roundsPlayed > 0"
      :userCanPlay="!localPlayer.hasPlayed"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Player from "./Player";
import PlayerActions from "./PlayerActions";

export default {
  name: "LocalPlayer",
  components: {
    Player,
    PlayerActions,
  },
  computed: {
    ...mapGetters(["localPlayer", "roundsPlayed"])
  }
};
</script>
