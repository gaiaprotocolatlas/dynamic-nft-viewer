import { ArrayUtil, EventContainer, URIParser, View, ViewParams } from "gaia-commons-ts";

export type ViewType = new (...args: any[]) => View;

class SkyRouter extends EventContainer {

    private routes: { patterns: string[], excludes: string[], viewType: ViewType }[] = [];
    private redirects: { patterns: string[], excludes: string[], to: string }[] = [];

    private openingViews: View[] = [];

    constructor() {
        super();
        window.addEventListener("popstate", (event) => {
            if (event.state !== null) {
                this.check(event.state);
            }
        });
    }

    public check(preParams?: ViewParams) {

        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");

        let viewCreated = false;
        const toCloseViews: View[] = [];

        for (const { patterns, excludes, to } of this.redirects) {
            const params: ViewParams = preParams === undefined ? {} : Object.assign({}, preParams);
            if (
                patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined
            ) {
                let uri = to;
                for (const [key, value] of Object.entries(params)) {
                    uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value === undefined ? "" : value);
                }
                this.goNoHistory(`/${uri}`);
                return;
            }
        }

        for (const { patterns, excludes, viewType } of this.routes) {
            const params: ViewParams = preParams === undefined ? {} : Object.assign({}, preParams);
            const openingView = this.openingViews.find((ov) => ov instanceof viewType);
            if (
                patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined
            ) {
                if (openingView === undefined) {
                    this.openingViews.push(new viewType(params, uri));
                    viewCreated = true;
                } else {
                    openingView.changeParams(params, uri);
                }
            } else if (openingView !== undefined) {
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

    public route(patterns: string | string[], viewType: ViewType, excludes: string[] = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.routes.push({ patterns, excludes, viewType });

        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        const params: ViewParams = {};
        if (
            patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
            excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined
        ) {
            this.openingViews.push(new viewType(params, uri));
        }
    }

    public redirect(patterns: string | string[], to: string, excludes: string[] = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.redirects.push({ patterns, excludes, to });

        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        const params: ViewParams = {};
        if (
            patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
            excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined
        ) {
            let uri = to;
            for (const [key, value] of Object.entries(params)) {
                uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value === undefined ? "" : value);
            }
            this.goNoHistory(`/${uri}`);
        }
    }

    public go(uri: string, params?: ViewParams) {
        if (location.pathname !== uri) {
            history.pushState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }

    public goNoHistory(uri: string, params?: ViewParams) {
        if (location.pathname !== uri) {
            history.replaceState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }

    public waitAndGo(uri: string, params?: ViewParams) {
        setTimeout(() => this.go(uri, params));
    }

    public refresh() {

        for (const openingView of this.openingViews.reverse()) {
            openingView.close();
        }
        this.openingViews = [];

        const pathname = location.pathname[location.pathname.length - 1] === "/" ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        const uri = decodeURIComponent(pathname.substring(1));
        const uriParts = uri.split("/");
        for (const { patterns, excludes, viewType } of this.routes) {
            const params: ViewParams = {};
            if (
                patterns.find((pattern) => URIParser.match(uriParts, pattern, params)) !== undefined &&
                excludes.find((exclude) => URIParser.match(uriParts, exclude)) === undefined
            ) {
                this.openingViews.push(new viewType(params, uri));
            }
        }
    }
}

export default new SkyRouter();
