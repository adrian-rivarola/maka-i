<template>
  <div class="d-flex flex-column justify-content-center">
    <button
      class="btn btn-warning mx-auto mb-4"
      @click.once="$store.dispatch('addBots')"
      v-if="userCanAddBot"
    >
      Add bots
    </button>

    <div>
      <button
        class="btn btn-success mr-3"
        :class="{ disabled: userIsReady }"
        @click="$store.dispatch('setReady')"
        v-if="roundsPlayed === 0"
      >
        {{ userIsReady ? "Waiting..." : "Ready!" }}
      </button>

      <button class="btn btn-danger" @click="$store.dispatch('leaveRoom')">
        Leave Room
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RoomActions",
  computed: mapGetters(["userIsReady", "userCanAddBot", "roundsPlayed"]),
};
</script>

<style lang="css"></style>
