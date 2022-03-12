import type { ElementTreeInterface } from "Meta/ElementTree.interface.js";
import type {
 ElementTreeData,
 ElementTreeObject,
 InputValueTypes,
} from "Meta/Elements/ElementTreeData.types";
import { attributeSetFunction } from "./ElementCreator.attributes.js";
import { elementCreateFunctions } from "./ElementCreator.elements.js";
import { elementEventFunctions } from "./ElementCreator.events.js";

export class ElementCreator {
 attributeSetFunction = attributeSetFunction;
 elementCreateFunctions = elementCreateFunctions;
 elemntEventFunctions = elementEventFunctions;

 elementTree: ElementTreeInterface;

 inputFunctions: Record<InputValueTypes, (elm: HTMLInputElement) => void> = {
  string: (elm: HTMLInputElement) => {
   return String(elm.value);
  },
  number: (elm: HTMLInputElement) => {
   return Number(elm.value);
  },
  boolean: (elm: HTMLInputElement) => {
   return Boolean(elm.value);
  },
 };

 constructor() {}

 _traverseElementTree(
  tree: ElementTreeData,
  parentElm: HTMLElement | DocumentFragment
 ) {
  for (const elmObj of tree) {
   if (Array.isArray(elmObj)) {
    this._traverseElementTree(elmObj, parentElm);
    continue;
   }
   if (elmObj.type == "component" && elmObj.children) {
    if (elmObj.component) {
     const id = elmObj.component.stateProps.__id;
     if (id) {
      const component = this.elementTree.controller.getComponentElement(id);
      if (component) {
       this._traverseElementTree(elmObj.children, parentElm);
       continue;
      }
     }
    }

    if ((parentElm as any).tagName == "component") {
     this._traverseElementTree(elmObj.children, parentElm);
     continue;
    } else {
     const elm = this.elementCreateFunctions[elmObj.type](elmObj, this);
     this._traverseElementTree(elmObj.children, elm);
     parentElm.append(elm);
    }
    continue;
   }
   const elm = this.elementCreateFunctions[elmObj.type](elmObj, this);

   if (elmObj.cascade) {
    this.elementTree.controller.registerCascadeElement(elmObj, elm);
   }

   if (elmObj.bindInput) {
    (elm as HTMLInputElement).dataset["value_type"] =
     elmObj.bindInput.valueType;
    const bound = elmObj.bindInput.bindTo;
    const boundKey = elmObj.bindInput.objectPropertyName;
    (elm as HTMLInputElement).value = bound[boundKey];
    (elm as HTMLInputElement).addEventListener("input", (ev) => {
     if (!ev.target) return;
     const target: any = ev.target;
     const valueType: InputValueTypes = target.dataset["value_type"];
     if (!valueType) return;
     const newInput = this.inputFunctions[valueType](target);
     bound[boundKey] = newInput;
    });
   }

   if (elmObj.toRef) {
    elmObj.toRef.refObj[elmObj.toRef.refObjProperty] = elm;
   }

   if (elmObj.attrs) {
    for (const attribute of Object.keys(elmObj.attrs)) {
     const value = (elmObj as any).attrs[attribute];
     (this as any).attributeSetFunction[attribute](elm, value);
    }
   }

   if (elmObj.events) {
    for (const event of Object.keys(elmObj.events)) {
     (this as any).elemntEventFunctions[event](elm, elmObj);
    }
   }

   if (elmObj.text) {
    elm.innerText = elmObj.text;
   } else if (elmObj.children) {
    this._traverseElementTree(elmObj.children, elm);
   }

   parentElm.append(elm);
  }
 }

 createElements(tree: ElementTreeData, parentElm: HTMLElement) {
  const frag = document.createDocumentFragment();
  this._traverseElementTree(tree, frag);
  parentElm.append(frag);
 }
}
