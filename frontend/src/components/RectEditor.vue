<template>
<div class="rect-editor">
    <svg tabindex="0" class="svg-canvas" @click="onCanvasClick" @keyup.delete="onDeletePress">
        <custom-rect v-for="rect in $store.getters.rectangles" v-bind="rect"/>
    </svg>
</div>
</template>

<script>
import Rect from "./Rect.vue";
export default {
  components: {
    "custom-rect": Rect
  },
  computed: {},
  methods: {
    onCanvasClick(e) {
      console.log("canvas click", e);
    },
    onDeletePress() {
      this.$store.dispatch("deleteRect");
    }
  }
};
</script>

<style lang="scss">
.rect-editor {
  .svg-canvas {
    display: block;
    width: 100vw;
    height: 100vh;
  }
}
</style>
