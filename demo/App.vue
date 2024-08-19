<template>
  <!-- just for tests -->
  <video src="#" style="background-color: aqua"> TEST </video>

  <FileInput :state="state" :global-drop-zone="false">
<!--    <FileInputSelectedInfo :state="state"/>-->
  </FileInput>

  <div class="files">
    <div>Files:</div>
    <div v-for="e of state.fileEntries.value">{{e.name}} — {{formatSizeWinLike(e.size)}}</div>
  </div>
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
</style>
