import {
  getTimeGivenProgression,
  init_cubic_bezier_hHmYLOfE
} from "./chunk-HMW3MSDJ.js";
import {
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
  init_index_BBASprVu,
  lifecycle,
  setPageHidden,
  transition
} from "./chunk-GMOSWYPY.js";
import {
  attachComponent,
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  assert,
  init_helpers_BJqKF1pr
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
  config,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonWarning,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-nav_2.entry.js
var VIEW_STATE_NEW, VIEW_STATE_ATTACHED, VIEW_STATE_DESTROYED, ViewController, convertToView, convertToViews, navCss, Nav, navLink, NavLink;
var init_ion_nav_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-nav_2.entry.js"() {
    init_index_BpRUsN_W();
    init_cubic_bezier_hHmYLOfE();
    init_helpers_BJqKF1pr();
    init_index_BBASprVu();
    init_ionic_global_Cep6oYzK();
    init_framework_delegate_CDjM1vRH();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    VIEW_STATE_NEW = 1;
    VIEW_STATE_ATTACHED = 2;
    VIEW_STATE_DESTROYED = 3;
    ViewController = class {
      constructor(component, params) {
        this.component = component;
        this.params = params;
        this.state = VIEW_STATE_NEW;
      }
      init(container) {
        return __async(this, null, function* () {
          this.state = VIEW_STATE_ATTACHED;
          if (!this.element) {
            const component = this.component;
            this.element = yield attachComponent(this.delegate, container, component, ["ion-page", "ion-page-invisible"], this.params);
          }
        });
      }
      /**
       * DOM WRITE
       */
      _destroy() {
        assert(this.state !== VIEW_STATE_DESTROYED, "view state must be ATTACHED");
        const element = this.element;
        if (element) {
          if (this.delegate) {
            this.delegate.removeViewFromDom(element.parentElement, element);
          } else {
            element.remove();
          }
        }
        this.nav = void 0;
        this.state = VIEW_STATE_DESTROYED;
      }
    };
    convertToView = (page, params) => {
      if (!page) {
        return null;
      }
      if (page instanceof ViewController) {
        return page;
      }
      return new ViewController(page, params);
    };
    convertToViews = (pages) => {
      return pages.map((page) => {
        if (page instanceof ViewController) {
          return page;
        }
        if ("component" in page) {
          return convertToView(page.component, page.componentProps === null ? void 0 : page.componentProps);
        }
        return convertToView(page, void 0);
      }).filter((v) => v !== null);
    };
    navCss = () => `:host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;z-index:0}`;
    Nav = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionNavWillLoad = createEvent(this, "ionNavWillLoad", 7);
        this.ionNavWillChange = createEvent(this, "ionNavWillChange", 3);
        this.ionNavDidChange = createEvent(this, "ionNavDidChange", 3);
        this.transInstr = [];
        this.gestureOrAnimationInProgress = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
        this.didLoad = false;
        this.animated = true;
      }
      swipeGestureChanged() {
        if (this.gesture) {
          this.gesture.enable(this.swipeGesture === true);
        }
      }
      rootChanged() {
        if (this.root === void 0) {
          return;
        }
        if (this.didLoad === false) {
          return;
        }
        this.setRoot(this.root, this.rootParams);
      }
      componentWillLoad() {
        if (this.swipeGesture === void 0) {
          const mode = getIonMode(this);
          this.swipeGesture = config.getBoolean("swipeBackEnabled", mode === "ios");
        }
        this.ionNavWillLoad.emit();
      }
      componentDidLoad() {
        return __async(this, null, function* () {
          this.didLoad = true;
          this.rootChanged();
          this.gesture = (yield import("./chunk-4WNFHUJF.js")).createSwipeBackGesture(this.el, this.canStart.bind(this), this.onStart.bind(this), this.onMove.bind(this), this.onEnd.bind(this));
          this.swipeGestureChanged();
        });
      }
      connectedCallback() {
        this.destroyed = false;
      }
      disconnectedCallback() {
        for (const view of this.views) {
          lifecycle(view.element, LIFECYCLE_WILL_UNLOAD);
          view._destroy();
        }
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        this.transInstr.length = 0;
        this.views.length = 0;
        this.destroyed = true;
      }
      /**
       * Push a new component onto the current navigation stack. Pass any additional
       * information along as an object. This additional information is accessible
       * through NavParams.
       *
       * @param component The component to push onto the navigation stack.
       * @param componentProps Any properties of the component.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      push(component, componentProps, opts, done) {
        return this.insert(-1, component, componentProps, opts, done);
      }
      /**
       * Inserts a component into the navigation stack at the specified index.
       * This is useful to add a component at any point in the navigation stack.
       *
       * @param insertIndex The index to insert the component at in the stack.
       * @param component The component to insert into the navigation stack.
       * @param componentProps Any properties of the component.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      insert(insertIndex, component, componentProps, opts, done) {
        return this.insertPages(insertIndex, [{ component, componentProps }], opts, done);
      }
      /**
       * Inserts an array of components into the navigation stack at the specified index.
       * The last component in the array will become instantiated as a view, and animate
       * in to become the active view.
       *
       * @param insertIndex The index to insert the components at in the stack.
       * @param insertComponents The components to insert into the navigation stack.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      insertPages(insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
          insertStart: insertIndex,
          insertViews: insertComponents,
          opts
        }, done);
      }
      /**
       * Pop a component off of the navigation stack. Navigates back from the current
       * component.
       *
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      pop(opts, done) {
        return this.removeIndex(-1, 1, opts, done);
      }
      /**
       * Pop to a specific index in the navigation stack.
       *
       * @param indexOrViewCtrl The index or view controller to pop to.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      popTo(indexOrViewCtrl, opts, done) {
        const ti = {
          removeStart: -1,
          removeCount: -1,
          opts
        };
        if (typeof indexOrViewCtrl === "object" && indexOrViewCtrl.component) {
          ti.removeView = indexOrViewCtrl;
          ti.removeStart = 1;
        } else if (typeof indexOrViewCtrl === "number") {
          ti.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(ti, done);
      }
      /**
       * Navigate back to the root of the stack, no matter how far back that is.
       *
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      popToRoot(opts, done) {
        return this.removeIndex(1, -1, opts, done);
      }
      /**
       * Removes a component from the navigation stack at the specified index.
       *
       * @param startIndex The number to begin removal at.
       * @param removeCount The number of components to remove.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      removeIndex(startIndex, removeCount = 1, opts, done) {
        return this.queueTrns({
          removeStart: startIndex,
          removeCount,
          opts
        }, done);
      }
      /**
       * Set the root for the current navigation stack to a component.
       *
       * @param component The component to set as the root of the navigation stack.
       * @param componentProps Any properties of the component.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      setRoot(component, componentProps, opts, done) {
        return this.setPages([{ component, componentProps }], opts, done);
      }
      /**
       * Set the views of the current navigation stack and navigate to the last view.
       * By default animations are disabled, but they can be enabled by passing options
       * to the navigation controller. Navigation parameters can also be passed to the
       * individual pages in the array.
       *
       * @param views The list of views to set as the navigation stack.
       * @param opts The navigation options.
       * @param done The transition complete function.
       */
      setPages(views, opts, done) {
        opts ??= {};
        if (opts.animated !== true) {
          opts.animated = false;
        }
        return this.queueTrns({
          insertStart: 0,
          insertViews: views,
          removeStart: 0,
          removeCount: -1,
          opts
        }, done);
      }
      /**
       * Get the active view.
       */
      getActive() {
        return __async(this, null, function* () {
          return this.getActiveSync();
        });
      }
      /**
       * Get the view at the specified index.
       *
       * @param index The index of the view.
       */
      getByIndex(index) {
        return __async(this, null, function* () {
          return this.views[index];
        });
      }
      /**
       * Returns `true` if the current view can go back.
       *
       * @param view The view to check.
       */
      canGoBack(view) {
        return __async(this, null, function* () {
          return this.canGoBackSync(view);
        });
      }
      /**
       * Get the previous view.
       *
       * @param view The view to get.
       */
      getPrevious(view) {
        return __async(this, null, function* () {
          return this.getPreviousSync(view);
        });
      }
      /**
       * Returns the number of views in the stack.
       */
      getLength() {
        return __async(this, null, function* () {
          return Promise.resolve(this.views.length);
        });
      }
      getActiveSync() {
        return this.views[this.views.length - 1];
      }
      canGoBackSync(view = this.getActiveSync()) {
        return !!(view && this.getPreviousSync(view));
      }
      getPreviousSync(view = this.getActiveSync()) {
        if (!view) {
          return void 0;
        }
        const views = this.views;
        const index = views.indexOf(view);
        return index > 0 ? views[index - 1] : void 0;
      }
      /**
       * Adds a navigation stack change to the queue and schedules it to run.
       *
       * @returns Whether the transition succeeds.
       */
      queueTrns(ti, done) {
        return __async(this, null, function* () {
          if (this.isTransitioning && ti.opts?.skipIfBusy) {
            return false;
          }
          const promise = new Promise((resolve, reject) => {
            ti.resolve = resolve;
            ti.reject = reject;
          });
          ti.done = done;
          if (ti.insertViews?.length === 0) {
            ti.insertViews = void 0;
          }
          this.transInstr.push(ti);
          this.nextTrns();
          return promise;
        });
      }
      success(result, ti) {
        if (this.destroyed) {
          this.fireError("nav controller was destroyed", ti);
          return;
        }
        if (ti.done) {
          ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
      }
      failed(rejectReason, ti) {
        if (this.destroyed) {
          this.fireError("nav controller was destroyed", ti);
          return;
        }
        this.transInstr.length = 0;
        this.fireError(rejectReason, ti);
      }
      fireError(rejectReason, ti) {
        if (ti.done) {
          ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
          ti.reject(rejectReason);
        } else {
          ti.resolve(false);
        }
      }
      /**
       * Consumes the next transition in the queue.
       *
       * @returns whether the transition is executed.
       */
      nextTrns() {
        if (this.isTransitioning) {
          return false;
        }
        const ti = this.transInstr.shift();
        if (!ti) {
          return false;
        }
        this.runTransition(ti);
        return true;
      }
      /** Executes all the transition instruction from the queue. */
      runTransition(ti) {
        return __async(this, null, function* () {
          try {
            this.ionNavWillChange.emit();
            this.isTransitioning = true;
            this.prepareTI(ti);
            const leavingView = this.getActiveSync();
            const enteringView = this.getEnteringView(ti, leavingView);
            if (!leavingView && !enteringView) {
              throw new Error("no views in the stack to be removed");
            }
            if (enteringView && enteringView.state === VIEW_STATE_NEW) {
              yield enteringView.init(this.el);
            }
            this.postViewInit(enteringView, leavingView, ti);
            const requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
            if (requiresTransition && ti.opts && leavingView) {
              const isBackDirection = ti.opts.direction === "back";
              if (isBackDirection) {
                ti.opts.animationBuilder = ti.opts.animationBuilder || enteringView?.animationBuilder;
              }
              leavingView.animationBuilder = ti.opts.animationBuilder;
            }
            let result;
            if (requiresTransition) {
              result = yield this.transition(enteringView, leavingView, ti);
            } else {
              result = {
                hasCompleted: true,
                requiresTransition: false
              };
            }
            this.success(result, ti);
            this.ionNavDidChange.emit();
          } catch (rejectReason) {
            this.failed(rejectReason, ti);
          }
          this.isTransitioning = false;
          this.nextTrns();
        });
      }
      prepareTI(ti) {
        const viewsLength = this.views.length;
        ti.opts ??= {};
        ti.opts.delegate ??= this.delegate;
        if (ti.removeView !== void 0) {
          assert(ti.removeStart !== void 0, "removeView needs removeStart");
          assert(ti.removeCount !== void 0, "removeView needs removeCount");
          const index = this.views.indexOf(ti.removeView);
          if (index < 0) {
            throw new Error("removeView was not found");
          }
          ti.removeStart += index;
        }
        if (ti.removeStart !== void 0) {
          if (ti.removeStart < 0) {
            ti.removeStart = viewsLength - 1;
          }
          if (ti.removeCount < 0) {
            ti.removeCount = viewsLength - ti.removeStart;
          }
          ti.leavingRequiresTransition = ti.removeCount > 0 && ti.removeStart + ti.removeCount === viewsLength;
        }
        if (ti.insertViews) {
          if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
            ti.insertStart = viewsLength;
          }
          ti.enteringRequiresTransition = ti.insertStart === viewsLength;
        }
        const insertViews = ti.insertViews;
        if (!insertViews) {
          return;
        }
        assert(insertViews.length > 0, "length can not be zero");
        const viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
          throw new Error("invalid views to insert");
        }
        for (const view of viewControllers) {
          view.delegate = ti.opts.delegate;
          const nav = view.nav;
          if (nav && nav !== this) {
            throw new Error("inserted view was already inserted");
          }
          if (view.state === VIEW_STATE_DESTROYED) {
            throw new Error("inserted view was already destroyed");
          }
        }
        ti.insertViews = viewControllers;
      }
      /**
       * Returns the view that will be entered considering the transition instructions.
       *
       * @param ti The instructions.
       * @param leavingView The view being left or undefined if none.
       *
       * @returns The view that will be entered, undefined if none.
       */
      getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews !== void 0) {
          return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (removeStart !== void 0) {
          const views = this.views;
          const removeEnd = removeStart + ti.removeCount;
          for (let i = views.length - 1; i >= 0; i--) {
            const view = views[i];
            if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
              return view;
            }
          }
        }
        return void 0;
      }
      /**
       * Adds and Removes the views from the navigation stack.
       *
       * @param enteringView The view being entered.
       * @param leavingView The view being left.
       * @param ti The instructions.
       */
      postViewInit(enteringView, leavingView, ti) {
        assert(leavingView || enteringView, "Both leavingView and enteringView are null");
        assert(ti.resolve, "resolve must be valid");
        assert(ti.reject, "reject must be valid");
        const opts = ti.opts;
        const { insertViews, removeStart, removeCount } = ti;
        let destroyQueue;
        if (removeStart !== void 0 && removeCount !== void 0) {
          assert(removeStart >= 0, "removeStart can not be negative");
          assert(removeCount >= 0, "removeCount can not be negative");
          destroyQueue = [];
          for (let i = removeStart; i < removeStart + removeCount; i++) {
            const view = this.views[i];
            if (view !== void 0 && view !== enteringView && view !== leavingView) {
              destroyQueue.push(view);
            }
          }
          opts.direction ??= "back";
        }
        const finalNumViews = this.views.length + (insertViews?.length ?? 0) - (removeCount ?? 0);
        assert(finalNumViews >= 0, "final balance can not be negative");
        if (finalNumViews === 0) {
          printIonWarning(`[ion-nav] - You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.el);
          throw new Error("navigation stack needs at least one root page");
        }
        if (insertViews) {
          let insertIndex = ti.insertStart;
          for (const view of insertViews) {
            this.insertViewAt(view, insertIndex);
            insertIndex++;
          }
          if (ti.enteringRequiresTransition) {
            opts.direction ??= "forward";
          }
        }
        if (destroyQueue && destroyQueue.length > 0) {
          for (const view of destroyQueue) {
            lifecycle(view.element, LIFECYCLE_WILL_LEAVE);
            lifecycle(view.element, LIFECYCLE_DID_LEAVE);
            lifecycle(view.element, LIFECYCLE_WILL_UNLOAD);
          }
          for (const view of destroyQueue) {
            this.destroyView(view);
          }
        }
      }
      transition(enteringView, leavingView, ti) {
        return __async(this, null, function* () {
          const opts = ti.opts;
          const progressCallback = opts.progressAnimation ? (ani) => {
            if (ani !== void 0 && !this.gestureOrAnimationInProgress) {
              this.gestureOrAnimationInProgress = true;
              ani.onFinish(() => {
                this.gestureOrAnimationInProgress = false;
              }, { oneTimeCallback: true });
              ani.progressEnd(0, 0, 0);
            } else {
              this.sbAni = ani;
            }
          } : void 0;
          const mode = getIonMode(this);
          const enteringEl = enteringView.element;
          const leavingEl = leavingView && leavingView.element;
          const animationOpts = __spreadProps(__spreadValues({
            mode,
            showGoBack: this.canGoBackSync(enteringView),
            baseEl: this.el,
            progressCallback,
            animated: this.animated && config.getBoolean("animated", true),
            enteringEl,
            leavingEl
          }, opts), {
            animationBuilder: opts.animationBuilder || this.animation || config.get("navAnimation")
          });
          const { hasCompleted } = yield transition(animationOpts);
          return this.transitionFinish(hasCompleted, enteringView, leavingView, opts);
        });
      }
      transitionFinish(hasCompleted, enteringView, leavingView, opts) {
        const activeView = hasCompleted ? enteringView : leavingView;
        if (activeView) {
          this.unmountInactiveViews(activeView);
        }
        return {
          hasCompleted,
          requiresTransition: true,
          enteringView,
          leavingView,
          direction: opts.direction
        };
      }
      /**
       * Inserts a view at the specified index.
       *
       * When the view already is in the stack it will be moved to the new position.
       *
       * @param view The view to insert.
       * @param index The index where to insert the view.
       */
      insertViewAt(view, index) {
        const views = this.views;
        const existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
          assert(view.nav === this, "view is not part of the nav");
          views.splice(existingIndex, 1);
          views.splice(index, 0, view);
        } else {
          assert(!view.nav, "nav is used");
          view.nav = this;
          views.splice(index, 0, view);
        }
      }
      /**
       * Removes a view from the stack.
       *
       * @param view The view to remove.
       */
      removeView(view) {
        assert(view.state === VIEW_STATE_ATTACHED || view.state === VIEW_STATE_DESTROYED, "view state should be loaded or destroyed");
        const views = this.views;
        const index = views.indexOf(view);
        assert(index > -1, "view must be part of the stack");
        if (index >= 0) {
          views.splice(index, 1);
        }
      }
      destroyView(view) {
        view._destroy();
        this.removeView(view);
      }
      /**
       * Unmounts all inactive views after the specified active view.
       *
       * DOM WRITE
       *
       * @param activeView The view that is actively visible in the stack. Used to calculate which views to unmount.
       */
      unmountInactiveViews(activeView) {
        if (this.destroyed) {
          return;
        }
        const views = this.views;
        const activeViewIndex = views.indexOf(activeView);
        for (let i = views.length - 1; i >= 0; i--) {
          const view = views[i];
          const element = view.element;
          if (element) {
            if (i > activeViewIndex) {
              lifecycle(element, LIFECYCLE_WILL_UNLOAD);
              this.destroyView(view);
            } else if (i < activeViewIndex) {
              setPageHidden(element, true);
            }
          }
        }
      }
      canStart() {
        return !this.gestureOrAnimationInProgress && !!this.swipeGesture && !this.isTransitioning && this.transInstr.length === 0 && this.canGoBackSync();
      }
      onStart() {
        this.gestureOrAnimationInProgress = true;
        this.pop({ direction: "back", progressAnimation: true });
      }
      onMove(stepValue) {
        if (this.sbAni) {
          this.sbAni.progressStep(stepValue);
        }
      }
      onEnd(shouldComplete, stepValue, dur) {
        if (this.sbAni) {
          this.sbAni.onFinish(() => {
            this.gestureOrAnimationInProgress = false;
          }, { oneTimeCallback: true });
          let newStepValue = shouldComplete ? -1e-3 : 1e-3;
          if (!shouldComplete) {
            this.sbAni.easing("cubic-bezier(1, 0, 0.68, 0.28)");
            newStepValue += getTimeGivenProgression([0, 0], [1, 0], [0.68, 0.28], [1, 1], stepValue)[0];
          } else {
            newStepValue += getTimeGivenProgression([0, 0], [0.32, 0.72], [0, 1], [1, 1], stepValue)[0];
          }
          this.sbAni.progressEnd(shouldComplete ? 1 : 0, newStepValue, dur);
        } else {
          this.gestureOrAnimationInProgress = false;
        }
      }
      render() {
        return h("slot", { key: "1886154d3c2fa8511af4d641d269aaa4c0f45c05" });
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "swipeGesture": [{
            "swipeGestureChanged": 0
          }],
          "root": [{
            "rootChanged": 0
          }]
        };
      }
    };
    Nav.style = navCss();
    navLink = (el, routerDirection, component, componentProps, routerAnimation) => {
      const nav = el.closest("ion-nav");
      if (nav) {
        if (routerDirection === "forward") {
          if (component !== void 0) {
            return nav.push(component, componentProps, { skipIfBusy: true, animationBuilder: routerAnimation });
          }
        } else if (routerDirection === "root") {
          if (component !== void 0) {
            return nav.setRoot(component, componentProps, { skipIfBusy: true, animationBuilder: routerAnimation });
          }
        } else if (routerDirection === "back") {
          return nav.pop({ skipIfBusy: true, animationBuilder: routerAnimation });
        }
      }
      return Promise.resolve(false);
    };
    NavLink = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routerDirection = "forward";
        this.onClick = () => {
          return navLink(this.el, this.routerDirection, this.component, this.componentProps, this.routerAnimation);
        };
      }
      render() {
        return h(Host, { key: "4bcaa74015462824b3f19253b04a77ce83389ca0", onClick: this.onClick });
      }
      get el() {
        return getElement(this);
      }
    };
  }
});
init_ion_nav_2_entry();
export {
  Nav as ion_nav,
  NavLink as ion_nav_link
};
//# debugId=288669bd-b46f-52cd-a148-83bb4304d844
//# sourceMappingURL=chunk-2XVT3CMF.js.map
