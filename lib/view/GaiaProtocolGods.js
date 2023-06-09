import { View } from "gaia-commons-ts";
import Config from "../Config.js";
import SpineNode from "../SpineNode.js";
import Fullscreen from "../gaia-engine/screen/Fullscreen.js";
import GodType from "../metadata/GodType.js";
export default class GaiaProtocolGods extends View {
    screen;
    spineNode;
    constructor(params) {
        super();
        this.screen = new Fullscreen(1024, 1024);
        if (params.id !== undefined) {
            this.load(parseInt(params.id));
        }
    }
    changeParams(params, uri) {
        if (params.id !== undefined) {
            this.load(parseInt(params.id));
        }
    }
    async load(id) {
        this.spineNode?.delete();
        const result = await fetch(`https://${Config.appServerHost}/metadata/gaia-protocol-gods/${id}`);
        const metadata = await result.json();
        const gender = metadata.gender.toLowerCase();
        const path = `/nft-image-parts/gaia-protocol-gods/spine/god-${metadata.type.toLowerCase()}-${gender}`;
        const skins = [];
        for (const [partName, part] of Object.entries(metadata.parts)) {
            skins.push(`${partName}/${part}`);
        }
        this.spineNode = new SpineNode(0, 0, {
            json: `${path}.json`,
            atlas: `${path}.atlas`,
            png: metadata.type === GodType.WATER ? {
                [`water-${gender}.png`]: `${path}.png`,
                [`water-${gender}_2.png`]: `${path}-2.png`,
                [`water-${gender}_3.png`]: `${path}-3.png`
            } : `${path}.png`,
            skins,
            animation: "animation",
        }).appendTo(this.screen.root);
        this.screen.style({ cursor: "pointer" });
        this.screen.onDom("click", () => { if (this.spineNode !== undefined) {
            this.spineNode.animation = "touched";
        } });
        this.spineNode.on("animationend", () => { if (this.spineNode !== undefined) {
            this.spineNode.animation = "animation";
        } });
    }
    close() {
        this.screen.delete();
        super.close();
    }
}
//# sourceMappingURL=GaiaProtocolGods.js.map