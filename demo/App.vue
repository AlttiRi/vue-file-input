<template>
  <!-- just for tests -->
  <video src="#" style="background-color: aqua"> TEST </video>

  <!--<FileInput :state="state" :drop-zone-selector="'#app'">-->
  <FileInput :state="state" :global-drop-zone="true">
    <FileInputSelectedInfo :state="state"/>
  </FileInput>

  <div class="files">
    <div>Files:</div>
    <div v-for="e of state.fileEntries.value">{{e.name}} — {{formatSizeWinLike(e.size)}}</div>
  </div>

  <a class="readme" title="Open Readme" href="https://github.com/AlttiRi/vue-file-input" target="_blank"><i>i</i></a>
</template>

<script setup>
import {formatSizeWinLike} from "@alttiri/util-js";
import {getStateInstance, FileInput, FileInputSelectedInfo} from "../src/index.ts";
// or
// import {getStateInstance, FileInput, FileInputSelectedInfo} from "@alttiri/vue-file-input";


const state = getStateInstance({recursive: true, debug: true});
globalThis.state = state;
</script>

<style>
.files {
  padding: 6px 0;
}

.readme {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2px 8px;
  margin: 1px;
  color: darkgray;
  text-decoration: none;
}
</style>
