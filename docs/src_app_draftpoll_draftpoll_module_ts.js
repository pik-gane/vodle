"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_draftpoll_draftpoll_module_ts"],{

/***/ 24715:
/*!*******************************************************!*\
  !*** ./src/app/draftpoll/draftpoll-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollPageRoutingModule": () => (/* binding */ DraftpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _draftpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll.page */ 83819);
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
        component: _draftpoll_page__WEBPACK_IMPORTED_MODULE_0__.DraftpollPage
    }
];
let DraftpollPageRoutingModule = class DraftpollPageRoutingModule {
};
DraftpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DraftpollPageRoutingModule);



/***/ }),

/***/ 2805:
/*!***********************************************!*\
  !*** ./src/app/draftpoll/draftpoll.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollPage": () => (/* reexport safe */ _draftpoll_page__WEBPACK_IMPORTED_MODULE_2__.DraftpollPage),
/* harmony export */   "DraftpollPageModule": () => (/* binding */ DraftpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _draftpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-routing.module */ 24715);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 94496);
/* harmony import */ var _draftpoll_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draftpoll.page */ 83819);
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










let DraftpollPageModule = class DraftpollPageModule {
};
DraftpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _draftpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.DraftpollPageRoutingModule,
            _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__.SharedcomponentsModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule.forChild()
        ],
        declarations: [_draftpoll_page__WEBPACK_IMPORTED_MODULE_2__.DraftpollPage],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_ELEMENTS_SCHEMA]
    })
], DraftpollPageModule);



/***/ }),

/***/ 83819:
/*!*********************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollPage": () => (/* binding */ DraftpollPage)
/* harmony export */ });
/* harmony import */ var _home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _draftpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll.page.html?ngResource */ 22682);
/* harmony import */ var _draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draftpoll.page.scss?ngResource */ 29626);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/local-notifications */ 45568);
/* harmony import */ var _draftpoll_kebap_draftpoll_kebap_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../draftpoll-kebap/draftpoll-kebap.module */ 20562);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../poll.service */ 88211);
/* harmony import */ var _sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sharedcomponents/select-server/select-server.component */ 72767);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sharedcomponents/unique-form-validator */ 52738);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 86942);


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



/*
TODO:
- fix next field not showing in android app
- fix wrong option_stage when returning, make "skip" button work properly
- make tab key autofocus work properly
*/















function is_forward_key(ev) {
  return (ev.key == "Tab" || ev.key == "Enter") && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey && !ev.altKey;
}

