<script setup lang="ts">
import {getStateInstance, FileInput} from "../src/index.ts"; // "@alttiri/vue-file-input"
import {toRaw, watchEffect} from "vue";
import {textStyle} from "./core.ts";


console.log("%c[Demo1] The demo is opened.", textStyle);

const state = getStateInstance({recursive: true, debug: true});

// @ts-ignore
globalThis.state = state;
console.log("`%c[Demo1] You can access `state` right here in console.`", textStyle, state);


watchEffect(() => {
  if (!state.fileEntries.value.length) {
    return;
  }
  console.log("%c↓↓↓ WebFileEntry ↓↓↓", "font-weight: bold;");
  for (const fe of state.fileEntries.value) {
    console.log(toRaw(fe));
  }
});

function logState() {
  console.log(state);
}
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
  </div>
</template>

<style scoped>
pre {
  display: inline;
}
</style>
