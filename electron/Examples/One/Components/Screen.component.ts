import type { Component } from "../../../out/Meta/Components/Component.type";
import { ElementTree } from "../../../out/ElementTree";

type AppComponentProps<T> = {
 stateObject: T;
};
type AppState = { i: number };

const AppComponent: Component<AppState> = (
 props: AppComponentProps<AppState>
) => {
 const [state, setState, stateProps] = ElementTree.stateful<
  AppComponentProps<AppState>,
  AppState
 >(props, props.stateObject);

 return [
  [
   {
    type: "component",
    component: {
     func: AppComponent,
     stateProps: stateProps,
     stateObject: state,
    },
    children: [],
   },
  ],
  setState,
 ];
};
