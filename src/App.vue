<template>
  <FileInput :state="state">
    <template v-slot:selected><FileInputSelectedInfo :state="state"/></template>
  </FileInput>
</template>

<script setup>
import {getStateInstance, FileInput, FileInputSelectedInfo} from "./file-input/index";
// or
// import {getStateInstance, FileInput, FileInputSelectedInfo} from "@alttiri/vue-file-input";


const state = getStateInstance({recursive: true, debug: true});
globalThis.state = state;
</script>

<style>

</style>
