import Router from "../Router.js";
import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import Theme from "../theme/Theme.js";
import ThemeManager from "../theme/ThemeManager.js";
import GaiaComponent from "./GaiaComponent.js";

export default class TopBar extends GaiaComponent {

    private logoContainer: DomNode;

    private menuPanel: DomNode;
    private menuContainer: DomNode;
    private menuContainerMain: DomNode;

    constructor(options: {
        logo: DomNode,
        darkModeLogo?: DomNode,
        menu: { name: string, uri: string }[],
    }, ...nodes: (DomNode | string | undefined)[]) {
        super(".topbar");

        this.append(
            this.logoContainer = el("a.logo", (options.darkModeLogo !== undefined && ThemeManager.showingTheme === Theme.Dark ? options.darkModeLogo : options.logo).clone(), {
                href: "/",
                click: (event) => {
                    event.preventDefault();
                    Router.go("/");
                },
            }),
            this.menuPanel = el(".menu-panel",
                this.menuContainer = el(".menu-container",
                    el("header",
                        el("a", el("i.fa-light.fa-xmark"), { click: () => this.hideMobileMenu() }),
                    ),
                    this.menuContainerMain = el("main"),
                    el("footer",
                        ...nodes,
                    ),
                ),
                {
                    click: (event) => {
                        if (this.menuContainer.domElement.contains(event.target) !== true) {
                            this.hideMobileMenu();
                        }
                    },
                },
            ),
            el("a.menu-button", el("i.fa-light.fa-bars"), {
                click: () => this.menuPanel.addClass("active"),
            }),
        );

        for (const menu of options.menu) {
            this.menuContainerMain.append(el("a", menu.name, {
                href: menu.uri,
                click: (event) => {
                    event.preventDefault();
                    Router.go(menu.uri);
                    this.hideMobileMenu();
                },
            }));
        }

        this.onDelegate(ThemeManager, "change", () => {
            this.logoContainer.empty().append((options.darkModeLogo !== undefined && ThemeManager.showingTheme === Theme.Dark ? options.darkModeLogo : options.logo).clone());
        });
    }

    private hideMobileMenu(): void {
        this.menuPanel.deleteClass("active");
    }
}
