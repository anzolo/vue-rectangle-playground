<template>
    <rect
        class="rect"
        v-bind:class="{selected:$store.getters.selectedRectId===this.id}"
        :x="x"
        :y="y"
        :width="width"
        :height="height"
        :fill="color"
        @mousedown.stop="onMouseDown"
        @click.stop=""
    />
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    color: {
      type: String,
      default: "#000000"
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMouseDown(e) {
      this.$store.commit("selectedRectId", this.id);
      console.log("rect click", e);
    }
  }
};
</script>

<style lang="scss">
.rect {
  stroke: black;
  stroke-width: 1;
}
.selected {
  stroke-width: 10;
}
</style>
