import { View } from "gaia-commons-ts";
import Config from "../Config.js";
import Button from "../gaia-commons-browser/components/button/Button.js";
import el from "../gaia-commons-browser/dom/el.js";
import DomContainerNode from "../gaia-engine/DomContainerNode.js";
import GameNode from "../gaia-engine/gamenode/GameNode.js";
import ImageNode from "../gaia-engine/image/ImageNode.js";
import Fullscreen from "../gaia-engine/screen/Fullscreen.js";
import ShigorSparrowsParts from "../metadata/shigor-sparrows-parts.json" assert { type: "json" };
export default class ShigorSparrows extends View {
    screen;
    imageContainer;
    currentId;
    isPixelMode = false;
    ment = "";
    constructor(params) {
        super();
        this.screen = new Fullscreen(1000, 1000);
        this.imageContainer = new GameNode(0, 0).appendTo(this.screen.root);
        new DomContainerNode(380, 445, el(".ui", {
            style: {
                width: 230,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
            },
        }, new Button({
            title: el("i.fa-solid.fa-image", {
                style: { fontSize: 60 },
            }),
            onClick: () => this.load(this.currentId, !this.isPixelMode),
        }), new Button({
            title: el("i.fa-solid.fa-volume-high", {
                style: { fontSize: 60 },
            }),
            onClick: () => this.speakMent(),
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
        this.ment = metadata.ment;
        if (isPixelMode !== true) {
            new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/test-balloon.png`).appendTo(this.imageContainer);
            new DomContainerNode(0, -310, el("p.ment", metadata.ment, {
                style: {
                    width: 780,
                    height: 200,
                    color: "#000000",
                    fontSize: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            })).appendTo(this.imageContainer);
        }
    }
    speakMent() {
        const utterance = new SpeechSynthesisUtterance(this.ment);
        utterance.lang = "ko-KR";
        speechSynthesis.speak(utterance);
    }
    close() {
        this.screen.delete();
        super.close();
    }
}
//# sourceMappingURL=ShigorSparrows.js.map