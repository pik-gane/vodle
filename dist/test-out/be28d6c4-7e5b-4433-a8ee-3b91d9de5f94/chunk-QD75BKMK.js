import {
  findClosestIonContent,
  getScrollElement,
  init_index_TkLga3ma
} from "./chunk-57PV5QBJ.js";
import {
  hapticSelectionChanged,
  hapticSelectionEnd,
  hapticSelectionStart,
  init_haptic_WXfMCob9
} from "./chunk-XHGNMG47.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  init_index_BvabGprD,
  reorderThreeOutline,
  reorderTwoSharp
} from "./chunk-KPUED4ZZ.js";
import {
  init_helpers_BJqKF1pr,
  raf
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
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
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-reorder_2.entry.js
var reorderIosCss, reorderMdCss, Reorder, reorderGroupCss, ReorderGroup, indexForItem, findReorderItem, AUTO_SCROLL_MARGIN, SCROLL_JUMP, ITEM_REORDER_SELECTED, reorderArray;
var init_ion_reorder_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-reorder_2.entry.js"() {
    init_index_BpRUsN_W();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    init_index_TkLga3ma();
    init_helpers_BJqKF1pr();
    init_haptic_WXfMCob9();
    init_dir_Dojwmvde();
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    reorderIosCss = () => `:host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block}::slotted(ion-icon){font-size:dynamic-font(16px)}.reorder-icon{font-size:2.125rem;opacity:0.4}`;
    reorderMdCss = () => `:host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block}::slotted(ion-icon){font-size:dynamic-font(16px)}.reorder-icon{font-size:1.9375rem;opacity:0.3}`;
    Reorder = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      onClick(ev) {
        const reorderGroup = this.el.closest("ion-reorder-group");
        ev.preventDefault();
        if (!reorderGroup || !reorderGroup.disabled) {
          ev.stopImmediatePropagation();
        }
      }
      render() {
        const mode = getIonMode(this);
        const reorderIcon = mode === "ios" ? reorderThreeOutline : reorderTwoSharp;
        return h(Host, { key: "f278c473b4695a6a93565100e4fcaa7f9e3e9ff5", class: mode }, h("slot", { key: "cc26b5ed297f68a0bea82e27e34a7fe945186f4e" }, h("ion-icon", { key: "696f5e4c2b09e64bd08abf0d0818b1554cd29737", icon: reorderIcon, lazy: false, class: "reorder-icon", part: "icon", "aria-hidden": "true" })));
      }
      get el() {
        return getElement(this);
      }
    };
    Reorder.style = {
      ios: reorderIosCss(),
      md: reorderMdCss()
    };
    reorderGroupCss = () => `.reorder-list-active>*{display:block;-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}`;
    ReorderGroup = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionItemReorder = createEvent(this, "ionItemReorder", 7);
        this.ionReorderStart = createEvent(this, "ionReorderStart", 7);
        this.ionReorderMove = createEvent(this, "ionReorderMove", 7);
        this.ionReorderEnd = createEvent(this, "ionReorderEnd", 7);
        this.lastToIndex = -1;
        this.cachedHeights = [];
        this.scrollElTop = 0;
        this.scrollElBottom = 0;
        this.scrollElInitial = 0;
        this.containerTop = 0;
        this.containerBottom = 0;
        this.state = 0;
        this.disabled = true;
      }
      disabledChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const contentEl = findClosestIonContent(this.el);
          if (contentEl) {
            this.scrollEl = yield getScrollElement(contentEl);
          }
          this.gesture = (yield import("./chunk-YHTSP4B3.js")).createGesture({
            el: this.el,
            gestureName: "reorder",
            gesturePriority: 110,
            threshold: 0,
            direction: "y",
            passive: false,
            canStart: (detail) => this.canStart(detail),
            onStart: (ev) => this.onStart(ev),
            onMove: (ev) => this.onMove(ev),
            onEnd: () => this.onEnd()
          });
          this.disabledChanged();
        });
      }
      disconnectedCallback() {
        this.onEnd();
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
      }
      /**
       * Completes the reorder operation. Must be called by the `ionReorderEnd` event.
       *
       * If a list of items is passed, the list will be reordered and returned in the
       * proper order.
       *
       * If no parameters are passed or if `true` is passed in, the reorder will complete
       * and the item will remain in the position it was dragged to. If `false` is passed,
       * the reorder will complete and the item will bounce back to its original position.
       *
       * @param listOrReorder A list of items to be sorted and returned in the new order or a
       * boolean of whether or not the reorder should reposition the item.
       */
      complete(listOrReorder) {
        return Promise.resolve(this.completeReorder(listOrReorder));
      }
      canStart(ev) {
        if (this.selectedItemEl || this.state !== 0) {
          return false;
        }
        const target = ev.event.target;
        const reorderEl = target.closest("ion-reorder");
        if (!reorderEl) {
          return false;
        }
        const item = findReorderItem(reorderEl, this.el);
        if (!item) {
          return false;
        }
        ev.data = item;
        return true;
      }
      onStart(ev) {
        ev.event.preventDefault();
        const item = this.selectedItemEl = ev.data;
        const heights = this.cachedHeights;
        heights.length = 0;
        const el = this.el;
        const children = el.__children || el.children;
        if (!children || children.length === 0) {
          return;
        }
        let sum = 0;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          sum += child.offsetHeight;
          heights.push(sum);
          child.$ionIndex = i;
        }
        const box = el.getBoundingClientRect();
        this.containerTop = box.top;
        this.containerBottom = box.bottom;
        if (this.scrollEl) {
          const scrollBox = this.scrollEl.getBoundingClientRect();
          this.scrollElInitial = this.scrollEl.scrollTop;
          this.scrollElTop = scrollBox.top + AUTO_SCROLL_MARGIN;
          this.scrollElBottom = scrollBox.bottom - AUTO_SCROLL_MARGIN;
        } else {
          this.scrollElInitial = 0;
          this.scrollElTop = 0;
          this.scrollElBottom = 0;
        }
        this.lastToIndex = indexForItem(item);
        this.selectedItemHeight = item.offsetHeight;
        this.state = 1;
        item.classList.add(ITEM_REORDER_SELECTED);
        hapticSelectionStart();
        this.ionReorderStart.emit();
      }
      onMove(ev) {
        const selectedItem = this.selectedItemEl;
        if (!selectedItem) {
          return;
        }
        const scroll = this.autoscroll(ev.currentY);
        const top = this.containerTop - scroll;
        const bottom = this.containerBottom - scroll;
        const currentY = Math.max(top, Math.min(ev.currentY, bottom));
        const deltaY = scroll + currentY - ev.startY;
        const normalizedY = currentY - top;
        const fromIndex = this.lastToIndex;
        const toIndex = this.itemIndexForTop(normalizedY);
        if (toIndex !== this.lastToIndex) {
          const fromIndex2 = indexForItem(selectedItem);
          this.lastToIndex = toIndex;
          hapticSelectionChanged();
          this.reorderMove(fromIndex2, toIndex);
        }
        selectedItem.style.transform = `translateY(${deltaY}px)`;
        this.ionReorderMove.emit({
          from: fromIndex,
          to: toIndex
        });
      }
      onEnd() {
        const selectedItemEl = this.selectedItemEl;
        this.state = 2;
        if (!selectedItemEl) {
          this.state = 0;
          return;
        }
        const toIndex = this.lastToIndex;
        const fromIndex = indexForItem(selectedItemEl);
        if (toIndex === fromIndex) {
          this.completeReorder();
        } else {
          this.ionItemReorder.emit({
            from: fromIndex,
            to: toIndex,
            complete: this.completeReorder.bind(this)
          });
        }
        hapticSelectionEnd();
        this.ionReorderEnd.emit({
          from: fromIndex,
          to: toIndex,
          complete: this.completeReorder.bind(this)
        });
      }
      completeReorder(listOrReorder) {
        const selectedItemEl = this.selectedItemEl;
        if (selectedItemEl && this.state === 2) {
          const children = this.el.__children || this.el.children;
          const len = children.length;
          const toIndex = this.lastToIndex;
          const fromIndex = indexForItem(selectedItemEl);
          raf(() => {
            if (toIndex !== fromIndex && (listOrReorder === void 0 || listOrReorder === true)) {
              const ref = fromIndex < toIndex ? children[toIndex + 1] : children[toIndex];
              this.el.insertBefore(selectedItemEl, ref);
            }
            for (let i = 0; i < len; i++) {
              children[i].style["transform"] = "";
            }
          });
          if (Array.isArray(listOrReorder)) {
            listOrReorder = reorderArray(listOrReorder, fromIndex, toIndex);
          }
          selectedItemEl.style.transition = "";
          selectedItemEl.classList.remove(ITEM_REORDER_SELECTED);
          this.selectedItemEl = void 0;
          this.state = 0;
        }
        return listOrReorder;
      }
      itemIndexForTop(deltaY) {
        const heights = this.cachedHeights;
        for (let i = 0; i < heights.length; i++) {
          if (heights[i] > deltaY) {
            return i;
          }
        }
        return heights.length - 1;
      }
      /********* DOM WRITE ********* */
      reorderMove(fromIndex, toIndex) {
        const itemHeight = this.selectedItemHeight;
        const children = this.el.__children || this.el.children;
        for (let i = 0; i < children.length; i++) {
          const style = children[i].style;
          let value = "";
          if (i > fromIndex && i <= toIndex) {
            value = `translateY(${-itemHeight}px)`;
          } else if (i < fromIndex && i >= toIndex) {
            value = `translateY(${itemHeight}px)`;
          }
          style["transform"] = value;
        }
      }
      autoscroll(posY) {
        if (!this.scrollEl) {
          return 0;
        }
        let amount = 0;
        if (posY < this.scrollElTop) {
          amount = -SCROLL_JUMP;
        } else if (posY > this.scrollElBottom) {
          amount = SCROLL_JUMP;
        }
        if (amount !== 0) {
          this.scrollEl.scrollBy(0, amount);
        }
        return this.scrollEl.scrollTop - this.scrollElInitial;
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "779332508f44409696b6bab80eda72f9b1d7869d", class: {
          [mode]: true,
          "reorder-enabled": !this.disabled,
          "reorder-list-active": this.state !== 0
        } });
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "disabled": [{
            "disabledChanged": 0
          }]
        };
      }
    };
    indexForItem = (element) => {
      return element["$ionIndex"];
    };
    findReorderItem = (node, container) => {
      let parent;
      while (node) {
        parent = node.parentElement;
        if (parent === container) {
          return node;
        }
        node = parent;
      }
      return void 0;
    };
    AUTO_SCROLL_MARGIN = 60;
    SCROLL_JUMP = 10;
    ITEM_REORDER_SELECTED = "reorder-selected";
    reorderArray = (array, from, to) => {
      const element = array[from];
      array.splice(from, 1);
      array.splice(to, 0, element);
      return array.slice();
    };
    ReorderGroup.style = reorderGroupCss();
  }
});
init_ion_reorder_2_entry();
export {
  Reorder as ion_reorder,
  ReorderGroup as ion_reorder_group
};
//# debugId=2d7b7735-528e-55e2-b12d-291d36895d4d
//# sourceMappingURL=chunk-QD75BKMK.js.map
