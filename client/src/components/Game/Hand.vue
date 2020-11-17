<template>
  <transition-group name="deal" tag="div" class="hand">
    <card v-for="(card, i) in cards" :key="i + 1" :card="card" />
  </transition-group>
</template>

<script>
import Card from "./Card";

export default {
  name: "Hand",
  components: {
    Card
  },
  props: {
    cards: { type: Array }
  }
};
</script>

<style lang="css" scoped>
.hand {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  min-width: 22em;
  max-width: 24em;
  min-height: 11em;
}
.deal-enter-active {
  animation: deal 700ms;
}
.deal-leave-active {
  animation: deal 400ms reverse;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
