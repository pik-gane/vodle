(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_explain-approval_explain-approval_module_ts"],{

/***/ 61792:
/*!***********************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExplainApprovalPage: () => (/* binding */ ExplainApprovalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _explain_approval_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval.page.html?ngResource */ 81900);
/* harmony import */ var _explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./explain-approval.page.scss?ngResource */ 69332);
/* harmony import */ var _explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26899);
/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
*/










let ExplainApprovalPage = class ExplainApprovalPage {
  constructor(modalController, translate, G) {
    this.modalController = modalController;
    this.Math = Math;
    this.ready = false;
    this.tab = "approval";
    this.seen_tabs = new Set([this.tab]);
    // timing:
    this.tr1 = 0;
    this.tr2 = 2; // ratings needles
    this.td1 = 2;
    this.td2 = 4; // diagonal
    this.tob1 = 4;
    this.dtt = 1;
    this.tab2 = 7; // approval bar
    this.to1 = 8;
    this.to2 = 9; // own status
    // svg code snippets:
    this.text_y0_start = '<text y="0">';
    this.tspan_i_start = '<tspan font-style="italic">';
    this.tspan_end = '</tspan>';
    this.text_end = '</text>';
    // styling:
    this.approval_font_size_small = 3;
    this.approval_font_size_normal = 3.75;
    this.approval_font_size_large = 6;
    this.share_font_size_small = 3;
    this.share_font_size_normal = 3.75;
    this.share_font_size_large = 6;
    this.playing = true;
  }
  ngOnInit() {
    // approval:
    const p = this.p = this.parent.p,
      oid = this.oid,
      rs0 = (p.T.effective_ratings_ascending_map || new Map()).get(oid) || [],
      rs = this.rs = [],
      rmin = this.rmin = p.T.thresholds_map.get(oid) || 100,
      cs = this.cs = [],
      ts = this.ts = [],
      poss = this.poss = [],
      myr = this.myr = p.get_my_effective_rating(oid),
      n = this.n = p.T.n_not_abstaining,
      offset = n - rs0.length,
      dur = this.tab2 - this.tob1 - this.dtt,
      a = this.a = (n > 0 ? p.T.approval_scores_map.get(oid) / n : 0) || 0;
    this.optionname = p.options[oid].name;
    this.tob2 = this.tt1 = this.tob1 + dur * (1 - a);
    this.tt2 = this.tab1 = this.tt1 + this.dtt;
    this.thresholdi = -1;
    for (let i = 0; i < n; i++) {
      let r = i < offset ? 0 : rs0[i - offset];
      rs.push(r);
      cs.push(r == 0 ? '#d33939' : r < rmin ? '#3465a4' : '#62a73b');
      ts.push('' + (this.tob1 + dur * i / n + (r < rmin ? 0 : this.dtt)) + 's');
      poss.push(100 * (i + .01) / n);
      if (this.thresholdi < 0 && r >= rmin) {
        this.thresholdi = i;
      }
    }
    this.myi = rs.indexOf(myr);
    this.eff_unequal_proxy = myr != p.get_my_proxy_rating(oid);
    this.parent.G.L.trace("ANIMATION:", oid, rs, rmin, cs, myr, n, this.myi, this.a, poss, this.thresholdi);
    this.parent.G.L.trace("ANIMATION:", dur, this.tob2, this.tt2);
    // share:
    const nvs = {},
      vids = [],
      vm = p.T.votes_map,
      dattrs = this.dattrs = [];
    this.myv = vm.get(p.myvid);
    let oids = this.oids = [],
      os = this.os = [],
      ps = this.ps = [],
      ss = this.ss = [];
    for (const [vid, ap] of p.T.approvals_map.get(oid)) {
      if (ap) {
        vids.push(vid);
      }
    }
    for (const vid of vids) {
      // find no. of voters who vote for oid2 instead of for oid
      const oid2 = vm.get(vid);
      if (!(oid2 in nvs)) {
        nvs[oid2] = 0;
      }
      nvs[oid2]++;
    }
    this.parent.G.L.trace("partial share:", vids, nvs);
    let lastss = 0;
    for (const oid2 of this.parent.oidsorted) {
      if (oid2 in nvs || oid2 == oid) {
        oids.push(oid2);
        os.push(p.options[oid2].name);
        const thisps = n > 0 ? (nvs[oid2] || 0) / n : 1 / this.parent.oidsorted.length;
        ps.push(thisps);
        ss.push(lastss);
        this.parent.G.L.trace("partial share:", oid2, thisps, lastss);
        lastss += thisps;
      }
      if (oid2 == oid) {
        break; // since later options can't get votes from approvers of oid
      }
    }
    if (os.length > 6) {
      // need to summarize the last few!
      let sumps = 0;
      for (let index = 4; index < os.length - 1; index++) {
        sumps += ps[index];
      }
      oids = this.oids = oids.slice(0, 4).concat(['', oids[-1]]);
      os = this.os = os.slice(0, 4).concat(['other higher-ranked options', os[-1]]);
      ps = this.ps = ps.slice(0, 4).concat([sumps, ps[-1]]);
      ss = this.ss = ss.slice(0, 5).concat([ss[-1]]);
    }
    for (const i in ps) {
      const share = ps[i],
        R = this.parent.pieradius,
        dx = R * Math.sin(this.parent.two_pi * share),
        dy = R * (1 - Math.cos(this.parent.two_pi * share)),
        more_than_180_degrees_flag = share > 0.5 ? 1 : 0;
      if (share < 1) {
        dattrs.push("M 0,0 l 0,-" + R + " a " + R + " " + R + " 0 " + more_than_180_degrees_flag + " 1 " + dx + " " + dy + " Z");
      } else {
        // a full circle
        dattrs.push('d', "M 0,0 l 0,-20 a 20 20 0 1 1 0 " + 2 * R + " a 20 20 0 1 1 0 " + -2 * R + " Z");
      }
    }
  }
  ionViewWillEnter() {
    this.tab = "approval";
    this.seen_tabs = new Set([this.tab]);
  }
  ionViewDidEnter() {
    this.ready = true;
    window.setTimeout(this.restart, 100);
  }
  // top-row navigation:
  back() {
    if (this.tab == 'approval') {
      this.close();
    } else {
      this.go('approval');
    }
  }
  forward() {
    this.go('share');
  }
  go(tab) {
    this.tab = tab;
    if (!this.seen_tabs.has(tab)) {
      this.seen_tabs.add(tab);
      this.restart();
    }
  }
  close() {
    this.modalController.dismiss();
  }
  // bottom-row controls:
  restart() {
    const svg = document.getElementById("animation");
    svg.setCurrentTime(0);
  }
  pause() {
    const svg = document.getElementById("animation");
    svg.pauseAnimations();
    this.playing = false;
  }
  unpause() {
    const svg = document.getElementById("animation");
    svg.unpauseAnimations();
    this.playing = true;
  }
  to_end() {
    const svg = document.getElementById("animation");
    svg.setCurrentTime(100);
  }
  static {
    this.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
      parent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
      }],
      oid: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
      }]
    };
  }
};
ExplainApprovalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule],
  selector: 'app-explain-approval',
  template: _explain_approval_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ExplainApprovalPage);


