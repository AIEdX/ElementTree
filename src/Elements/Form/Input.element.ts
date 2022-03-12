import type { ElementTreeElement } from "Meta/Elements/ElementTreeElement.types.js";

export type InputElement = {
 inputType : string;
 inputName: string;
 inputClass: string;
 labelText: string;
 labelClass: string;
};

export const InputElement: ElementTreeElement = (
 props: InputElement
) => {
 return [
  {
   type: "div",
   children: [
    {
     type: "label",
     text: props.labelText,
     attrs: {
      className: props.labelClass,
     },
    },
    {
     type: "input",
     attrs: {
      className: props.inputClass,
      name: props.inputName,
      type : props.inputType
     },
     events: {
      onInput: (e: InputEvent) => {},
     },
    },
   ],
  },
 ];
};
