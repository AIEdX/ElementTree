/* 

const cssModule = await import('./p.css', {
    assert: { type: 'css' }
  });

console.log(cssModule) */


import { ElementTree } from "../../../out/ElementTree.js";

ElementTree.registerCSS("p.css",import.meta.url);

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
