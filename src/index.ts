  import ComponentsGyroCameraComponent from "./Components/GyroCameraComponent";
  import UtilsResourceRegisterer from "./Utils/ResourceRegisterer";

import __MAIN__ from "./main"

var __EXPOSE__ = {
  "Components": {
    "GyroCameraComponent": ComponentsGyroCameraComponent
  },
  "Utils": {
    "ResourceRegisterer": UtilsResourceRegisterer
  }
};

let __BASE__ = __MAIN__();

Object.assign(__BASE__|| {},__EXPOSE__);

window["GrimoireJS"].lib.webvr = __EXPOSE__;

export default __BASE__;
