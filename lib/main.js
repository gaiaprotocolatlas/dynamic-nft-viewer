import { Router, ThemeManager } from "gaia-commons-browser";
import GaiaProtocolGods from "./view/GaiaProtocolGods.js";
import ShigorSparrows from "./view/ShigorSparrows.js";
(async () => {
    ThemeManager.init();
    if (sessionStorage.__spa_path) {
        Router.goNoHistory(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    Router.route("gaia-protocol-gods/{id}", GaiaProtocolGods);
    Router.route("shigor-sparrows/{id}", ShigorSparrows);
})();
//# sourceMappingURL=main.js.map