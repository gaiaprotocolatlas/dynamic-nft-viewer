import GaiaComponent from "../GaiaComponent.js";
import Step from "./Step.js";

export default class Stepper extends GaiaComponent {

    private steps: Step[];

    constructor(options: { activeStep?: number }, ...steps: Step[]) {
        super(".stepper");
        this.steps = steps;
        this.append(...steps);
        for (let i = 0; i < steps.length; i += 1) {
            const step = steps[i];
            step.index = i;

            if (i === steps.length - 1) {

            } else {
                step.on("continue", () => this.activeStep = i + 1);
            }

            if (i === 0) {

            } else {
                step.on("back", () => this.activeStep = i - 1);
            }
        }
        this.activeStep = options.activeStep ?? 0;
    }

    public set activeStep(s: number) {
        for (let i = 0; i < this.steps.length; i += 1) {
            const step = this.steps[i];
            i === s ? step.show() : step.hide();
            i < s ? step.check() : step.uncheck();
        }
    }

    public getStep(index: number): Step {
        return this.steps[index];
    }
}
