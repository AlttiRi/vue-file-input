<script setup lang="ts">
import {
  getStateInstance, FileInput, FileInputSelectedInfo, WebFileEntry
} from "../src"; // "@alttiri/vue-file-input"
import {formatFileSizeWinLike} from "@alttiri/util-js";
import {onBeforeUnmount, ref} from "vue";
import {textStyle} from "./core.ts";
import MediaPreview from "./MediaPreview.vue";


console.log("%c[Demo2] The demo is opened.", textStyle);

const state = getStateInstance({recursive: true, debug: true});

// @ts-ignore
globalThis.state = state;
console.log("%c[Demo2] You can access `state` right here in console.", textStyle, state);
onBeforeUnmount(() => { // @ts-ignore
  delete globalThis.state;
});

// ---

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
        :drop-zone-selector="dropZone && limitDropZone ? '[data-component=\'App\']': null"
    >
      <FileInputSelectedInfo :state="state"/>
    </FileInput>

    <hr>
    <label>
      <input type="checkbox" name="drop-zone" v-model="dropZone">
      Global drop zone.
    </label>
    <hr>
    <div class="drop-zone-limiter" v-if="dropZone">
      <label v-if="dropZone">
        <input type="checkbox" name="drop-selector" v-model="limitDropZone">
        Limit global drop zone by
      </label><strong class="select-all">[data-component="App"]</strong>.
      <hr>
    </div>


    <div v-if="!state.fileEntries.value.length">Select / Drop an image or a video.</div>
    <MediaPreview :state/>

    <!-- multiple file from the drop -->
    <div class="files" v-if="state.fileEntries.value.length > 1">
      <div>Files:</div>
      <div v-for="e of state.fileEntries.value">{{e.name}} — {{formatFileSizeWinLike(e.size)}}</div>
    </div>
  </div>
</template>

<style scoped>
[data-component="FileInput"] {
  min-height: 42px;
}

[data-component="MediaPreview"]::v-deep(img, video) {
  min-width: 480px;
  max-width: 100%;
}

.files {
  padding: 6px 0;
}

.select-all {
  user-select: all;
}
</style>