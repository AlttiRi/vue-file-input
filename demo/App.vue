<template>
  <!-- just for tests -->
  <video src="." style="background-color: aqua"> TEST </video>

  <FileInput :state="state">
    <FileInputSelectedInfo :state="state"/>
  </FileInput>
</template>

<script setup>
import {getStateInstance, FileInput, FileInputSelectedInfo} from "../src/index.ts";
// or
// import {getStateInstance, FileInput, FileInputSelectedInfo} from "@alttiri/vue-file-input";


const state = getStateInstance({recursive: true, debug: true});
globalThis.state = state;
</script>

<style>

</style>
