<script setup lang="ts">
import {FileInputState} from "./file-input-state.ts";

defineProps<{
  state: FileInputState,
}>();
</script>

<template>
  <div
      data-component="FileInputDefaultHoverModal"
      class="file-input-hover-modal"
      :class="{'drop-hover': state.private.dropHover.value}"
  >
    <div class="bottom-shadow"></div>
  </div>
</template>

<style scoped>
.file-input-hover-modal {
  height: 100%;
  width: 100%;
  position: fixed;
  pointer-events: none;
  transition: opacity 0.25s ease-out;
  opacity: 0;
}
.file-input-hover-modal.drop-hover {
  opacity: 1;
}
.file-input-hover-modal .bottom-shadow {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-image: linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0.005));
}
</style>