import type { Component } from "../../out/index.js";
import { ElementTree } from "../../out/index.js";

type AppComponentProps<T> = {
  stateObject: T;
};
type AppState = { i: number };
const boundInput = {
  text: "",
};

const appCascadeProps = { i: 0 };
ElementTree.register.add("cascade", appCascadeProps);
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
          element: "div",
        },
        children: [
          {
            type: "div",
            cascade: {
              origin: cascadeProps,
              receiver: (
                elm: HTMLElement,
                cascadeProps: typeof appCascadeProps
              ) => {
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
                  input: {
                    type: "text",
                  },
                },
                bindInput: {
                  bindTo: boundInput,
                  objectPropertyName: "text",
                  valueType: "string",
                },
              },
              {
                type: "p",
                text: "this is a test",
                cascade: {
                  origin: cascadeProps,
                  receiver: (
                    elm: HTMLElement,
                    cascadeProps: typeof appCascadeProps
                  ) => {
                    elm.innerText = `cascaded : ${cascadeProps.i}`;
                    cascadeProps.i++;
                  },
                },
              },
              {
                type: "p",
                text: "this is a test",
                cascade: {
                  origin: cascadeProps,
                  receiver: (
                    elm: HTMLElement,
                    cascadeProps: typeof appCascadeProps
                  ) => {
                    elm.innerText = `cascaded : ${cascadeProps.i}`;
                  },
                },
              },
              {
                type: "p",
                text: "state: " + state.i,
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
