import { Router, ThemeManager } from "gaia-commons-browser";

(async () => {
    ThemeManager.init();

    if (sessionStorage.__spa_path) {
        Router.goNoHistory(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }

})();
