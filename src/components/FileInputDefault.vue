<template>
  <div class="c-FileInputDefault" data-component="FileInputDefault">
    <span
        v-if="state.private.dropHover.value"
        class="content hover"
        data-slot="hover"
    >
      <slot name="hover">
        <FileInputDefaultHoverText :state="state"/>
      </slot>
    </span>
    <span
        v-else-if="state.private.file.value && !state.private.parsing.value"
        class="content selected"
        data-slot="selected"
    >
      <slot name="selected">
        <FileInputDefaultText :state="state"/>
      </slot>
    </span>
    <span
        v-else
        class="content prompt"
        data-slot="prompt"
    >
      <slot name="prompt">
        <FileInputDefaultText :state="state"/>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import FileInputDefaultHoverText from "./FileInputDefaultHoverText.vue";
import FileInputDefaultText      from "./FileInputDefaultText.vue";
import type {FileInputState} from "./file-input-state.ts";

defineProps<{
  state: FileInputState,
}>();
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>
