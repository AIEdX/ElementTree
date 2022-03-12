import type { Component } from "../../out/Meta/Components/Component.type";

import { ElementTree } from "../../out/ElementTree.js";
(() => {

 type AppComponentProps<T> = {
  stateObject: T;
 };
 type AppState = { i: number };

 const boundInput = {
  text: "",
 };
 const cascadeProps = { i: 0 };
 ElementTree.register.add("cascade", cascadeProps);
 const AppComponent: Component<AppState> = (
  props: AppComponentProps<AppState>
 ) => {
  const cascadeProps = ElementTree.register.get("cascade");
  const [cascade, releaseCascade] = ElementTree.cascade(cascadeProps);
  const [state, setState, stateProps] = ElementTree.stateful<
   AppComponentProps<AppState>,
   AppState
  >(props, props.stateObject, releaseCascade);

  return [
   [
    {
     type: "component",
     component: {
      func: AppComponent,
      stateProps: stateProps,
      stateObject: state,
     },
     children: [
      {
       type: "div",
       cascade: {
        origin: cascadeProps,
        receiver: (elm: HTMLElement, cascadeProps: any) => {
         cascadeProps.i++;
        },
       },
       events: {
        onClick: () => {
         cascade();
        },
       },
       children: [
        {
         type: "input",
         attrs: {
          type: "text",
         },
         bindInput: {
          bindTo: boundInput,
          objectPropertyName: "text",
          valueType: "string",
         },
        },
        {
         type: "p",
         cascade: {
          origin: cascadeProps,
          receiver: (elm: HTMLElement, cascadeProps: any) => {
           elm.innerText = `cascaded : ${cascadeProps.i}`;
           cascadeProps.i++;
          },
         },
         children: [
          {
           type: "text",
           text: "this is a test",
          },
         ],
        },
        {
         type: "p",
         cascade: {
          origin: cascadeProps,
          receiver: (elm: HTMLElement, cascadeProps: any) => {
           elm.innerText = `cascaded : ${cascadeProps.i}`;
          },
         },
         children: [
          {
           type: "text",
           text: "this is a test",
          },
         ],
        },
        {
         type: "p",
         children: [
          {
           type: "text",
           text: "state: " + state.i,
          },
         ],
        },
       ],
      },
     ],
    },
   ],
   setState,
  ];
 };

 const props: AppComponentProps<AppState> = {
  stateObject: { i: 0 },
 };

 const [AppTree, setAppState] = AppComponent(props);
 ElementTree.bloomRoot(AppTree);

 let i = 0;
 setInterval(() => {
  i++;
  setAppState({ i: i });
 }, 2000);

 (window as any).ElementTree = ElementTree;
})();
