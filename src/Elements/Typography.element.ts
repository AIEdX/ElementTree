import type { ElementTreeElement } from "Meta/Elements/ElementTreeElement.types.js";


type TypographyProps = {
 text: string;
};


export const Typography: ElementTreeElement = (props: TypographyProps) => {
 const refObj: { p: null | HTMLParagraphElement } = { p: null };
 const test = {i : 0}
 return [
  {
   type: "p",
   toRef: {
    refObj: refObj,
    refObjProperty: "p",
   },
   events: {
    onClick: () => {
     if (refObj.p) {
      test.i++;
      refObj.p.innerText = `${test.i}`;
     }
    },
   },
   children: [
    {
     type: "text",
     text: props.text,
    },
   ],
  },
 ];
};
