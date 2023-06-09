import { Router } from "gaia-commons-browser";
import GaiaProtocolGods from "./view/GaiaProtocolGods.js";
import ShigorSparrows from "./view/ShigorSparrows.js";

(async () => {
    Router.route("gaia-protocol-gods/{id}", GaiaProtocolGods);
    Router.route("shigor-sparrows/{id}", ShigorSparrows);
})();
