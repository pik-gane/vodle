"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_explain-approval_explain-approval_module_ts"],{

/***/ 22981:
/*!*********************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExplainApprovalPageRoutingModule": () => (/* binding */ ExplainApprovalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _explain_approval_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval.page */ 40614);
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




const routes = [
    {
        path: '',
        component: _explain_approval_page__WEBPACK_IMPORTED_MODULE_0__.ExplainApprovalPage
    }
];
let ExplainApprovalPageRoutingModule = class ExplainApprovalPageRoutingModule {
};
ExplainApprovalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ExplainApprovalPageRoutingModule);



/***/ }),

/***/ 17556:
/*!*************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExplainApprovalPage": () => (/* reexport safe */ _explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage),
/* harmony export */   "ExplainApprovalPageModule": () => (/* binding */ ExplainApprovalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _explain_approval_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval-routing.module */ 22981);
/* harmony import */ var _explain_approval_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./explain-approval.page */ 40614);
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









let ExplainApprovalPageModule = class ExplainApprovalPageModule {
};
ExplainApprovalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _explain_approval_routing_module__WEBPACK_IMPORTED_MODULE_0__.ExplainApprovalPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage],
        exports: [_explain_approval_page__WEBPACK_IMPORTED_MODULE_1__.ExplainApprovalPage]
    })
], ExplainApprovalPageModule);



/***/ }),

/***/ 40614:
/*!***********************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExplainApprovalPage": () => (/* binding */ ExplainApprovalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _explain_approval_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explain-approval.page.html?ngResource */ 44850);
/* harmony import */ var _explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./explain-approval.page.scss?ngResource */ 23426);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 57839);
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
        const p = this.p = this.parent.p, oid = this.oid, rs0 = (p.T.effective_ratings_ascending_map || new Map()).get(oid) || [], rs = this.rs = [], rmin = this.rmin = p.T.thresholds_map.get(oid) || 100, cs = this.cs = [], ts = this.ts = [], poss = this.poss = [], myr = this.myr = p.get_my_effective_rating(oid), n = this.n = p.T.n_not_abstaining, offset = n - rs0.length, dur = this.tab2 - this.tob1 - this.dtt, a = this.a = ((n > 0) ? (p.T.approval_scores_map.get(oid) / n) : 0) || 0;
        this.optionname = p.options[oid].name;
        this.tob2 = this.tt1 = this.tob1 + dur * (1 - a);
        this.tt2 = this.tab1 = this.tt1 + this.dtt;
        this.thresholdi = -1;
        for (let i = 0; i < n; i++) {
            let r = i < offset ? 0 : rs0[i - offset];
            rs.push(r);
            cs.push((r == 0) ? 'var(--vodle-red)' : (r < rmin) ? 'var(--vodle-blue)' : 'var(--vodle-green)');
            ts.push('' + (this.tob1 + dur * i / n + (r < rmin ? 0 : this.dtt)) + 's');
            poss.push(100 * (i + .01) / n);
            if (this.thresholdi < 0 && r >= rmin) {
                this.thresholdi = i;
            }
        }
        this.myi = rs.indexOf(myr);
        this.eff_unequal_proxy = (myr != p.get_my_proxy_rating(oid));
        this.parent.G.L.trace("ANIMATION:", oid, rs, rmin, cs, myr, n, this.myi, this.a, poss, this.thresholdi);
        this.parent.G.L.trace("ANIMATION:", dur, this.tob2, this.tt2);
        // share:
        const nvs = {}, vids = [], vm = p.T.votes_map, dattrs = this.dattrs = [];
        this.myv = vm.get(p.myvid);
        let oids = this.oids = [], os = this.os = [], ps = this.ps = [], ss = this.ss = [];
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
                const thisps = (n > 0) ? ((nvs[oid2] || 0) / n) : (1 / this.parent.oidsorted.length);
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
            const share = ps[i], R = this.parent.pieradius, dx = R * Math.sin(this.parent.two_pi * share), dy = R * (1 - Math.cos(this.parent.two_pi * share)), more_than_180_degrees_flag = share > 0.5 ? 1 : 0;
            if (share < 1) {
                dattrs.push("M 0,0 l 0,-" + R + " a " + R + " " + R + " 0 " + more_than_180_degrees_flag + " 1 " + dx + " " + dy + " Z");
            }
            else { // a full circle
                dattrs.push('d', "M 0,0 l 0,-20 a 20 20 0 1 1 0 " + (2 * R) + " a 20 20 0 1 1 0 " + (-2 * R) + " Z");
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
        }
        else {
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
};
ExplainApprovalPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
ExplainApprovalPage.propDecorators = {
    parent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    oid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
ExplainApprovalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-explain-approval',
        template: _explain_approval_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_explain_approval_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExplainApprovalPage);



