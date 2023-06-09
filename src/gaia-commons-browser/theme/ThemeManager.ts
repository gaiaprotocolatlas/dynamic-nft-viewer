import { EventContainer } from "gaia-commons-ts";
import BrowserInfo from "../BrowserInfo.js";
import Store from "../Store.js";
import Theme from "./Theme.js";

class ThemeManager extends EventContainer {
    private store = new Store("__THEME_MANAGER_STORE");

    public init() {
        this.theme = this.theme;
    }

    public get theme() {
        const theme = this.store.get<Theme | undefined>("theme");
        return theme === undefined ? Theme.Auto : theme;
    }

    public set theme(theme: Theme) {
        this.store.set("theme", theme);
        document.documentElement.setAttribute("data-theme", this.showingTheme);
        this.fireEvent("change");
    }

    public get showingTheme() {
        const theme = this.theme;
        return theme === Theme.Auto ? (BrowserInfo.isDarkMode === true ? Theme.Dark : Theme.Light) : theme;
    }
}

export default new ThemeManager();
