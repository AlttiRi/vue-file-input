<template>
  <FileInput :state="state">
    <template v-slot:selected><FileInputFileInfo :state="state"/></template>
  </FileInput>
</template>

<script setup>
import {FileInput, getStateInstance, FileInputFileInfo} from "./file-input/index";
// or
// import {FileInput, getStateInstance, FileInputFileInfo} from "@alttiri/vue-file-input";


const state = getStateInstance({recursive: true});
globalThis.state = state;
</script>

<style>

</style>
