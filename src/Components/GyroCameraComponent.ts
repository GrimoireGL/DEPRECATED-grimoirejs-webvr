import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Quaternion from "grimoirejs-math/ref/Quaternion";

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
