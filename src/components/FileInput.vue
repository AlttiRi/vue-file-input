<template>
  <div
      class="file-input" data-comp="FileInput"
      ref="fileInputElem"
      :class="{'drop-hover': dropHover}"
      tabindex="0"
      @keydown="onKeyDown"
  >
    <label>
      <input type="file"
             :accept="accept"
             :multiple="multiple"
             @change="onFileInputChange"
             style="display: none"
             :nwdirectory="nwdirectory"
             ref="templateInputElem"
      >

    <span class="content hover" v-if="dropHover">
      <slot name="hover"><FileInputDefaultHoverText :state="state"/></slot>
    </span>
      <span class="content selected" v-else-if="file && !parsing">
      <slot name="selected"><FileInputDefaultText :state="state"/></slot>
    </span>
      <span class="content prompt" v-else>
      <slot name="prompt"><FileInputDefaultText :state="state"/></slot>
    </span>

    </label>
    <teleport to="body">
      <div class="file-input-hover-modal" :class="{'drop-hover': dropHover}"></div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import FileInputDefaultHoverText from "./FileInputDefaultHoverText.vue";
import FileInputDefaultText      from "./FileInputDefaultText.vue";
import {FileInputState, HTMLFileInputElement} from "../index";

import {
  ref, toRefs, onMounted, computed, onBeforeUnmount, watchEffect,
  Ref, ComputedRef
} from "vue";

const templateInputElem: Ref<HTMLFileInputElement | null> = ref(null);

type IProps = {
  state: FileInputState,
  globalDropZone?: boolean,
  dropZoneSelector?: string | null,
  accept?: string,
  multiple?: boolean,
  nwdirectory?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
  globalDropZone: true,
  dropZoneSelector: null,
  accept: "*/*",
  multiple: true,
  nwdirectory: false,
});

const {
  globalDropZone,
  dropZoneSelector,
  nwdirectory,
} = toRefs(props);

const {
  parsing,
  file,
  dropHover,
  setFiles,
  setDataTransfer,
  setDataTransferHover,
  resetDataTransferHover,
  isNwDirectory,
  inputElem,
} = props.state.private;


watchEffect(() => {
  isNwDirectory.value = nwdirectory.value;
});
onMounted(() => {
  inputElem.value = templateInputElem.value;
});

function onFileInputChange(event: Event) {
  const fileElem = event.target as HTMLFileInputElement;
  setFiles(fileElem.files);
}

const fileInputElem: Ref<HTMLElement | null> = ref(null);

const dropZone: ComputedRef<HTMLElement | null> = computed(() => {
  if (dropZoneSelector.value) {
    return document.querySelector(dropZoneSelector.value);
  } else
  if (globalDropZone.value) {
    return document.body;
  }
  return fileInputElem.value;
});

onMounted(() => {
  initListeners();
});
onBeforeUnmount(() => {
  removeListeners();
});

function initListeners() {
  if (!dropZone.value) {
    return;
  }
  dropZone.value.addEventListener("dragenter", onDragEnter);
  dropZone.value.addEventListener("dragleave", onDragLeave);
  dropZone.value.addEventListener("drop",      onDrop);
  dropZone.value.addEventListener("dragover",  onDragOver);
  document.body.addEventListener("dragover",   onDragOverNonDropZone);
}
function removeListeners() {
  if (!dropZone.value) {
    return;
  }
  dropZone.value.removeEventListener("dragenter", onDragEnter);
  dropZone.value.removeEventListener("dragleave", onDragLeave);
  dropZone.value.removeEventListener("drop",      onDrop);
  dropZone.value.removeEventListener("dragover",  onDragOver);
  document.body.removeEventListener("dragover",   onDragOverNonDropZone);
}

function stopEvent(event: Event) {
  event.preventDefault();
  event.stopPropagation();
}

function onDrop(event: DragEvent) {
  stopEvent(event);
  dropHover.value = false;
  setDataTransfer(event.dataTransfer);
}
function onDragOver(event: DragEvent) {
  stopEvent(event);
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
}
function onDragEnter(event: DragEvent) {
  stopEvent(event);
  if (!dropHover.value) {
    dropHover.value = true;
  } else {
    return;
  }
  setDataTransferHover(event.dataTransfer);
}
function onDragLeave(event: DragEvent) {
  stopEvent(event);
  if (!dropZone.value?.contains(event.relatedTarget as Node)) {
    dropHover.value = false;
    resetDataTransferHover();
  }
}

function onDragOverNonDropZone(event: DragEvent) {
  if (!dropZone.value?.contains(event.target as Node)) {
    stopEvent(event);
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "none";
    }
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    fileInputElem.value?.querySelector("label")?.click();
  }
}

</script>

<style>
:root {
  --drop-hover:        rgba(0,0,0,0.03);
  --drop-active:       rgba(0,0,0,0.06);
  --drop-file-hover:   rgba(0,0,0,0.06);
  --file-input-border: rgba(0,0,0,0.6);
}
</style>

<style scoped>
.file-input, label, .content {
  width: 100%;
  height: 100%;
}

.file-input {
  transition: background-color 0.1s;
  border: solid 1px var(--file-input-border);
  box-sizing: border-box;
}
.file-input.drop-hover {
  background-color: var(--drop-file-hover);
  transition: background-color 0.1s;
}
.file-input:hover {
  background-color: var(--drop-hover);
}
.file-input:active {
  background-color: var(--drop-active);
}

.file-input-hover-modal {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0.005));

  transition: opacity 0.25s ease-out;
  opacity: 0;
}
.file-input-hover-modal.drop-hover {
  opacity: 1;
}
</style>










