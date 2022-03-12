import { ElementTreeData } from "Meta/Elements/ElementTreeData.types.js";
import { ElementTreeInterface } from "Meta/ElementTree.interface.js";
import { Controller } from "./Controler/Controler.js";
import { ElementCreator } from "./ElementCreator/ElementCreator.js";
export declare const ElementTree: {
    controller: Controller;
    elementCreator: ElementCreator;
    bloomRoot: (this: ElementTreeInterface, tree: ElementTreeData) => void;
    bloomBranch: (this: ElementTreeInterface, tree: ElementTreeData, elm: HTMLElement) => void;
    stateful: <K, T>(props: K, data: T, onChange?: Function) => [T, (set: Record<keyof T, any>) => void, K];
    cascade: (props: any) => [() => boolean, () => boolean];
    register: {
        __register: Record<string, any>;
        add: (id: string, props: any) => boolean;
        get: (id: string) => any;
        release: (id: string) => boolean;
    };
};
