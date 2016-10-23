import TransformComponent from "grimoirejs-fundamental/lib/Components/TransformComponent";
import Component from "grimoirejs/lib/Node/Component";
import IAttributeDeclaration from "grimoirejs/lib/Node/IAttributeDeclaration";
import {Quaternion} from "grimoirejs-math";

export default class GyroCameraComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {
        baseRotation: {
            converter: "Rotation3",
            defaultValue: "z(90d)"
        },
        config: {
            converter: "String",
            defaultValue: "+Y+X-Z"
        }
    };

    private _transform: TransformComponent;

    private _baseRotation: Quaternion;

    private _config: string;

    public $mount(): void {
        this.getAttribute("baseRotation").boundTo("_baseRotation");
        window.addEventListener("deviceorientation", this._handleOrientation.bind(this), true);
        this._transform = this.node.getComponent("Transform") as TransformComponent;
        this.getAttribute("config").boundTo("_config");
    }

    private _handleOrientation(e: DeviceOrientationEvent): void {
        const value: number[] = [e.alpha, e.beta, e.gamma];
        const array: number[] = [1, 1, 1];
        if (this.node.enabled) {
            for (let i = 0; i < 3; i++) {
                array[i] = this._config.charAt(2 * i) == "+" ? 1 : -1;
                if (this._config.charAt(2 * i + 1) == "X") {
                    array[0] = array[0] * value[i];
                } else if (this._config.charAt(2 * i + 1) == "Y") {
                    array[1] = array[1] * value[i];
                } else { array[2] = array[2] * value[i]; }
            }
            this._transform.localRotation = Quaternion.multiply(this._baseRotation, Quaternion.euler(array[0] / 180 * Math.PI, array[1] / 180 * Math.PI, array[2] / 180 * Math.PI));
        }
    }
}