let DraftpollPage = class DraftpollPage {
  constructor(router, route, formBuilder, popover, alertCtrl, G, translate, ref) {
    this.router = router;
    this.route = route;
    this.formBuilder = formBuilder;
    this.popover = popover;
    this.alertCtrl = alertCtrl;
    this.G = G;
    this.translate = translate;
    this.ref = ref;
    this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment; // other:

    this.max = Math.max; // function used frequently in template
    // LIFECYCLE:

    this.show_details = false;
    this.ready = false; // CONSTANTS:

    this.validation_messages = {
      'poll_type': [{
        type: 'required',
        message: 'validation.poll-type-required'
      }],
      'poll_language': [],
      'poll_title': [{
        type: 'required',
        message: 'validation.poll-title-required'
      }],
      'poll_desc': [],
      'poll_url': [{
        type: 'pattern',
        message: 'validation.poll-url-valid'
      }],
      'poll_due_type': [{
        type: 'required',
        message: 'validation.poll-due-type-required'
      }],
      'poll_due_custom': [{
        message: 'validation.poll-due-future'
      }],
      'option_name': [{
        type: 'required',
        message: 'validation.option-name-required'
      }, {
        type: 'not_unique',
        message: 'validation.option-name-unique'
      }],
      'option_desc': [],
      'option_url': [{
        type: 'pattern',
        message: 'validation.option-url-valid'
      }]
    };
    this.G.L.entry("DraftpollPage.constructor");
    this.route.params.subscribe(params => {
      this.pid = params['pid'];
      this.pd = JSON.parse(decodeURIComponent(params['pd'] || "{}"));
    });
  }

  get n_options() {
    return (this.pd.options || []).length;
  }

  ngOnInit() {
    this.G.L.entry("DraftpollPage.ngOnInit");
    this.reset();
  }

  ionViewWillEnter() {
    this.G.L.entry("DraftpollPage.ionViewWillEnter");
    this.G.D.page = this;
    this.reset();
  }

  ionViewDidEnter() {
    this.G.L.entry("DraftpollPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    this.G.L.entry("DraftpollPage.onDataReady");
    this.deleted = false;

    if (!this.pid) {
      this.stage = 0;

      if (!this.pd) {
        this.G.L.info("DraftpollPage editing new draft");
        this.pd = {
          db: 'default',
          language: this.G.S.language
        };
      } else {
        this.G.L.info("DraftpollPage editing draft with data", this.pd);
        this.pd.due_custom = (this.pd.due_custom || '') != '' ? new Date(this.pd.due_custom) : null;
        this.pd.db = this.pd.db || 'default';
        this.pd.language = this.pd.language || this.G.S.language;
      }
    } else if (this.pid in this.G.P.polls) {
      if (this.G.P.polls[this.pid].state == 'draft') {
        this.G.L.info("DraftpollPage editing existing draft", this.pid); // read data:

        let p = this.G.P.polls[this.pid];
        this.pd = {
          pid: p.pid,
          type: p.type,
          language: p.language,
          title: p.title,
          desc: p.desc,
          url: p.url,
          due_type: p.due_type,
          due_custom: p.due_custom,
          db: p.db,
          db_from_pid: p.db_from_pid,
          db_custom_server_url: p.db_custom_server_url,
          db_custom_password: p.db_custom_password,
          options: []
        };
        this.stage = !!!p.due_custom ? 6 : p.due_type ? 6 : p.url != '' ? 4 : p.desc != '' ? 3 : p.title != '' ? 4 : p.type ? 1 : 0;

        for (let [oid, o] of Object.entries(p.options)) {
          this.pd.options.push({
            oid: oid,
            name: o.name,
            desc: o.desc,
            url: o.url
          });
          this.stage = 6;
          this.option_stage = 10;
        }
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, generating new draft");
      }
    } else {
      this.G.L.warn("DraftpollPage unknown pid ignored, generating new draft");
    }

    this.expanded = Array(this.n_options);
    this.advanced_expanded = false; // fill form:

    if (this.pd) {
      this.formGroup.setValue({
        poll_type: this.pd.type || '',
        poll_language: (this.pd.language || '') != '' ? this.pd.language : this.G.S.language,
        poll_title: this.pd.title || '',
        poll_desc: this.pd.desc || '',
        poll_url: this.pd.url || '',
        poll_due_type: this.pd.due_type || '',
        poll_due_custom: !this.pd.due_custom ? '' : this.pd.due_custom.toISOString()
      });

      if (this.pd.language || this.pd.db_from_pid || this.pd.db_custom_server_url) {
        this.advanced_expanded = true;
      }

      if (this.pd.desc || this.pd.url) {
        this.show_details = true;
      }

      if (!this.pd.options) {
        this.pd.options = [];
      }

      for (let [i, od] of this.pd.options.entries()) {
        this.add_option_inputs(i);
        this.formGroup.get('option_name' + i).setValue(od.name);
        this.formGroup.get('option_desc' + i).setValue(od.desc);
        this.formGroup.get('option_url' + i).setValue(od.url);
        this.stage = 6;
        this.option_stage = 10;

        if (od.desc || od.url) {
          this.show_details = true;
        }
      }
    }

    if (this.n_options == 0) {
      this.add_option({});
      this.option_stage = 0;
    } // show the page:


    this.ready = true; // find select-server component and register us with it:

    this.ref.detectChanges(); // make sure select-element values are translated properly:

    this.ionSelects.map(select => select.value = select.value); // open the type selector?:

    if (!this.formGroup.get('poll_type').value) {
      this.type_select.open(new MouseEvent("click"));
    }
  }

  onSelectServerReady(select_server) {
    // called by SelectServerComponent is ready
    this.select_server = select_server;

    if (this.pd) {
      this.select_server.selectServerFormGroup.setValue({
        db: this.pd.db || '',
        db_from_pid: this.pd.db_from_pid || '',
        db_custom_server_url: this.pd.db_custom_server_url || '',
        db_custom_password: this.pd.db_custom_password || ''
      });
    }
  }

  ionViewWillLeave() {
    this.G.L.entry("DraftpollPage.ionViewWillLeave"); // TODO: close/dismiss this.type_select, which is a popover

    if ((this.pd.title || '') == '') {
      this.G.L.info("DraftpollPage.ionViewWillLeave not saving empty title draft"); // TODO: notify of deleted draft
    } else if (!this.deleted) {
      this.G.L.info("DraftpollPage.ionViewWillLeave saving draft");
      var p;

      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }

      if (!(this.pid in this.G.P.polls)) {
        // generate new poll object:
        p = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Poll(this.G, this.pid);
      } else {
        p = this.G.P.polls[this.pid];
      }

      p.state = 'draft';

      if (this.pd.is_test == true) {
        p.is_test = true;
      }

      p.type = this.pd.type;
      p.language = this.pd.language;
      p.title = this.pd.title;
      p.desc = this.pd.desc;
      p.url = this.pd.url;
      p.due_type = this.pd.due_type;
      p.due_custom = this.pd.due_custom;
      p.set_due();
      p.db = this.pd.db;
      p.db_from_pid = this.pd.db_from_pid;
      p.db_custom_server_url = this.pd.db_custom_server_url;
      p.db_custom_password = this.pd.db_custom_password;
      let oids = [];

      for (let od of this.pd.options) {
        this.G.L.trace(" storing option data", od);

        if ((od.name || '') != '') {
          var o;

          if (!od.oid) {
            od.oid = this.G.P.generate_oid(this.pid);
            this.G.L.trace("  generated new oid", od.oid);
          }

          if (!(od.oid in p.options)) {
            // generate new options object:
            this.G.L.trace("  creating new Option object");
            o = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Option(this.G, p, od.oid, od.name, od.desc, od.url);
          } else {
            o = p.options[od.oid];
            this.G.L.trace("  reusing Option object", o);
            o.name = od.name;
            o.desc = od.desc;
            o.url = od.url;
          }

          oids.push(od.oid);

          if (p.is_test && !!od.ratings) {
            // mark poll as test poll and store ratings of simulated voters:
            this.G.D.setp(this.pid, 'simulated_ratings.' + od.oid, JSON.stringify(od.ratings));
          }
        }
      }

      this.G.L.trace(" oids now", oids); // remove deleted options from p:

      for (let [oid, o] of Object.entries(p.options)) {
        if (!oids.includes(oid)) {
          this.G.L.trace(" removing old option", oid);
          p.remove_option(oid);
        }
      } // send local notification:


      _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("draftpoll.notification-saved-title"),
          body: p.title,
          id: 1 // TODO: increment or leave out?

        }]
      }).then(res => {
        this.G.L.trace("DraftpollPage.ionViewWillLeave localNotifications.schedule succeeded:", res);
      }).catch(err => {
        this.G.L.warn("DraftpollPage.ionViewWillLeave localNotifications.schedule failed:", err);
      });
    }

    this.G.L.trace("DraftpollPage.ionViewWillLeave D.pids:", [...this.G.D.pids]);
    this.G.L.exit("DraftpollPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("DraftpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.ready = false; // so that when returning, onDataReady will again be triggered

    this.G.L.exit("DraftpollPage.ionViewDidLeave");
  } // OTHER HOOKS:
  // for DataService:


  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("DraftpollPage.onDataChange"); // TODO: what?
  } // for form actions:


  set_poll_type() {
    let c = this.formGroup.get('poll_type');
    if (c.valid) this.pd.type = c.value;
  }

  set_poll_language() {
    let c = this.formGroup.get('poll_language');
    if (c.valid) this.pd.language = c.value;
  }

  set_poll_title() {
    let c = this.formGroup.get('poll_title');
    if (c.valid) this.pd.title = c.value;
  }

  set_poll_desc() {
    let c = this.formGroup.get('poll_desc');
    if (c.valid) this.pd.desc = c.value;
  }

  set_poll_url() {
    let c = this.formGroup.get('poll_url');
    if (c.valid) this.pd.url = c.value;
  }

  set_poll_due_type() {
    let c = this.formGroup.get('poll_due_type');
    if (c.valid) this.pd.due_type = c.value;
  }

  set_poll_due_custom() {
    this.G.P.update_ref_date();
    let c = this.formGroup.get('poll_due_custom');
    if (c.valid) this.pd.due_custom = new Date(c.value);
  }

  set_option_name(i) {
    let c = this.formGroup.get('option_name' + i);
    this.G.L.trace("set_option_name", i, c.value);
    if (c.valid) this.pd.options[i].name = c.value;
    this.G.L.trace("set_option_name result", this.pd.options, this.pd.options[i]);
  }

  set_option_desc(i) {
    let c = this.formGroup.get('option_desc' + i);
    if (c.valid) this.pd.options[i].desc = c.value;
  }

  set_option_url(i) {
    let c = this.formGroup.get('option_url' + i);
    if (c.valid) this.pd.options[i].url = c.value;
  } // selectServer component hooks:


  set_db(value) {
    this.pd.db = value;
  }

  set_db_from_pid(value) {
    this.pd.db_from_pid = value;
  }

  set_db_custom_server_url(value) {
    this.pd.db_custom_server_url = value;
  }

  set_db_custom_password(value) {
    this.pd.db_custom_password = value;
  } // focus management:


  set_focus(input_element_id) {
    /** set the focus to a certain IonInput element after 100 ms */
    setTimeout(() => {
      const next_input_element = document.getElementById(input_element_id);

      if (!!next_input_element) {
        next_input_element.setFocus();
      }
    }, 100);
  }

  open_due_select() {
    // TODO: find a way to open it so that the title is still visible. 

    /**/
    setTimeout(() => {
      document.getElementById('due_select').open(new MouseEvent("click"));
    }, 100);
    /**/
  }

  open_due_custom() {
    setTimeout(() => {// FIXME:      (<IonDatetime><unknown>document.getElementById('poll_due_custom')).open();
    }, 100);
  }

  changed_poll_type() {
    if (this.stage < 1) {
      this.stage = Math.max(this.stage, 1);
      this.set_focus('input_poll_title');
    }
  }

  blur_poll_title() {
    if (!this.formGroup.get('poll_title').valid) {
      this.set_focus('input_poll_title');
    }
  }

  poll_title_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_title').valid) {
        if (this.stage < 2) {
          this.stage = this.show_details ? 2 : 4;
        }

        if (this.show_details) {
          this.set_focus('input_poll_desc');
        } else {
          this.open_due_select();
        }
      } else {
        this.set_focus('input_poll_title');
      }
    }
  }

  blur_poll_desc() {}

  poll_desc_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.stage < 3) {
        this.stage = 3;
        this.set_focus('input_poll_url');
      }
    }
  }

  blur_poll_url() {
    if (!this.formGroup.get('poll_url').valid) {
      this.set_focus('input_poll_url');
    }
  }

  poll_url_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_url').valid) {
        if (this.stage < 4) {
          this.stage = Math.max(this.stage, 4);
        }

        this.open_due_select(); // TODO: open select for due type      
      } else {
        this.set_focus('input_poll_url');
      }
    }
  }

  changed_due_type() {
    if (this.stage < 5) {
      if (this.formGroup.get('poll_due_type').value == 'custom') {
        this.stage = 5;
        this.open_due_custom();
      } else {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }
    }
  }

  changed_poll_due_custom() {
    if (this.formGroup.get('poll_due_custom').valid) {
      if (this.stage < 6) {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }
    }
  }

  blur_option_name(i) {
    if (!this.formGroup.get('option_name' + i).valid) {
      this.set_focus('input_option_name' + i);
    }
  }

  option_name_onKeydown(ev, i, show_details) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_name' + i).valid) {
        if (show_details) {
          this.option_stage = this.max(this.option_stage, 1);
          this.expanded[i] = true;
          this.set_focus('input_option_desc' + i);
        } else if (i == this.n_options - 1) {
          this.next_option(i);
        }
      } else {
        this.set_focus('input_option_name' + i);
      }
    }
  }

  blur_option_desc(i) {
    if (!this.formGroup.get('option_desc' + i).valid) {
      this.set_focus('input_option_desc' + i);
    }
  }

  option_desc_onKeydown(ev, i) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_desc' + i).valid) {
        this.option_stage = Math.max(this.option_stage, 2);
        this.set_focus('input_option_url' + i);
      } else {
        this.set_focus('input_option_desc' + i);
      }
    }
  }

  blur_option_url(i) {
    if (!this.formGroup.get('option_url' + i).valid) {
      this.set_focus('input_option_url' + i);
    }
  }

  option_url_onKeydown(ev, i) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_url' + i).valid) {
        if (i == this.n_options - 1) {
          this.next_option(i);
        } else {
          this.set_focus('input_option_name' + (i + 1));
        }
      } else {
        this.set_focus('input_option_url' + i);
      }
    }
  }

  next_option(i) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false;
    this.add_option({});
    this.set_focus('input_option_name' + (i + 1));
  }

  del_poll_dialog() {
    var _this = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this.alertCtrl.create({
        message: _this.translate.instant("draftpoll.del-poll-confirm-question"),
        buttons: [{
          text: _this.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this.translate.instant('OK'),
          role: 'Ok',
          handler: () => {
            _this.del_draft();
          }
        }]
      });
      yield confirm.present();
    })();
  }

  del_option_dialog(i) {
    var _this2 = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this2.alertCtrl.create({
        message: _this2.translate.instant(_this2.formGroup.get('poll_type').value == 'choice' ? "draftpoll.del-option-confirm-question" : "draftpoll.del-target-confirm-question", {
          name: _this2.formGroup.get('option_name' + i).value
        }),
        buttons: [{
          text: _this2.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this2.translate.instant('OK'),
          role: 'Ok',
          handler: () => {
            _this2.del_option(i);
          }
        }]
      });
      yield confirm.present();
    })();
  }

  no_more() {
    if ((this.formGroup.get('option_name' + (this.n_options - 1)).value || '') == '') {
      this.option_stage = 10;
      this.del_option(this.n_options - 1);
    }
  }

  new_option() {
    this.option_stage = 0;
    this.add_option({});
  } // kebap:


  showkebap(event) {
    this.popover.create({
      event,
      component: _draftpoll_kebap_draftpoll_kebap_module__WEBPACK_IMPORTED_MODULE_4__.DraftpollKebapPage,
      translucent: true,
      showBackdrop: false,
      cssClass: 'kebap',
      componentProps: {
        parent: this
      }
    }).then(popoverElement => {
      popoverElement.present();
    });
  }

  send4review() {
    this.G.L.warn("DraftpollPage.send4review not yet implemented!");
  }

  import_csv_dialog() {
    var _this3 = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this3.alertCtrl.create({
        header: _this3.translate.instant('draftpoll.import-options-header'),
        message: _this3.translate.instant("draftpoll.import-options-msg"),
        buttons: [{
          text: _this3.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this3.translate.instant('choose-file'),
          role: 'Ok',
          handler: () => {
            // open the file chooser by simulating a click to the hidden form field:
            document.getElementById("choosefile").click();
          }
        }]
      });
      yield confirm.present();
    })();
  } // ready button:


  ready_button_clicked() {
    this.formGroup.get('poll_due_custom').updateValueAndValidity();

    if (this.formGroup.valid) {
      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }

      this.router.navigate(['/previewpoll/' + this.pid]);
    }
  } // OTHER METHODS:


  reset() {
    this.formGroup = this.formBuilder.group({
      poll_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required),
      poll_language: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl(''),
      poll_title: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required),
      poll_desc: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl(''),
      poll_url: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(this.G.urlRegex)),
      poll_due_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required),
      poll_due_custom: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', this.allowed_date.bind(this))
    });
    this.G.P.update_ref_date();
  }

  del_draft() {
    // TODO!
    if (this.pid) {
      this.G.P.polls[this.pid].delete();
    }

    this.deleted = true;
    this.router.navigate(["/mypolls"]);
  }

  import_csv(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const page = this;

    reader.onload = function (event) {
      const content = event.target.result;

      for (var row of content.split("\n")) {
        // TODO: improve csv parser!
        var cols = row.split(/\s*"\s*,\s*"\s*/);

        if (cols.length > 0) {
          cols[0] = cols[0].slice(cols[0].indexOf('"') + 1);
          cols[cols.length - 1] = cols[cols.length - 1].slice(0, cols[cols.length - 1].indexOf('"'));
          cols = cols.map(c => c.trim());

          if (cols[0] != "") {
            page.no_more();

            if (cols.length == 1) {
              page.add_option({
                name: cols[0]
              });
            } else if (cols.length == 2) {
              page.add_option({
                name: cols[0],
                desc: cols[1]
              });
              page.detailstoggle.checked = true;
            } else {
              page.add_option({
                name: cols[0],
                desc: cols[1],
                url: cols[2]
              });
              page.detailstoggle.checked = true;
            }

            page.stage = 10;
            page.option_stage = 10;
          }
        }
      }
    };

    reader.readAsText(file);
  }

  restart_with_data(spec) {
    this.G.L.info("DraftpollPage.restart_with_data", spec);
    this.router.navigate(['/draftpoll/use/' + encodeURIComponent(spec)]);
  }

  add_option(od) {
    let i = this.n_options;
    this.pd.options.push(od);
    this.add_option_inputs(i);
    this.formGroup.get('option_name' + i).setValue(od.name);
    this.formGroup.get('option_desc' + i).setValue(od.desc);
    this.formGroup.get('option_url' + i).setValue(od.url);
  }

  add_option_inputs(i) {
    this.formGroup.addControl('option_name' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required], [(0,_sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_9__.unique_name_validator$)(this.existingOptionName$('option_name' + i))]));
    this.formGroup.addControl('option_desc' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl(""));
    this.formGroup.addControl('option_url' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(this.G.urlRegex)));
    this.option_stage = 0;
  }

  del_option(i) {
    // move metadata of options i+1,i+2,... back one slot to i,i+1,...:
    for (let j = i + 1; j < this.n_options; j++) {
      this.formGroup.get('option_name' + (j - 1)).setValue(this.formGroup.get('option_name' + j).value);
      this.formGroup.get('option_desc' + (j - 1)).setValue(this.formGroup.get('option_desc' + j).value);
      this.formGroup.get('option_url' + (j - 1)).setValue(this.formGroup.get('option_url' + j).value);
      this.pd.options[j - 1] = this.pd.options[j];
    } // remove last:


    let j = this.n_options - 1;
    this.formGroup.removeControl('option_name' + j);
    this.formGroup.removeControl('option_desc' + j);
    this.formGroup.removeControl('option_url' + j);
    this.pd.options.pop();
  }

  now() {
    return new Date();
  }

  allowed_date(control) {
    if (control && control.value) {
      const value = new Date(control.value); // check whether in past:

      if (this.G.P.ref_date >= value) {
        return {
          past: true
        };
      } // check whether too far in future:


      if (this.get_max_due() < value) {
        return {
          too_late: true
        };
      }

      return null;
    }
  }

  get_max_due() {
    const last = new Date(this.G.P.ref_date.valueOf());
    last.setDate(last.getDate() + this.E.polls.max_duration_days);
    return last;
  }

  existingOptionName$(currentControlName) {
    return this.formGroup.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.startWith)({}), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(values => {
      const optionNameKeys = Object.keys(values).filter(k => {
        return k.includes('option_name') && k !== currentControlName;
      });
      const existingOptionNames = [];
      optionNameKeys.forEach(key => existingOptionNames.push(values[key]));
      return existingOptionNames;
    }));
  }

};

