"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_help_help_module_ts"],{

/***/ 95282:
/*!*********************************************!*\
  !*** ./src/app/help/help-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpPageRoutingModule": () => (/* binding */ HelpPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _help_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help.page */ 66633);
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
        component: _help_page__WEBPACK_IMPORTED_MODULE_0__.HelpPage
    }
];
let HelpPageRoutingModule = class HelpPageRoutingModule {
};
HelpPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], HelpPageRoutingModule);



/***/ }),

/***/ 96700:
/*!*************************************!*\
  !*** ./src/app/help/help.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpPageModule": () => (/* binding */ HelpPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _help_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help-routing.module */ 95282);
/* harmony import */ var _help_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help.page */ 66633);
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








let HelpPageModule = class HelpPageModule {
};
HelpPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _help_routing_module__WEBPACK_IMPORTED_MODULE_0__.HelpPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_help_page__WEBPACK_IMPORTED_MODULE_1__.HelpPage]
    })
], HelpPageModule);



/***/ }),

/***/ 66633:
/*!***********************************!*\
  !*** ./src/app/help/help.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpPage": () => (/* binding */ HelpPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _help_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help.page.html?ngResource */ 63919);
/* harmony import */ var _help_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help.page.scss?ngResource */ 66690);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
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





let HelpPage = class HelpPage {
    constructor(translate) {
        this.translate = translate;
        this.e_short = true;
        this.e_long = false;
        this.e_faq = false;
        this.e_q = [];
        this.faqs = [
            ["How to pronounce ‘vodle’?", `
Like ‘yodel’! (not like ‘model’ or ‘noodle’).
`],
            ["What does a rating of, say, 37 mean?", `
If you rate an option at 37 you promise to approve that option if less than 37% of all voters disapprove it.
`],
            ["What happens if I approve an option?", `
If you approve an option (green slider), you increase the likelihood that it wins (for single-winner polls) 
or the share of the budget it gets (for allocation polls).
`],
            ["How does my approval affect the winning probabilities?", `
If a unique option is approved by all voters, it wins for sure.
Otherwise, one voter is drawn by lot and one of the options this voter approves will win.
If you are this voter, your approval will decide which option wins:
among all options you approve, the one with the largest overall approval will win.
`],
            ["How does my approval affect the allocated shares?", `
An option's share is proportional to the number of voters who approve this target and approve no other target with a larger overall approval.
So if there are N voters in total, you control a share of 1/N of the total budget.
If you approve only one target, this share under your control goes to that target.
If you approve several targets, your share goes to the one with the largest overall approval among those targets you approve.
`],
            ["Why may the most-approved option still not win?", `
If a unique option is approved by all voters, it will win.
But if no option has the approval of all voters, this means there is incomplete consensus.
To give all voters the same influence, vodle cannot simply declare the most-approved option the winner.
Instead, it must follow an approach similar to a green-card lottery then:
one voter is drawn by lot, and an option approved by that voter wins.
Still, even then the broadest possible consensus is sought: 
among the options approved by the drawn voter, the one with the largest overall approve wins. 
`],
            ["Why should I accept that chance may play a role?", `
vodle uses chance only to make sure everyone has a fair chance of being heard.
One can prove mathematically that it is not possible to give all voters the same power without using some amount of chance in some situations.
You can make sure that chance does <i>not</i> play a role if you find an option that everyone can approve and give that option at least a rating of 1.
On the other hand, chance is an unavoidable ingredient of life. 
Even if a vote tallying rule does not explicitly use chance, the overall decision process always contains chance elements anyway in the real world:
at what time a decision is sought, what options are on offer, which voter has which information, what the consequences of the options would be 
– all these questions involve some chance element.
`],
            ["Why are the ratings not simply summed up?", `
Simply summing up all ratings for an option might sound like a good idea at first, but it would not give every voter a fair chance of influencing the result.
Imagine there are two polar options A and B, with A being favoured by 55% of voters and B by 45%,  
and assume there is a potential consensus option C that all voters consider almost as good as their favourite option. 
Then one would want C to win, and vodle makes this very likely.<br/>
But if instead ratings would simply be summed up, 
then the 55% A-voters could rate A at 100 and rate B and C at 0. 
Then A would wins for sure, no matter what the ratings of the other 45% are.
So those 45% would have no influence on the result at all, and the potential consensus option would not have a chance of winning.<br/>
With vodle however, the same “noncooperative” ratings would guarantee A only a winning probability of 55% rather than 100%
since every group of voters can only control a share of the winning probability that equals their share of voters.
If C is a potential consensus, those 55% would prefer getting C for sure rather than getting A with only 55% probability and getting B with 45% probability.
So with vodle, the 55% would give C a positive rating, and so would the other 45%.
This way, both factions avoid the uncertain lottery outcome A or B and rather make C the sure winner.
One can even prove using game theory that such ratings form a very strong form of strategic equilibrium when voters are rational.<br/>
One can also prove similarly, that when ratings were simply summed up instead, rational voters would never give a rating other than zero or 100 to any option,
and a majority would always get their will however slight the majority is, so that method would not be much different from plain majority voting.
`],
            ["Why should I rate <i>at least one</i> option at 100?", `
A rating of 100 does not mean that you are completely happy with that option!
It rather means that this option is the best or least bad <i>among those options on offer</i>.
If you give no option a rating of 100, it may happen that your vote is wasted since you end up approving no option at all.
By giving at least one option a rating of 100, you make sure that you retain control over a fair share of the overall decision power
and that the share of winning probability that you control does not go to any option that you rate at zero. 
`],
            ["Why should I give <i>more than one</i> option a <i>positive</i> rating?", `
If everyone gives just one option a positive rating, the winner will be determined by lot 
and every option wins with a probability equal to its approval (in percent of all voters who did not abstain).
No potential consensus option would get a chance.
This highly random result can be avoided by giving potential consensus options a positive rating as well.
By doing so, you indicate that you would agree to transfer the share of winning probability controlled by you
from your favourite option to the consensus option if other voters do so as well. 
`],
            ["Which options should get a positive rating?", `
A good rule of thumb is to give an option a positive rating if it is “better than average”.
`],
            ['What does "better than average" mean?', `
Imagine one voter was drawn by lot and could decide on their own. Letʼs call this the “random dictator lottery”.
Now for each option, you ask yourself: would I rather have this option for sure than having the random dictator lottery performed?
If the answer is yes, this option is “better than average” and should get a positive rating.<br/>
If you have no idea about the other votersʼ preferences, 
you could assume that every option has roughly the same approval among voters.
As the poll evolves, you can watch the approval each option gets
and thus improve your estimate of what the random dictator lottery would bring.
`],
            ['How large should a rating for a "better-than-average" option be?', `
If you have an idea about the views of the other voters,
you should set your rating in the following way.
First, you estimate what percentage of the voters finds this option worse than average.
Letʼs say you think 37% of voters find the option worse than average.
Then you add some safety margin (giving something like 40 in this example).
This should be your rating.<br/>
<i>Why?</i> Because if all voters who find the option better than average use the same logic, 
then vodle will correctly register all of you as approving this option:
your rating (40) is then larger than the percentage of voters who disapprove the option,
and this is the criterion for your approval that vodle uses.<br/>
<b>And what if I have no idea about who finds an option worse or better than average?</b>
Then a good rule of thumb is to scale your ratings from 0 to 100 according to your relative preference.
0 would mean "just average" and 100 would mean "best of the available options".
As the poll evolves, you can watch how the approval for each option grows,
and you can test how far to the right you have to move your slider before the approval increases.
If other voters have already set their ratings based on the above rule of thumb,
the light grey approval bar should start moving towards your slider once your rating gets large enough.
`],
            ["Why should I not give <i>too many</i> ratings of 100?", `
By giving a compromise option a positive rating smaller than 100, 
you indicate that you will approve this option only if enough other voters do so as well. 
This way, you give other voters an incentive to also give that option a positive rating.
If you gave the option a rating of 100, other voters could simply rate it at 0.
The result could be that your share of the winning probability would be transferred from your favourite option to the compromise option,
but the other votersʼ shares would remain with their favourite options. 
This would be no compromise but would only be to your disadvantage.
Only giving a rating properly between 0 and 100 can ensure that you and other voters <i>collectively</i> 
transfer your shares from your various favourite options to the compromise option.
`],
            ["What if no option appeals to everyone?", `
Ideally, some option <i>would be</i> considered better than average by all voters if they are honest,
and in that case a very small positive rating of just 1 would suffice to make this option the sure winner.
But in reality, even then there will likely be some small percentage of voters 
who do not realize that this option would make a good consensus and would rate it at zero instead.
This is why you should add some safety margin to your rating, and rather give a rating of, say, 5 or 10, than just 1.<br/>
If there really is no option with almost full consensus potential, 
there might still be one that at least appeal to, say, 80 percent.
In that case, these 80% should give it a rating of 100 – 80 = 20, 
plus some safety margin, so maybe a rating of 25.
This way, this broad “partial” consensus option wins with a very large probability of 80%,
and the remaining 20% winning probability remain under the control of the minority 20% 
who cannot agree to that consensus, which is only fair.
`],
            ["What if <i>several</i> options appeal to everyone?", `
In this lucky case, several options will end up being approved by everyone.
Whenever that happens, we do use their total ratings as a tie-breaker to decide between them.
So, if option A is approved by 60% but options B and C are both approved by 100%, 
and if the total ratings are 345 for A, 123 for B, and 234 for C, then C has the largest total rating among those options who have 100% approval, 
so C wins in that case, even though A has a larger total rating (but is not approved by everyone). 
`],
            ["What does x% agreement mean?", `
We calculate agreement as follows: For each option, we multiply its approval score with its share. Then we sum all these numbers up.
An agreement level of 100% means that the total share goes to an option that is approved by all non-abstaining participants.
For a poll that selects a single option, the resulting agreement level can be interpreted as follows: When you take a thousand polls each of which had, say, 23% agreement, and look at the approval scores the winning options got, the average approval score will be approximately 23%.
`],
            /*
            ["", `
            `],
            ["why anonymous?", `minority protection, vote trading
            `],
            ["when and how to delegate?", `trust, better informed, similar preferences
            `],
            ["why control some ratings yourself when delegating?", `
            `],
            ["why not anonymous when delegated?", `
            `],
            ["why delegation chains?", `
            `],
            ["why sometimes reduce rating again?", `
            `],
            */
        ];
    }
    ngOnInit() { }
};
HelpPage.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateService }
];
HelpPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-help',
        template: _help_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_help_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], HelpPage);



