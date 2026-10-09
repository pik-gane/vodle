import {
  init_dist,
  registerPlugin
} from "./chunk-A2IUBHOU.js";

// node_modules/@capacitor/share/dist/esm/index.js
init_dist();
var Share = registerPlugin("Share", {
  web: () => import("./chunk-QQ5J7WUL.js").then((m) => new m.ShareWeb())
});

export {
  Share
};
//# debugId=8e0711b2-32f2-5303-b607-a464778a13f2
//# sourceMappingURL=chunk-RZBLWBS2.js.map
