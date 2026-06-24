import {computed, ComputedRef, Ref, ref, shallowRef, toRaw, watchEffect} from "vue";
import {WebFileEntry} from "./WebFileEntry.ts";
import {cssText} from "./core.ts";

/** Type for `input` element with exactly `[type="file"]`. */
export interface HTMLFileInputElement extends HTMLInputElement {
    files: FileList; // Since `HTMLInputElement` has `FileList | null`
}

export type FileInputStatePrivate = {
    inputElem:   Ref<HTMLFileInputElement | null>,
    fileEntries: Ref<WebFileEntry[]>,
    file:  ComputedRef<WebFileEntry>,
    count: ComputedRef<number>,

    dropHover: Ref<boolean>,
    dropHoverItemCount: Ref<number>,
    dropHoverTypes: Ref<string[]>,
    parsing: Ref<boolean>,

    setDataTransferHover(dt: DataTransfer | null): void,
    resetDataTransferHover(): void,
    setDataTransfer(dt: DataTransfer | null): void,
    setFiles(filelist: FileList, resetDataTransfer?: boolean): void,

    isNwDirectory: Ref<boolean>, // for NW.js development
}

export type FileInputState = {
    /** `Ref` of Readonly list of `WebFileEntry` items. */
    fileEntries: Ref<Readonly<WebFileEntry[]>>,
    /** Clear file selecting. */
    clearInput(): void,
    /** Things for advanced use. */
    private: FileInputStatePrivate,
}

declare const nw: any;
const isNW: boolean = typeof nw !== "undefined" && nw["process"]?.["__nwjs"] === 1;

function getLog(debug: boolean) {
    if (debug) {
        return console.log.bind(console, "%c[FileInput]", cssText);
    } else {
        return () => {};
    }
}

type StateOpts = {
    /** Enable listing files from subfolders. `false` by default. */
    recursive?: boolean,
    /** Enable debug console log. `false` by default. */
    debug?:     boolean,
}
type StateOptsDefault = {
    recursive: false,
    debug:     false,
}

export function getStateInstance(opts: StateOpts = {}): FileInputState {
    const defaultOpts: StateOptsDefault = {recursive: false, debug: false};
    Object.assign(defaultOpts, opts);
    const {recursive, debug} = defaultOpts;

    const fileEntries = shallowRef<WebFileEntry[]>([]);
    const files       = shallowRef<File[]>([]);
    const inputElem   = shallowRef<HTMLFileInputElement | null>(null);
    const dtItems        = shallowRef<DataTransferItem[]>([]);
    const dataTransfer   = shallowRef<DataTransfer | null>(null);
    const dropHoverTypes = shallowRef<string[]>([]);
    const dropHoverItemCount = ref<number>(0);
    const dropHover     = ref<boolean>(false);
    const parsing       = ref<boolean>(false);
    const isNwDirectory = ref<boolean>(false);

    const log = getLog(debug);

    watchEffect(async () => {
        const time: number = Date.now();
        parsing.value = true;
        if (dataTransfer.value) {
            log("[fromDataTransferItems]");
            fileEntries.value = await WebFileEntry.fromDataTransfer(dataTransfer.value, recursive, debug);
        } else
        if (isNW && isNwDirectory.value) {
            log("[isNwDirectory]");
            fileEntries.value = WebFileEntry.fromFiles(files.value, "folder");
        } else {
            log("[fromFiles]");
            fileEntries.value = WebFileEntry.fromFiles(files.value);
        }
        parsing.value = false;
        log("[WebFileEntry parsing][time]:", Date.now() - time, "ms");
        log("[fileEntries]", toRaw(fileEntries.value));
    });

    const file: ComputedRef<WebFileEntry> = computed(() => {
        return fileEntries.value[0];
    });

    const count: ComputedRef<number> = computed(() => {
        return fileEntries.value.length;
    });

    function setDataTransferHover(dt: DataTransfer | null) {
        if (!dt) {
            return;
        }
        const count:    number   = dt.items.length;
        const allTypes: string[] = [...dt.items].map(item => item.type);
        const types:    string[] = [...new Set(allTypes)];

        dropHoverItemCount.value = count;
        dropHoverTypes.value = types;
        log("[setDataTransferHover]:", count, types);
    }
    function resetDataTransferHover() {
        dropHoverItemCount.value = 0;
        dropHoverTypes.value = [];
    }

    function setDataTransfer(dt: DataTransfer | null) {
        if (!dt) {
            return;
        }
        log("setDataTransfer", dt);
        setFiles(dt.files, false);
        _setDtItems(dt.items);
        dataTransfer.value = dt;
    }
    function setFiles(filelist: FileList, resetDataTransfer: boolean = true) {
        const _files: File[] = [...filelist];
        files.value = _files;
        log("[setFiles]:", _files);
        if (resetDataTransfer) {
            dataTransfer.value = null;
            dtItems.value = [];
        }
    }
    function _setDtItems(items: DataTransferItemList) {
        const _dtItems: DataTransferItem[] = [...items];
        dtItems.value = _dtItems;
        log("[_setDtItems]:", _dtItems); // bug in chromium: `type` and `kind` is "" in the console when expand the array.
        log("[_setDtItems][0]:", {
            kind: _dtItems[0].kind, type: _dtItems[0].type
        });
    }

    function clearInput() {
        if (inputElem.value) {
            inputElem.value.value = "";
        }
        files.value = [];
        dataTransfer.value = null;
        dtItems.value = [];
    }

    return {
        fileEntries,
        clearInput,
        private: {
            dropHover, dropHoverItemCount, dropHoverTypes,
            fileEntries, parsing,
            file, count,
            setDataTransferHover, resetDataTransferHover,
            setDataTransfer, setFiles,
            isNwDirectory,
            inputElem,
        }
    };
}
