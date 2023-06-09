import { JSONUtil } from "gaia-commons-ts";
export default class Store {
    name;
    constructor(name) {
        this.name = name;
    }
    set(key, value, permanently = false) {
        (permanently === true ? localStorage : sessionStorage).setItem(`${this.name}/${key}`, JSON.stringify(value));
        (permanently === true ? sessionStorage : localStorage).removeItem(`${this.name}/${key}`);
    }
    get(key, defaultValue) {
        let value = sessionStorage.getItem(`${this.name}/${key}`);
        if (value === null) {
            value = localStorage.getItem(`${this.name}/${key}`);
            if (value === null) {
                return defaultValue;
            }
        }
        return JSONUtil.parseWithUndefined(value);
    }
    checkPermanently(key) {
        return localStorage.getItem(`${this.name}/${key}`) !== null;
    }
    delete(key) {
        sessionStorage.removeItem(`${this.name}/${key}`);
        localStorage.removeItem(`${this.name}/${key}`);
    }
}
//# sourceMappingURL=Store.js.map