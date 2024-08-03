<template>
  <div class="default-prompt-text" :title="names">
    <div class="parsing" v-if="parsing">Parsing...</div>
    <div v-else-if="count">{{count}} file{{count > 1 ? "s" : ""}}</div>
    <div v-else style="display: contents">
      <slot>Select file</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {FileInputState, WebFileEntry} from "../index";

const props = defineProps<{state: FileInputState}>();
const {
  count, fileEntries, parsing
} = props.state.private;

const names = computed(() => {
  const entries: WebFileEntry[] = fileEntries.value;
  return entries.slice(0, 50).map(file => file.name).join("\n");
});
</script>

<style scoped>
.default-prompt-text {
  width: inherit;
  height: inherit;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*
.default-prompt-text:hover {
  text-decoration: underline;
}
*/
</style>
