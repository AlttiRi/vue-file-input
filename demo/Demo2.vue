<script setup lang="ts">
import {
  getStateInstance, FileInput, FileInputSelectedInfo, WebFileEntry
} from "../src/index.ts"; // "@alttiri/vue-file-input"
import {formatFileSizeWinLike} from "@alttiri/util-js";
import {onBeforeUnmount, reactive, ref, watch} from "vue";
import {textStyle} from "./core.ts";


console.log("%c[Demo2] The demo is opened.", textStyle);

const state = getStateInstance({recursive: true, debug: true});

// @ts-ignore
globalThis.state = state;
console.log("%c[Demo2] You can access `state` right here in console.", textStyle, state);

// ---

const mediaDefault = {
  src: "",
  isVideo: false,
  isImage: false,
};
const media = reactive({...mediaDefault});

watch(state.fileEntries, () => {
  if (media.src !== "") {
    URL.revokeObjectURL(media.src);
    Object.assign(media, mediaDefault);
  }

  const file: WebFileEntry = state.fileEntries.value[0];
  if (!file) {
    return;
  }

  const mimeType = file.file.type;
  if (mimeType.startsWith("video/")) {
    media.isVideo = true;
  } else
  if (mimeType.startsWith("image/")) {
    media.isImage = true;
  } else {
    return;
  }

  media.src = URL.createObjectURL(file.file);
});

onBeforeUnmount(() => {
  URL.revokeObjectURL(media.src);
});

// ---

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

    <div v-if="!state.fileEntries.value.length">Select / Drop an image or a video.</div>


    <video v-if="media.isVideo" :src="media.src"></video>
    <img   v-if="media.isImage" :src="media.src" alt="image file preview"/>


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