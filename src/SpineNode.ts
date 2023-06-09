import { AtlasAttachmentLoader, SkeletonJson, Skin as SpineSkin } from "@pixi-spine/runtime-4.1";
import { GameNode, TextureLoader } from "gaia-engine";
import { Spine as PIXISpine, TextureAtlas } from "pixi-spine";
import * as PIXI from "pixi.js";

export default class SpineNode extends GameNode {

    private pixiSpine: PIXISpine | undefined;
    private _animation: string | undefined;
    private _skins: string[] | undefined;

    constructor(x: number, y: number, private options: {
        json: string,
        atlas: string,
        png: string | { [key: string]: string },
        skins?: string[],
        animation?: string,
        loop?: boolean,
    }) {
        super(x, y);
        this.load();
        if (options.animation !== undefined) {
            this.animation = options.animation;
        }
    }

    private async load() {

        const rawSkeletonData = await (await fetch(this.options.json)).text();
        const rawAtlasData = await (await fetch(this.options.atlas)).text();

        let spineAtlas;

        if (typeof this.options.png === "string") {
            const texture = await TextureLoader.load(this.options.png);
            spineAtlas = new TextureAtlas(rawAtlasData, (path, callback) => callback(texture.baseTexture as any));
        } else {
            const textures: { [key: string]: PIXI.Texture } = {};
            for (const [key, path] of Object.entries(this.options.png)) {
                textures[key] = await TextureLoader.load(path);
            }
            spineAtlas = new TextureAtlas(rawAtlasData, (path, callback) => callback(textures[path].baseTexture as any));
        }

        const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new SkeletonJson(spineAtlasLoader);

        this.pixiSpine = new PIXISpine(spineJsonParser.readSkeletonData(rawSkeletonData) as any);
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
        this.pixiContainer.addChild(this.pixiSpine as any);

        if (this.deleted !== true) {
            this.fireEvent("load");
        }
    }

    public set animation(animation: string | undefined) {
        if (animation !== undefined && this.pixiSpine !== undefined) {
            this.pixiSpine.state.setAnimation(0, animation, this.options.loop !== false);
            this.pixiSpine.state.apply(this.pixiSpine.skeleton);
        }
        this._animation = animation;
    }

    public get animation(): string | undefined {
        return this._animation;
    }

    private changeSkins(skins: string[]) {
        if (this.pixiSpine !== undefined) {
            const newSkin = new SpineSkin("combined-skin");
            for (const skinName of skins) {
                const skin = this.pixiSpine.spineData.findSkin(skinName);
                if (skin !== null) {
                    newSkin.addSkin(skin as any);
                }
            }
            this.pixiSpine.skeleton.skin = newSkin;
            this.pixiSpine.skeleton.setSlotsToSetupPose();
        }
    }

    public set skins(skins: string[] | undefined) {
        if (skins !== undefined) {
            this.changeSkins(skins);
        }
        this._skins = skins;
    }

    public get skins(): string[] | undefined {
        return this._skins;
    }
}
