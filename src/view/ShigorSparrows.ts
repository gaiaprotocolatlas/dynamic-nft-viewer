import { View, ViewParams } from "gaia-commons-ts";
import Config from "../Config.js";
import DomContainerNode from "../engine/DomContainerNode.js";
import GameNode from "../engine/gamenode/GameNode.js";
import ImageNode from "../engine/image/ImageNode.js";
import Fullscreen from "../engine/screen/Fullscreen.js";
import Button from "../gaia-commons-browser/components/button/Button.js";
import el from "../gaia-commons-browser/dom/el.js";
import ShigorSparrowMetadata from "../metadata/ShigorSparrowMetadata.js";
import ShigorSparrowsParts from "../metadata/shigor-sparrows-parts.json" assert { type: "json" };

export default class ShigorSparrows extends View {

    private screen: Fullscreen;
    private imageContainer: GameNode;

    private currentId: number | undefined;
    private isPixelMode: boolean = false;
    private ment = "";

    constructor(params: ViewParams) {
        super();

        this.screen = new Fullscreen(1000, 1000);
        this.imageContainer = new GameNode(0, 0).appendTo(this.screen.root);

        new DomContainerNode(380, 445, el(".ui",
            {
                style: {
                    width: 230,
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16,
                },
            },
            new Button({
                title: el("i.fa-solid.fa-image", {
                    style: { fontSize: 60 },
                }),
                onClick: () => this.load(this.currentId!, !this.isPixelMode),
            }),
            new Button({
                title: el("i.fa-solid.fa-volume-high", {
                    style: { fontSize: 60 },
                }),
                onClick: () => this.speakMent(),
            }),
        )).appendTo(this.screen.root);

        if (params.id !== undefined) {
            this.load(parseInt(params.id), this.isPixelMode);
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.id !== undefined) {
            this.load(parseInt(params.id), this.isPixelMode);
        }
    }

    private async load(id: number, isPixelMode: boolean) {

        this.currentId = id;
        this.isPixelMode = isPixelMode;

        const result = await fetch(`${Config.appServerHost}/metadata/shigor-sparrows/${id}`);
        const metadata: ShigorSparrowMetadata = await result.json();

        const imageParts: any[] = [];
        for (const [traitId, trait] of ShigorSparrowsParts.entries()) {
            if (
                trait.condition === undefined ||
                Object.entries(metadata.parts).find((p) => p[0] === trait.condition.trait && trait.condition.values.includes(p[1]) === true) !== undefined
            ) {
                for (const [partId, part] of trait.parts.entries()) {
                    if (
                        (part as any).condition === undefined ||
                        Object.entries(metadata.parts).find((p) => p[0] === (part as any).condition.trait && (part as any).condition.values.includes(p[1]) === true) !== undefined
                    ) {
                        if (metadata.parts[trait.name] === part.name) {
                            imageParts.push({ traitId, partId });
                            break;
                        }
                    }
                }
            }
        }

        let images: any[] = [];
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
            } else {
                new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/${image.path}`).appendTo(this.imageContainer);
            }
        }

        this.ment = metadata.ment;

        if (isPixelMode !== true) {
            //new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/test-balloon.png`).appendTo(this.imageContainer);
            new DomContainerNode(0, -310, el("p.ment",
                metadata.ment,
                {
                    style: {
                        width: 780,
                        height: 200,
                        color: "#000000",
                        fontSize: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                },
            )).appendTo(this.imageContainer);
        }
    }

    private speakMent(): void {
        const utterance = new SpeechSynthesisUtterance(`짹! ${this.ment} 짹!`);
        utterance.lang = "ko-KR";
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    }

    public close(): void {
        this.screen.delete();
        super.close();
    }
}
