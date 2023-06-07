import GodGender from "./GodGender.js";
import GodType from "./GodType.js";
export default interface GaiaProtocolGodsMetadata {
    id: number;
    type: GodType;
    gender: GodGender;
    parts: {
        [partName: string]: string;
    };
    image: string;
}
//# sourceMappingURL=GaiaProtocolGodsMetadata.d.ts.map