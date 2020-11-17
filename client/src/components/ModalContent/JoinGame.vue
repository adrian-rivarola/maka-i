<template>
  <form
    class="px-4 py-2 text-center"
    @submit.prevent="$socket.emit('joinRoom', gameId.trim().toLowerCase())"
  >
    <input
      class="form-control mb-3"
      placeholder="Room ID"
      autocapitalize="none"
      autocorrect="off"
      v-model="gameId"
      ref="userInput"
      required
    />
    <submit-button text="Join" />
  </form>
</template>

<script>
import SubmitButton from "./SubmitButton";

export default {
  name: "JoinRoom",
  components: {
    SubmitButton,
  },
  data() {
    return {
      gameId: "",
    };
  },
  mounted() {
    this.$refs.userInput.focus();
  },
};
</script>
