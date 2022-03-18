/*

const cssModule = await import('./p.css', {
    assert: { type: 'css' }
  });

console.log(cssModule) */
import { ElementTree } from "../../../out/ElementTree.js";
ElementTree.registerCSS("p.css", import.meta.url);
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
