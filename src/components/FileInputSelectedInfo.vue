<template>
  <span data-component="FileInputSelectedInfo">
    <span class="file-info" v-if="file">
      <span class="file-name" :title="file.name">{{file.name}}</span>
      <span class="file-size" :title="file.size.toString()">{{bytesToSizeWinLike(file.size)}}</span>
      <span class="file-mtime" v-if="file.mtime">{{dateToDayDateTimeString(file.mtime, false)}}</span>
    </span>
    <span v-else-if="state.private.dropHover.value">Drop it</span>
    <span v-else>No file selected</span>
  </span>
</template>

<script setup lang="ts">
import {bytesToSizeWinLike, dateToDayDateTimeString} from "@alttiri/util-js";
import {FileInputState} from "../index.ts";

const props = defineProps<{state: FileInputState}>();
const {
  file
} = props.state.private;
</script>

<style scoped>
.file-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
}
.file-info > * {
  padding: 4px 12px;
}
.file-info .file-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.file-info .file-mtime {
  opacity: 0.9;
}
</style>