DraftpollPage.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormBuilder
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.PopoverController
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.AlertController
}, {
  type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ChangeDetectorRef
}];

DraftpollPage.propDecorators = {
  type_select_ref: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSelect, {
      static: false,
      read: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ElementRef
    }]
  }],
  type_select: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSelect, {
      static: false
    }]
  }],
  due_select: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSelect, {
      static: false
    }]
  }],
  select_server: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: [_sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_7__.SelectServerComponent, {
      static: false
    }]
  }],
  detailstoggle: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonToggle, {
      static: false
    }]
  }],
  ionSelects: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChildren,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSelect]
  }]
};
DraftpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_17__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
  selector: 'app-draftpoll',
  template: _draftpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], DraftpollPage);


/***/ }),

/***/ 52738:
/*!***********************************************************!*\
  !*** ./src/app/sharedcomponents/unique-form-validator.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unique_name_validator$": () => (/* binding */ unique_name_validator$)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 83910);


/** The option-name has to be unique */
function unique_name_validator$(value$) {
    return (control) => {
        if (!control.valueChanges || control.pristine) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(null);
        }
        return value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)((names) => {
            return names.includes(control.value) ? { not_unique: true } : null;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
    };
}


/***/ }),

/***/ 29626:
/*!**********************************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWZ0cG9sbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCOzs7Ozs7Ozs7Ozs7Ozs7OztDQUFBIiwiZmlsZSI6ImRyYWZ0cG9sbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKEMpIENvcHlyaWdodCAyMDE14oCTMjAyMiBQb3RzZGFtIEluc3RpdHV0ZSBmb3IgQ2xpbWF0ZSBJbXBhY3QgUmVzZWFyY2ggKFBJSyksIGF1dGhvcnMsIGFuZCBjb250cmlidXRvcnMsIHNlZSBBVVRIT1JTIGZpbGUuXG5cblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHZvZGxlLlxuXG52b2RsZSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSBcbnRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFxuU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbmFueSBsYXRlciB2ZXJzaW9uLlxuXG52b2RsZSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgXG5XQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBcbkEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBcbmRldGFpbHMuXG5cbllvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBcbmFsb25nIHdpdGggdm9kbGUuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uIFxuKi9cblxuIl19 */";

