import BodyNode from "../dom/BodyNode.js";
import GaiaComponent from "./GaiaComponent.js";
export default class Noti extends GaiaComponent {
    constructor(options, ...nodes) {
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
//# sourceMappingURL=Noti.js.map