/***/ }),

/***/ 66690:
/*!************************************************!*\
  !*** ./src/app/help/help.page.scss?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHAucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJoZWxwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 63919:
/*!************************************************!*\
  !*** ./src/app/help/help.page.html?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'help.-page-title'|translate\"></ion-title>\n    <ion-thumbnail slot=\"end\">\n        <ion-img src=\"./assets/topright_icon.png\"></ion-img>\n    </ion-thumbnail>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"full\" no-padding no-margin>\n\n    <ion-item button (click)=\"e_short = !e_short\" no-padding color=\"primary\">\n      <ion-icon [name]=\"e_short?'caret-down-outline':'caret-forward-outline'\" no-padding no-margin></ion-icon>\n      <ion-label><b [innerHtml]=\"'help.h1'|translate\"></b></ion-label>\n    </ion-item>\n    <ng-template [ngIf]=\"e_short\">\n      <ion-item>\n        <ion-label text-wrap>\n          <span [innerHtml]=\"'help.p11a'|translate\"></span>&nbsp;<a routerLink=\"/mypolls\"><span [innerHtml]=\"'help.p11b'|translate\"></span></a>&nbsp;<span [innerHtml]=\"'help.p11c'|translate\"></span>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap>\n          <span [innerHtml]=\"'help.p12a'|translate\"></span>\n          <ul>\n            <li [innerHtml]=\"'help.p12b'|translate\"></li>\n            <li [innerHtml]=\"'help.p12c'|translate\"></li>\n            <li [innerHtml]=\"'help.p12d'|translate\"></li>\n          </ul>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap>\n          <span [innerHtml]=\"'help.p13a'|translate\"></span>\n          <ul>\n            <li [innerHtml]=\"'help.p13b'|translate\"></li>\n            <li [innerHtml]=\"'help.p13c'|translate\"></li>\n          </ul>\n        </ion-label>\n      </ion-item>\n<!--      <ion-item>\n        <ion-label text-wrap>\n          See <b>more information</b> on a poll or option by pressing the <b>dropdown buttons</b> on the right.\n        </ion-label>\n      </ion-item>-->\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p14'|translate\">\n          <!--If you want to <b>freeze</b> the current sorting of options on your screen, \n          use the <b>refresh button</b> in the top-right corner to disable automatic resorting.\n          If that button shows an <b>exclamation mark</b>, the ordering needs a refresh.-->\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap>\n          <span [innerHtml]=\"'help.p15a'|translate\"></span>\n          <ul>\n            <li><!--TODO: make icons align better vertically:-->\n              <span [innerHtml]=\"'help.p15b1'|translate\"></span>&nbsp;<ion-icon class=\"poll-type\" name=\"trophy\"></ion-icon>&nbsp;<span [innerHtml]=\"'help.p15b2'|translate\"></span> \n            </li>\n            <li>\n              <span [innerHtml]=\"'help.p15c1'|translate\"></span>&nbsp;<ion-icon class=\"poll-type\" name=\"cut\"></ion-icon>&nbsp;<span [innerHtml]=\"'help.p15c2'|translate\"></span> \n            </li>\n          </ul>\n        </ion-label>\n      </ion-item>\n    </ng-template>\n\n    <ion-item button (click)=\"e_long = !e_long\" no-padding color=\"primary\">\n      <ion-icon [name]=\"e_long?'caret-down-outline':'caret-forward-outline'\" no-padding no-margin></ion-icon>\n      <ion-label><b>{{'help.h2'|translate}}</b></ion-label>\n    </ion-item>\n    <ng-template [ngIf]=\"e_long\">\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p21'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p22'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p23'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p24'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p25'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p26'|translate\"></ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label text-wrap [innerHtml]=\"'help.p27'|translate\"></ion-label>\n      </ion-item>\n    </ng-template>\n\n    <ion-item button (click)=\"e_faq = !e_faq\" no-padding color=\"primary\">\n      <ion-icon [name]=\"e_faq?'caret-down-outline':'caret-forward-outline'\" no-padding no-margin></ion-icon>\n      <ion-label><b>FAQ</b></ion-label>\n    </ion-item>\n    <ng-template [ngIf]=\"e_faq\">\n      <ion-item *ngFor=\"let q of faqs\" button (click)=\"e_q[q[0]] = !(e_q[q[0]] || false)\">\n        <ion-icon [name]=\"e_q[q[0]]?'chevron-down-outline':'chevron-forward-outline'\" no-padding no-margin size=\"small\"></ion-icon>\n        <ion-label button text-wrap>\n          <div [innerHTML]=\"'<b>'+q[0]+'</b>'\"></div>\n          <ng-template [ngIf]=\"e_q[q[0]]\">\n            <div [innerHTML]=\"q[1]\"></div>\n          </ng-template>\n        </ion-label>\n      </ion-item>\n    </ng-template>\n  \n  </ion-list>\n<!--    <li>\n      If you feel a good option is missing, just add it at the bottom of the list!<br/>\n      <small>\n        Options are sorted by descending approve, so your option will move upwards as it gains approve.\n        vodle works best with at least a handful of options.\n      </small><br/>&nbsp;\n    </li>-->\n<!--  \n      <small>\n        A rating of, say, 80 means you would approve this option if less then 80% oppose it\n        (or, equivalently, if more than 20% approve it).\n        If your slider meets the light approve bar to the right, then you approve the option and the slider turns green.\n        A rating of zero implies that you won't ever approve this option.\n      </small><br/>&nbsp;\n  <h3>How to set up a new poll</h3>\n  <ul>\n    <li>...</li>\n  </ul>\n-->\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_help_help_module_ts.js.map