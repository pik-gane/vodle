import {
  config,
  configFromSession,
  configFromURL,
  getMode,
  init_index_BpRUsN_W,
  printIonWarning,
  saveConfig,
  setMode
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ionic-global-Cep6oYzK.js
var getPlatforms, isPlatform, setupPlatforms, detectPlatforms, isMobileWeb, isIpad, isIphone, isIOS, isAndroid, isAndroidTablet, isPhablet, isTablet, isMobile, isDesktop, isHybrid, isCordova, isCapacitorNative, isElectron, isPWA, testUserAgent, matchMedia, PLATFORMS_MAP, defaultMode, getIonMode, initialize;
var init_ionic_global_Cep6oYzK = __esm({
  "node_modules/@ionic/core/dist/esm/ionic-global-Cep6oYzK.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getPlatforms = (win) => setupPlatforms(win);
    isPlatform = (winOrPlatform, platform) => {
      if (typeof winOrPlatform === "string") {
        platform = winOrPlatform;
        winOrPlatform = void 0;
      }
      return getPlatforms(winOrPlatform).includes(platform);
    };
    setupPlatforms = (win = window) => {
      if (typeof win === "undefined") {
        return [];
      }
      win.Ionic = win.Ionic || {};
      let platforms = win.Ionic.platforms;
      if (platforms == null) {
        platforms = win.Ionic.platforms = detectPlatforms(win);
        platforms.forEach((p) => win.document.documentElement.classList.add(`plt-${p}`));
      }
      return platforms;
    };
    detectPlatforms = (win) => {
      const customPlatformMethods = config.get("platform");
      return Object.keys(PLATFORMS_MAP).filter((p) => {
        const customMethod = customPlatformMethods?.[p];
        return typeof customMethod === "function" ? customMethod(win) : PLATFORMS_MAP[p](win);
      });
    };
    isMobileWeb = (win) => isMobile(win) && !isHybrid(win);
    isIpad = (win) => {
      if (testUserAgent(win, /iPad/i)) {
        return true;
      }
      if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
      }
      return false;
    };
    isIphone = (win) => testUserAgent(win, /iPhone/i);
    isIOS = (win) => testUserAgent(win, /iPhone|iPod/i) || isIpad(win);
    isAndroid = (win) => testUserAgent(win, /android|sink/i);
    isAndroidTablet = (win) => {
      return isAndroid(win) && !testUserAgent(win, /mobile/i);
    };
    isPhablet = (win) => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const smallest = Math.min(width, height);
      const largest = Math.max(width, height);
      return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
    };
    isTablet = (win) => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const smallest = Math.min(width, height);
      const largest = Math.max(width, height);
      return isIpad(win) || isAndroidTablet(win) || smallest > 460 && smallest < 820 && largest > 780 && largest < 1400;
    };
    isMobile = (win) => matchMedia(win, "(any-pointer:coarse)");
    isDesktop = (win) => !isMobile(win);
    isHybrid = (win) => isCordova(win) || isCapacitorNative(win);
    isCordova = (win) => !!(win["cordova"] || win["phonegap"] || win["PhoneGap"]);
    isCapacitorNative = (win) => {
      const capacitor = win["Capacitor"];
      return !!capacitor?.isNativePlatform?.();
    };
    isElectron = (win) => testUserAgent(win, /electron/i);
    isPWA = (win) => !!(win.matchMedia?.("(display-mode: standalone)").matches || win.navigator.standalone);
    testUserAgent = (win, expr) => expr.test(win.navigator.userAgent);
    matchMedia = (win, query) => win.matchMedia?.(query).matches;
    PLATFORMS_MAP = {
      ipad: isIpad,
      iphone: isIphone,
      ios: isIOS,
      android: isAndroid,
      phablet: isPhablet,
      tablet: isTablet,
      cordova: isCordova,
      capacitor: isCapacitorNative,
      electron: isElectron,
      pwa: isPWA,
      mobile: isMobile,
      mobileweb: isMobileWeb,
      desktop: isDesktop,
      hybrid: isHybrid
    };
    getIonMode = (ref) => {
      return ref && getMode(ref) || defaultMode;
    };
    initialize = (userConfig = {}) => {
      if (typeof window === "undefined") {
        return;
      }
      const doc = window.document;
      const win = window;
      const Ionic = win.Ionic = win.Ionic || {};
      const configObj = __spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, configFromSession(win)), {
        persistConfig: false
      }), Ionic.config), configFromURL(win)), userConfig);
      config.reset(configObj);
      if (config.getBoolean("persistConfig")) {
        saveConfig(win, configObj);
      }
      setupPlatforms(win);
      Ionic.config = config;
      Ionic.mode = defaultMode = config.get("mode", doc.documentElement.getAttribute("mode") || (isPlatform(win, "ios") ? "ios" : "md"));
      config.set("mode", defaultMode);
      doc.documentElement.setAttribute("mode", defaultMode);
      doc.documentElement.classList.add(defaultMode);
      if (config.getBoolean("_testing")) {
        config.set("animated", false);
      }
      const isIonicElement = (elm) => elm.tagName?.startsWith("ION-");
      const isAllowedIonicModeValue = (elmMode) => ["ios", "md"].includes(elmMode);
      setMode((elm) => {
        while (elm) {
          const elmMode = elm.mode || elm.getAttribute("mode");
          if (elmMode) {
            if (isAllowedIonicModeValue(elmMode)) {
              return elmMode;
            } else if (isIonicElement(elm)) {
              printIonWarning('Invalid ionic mode: "' + elmMode + '", expected: "ios" or "md"');
            }
          }
          elm = elm.parentElement;
        }
        return defaultMode;
      });
    };
  }
});

export {
  isPlatform,
  getIonMode,
  initialize,
  init_ionic_global_Cep6oYzK
};
//# debugId=a64e85d1-e7a4-524e-95d1-5e8af2a75540
//# sourceMappingURL=chunk-URXKFSPR.js.map
