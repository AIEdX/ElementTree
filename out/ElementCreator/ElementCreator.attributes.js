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
    name: (elm, name) => {
        elm.name = name;
    },
    type: (elm, type) => {
        elm.type = type;
    },
    dataSet: (elm, id) => { },
    required: (elm, set) => {
        elm.required = set;
    },
    checked: (elm, set) => {
        elm.checked = set;
    },
};
