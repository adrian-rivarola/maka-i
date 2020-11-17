<template>
  <div class="game-buttons p-5">
    {{ username }}
    <svg
      @click="openModal('change-username')"
      @keypress.enter.space="openModal('change-username')"
      class="bi bi-pencil pointer text-secondary"
      tabindex="2"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
      />
      <path
        fill-rule="evenodd"
        d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
      />
    </svg>

    <hr />

    <button
      class="btn btn-success btn-lg btn-block mb-4"
      @click="openModal('new-game')"
    >
      Create Game
    </button>

    <button
      class="btn btn-info btn-lg btn-block"
      @click="openModal('join-game')"
    >
      Join Game
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "GameButtons",
  computed: mapState(["username"]),
  methods: mapActions(["openModal"]),
};
</script>

<style lang="css" scoped>
.game-buttons {
  width: 80%;
}
.pointer {
  cursor: pointer;
}
</style>
