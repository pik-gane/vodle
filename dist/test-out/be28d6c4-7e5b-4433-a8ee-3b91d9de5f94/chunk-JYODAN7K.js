import {
  createAnimation,
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  MENU_BACK_BUTTON_PRIORITY,
  addCloseWatcherCondition,
  init_overlays_DmDY_El7
} from "./chunk-VQMD36Q3.js";
import {
  componentOnReady,
  doc,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  init_index_BpRUsN_W,
  printIonWarning
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-DIouXecD.js
var baseAnimation, menuOverlayAnimation, menuPushAnimation, menuRevealAnimation, createMenuController, menuController;
var init_index_DIouXecD = __esm({
  "node_modules/@ionic/core/dist/esm/index-DIouXecD.js"() {
    init_helpers_BJqKF1pr();
    init_overlays_DmDY_El7();
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    init_animation_DmtJpz89();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    baseAnimation = (isIos) => {
      return createAnimation().duration(isIos ? 400 : 300);
    };
    menuOverlayAnimation = (menu) => {
      let closedX;
      let openedX;
      const width = menu.width + 8;
      const menuAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      if (menu.isEndSide) {
        closedX = width + "px";
        openedX = "0px";
      } else {
        closedX = -width + "px";
        openedX = "0px";
      }
      menuAnimation.addElement(menu.menuInnerEl).fromTo("transform", `translateX(${closedX})`, `translateX(${openedX})`);
      const mode = getIonMode(menu);
      const isIos = mode === "ios";
      const opacity = isIos ? 0.2 : 0.25;
      backdropAnimation.addElement(menu.backdropEl).fromTo("opacity", 0.01, opacity);
      return baseAnimation(isIos).addAnimation([menuAnimation, backdropAnimation]);
    };
    menuPushAnimation = (menu) => {
      let contentOpenedX;
      let menuClosedX;
      const mode = getIonMode(menu);
      const width = menu.width;
      if (menu.isEndSide) {
        contentOpenedX = -width + "px";
        menuClosedX = width + "px";
      } else {
        contentOpenedX = width + "px";
        menuClosedX = -width + "px";
      }
      const menuAnimation = createAnimation().addElement(menu.menuInnerEl).fromTo("transform", `translateX(${menuClosedX})`, "translateX(0px)");
      const contentAnimation = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${contentOpenedX})`);
      const backdropAnimation = createAnimation().addElement(menu.backdropEl).fromTo("opacity", 0.01, 0.32);
      return baseAnimation(mode === "ios").addAnimation([menuAnimation, contentAnimation, backdropAnimation]);
    };
    menuRevealAnimation = (menu) => {
      const mode = getIonMode(menu);
      const openedX = menu.width * (menu.isEndSide ? -1 : 1) + "px";
      const contentOpen = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${openedX})`);
      return baseAnimation(mode === "ios").addAnimation(contentOpen);
    };
    createMenuController = () => {
      const menuAnimations = /* @__PURE__ */ new Map();
      const menus = [];
      const open = (menu) => __async(null, null, function* () {
        const menuEl = yield get(menu, true);
        if (menuEl) {
          return menuEl.open();
        }
        return false;
      });
      const close = (menu) => __async(null, null, function* () {
        const menuEl = yield menu !== void 0 ? get(menu, true) : getOpen();
        if (menuEl !== void 0) {
          return menuEl.close();
        }
        return false;
      });
      const toggle = (menu) => __async(null, null, function* () {
        const menuEl = yield get(menu, true);
        if (menuEl) {
          return menuEl.toggle();
        }
        return false;
      });
      const enable = (shouldEnable, menu) => __async(null, null, function* () {
        const menuEl = yield get(menu);
        if (menuEl) {
          menuEl.disabled = !shouldEnable;
        }
        return menuEl;
      });
      const swipeGesture = (shouldEnable, menu) => __async(null, null, function* () {
        const menuEl = yield get(menu);
        if (menuEl) {
          menuEl.swipeGesture = shouldEnable;
        }
        return menuEl;
      });
      const isOpen = (menu) => __async(null, null, function* () {
        if (menu != null) {
          const menuEl = yield get(menu);
          return menuEl !== void 0 && menuEl.isOpen();
        } else {
          const menuEl = yield getOpen();
          return menuEl !== void 0;
        }
      });
      const isEnabled = (menu) => __async(null, null, function* () {
        const menuEl = yield get(menu);
        if (menuEl) {
          return !menuEl.disabled;
        }
        return false;
      });
      const get = (menu, logOnMultipleSideMenus = false) => __async(null, null, function* () {
        yield waitUntilReady();
        if (menu === "start" || menu === "end") {
          const menuRefs = menus.filter((m) => m.side === menu && !m.disabled);
          if (menuRefs.length >= 1) {
            if (menuRefs.length > 1 && logOnMultipleSideMenus) {
              printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${menuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, menuRefs.map((m) => m.el));
            }
            return menuRefs[0].el;
          }
          const sideMenuRefs = menus.filter((m) => m.side === menu);
          if (sideMenuRefs.length >= 1) {
            if (sideMenuRefs.length > 1 && logOnMultipleSideMenus) {
              printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${sideMenuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, sideMenuRefs.map((m) => m.el));
            }
            return sideMenuRefs[0].el;
          }
        } else if (menu != null) {
          return find((m) => m.menuId === menu);
        }
        const menuEl = find((m) => !m.disabled);
        if (menuEl) {
          return menuEl;
        }
        return menus.length > 0 ? menus[0].el : void 0;
      });
      const getOpen = () => __async(null, null, function* () {
        yield waitUntilReady();
        return _getOpenSync();
      });
      const getMenus = () => __async(null, null, function* () {
        yield waitUntilReady();
        return getMenusSync();
      });
      const isAnimating = () => __async(null, null, function* () {
        yield waitUntilReady();
        return isAnimatingSync();
      });
      const registerAnimation = (name, animation) => {
        menuAnimations.set(name, animation);
      };
      const _register = (menu) => {
        if (menus.indexOf(menu) < 0) {
          menus.push(menu);
        }
      };
      const _unregister = (menu) => {
        const index = menus.indexOf(menu);
        if (index > -1) {
          menus.splice(index, 1);
        }
      };
      const _setOpen = (menu, shouldOpen, animated, role) => __async(null, null, function* () {
        if (isAnimatingSync()) {
          return false;
        }
        if (shouldOpen) {
          const openedMenu = yield getOpen();
          if (openedMenu && menu.el !== openedMenu) {
            yield openedMenu.setOpen(false, false);
          }
        }
        return menu._setOpen(shouldOpen, animated, role);
      });
      const _createAnimation = (type, menuCmp) => {
        const animationBuilder = menuAnimations.get(type);
        if (!animationBuilder) {
          throw new Error("animation not registered");
        }
        const animation = animationBuilder(menuCmp);
        return animation;
      };
      const _getOpenSync = () => {
        return find((m) => m._isOpen);
      };
      const getMenusSync = () => {
        return menus.map((menu) => menu.el);
      };
      const isAnimatingSync = () => {
        return menus.some((menu) => menu.isAnimating);
      };
      const find = (predicate) => {
        const instance = menus.find(predicate);
        if (instance !== void 0) {
          return instance.el;
        }
        return void 0;
      };
      const waitUntilReady = () => {
        return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map((menu) => new Promise((resolve) => componentOnReady(menu, resolve))));
      };
      registerAnimation("reveal", menuRevealAnimation);
      registerAnimation("push", menuPushAnimation);
      registerAnimation("overlay", menuOverlayAnimation);
      addCloseWatcherCondition(() => _getOpenSync() !== void 0);
      doc?.addEventListener("ionBackButton", (ev) => {
        const openMenu = _getOpenSync();
        if (openMenu) {
          ev.detail.register(MENU_BACK_BUTTON_PRIORITY, () => {
            return openMenu.close();
          });
        }
      });
      return {
        registerAnimation,
        get,
        getMenus,
        getOpen,
        isEnabled,
        swipeGesture,
        isAnimating,
        isOpen,
        enable,
        toggle,
        close,
        open,
        _getOpenSync,
        _createAnimation,
        _register,
        _unregister,
        _setOpen
      };
    };
    menuController = /* @__PURE__ */ createMenuController();
  }
});

export {
  menuController,
  init_index_DIouXecD
};
//# debugId=1cda5cde-9273-57f3-a5c2-e8c5517ce94c
//# sourceMappingURL=chunk-JYODAN7K.js.map
