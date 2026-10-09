import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  format_details,
  init_simple_format
} from "./chunk-HQCDYSGJ.js";
import {
  RouterTestingModule,
  init_http_testing,
  init_testing,
  provideHttpClientTesting
} from "./chunk-IGR47T2Z.js";
import {
  IonicModule,
  init_http,
  init_lazy,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from "./chunk-BLEMCJOU.js";
import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-MMJERPYN.js";
import {
  TranslatePipe,
  init_ngx_translate_core,
  provideTranslateService
} from "./chunk-DRVLPRFI.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/testing/vodle-testing.ts
function silent_logger() {
  const noop = () => {
  };
  return { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
}
function global_service_stub() {
  const stub = {
    L: silent_logger(),
    show_spinner: false,
    open_url_in_new_tab: () => {
    },
    format_details,
    map2str: (map) => "" + map,
    go_home: () => {
    },
    go_fullscreen_on_mobile: () => {
    },
    // the handover of a deployment (environment.handover): none by default
    successor_url: "",
    predecessor_url: "",
    show_successor_notice: () => __async(null, null, function* () {
      return false;
    }),
    S: {
      language: "en",
      email: "",
      password: "",
      use_guest: false,
      consent: false,
      // form validator referenced by the login and settings password groups:
      passwords_match: () => null,
      language_names: { en: "English", de: "Deutsch" },
      validation_messages: {
        email: [
          { type: "required", message: "validation.email-required" },
          { type: "email", message: "validation.email-valid" }
        ],
        password: [
          { type: "required", message: "validation.password-required" },
          { type: "minlength", message: "validation.password-length" },
          { type: "pattern", message: "validation.password-pattern" }
        ],
        passwords_match: [
          { message: "validation.passwords-match" }
        ]
      }
    },
    D: {
      ready: false,
      replication_is_stalled: false,
      sync_pending: false,
      sync_is_stalled: false,
      save_state: () => {
      },
      fix_url: (url) => url,
      format_date: () => "",
      getu: () => "",
      getp: () => "",
      getv: () => "",
      email_is_valid: () => false,
      pid_is_draft: () => false,
      // the join page asks for a guest when it has been waiting (#193, #327)
      ensure_guest_for_magic_link: () => {
      }
    },
    P: {
      polls: {},
      ref_date: /* @__PURE__ */ new Date(),
      running_polls: [],
      draft_polls: [],
      closed_polls: [],
      update_ref_date: () => {
      }
    },
    N: {
      dismiss: () => {
      },
      unseen: () => [],
      filter: () => []
    },
    Del: {}
  };
  return stub;
}
function vodle_page_test_providers() {
  return [
    { provide: GlobalService, useValue: global_service_stub() },
    provideTranslateService(),
    // HttpClientTestingModule is deprecated as of Angular 18; these are its
    // replacement, and being providers they cannot live in the imports above
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideHttpClientTesting()
  ];
}
var VODLE_PAGE_TEST_IMPORTS;
var init_vodle_testing = __esm({
  "src/app/testing/vodle-testing.ts"() {
    init_lazy();
    init_testing();
    init_http_testing();
    init_http();
    init_ngx_translate_core();
    init_forms();
    init_global_service();
    init_simple_format();
    VODLE_PAGE_TEST_IMPORTS = [
      IonicModule.forRoot(),
      RouterTestingModule,
      TranslatePipe,
      FormsModule,
      ReactiveFormsModule
    ];
  }
});

export {
  silent_logger,
  VODLE_PAGE_TEST_IMPORTS,
  vodle_page_test_providers,
  init_vodle_testing
};
//# debugId=aae15a21-946f-5757-82ca-42ffac9fdab9
//# sourceMappingURL=chunk-37Y4QSVM.js.map
