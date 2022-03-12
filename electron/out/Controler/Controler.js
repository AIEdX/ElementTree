export class Controller {
    statefulObjectMap = {};
    cascadeObjectMap = {};
    //@ts-ignore
    elementTree;
    registerStatefulComponent(elmObj, parentElm) {
        if (!elmObj.component) {
            throw new Error("Stateful must only be used on component elements.");
        }
        this.statefulObjectMap[elmObj.component.stateProps.__id] = {
            parentElement: parentElm,
            state: elmObj.component.stateObject,
            props: elmObj.component.stateProps,
            component: elmObj.component.func,
        };
    }
    generateCascadeId(props) {
        props.__id = this.getId();
        return props;
    }
    registerCascadeElement(elmObj, elm) {
        if (!elmObj.cascade)
            return;
        if (!elmObj.cascade.origin)
            return;
        if (!this.cascadeObjectMap[elmObj.cascade.origin.__id]) {
            const elementMap = new Map();
            elementMap.set(elm, elmObj.cascade.receiver);
            this.cascadeObjectMap[elmObj.cascade.origin.__id] = {
                elements: elementMap,
                props: elmObj.cascade.origin,
            };
        }
        else {
            this.cascadeObjectMap[elmObj.cascade.origin.__id].elements.set(elm, elmObj.cascade.receiver);
        }
    }
    runCascade(props) {
        const data = this.cascadeObjectMap[props.__id];
        if (!data)
            return false;
        data.elements.forEach((value, key) => {
            value(key, data.props);
        });
        return true;
    }
    releaseCascade(props) {
        if (!this.cascadeObjectMap[props.__id])
            return false;
        delete this.cascadeObjectMap[props.__id];
        delete props.__id;
        return true;
    }
    __unqiueId4() {
        return Math.floor((1 + Math.random()) * 0x1000000).toString(16);
    }
    getId() {
        return `${this.__unqiueId4()}-${this.__unqiueId4()}`;
    }
    getStateObject(id) {
        if (!this.statefulObjectMap[id])
            return false;
        return this.statefulObjectMap[id].state;
    }
    getComponentElement(id) {
        const data = this.statefulObjectMap[id];
        if (!data)
            return false;
        return data.parentElement;
    }
    runStateChange(props, newState, onChange = () => { }) {
        if (!props.__id)
            return false;
        const data = this.statefulObjectMap[props.__id];
        if (!data)
            return false;
        data.state = newState;
        data.parentElement.innerHTML = "";
        onChange();
        this.elementTree.elementCreator.createElements([data.component(props)[0]], data.parentElement);
    }
}
