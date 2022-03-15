export const attributeSetFunction = {
    id: (elm, id) => {
        elm.id = id;
    },
    className: (elm, className) => {
        elm.className = className;
    },
    cssText: (elm, cssText) => {
        elm.style.cssText = cssText;
    },
    target: (elm, data) => {
        if (!data.target)
            return;
        elm.target = data.target;
    },
    inputs: (elm, data) => {
        if (!data.inputs)
            return;
        if (data.inputs.type) {
            elm.type = data.inputs.type;
        }
    },
    forms: (elm, data) => {
        if (!data.inputs)
            return;
        if (data.inputs.type) {
            elm.type = data.inputs.type;
        }
    },
    aria: (elm, data) => {
        if (!data.inputs)
            return;
        if (data.inputs.type) {
            elm.type = data.inputs.type;
        }
    },
    dataSet: (elm, id) => { },
};
