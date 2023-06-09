import { EventContainer } from "gaia-commons-ts";
import BrowserInfo from "../BrowserInfo.js";
import Store from "../Store.js";
import Theme from "./Theme.js";
class ThemeManager extends EventContainer {
    store = new Store("__THEME_MANAGER_STORE");
    init() {
        this.theme = this.theme;
    }
    get theme() {
        const theme = this.store.get("theme");
        return theme === undefined ? Theme.Auto : theme;
    }
    set theme(theme) {
        this.store.set("theme", theme);
        document.documentElement.setAttribute("data-theme", this.showingTheme);
        this.fireEvent("change");
    }
    get showingTheme() {
        const theme = this.theme;
        return theme === Theme.Auto ? (BrowserInfo.isDarkMode === true ? Theme.Dark : Theme.Light) : theme;
    }
}
export default new ThemeManager();
//# sourceMappingURL=ThemeManager.js.map