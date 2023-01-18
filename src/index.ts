export {default as FileInput}                 from "./components/FileInput.vue";
export {default as FileInputDefaultText}      from "./components/FileInputDefaultText.vue";
export {default as FileInputDefaultHoverText} from "./components/FileInputDefaultHoverText.vue";
export {default as FileInputSelectedInfo}     from "./components/FileInputSelectedInfo.vue";

export {WebFileEntry} from "./components/WebFileEntry";

export {getStateInstance} from "./components/file-input-state";
export type {
    HTMLFileInputElement,
    FileInputState,
    FileInputStatePrivate
} from "./components/file-input-state";


// Deprecated. Use `FileInputSelectedInfo`.
export {default as FileInputFileInfo} from "./components/FileInputSelectedInfo.vue";
