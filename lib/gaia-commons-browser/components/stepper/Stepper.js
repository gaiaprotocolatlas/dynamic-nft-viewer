import GaiaComponent from "../GaiaComponent.js";
export default class Stepper extends GaiaComponent {
    steps;
    constructor(options, ...steps) {
        super(".stepper");
        this.steps = steps;
        this.append(...steps);
        for (let i = 0; i < steps.length; i += 1) {
            const step = steps[i];
            step.index = i;
            if (i === steps.length - 1) {
            }
            else {
                step.on("continue", () => this.activeStep = i + 1);
            }
            if (i === 0) {
            }
            else {
                step.on("back", () => this.activeStep = i - 1);
            }
        }
        this.activeStep = options.activeStep ?? 0;
    }
    set activeStep(s) {
        for (let i = 0; i < this.steps.length; i += 1) {
            const step = this.steps[i];
            i === s ? step.show() : step.hide();
            i < s ? step.check() : step.uncheck();
        }
    }
    getStep(index) {
        return this.steps[index];
    }
}
//# sourceMappingURL=Stepper.js.map