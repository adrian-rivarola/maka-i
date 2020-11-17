<template>
  <button
    class="btn btn-success"
    :class="className"
    @click="className = 'disabled'"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    text: {
      type: String,
      default: "Submit",
    },
  },
  data() {
    return {
      className: "",
    };
  },
};
</script>
