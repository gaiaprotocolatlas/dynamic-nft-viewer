import GaiaComponent from "../GaiaComponent.js";
import Step from "./Step.js";
export default class Stepper extends GaiaComponent {
    private steps;
    constructor(options: {
        activeStep?: number;
    }, ...steps: Step[]);
    set activeStep(s: number);
    getStep(index: number): Step;
}
//# sourceMappingURL=Stepper.d.ts.map