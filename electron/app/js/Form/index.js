import { ElementTree } from "../../out/index.js";
const inputElement = (inputType, labelText, inputBindObject, inputBindPropertyName, valueType) => {
    return [
        {
            type: "div",
            attrs: {
                className: "form-group",
            },
            children: [
                {
                    type: "label",
                    text: labelText,
                },
                {
                    type: "input",
                    attrs: {
                        input: {
                            type: inputType,
                        },
                    },
                    bindInput: {
                        bindTo: inputBindObject,
                        objectPropertyName: inputBindPropertyName,
                        valueType: valueType,
                    },
                },
            ],
        },
    ];
};
const formValues = {
    number1: 0,
    number2: 0,
    text1: "text",
    text2: "text",
    checkbox: false,
};
ElementTree.linkCSS(import.meta.url, "index.css");
const cascadeProps = {};
const [cascade] = ElementTree.cascade(cascadeProps);
const formElement = () => {
    return [
        {
            type: "form",
            attrs: {
                className: "example-form",
            },
            cascade: {
                origin: cascadeProps,
                receiver: (form, cascadeProps) => {
                    console.table(formValues);
                },
            },
            children: [
                inputElement("number", "Number 1", formValues, "number1", "number"),
                inputElement("number", "Number 2", formValues, "number2", "number"),
                inputElement("text", "String 1", formValues, "text1", "string"),
                inputElement("text", "String 2", formValues, "text2", "string"),
                inputElement("checkbox", "Checkbox", formValues, "checkbox", "boolean"),
                {
                    type: "button",
                    events: {
                        onClick: () => {
                            cascade();
                        },
                    },
                    text: "submit",
                },
            ],
        },
    ];
};
const dataDisplay = () => {
    return [
        {
            type: "div",
            attrs: {
                className: "data-display",
            },
            text: JSON.stringify(formValues, undefined, 5),
            cascade: {
                origin: cascadeProps,
                receiver: (div, cascadeProps) => {
                    div.innerText = JSON.stringify(formValues, undefined, 5);
                },
            },
        },
    ];
};
ElementTree.bloomRoot([formElement(), dataDisplay()]);
