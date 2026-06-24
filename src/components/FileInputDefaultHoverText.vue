<template>
  <div class="c-FileInputDefaultHoverText" data-component="FileInputDefaultHoverText"
  >{{text}}</div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import type {FileInputState} from "./file-input-state.ts";

const props = defineProps<{state: FileInputState}>();
const {
  dropHoverItemCount
} = props.state.private;

const text = computed(() => {
  const postfix = dropHoverItemCount.value > 1 ? "s" : "";
  return `Drop ${dropHoverItemCount.value} file${postfix}`;
});
</script>

<style scoped>
.c-FileInputDefaultHoverText {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
