import { View, ViewParams } from "gaia-commons-ts";
import { Fullscreen, ImageNode } from "gaia-engine";
import Config from "../Config.js";
import ShigorSparrowMetadata from "../metadata/ShigorSparrowMetadata.js";
import ShigorSparrowsParts from "../metadata/shigor-sparrows-parts.json" assert { type: "json" };

export default class ShigorSparrows extends View {

    private screen: Fullscreen;

    constructor(params: ViewParams) {
        super();
        this.screen = new Fullscreen(1000, 1000);

        if (params.id !== undefined) {
            this.load(parseInt(params.id));
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.id !== undefined) {
            this.load(parseInt(params.id));
        }
    }

    private async load(id: number) {

        const result = await fetch(`https://${Config.appServerHost}/metadata/shigor-sparrows/${id}`);
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

        for (const image of images) {
            new ImageNode(0, 0, `/nft-image-parts/shigor-sparrows/${image.path}`).appendTo(this.screen.root);
        }
    }

    public close(): void {
        this.screen.delete();
        super.close();
    }
}
