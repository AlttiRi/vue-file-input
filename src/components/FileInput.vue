<script setup lang="ts">
import {
  ref, toRefs, onMounted, computed, onBeforeUnmount, watchEffect,
  Ref, ComputedRef
} from "vue";
import FileInputDefault           from "./FileInputDefault.vue";
import FileInputDefaultHoverModal from "./FileInputDefaultHoverModal.vue";
import {FileInputState, HTMLFileInputElement} from "../index.ts";


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
  dropZone.value.addEventListener("dragenter", onDragOver);
  dropZone.value.addEventListener("dragover",  onDragOver);
  dropZone.value.addEventListener("dragleave", onDragLeave);
  dropZone.value.addEventListener("drop",      onDrop);
  document.body.addEventListener("dragenter",  onDragOverNonDropZone);
  document.body.addEventListener("dragover",   onDragOverNonDropZone);
}
function removeListeners() {
  if (!dropZone.value) {
    return;
  }
  dropZone.value.removeEventListener("dragenter", onDragEnter);
  dropZone.value.removeEventListener("dragenter", onDragOver);
  dropZone.value.removeEventListener("dragover",  onDragOver);
  dropZone.value.removeEventListener("dragleave", onDragLeave);
  dropZone.value.removeEventListener("drop",      onDrop);
  document.body.removeEventListener("dragenter",  onDragOverNonDropZone);
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
  if (globalDropZone.value && event.relatedTarget !== null) {
    return;
  }
  if (!dropHover.value) {
    dropHover.value = true;
  } else {
    return;
  }
  setDataTransferHover(event.dataTransfer);
}
function onDragLeave(event: DragEvent) {
  stopEvent(event);
  if (globalDropZone.value) {
    if (event.relatedTarget !== null) {
      return;
    }
  } else if (dropHover.value && dropZone.value?.contains(event.relatedTarget as Node)) {
    return;
  }
  dropHover.value = false;
  resetDataTransferHover();
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

<template>
  <div
    class="file-input" data-component="FileInput"
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
             :nwdirectory="nwdirectory"
             ref="templateInputElem"
      >
      <slot>
        <FileInputDefault :state="state"/>
      </slot>
    </label>
    <teleport to="body">
      <slot name="modal">
        <FileInputDefaultHoverModal :state="state"/>
      </slot>
    </teleport>
  </div>
</template>

<style>
:root {
  --drop-hover:        rgba(0,0,0,0.03);
  --drop-active:       rgba(0,0,0,0.06);
  --drop-file-hover:   rgba(0,0,0,0.06);
  --file-input-border: rgba(0,0,0,0.6);
}
</style>

<style scoped>
input {
  display: none;
}

.file-input {
  width:  100%;
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

label {
  display: flex;
  place-content: center;
  width: 100%;
  height: 100%;
}
[tabindex]:focus {
  outline: none;
  box-shadow: 0 0 2px grey;
}
</style>
