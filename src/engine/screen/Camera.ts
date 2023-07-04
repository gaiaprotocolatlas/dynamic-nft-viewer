import GameNode from "../gamenode/GameNode.js";

export default class Camera {
    public x = 0;
    public y = 0;
    public target: GameNode | undefined;
}
