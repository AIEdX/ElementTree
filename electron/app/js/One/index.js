import { ElementTree } from "../../out/index.js";
import { PElement } from "./Elements/PElement.js";
(() => {
    const boundInput = {
        text: "",
    };
    const test = PElement;
    const appCascadeProps = { i: 0 };
    ElementTree.register.add("cascade", appCascadeProps);
    const AppComponent = (props) => {
        const cascadeProps = ElementTree.register.get("cascade");
        const [cascade, releaseCascade] = ElementTree.cascade(cascadeProps);
        const [state, setState, stateProps] = ElementTree.stateful(props, props.stateObject, releaseCascade);
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
                                receiver: (elm, cascadeProps) => {
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
                                        receiver: (elm, cascadeProps) => {
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
                                        receiver: (elm, cascadeProps) => {
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
    const props = {
        stateObject: { i: 0 },
    };
    const [AppTree, setAppState] = AppComponent(props);
    ElementTree.bloomRoot(AppTree);
    let i = 0;
    setInterval(() => {
        i++;
        setAppState({ i: i });
    }, 2000);
})();
