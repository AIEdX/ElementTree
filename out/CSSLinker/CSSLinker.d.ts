export declare class CSSLinker {
    loadedCSS: Record<string, boolean>;
    loadAndAppendCSS(path: string, moduleMetaURL: string): Promise<void>;
}
