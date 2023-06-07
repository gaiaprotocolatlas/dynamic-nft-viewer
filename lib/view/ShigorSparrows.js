import { Button, el } from "gaia-commons-browser";
import { View } from "gaia-commons-ts";
import { DomContainerNode, Fullscreen, GameNode, ImageNode } from "gaia-engine";
import Config from "../Config.js";
import ShigorSparrowsParts from "../metadata/shigor-sparrows-parts.json" assert { type: "json" };
export default class ShigorSparrows extends View {
    screen;
    imageContainer;
    currentId;
    isPixelMode = false;
    constructor(params) {
        super();
        this.screen = new Fullscreen(1000, 1000);
        this.imageContainer = new GameNode(0, 0).appendTo(this.screen.root);
        new DomContainerNode(380, 445, el(".ui", {
            style: {
                display: "flex",
                gap: 16,
            },
        }, new Button({
            title: el("i.fa-sharp.fa-solid.fa-image", {
                style: { fontSize: 60 },
            }),
        }), new Button({
            title: el("i.fa-sharp.fa-solid.fa-volume", {
                style: { fontSize: 60 },
            }),
        }))).appendTo(this.screen.root);
        if (params.id !== undefined) {
            this.load(parseInt(params.id), this.isPixelMode);
        }
    }
    changeParams(params, uri) {
        if (params.id !== undefined) {
            this.load(parseInt(params.id), this.isPixelMode);
        }
    }
    async load(id, isPixelMode) {
        this.currentId = id;
        this.isPixelMode = isPixelMode;
        const result = await fetch(`https://${Config.appServerHost}/metadata/shigor-sparrows/${id}`);
        const metadata = await result.json();
        const imageParts = [];
        for (const [traitId, trait] of ShigorSparrowsParts.entries()) {
            if (trait.condition === undefined ||
                Object.entries(metadata.parts).find((p) => p[0] === trait.condition.trait && trait.condition.values.includes(p[1]) === true) !== undefined) {
                for (const [partId, part] of trait.parts.entries()) {
                    if (part.condition === undefined ||
                        Object.entries(metadata.parts).find((p) => p[0] === part.condition.trait && part.condition.values.includes(p[1]) === true) !== undefined) {
                        if (metadata.parts[trait.name] === part.name) {
                            imageParts.push({ traitId, partId });
                            break;
                        }
                    }
                }
            }
        }
        let images = [];
        for (const imagePart of imageParts) {
            images = images.concat(ShigorSparrowsParts[imagePart.traitId].parts[imagePart.partId].images);
        }
        images.sort((a, b) => a.order - b.order);
        this.imageContainer.empty();
        for (const image of images) {
            if (isPixelMode === true) {
                if (image.path.indexOf("8.TEXT BALLOON") === -1) {
                    new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/${image.path.replace(/normal\//g, "pixel/")}`).appendTo(this.imageContainer);
                }
            }
            else {
                new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/${image.path}`).appendTo(this.imageContainer);
            }
        }
        if (isPixelMode !== true) {
            new DomContainerNode(0, -310, el("p.ment", metadata.ment, {
                style: {
                    color: "#000000",
                    fontSize: 60,
                },
            })).appendTo(this.imageContainer);
        }
    }
    close() {
        this.screen.delete();
        super.close();
    }
}
//# sourceMappingURL=ShigorSparrows.js.map