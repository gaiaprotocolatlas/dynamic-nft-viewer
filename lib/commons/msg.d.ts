import { I18NText } from "gaia-commons-ts";
declare const msg: {
    (keyOrMessages: string | I18NText, defaultLanguage?: string): any;
    loadYAML(lang: string, content: string): void;
    loadYAMLs(paths: {
        [lang: string]: string[];
    }): Promise<void>;
    getMessages(key: string): I18NText;
    getLangMessages(keyOrMessages: string | I18NText, defaultLanguage?: string): {
        [x: string]: any;
    };
};
export default msg;
//# sourceMappingURL=msg.d.ts.map