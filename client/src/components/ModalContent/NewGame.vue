<template>
  <form
    class="w-100 text-center"
    @submit.prevent="
      $socket.emit('createRoom', {
        maxPlayers: parseInt(maxPlayers),
        allowBots,
      })
    "
  >
    <div class="w-50 mx-auto">
      <label for="customRange"> Players: {{ maxPlayers }} </label>
      <input
        v-model="maxPlayers"
        class="form-range mt-2"
        id="customRange"
        type="range"
        step="1"
        max="7"
        min="2"
        ref="rangeInput"
      />
    </div>

    <div class="form-check form-check-inline my-4">
      <input
        class="form-check-input"
        id="flexCheckDefault"
        v-model="allowBots"
        type="checkbox"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Allow Bots
      </label>
    </div>

    <hr class="mt-3" />

    <submit-button text="Create Game" />
  </form>
</template>

<script>
import SubmitButton from "./SubmitButton";

export default {
  name: "NewGame",
  components: {
    SubmitButton,
  },
  data() {
    return {
      maxPlayers: 2,
      allowBots: true,
    };
  },
  mounted() {
    this.$refs.rangeInput.focus();
  },
};
</script>

<style lang="css" scoped></style>
