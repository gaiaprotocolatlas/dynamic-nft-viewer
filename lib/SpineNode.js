import { AtlasAttachmentLoader, SkeletonJson, Skin as SpineSkin } from "@pixi-spine/runtime-4.0";
import { GameNode, TextureLoader } from "gaia-engine";
import { Spine as PIXISpine, TextureAtlas } from "pixi-spine";
export default class SpineNode extends GameNode {
    options;
    pixiSpine;
    _animation;
    _skins;
    constructor(x, y, options) {
        super(x, y);
        this.options = options;
        this.load();
        if (options.animation !== undefined) {
            this.animation = options.animation;
        }
    }
    async load() {
        const rawSkeletonData = await (await fetch(this.options.json)).text();
        const rawAtlasData = await (await fetch(this.options.atlas)).text();
        let spineAtlas;
        if (typeof this.options.png === "string") {
            const texture = await TextureLoader.load(this.options.png);
            spineAtlas = new TextureAtlas(rawAtlasData, (path, callback) => callback(texture.baseTexture));
        }
        else {
            const textures = {};
            for (const [key, path] of Object.entries(this.options.png)) {
                textures[key] = await TextureLoader.load(path);
            }
            spineAtlas = new TextureAtlas(rawAtlasData, (path, callback) => callback(textures[path].baseTexture));
        }
        const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new SkeletonJson(spineAtlasLoader);
        this.pixiSpine = new PIXISpine(spineJsonParser.readSkeletonData(rawSkeletonData));
        if (this.animation !== undefined) {
            this.pixiSpine.state.setAnimation(0, this.animation, this.options.loop !== false);
        }
        if (this.options.skins !== undefined) {
            this.changeSkins(this.options.skins);
        }
        this.pixiSpine.state.addListener({
            complete: () => {
                if (this.deleted !== true) {
                    this.fireEvent("animationend");
                }
            },
        });
        this.pixiContainer.addChild(this.pixiSpine);
        if (this.deleted !== true) {
            this.fireEvent("load");
        }
    }
    set animation(animation) {
        if (animation !== undefined && this.pixiSpine !== undefined) {
            this.pixiSpine.state.setAnimation(0, animation, this.options.loop !== false);
            this.pixiSpine.state.apply(this.pixiSpine.skeleton);
        }
        this._animation = animation;
    }
    get animation() {
        return this._animation;
    }
    changeSkins(skins) {
        if (this.pixiSpine !== undefined) {
            const newSkin = new SpineSkin("combined-skin");
            for (const skinName of skins) {
                const skin = this.pixiSpine.spineData.findSkin(skinName);
                if (skin !== null) {
                    newSkin.addSkin(skin);
                }
            }
            this.pixiSpine.skeleton.skin = newSkin;
            this.pixiSpine.skeleton.setSlotsToSetupPose();
        }
    }
    set skins(skins) {
        if (skins !== undefined) {
            this.changeSkins(skins);
        }
        this._skins = skins;
    }
    get skins() {
        return this._skins;
    }
}
//# sourceMappingURL=SpineNode.js.map