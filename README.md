<h1 align="center">
  Element Tree
</h1>

<p align="center">
<img src="https://i.ibb.co/Hqf8tjz/ettree-jpg.png">
</p>

---

A simple TypeScript library for easily creating an interactive UI. It's goal is to be as close to vanilla JS/TS as possible. It is also more focused on making it easier to make desktop apps with tools like Electron. 

It requires no bundler, transpiler, or CLI. It can be used with TypeScript or vanilla JS. 

You can make stateful components as well as stateless elements. Stateless elements can still be updated with cascade. Another feature is loading CSS modules and auto adding them to the page. 

Check out the [wiki](https://github.com/Divine-Star-Software/ElementTree/wiki) and the **electron** folder to see all working examples. 

Here is a simple clock example: 

```ts
import { ElementTree } from "ElementTree.js";

(() => {
 const cascadeProps = {
  time: new Date().toLocaleTimeString(),
 };

 const [cascade] = ElementTree.cascade(cascadeProps);

 ElementTree.bloomRoot([
  {
   type: "p",
   cascade: {
    origin: cascadeProps,
    receiver: (elm: HTMLElement, props: typeof cascadeProps) => {
     elm.innerText = props.time;
    },
   },
   text : new Date().toLocaleTimeString()
  },
 ]);

 setInterval(() => {
  cascadeProps.time = new Date().toLocaleTimeString();
  cascade();
 }, 1000);
})();


```





