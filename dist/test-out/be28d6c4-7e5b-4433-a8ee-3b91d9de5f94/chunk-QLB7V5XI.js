import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/config-DWCzVL3Y.js
var setupConfig, ENABLE_HTML_CONTENT_DEFAULT;
var init_config_DWCzVL3Y = __esm({
  "node_modules/@ionic/core/dist/esm/config-DWCzVL3Y.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    setupConfig = (config) => {
      const win = window;
      const Ionic = win.Ionic;
      if (Ionic && Ionic.config && Ionic.config.constructor.name !== "Object") {
        return;
      }
      win.Ionic = win.Ionic || {};
      win.Ionic.config = __spreadValues(__spreadValues({}, win.Ionic.config), config);
      return win.Ionic.config;
    };
    ENABLE_HTML_CONTENT_DEFAULT = false;
  }
});

export {
  setupConfig,
  ENABLE_HTML_CONTENT_DEFAULT,
  init_config_DWCzVL3Y
};
//# debugId=8382f4ef-b35b-5f19-8f9c-7cfda8d53a7d
//# sourceMappingURL=chunk-QLB7V5XI.js.map
