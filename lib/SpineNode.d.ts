import { GameNode } from "gaia-engine";
export default class SpineNode extends GameNode {
    private options;
    private pixiSpine;
    private _animation;
    private _skins;
    constructor(x: number, y: number, options: {
        json: string;
        atlas: string;
        png: string | {
            [key: string]: string;
        };
        skins?: string[];
        animation?: string;
        loop?: boolean;
    });
    private load;
    set animation(animation: string | undefined);
    get animation(): string | undefined;
    private changeSkins;
    set skins(skins: string[] | undefined);
    get skins(): string[] | undefined;
}
//# sourceMappingURL=SpineNode.d.ts.map