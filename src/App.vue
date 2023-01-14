<template>
  <FileInput :state="state"/>
</template>

<script setup>
import {FileInput, getStateInstance} from "./file-input/index.js";
// or
// // import {FileInput, getStateInstance} from "@alttiri/vue-file-input";


const state = getStateInstance({recursive: true});
globalThis.state = state;
</script>

<style>

</style>
