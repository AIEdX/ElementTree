import { attributeSetFunction } from "./ElementCreator.attributes.js";
import { elementCreateFunctions } from "./ElementCreator.elements.js";
import { elementEventFunctions } from "./ElementCreator.events.js";
export class ElementCreator {
    attributeSetFunction = attributeSetFunction;
    elementCreateFunctions = elementCreateFunctions;
    elemntEventFunctions = elementEventFunctions;
    elementTree;
    inputFunctions = {
        string: (elm) => {
            return String(elm.value);
        },
        number: (elm) => {
            return Number(elm.value);
        },
        boolean: (elm) => {
            return Boolean(elm.value);
        },
    };
    constructor() { }
    _traverseElementTree(tree, parentElm) {
        for (const elmObj of tree) {
            if (Array.isArray(elmObj)) {
                this._traverseElementTree(elmObj, parentElm);
                continue;
            }
            if (elmObj.type == "component" && elmObj.children) {
                if (elmObj.component) {
                    const id = elmObj.component.stateProps.__id;
                    if (id) {
                        const component = this.elementTree.controller.getComponentElement(id);
                        if (component) {
                            this._traverseElementTree(elmObj.children, parentElm);
                            continue;
                        }
                    }
                }
                if (parentElm.tagName == "component") {
                    this._traverseElementTree(elmObj.children, parentElm);
                    continue;
                }
                else {
                    const elm = this.elementCreateFunctions[elmObj.type](elmObj, this);
                    this._traverseElementTree(elmObj.children, elm);
                    parentElm.append(elm);
                }
                continue;
            }
            const elm = this.elementCreateFunctions[elmObj.type](elmObj, this);
            if (elmObj.cascade) {
                this.elementTree.controller.registerCascadeElement(elmObj, elm);
            }
            if (elmObj.bindInput) {
                elm.dataset["value_type"] =
                    elmObj.bindInput.valueType;
                const bound = elmObj.bindInput.bindTo;
                const boundKey = elmObj.bindInput.objectPropertyName;
                elm.value = bound[boundKey];
                elm.addEventListener("input", (ev) => {
                    if (!ev.target)
                        return;
                    const target = ev.target;
                    const valueType = target.dataset["value_type"];
                    if (!valueType)
                        return;
                    const newInput = this.inputFunctions[valueType](target);
                    bound[boundKey] = newInput;
                });
            }
            if (elmObj.toRef) {
                elmObj.toRef.refObj[elmObj.toRef.refObjProperty] = elm;
            }
            if (elmObj.attrs) {
                for (const attribute of Object.keys(elmObj.attrs)) {
                    this.attributeSetFunction[attribute](elm, elmObj.attrs);
                }
            }
            if (elmObj.events) {
                for (const event of Object.keys(elmObj.events)) {
                    this.elemntEventFunctions[event](elm, elmObj);
                }
            }
            if (elmObj.text) {
                elm.innerText = elmObj.text;
            }
            else if (elmObj.children) {
                this._traverseElementTree(elmObj.children, elm);
            }
            parentElm.append(elm);
        }
    }
    createElements(tree, parentElm) {
        const frag = document.createDocumentFragment();
        this._traverseElementTree(tree, frag);
        parentElm.append(frag);
    }
    safetlyRemoveAll() {
        document.body.innerHTML = "";
        this.elementTree.controller.releaseAll();
    }
    safetlyRemoveElement(elm) {
        const cascadeElements = {};
        const components = [];
        this._traverseRemoveElements(elm, cascadeElements, components);
        for (const id of Object.keys(cascadeElements)) {
            for (const cElm of cascadeElements[id]) {
                this.elementTree.controller.releaseElementFromCascade(id, cElm);
            }
        }
        for (const compoent of components) {
            this.elementTree.controller.releaseComponent(compoent);
        }
        elm.remove();
    }
    _traverseRemoveElements(elm, cascadeElements, components) {
        if (elm.dataset["__cascade"]) {
            const id = elm.dataset["__cascade"];
            if (!cascadeElements[id]) {
                cascadeElements[id] = [];
            }
            cascadeElements[id].push(elm);
        }
        if (elm.dataset["__componentid"]) {
            components.push(elm.dataset["__componentid"]);
        }
        if (elm.children.length > 0) {
            for (let i = 0; i < elm.children.length; i++) {
                const child = elm.children[i];
                if (child.children.length > 0) {
                    this._traverseRemoveElements(child, cascadeElements, components);
                }
                else {
                    if (child.dataset["__cascade"]) {
                        const id = child.dataset["__cascade"];
                        if (!cascadeElements[id]) {
                            cascadeElements[id] = [];
                        }
                        cascadeElements[id].push(child);
                    }
                    if (child.dataset["__componentid"]) {
                        components.push(child.dataset["__componentid"]);
                    }
                }
            }
        }
    }
}