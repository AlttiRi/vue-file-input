export type WebFileEntryType = "file" | "folder";

export interface FileWithPath extends File {
    readonly path?: string;
}

type WebFileEntryConstructorInit = {
    file: File | FileWithPath
    type: WebFileEntryType
    name?: string
    parent?: WebFileEntry
};

export class WebFileEntry {
    private readonly file: FileWithPath | File;
    private readonly type: WebFileEntryType;
    private readonly parent: WebFileEntry | undefined;
    private readonly _name: string | undefined;
    private children: WebFileEntry[] | undefined;
    private _contentSize: number | undefined;
    constructor({file, type, name, parent}: WebFileEntryConstructorInit) {
        this.file = file;
        this.type = type;
        if (name) {
            this._name = name;
        }
        if (parent) {
            this.parent = parent;
            parent.addChild(this);
        }
    }

    get nativePath(): string | undefined {
        return "path" in this.file ? this.file.path : undefined;
    }

    get name(): string {
        return this._name || this.file.name;
    }

    private addChild(entry: WebFileEntry) {
        if (!this.children) {
            /** `undefined` if there is no child */
            this.children = [];
        }
        this.children.push(entry);
        this.increaseContentSize(entry.size);
    }

    private increaseContentSize(size: number) {
        if (!size) {
            return;
        }
        if (!this._contentSize) {
            this._contentSize = 0;
        }
        this._contentSize += size;
        if (this.parent/* && size*/) {
            this.parent.increaseContentSize(size);
        }
    }

    /** Note: the folder size is computed on the creation step. */
    get size(): number {
        if (this.type === "folder") {
            return this._contentSize || 0;
        }
        return this.file.size || 0;
    }

    get mtime(): number {
        return this.file.lastModified || 0;
    }

    get path(): WebFileEntry[] {
        if (!this.parent) {
            return [this];
        }
        return [...this.parent.path, this];
    }

    *[Symbol.iterator](): Generator<WebFileEntry> {
        yield this;
        if (this.children) {
            for (const child of this.children) {
                yield * child;
            }
        }
    }

    flat(): WebFileEntry[] {
        return [...this];
    }

    static flat(entries: WebFileEntry[]): WebFileEntry[] {
        return entries.map(e => [...e]).flat();
    }

    static async fromDataTransfer(dt: DataTransfer, recursive: boolean): Promise<WebFileEntry[]> {
        const dtItems: DataTransferItem[] = [...dt.items];
        const files: File[] = [...dt.files];

        const fileSystemEntries: FileSystemEntry[] = await dtItemsToFileSystemEntries(dtItems);
        console.log("[fileSystemEntries]:", fileSystemEntries);

        const result: WebFileEntry[] = [];
        for (const fileSystemEntry of fileSystemEntries) {
            const file: File | undefined = files.shift();
            if (!file) {
                console.warn("[fromDataTransfer] Empty files.shift");
                break;
            }
            const wfe: WebFileEntry | null = await fromFileSystemEntry(fileSystemEntry, undefined, recursive, file);
            if (wfe) {
                result.push(wfe);
            }
        }
        return result;
    }

    static fromFiles(files: File[], type: WebFileEntryType = "file"): WebFileEntry[] {
        const result: WebFileEntry[] = [];
        for (const file of files) {
            result.push(new WebFileEntry({type, file}));
        }
        return result;
    }
}

async function fromFileSystemEntry(fsEntry: FileSystemEntry, parent: WebFileEntry | undefined, recursive = false, file: File): Promise<WebFileEntry | null> {
    if (fsEntry.isFile) {
        try {
            const file = await toFile(fsEntry as FileSystemFileEntry); // as
            return new WebFileEntry({file, type: "file", parent});
        } catch (e) { // For example, for long path \\?\M:\... // todo: recheck
            console.error("[fromFileSystemEntry][error]", fsEntry.name, e);
            return null;
        }
    } else if (fsEntry.isDirectory && recursive) {
        const dirEntry = new WebFileEntry({type: "folder", parent, name: fsEntry.name, file});
        const entries: AsyncGenerator<FileSystemEntry> = readFileSystemDirectoryEntry(fsEntry as FileSystemDirectoryEntry); // as
        for await (const entry of entries) {
            // The entries will be attached to the parent (`dirEntry`).
            await fromFileSystemEntry(entry, dirEntry, recursive, file);
        }
        return dirEntry;
    } else {
        return new WebFileEntry({type: "folder", parent, name: fsEntry.name, file});
    }
}

/** Works only with a http server */
function toFile(fsFileEntry: FileSystemFileEntry): Promise<File> {
    return new Promise((resolve, reject) => fsFileEntry.file(resolve, reject));
}

async function * readFileSystemDirectoryEntry(fsDirEntry: FileSystemDirectoryEntry): AsyncGenerator<FileSystemEntry> {
    const reader = fsDirEntry.createReader();
    let part: FileSystemEntry[] = [];
    do {
        part = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
        for (const entry of part) {
            yield entry;
        }
    } while (part.length);
}

async function dtItemsToFileSystemEntries(dtItems: DataTransferItem[]): Promise<FileSystemEntry[]> {
    const result = [];
    for (const entry of dtItems) {
        result.push(await dtItemToFileSystemEntry(entry));
    }
    return result;
}

async function dtItemToFileSystemEntry(entry: DataTransferItem): Promise<FileSystemEntry> {
    return entry.webkitGetAsEntry()!; // !
}
