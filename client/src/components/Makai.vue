<template>
  <div class="makai">
    <Opponents />
    <LocalPlayer />
  </div>
</template>

<script>
import Opponents from "./Game/Opponents";
import LocalPlayer from "./Game/LocalPlayer";

export default {
  name: "Game",
  components: {
    Opponents,
    LocalPlayer,
  },
};
</script>

<style lang="css" scoped>
.makai {
  width: 100%;
  display: grid;
}
</style>
