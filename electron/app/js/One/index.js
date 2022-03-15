import { ElementTree } from "../../out/index.js";
(() => {
    const boundInput = {
        text: "",
    };
    const cascadeProps = { i: 0 };
    ElementTree.register.add("cascade", cascadeProps);
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
                                        inputs: {
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
                                    cascade: {
                                        origin: cascadeProps,
                                        receiver: (elm, cascadeProps) => {
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
                                        receiver: (elm, cascadeProps) => {
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
