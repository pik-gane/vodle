import {
  chevronForwardOutline,
  ellipsisHorizontal,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  inheritAriaAttributes,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  createColorClasses,
  hostContext,
  init_theme_byZM6qHV,
  openURL
} from "./chunk-VEPFSKM7.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-breadcrumb_2.entry.js
var breadcrumbIosCss, breadcrumbMdCss, Breadcrumb, breadcrumbsIosCss, breadcrumbsMdCss, Breadcrumbs;
var init_ion_breadcrumb_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-breadcrumb_2.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    breadcrumbIosCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;color:var(--color);font-size:1rem;font-weight:400;line-height:1.5}.breadcrumb-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;outline:none;background:inherit}:host(.breadcrumb-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.breadcrumb-active){color:var(--color-active)}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .breadcrumb-native{background:var(--background-focused)}@media (any-hover: hover){:host(.ion-activatable:hover){color:var(--color-hover)}:host(.ion-activatable.in-breadcrumbs-color:hover),:host(.ion-activatable.ion-color:hover){color:var(--ion-color-shade)}}.breadcrumb-separator{display:-ms-inline-flexbox;display:inline-flex}:host(.breadcrumb-collapsed) .breadcrumb-native{display:none}:host(.in-breadcrumbs-color),:host(.in-breadcrumbs-color.breadcrumb-active){color:var(--ion-color-base)}:host(.in-breadcrumbs-color) .breadcrumb-separator{color:var(--ion-color-base)}:host(.ion-color){color:var(--ion-color-base)}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumb-separator{color:rgba(var(--ion-color-contrast-rgb), 0.8)}:host(.in-toolbar-color.breadcrumb-active){color:var(--ion-color-contrast)}.breadcrumbs-collapsed-indicator{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:14px;margin-inline-end:14px;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 1 100%;flex:1 1 100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:32px;height:18px;border:0;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.breadcrumbs-collapsed-indicator ion-icon{margin-top:1px;font-size:1.375rem}:host{--color:var(--ion-color-step-850, var(--ion-text-color-step-150, #2d4665));--color-active:var(--ion-text-color, #03060b);--color-hover:var(--ion-text-color, #03060b);--color-focused:var(--color-active);--background-focused:var(--ion-color-step-50, var(--ion-background-color-step-50, rgba(233, 237, 243, 0.7)));font-size:clamp(16px, 1rem, 22px)}:host(.breadcrumb-active){font-weight:600}.breadcrumb-native{border-radius:4px;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:5px;padding-bottom:5px;border:1px solid transparent}:host(.ion-focused) .breadcrumb-native{border-radius:8px}:host(.in-breadcrumbs-color.ion-focused) .breadcrumb-native,:host(.ion-color.ion-focused) .breadcrumb-native{background:rgba(var(--ion-color-base-rgb), 0.1);color:var(--ion-color-base)}:host(.ion-focused) ::slotted(ion-icon),:host(.in-breadcrumbs-color.ion-focused) ::slotted(ion-icon),:host(.ion-color.ion-focused) ::slotted(ion-icon){color:var(--ion-color-step-750, var(--ion-text-color-step-250, #445b78))}.breadcrumb-separator{color:var(--ion-color-step-550, var(--ion-text-color-step-450, #73849a))}::slotted(ion-icon){color:var(--ion-color-step-400, var(--ion-text-color-step-600, #92a0b3));font-size:min(1.125rem, 21.6px)}::slotted(ion-icon[slot=start]){-webkit-margin-end:8px;margin-inline-end:8px}::slotted(ion-icon[slot=end]){-webkit-margin-start:8px;margin-inline-start:8px}:host(.breadcrumb-active) ::slotted(ion-icon){color:var(--ion-color-step-850, var(--ion-text-color-step-150, #242d39))}.breadcrumbs-collapsed-indicator{border-radius:4px;background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e9edf3));color:var(--ion-color-step-550, var(--ion-text-color-step-450, #73849a))}.breadcrumbs-collapsed-indicator:hover{opacity:0.45}.breadcrumbs-collapsed-indicator:focus{background:var(--ion-color-step-150, var(--ion-background-color-step-150, #d9e0ea))}.breadcrumbs-collapsed-indicator ion-icon{font-size:min(1.375rem, 22px)}`;
    breadcrumbMdCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;color:var(--color);font-size:1rem;font-weight:400;line-height:1.5}.breadcrumb-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;outline:none;background:inherit}:host(.breadcrumb-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.breadcrumb-active){color:var(--color-active)}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .breadcrumb-native{background:var(--background-focused)}@media (any-hover: hover){:host(.ion-activatable:hover){color:var(--color-hover)}:host(.ion-activatable.in-breadcrumbs-color:hover),:host(.ion-activatable.ion-color:hover){color:var(--ion-color-shade)}}.breadcrumb-separator{display:-ms-inline-flexbox;display:inline-flex}:host(.breadcrumb-collapsed) .breadcrumb-native{display:none}:host(.in-breadcrumbs-color),:host(.in-breadcrumbs-color.breadcrumb-active){color:var(--ion-color-base)}:host(.in-breadcrumbs-color) .breadcrumb-separator{color:var(--ion-color-base)}:host(.ion-color){color:var(--ion-color-base)}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumb-separator{color:rgba(var(--ion-color-contrast-rgb), 0.8)}:host(.in-toolbar-color.breadcrumb-active){color:var(--ion-color-contrast)}.breadcrumbs-collapsed-indicator{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:14px;margin-inline-end:14px;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 1 100%;flex:1 1 100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:32px;height:18px;border:0;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.breadcrumbs-collapsed-indicator ion-icon{margin-top:1px;font-size:1.375rem}:host{--color:var(--ion-color-step-600, var(--ion-text-color-step-400, #677483));--color-active:var(--ion-text-color, #03060b);--color-hover:var(--ion-text-color, #03060b);--color-focused:var(--ion-color-step-800, var(--ion-text-color-step-200, #35404e));--background-focused:var(--ion-color-step-50, var(--ion-background-color-step-50, #fff))}:host(.breadcrumb-active){font-weight:500}.breadcrumb-native{-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px}.breadcrumb-separator{-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:-1px}:host(.ion-focused) .breadcrumb-native{border-radius:4px;-webkit-box-shadow:0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.12);box-shadow:0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.12)}.breadcrumb-separator{color:var(--ion-color-step-550, var(--ion-text-color-step-450, #73849a))}::slotted(ion-icon){color:var(--ion-color-step-550, var(--ion-text-color-step-450, #7d8894));font-size:1.125rem}::slotted(ion-icon[slot=start]){-webkit-margin-end:8px;margin-inline-end:8px}::slotted(ion-icon[slot=end]){-webkit-margin-start:8px;margin-inline-start:8px}:host(.breadcrumb-active) ::slotted(ion-icon){color:var(--ion-color-step-850, var(--ion-text-color-step-150, #222d3a))}.breadcrumbs-collapsed-indicator{border-radius:2px;background:var(--ion-color-step-100, var(--ion-background-color-step-100, #eef1f3));color:var(--ion-color-step-550, var(--ion-text-color-step-450, #73849a))}.breadcrumbs-collapsed-indicator:hover{opacity:0.7}.breadcrumbs-collapsed-indicator:focus{background:var(--ion-color-step-150, var(--ion-background-color-step-150, #dfe5e8))}`;
    Breadcrumb = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.collapsedClick = createEvent(this, "collapsedClick", 7);
        this.inheritedAttributes = {};
        this.collapsed = false;
        this.active = false;
        this.disabled = false;
        this.routerDirection = "forward";
        this.onFocus = () => {
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.ionBlur.emit();
        };
        this.collapsedIndicatorClick = () => {
          this.collapsedClick.emit({ ionShadowTarget: this.collapsedRef });
        };
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAriaAttributes(this.el);
      }
      isClickable() {
        return this.href !== void 0;
      }
      render() {
        const { color, active, collapsed, disabled, download, el, inheritedAttributes, last, routerAnimation, routerDirection, separator, showCollapsedIndicator, target } = this;
        const clickable = this.isClickable();
        const TagType = this.href === void 0 ? "span" : "a";
        const href = disabled ? void 0 : this.href;
        const mode = getIonMode(this);
        const attrs = TagType === "span" ? {} : {
          download,
          href,
          target
        };
        const showSeparator = last ? false : collapsed ? showCollapsedIndicator && !last ? true : false : separator;
        return h(Host, { key: "32ca61c83721dff52b5e97171ed449dce3584a55", onClick: (ev) => openURL(href, ev, routerDirection, routerAnimation), "aria-disabled": disabled ? "true" : null, class: createColorClasses(color, {
          [mode]: true,
          "breadcrumb-active": active,
          "breadcrumb-collapsed": collapsed,
          "breadcrumb-disabled": disabled,
          "in-breadcrumbs-color": hostContext("ion-breadcrumbs[color]", el),
          "in-toolbar": hostContext("ion-toolbar", this.el),
          "in-toolbar-color": hostContext("ion-toolbar[color]", this.el),
          "ion-activatable": clickable,
          "ion-focusable": clickable
        }) }, h(TagType, __spreadValues(__spreadProps(__spreadValues({ key: "479feb845f4a6d8009d5422b33eb423730b9722b" }, attrs), { class: "breadcrumb-native", part: "native", disabled, onFocus: this.onFocus, onBlur: this.onBlur }), inheritedAttributes), h("slot", { key: "3c5dcaeb0d258235d1b7707868026ff1d1404099", name: "start" }), h("slot", { key: "f1cfb934443cd97dc220882c5e3596ea879d66cf" }), h("slot", { key: "539710121b5b1f3ee8d4c24a9651b67c2ae08add", name: "end" })), showCollapsedIndicator && h("button", { key: "ed53a95ccd89022c8b7bee0658a221ec62a5c73b", part: "collapsed-indicator", "aria-label": "Show more breadcrumbs", onClick: () => this.collapsedIndicatorClick(), ref: (collapsedEl) => this.collapsedRef = collapsedEl, class: {
          "breadcrumbs-collapsed-indicator": true
        } }, h("ion-icon", { key: "a849e1142a86f06f207cf11662fa2a560ab7fc6a", "aria-hidden": "true", icon: ellipsisHorizontal, lazy: false })), showSeparator && /**
         * Separators should not be announced by narrators.
         * We add aria-hidden on the span so that this applies
         * to any custom separators too.
         */
        h("span", { key: "fc3c741cb01fafef8b26046c7ee5b190efc69a7c", class: "breadcrumb-separator", part: "separator", "aria-hidden": "true" }, h("slot", { key: "4871932ae1dae520767e0713e7cee2d11b0bba6d", name: "separator" }, mode === "ios" ? h("ion-icon", { icon: chevronForwardOutline, lazy: false, "flip-rtl": true }) : h("span", null, "/"))));
      }
      get el() {
        return getElement(this);
      }
    };
    Breadcrumb.style = {
      ios: breadcrumbIosCss(),
      md: breadcrumbMdCss()
    };
    breadcrumbsIosCss = () => `:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:0;padding-bottom:0;-ms-flex-pack:center;justify-content:center}`;
    breadcrumbsMdCss = () => `:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0}`;
    Breadcrumbs = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionCollapsedClick = createEvent(this, "ionCollapsedClick", 7);
        this.itemsBeforeCollapse = 1;
        this.itemsAfterCollapse = 1;
        this.breadcrumbsInit = () => {
          this.setBreadcrumbSeparator();
          this.setMaxItems();
        };
        this.resetActiveBreadcrumb = () => {
          const breadcrumbs = this.getBreadcrumbs();
          const activeBreadcrumb = breadcrumbs.find((breadcrumb) => breadcrumb.active);
          if (activeBreadcrumb && this.activeChanged) {
            activeBreadcrumb.active = false;
          }
        };
        this.setMaxItems = () => {
          const { itemsAfterCollapse, itemsBeforeCollapse, maxItems } = this;
          const breadcrumbs = this.getBreadcrumbs();
          for (const breadcrumb of breadcrumbs) {
            breadcrumb.showCollapsedIndicator = false;
            breadcrumb.collapsed = false;
          }
          const shouldCollapse = maxItems !== void 0 && breadcrumbs.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse <= maxItems;
          if (shouldCollapse) {
            breadcrumbs.forEach((breadcrumb, index) => {
              if (index === itemsBeforeCollapse) {
                breadcrumb.showCollapsedIndicator = true;
              }
              if (index >= itemsBeforeCollapse && index < breadcrumbs.length - itemsAfterCollapse) {
                breadcrumb.collapsed = true;
              }
            });
          }
        };
        this.setBreadcrumbSeparator = () => {
          const { itemsAfterCollapse, itemsBeforeCollapse, maxItems } = this;
          const breadcrumbs = this.getBreadcrumbs();
          const active = breadcrumbs.find((breadcrumb) => breadcrumb.active);
          for (const breadcrumb of breadcrumbs) {
            const last = maxItems !== void 0 && itemsAfterCollapse === 0 ? breadcrumb === breadcrumbs[itemsBeforeCollapse] : breadcrumb === breadcrumbs[breadcrumbs.length - 1];
            breadcrumb.last = last;
            const separator = breadcrumb.separator !== void 0 ? breadcrumb.separator : last ? void 0 : true;
            breadcrumb.separator = separator;
            if (!active && last) {
              breadcrumb.active = true;
              this.activeChanged = true;
            }
          }
        };
        this.getBreadcrumbs = () => {
          return Array.from(this.el.querySelectorAll("ion-breadcrumb"));
        };
        this.slotChanged = () => {
          this.resetActiveBreadcrumb();
          this.breadcrumbsInit();
        };
      }
      onCollapsedClick(ev) {
        const breadcrumbs = this.getBreadcrumbs();
        const collapsedBreadcrumbs = breadcrumbs.filter((breadcrumb) => breadcrumb.collapsed);
        this.ionCollapsedClick.emit(__spreadProps(__spreadValues({}, ev.detail), { collapsedBreadcrumbs }));
      }
      maxItemsChanged() {
        this.resetActiveBreadcrumb();
        this.breadcrumbsInit();
      }
      componentWillLoad() {
        this.breadcrumbsInit();
      }
      render() {
        const { color, collapsed } = this;
        const mode = getIonMode(this);
        return h(Host, { key: "fe64e9cdf597ede2db140bf5fa05a0359d82db57", class: createColorClasses(color, {
          [mode]: true,
          "in-toolbar": hostContext("ion-toolbar", this.el),
          "in-toolbar-color": hostContext("ion-toolbar[color]", this.el),
          "breadcrumbs-collapsed": collapsed
        }) }, h("slot", { key: "a2c99b579e339055c50a613d5c6b61032f5ddffe", onSlotchange: this.slotChanged }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "maxItems": [{
            "maxItemsChanged": 0
          }],
          "itemsBeforeCollapse": [{
            "maxItemsChanged": 0
          }],
          "itemsAfterCollapse": [{
            "maxItemsChanged": 0
          }]
        };
      }
    };
    Breadcrumbs.style = {
      ios: breadcrumbsIosCss(),
      md: breadcrumbsMdCss()
    };
  }
});
init_ion_breadcrumb_2_entry();
export {
  Breadcrumb as ion_breadcrumb,
  Breadcrumbs as ion_breadcrumbs
};
//# debugId=4c6f0e93-9168-5e41-b61b-29e4a29d04bb
//# sourceMappingURL=chunk-FKSJPG7C.js.map
