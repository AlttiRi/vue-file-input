<template>
  <div class="c-App" data-component="App">
    <label>
      <input type="radio" name="demo" value="demo-1" v-model="selectedDemo">
      <span>Demo1</span>
    </label>
    |
    <label>
      <input type="radio" name="demo" value="demo-2" v-model="selectedDemo">
      <span>Demo2</span>
    </label>
    <hr>

    <Demo1 v-if="selectedDemo === 'demo-1'"/>
    <Demo2 v-if="selectedDemo === 'demo-2'"/>

    <a class="readme" title="Open Readme" href="https://github.com/AlttiRi/vue-file-input" target="_blank"><i>i</i></a>
  </div>
</template>

<script setup>
import Demo1 from "./Demo1.vue";
import Demo2 from "./Demo2.vue";
import {ref} from "vue";

const selectedDemo = ref("demo-1");
</script>

<style scoped>
.c-App {
  padding: 20px;
  border: 1px solid #ccc;

  width: 100%;
  max-width: 100vw;
  min-width: 320px;

  min-height: 480px;
  align-self: start;
  margin-top: 20px;
}

@media (min-width: 720px) {
  .c-App {
    min-width: 480px;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
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
