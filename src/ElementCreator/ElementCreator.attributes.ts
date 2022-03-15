import {
 ElementAttributeList,
 ElementAttributes,
} from "Meta/Elements/ElementTreeData.types";

export const attributeSetFunction: Record<ElementAttributeList, Function> = {
 id: (elm: HTMLElement, id: string) => {
  elm.id = id;
 },
 className: (elm: HTMLElement, className: string) => {
  elm.className = className;
 },
 cssText: (elm: HTMLElement, cssText: string) => {
  elm.style.cssText = cssText;
 },
 target: (elm: HTMLFormElement, data: ElementAttributes) => {
  if (!data.target) return;
  elm.target = data.target;
 },
 inputs: (elm: HTMLInputElement, data: ElementAttributes) => {
  if (!data.inputs) return;
  if (data.inputs.type) {
   elm.type = data.inputs.type;
  }
 },
 forms: (elm: HTMLInputElement, data: ElementAttributes) => {
  if (!data.inputs) return;
  if (data.inputs.type) {
   elm.type = data.inputs.type;
  }
 },
 aria: (elm: HTMLInputElement, data: ElementAttributes) => {
  if (!data.inputs) return;
  if (data.inputs.type) {
   elm.type = data.inputs.type;
  }
 },
 dataSet: (elm: HTMLElement, id: string) => {},
};
