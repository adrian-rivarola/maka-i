<template>
  <div class="card" :class="{ 'face-down': !card.number }">
    <div class="front">
      <div class="card-number">
        {{ card.number }}
      </div>
      <div class="card-suit">
        <img
          v-if="card.suit"
          :class="card.suit"
          :src="suitSvg"
          :alt="card.toString"
          :title="card.toString"
        />
      </div>
    </div>
    <div class="back" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["card"],
  computed: {
    suitSvg() {
      return require(`@/assets/${this.card.suit}.png`);
    },
  },
};
</script>

<style lang="css">
.card {
  display: inline-block;
  position: relative;
  background: inherit;
  margin: 0.25em;
  border: none;
  width: 6em;
  height: 9em;
  transition: all 0.2s ease;
}
.card .front,
.card .back {
  border: 1px solid #ccc;
  border-radius: 0.75em;
  position: absolute;
  padding: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transition-delay: 0.5s;
  transform-style: preserve-3d;
}
.card .front {
  background-color: #fff;
}
.card .back {
  transform: rotateY(-180deg);
  background-color: rgba(255, 255, 255, 0.25);
  background-image: url("../../assets/card-back.svg");
}
.card.face-down .back {
  transform: rotateY(0deg);
}
.card.face-down .front {
  transform: rotateY(180deg);
}
.card-number {
  position: absolute;
  color: #111;
  margin: 0;
  z-index: 100;
  padding-left: 0.3em;
  font-size: 2em;
}
.user-info .card-number {
  font-size: 1.75em;
  font-weight: lighter;
}
@media (min-width: 650px) {
.card-number {
  font-weight: lighter;
  }
}
.card-suit {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coins {
  height: 5em;
  margin-top: 1em;
}
.cups {
  height: 5em;
}
.swords,
.clubs {
  height: 7em;
  transform: rotateX(0deg) rotate(20deg);
}
</style>
