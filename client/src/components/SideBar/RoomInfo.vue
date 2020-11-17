<template>
  <div class="room-info">
    <h4>Room ID: {{ roomInfo.roomId }}</h4>

    <div class="details">
      {{ players.length }}/{{ roomInfo.maxPlayers }} players
    </div>

    <ul class="list-group my-4">
      <transition-group name="list">
        <PlayerDetails
          v-for="player in players"
          :key="player.name"
          :player="player"
        />
      </transition-group>
    </ul>

    <room-actions />
  </div>
</template>

<script>
import { mapState } from "vuex";

import RoomActions from "./RoomInfo/RoomActions";
import PlayerDetails from "./RoomInfo/PlayerDetails";

export default {
  components: {
    PlayerDetails,
    RoomActions,
  },
  computed: mapState(["players", "roomInfo"]),
};
</script>

<style lang="css" scoped>
.room-info {
  width: 80%;
  color: white;
  text-align: center;
}

.details {
  color: #bbb;
}
</style>
