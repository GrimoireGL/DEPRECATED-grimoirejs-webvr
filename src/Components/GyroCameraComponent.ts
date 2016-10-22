import TransformComponent from "grimoirejs-fundamental/lib/Components/TransformComponent";
import Component from "grimoirejs/lib/Node/Component";
import IAttributeDeclaration from "grimoirejs/lib/Node/IAttributeDeclaration";
import {Quaternion} from "grimoirejs-math";

export default class GyroCameraComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    baseRotation: {
      converter: "Rotation3",
      defaultValue: "z(90d)"
    }
  };

  private _transform: TransformComponent;

  private _baseRotation: Quaternion;

  public $mount(): void {
    this.getAttribute("baseRotation").boundTo("_baseRotation");
    window.addEventListener("deviceorientation", this._handleOrientation.bind(this), true);
    this._transform = this.node.getComponent("Transform") as TransformComponent;
  }

  private _handleOrientation(e: DeviceOrientationEvent): void {
    this._transform.localRotation = Quaternion.multiply(this._baseRotation, Quaternion.euler(e.beta / 180 * Math.PI, e.alpha / 180 * Math.PI, -e.gamma / 180 * Math.PI, ));
  }
}
