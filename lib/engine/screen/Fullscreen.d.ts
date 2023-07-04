import Screen from "./Screen.js";
export default class Fullscreen extends Screen {
    private fixedWidth?;
    private fixedHeight?;
    private extraOptions?;
    private letterboxes;
    constructor(fixedWidth?: number | undefined, fixedHeight?: number | undefined, extraOptions?: {
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
    } | undefined);
    private windowResizeHandler;
    delete(): void;
}
//# sourceMappingURL=Fullscreen.d.ts.map