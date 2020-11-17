<template>
  <transition name="fade">
    <div class="text-center">
      <button
        class="btn btn-light mr-2"
        :class="{ disabled: !userCanPlay }"
        @click="dispatchEvent(true)"
      >
        Hit
      </button>
      <button
        class="btn btn-light"
        :class="{ disabled: !userCanPlay }"
        @click="dispatchEvent(false)"
      >
        Stand
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PlayerActions",
  props: {
    userCanPlay: { type: Boolean, default: false },
  },
  methods: {
    dispatchEvent(payload) {
      this.userCanPlay && this.$store.dispatch("userWantsCard", payload);
    },
  },
};
</script>

<style lang="css" scoped></style>
