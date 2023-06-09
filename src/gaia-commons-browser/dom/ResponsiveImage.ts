import DomNode from "./DomNode.js";

export default class ResponsiveImage extends DomNode<HTMLImageElement> {

    constructor(tag: string, src: string) {
        super(tag);
        this.src = src;
    }

    public set src(src: string) {
        this.domElement.src = src;
        let index = src.lastIndexOf(".png");
        if (index !== -1) {
            const path = src.substring(0, index);
            this.domElement.srcset = `${path}@2x.png 2x, ${path}@3x.png 3x`;
        } else {
            index = src.lastIndexOf(".jpg");
            if (index !== -1) {
                const path = src.substring(0, index);
                this.domElement.srcset = `${path}@2x.jpg 2x, ${path}@3x.jpg 3x`;
            } else {
                index = src.lastIndexOf(".jpeg");
                if (index !== -1) {
                    const path = src.substring(0, index);
                    this.domElement.srcset = `${path}@2x.jpeg 2x, ${path}@3x.jpeg 3x`;
                }
            }
        }
    }
}
