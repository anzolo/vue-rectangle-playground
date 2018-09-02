<template>
<div class="rect-editor">
    <svg class="svg-canvas">
        <rect fill="#fc0" width="20" height="20"/>
        <line stroke="black" x1="0" y1="0" x2="20" y2="20"/>
    </svg>
</div>
</template>

<script>
export default {};
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
