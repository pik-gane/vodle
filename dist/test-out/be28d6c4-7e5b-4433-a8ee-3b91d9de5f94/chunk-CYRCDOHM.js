import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  forceUpdate,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-col_3.entry.js
var SIZE_TO_MEDIA, matchBreakpoint, colCss, win, SUPPORTS_VARS, BREAKPOINTS, Col, gridCss, Grid, rowCss, Row;
var init_ion_col_3_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-col_3.entry.js"() {
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    SIZE_TO_MEDIA = {
      xs: "(min-width: 0px)",
      sm: "(min-width: 576px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 992px)",
      xl: "(min-width: 1200px)"
    };
    matchBreakpoint = (breakpoint) => {
      if (breakpoint === void 0 || breakpoint === "") {
        return true;
      }
      if (window.matchMedia) {
        const mediaQuery = SIZE_TO_MEDIA[breakpoint];
        return window.matchMedia(mediaQuery).matches;
      }
      return false;
    };
    colCss = () => `:host{-webkit-padding-start:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-xs, var(--ion-grid-column-padding, 5px));margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;width:100%;max-width:100%;min-height:1px}@media (min-width: 576px){:host{-webkit-padding-start:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-sm, var(--ion-grid-column-padding, 5px))}}@media (min-width: 768px){:host{-webkit-padding-start:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-md, var(--ion-grid-column-padding, 5px))}}@media (min-width: 992px){:host{-webkit-padding-start:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-lg, var(--ion-grid-column-padding, 5px))}}@media (min-width: 1200px){:host{-webkit-padding-start:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-inline-start:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));-webkit-padding-end:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-inline-end:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-top:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px));padding-bottom:var(--ion-grid-column-padding-xl, var(--ion-grid-column-padding, 5px))}}`;
    win = typeof window !== "undefined" ? window : void 0;
    SUPPORTS_VARS = win && !!(win.CSS && win.CSS.supports && win.CSS.supports("--a: 0"));
    BREAKPOINTS = ["", "xs", "sm", "md", "lg", "xl"];
    Col = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      onResize() {
        forceUpdate(this);
      }
      // Loop through all of the breakpoints to see if the media query
      // matches and grab the column value from the relevant prop if so
      getColumns(property) {
        let matched;
        for (const breakpoint of BREAKPOINTS) {
          const matches = matchBreakpoint(breakpoint);
          const columns = this[property + breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)];
          if (matches && columns !== void 0) {
            matched = columns;
          }
        }
        return matched;
      }
      calculateSize() {
        const columns = this.getColumns("size");
        if (!columns || columns === "") {
          return;
        }
        const colSize = columns === "auto" ? "auto" : (
          // If CSS supports variables we should use the grid columns var
          SUPPORTS_VARS ? `calc(calc(${columns} / var(--ion-grid-columns, 12)) * 100%)` : (
            // Convert the columns to a percentage by dividing by the total number
            // of columns (12) and then multiplying by 100
            columns / 12 * 100 + "%"
          )
        );
        return {
          flex: `0 0 ${colSize}`,
          width: `${colSize}`,
          "max-width": `${colSize}`
        };
      }
      // Called by push, pull, and offset since they use the same calculations
      calculatePosition(property, modifier) {
        const columns = this.getColumns(property);
        if (!columns) {
          return;
        }
        const amount = SUPPORTS_VARS ? (
          // If CSS supports variables we should use the grid columns var
          `calc(calc(${columns} / var(--ion-grid-columns, 12)) * 100%)`
        ) : (
          // Convert the columns to a percentage by dividing by the total number
          // of columns (12) and then multiplying by 100
          columns > 0 && columns < 12 ? columns / 12 * 100 + "%" : "auto"
        );
        return {
          [modifier]: amount
        };
      }
      calculateOffset(isRTL) {
        return this.calculatePosition("offset", isRTL ? "margin-right" : "margin-left");
      }
      calculatePull(isRTL) {
        return this.calculatePosition("pull", isRTL ? "left" : "right");
      }
      calculatePush(isRTL) {
        return this.calculatePosition("push", isRTL ? "right" : "left");
      }
      render() {
        const isRTL = document.dir === "rtl";
        const mode = getIonMode(this);
        return h(Host, { key: "e12293a4315cb474bbde73421dd0b4129f1df1cc", class: {
          [mode]: true
        }, style: __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, this.calculateOffset(isRTL)), this.calculatePull(isRTL)), this.calculatePush(isRTL)), this.calculateSize()) }, h("slot", { key: "869317ea6574111a57a7a9d096c53d264c335d28" }));
      }
    };
    Col.style = colCss();
    gridCss = () => `:host{-webkit-padding-start:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));padding-inline-start:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));-webkit-padding-end:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));padding-inline-end:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));padding-top:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));padding-bottom:var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;display:block;-ms-flex:1;flex:1}@media (min-width: 576px){:host{-webkit-padding-start:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px));padding-inline-start:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px));-webkit-padding-end:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px));padding-inline-end:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px));padding-top:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px));padding-bottom:var(--ion-grid-padding-sm, var(--ion-grid-padding, 5px))}}@media (min-width: 768px){:host{-webkit-padding-start:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px));padding-inline-start:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px));-webkit-padding-end:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px));padding-inline-end:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px));padding-top:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px));padding-bottom:var(--ion-grid-padding-md, var(--ion-grid-padding, 5px))}}@media (min-width: 992px){:host{-webkit-padding-start:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px));padding-inline-start:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px));-webkit-padding-end:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px));padding-inline-end:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px));padding-top:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px));padding-bottom:var(--ion-grid-padding-lg, var(--ion-grid-padding, 5px))}}@media (min-width: 1200px){:host{-webkit-padding-start:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px));padding-inline-start:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px));-webkit-padding-end:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px));padding-inline-end:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px));padding-top:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px));padding-bottom:var(--ion-grid-padding-xl, var(--ion-grid-padding, 5px))}}:host(.grid-fixed){width:var(--ion-grid-width-xs, var(--ion-grid-width, 100%));max-width:100%}@media (min-width: 576px){:host(.grid-fixed){width:var(--ion-grid-width-sm, var(--ion-grid-width, 540px))}}@media (min-width: 768px){:host(.grid-fixed){width:var(--ion-grid-width-md, var(--ion-grid-width, 720px))}}@media (min-width: 992px){:host(.grid-fixed){width:var(--ion-grid-width-lg, var(--ion-grid-width, 960px))}}@media (min-width: 1200px){:host(.grid-fixed){width:var(--ion-grid-width-xl, var(--ion-grid-width, 1140px))}}:host(.ion-no-padding){--ion-grid-column-padding:0;--ion-grid-column-padding-xs:0;--ion-grid-column-padding-sm:0;--ion-grid-column-padding-md:0;--ion-grid-column-padding-lg:0;--ion-grid-column-padding-xl:0}`;
    Grid = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fixed = false;
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "617127ecfabf9bf615bef1dda1be3fed5a065949", class: {
          [mode]: true,
          "grid-fixed": this.fixed
        } }, h("slot", { key: "c781fff853b093d8f44bdb7943bbc4f17c903803" }));
      }
    };
    Grid.style = gridCss();
    rowCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}`;
    Row = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        return h(Host, { key: "12b7419dd67ff18dd00e1bf5093299bd94c75503", class: getIonMode(this) }, h("slot", { key: "43fc76a289ecaf398a77a90034ee576003a826fd" }));
      }
    };
    Row.style = rowCss();
  }
});
init_ion_col_3_entry();
export {
  Col as ion_col,
  Grid as ion_grid,
  Row as ion_row
};
//# debugId=be9866b1-1e42-52b7-9c4b-e44cac5070a5
//# sourceMappingURL=chunk-CYRCDOHM.js.map
