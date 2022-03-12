import { ElementTree } from "../../out/ElementTree.js";
(() => {
    const cascadeProps = {
        time: new Date().toLocaleTimeString(),
    };
    const [cascade] = ElementTree.cascade(cascadeProps);
    ElementTree.bloomRoot([
        {
            type: "p",
            cascade: {
                origin: cascadeProps,
                receiver: (elm, props) => {
                    elm.innerText = props.time;
                },
            },
            text: new Date().toLocaleTimeString()
        },
    ]);
    setInterval(() => {
        cascadeProps.time = new Date().toLocaleTimeString();
        cascade();
    }, 1000);
})();
