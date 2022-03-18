<h1 align="center">
  Element Tree
</h1>

<p align="center">
<img src="https://i.ibb.co/Hqf8tjz/ettree-jpg.png">
</p>

---

A simple TypeScript library for easily creating an interactive UI. It is specifically designed for Electron Apps. 

It requires no bundler or transpiler. It can be used with TypeScript or plain JS. 


Here is an example of how to use it:

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



logo credit:
[Human Vectors by Vecteezy](https://www.vecteezy.com/free-vector/human)



