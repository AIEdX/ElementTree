export const InputElement = (props) => {
    return [
        {
            type: "div",
            children: [
                {
                    type: "label",
                    text: props.labelText,
                    attrs: {
                        className: props.labelClass,
                    },
                },
                {
                    type: "input",
                    attrs: {
                        className: props.inputClass,
                        name: props.inputName,
                        type: props.inputType
                    },
                    events: {
                        onInput: (e) => { },
                    },
                },
            ],
        },
    ];
};
