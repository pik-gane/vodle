import {
  attachComponent,
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonError,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js
var tabCss, Tab, tabsCss, Tabs, getTab;
var init_ion_tab_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js"() {
    init_index_BpRUsN_W();
    init_framework_delegate_CDjM1vRH();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    tabCss = () => `:host(.tab-hidden){display:none !important}`;
    Tab = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.active = false;
      }
      componentWillLoad() {
        return __async(this, null, function* () {
          if (this.active) {
            yield this.setActive();
          }
        });
      }
      /** Set the active component for the tab */
      setActive() {
        return __async(this, null, function* () {
          yield this.prepareLazyLoaded();
          this.active = true;
        });
      }
      changeActive(isActive) {
        if (isActive) {
          this.prepareLazyLoaded().catch((e) => {
            printIonError("[ion-tab] - Exception in prepareLazyLoaded:", e);
          });
        }
      }
      prepareLazyLoaded() {
        if (this.component == null) {
          return Promise.resolve(void 0);
        }
        if (this.loadPromise === void 0) {
          this.loadPromise = attachComponent(this.delegate, this.el, this.component, ["ion-page"]).catch((e) => {
            this.loadPromise = void 0;
            throw e;
          });
        }
        return this.loadPromise;
      }
      render() {
        const { tab, active, component } = this;
        return h(Host, { key: "8ecbd7a85d3370ed8ed40561cd8134e71584d6aa", role: "tabpanel", "aria-hidden": !active ? "true" : null, "aria-labelledby": `tab-button-${tab}`, class: {
          "ion-page": component === void 0,
          "tab-hidden": !active
        } }, h("slot", { key: "8d6326d75812888e33fd09665b7e588e1e270df1" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "active": [{
            "changeActive": 0
          }]
        };
      }
    };
    Tab.style = tabCss();
    tabsCss = () => `:host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner{position:relative;-ms-flex:1;flex:1;contain:layout size style}`;
    Tabs = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionNavWillLoad = createEvent(this, "ionNavWillLoad", 7);
        this.ionTabsWillChange = createEvent(this, "ionTabsWillChange", 3);
        this.ionTabsDidChange = createEvent(this, "ionTabsDidChange", 3);
        this.transitioning = false;
        this.useRouter = false;
        this.onTabClicked = (ev) => {
          const { href, tab } = ev.detail;
          if (this.useRouter && href !== void 0) {
            const router = document.querySelector("ion-router");
            if (router) {
              router.push(href);
            }
          } else {
            this.select(tab);
          }
        };
      }
      componentWillLoad() {
        return __async(this, null, function* () {
          if (!this.useRouter) {
            this.useRouter = (!!this.el.querySelector("ion-router-outlet") || !!document.querySelector("ion-router")) && !this.el.closest("[no-router]");
          }
          if (!this.useRouter) {
            const tabs = this.tabs;
            if (tabs.length > 0) {
              yield this.select(tabs[0]);
            }
          }
          this.ionNavWillLoad.emit();
        });
      }
      componentDidLoad() {
        this.updateTabBar();
      }
      componentDidUpdate() {
        this.updateTabBar();
      }
      updateTabBar() {
        const tabBar = this.el.querySelector("ion-tab-bar");
        if (!tabBar) {
          return;
        }
        const tab = this.selectedTab ? this.selectedTab.tab : void 0;
        if (tab === void 0) {
          return;
        }
        if (tabBar.selectedTab === tab) {
          return;
        }
        tabBar.selectedTab = tab;
      }
      /**
       * Select a tab by the value of its `tab` property or an element reference. This method is only available for vanilla JavaScript projects. The Angular, React, and Vue implementations of tabs are coupled to each framework's router.
       *
       * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
       */
      select(tab) {
        return __async(this, null, function* () {
          const selectedTab = getTab(this.tabs, tab);
          if (!this.shouldSwitch(selectedTab)) {
            return false;
          }
          yield this.setActive(selectedTab);
          yield this.notifyRouter();
          this.tabSwitch();
          return true;
        });
      }
      /**
       * Get a specific tab by the value of its `tab` property or an element reference. This method is only available for vanilla JavaScript projects. The Angular, React, and Vue implementations of tabs are coupled to each framework's router.
       *
       * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
       */
      getTab(tab) {
        return __async(this, null, function* () {
          return getTab(this.tabs, tab);
        });
      }
      /**
       * Get the currently selected tab. This method is only available for vanilla JavaScript projects. The Angular, React, and Vue implementations of tabs are coupled to each framework's router.
       */
      getSelected() {
        return Promise.resolve(this.selectedTab ? this.selectedTab.tab : void 0);
      }
      /** @internal */
      setRouteId(id) {
        return __async(this, null, function* () {
          const selectedTab = getTab(this.tabs, id);
          if (!this.shouldSwitch(selectedTab)) {
            return { changed: false, element: this.selectedTab };
          }
          yield this.setActive(selectedTab);
          return {
            changed: true,
            element: this.selectedTab,
            markVisible: () => this.tabSwitch()
          };
        });
      }
      /** @internal */
      getRouteId() {
        return __async(this, null, function* () {
          const tabId = this.selectedTab?.tab;
          return tabId !== void 0 ? { id: tabId, element: this.selectedTab } : void 0;
        });
      }
      setActive(selectedTab) {
        if (this.transitioning) {
          return Promise.reject("transitioning already happening");
        }
        this.transitioning = true;
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab: selectedTab.tab });
        selectedTab.active = true;
        this.updateTabBar();
        return Promise.resolve();
      }
      tabSwitch() {
        const selectedTab = this.selectedTab;
        const leavingTab = this.leavingTab;
        this.leavingTab = void 0;
        this.transitioning = false;
        if (!selectedTab) {
          return;
        }
        if (leavingTab !== selectedTab) {
          if (leavingTab) {
            leavingTab.active = false;
          }
          this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
      }
      notifyRouter() {
        if (this.useRouter) {
          const router = document.querySelector("ion-router");
          if (router) {
            return router.navChanged("forward");
          }
        }
        return Promise.resolve(false);
      }
      shouldSwitch(selectedTab) {
        const leavingTab = this.selectedTab;
        return selectedTab !== void 0 && selectedTab !== leavingTab && !this.transitioning;
      }
      get tabs() {
        return Array.from(this.el.querySelectorAll("ion-tab"));
      }
      render() {
        return h(Host, { key: "7b8c6455e0673e343d0c759ed85e0d9970de3bb8", onIonTabButtonClick: this.onTabClicked }, h("slot", { key: "7d0d840ae03312ca22bcb694ffca738d6648218e", name: "top" }), h("div", { key: "f336d903800af34af0d36adfc94223b940111e6a", class: "tabs-inner" }, h("slot", { key: "14656154959a24ae176eff20f6463043180d2eae" })), h("slot", { key: "2be4d114f058d24b0e70fb12cfb0eccd3d6e6a74", name: "bottom" }));
      }
      get el() {
        return getElement(this);
      }
    };
    getTab = (tabs, tab) => {
      const tabEl = typeof tab === "string" ? tabs.find((t) => t.tab === tab) : tab;
      if (!tabEl) {
        printIonError(`[ion-tabs] - Tab with id: "${tabEl}" does not exist`);
      }
      return tabEl;
    };
    Tabs.style = tabsCss();
  }
});
init_ion_tab_2_entry();
export {
  Tab as ion_tab,
  Tabs as ion_tabs
};
//# debugId=bd8a25cd-3a25-58e6-b83f-ee8725d46b2a
//# sourceMappingURL=chunk-2MZMPOWZ.js.map
