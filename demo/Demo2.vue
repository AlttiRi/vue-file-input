<script setup lang="ts">
import {getStateInstance, FileInput, FileInputSelectedInfo} from "../src/index.ts"; // "@alttiri/vue-file-input"
import {formatFileSizeWinLike} from "@alttiri/util-js";
import {computed, onBeforeUnmount, ref} from "vue";
import {textStyle} from "./core.ts";


console.log("%c[Demo2] The demo is opened.", textStyle);

const state = getStateInstance({recursive: true, debug: true});

// @ts-ignore
globalThis.state = state;
console.log("%c[Demo2] You can access `state` right here in console.", textStyle, state);

const blobUrls = new Set<string>();
const videSrc = computed((oldValue: string | undefined) => {
  if (oldValue) {
    URL.revokeObjectURL(oldValue);
    blobUrls.delete(oldValue);
  }
  const file = state.fileEntries.value[0];
  if (!file || !file.file.type.startsWith("video/")) {
    return "";
  }
  const blobUrl = URL.createObjectURL(file.file);
  blobUrls.add(blobUrl);
  return blobUrl;
});

const imgSrc = computed((oldValue: string | undefined) => {
  if (oldValue) {
    URL.revokeObjectURL(oldValue);
    blobUrls.delete(oldValue);
  }
  const file = state.fileEntries.value[0];
  if (!file || !file.file.type.startsWith("image/")) {
    return "";
  }
  const blobUrl = URL.createObjectURL(file.file);
  blobUrls.add(blobUrl);
  return blobUrl;
});
onBeforeUnmount(() => {
  blobUrls.forEach((blobUrl) => {
    URL.revokeObjectURL(blobUrl);
  });
});

const dropZone      = ref(true);
const limitDropZone = ref(false);
</script>

<template>
  <div class="c-Demo2" data-component="Demo2">

    <FileInput
        :state="state"
        :multiple="false"
        :accept="'video/*,image/*'"
        :global-drop-zone="dropZone"
        :drop-zone-selector="dropZone && limitDropZone ? '#app': null"
    >
      <FileInputSelectedInfo :state="state"/>
    </FileInput>

    <hr>
    <label>
      <input type="checkbox" name="drop-zone" v-model="dropZone">
      Global drop zone.
    </label>
    <hr>
    <label v-if="dropZone">
      <input type="checkbox" name="drop-selector" v-model="limitDropZone">
      Limit global drop zone by <strong>`#app`</strong>.
    </label>
    <hr v-if="dropZone">


    <video v-if="videSrc" :src="videSrc"></video>
    <img v-if="imgSrc" :src="imgSrc" alt="image file preview"/>


    <!-- multiple file from the drop -->
    <div class="files" v-if="state.fileEntries.value.length > 1">
      <div>Files:</div>
      <div v-for="e of state.fileEntries.value">{{e.name}} — {{formatFileSizeWinLike(e.size)}}</div>
    </div>
  </div>
</template>

<style scoped>
img, video {
  min-width: 480px;
  max-width: 100%;
}
.files {
  padding: 6px 0;
}
</style>