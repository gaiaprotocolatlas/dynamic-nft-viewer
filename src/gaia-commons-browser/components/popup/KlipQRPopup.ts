import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class KlipQRPopup extends Popup {

    public content: DomNode;

    constructor(title: string, dataURL: string) {
        super({ barrierDismissible: true });
        this.append(this.content = new GaiaComponent(".klip-qr-popup",
            el("h1", title),
            el(".qr", el("img", { src: dataURL })),
            el("p",
                "QR 코드 리더기 또는 카카오톡 앱을 통해 QR 코드를 스캔해주세요.", el("br"),
                "카카오톡 실행 ▶ 상단 검색창 클릭 ▶ 코드 스캔 후 로그인", el("br"),
                "* Klip > 코드스캔 (사이드메뉴)에서도 스캔이 가능합니다.",
            ),
            el("footer",
                new Button({
                    type: ButtonType.Text,
                    title: msg("gaia-components-dialog-close-button"),
                    onClick: () => this.delete(),
                }),
            ),
        ));
    }
}