/***/ }),

/***/ 69332:
/*!************************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/`, "",{"version":3,"sources":["webpack://./src/app/explain-approval/explain-approval.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 81900:
/*!************************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!-- TODO:\r\n  * treat all abstaining case!\r\n  * remove \"you\" if abstaining\r\n  * how to deal with fake 100 ratings?\r\n-->\r\n\r\n<ion-content *ngIf=\"ready\" class=\"ion-no-margin ion-no-padding\">\r\n  <ion-item class=\"ion-no-margin ion-no-padding\">\r\n    <ion-buttons>\r\n      &nbsp;&nbsp;\r\n      <ion-button *ngIf=\"tab=='approval'\" shape=\"round\" fill=\"clear\"\r\n          (click)=\"back()\">\r\n        <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button *ngIf=\"tab=='share'\" shape=\"round\" fill=\"clear\"\r\n          (click)=\"back()\">\r\n        <ion-icon slot=\"icon-only\" name=\"arrow-back-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-label>\r\n      {{(tab == 'approval' ? 'explain.title-approval' : 'explain.title-share')|translate}} <b><i [lang]=\"p.language\" [innerHtml]=\"optionname\"></i></b>\r\n    </ion-label>\r\n    <ion-buttons slot=\"end\" class=\"ion-no-margin ion-no-padding\">\r\n      <ion-button *ngIf=\"tab=='approval'\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n          (click)=\"forward()\">\r\n        <ion-icon slot=\"icon-only\" name=\"arrow-forward-outline\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button *ngIf=\"tab=='share'\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n          (click)=\"close()\">\r\n        <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-item>\r\n\r\n  <ion-item class=\"ion-no-margin ion-no-padding\">\r\n    <svg id=\"animation\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" viewBox=\"-25 -25 130 160\">\r\n      <defs>\r\n        <marker id=\"arrowhead-grey\" markerWidth=\"10\" markerHeight=\"7\" \r\n                refX=\"0\" refY=\"3.5\" orient=\"auto\">\r\n          <polyline points=\"0 0, 10 3.5, 0 7\" fill=\"#9abcbd\"/>\r\n        </marker>\r\n        <marker id=\"arrowhead-green\" markerWidth=\"10\" markerHeight=\"7\" \r\n                refX=\"0\" refY=\"3.5\" orient=\"auto\">\r\n          <polyline points=\"0 0, 10 3.5, 0 7\" fill=\"black\"/><!--or #4c822e ?-->\r\n        </marker>\r\n      </defs>\r\n\r\n      <!-- APPROVAL TAB: -->\r\n\r\n      <g *ngIf=\"tab=='approval'\" font-family=\"Quicksand\" [attr.font-size]=\"approval_font_size_normal\">\r\n\r\n        <!-- ANIMATION:\r\n          * from sec. tr1 to tr2, the ratings come in \r\n          * from sec. 0 to 4, the opposition and approval bars will build from left to right / bottom to top\r\n          * from sec. 4 to 5, the approval bar will \"fall\" into its final horizontal position \r\n          * from sec. 5 to 6, the approval bar widens to full height and the opposition bar fades out\r\n          * at sec. 6, voter's own rating shows\r\n        -->\r\n\r\n        <text x=\"0\" y=\"-11\" fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.all-ratings'|translate\"></tspan></text>\r\n        <text x=\"0\" y=\"-6\" fill=\"#808080\">&nbsp;<tspan [innerHtml]=\"'explain.large-to-small'|translate\"></tspan></text>\r\n\r\n        <g transform=\"scale(1 -1) translate(0 -100)\">\r\n\r\n          <!-- approval bar: -->\r\n          <g *ngIf=\"a>0\" [attr.transform]=\"'translate('+(100*(1-a))+' '+(100*(1-a))+')'\">\r\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \r\n                type=\"translate\" [attr.from]=\"''+(100*(1-a))+' '+(100*(1-a))\" [attr.to]=\"'100 '+poss[myi]\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- move to own rating -->\r\n            <g transform=\"rotate(90)\"><!-- initially upwards -->\r\n              <animateTransform attributeName=\"transform\" attributeType=\"XML\" \r\n                type=\"rotate\" from=\"90\" to=\"180\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- rotate to horizontal -->\r\n              <rect x=\"-0.5\" y=\"-2.5\" width=\"0\" height=\"5\" fill=\"#bce4e5\" stroke=\"none\"><!--not:#62a73ba0-->\r\n                <animate attributeName=\"width\" \r\n                  from=\"0\" [attr.to]=\"0.5+100*a\" [attr.begin]=\"''+tab1+'s'\" [attr.dur]=\"''+(tab2-tab1)+'s'\" fill=\"freeze\" />\r\n              </rect>\r\n              <line display=\"none\" x1=\"-0.5\" y1=\"-5\" x2=\"-0.5\" y2=\"5\" stroke=\"#bce4e5\" stroke-width=\"0.5\">\r\n                <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tab1+'s'\" />\r\n              </line>\r\n            </g>\r\n          </g>\r\n\r\n          <!-- left vertical: -->\r\n          <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"115\" stroke-width=\"0.2\" stroke=\"#444444\" stroke-dasharray=\"3 2\" />\r\n\r\n          <!-- rating needles: -->\r\n          <g transform=\"scale(0 1)\"><!-- initially zero width -->\r\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \r\n              type=\"scale\" from=\"0 1\" to=\"1 1\" [attr.begin]=\"''+tr1+'s'\" [attr.dur]=\"''+(tr2-tr1)+'s'\" fill=\"freeze\" /><!-- grow to real width -->\r\n            <line *ngFor=\"let item of rs; let i = index\" \r\n                  stroke-width=\"0.5\"\r\n                  [attr.y1]=\"poss[i]\" [attr.y2]=\"poss[i]\" x1=\"0\" [attr.x2]=\"rs[i]\" stroke=\"black\">\r\n              <set attributeName=\"stroke\" [attr.to]=\"cs[i]\" [attr.begin]=\"ts[i]\" />\r\n            </line>\r\n            <circle *ngFor=\"let item of rs; let i = index\"\r\n                  [attr.cy]=\"poss[i]\" [attr.cx]=\"rs[i]\" r=\"0.75\" fill=\"black\">\r\n              <set attributeName=\"fill\" [attr.to]=\"cs[i]\" [attr.begin]=\"ts[i]\" />\r\n            </circle>\r\n          </g>\r\n\r\n          <!-- diagonal: -->\r\n          <line opacity=\"0\" x1=\"-4\" y1=\"-5\" x2=\"106\" y2=\"105\" stroke-width=\"0.2\" stroke=\"#444444\" stroke-dasharray=\"3 2\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"0\" to=\"1\" [attr.begin]=\"''+td1+'s'\" [attr.dur]=\"''+(td2-td1)+'s'\" fill=\"freeze\" /><!-- fade in -->\r\n          </line>\r\n\r\n          <!-- first approving needle: -->\r\n          <line stroke-width=\"0\"\r\n            [attr.y1]=\"poss[thresholdi]\" [attr.y2]=\"poss[thresholdi]\" x1=\"0\" [attr.x2]=\"rs[thresholdi]\" [attr.stroke]=\"cs[thresholdi]\">\r\n            <animate attributeName=\"stroke-width\" \r\n              from=\"5\" to=\"0\" [attr.begin]=\"''+tt1+'s'\" [attr.dur]=\"''+(tt2-tt1)+'s'\" fill=\"freeze\" />\r\n          </line>\r\n\r\n          <!-- small approval label: -->\r\n          <g *ngIf=\"a>0\" display=\"none\" [attr.transform]=\"'translate('+(100*(1-a))+','+(100*(1-a))+')'\">\r\n            <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tab1+'s'\" /><!---->\r\n            <animate attributeName=\"opacity\" \r\n              from=\"1\" to=\"0\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- fade out -->\r\n            <g transform=\"rotate(90)\">\r\n              <g transform=\"translate(0, -1.25) scale(1 -1)\">\r\n                <text fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.vertical-approval-label'|translate\"></tspan></text>\r\n              </g>\r\n            </g>\r\n          </g>\r\n\r\n          <!-- final elements: -->\r\n          <g opacity=\"0\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"0\" to=\"1\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" />\r\n            <!-- approval bar -->\r\n            <g display=\"none\" [attr.transform]=\"'translate(100 '+poss[myi]+') rotate(180)'\">\r\n              <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+to2+'s'\"></set>\r\n              <rect x=\"-0.5\" y=\"-2.5\" [attr.width]=\"0.5+100*a\" height=\"5\" fill=\"#bce4e5\" stroke=\"none\"><!--not:#62a73ba0-->\r\n              </rect>\r\n              <line x1=\"-0.5\" y1=\"-5\" x2=\"-0.5\" y2=\"5\" stroke=\"#bce4e5\" stroke-width=\"0.5\">\r\n              </line>\r\n            </g>\r\n            <!-- threshold vertical: -->\r\n            <line [attr.x1]=\"100*(1-a)\" [attr.x2]=\"100*(1-a)\" y1=\"-26\" y2=\"101\" stroke-width=\"0.2\" stroke=\"#444444\" stroke-dasharray=\"3 2\" />\r\n            <!-- own rating marker: -->\r\n            <ng-container *ngIf=\"!!myv\">\r\n              <line stroke-width=\"2\" \r\n                  [attr.y1]=\"poss[myi]\" [attr.y2]=\"poss[myi]\" x1=\"0\" [attr.x2]=\"myr\" [attr.stroke]=\"cs[myi]\" />\r\n              <circle [attr.cy]=\"poss[myi]\" [attr.cx]=\"rs[myi]\" r=\"3\" [attr.fill]=\"cs[myi]\" />\r\n            </ng-container>\r\n            <!-- final annotations: -->\r\n            <g transform=\"scale(1 -1)\" fill=\"black\">\r\n              <g *ngIf=\"a<1\">\r\n                <text [attr.x]=\"100*(1-a)\" y=\"10\" fill=\"#3465a4\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-1'|translate\"></tspan>&nbsp;&nbsp;</text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"15\" fill=\"#3465a4\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-2'|translate\"></tspan>&nbsp;&nbsp;</text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"20\" fill=\"#3465a4\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-3'|translate\"></tspan>&nbsp;&nbsp;</text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"25\" fill=\"#3465a4\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-4'|translate\"></tspan>&nbsp;&nbsp;</text>\r\n              </g>\r\n              <g *ngIf=\"a>0\">\r\n                <text [attr.x]=\"100*(1-a)\" y=\"10\" fill=\"#62a73b\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-1'|translate\"></tspan></text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"15\" fill=\"#62a73b\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-2'|translate\"></tspan></text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"20\" fill=\"#62a73b\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-3'|translate\"></tspan></text>\r\n                <text [attr.x]=\"100*(1-a)\" y=\"25\" fill=\"#62a73b\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-4'|translate\"></tspan></text>\r\n              </g>\r\n              <g [attr.transform]=\"'translate(0 '+(-poss[myi])+')'\" font-weight=\"bold\">\r\n                <ng-container *ngIf=\"!!myv\">\r\n                  <text x=\"0\" y=\"-1\" [attr.fill]=\"cs[myi]\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.your-rating-line-1'|translate\"></tspan>&nbsp;&nbsp;</text>\r\n                  <text x=\"0\" y=\"4\" [attr.fill]=\"cs[myi]\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.your-rating-line-2'|translate\"></tspan><tspan *ngIf=\"eff_unequal_proxy\">*</tspan>&nbsp;&nbsp;</text>\r\n                </ng-container>\r\n                <g [attr.transform]=\"poss[myi] >= 13 ? 'translate(0 20)' : ''\">\r\n                  <!-- backdrop: -->\r\n                  <rect x=\"75\" y=\"-16\" width=\"25\" height=\"13\" fill=\"#ffffffd0\"></rect>\r\n                  <text x=\"100\" y=\"-9.5\" fill=\"#9abcbd\" text-anchor=\"end\"><tspan [attr.font-size]=\"approval_font_size_large\" font-weight=\"bold\">{{(a*100).toFixed(1)}}%</tspan>&nbsp;</text>\r\n                  <text x=\"100\" y=\"-4.5\" fill=\"#9abcbd\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.horizontal-approval-label'|translate\"></tspan>&nbsp;</text>\r\n                </g>\r\n              </g>\r\n              <g *ngIf=\"!!myv && eff_unequal_proxy\" [attr.font-size]=\"approval_font_size_small\" fill=\"#808080\">\r\n                <text x=\"-20\" y=\"31\">*<tspan [innerHtml]=\"'explain.largest-line-1'|translate\"></tspan></text>\r\n                <text x=\"-20\" y=\"34\">&nbsp;<tspan [innerHtml]=\"'explain.largest-line-2'|translate\"></tspan></text>\r\n              </g>\r\n            </g>\r\n          </g>\r\n    \r\n          <!-- opposition bar and label: -->\r\n          <g *ngIf=\"a<1\" transform=\"rotate(45) translate(0, 7)\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"1\" to=\"0\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- fade out -->\r\n            <g transform=\"scale(1.4142, 1)\">\r\n              <rect [attr.x]=\"0\" y=\"-12.5\" width=\"0\" height=\"5\" fill=\"#3465a4a0\" stroke=\"none\">\r\n                <animate attributeName=\"width\" \r\n                  from=\"0\" [attr.to]=\"100*(1-a)-0.5\" [attr.begin]=\"''+tob1+'s'\" [attr.dur]=\"''+(tob2-tob1)+'s'\" fill=\"freeze\" />\r\n              </rect>\r\n            </g>\r\n            <g display=\"none\">\r\n              <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tob1+'s'\" />\r\n              <line x1=\"0\" y1=\"-15\" x2=\"0\" y2=\"-5\" stroke=\"#3465a4a0\" stroke-width=\"0.5\">\r\n              </line>\r\n              <g transform=\"translate(0, -11.25) scale(1 -1)\" >\r\n                <text fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.opposition'|translate\"></tspan></text>\r\n              </g>   \r\n            </g>\r\n          </g>\r\n\r\n        </g>\r\n      </g>\r\n\r\n      <!-- SHARE TAB: -->\r\n\r\n      <g *ngIf=\"tab=='share'\" font-family=\"Quicksand\" [attr.font-size]=\"share_font_size_normal\">\r\n\r\n        <!-- TODO:\r\n          * fade black arrows and explanation to grey\r\n        -->\r\n\r\n        <ng-container *ngIf=\"n == 0\">\r\n            \r\n          <!-- ALL ABSTAIN -->\r\n\r\n          <g transform=\"translate(-14 -4)\">\r\n            <!-- text: -->\r\n            <text y=\"-13\" [innerHtml]=\"'explain.all-abstain-line-1'|translate\">\r\n            </text>\r\n            <text y=\"-8\">\r\n              {{'explain.all-abstain-line-2-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">{{(100/p.oids.length).toFixed(1)}}%</tspan>{{'explain.all-abstain-line-2-after-percentage'|translate}}\r\n            </text>\r\n          </g>\r\n\r\n        </ng-container>\r\n        <ng-container *ngIf=\"n > 0\">\r\n\r\n          <!-- NOT ALL ABSTAIN -->\r\n            \r\n          <!-- intro: -->\r\n          <g transform=\"translate(-14 -4)\">\r\n            <!-- text: -->\r\n            <g opacity=\"0\">\r\n              <animate attributeName=\"opacity\" \r\n                from=\"0\" to=\"1\" begin=\"0s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\r\n              <text y=\"-13\" fill=\"#769596\" [innerHtml]=\"'explain.share-intro-line-1'|translate\">\r\n              </text>\r\n              <text y=\"-8\" fill=\"#769596\" [innerHtml]=\"'explain.share-intro-line-2'|translate\">\r\n              </text>\r\n            </g>\r\n            <g opacity=\"0\">\r\n              <animate attributeName=\"opacity\" \r\n                from=\"0\" to=\"1\" begin=\"3s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\r\n              <ng-container *ngIf=\"a == 0\">\r\n                <text y=\"0\" [innerHtml]=\"'explain.zero-line-1'|translate\">\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.zero-line-2'|translate\">\r\n                </text>\r\n              </ng-container>\r\n              <ng-container *ngIf=\"a > 0\">\r\n                <ng-container *ngIf=\"ps.length != 1\">\r\n                  <ng-container *ngIf=\"ps[ps.length-1] == 0\">\r\n                    <text y=\"0\" [innerHtml]=\"'explain.all-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                    </text>\r\n                    <text y=\"5\" [innerHtml]=\"'explain.all-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                    </text>\r\n                  </ng-container>\r\n                  <ng-container *ngIf=\"ps[ps.length-1] > 0\">\r\n                    <text y=\"0\" [innerHtml]=\"'explain.some-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                    </text>\r\n                    <text y=\"5\" [innerHtml]=\"'explain.some-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                    </text>\r\n                  </ng-container>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"ps.length == 1\">\r\n                  <text y=\"0\" [innerHtml]=\"'explain.no-one-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                  </text>\r\n                  <text y=\"5\" [innerHtml]=\"'explain.no-one-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\r\n                  </text>\r\n                </ng-container>\r\n              </ng-container>\r\n            </g>\r\n          </g>\r\n\r\n          <!-- bottom row approval bar: -->\r\n          <g transform=\"translate(0 15)\" opacity=\"0\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"0\" to=\"1\" begin=\"3s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\r\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \r\n              type=\"translate\" [attr.from]=\"'0 15'\" [attr.to]=\"'0 '+(20+15*os.length)\" begin=\"5s\" dur=\"1s\" fill=\"freeze\" /><!-- move to bottom -->\r\n          \r\n            <rect [attr.x]=\"100*(1-a)\" y=\"-2.5\" [attr.width]=\"0.5+100*a\" height=\"5\" fill=\"#bce4e5\" stroke=\"none\">\r\n            </rect>\r\n            <line x1=\"100.5\" y1=\"-5\" x2=\"100.5\" y2=\"5\" stroke=\"#bce4e5\" stroke-width=\"0.5\">\r\n            </line>\r\n            <text x=\"100\" y=\"8\" fill=\"#9abcbd\" text-anchor=\"end\"><tspan font-weight=\"bold\">{{(a*100).toFixed(1)}}%</tspan>&nbsp;</text>\r\n            <text x=\"100\" y=\"13\" fill=\"#9abcbd\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.horizontal-approval-label'|translate\"></tspan>&nbsp;</text>\r\n          </g>\r\n\r\n          <!-- higher-up options' rows: -->\r\n          <g *ngFor=\"let item of [].constructor(os.length-1); let i = index\" \r\n              [attr.transform]=\"'translate(0 '+(15+15*i)+')'\" \r\n              opacity=\"0\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"0\" to=\"1\" [attr.begin]=\"''+(6+3*i)+'s'\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\r\n\r\n            <!-- other option's pie chart: -->\r\n            <g transform=\"translate(-10 0) scale(.3 .3)\">\r\n              <circle cx=\"0\" cy=\"0\" r=\"20\" fill=\"#bce4e5\" stroke=\"none\" />\r\n              <path id=\"_pie_other\" [attr.d]=\"dattrs[i]\" fill=\"#9abcbd\" />  \r\n            </g>\r\n\r\n            <!-- explanation: -->\r\n            <g transform=\"translate(0 -1)\" fill=\"#769596\">\r\n              <!-- backdrop: -->\r\n              <rect x=\"-1\" y=\"-4\" width=\"140\" height=\"9\" fill=\"#ffffffff\"></rect>\r\n              <!-- text: -->\r\n              <ng-container *ngIf=\"ps.length == 2 && myv != oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.only-higher-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.only-higher-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.only-higher-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length == 2 && myv == oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.only-higher-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.only-higher-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.only-higher-incl-you-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length != 2 && i == 0 && myv != oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.among-them-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.among-them-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.among-them-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length != 2 && i == 0 && myv == oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.among-them-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.among-them-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.among-them-incl-you-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length != 2 && i > 0 && myv != oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.another-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.another-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.another-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length != 2 && i > 0 && myv == oids[i]\">\r\n                <text y=\"0\">\r\n                  {{('explain.another-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.another-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\r\n                </text>\r\n                <text y=\"5\" [innerHtml]=\"'explain.another-incl-you-line-2'|translate\">\r\n                </text>\r\n              </ng-container> \r\n              <!-- TODO: further cases: 0 approval; all-abstention -->\r\n            </g>\r\n\r\n            <!-- arrow: -->\r\n            <line [attr.x1]=\"100*(1-ss[i]-ps[i]/2)\" x2=\"-4\" [attr.y1]=\"4+(os.length-i)*15\" y2=\"4.8\" marker-end=\"url(#arrowhead-grey)\" stroke=\"#769596\" stroke-width=\"0.2\" stroke-dasharray=\".5 .5\">\r\n            </line>\r\n\r\n            <!-- approval share: -->\r\n            <rect [attr.x]=\"100*(1-ss[i+1])+0.2\" [attr.y]=\"4+(os.length-i)*15\" [attr.width]=\"100*ps[i]-0.4\" height=\"2\" fill=\"#9abcbd\" stroke=\"none\">\r\n            </rect>\r\n\r\n          </g>\r\n\r\n          <!-- bottom row: -->\r\n          <g [attr.transform]=\"'translate(0 '+(20+15*os.length)+')'\" opacity=\"0\">\r\n            <animate attributeName=\"opacity\" \r\n              from=\"0\" to=\"1\" [attr.begin]=\"''+(6+3*(ps.length-1))+'s'\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\r\n\r\n            <!-- explanation: -->\r\n            <g transform=\"translate(-14 -17)\">\r\n              <!-- backdrop: -->\r\n              <rect x=\"-10\" y=\"-4\" width=\"140\" height=\"10\" fill=\"#ffffffff\"></rect>\r\n              <!-- text: -->\r\n              <ng-container *ngIf=\"ps.length == 1 && myv != oid\">\r\n                <text y=\"0\">\r\n                  {{'explain.whole-share-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.whole-share-line-1-after-percentage'|translate}}\r\n                </text>\r\n                <text y=\"5\">\r\n                  {{'explain.whole-share-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"#4c822e\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.whole-share-line-2-after-optionname'|translate}}\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length == 1 && myv == oid\">\r\n                <text y=\"0\">\r\n                  {{'explain.whole-share-incl-you-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.whole-share-incl-you-line-1-after-percentage'|translate}}\r\n                </text>\r\n                <text y=\"5\">\r\n                  {{'explain.whole-share-incl-you-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"#4c822e\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.whole-share-incl-you-line-2-after-optionname'|translate}}\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] > 0 && myv != oid\">\r\n                <text y=\"0\">\r\n                  {{'explain.remaining-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.remaining-line-1-after-percentage'|translate}}\r\n                </text>\r\n                <text y=\"5\">\r\n                  {{'explain.remaining-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"#4c822e\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.remaining-line-2-after-optionname'|translate}}\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] > 0 && myv == oid\">\r\n                <text y=\"0\">\r\n                  {{'explain.remaining-incl-you-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.remaining-incl-you-line-1-after-percentage'|translate}}\r\n                </text>\r\n                <text y=\"5\">\r\n                  {{'explain.remaining-incl-you-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"#4c822e\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.remaining-incl-you-line-2-after-optionname'|translate}}\r\n                </text>\r\n              </ng-container> \r\n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] == 0\">\r\n                <text y=\"0\">\r\n                  {{'explain.nothing-left-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"#4c822e\" [attr.font-size]=\"share_font_size_large\">0%</tspan>{{'explain.nothing-left-line-1-after-percentage'|translate}}\r\n                </text>\r\n                <text y=\"5\">\r\n                  {{'explain.nothing-left-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"#4c822e\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.nothing-left-line-2-after-optionname'|translate}}\r\n                </text>\r\n              </ng-container> \r\n            </g>\r\n\r\n            <!-- this option's pie chart: -->\r\n            <g transform=\"translate(-10 0) scale(.45 .45)\">\r\n              <circle cx=\"0\" cy=\"0\" r=\"20\" fill=\"#bce4e5\" stroke=\"none\" />\r\n              <path id=\"_pie_own\" [attr.d]=\"dattrs[dattrs.length-1]\" fill=\"#4c822e\" />  \r\n            </g>\r\n            <ng-container *ngIf=\"ps[ps.length-1] > 0\">\r\n\r\n              <!-- arrow: -->\r\n              <line [attr.x1]=\"100*(1-a)\" x2=\"-4\" y1=\"0\" y2=\"0\" marker-end=\"url(#arrowhead-green)\" stroke=\"black\" stroke-width=\"0.2\" stroke-dasharray=\".5 .5\"><!--or #4c822e?-->\r\n              </line>\r\n\r\n              <!-- approval share: -->\r\n              <rect [attr.x]=\"100*(1-a)+0.2\" y=\"-1\" [attr.width]=\"100*ps[ps.length-1]-0.4\" height=\"2\" fill=\"#4c822e\" stroke=\"none\">\r\n              </rect>\r\n            </ng-container>\r\n          </g>\r\n        </ng-container>\r\n\r\n      </g>\r\n      \r\n    </svg>\r\n  </ion-item>\r\n\r\n  <!-- animation play controls:-->\r\n\r\n  <ion-item lines=\"none\" class=\"ion-text-center\">\r\n    <ion-col></ion-col>\r\n    <ion-col size=\"auto\">\r\n      <ion-buttons class=\"ion-no-margin ion-no-padding\">\r\n        <ion-button shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n            (click)=\"restart()\">\r\n          <ion-icon slot=\"icon-only\" name=\"reload-outline\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button *ngIf=\"playing\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n            (click)=\"pause()\">\r\n          <ion-icon slot=\"icon-only\" name=\"pause-outline\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button *ngIf=\"!playing\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n            (click)=\"unpause()\">\r\n          <ion-icon slot=\"icon-only\" name=\"play-outline\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n            (click)=\"to_end()\">\r\n          <ion-icon slot=\"icon-only\" name=\"play-skip-forward-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-buttons>\r\n    </ion-col>\r\n    <ion-col></ion-col>\r\n  </ion-item>\r\n\r\n</ion-content>\r\n";

/***/ }),

/***/ 90151:
/*!*************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExplainApprovalPage: () => (/* reexport safe */ _explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage),
/* harmony export */   ExplainApprovalPageModule: () => (/* binding */ ExplainApprovalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _explain_approval_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval-routing.module */ 96382);
/* harmony import */ var _explain_approval_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./explain-approval.page */ 61792);
/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
*/









let ExplainApprovalPageModule = class ExplainApprovalPageModule {};
ExplainApprovalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _explain_approval_routing_module__WEBPACK_IMPORTED_MODULE_0__.ExplainApprovalPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage],
  exports: [_explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage]
})], ExplainApprovalPageModule);


/***/ }),

/***/ 96382:
/*!*********************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExplainApprovalPageRoutingModule: () => (/* binding */ ExplainApprovalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _explain_approval_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval.page */ 61792);
/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
*/




const routes = [{
  path: '',
  component: _explain_approval_page__WEBPACK_IMPORTED_MODULE_0__.ExplainApprovalPage
}];
let ExplainApprovalPageRoutingModule = class ExplainApprovalPageRoutingModule {};
ExplainApprovalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], ExplainApprovalPageRoutingModule);


/***/ })

}]);
//# sourceMappingURL=default-src_app_explain-approval_explain-approval_module_ts.js.map