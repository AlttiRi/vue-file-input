<script setup lang="ts">
import {getStateInstance, FileInput, WebFileEntry} from "../src/index.ts"; // "@alttiri/vue-file-input"
import {formatFileSizeWinLike} from "@alttiri/util-js";
import {computed, watchEffect} from "vue";
import {textStyle} from "./core.ts";


console.log("%c[Demo1] The demo is opened.", textStyle);

const state = getStateInstance({recursive: true, debug: true});

// @ts-ignore
globalThis.state = state;
console.log("%c[Demo1] You can access `state` right here in console.", textStyle, state);


watchEffect(() => {
  if (!state.fileEntries.value.length) {
    return;
  }
  console.log("%c↓↓↓ WebFileEntry ↓↓↓", "font-weight: bold;");
  for (const fe of state.fileEntries.value) {
    console.log(fe);
  }
});

function logState() {
  console.log(state);
}

const count = state.private.count;
const size = computed(() => {
  // folders precompute their content size on creating time
  return state.fileEntries.value.reduce((acc, val) => acc + val.size, 0);
});
const recCount = computed(() => {
  const flat = WebFileEntry.flat(state.fileEntries.value);
  const folderCount = flat.filter(f => f.type === "folder").length;
  return {
    any: flat.length,
    folders: folderCount,
    files: flat.length - folderCount,
  };
});
</script>

<template>
  <div class="c-Demo1" data-component="Demo1">
    <FileInput :state="state"/>
    <hr>
    <div>Open browser's console to access `<pre @click="logState">state</pre>` and see the debug logs.</div>
    <hr>
    <div>You can select <strong>files</strong> with the File Chooser,
      or drag & drop <strong>files</strong>/<strong>folders</strong> from File Explorer.
    </div>
    <div class="info" v-if="count">
      <hr>
      <div><strong>Size</strong></div>
      <div class="size-info">Total size of {{count}} selected item{{count === 1 ? '' : 's'}}: {{formatFileSizeWinLike(size)}} ({{size}})</div>
      <div v-if="recCount.folders">
        <hr>
        <div><strong>Recursive counts</strong></div>
        <div class="rec-info">
          <div>Total items: {{recCount.any}}</div>
          <div>Files:     {{recCount.files}}</div>
          <div>Folders: {{recCount.folders}}</div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  display: inline;
}
.size-info, .rec-info {
  padding-top: 5px;
  padding-left: 10px;
}
</style>
