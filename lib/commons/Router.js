import { ArrayUtil, EventContainer, URIParser } from "gaia-commons-ts";
class SkyRouter extends EventContainer {
    routes = [];
    redirects = [];
    openingViews = [];
    constructor() {
        super();
        window.addEventListener("popstate", (event) => {
            if (event.state !== null) {
                this.check(event.state);
            }
        });
    }
    check(preParams) {
        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        let viewCreated = false;
        const toCloseViews = [];
        for (const { patterns, excludes, to } of this.redirects) {
            const params = preParams === undefined ? {} : Object.assign({}, preParams);
            if (patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined) {
                let uri = to;
                for (const [key, value] of Object.entries(params)) {
                    uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value === undefined ? "" : value);
                }
                this.goNoHistory(`/${uri}`);
                return;
            }
        }
        for (const { patterns, excludes, viewType } of this.routes) {
            const params = preParams === undefined ? {} : Object.assign({}, preParams);
            const openingView = this.openingViews.find((ov) => ov instanceof viewType);
            if (patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined) {
                if (openingView === undefined) {
                    this.openingViews.push(new viewType(params, uri));
                    viewCreated = true;
                }
                else {
                    openingView.changeParams(params, uri);
                }
            }
            else if (openingView !== undefined) {
                toCloseViews.push(openingView);
                ArrayUtil.pull(this.openingViews, openingView);
            }
        }
        for (const toCloseView of toCloseViews.reverse()) {
            toCloseView.close();
        }
        if (viewCreated === true) {
            this.fireEvent("go");
        }
    }
    route(patterns, viewType, excludes = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.routes.push({ patterns, excludes, viewType });
        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        const params = {};
        if (patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
            excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined) {
            this.openingViews.push(new viewType(params, uri));
        }
    }
    redirect(patterns, to, excludes = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.redirects.push({ patterns, excludes, to });
        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        const params = {};
        if (patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
            excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined) {
            let uri = to;
            for (const [key, value] of Object.entries(params)) {
                uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value === undefined ? "" : value);
            }
            this.goNoHistory(`/${uri}`);
        }
    }
    go(uri, params) {
        if (location.pathname !== uri) {
            history.pushState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }
    goNoHistory(uri, params) {
        if (location.pathname !== uri) {
            history.replaceState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }
    waitAndGo(uri, params) {
        setTimeout(() => this.go(uri, params));
    }
    refresh() {
        for (const openingView of this.openingViews.reverse()) {
            openingView.close();
        }
        this.openingViews = [];
        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        for (const { patterns, excludes, viewType } of this.routes) {
            const params = {};
            if (patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined) {
                this.openingViews.push(new viewType(params, uri));
            }
        }
    }
}
export default new SkyRouter();
//# sourceMappingURL=Router.js.map