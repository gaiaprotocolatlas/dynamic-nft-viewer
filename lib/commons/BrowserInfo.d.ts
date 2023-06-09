declare class BrowserInfo {
    private readonly bowser;
    private store;
    get language(): string;
    set language(language: string);
    changeLanguage(language: string): void;
    get isMobile(): boolean;
    get isPhoneSize(): boolean;
    get isTabletSize(): boolean;
    get isPCSize(): boolean;
    get isDarkMode(): boolean;
}
declare const _default: BrowserInfo;
export default _default;
//# sourceMappingURL=BrowserInfo.d.ts.map