import type { ElementTreeData } from "../../../out/Meta/Elements/ElementTreeData.types";
export const PElement = (text: string, className: string): ElementTreeData => {
 return [
  {
   type: "p",
   attrs: {
    className: className,
   },
   text: text,
  },
 ];
};
