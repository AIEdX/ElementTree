export const Typography = (props) => {
    const refObj = { p: null };
    const test = { i: 0 };
    return [
        {
            type: "p",
            toRef: {
                refObj: refObj,
                refObjProperty: "p",
            },
            events: {
                onClick: () => {
                    if (refObj.p) {
                        test.i++;
                        refObj.p.innerText = `${test.i}`;
                    }
                },
            },
            children: [
                {
                    type: "text",
                    text: props.text,
                },
            ],
        },
    ];
};
