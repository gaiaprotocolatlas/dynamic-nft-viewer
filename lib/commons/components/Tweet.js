import el from "../dom/el.js";
import ThemeManager from "../theme/ThemeManager.js";
import GaiaComponent from "./GaiaComponent.js";
export default class Tweet extends GaiaComponent {
    constructor(options) {
        super(".tweet");
        const loading = el(".loading", "Loading Tweet...").appendTo(this);
        window.twttr.widgets.createTweet(options.tweetId, this.domElement, {
            theme: ThemeManager.showingTheme,
        }).then(() => loading.delete());
    }
}
//# sourceMappingURL=Tweet.js.map