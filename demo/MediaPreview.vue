<script setup lang="ts">
import {onBeforeUnmount, reactive, watch} from "vue";
import {FileInputState, WebFileEntry} from "../src";

const {state} = defineProps<{
  state: FileInputState
}>();


const mediaDefault = {
  src: "",
  isVideo: false,
  isImage: false,
};
const media = reactive({...mediaDefault});

watch(state.fileEntries, () => {
  if (media.src !== "") {
    URL.revokeObjectURL(media.src);
    Object.assign(media, mediaDefault);
  }

  const file: WebFileEntry = state.fileEntries.value[0];
  if (!file) {
    return;
  }

  const mimeType = file.file.type;
  if (mimeType.startsWith("video/")) {
    media.isVideo = true;
  } else
  if (mimeType.startsWith("image/")) {
    media.isImage = true;
  } else {
    return;
  }

  media.src = URL.createObjectURL(file.file);
});

onBeforeUnmount(() => {
  URL.revokeObjectURL(media.src);
});

</script>

<template>
<div class="c-MediaPreview" data-component="MediaPreview">
  <video v-if="media.isVideo" :src="media.src"></video>
  <img   v-if="media.isImage" :src="media.src" alt="image file preview"/>
</div>
</template>

<style scoped>

</style>