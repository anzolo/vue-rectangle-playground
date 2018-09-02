<template>
<div class="rect-editor">
    <svg
        tabindex="0"
        class="svg-canvas"
        @click="onCanvasClick"
        @keyup.delete="onDeletePress"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
    >
        <custom-rect v-for="rect in $store.getters.rectangles" v-bind="rect" :key="rect.id"/>
        <custom-rect
            v-if="mode==='create'"
            :x="x"
            :y="y"
            :height="height"
            :width="width"
            :id="id"
            :color="color"
            @clickInsideRect="clickInsideRect"
        />
    </svg>
</div>
</template>

<script>
import Rect from "./Rect.vue";
export default {
  components: {
    "custom-rect": Rect
  },
  data: () => {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      id: "new-rect",
      color: "black",
      startX: null,
      startY: null
    };
  },
  mounted: function() {
      this.$store.dispatch("loadRects");
  },
  computed: {
    mode() {
      return this.$store.getters.mode;
    }
  },
  methods: {
    onCanvasClick(e) {
      switch (this.mode) {
        case "normal": // switch on mode of rectangle creation
          this.$store.commit("mode", "create");
          this.resetNewRect();
          this.startX = this.x = e.clientX;
          this.startY = this.y = e.clientY;
          this.color = this.getRandomColor();
          break;
        case "create": // switch off mode and save new rectangle
          this.$store.dispatch("createRect", {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            color: this.color
          });
          this.$store.commit("mode", "normal");
          break;

        default:
          break;
      }
    },
    onMouseMove(e) {
      switch (this.mode) {
        case "create": // redraw new rectangle with calculated width and height
          const newX = e.clientX;
          const newY = e.clientY;
          let newWidth = e.clientX - this.x;
          let newHeight = e.clientY - this.y;

          if (newX < this.startX) {
            this.x = newX;
            newWidth = this.startX - this.x;
          }
          if (newY < this.startY) {
            this.y = newY;
            newHeight = this.startY - this.y;
          }
          this.width = newWidth;
          this.height = newHeight;
          break;
        case "dnd":
          this.$store.commit("updateRectCoordinates", {
            id: this.$store.getters.selectedRectId,
            x: e.clientX,
            y: e.clientY
          });
          break;

        default:
          break;
      }
    },
    onMouseUp(e) {
      switch (this.$store.getters.mode) {
        case "dnd":
          this.$store.commit("mode", "normal");
          this.$store.dispatch("updateRectCoordinatesOnServer");
          break;

        default:
          break;
      }
    },
    resetNewRect() {
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.color = "black";
    },
    onDeletePress() {
      this.$store.dispatch("deleteRect");
    },
    clickInsideRect(e) {
      this.onCanvasClick(e);
    },

    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
