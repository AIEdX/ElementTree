import { ElementAttributeList } from "Meta/Elements/ElementTreeData.types";

export const attributeSetFunction : Record<ElementAttributeList, Function> = {
    id: (elm: HTMLElement, id: string) => {
     elm.id = id;
    },
    className: (elm: HTMLElement, className: string) => {
     elm.className = className;
    },
    cssText: (elm: HTMLElement, cssText: string) => {
     elm.style.cssText = cssText;
    },
    name: (elm: HTMLInputElement, name: string) => {
     elm.name = name;
    },
    type: (elm: HTMLInputElement, type: string) => {
     elm.type = type;
    },
    dataSet: (elm: HTMLElement, id: string) => {},
    required: (elm: HTMLInputElement, set: boolean) => {
     elm.required = set;
    },
    checked: (elm: HTMLInputElement, set: boolean) => {
     elm.checked = set;
    },
   };