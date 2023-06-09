import { EventContainer, WalletType } from "gaia-commons-ts";
import QRCode from "qrcode";
import Constants from "../Constants.js";
import Store from "../Store.js";
import KlipQRPopup from "../components/popup/KlipQRPopup.js";
import KlipSDK from "klip-sdk";
class Klip extends EventContainer {
    static BAPP_NAME = "Gaia Protocol";
    walletType = WalletType.Klip;
    provider = undefined;
    signer = undefined;
    store = new Store("klip-store");
    klipQRPopup;
    async request(title, res) {
        KlipSDK.request(res.request_key, async () => {
            const qr = await QRCode.toDataURL(`https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`);
            this.klipQRPopup = new KlipQRPopup(title, qr);
        });
        return new Promise((resolve) => {
            const interval = setInterval(async () => {
                const result = await KlipSDK.getResult(res.request_key);
                if (result.result !== undefined) {
                    this.klipQRPopup?.delete();
                    this.klipQRPopup = undefined;
                    clearInterval(interval);
                    setTimeout(() => resolve(result.result), 2000);
                }
            }, 1000);
        });
    }
    async connect() {
        const res = await KlipSDK.prepare.auth({ bappName: Klip.BAPP_NAME });
        const address = (await this.request("QR 코드로 Klip 접속", res)).klaytn_address;
        this.store.set("address", address, true);
    }
    async connected() {
        return await this.getAddress() !== undefined;
    }
    async getAddress() {
        return this.store.get("address");
    }
    async currentChain() {
        throw new Error("Method not implemented.");
    }
    async changeChain(targetChain) {
    }
    async getBalance() {
        throw new Error("Method not implemented.");
    }
    async signMessage(message) {
        const address = await this.getAddress();
        if (address === undefined) {
            throw new Error("Address is not loaded");
        }
        else {
            const res = await KlipSDK.prepare.signMessage({
                bappName: Klip.BAPP_NAME,
                value: message,
            });
            const data = await this.request("QR 코드로 메시지 서명", res);
            return data.signature;
        }
    }
    async signMessageForGaiaLogin(nonce) {
        return await this.signMessage(Constants.GAIA_LOGIN_NONCE_PREFIX + nonce);
    }
    async disconnect() {
        this.store.delete("address");
        location.reload();
    }
}
export default new Klip();
//# sourceMappingURL=Klip.js.map