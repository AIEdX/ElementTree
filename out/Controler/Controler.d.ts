import type { ElementTreeInterface } from "Meta/ElementTree.interface";
import { ElementTreeObject } from "Meta/Elements/ElementTreeData.types";
export declare class Controller {
    statefulObjectMap: Record<string, {
        parentElement: HTMLElement;
        state: any;
        props: any;
        component: Function;
    }>;
    cascadeObjectMap: Record<string, {
        elements: Map<HTMLElement, Function>;
        props: any;
    }>;
    releaseAll(): void;
    elementTree: ElementTreeInterface;
    registerStatefulComponent(elmObj: ElementTreeObject, parentElm: HTMLElement): void;
    generateCascadeId(props: any): any;
    registerCascadeElement(elmObj: ElementTreeObject, elm: HTMLElement): void;
    runCascade(props: any): boolean;
    releaseCascade(props: any): boolean;
    releaseElementFromCascade(id: string, elm: HTMLElement): boolean;
    __unqiueId4(): string;
    getId(): string;
    getStateObject<T>(id: string): T | false;
    getComponentElement(id: string): false | HTMLElement;
    runStateChange(props: any, newState: any, onChange?: Function): false | undefined;
}
