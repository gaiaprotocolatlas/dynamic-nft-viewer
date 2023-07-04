import PixiContainerNode from "./PixiContainerNode.js";
export default class MovableNode extends PixiContainerNode {
    children = [];
    toX;
    toY;
    speedX = 0;
    speedY = 0;
    moveEndHandler;
    toAlpha;
    fadingSpeed = 0;
    fadeEndHandler;
    r_x = 0;
    r_y = 0;
    r_scaleX = 1;
    r_scaleY = 1;
    r_angle = 0;
    r_sin = 0;
    r_cos = 1;
    r_alpha = 1;
    r_hidden = false;
    step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha, hidden) {
        this.x += this.speedX * deltaTime;
        if (this.toX !== undefined) {
            if ((this.speedX > 0 && this.x > this.toX) ||
                (this.speedX < 0 && this.x < this.toX)) {
                this.x = this.toX;
                this.toX = undefined;
                this.speedX = 0;
                if (this.moveEndHandler !== undefined) {
                    this.moveEndHandler();
                    this.moveEndHandler = undefined;
                }
            }
        }
        this.y += this.speedY * deltaTime;
        if (this.toY !== undefined) {
            if ((this.speedY > 0 && this.y > this.toY) ||
                (this.speedY < 0 && this.y < this.toY)) {
                this.y = this.toY;
                this.toY = undefined;
                this.speedY = 0;
                if (this.moveEndHandler !== undefined) {
                    this.moveEndHandler();
                    this.moveEndHandler = undefined;
                }
            }
        }
        this.alpha += this.fadingSpeed * deltaTime;
        if (this.toAlpha !== undefined) {
            if ((this.fadingSpeed > 0 && this.alpha > this.toAlpha) ||
                (this.fadingSpeed < 0 && this.alpha < this.toAlpha)) {
                this.alpha = this.toAlpha;
                this.toAlpha = undefined;
                this.fadingSpeed = 0;
                if (this.fadeEndHandler !== undefined) {
                    this.fadeEndHandler();
                    this.fadeEndHandler = undefined;
                }
            }
        }
        if (this.deleted !== true) {
            this.r_x = x + this.x;
            this.r_y = y + this.y;
            this.r_scaleX = scaleX * this.scaleX;
            this.r_scaleY = scaleY * this.scaleY;
            this.r_angle = angle + this.angle;
            this.r_alpha = alpha * this.alpha;
            this.r_hidden = hidden === true ? true : this.pixiContainer.visible !== true;
            for (const child of this.children) {
                child.step(deltaTime, this.r_x, this.r_y, this.r_scaleX, this.r_scaleY, this.r_angle, this.r_sin, this.r_cos, this.r_alpha, this.r_hidden);
            }
        }
    }
}
//# sourceMappingURL=MovableNode.js.map