/***/ }),

/***/ 23426:
/*!************************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxhaW4tYXBwcm92YWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJleHBsYWluLWFwcHJvdmFsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 44850:
/*!************************************************************************!*\
  !*** ./src/app/explain-approval/explain-approval.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!-- TODO:\n  * treat all abstaining case!\n  * remove \"you\" if abstaining\n  * how to deal with fake 100 ratings?\n-->\n\n<ion-content *ngIf=\"ready\" class=\"ion-no-margin ion-no-padding\">\n  <ion-item class=\"ion-no-margin ion-no-padding\">\n    <ion-buttons>\n      &nbsp;&nbsp;\n      <ion-button *ngIf=\"tab=='approval'\" shape=\"round\" fill=\"clear\"\n          (click)=\"back()\">\n        <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\n      </ion-button>\n      <ion-button *ngIf=\"tab=='share'\" shape=\"round\" fill=\"clear\"\n          (click)=\"back()\">\n        <ion-icon slot=\"icon-only\" name=\"arrow-back-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-label>\n      {{(tab == 'approval' ? 'explain.title-approval' : 'explain.title-share')|translate}} <b><i [lang]=\"p.language\" [innerHtml]=\"optionname\"></i></b>\n    </ion-label>\n    <ion-buttons slot=\"end\" class=\"ion-no-margin ion-no-padding\">\n      <ion-button *ngIf=\"tab=='approval'\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n          (click)=\"forward()\">\n        <ion-icon slot=\"icon-only\" name=\"arrow-forward-outline\"></ion-icon>\n      </ion-button>\n      <ion-button *ngIf=\"tab=='share'\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n          (click)=\"close()\">\n        <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-item>\n\n  <ion-item class=\"ion-no-margin ion-no-padding\">\n    <svg id=\"animation\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" viewBox=\"-25 -25 130 160\">\n      <defs>\n        <marker id=\"arrowhead-grey\" markerWidth=\"10\" markerHeight=\"7\" \n                refX=\"0\" refY=\"3.5\" orient=\"auto\">\n          <polyline points=\"0 0, 10 3.5, 0 7\" fill=\"var(--vodle-dark)\"/>\n        </marker>\n        <marker id=\"arrowhead-green\" markerWidth=\"10\" markerHeight=\"7\" \n                refX=\"0\" refY=\"3.5\" orient=\"auto\">\n          <polyline points=\"0 0, 10 3.5, 0 7\" fill=\"black\"/><!--or var(--vodle-darkgreen) ?-->\n        </marker>\n      </defs>\n\n      <!-- APPROVAL TAB: -->\n\n      <g *ngIf=\"tab=='approval'\" font-family=\"Quicksand\" [attr.font-size]=\"approval_font_size_normal\">\n\n        <!-- ANIMATION:\n          * from sec. tr1 to tr2, the ratings come in \n          * from sec. 0 to 4, the opposition and approval bars will build from left to right / bottom to top\n          * from sec. 4 to 5, the approval bar will \"fall\" into its final horizontal position \n          * from sec. 5 to 6, the approval bar widens to full height and the opposition bar fades out\n          * at sec. 6, voter's own rating shows\n        -->\n\n        <text x=\"0\" y=\"-11\" fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.all-ratings'|translate\"></tspan></text>\n        <text x=\"0\" y=\"-6\" fill=\"var(--vodle-grey)\">&nbsp;<tspan [innerHtml]=\"'explain.large-to-small'|translate\"></tspan></text>\n\n        <g transform=\"scale(1 -1) translate(0 -100)\">\n\n          <!-- approval bar: -->\n          <g *ngIf=\"a>0\" [attr.transform]=\"'translate('+(100*(1-a))+' '+(100*(1-a))+')'\">\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \n                type=\"translate\" [attr.from]=\"''+(100*(1-a))+' '+(100*(1-a))\" [attr.to]=\"'100 '+poss[myi]\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- move to own rating -->\n            <g transform=\"rotate(90)\"><!-- initially upwards -->\n              <animateTransform attributeName=\"transform\" attributeType=\"XML\" \n                type=\"rotate\" from=\"90\" to=\"180\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- rotate to horizontal -->\n              <rect x=\"-0.5\" y=\"-2.5\" width=\"0\" height=\"5\" fill=\"var(--vodle-light)\" stroke=\"none\"><!--not:var(--vodle-green-transparent)-->\n                <animate attributeName=\"width\" \n                  from=\"0\" [attr.to]=\"0.5+100*a\" [attr.begin]=\"''+tab1+'s'\" [attr.dur]=\"''+(tab2-tab1)+'s'\" fill=\"freeze\" />\n              </rect>\n              <line display=\"none\" x1=\"-0.5\" y1=\"-5\" x2=\"-0.5\" y2=\"5\" stroke=\"var(--vodle-light)\" stroke-width=\"0.5\">\n                <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tab1+'s'\" />\n              </line>\n            </g>\n          </g>\n\n          <!-- left vertical: -->\n          <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"115\" stroke-width=\"0.2\" stroke=\"var(--vodle-border-grey)\" stroke-dasharray=\"3 2\" />\n\n          <!-- rating needles: -->\n          <g transform=\"scale(0 1)\"><!-- initially zero width -->\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \n              type=\"scale\" from=\"0 1\" to=\"1 1\" [attr.begin]=\"''+tr1+'s'\" [attr.dur]=\"''+(tr2-tr1)+'s'\" fill=\"freeze\" /><!-- grow to real width -->\n            <line *ngFor=\"let item of rs; let i = index\" \n                  stroke-width=\"0.5\"\n                  [attr.y1]=\"poss[i]\" [attr.y2]=\"poss[i]\" x1=\"0\" [attr.x2]=\"rs[i]\" stroke=\"black\">\n              <set attributeName=\"stroke\" [attr.to]=\"cs[i]\" [attr.begin]=\"ts[i]\" />\n            </line>\n            <circle *ngFor=\"let item of rs; let i = index\"\n                  [attr.cy]=\"poss[i]\" [attr.cx]=\"rs[i]\" r=\"0.75\" fill=\"black\">\n              <set attributeName=\"fill\" [attr.to]=\"cs[i]\" [attr.begin]=\"ts[i]\" />\n            </circle>\n          </g>\n\n          <!-- diagonal: -->\n          <line opacity=\"0\" x1=\"-4\" y1=\"-5\" x2=\"106\" y2=\"105\" stroke-width=\"0.2\" stroke=\"var(--vodle-border-grey)\" stroke-dasharray=\"3 2\">\n            <animate attributeName=\"opacity\" \n              from=\"0\" to=\"1\" [attr.begin]=\"''+td1+'s'\" [attr.dur]=\"''+(td2-td1)+'s'\" fill=\"freeze\" /><!-- fade in -->\n          </line>\n\n          <!-- first approving needle: -->\n          <line stroke-width=\"0\"\n            [attr.y1]=\"poss[thresholdi]\" [attr.y2]=\"poss[thresholdi]\" x1=\"0\" [attr.x2]=\"rs[thresholdi]\" [attr.stroke]=\"cs[thresholdi]\">\n            <animate attributeName=\"stroke-width\" \n              from=\"5\" to=\"0\" [attr.begin]=\"''+tt1+'s'\" [attr.dur]=\"''+(tt2-tt1)+'s'\" fill=\"freeze\" />\n          </line>\n\n          <!-- small approval label: -->\n          <g *ngIf=\"a>0\" display=\"none\" [attr.transform]=\"'translate('+(100*(1-a))+','+(100*(1-a))+')'\">\n            <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tab1+'s'\" /><!---->\n            <animate attributeName=\"opacity\" \n              from=\"1\" to=\"0\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- fade out -->\n            <g transform=\"rotate(90)\">\n              <g transform=\"translate(0, -1.25) scale(1 -1)\">\n                <text fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.vertical-approval-label'|translate\"></tspan></text>\n              </g>\n            </g>\n          </g>\n\n          <!-- final elements: -->\n          <g opacity=\"0\">\n            <animate attributeName=\"opacity\" \n              from=\"0\" to=\"1\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" />\n            <!-- approval bar -->\n            <g display=\"none\" [attr.transform]=\"'translate(100 '+poss[myi]+') rotate(180)'\">\n              <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+to2+'s'\"></set>\n              <rect x=\"-0.5\" y=\"-2.5\" [attr.width]=\"0.5+100*a\" height=\"5\" fill=\"var(--vodle-light)\" stroke=\"none\"><!--not:var(--vodle-green-transparent)-->\n              </rect>\n              <line x1=\"-0.5\" y1=\"-5\" x2=\"-0.5\" y2=\"5\" stroke=\"var(--vodle-light)\" stroke-width=\"0.5\">\n              </line>\n            </g>\n            <!-- threshold vertical: -->\n            <line [attr.x1]=\"100*(1-a)\" [attr.x2]=\"100*(1-a)\" y1=\"-26\" y2=\"101\" stroke-width=\"0.2\" stroke=\"var(--vodle-border-grey)\" stroke-dasharray=\"3 2\" />\n            <!-- own rating marker: -->\n            <ng-container *ngIf=\"!!myv\">\n              <line stroke-width=\"2\" \n                  [attr.y1]=\"poss[myi]\" [attr.y2]=\"poss[myi]\" x1=\"0\" [attr.x2]=\"myr\" [attr.stroke]=\"cs[myi]\" />\n              <circle [attr.cy]=\"poss[myi]\" [attr.cx]=\"rs[myi]\" r=\"3\" [attr.fill]=\"cs[myi]\" />\n            </ng-container>\n            <!-- final annotations: -->\n            <g transform=\"scale(1 -1)\" fill=\"black\">\n              <g *ngIf=\"a<1\">\n                <text [attr.x]=\"100*(1-a)\" y=\"10\" fill=\"var(--vodle-blue)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-1'|translate\"></tspan>&nbsp;&nbsp;</text>\n                <text [attr.x]=\"100*(1-a)\" y=\"15\" fill=\"var(--vodle-blue)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-2'|translate\"></tspan>&nbsp;&nbsp;</text>\n                <text [attr.x]=\"100*(1-a)\" y=\"20\" fill=\"var(--vodle-blue)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-3'|translate\"></tspan>&nbsp;&nbsp;</text>\n                <text [attr.x]=\"100*(1-a)\" y=\"25\" fill=\"var(--vodle-blue)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.threshold-smaller-line-4'|translate\"></tspan>&nbsp;&nbsp;</text>\n              </g>\n              <g *ngIf=\"a>0\">\n                <text [attr.x]=\"100*(1-a)\" y=\"10\" fill=\"var(--vodle-green)\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-1'|translate\"></tspan></text>\n                <text [attr.x]=\"100*(1-a)\" y=\"15\" fill=\"var(--vodle-green)\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-2'|translate\"></tspan></text>\n                <text [attr.x]=\"100*(1-a)\" y=\"20\" fill=\"var(--vodle-green)\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-3'|translate\"></tspan></text>\n                <text [attr.x]=\"100*(1-a)\" y=\"25\" fill=\"var(--vodle-green)\">&nbsp;&nbsp;<tspan [innerHtml]=\"'explain.threshold-larger-line-4'|translate\"></tspan></text>\n              </g>\n              <g [attr.transform]=\"'translate(0 '+(-poss[myi])+')'\" font-weight=\"bold\">\n                <ng-container *ngIf=\"!!myv\">\n                  <text x=\"0\" y=\"-1\" [attr.fill]=\"cs[myi]\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.your-rating-line-1'|translate\"></tspan>&nbsp;&nbsp;</text>\n                  <text x=\"0\" y=\"4\" [attr.fill]=\"cs[myi]\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.your-rating-line-2'|translate\"></tspan><tspan *ngIf=\"eff_unequal_proxy\">*</tspan>&nbsp;&nbsp;</text>\n                </ng-container>\n                <g [attr.transform]=\"poss[myi] >= 13 ? 'translate(0 20)' : ''\">\n                  <!-- backdrop: -->\n                  <rect x=\"75\" y=\"-16\" width=\"25\" height=\"13\" fill=\"var(--vodle-white-semi)\"></rect>\n                  <text x=\"100\" y=\"-9.5\" fill=\"var(--vodle-dark)\" text-anchor=\"end\"><tspan [attr.font-size]=\"approval_font_size_large\" font-weight=\"bold\">{{(a*100).toFixed(1)}}%</tspan>&nbsp;</text>\n                  <text x=\"100\" y=\"-4.5\" fill=\"var(--vodle-dark)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.horizontal-approval-label'|translate\"></tspan>&nbsp;</text>\n                </g>\n              </g>\n              <g *ngIf=\"!!myv && eff_unequal_proxy\" [attr.font-size]=\"approval_font_size_small\" fill=\"var(--vodle-grey)\">\n                <text x=\"-20\" y=\"31\">*<tspan [innerHtml]=\"'explain.largest-line-1'|translate\"></tspan></text>\n                <text x=\"-20\" y=\"34\">&nbsp;<tspan [innerHtml]=\"'explain.largest-line-2'|translate\"></tspan></text>\n              </g>\n            </g>\n          </g>\n    \n          <!-- opposition bar and label: -->\n          <g *ngIf=\"a<1\" transform=\"rotate(45) translate(0, 7)\">\n            <animate attributeName=\"opacity\" \n              from=\"1\" to=\"0\" [attr.begin]=\"''+to1+'s'\" [attr.dur]=\"''+(to2-to1)+'s'\" fill=\"freeze\" /><!-- fade out -->\n            <g transform=\"scale(1.4142, 1)\">\n              <rect [attr.x]=\"0\" y=\"-12.5\" width=\"0\" height=\"5\" fill=\"var(--vodle-blue-transparent)\" stroke=\"none\">\n                <animate attributeName=\"width\" \n                  from=\"0\" [attr.to]=\"100*(1-a)-0.5\" [attr.begin]=\"''+tob1+'s'\" [attr.dur]=\"''+(tob2-tob1)+'s'\" fill=\"freeze\" />\n              </rect>\n            </g>\n            <g display=\"none\">\n              <set attributeName=\"display\" to=\"inline\" [attr.begin]=\"''+tob1+'s'\" />\n              <line x1=\"0\" y1=\"-15\" x2=\"0\" y2=\"-5\" stroke=\"var(--vodle-blue-transparent)\" stroke-width=\"0.5\">\n              </line>\n              <g transform=\"translate(0, -11.25) scale(1 -1)\" >\n                <text fill=\"black\">&nbsp;<tspan [innerHtml]=\"'explain.opposition'|translate\"></tspan></text>\n              </g>   \n            </g>\n          </g>\n\n        </g>\n      </g>\n\n      <!-- SHARE TAB: -->\n\n      <g *ngIf=\"tab=='share'\" font-family=\"Quicksand\" [attr.font-size]=\"share_font_size_normal\">\n\n        <!-- TODO:\n          * fade black arrows and explanation to grey\n        -->\n\n        <ng-container *ngIf=\"n == 0\">\n            \n          <!-- ALL ABSTAIN -->\n\n          <g transform=\"translate(-14 -4)\">\n            <!-- text: -->\n            <text y=\"-13\" [innerHtml]=\"'explain.all-abstain-line-1'|translate\">\n            </text>\n            <text y=\"-8\">\n              {{'explain.all-abstain-line-2-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">{{(100/p.oids.length).toFixed(1)}}%</tspan>{{'explain.all-abstain-line-2-after-percentage'|translate}}\n            </text>\n          </g>\n\n        </ng-container>\n        <ng-container *ngIf=\"n > 0\">\n\n          <!-- NOT ALL ABSTAIN -->\n            \n          <!-- intro: -->\n          <g transform=\"translate(-14 -4)\">\n            <!-- text: -->\n            <g opacity=\"0\">\n              <animate attributeName=\"opacity\" \n                from=\"0\" to=\"1\" begin=\"0s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\n              <text y=\"-13\" fill=\"var(--vodle-medium)\" [innerHtml]=\"'explain.share-intro-line-1'|translate\">\n              </text>\n              <text y=\"-8\" fill=\"var(--vodle-medium)\" [innerHtml]=\"'explain.share-intro-line-2'|translate\">\n              </text>\n            </g>\n            <g opacity=\"0\">\n              <animate attributeName=\"opacity\" \n                from=\"0\" to=\"1\" begin=\"3s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\n              <ng-container *ngIf=\"a == 0\">\n                <text y=\"0\" [innerHtml]=\"'explain.zero-line-1'|translate\">\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.zero-line-2'|translate\">\n                </text>\n              </ng-container>\n              <ng-container *ngIf=\"a > 0\">\n                <ng-container *ngIf=\"ps.length != 1\">\n                  <ng-container *ngIf=\"ps[ps.length-1] == 0\">\n                    <text y=\"0\" [innerHtml]=\"'explain.all-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\n                    </text>\n                    <text y=\"5\" [innerHtml]=\"'explain.all-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\n                    </text>\n                  </ng-container>\n                  <ng-container *ngIf=\"ps[ps.length-1] > 0\">\n                    <text y=\"0\" [innerHtml]=\"'explain.some-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\n                    </text>\n                    <text y=\"5\" [innerHtml]=\"'explain.some-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\n                    </text>\n                  </ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"ps.length == 1\">\n                  <text y=\"0\" [innerHtml]=\"'explain.no-one-line-1'|translate:{percentage:(a*100).toFixed(1)}\">\n                  </text>\n                  <text y=\"5\" [innerHtml]=\"'explain.no-one-line-2'|translate:{percentage:(a*100).toFixed(1)}\">\n                  </text>\n                </ng-container>\n              </ng-container>\n            </g>\n          </g>\n\n          <!-- bottom row approval bar: -->\n          <g transform=\"translate(0 15)\" opacity=\"0\">\n            <animate attributeName=\"opacity\" \n              from=\"0\" to=\"1\" begin=\"3s\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\n            <animateTransform attributeName=\"transform\" attributeType=\"XML\" \n              type=\"translate\" [attr.from]=\"'0 15'\" [attr.to]=\"'0 '+(20+15*os.length)\" begin=\"5s\" dur=\"1s\" fill=\"freeze\" /><!-- move to bottom -->\n          \n            <rect [attr.x]=\"100*(1-a)\" y=\"-2.5\" [attr.width]=\"0.5+100*a\" height=\"5\" fill=\"var(--vodle-light)\" stroke=\"none\">\n            </rect>\n            <line x1=\"100.5\" y1=\"-5\" x2=\"100.5\" y2=\"5\" stroke=\"var(--vodle-light)\" stroke-width=\"0.5\">\n            </line>\n            <text x=\"100\" y=\"8\" fill=\"var(--vodle-dark)\" text-anchor=\"end\"><tspan font-weight=\"bold\">{{(a*100).toFixed(1)}}%</tspan>&nbsp;</text>\n            <text x=\"100\" y=\"13\" fill=\"var(--vodle-dark)\" text-anchor=\"end\"><tspan [innerHtml]=\"'explain.horizontal-approval-label'|translate\"></tspan>&nbsp;</text>\n          </g>\n\n          <!-- higher-up options' rows: -->\n          <g *ngFor=\"let item of [].constructor(os.length-1); let i = index\" \n              [attr.transform]=\"'translate(0 '+(15+15*i)+')'\" \n              opacity=\"0\">\n            <animate attributeName=\"opacity\" \n              from=\"0\" to=\"1\" [attr.begin]=\"''+(6+3*i)+'s'\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\n\n            <!-- other option's pie chart: -->\n            <g transform=\"translate(-10 0) scale(.3 .3)\">\n              <circle cx=\"0\" cy=\"0\" r=\"20\" fill=\"var(--vodle-light)\" stroke=\"none\" />\n              <path id=\"_pie_other\" [attr.d]=\"dattrs[i]\" fill=\"var(--vodle-dark)\" />  \n            </g>\n\n            <!-- explanation: -->\n            <g transform=\"translate(0 -1)\" fill=\"var(--vodle-medium)\">\n              <!-- backdrop: -->\n              <rect x=\"-1\" y=\"-4\" width=\"140\" height=\"9\" fill=\"var(--vodle-white)\"></rect>\n              <!-- text: -->\n              <ng-container *ngIf=\"ps.length == 2 && myv != oids[i]\">\n                <text y=\"0\">\n                  {{('explain.only-higher-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.only-higher-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.only-higher-line-2'|translate\">\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length == 2 && myv == oids[i]\">\n                <text y=\"0\">\n                  {{('explain.only-higher-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.only-higher-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.only-higher-incl-you-line-2'|translate\">\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length != 2 && i == 0 && myv != oids[i]\">\n                <text y=\"0\">\n                  {{('explain.among-them-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.among-them-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.among-them-line-2'|translate\">\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length != 2 && i == 0 && myv == oids[i]\">\n                <text y=\"0\">\n                  {{('explain.among-them-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.among-them-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.among-them-incl-you-line-2'|translate\">\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length != 2 && i > 0 && myv != oids[i]\">\n                <text y=\"0\">\n                  {{('explain.another-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.another-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.another-line-2'|translate\">\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length != 2 && i > 0 && myv == oids[i]\">\n                <text y=\"0\">\n                  {{('explain.another-incl-you-line-1-before-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}<tspan font-style=\"italic\" [attr.lang]=\"p.language\">{{os[i]}}</tspan>{{('explain.another-incl-you-line-1-after-optionname'|translate:{percentage:(ps[i]*100).toFixed(1)})}}\n                </text>\n                <text y=\"5\" [innerHtml]=\"'explain.another-incl-you-line-2'|translate\">\n                </text>\n              </ng-container> \n              <!-- TODO: further cases: 0 approval; all-abstention -->\n            </g>\n\n            <!-- arrow: -->\n            <line [attr.x1]=\"100*(1-ss[i]-ps[i]/2)\" x2=\"-4\" [attr.y1]=\"4+(os.length-i)*15\" y2=\"4.8\" marker-end=\"url(#arrowhead-grey)\" stroke=\"var(--vodle-medium)\" stroke-width=\"0.2\" stroke-dasharray=\".5 .5\">\n            </line>\n\n            <!-- approval share: -->\n            <rect [attr.x]=\"100*(1-ss[i+1])+0.2\" [attr.y]=\"4+(os.length-i)*15\" [attr.width]=\"100*ps[i]-0.4\" height=\"2\" fill=\"var(--vodle-dark)\" stroke=\"none\">\n            </rect>\n\n          </g>\n\n          <!-- bottom row: -->\n          <g [attr.transform]=\"'translate(0 '+(20+15*os.length)+')'\" opacity=\"0\">\n            <animate attributeName=\"opacity\" \n              from=\"0\" to=\"1\" [attr.begin]=\"''+(6+3*(ps.length-1))+'s'\" dur=\"1s\" fill=\"freeze\" /><!-- fade in -->\n\n            <!-- explanation: -->\n            <g transform=\"translate(-14 -17)\">\n              <!-- backdrop: -->\n              <rect x=\"-10\" y=\"-4\" width=\"140\" height=\"10\" fill=\"var(--vodle-white)\"></rect>\n              <!-- text: -->\n              <ng-container *ngIf=\"ps.length == 1 && myv != oid\">\n                <text y=\"0\">\n                  {{'explain.whole-share-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.whole-share-line-1-after-percentage'|translate}}\n                </text>\n                <text y=\"5\">\n                  {{'explain.whole-share-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.whole-share-line-2-after-optionname'|translate}}\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length == 1 && myv == oid\">\n                <text y=\"0\">\n                  {{'explain.whole-share-incl-you-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.whole-share-incl-you-line-1-after-percentage'|translate}}\n                </text>\n                <text y=\"5\">\n                  {{'explain.whole-share-incl-you-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.whole-share-incl-you-line-2-after-optionname'|translate}}\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] > 0 && myv != oid\">\n                <text y=\"0\">\n                  {{'explain.remaining-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.remaining-line-1-after-percentage'|translate}}\n                </text>\n                <text y=\"5\">\n                  {{'explain.remaining-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.remaining-line-2-after-optionname'|translate}}\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] > 0 && myv == oid\">\n                <text y=\"0\">\n                  {{'explain.remaining-incl-you-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">{{(ps[ps.length-1]*100).toFixed(1)}}%</tspan>{{'explain.remaining-incl-you-line-1-after-percentage'|translate}}\n                </text>\n                <text y=\"5\">\n                  {{'explain.remaining-incl-you-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.remaining-incl-you-line-2-after-optionname'|translate}}\n                </text>\n              </ng-container> \n              <ng-container *ngIf=\"ps.length > 1 && ps[ps.length-1] == 0\">\n                <text y=\"0\">\n                  {{'explain.nothing-left-line-1-before-percentage'|translate}}<tspan font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.font-size]=\"share_font_size_large\">0%</tspan>{{'explain.nothing-left-line-1-after-percentage'|translate}}\n                </text>\n                <text y=\"5\">\n                  {{'explain.nothing-left-line-2-before-optionname'|translate}}<tspan font-style=\"italic\" font-weight=\"bold\" fill=\"var(--vodle-darkgreen)\" [attr.lang]=\"p.language\">{{optionname}}</tspan>{{'explain.nothing-left-line-2-after-optionname'|translate}}\n                </text>\n              </ng-container> \n            </g>\n\n            <!-- this option's pie chart: -->\n            <g transform=\"translate(-10 0) scale(.45 .45)\">\n              <circle cx=\"0\" cy=\"0\" r=\"20\" fill=\"var(--vodle-light)\" stroke=\"none\" />\n              <path id=\"_pie_own\" [attr.d]=\"dattrs[dattrs.length-1]\" fill=\"var(--vodle-darkgreen)\" />  \n            </g>\n            <ng-container *ngIf=\"ps[ps.length-1] > 0\">\n\n              <!-- arrow: -->\n              <line [attr.x1]=\"100*(1-a)\" x2=\"-4\" y1=\"0\" y2=\"0\" marker-end=\"url(#arrowhead-green)\" stroke=\"black\" stroke-width=\"0.2\" stroke-dasharray=\".5 .5\"><!--or var(--vodle-darkgreen)?-->\n              </line>\n\n              <!-- approval share: -->\n              <rect [attr.x]=\"100*(1-a)+0.2\" y=\"-1\" [attr.width]=\"100*ps[ps.length-1]-0.4\" height=\"2\" fill=\"var(--vodle-darkgreen)\" stroke=\"none\">\n              </rect>\n            </ng-container>\n          </g>\n        </ng-container>\n\n      </g>\n      \n    </svg>\n  </ion-item>\n\n  <!-- animation play controls:-->\n\n  <ion-item lines=\"none\" class=\"ion-text-center\">\n    <ion-col></ion-col>\n    <ion-col size=\"auto\">\n      <ion-buttons class=\"ion-no-margin ion-no-padding\">\n        <ion-button shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n            (click)=\"restart()\">\n          <ion-icon slot=\"icon-only\" name=\"reload-outline\"></ion-icon>\n        </ion-button>\n        <ion-button *ngIf=\"playing\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n            (click)=\"pause()\">\n          <ion-icon slot=\"icon-only\" name=\"pause-outline\"></ion-icon>\n        </ion-button>\n        <ion-button *ngIf=\"!playing\" shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n            (click)=\"unpause()\">\n          <ion-icon slot=\"icon-only\" name=\"play-outline\"></ion-icon>\n        </ion-button>\n        <ion-button shape=\"round\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n            (click)=\"to_end()\">\n          <ion-icon slot=\"icon-only\" name=\"play-skip-forward-outline\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-item>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_explain-approval_explain-approval_module_ts.js.map