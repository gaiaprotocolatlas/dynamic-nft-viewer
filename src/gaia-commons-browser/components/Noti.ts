import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";

export default class Noti extends GaiaComponent {

    constructor(options: {
        tag?: string,
    }, ...nodes: (DomNode | string | undefined)[]) {
        super(".noti" + (options.tag ?? ""));
        this.append(...nodes);

        this.animate({
            keyframes: {
                from: { transform: "translateX(100%)" },
                to: { transform: "translateX(0)" },
            },
        });

        setTimeout(() => {
            this.animate({
                keyframes: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(100%)" },
                },
                onEnd: () => {
                    this.delete();
                },
            });
        }, 3000);

        BodyNode.append(this);
    }
}
