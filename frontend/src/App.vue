<template>
  <div id="app">
    <rect-editor />
  </div>
</template>

<script>
import "./assets/normalize.css";
import RectEditor from "./components/RectEditor.vue";

export default {
  name: "app",
  components: {
    RectEditor
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
