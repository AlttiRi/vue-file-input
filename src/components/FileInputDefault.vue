<template>
  <div>
    <span class="content hover" v-if="state.private.dropHover.value">
      <slot name="hover">
        <FileInputDefaultHoverText :state="state"/>
      </slot>
    </span>
    <span class="content selected" v-else-if="state.private.file.value && !state.private.parsing.value">
      <slot name="selected">
        <FileInputDefaultText :state="state"/>
      </slot>
    </span>
    <span class="content prompt" v-else>
      <slot name="prompt">
        <FileInputDefaultText :state="state"/>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import FileInputDefaultHoverText from "./FileInputDefaultHoverText.vue";
import FileInputDefaultText      from "./FileInputDefaultText.vue";
import {FileInputState} from "./file-input-state.ts";

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
