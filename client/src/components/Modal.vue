<template>
  <div class="modal d-block" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-capitalize">
            {{ modalContent.split("-").join(" ") }}
          </h5>
          <button type="button" class="close" @click="goBack()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <component :is="modalContent" v-cloak />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NewGame from "./ModalContent/NewGame";
import JoinGame from "./ModalContent/JoinGame";
import ChangeUsername from "./ModalContent/ChangeUsername";

export default {
  name: "Modal",
  components: {
    NewGame,
    JoinGame,
    ChangeUsername,
  },
  computed: mapState(["modalContent"]),
  methods: {
    escapeKeyHandler(ev) {
      ev.key === "Escape" && window.history.back();
    },
    goBack() {
      window.history.back();
    },
  },
  mounted() {
    window.addEventListener("keydown", this.escapeKeyHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.escapeKeyHandler);
  },
};
</script>

<style lang="css">
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
