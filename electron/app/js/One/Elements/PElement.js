/*

const cssModule = await import('./p.css', {
    assert: { type: 'css' }
  });

console.log(cssModule) */
import { ElementTree } from "../../../out/ElementTree.js";
ElementTree.linkCSS(import.meta.url, "p.css");
export const PElement = (text, className) => {
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
