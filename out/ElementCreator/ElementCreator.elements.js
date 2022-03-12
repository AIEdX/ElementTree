const processComponent = (elmObj, elementCreator) => {
    if (!elmObj.component) {
        throw new Error('A component must have the "component" propety set.');
    }
    const elm = document.createElement("component");
    elm.dataset["component_name"] = elmObj.component.func.name;
    elementCreator.elementTree.controller.registerStatefulComponent(elmObj, elm);
    return elm;
};
export const elementCreateFunctions = {
    fragment: () => {
        return document.createDocumentFragment();
    },
    div: () => {
        return document.createElement("div");
    },
    span: () => {
        return document.createElement("span");
    },
    pre: () => {
        return document.createElement("pre");
    },
    code: () => {
        return document.createElement("code");
    },
    ul: () => {
        return document.createElement("ul");
    },
    ol: () => {
        return document.createElement("ol");
    },
    li: () => {
        return document.createElement("li");
    },
    article: () => {
        return document.createElement("article");
    },
    aside: () => {
        return document.createElement("aside");
    },
    section: () => {
        return document.createElement("section");
    },
    header: () => {
        return document.createElement("header");
    },
    footer: () => {
        return document.createElement("footer");
    },
    form: () => {
        return document.createElement("form");
    },
    input: () => {
        return document.createElement("input");
    },
    label: () => {
        return document.createElement("label");
    },
    textarea: () => {
        return document.createElement("textarea");
    },
    button: () => {
        return document.createElement("button");
    },
    a: () => {
        return document.createElement("a");
    },
    canvas: () => {
        return document.createElement("canvas");
    },
    iframe: () => {
        return document.createElement("iframe");
    },
    table: () => {
        return document.createElement("table");
    },
    th: () => {
        return document.createElement("th");
    },
    thead: () => {
        return document.createElement("thead");
    },
    tr: () => {
        return document.createElement("tr");
    },
    td: () => {
        return document.createElement("td");
    },
    p: () => {
        return document.createElement("p");
    },
    h1: () => {
        return document.createElement("h1");
    },
    h2: () => {
        return document.createElement("h2");
    },
    h3: () => {
        return document.createElement("h3");
    },
    h4: () => {
        return document.createElement("h4");
    },
    h5: () => {
        return document.createElement("h5");
    },
    h6: () => {
        return document.createElement("h6");
    },
    text: (elmObj, elementCreator) => {
        if (!elmObj.text) {
            throw new Error('Text element must the "test" property set on the object.');
        }
        return document.createTextNode(elmObj.text);
    },
    component: processComponent,
};
