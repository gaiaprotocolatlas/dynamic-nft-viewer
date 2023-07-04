import * as PIXI from "pixi.js";
import TextureLoader from "../TextureLoader.js";
import GameNode from "../gamenode/GameNode.js";
export default class ImageNode extends GameNode {
    constructor(x, y, src) {
        super(x, y);
        this.src = src;
    }
    async changeImage(src) {
        const texture = await TextureLoader.load(src);
        const pixiSprite = PIXI.Sprite.from(texture);
        pixiSprite.anchor.x = 0.5;
        pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(pixiSprite);
    }
    set src(src) {
        this.changeImage(src);
    }
}
//# sourceMappingURL=ImageNode.js.map