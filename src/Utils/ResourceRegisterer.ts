import EnvUniformResolver from "grimoirejs-fundamental/ref/Material/EnvUniformValueResolver";
import GeometryBuilder from "grimoirejs-fundamental/ref/Geometry/GeometryBuilder";
import GeometryFactory from "grimoirejs-fundamental/ref/Geometry/GeometryFactory";
import GeometryUtility from "grimoirejs-fundamental/ref/Geometry/GeometryUtility";

export default class ResourceRegisterer {
  public static register(): void {
    ResourceRegisterer._registerUniformEnvVariable();
  }

  private static _registerUniformEnvVariable(): void {
    const viewportOffsetScale = [0, 0, 0.5, 1, 0.5, 0, 0.5, 1]
    EnvUniformResolver.addResolver("_viewportOffsetScale", (valInfo, name) => (proxy, args) => proxy.uniformVector4Array(name, viewportOffsetScale));
  }

  private static * _generateIndicies(): IterableIterator<number> {

  }
}
