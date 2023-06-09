import { EventContainer } from "gaia-commons-ts";
import Theme from "./Theme.js";
declare class ThemeManager extends EventContainer {
    private store;
    init(): void;
    get theme(): Theme;
    set theme(theme: Theme);
    get showingTheme(): Theme.Dark | Theme.Light;
}
declare const _default: ThemeManager;
export default _default;
//# sourceMappingURL=ThemeManager.d.ts.map