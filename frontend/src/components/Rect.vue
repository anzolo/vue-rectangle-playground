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
        @click.stop="onClick"
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
  data: () => {
    return { bufX: null, byfY: null };
  },
  methods: {
    onMouseDown(e) {
      switch (this.$store.getters.mode) {
        case "normal":
          this.$store.commit("selectedRectId", this.id);
          this.$store.commit("mode", "dnd");
          this.$store.commit("goToFront", this.id)
          this.bufX = e.clientX;
          this.bufY = e.clientY;
          break;

        default:
          break;
      }
    },
    onClick(e) {
      this.$emit("clickInsideRect", e);
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