/***/ }),

/***/ 22682:
/*!**********************************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'draftpoll.-page-title'|translate\"></ion-title>\n    <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\">\n      <ion-button fill=\"clear\" (click)=\"del_poll_dialog()\" class=\"ion-no-padding ion-no-margin\">\n        <ion-icon name=\"trash-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n      <ion-button fill=\"clear\" (click)=\"showkebap($event)\" class=\"ion-no-padding ion-no-margin\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"ready\">\n  <form [formGroup]=\"formGroup\">\n\n    <!-- A hidden input needed to enable file upload from the kebap: -->\n    <input hidden id=\"choosefile\" type=\"file\" class=\"file\" (change)=\"import_csv($event)\" />\n\n    <!-- GENERAL POLL INFORMATION: -->\n\n    <!-- Show details button: -->\n    <ion-item color=\"primary\">\n      <ion-label [innerHtml]=\"'draftpoll.general-information'|translate\"></ion-label>\n      <ion-button slot=\"end\" fill=\"clear\" (click)=\"show_details=!show_details\" class=\"ion-no-margin ion-no-padding\">\n        <span style=\"color: white\" [innerHtml]=\"'draftpoll.details'|translate\"></span>\n        <ion-toggle \n          name=\"detail-toggle\" #detailstoggle [checked]=\"show_details\"\n          color=\"light\" style=\"--handle-background: black; padding-right: 0; margin-right: 0;\">\n        </ion-toggle><!--not (click)=\"show_details=!show_details\" because this is caught by the surrounding button!-->\n      </ion-button>\n    </ion-item>\n\n    <!-- Poll type: -->\n    <ion-item [color]=\"stage==0?'warning':''\"><!--stage 0-->\n      <ion-label color=\"primary\" position=\"floating\">\n        <span *ngIf=\"formGroup.get('poll_type').valid\" \n            [class]=\"stage==0?'current-field':''\" \n            ><!--style=\"position:relative;top:3px;z-index:10;\" now in class=poll-type-->\n          <ion-icon class=\"poll-type\"\n            [name]=\"formGroup.get('poll_type').value=='winner'?'trophy':'cut'\"\n            style=\"color:black\">\n          </ion-icon>&nbsp;\n        </span>\n        <span [class]=\"stage==0?'current-field':''\" \n          [innerHtml]=\"'draftpoll.type-label'|translate\">\n        </span>\n      </ion-label>\n      <ion-select \n          formControlName=\"poll_type\" \n          text-wrap autofocus tabindex=\"0\" \n          #ionSelects #type_select  \n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n          (ionChange)=\"set_poll_type();changed_poll_type()\">\n        <ion-select-option text-wrap value=\"winner\" [innerHtml]=\"'draftpoll.type-winner'|translate\"></ion-select-option>\n        <ion-select-option text-wrap value=\"share\" [innerHtml]=\"'draftpoll.type-share'|translate\"></ion-select-option>\n      </ion-select>\n    </ion-item>\n    <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of validation_messages.poll_type\">\n        <div class=\"error-message\" \n            *ngIf=\"formGroup.get('poll_type').hasError(validation.type) \n                    && (formGroup.get('poll_type').dirty || formGroup.get('poll_type').touched)\"\n            [innerHtml]=\"validation.message|translate\">\n        </div>\n      </ng-container>\n    </div>\n\n    <!-- Poll title: -->\n    <ng-container *ngIf=\"stage>0\">\n      <ion-item [color]=\"stage==1?'warning':'light'\"><!--stage 1-->\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [class]=\"stage==1?'current-field':''\" \n            [innerHtml]=\"'draftpoll.title-label'|translate\">\n          </span>\n        </ion-label>\n        <ion-input  \n          id=\"input_poll_title\"\n          formControlName=\"poll_title\" [maxlength]=\"E.max_len.title\"\n          [placeholder]=\"'draftpoll.title-placeholder'|translate\"\n          tabindex=\"0\" type=\"text\" required inputmode=\"text\"\n          style=\"font-weight: bold; font-style: italic; font-size: larger;\"\n          (ionChange)=\"set_poll_title();\" debounce=\"100\"\n          (keydown)=\"poll_title_onKeydown($event)\"\n          (ionBlur)=\"blur_poll_title()\">\n        </ion-input>      \n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.poll_title\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('poll_title').hasError(validation.type) \n                      && (formGroup.get('poll_title').dirty || formGroup.get('poll_title').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>  \n    \n    <!-- Poll description: -->\n    <ng-container *ngIf=\"stage>1 && show_details\">\n      <ion-item [color]=\"stage==2?'warning':''\"><!--stage 2-->\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [class]=\"stage==2?'current-field':''\" \n            [innerHtml]=\"'draftpoll.desc-label'|translate\">\n          </span>\n        </ion-label>\n        <!--TODO: textarea too large (mostly white) in Firefox when desc is long -->\n        <ion-textarea \n          id=\"input_poll_desc\"\n          formControlName=\"poll_desc\" [maxlength]=\"E.max_len.desc\"\n          [placeholder]=\"'draftpoll.desc-placeholder'|translate\"\n          autofocus tabindex=\"0\" rows=\"1\" auto-grow type=\"text\" inputmode=\"text\" \n          style=\"font-style: italic;\"\n          (ionChange)=\"set_poll_desc()\" debounce=\"100\"\n          (keydown)=\"poll_desc_onKeydown($event)\"\n          (ionBlur)=\"blur_poll_desc()\">\n        </ion-textarea>\n        <ion-button \n          *ngIf=\"stage==2 && [null,''].includes(formGroup.get('poll_desc').value)\" \n          tabindex=\"-1\" color=\"primary\" slot=\"end\" class=\"skip-button\" \n          [innerHtml]=\"'skip'|translate\">\n        </ion-button><!--FIXME: no functionality?-->\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.poll_desc\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('poll_desc').hasError(validation.type) \n                      && (formGroup.get('poll_desc').dirty || formGroup.get('poll_desc').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>    \n\n    <!-- Poll URL: -->\n    <ng-container *ngIf=\"stage>2 && show_details\">\n      <ion-item [color]=\"stage==3?'warning':''\"><!--stage 3-->\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [class]=\"stage==3?'current-field':''\" \n            [innerHtml]=\"'draftpoll.url-label'|translate\">\n          </span>\n        </ion-label>\n        <ion-input \n          id=\"input_poll_url\"\n          formControlName=\"poll_url\"\n          [placeholder]=\"'draftpoll.url-placeholder'|translate\"\n          tabindex=\"0\" type=\"text\" inputmode=\"url\" [maxlength]=\"E.max_len.url\"\n          style=\"font-size:smaller;word-wrap:normal;\"\n          (ionChange)=\"set_poll_url()\" debounce=\"100\"\n          (keydown)=\"poll_url_onKeydown($event)\"\n          (ionBlur)=\"blur_poll_url()\">\n        </ion-input>\n        <ion-button \n          *ngIf=\"stage==3 && [null,''].includes(formGroup.get('poll_url').value)\" \n          tabindex=\"-1\" color=\"primary\" slot=\"end\" class=\"skip-button\"\n          [innerHtml]=\"'skip'|translate\">\n        </ion-button>\n        <ion-button \n            *ngIf=\"formGroup.get('poll_url').valid && ![null,''].includes(formGroup.get('poll_url').value)\" \n            tabindex=\"-1\" fill=\"clear\" slot=\"end\" class=\"skip-button\" \n            (click)=\"G.open_url_in_new_tab(formGroup.get('poll_url').value)\">\n          <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\n          <ion-icon name=\"open-outline\"></ion-icon>\n        </ion-button>\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.poll_url\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('poll_url').hasError(validation.type) \n                      && (formGroup.get('poll_url').dirty || formGroup.get('poll_url').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>    \n\n    <!-- Due type: -->\n    <ng-container *ngIf=\"stage>3\">\n      <ion-item [color]=\"stage==4?'warning':''\"><!--stage 4-->\n        <ion-label color=\"primary\" position=\"floating\">\n          <span [class]=\"stage==4?'current-field':''\" \n            [innerHtml]=\"'draftpoll.due-type-label'|translate\">\n          </span>\n        </ion-label>\n        <ion-select\n            id=\"due_select\" #due_select\n            formControlName=\"poll_due_type\" \n            [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n            #ionSelects tabindex=\"0\" required \n            (ionChange)=\"set_poll_due_type();changed_due_type()\">\n          <ion-select-option value=\"custom\" [innerHtml]=\"'draftpoll.due-type-custom'|translate\"></ion-select-option>\n          <ion-select-option value=\"10min\" [innerHtml]=\"'draftpoll.due-type-10min'|translate\"></ion-select-option>\n          <ion-select-option value=\"hour\" [innerHtml]=\"'draftpoll.due-type-hour'|translate\"></ion-select-option>\n          <ion-select-option value=\"24hr\" [innerHtml]=\"'draftpoll.due-type-24hr'|translate\"></ion-select-option>\n          <ion-select-option value=\"midnight\" [innerHtml]=\"'draftpoll.due-type-midnight'|translate\"></ion-select-option>\n          <ion-select-option value=\"tomorrow-noon\" [innerHtml]=\"'draftpoll.due-type-tomorrow-noon'|translate\"></ion-select-option>\n          <ion-select-option value=\"tomorrow-night\" [innerHtml]=\"'draftpoll.due-type-tomorrow-night'|translate\"></ion-select-option>\n          <ion-select-option value=\"friday-noon\" [innerHtml]=\"'draftpoll.due-type-friday-noon'|translate\"></ion-select-option>\n          <ion-select-option value=\"sunday-night\" [innerHtml]=\"'draftpoll.due-type-sunday-night'|translate\"></ion-select-option>\n          <ion-select-option value=\"week\" [innerHtml]=\"'draftpoll.due-type-week'|translate\"></ion-select-option>\n          <ion-select-option value=\"two-weeks\" [innerHtml]=\"'draftpoll.due-type-two-weeks'|translate\"></ion-select-option>\n          <ion-select-option value=\"four-weeks\" [innerHtml]=\"'draftpoll.due-type-four-weeks'|translate\"></ion-select-option>\n        </ion-select>\n      </ion-item>\n\n      <!-- Custom due date: -->\n      <ng-container *ngIf=\"formGroup.get('poll_due_type').value=='custom'\">\n        <ion-item [color]=\"stage==5?'warning':''\"><!--stage 5-->\n          <ion-label color=\"primary\">\n            <span [class]=\"stage==5?'current-field':''\" \n              [innerHtml]=\"'draftpoll.due-datetime-label'|translate\">\n            </span>\n          </ion-label>\n          <ion-datetime-button datetime=\"poll_due_custom\"></ion-datetime-button>\n          <ion-modal [keepContentsMounted]=\"true\">\n            <ng-template>\n              <ion-datetime \n                id=\"poll_due_custom\"\n                tabindex=\"0\"\n                formControlName=\"poll_due_custom\" \n                [min]=\"G.P.ref_date.toISOString()\"\n                [max]=\"get_max_due().toISOString()\"\n                (ionClick)=\"G.P.update_ref_date();\"\n                (ionChange)=\"set_poll_due_custom();changed_poll_due_custom()\"\n                [cancelText]=\"'cancel'|translate\"\n                [doneText]=\"'OK'|translate\"\n                [locale]=\"G.S.language\"\n                [firstDayOfWeek]=\"'-parameters.first-day-of-week'|translate\"\n                >\n              </ion-datetime>\n            </ng-template>\n          </ion-modal>\n        </ion-item>\n        <div class=\"validation-errors\">\n          <ng-container *ngFor=\"let validation of validation_messages.poll_due_custom\">\n            <div class=\"error-message\" \n                *ngIf=\"(!formGroup.get('poll_due_custom').valid) \n                        && (formGroup.get('poll_due_custom').dirty || formGroup.get('poll_due_custom').touched)\"\n                [innerHtml]=\"validation.message|translate\">\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </ng-container>    \n\n    <!-- ADVANCED SETTINGS: -->\n\n    <ion-item *ngIf=\"stage>5\" [color]=\"advanced_expanded?'light':''\" (click)=\"advanced_expanded=!advanced_expanded\">\n      <ion-icon \n        [name]=\"advanced_expanded?'caret-down-outline':'caret-forward-outline'\" \n        size=\"small\" color=\"primary\">\n      </ion-icon>\n      <ion-label>\n        <small [innerHtml]=\"'&nbsp;&nbsp;&nbsp'+('draftpoll.advanced-settings'|translate)\"></small>\n      </ion-label>\n    </ion-item>\n\n    <!-- Language: -->\n    <ion-item [style.display]=\"(stage>5) && advanced_expanded?'block':'none'\">\n      <ion-label position=\"floating\" color=\"primary\">\n        <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\n        <span [innerHtml]=\"'draftpoll.language'|translate\"></span>\n      </ion-label>\n      <ion-select #ionSelects formControlName=\"poll_language\" (ionChange)=\"set_poll_language()\"\n        [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n        style=\"font-size: smaller\">\n        <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <!-- Server: -->\n    <app-select-server #select_server\n      *ngIf=\"E.data_service.allow_other_servers\" \n      [page_object]=\"this\" [page]=\"'draftpoll'\"\n      [style.display]=\"(stage>5) && advanced_expanded?'block':'none'\">\n    </app-select-server><!--stage 7-->\n  \n    <!-- OPTIONS: -->\n\n    <ng-container *ngIf=\"stage>5\"><!--stage 6-->\n      <ion-item color=\"primary\">\n        <ion-label [innerHtml]=\"(formGroup.get('poll_type').value=='winner' ? 'options' : 'possible-targets')|translate\"></ion-label>\n      </ion-item>\n\n      <!-- LOOP OVER OPTIONS: -->\n\n      <div *ngFor=\"let item of [].constructor(n_options); let i = index\">\n\n        <!-- Option name: -->\n        <ion-item [color]=\"(i == n_options-1 && option_stage==0)?'warning':'light'\"><!--option_stage 0-->\n          <ion-button tabindex=\"-1\" \n              *ngIf=\"show_details\" \n              fill=\"clear\" slot=\"start\" class=\"field-expander\"\n              (click)=\"expanded[i]=!expanded[i]\">\n            <ion-icon [name]=\"expanded[i]?'caret-down-outline':'caret-forward-outline'\" slot=\"icon-only\"></ion-icon>\n          </ion-button>\n          <ion-label position=\"floating\" color=\"primary\">\n            <span [class]=\"option_stage==0?'current-field':''\"\n              [innerHtml]=\"\n                (formGroup.get('poll_type').value=='winner' \n                ? 'draftpoll.option-name-label' \n                : 'draftpoll.target-name-label') | translate\">\n            </span>\n          </ion-label>\n          <ion-input \n            [id]=\"'input_option_name'+i\"\n            [formControlName]=\"'option_name'+i\" \n            [placeholder]=\"(formGroup.get('poll_type').value == 'winner' \n                            ? 'draftpoll.option-name-placeholder' \n                            : 'draftpoll.target-name-placeholder') | translate\"\n            type=\"text\" required tabindex=\"0\" [maxlength]=\"E.max_len.name\"\n            style=\"font-weight: bold; font-style: italic;\"\n            (ionChange)=\"set_option_name(i)\" debounce=\"100\"\n            (keydown)=\"option_name_onKeydown($event, i, show_details)\"\n            (ionBlur)=\"blur_option_name(i)\">\n          </ion-input>      \n          <ion-button \n            *ngIf=\"i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')==''\" \n            [innerHtml]=\"'draftpoll.no-more-button'|translate\"\n            color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"0\" \n            (click)=\"no_more()\">\n          </ion-button>\n          <ion-button \n              *ngIf=\"n_options>1 && !(i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')=='')\" \n              fill=\"clear\" color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \n              (click)=\"del_option_dialog(i)\">\n            <ion-icon slot=\"icon-only\" name=\"trash-outline\"></ion-icon>\n          </ion-button>\n        </ion-item>\n        <div class=\"validation-errors\">\n          <ng-container *ngFor=\"let validation of validation_messages.option_name\">\n            <div class=\"error-message\" \n                *ngIf=\"formGroup.get('option_name'+i).hasError(validation.type) \n                        && (formGroup.get('option_name'+i).dirty || formGroup.get('option_name'+i).touched)\"\n                [innerHtml]=\"validation.message|translate\">\n            </div>\n          </ng-container>\n        </div>\n\n        <!-- Option description: -->\n        <ng-container *ngIf=\"option_stage>0 && expanded[i]\">\n          <ion-item [color]=\"i == n_options-1 && option_stage==1?'warning':''\"><!--option_stage 1-->\n            <ion-label position=\"floating\" color=\"primary\">\n              <span [class]=\"option_stage==1?'current-field':''\" \n                [innerHtml]=\"'draftpoll.option-desc-label'|translate\">\n              </span>\n            </ion-label>\n            <ion-textarea \n              [id]=\"'input_option_desc'+i\"\n              [formControlName]=\"'option_desc'+i\" tabindex=\"0\" \n              [placeholder]=\"'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name'+i).value}\"\n              rows=\"1\" auto-grow type=\"text\" [maxlength]=\"E.max_len.desc\"\n              style=\"font-style: italic;\"\n              (ionChange)=\"set_option_desc(i)\" debounce=\"100\"\n              (keydown)=\"option_desc_onKeydown($event, i)\"\n              (ionBlur)=\"blur_option_desc(i)\">\n            </ion-textarea>\n            <ion-button \n              *ngIf=\"option_stage==1 && i == n_options-1 && [null,''].includes(formGroup.get('option_desc'+i).value)\" \n              color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \n              [innerHtml]=\"'skip'|translate\">\n            </ion-button>\n          </ion-item>\n          <div class=\"validation-errors\">\n            <ng-container *ngFor=\"let validation of validation_messages.option_desc\">\n              <div class=\"error-message\" \n                  *ngIf=\"formGroup.get('option_desc'+i).hasError(validation.type) \n                          && (formGroup.get('option_desc'+i).dirty || formGroup.get('option_desc'+i).touched)\"\n                [innerHtml]=\"validation.message|translate\">\n              </div>\n            </ng-container>\n          </div>\n        </ng-container>  \n\n        <!-- Option URL: -->\n        <ng-container *ngIf=\"option_stage>1 && expanded[i]\">\n          <ion-item [color]=\"i == n_options-1 && option_stage==2?'warning':''\"><!--option_stage 2-->\n            <ion-label position=\"floating\" color=\"primary\">\n              <span [class]=\"option_stage==2?'current-field':''\" \n                [innerHtml]=\"'draftpoll.option-url-label'|translate\">\n              </span>\n            </ion-label>\n            <ion-input \n              [id]=\"'input_option_url'+i\"\n              [formControlName]=\"'option_url'+i\" \n              [placeholder]=\"'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name'+i).value}\"\n              type=\"text\" inputmode=\"url\" tabindex=\"0\" [maxlength]=\"E.max_len.url\"\n              style=\"font-size: smaller;\"\n              (ionChange)=\"set_option_url(i)\" debounce=\"100\"\n              (keydown)=\"option_url_onKeydown($event, i)\"\n              (ionBlur)=\"blur_option_url(i)\">\n            </ion-input>\n            <ion-button \n              *ngIf=\"option_stage==2 && i == n_options-1 && [null,''].includes(formGroup.get('option_url'+i).value)\" \n              [innerHtml]=\"'skip'|translate\" tabindex=\"-1\" \n              color=\"primary\" slot=\"end\" class=\"skip-button\">\n            </ion-button>\n            <ion-button \n                *ngIf=\"formGroup.get('option_url'+i).valid && ![null,''].includes(formGroup.get('option_url'+i).value)\" \n                fill=\"clear\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \n                (click)=\"G.open_url_in_new_tab(formGroup.get('option_url'+i).value)\">\n              <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\n              <ion-icon name=\"open-outline\"></ion-icon>\n            </ion-button>\n          </ion-item>\n          <div class=\"validation-errors\">\n            <ng-container *ngFor=\"let validation of validation_messages.option_url\">\n              <div class=\"error-message\" \n                  *ngIf=\"formGroup.get('option_url'+i).hasError(validation.type) \n                          && (formGroup.get('option_url'+i).dirty || formGroup.get('option_url'+i).touched)\"\n                [innerHtml]=\"validation.message|translate\">\n              </div>\n            </ng-container>\n          </div>\n        </ng-container>    \n      </div>\n\n      <!-- (END OF LOOP OVER OPTIONS) -->\n\n      <!-- Add option button: -->\n      <ion-item lines=\"none\" *ngIf=\"option_stage==10 && formGroup.get('option_url'+(n_options-1)).valid\"\n          class=\"ion-no-padding\" style=\"padding-left: 5px; padding-top: 5px;\">\n        <ion-fab-button size=\"small\" (click)=\"new_option()\" fill=\"clear\" color=\"primary\">\n          <ion-icon name=\"add\"></ion-icon>\n        </ion-fab-button>\n        <ion-button tabindex=\"-1\" \n          [innerHtml]=\"(formGroup.get('poll_type').value=='winner' ? 'add-option' : 'add-target')|translate\"\n          class=\"ion-no-padding ion-no-margin\" fill=\"clear\" (click)=\"new_option()\"> \n        </ion-button>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <small [innerHtml]=\"\n          (formGroup.get('poll_type').value == 'winner' \n          ? 'draftpoll.please-list-options-explanation' \n          : 'draftpoll.please-list-targets-explanation') | translate\">\n        </small>\n      </ion-item>\n    </ng-container>\n\n    <!-- FOOTER: -->\n\n    <ion-item \n        *ngIf=\"formGroup.get('poll_title').valid\" \n        lines=\"none\" class=\"ion-text-end\" text-wrap>\n      <ion-label style=\"line-height:1.0;\">\n        <small [innerHtml]=\"'('+('draftpoll.draft-saved'|translate)+')'\"></small>\n      </ion-label>\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"n_options<2 || !formGroup.valid\" \n          shape=\"round\" tabindex=\"0\" \n          (click)=\"ready_button_clicked()\">\n        <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n        <span [innerHtml]=\"'ready'|translate\"></span>\n      </ion-button>\n    </ion-item>\n\n  </form>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_draftpoll_draftpoll_module_ts.js.map