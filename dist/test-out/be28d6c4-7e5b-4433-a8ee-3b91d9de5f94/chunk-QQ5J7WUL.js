import {
  WebPlugin,
  init_dist
} from "./chunk-A2IUBHOU.js";
import {
  __async
} from "./chunk-PKPTYHZH.js";

// node_modules/@capacitor/share/dist/esm/web.js
init_dist();
var ShareWeb = class extends WebPlugin {
  canShare() {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.share) {
        return { value: false };
      } else {
        return { value: true };
      }
    });
  }
  share(options) {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.share) {
        throw this.unavailable("Share API not available in this browser");
      }
      yield navigator.share({
        title: options.title,
        text: options.text,
        url: options.url
      });
      return {};
    });
  }
};
export {
  ShareWeb
};
//# debugId=62ddecf5-2ca1-5f75-9d7d-7a2468e478e1
//# sourceMappingURL=chunk-QQ5J7WUL.js.map
