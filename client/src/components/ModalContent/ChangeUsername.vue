<template>
  <form
    @submit.prevent="$socket.emit('setUsername', inputVal)"
    class="px-5 py-2 text-center"
  >
    <input
      type="text"
      class="form-control mb-3 mx-auto "
      v-model="inputVal"
      placeholder="Username:"
      ref="userInput"
    />
    <button
      class="btn btn-success"
      :class="{ disabled: disabled }"
      @click="disabled = true"
    >
      Submit
    </button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UsernameInput",
  computed: mapState(["username"]),
  data() {
    return {
      inputVal: "",
      disabled: false,
    };
  },
  mounted() {
    this.inputVal = this.username;
    this.$refs.userInput.focus();
  },
};
</script>
