import Bowser from "bowser";
import Router from "./Router.js";
import Store from "./Store.js";
class BrowserInfo {
    bowser = Bowser.getParser(window.navigator.userAgent);
    store = new Store("__BROWSER_INFO_STORE");
    get language() {
        let language = this.store.get("lang");
        if (language === undefined) {
            language = navigator.language;
        }
        if (language.indexOf("-") !== -1 && language !== "zh-TC" && language !== "zh-SC") {
            language = language.substring(0, language.indexOf("-"));
        }
        return language;
    }
    set language(language) {
        this.store.set("lang", language);
    }
    changeLanguage(language) {
        this.language = language;
        Router.refresh();
    }
    get isMobile() {
        return this.bowser.getPlatform().type === "mobile";
    }
    get isPhoneSize() {
        return window.innerWidth <= 859;
    }
    get isTabletSize() {
        return window.innerWidth > 859 && window.innerWidth <= 959;
    }
    get isPCSize() {
        return window.innerWidth > 959;
    }
    get isDarkMode() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
}
export default new BrowserInfo();
//# sourceMappingURL=BrowserInfo.js.map