import Bowser from "bowser";
import Router from "./Router.js";
import Store from "./Store.js";

class BrowserInfo {

    private readonly bowser: Bowser.Parser.Parser = Bowser.getParser(window.navigator.userAgent);
    private store = new Store("__BROWSER_INFO_STORE");

    public get language() {
        let language = this.store.get<string | undefined>("lang");
        if (language === undefined) {
            language = navigator.language;
        }
        if (language.indexOf("-") !== -1 && language !== "zh-TC" && language !== "zh-SC") {
            language = language.substring(0, language.indexOf("-"));
        }
        return language;
    }

    public set language(language: string) {
        this.store.set("lang", language);
    }

    public changeLanguage(language: string) {
        this.language = language;
        Router.refresh();
    }

    public get isMobile() {
        return this.bowser.getPlatform().type === "mobile";
    }

    public get isPhoneSize() {
        return window.innerWidth <= 859;
    }

    public get isTabletSize() {
        return window.innerWidth > 859 && window.innerWidth <= 959;
    }

    public get isPCSize() {
        return window.innerWidth > 959;
    }

    public get isDarkMode() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
}

export default new BrowserInfo();
