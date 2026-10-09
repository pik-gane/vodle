import {
  init_index_DIouXecD
} from "./chunk-JYODAN7K.js";
import {
  init_cubic_bezier_hHmYLOfE
} from "./chunk-HMW3MSDJ.js";
import {
  init_ios_transition_B8netzsb
} from "./chunk-BPYMCMCI.js";
import {
  init_md_transition_DNCSSiXk
} from "./chunk-DL2EKLCJ.js";
import {
  init_index_BBASprVu
} from "./chunk-GMOSWYPY.js";
import {
  init_config_DWCzVL3Y,
  setupConfig
} from "./chunk-QLB7V5XI.js";
import {
  init_index_CK8uF0iB
} from "./chunk-CPN2CPEA.js";
import {
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  init_index_BmLuEdV7
} from "./chunk-OTRSMIBG.js";
import {
  alertController,
  init_overlays_DmDY_El7,
  loadingController,
  modalController,
  popoverController
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  init_theme_byZM6qHV
} from "./chunk-VEPFSKM7.js";
import {
  init_ionic_global_Cep6oYzK,
  initialize
} from "./chunk-URXKFSPR.js";
import {
  bootstrapLazy,
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  CSS_VAR_NAMESPACE,
  init_dom_renderer_chunk
} from "./chunk-DPMEUTWH.js";
import {
  c,
  e,
  init_p_B4IBdPVJ,
  init_p_C7r5Gja6,
  init_p_Ct2aBEue,
  l,
  n,
  r2 as r,
  s,
  t
} from "./chunk-AAKC2XIS.js";
import {
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  init_forms
} from "./chunk-MMJERPYN.js";
import {
  CommonModule,
  HashLocationStrategy,
  LOCATION_INITIALIZED,
  Location,
  LocationStrategy,
  NgIf,
  NgTemplateOutlet,
  PRECOMMIT_HANDLER_SUPPORTED,
  PathLocationStrategy,
  PlatformLocation,
  PlatformNavigation,
  ViewportScroller,
  XhrFactory,
  getDOM,
  init_common,
  init_platform_location_chunk,
  init_xhr_chunk,
  parseCookieValue
} from "./chunk-GZCYQ2RJ.js";
import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  ApplicationRef,
  Attribute,
  CSP_NONCE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Compiler,
  Component,
  Console,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DestroyRef,
  Directive,
  ENVIRONMENT_INITIALIZER,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  FactoryTarget,
  HostAttributeToken,
  HostListener,
  INTERNAL_APPLICATION_ERROR_HANDLER,
  IS_ENABLED_BLOCKING_INITIAL_NAVIGATION,
  IS_HYDRATION_DOM_REUSE_ENABLED,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgModuleFactory$1,
  NgZone,
  Optional,
  Output,
  PendingTasks,
  PendingTasksInternal,
  Renderer2,
  ResourceImpl,
  RuntimeError,
  SecurityContext,
  Service,
  SkipSelf,
  TemplateRef,
  TracingService,
  TransferState,
  ViewChild,
  ViewContainerRef,
  XSS_SECURITY_URL,
  _sanitizeHtml,
  _sanitizeUrl,
  afterNextRender,
  allowSanitizationBypassAndThrow,
  assertInInjectionContext,
  booleanAttribute,
  bypassSanitizationTrustHtml,
  bypassSanitizationTrustResourceUrl,
  bypassSanitizationTrustScript,
  bypassSanitizationTrustStyle,
  bypassSanitizationTrustUrl,
  computed,
  core_exports,
  createComponent,
  createEnvironmentInjector,
  effect,
  encapsulateResourceError,
  formatRuntimeError,
  forwardRef,
  init_core,
  inject,
  input,
  isInjectable,
  isNgModule,
  isPromise,
  isStandalone,
  linkedSignal,
  makeEnvironmentProviders,
  makeStateKey,
  maybeUnwrapDefaultExport,
  performanceMarkFeature,
  promiseWithResolvers,
  provideAppInitializer,
  reflectComponentType,
  resolveComponentResources,
  runInInjectionContext,
  signal,
  truncateMiddle,
  untracked,
  unwrapSafeValue,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule,
  ɵɵngDeclareService
} from "./chunk-SGQRHDJN.js";
import {
  BehaviorSubject,
  EMPTY,
  EmptyError,
  Observable,
  Subject,
  Subscription,
  __decorate,
  catchError,
  combineLatest,
  concat,
  concatMap,
  defer,
  distinctUntilChanged,
  filter,
  finalize,
  first,
  from,
  fromEvent,
  init_esm,
  init_operators,
  init_tslib_es6,
  isObservable,
  map,
  mergeAll,
  mergeMap,
  of,
  pipe,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  throwError
} from "./chunk-CGNCHVYB.js";
import {
  __async,
  __esm,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@angular/common/fesm2022/_module-chunk.mjs
function assertValidHeaders(headers) {
  for (const [key, value] of Object.entries(headers)) {
    if (!(typeof value === "string" || typeof value === "number") && !Array.isArray(value)) {
      throw new Error(`Unexpected value of the \`${key}\` header provided. Expecting either a string, a number or an array, but got: \`${value}\`.`);
    }
  }
}
function paramParser(rawParams, codec) {
  const map2 = /* @__PURE__ */ new Map();
  if (rawParams.length > 0) {
    const params = rawParams.replace(/^\?/, "").split("&");
    params.forEach((param) => {
      const eqIdx = param.indexOf("=");
      const [key, val] = eqIdx == -1 ? [codec.decodeKey(param), ""] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))];
      const list = map2.get(key) || [];
      list.push(val);
      map2.set(key, list);
    });
  }
  return map2;
}
function standardEncoding(v) {
  return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s3, t2) => STANDARD_ENCODING_REPLACEMENTS[t2] ?? s3);
}
function valueToString(value) {
  return `${value}`;
}
function mightHaveBody(method) {
  switch (method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return false;
    default:
      return true;
  }
}
function isArrayBuffer(value) {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}
function isBlob(value) {
  return typeof Blob !== "undefined" && value instanceof Blob;
}
function isFormData(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}
function isUrlSearchParams(value) {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}
function noop() {
}
function warningOptionsMessage(req) {
  if (req.credentials && req.withCredentials) {
    console.warn(formatRuntimeError(2819, `Angular detected that a \`HttpClient\` request has both \`withCredentials: true\` and \`credentials: '${req.credentials}'\` options. The \`withCredentials\` option is overriding the explicit \`credentials\` setting to 'include'. Consider removing \`withCredentials\` and using \`credentials: '${req.credentials}'\` directly for clarity.`));
  }
}
function silenceSuperfluousUnhandledPromiseRejection(promise) {
  promise.then(noop, noop);
}
function throwBodyTooLargeError(maxResponseSize) {
  throw new RuntimeError(-2825, ngDevMode && `Fetch response body exceeded the configured buffer limit (${maxResponseSize} bytes).`);
}
function getTextDecoder(contentType) {
  const match2 = contentType.match(CHARSET_REGEX);
  if (match2 !== null) {
    try {
      return new TextDecoder(match2[1]);
    } catch (e2) {
    }
  }
  return new TextDecoder();
}
function xsrfInterceptorFn(req, next) {
  if (!inject(XSRF_ENABLED) || req.method === "GET" || req.method === "HEAD") {
    return next(req);
  }
  try {
    const locationHref = inject(PlatformLocation).href;
    const {
      origin: locationOrigin
    } = new URL(locationHref);
    const {
      origin: requestOrigin
    } = new URL(req.url, locationOrigin);
    if (locationOrigin !== requestOrigin) {
      return next(req);
    }
  } catch (e2) {
    return next(req);
  }
  const token = inject(HttpXsrfTokenExtractor).getToken();
  const headerName = inject(XSRF_HEADER_NAME);
  if (token != null && !req.headers.has(headerName)) {
    req = req.clone({
      headers: req.headers.set(headerName, token)
    });
  }
  return next(req);
}
function interceptorChainEndFn(req, finalHandlerFn) {
  return finalHandlerFn(req);
}
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
  return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, {
    handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)
  });
}
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
  return (initialRequest, finalHandlerFn) => runInInjectionContext(injector, () => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
function legacyInterceptorFnFactory() {
  let chain = null;
  return (req, handler) => {
    if (chain === null) {
      const interceptors = inject(HTTP_INTERCEPTORS, {
        optional: true
      }) ?? [];
      chain = interceptors.reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
    }
    const pendingTasks = inject(PendingTasks);
    const contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
    if (contributeToStability) {
      const removeTask = pendingTasks.add();
      return chain(req, handler).pipe(finalize(removeTask));
    } else {
      return chain(req, handler);
    }
  };
}
function addBody(options, body) {
  return __spreadValues({
    body
  }, options);
}
function jsonpCallbackContext() {
  if (typeof window === "object") {
    return window;
  }
  return {};
}
function jsonpInterceptorFn(req, next) {
  if (req.method === "JSONP") {
    return inject(JsonpClientBackend).handle(req);
  }
  return next(req);
}
function validateXhrCompatibility(req) {
  const unsupportedOptions = [{
    property: "keepalive",
    errorCode: 2813
  }, {
    property: "cache",
    errorCode: 2814
  }, {
    property: "priority",
    errorCode: 2815
  }, {
    property: "mode",
    errorCode: 2816
  }, {
    property: "redirect",
    errorCode: 2817
  }, {
    property: "credentials",
    errorCode: 2818
  }, {
    property: "integrity",
    errorCode: 2820
  }, {
    property: "referrer",
    errorCode: 2821
  }, {
    property: "referrerPolicy",
    errorCode: 2823
  }];
  for (const {
    property,
    errorCode
  } of unsupportedOptions) {
    if (req[property]) {
      console.warn(formatRuntimeError(errorCode, `Angular detected that a \`HttpClient\` request with the \`${property}\` option was sent using XHR, which does not support it. To use the \`${property}\` option, use the Fetch API by removing \`withXhr()\` from the \`provideHttpClient()\` call.`));
    }
  }
}
function makeHttpFeature(kind, providers) {
  return {
    \u0275kind: kind,
    \u0275providers: providers
  };
}
function provideHttpClient(...features) {
  if (ngDevMode) {
    const featureKinds = new Set(features.map((f2) => f2.\u0275kind));
    if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) && featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) {
      throw new Error(`Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.`);
    }
    const hasBackendOverride = featureKinds.has(HttpFeatureKind.Fetch) || featureKinds.has(HttpFeatureKind.Xhr);
    if (featureKinds.has(HttpFeatureKind.RequestsMadeViaParent) && hasBackendOverride) {
      throw new Error(`Configuration error: withRequestsMadeViaParent() cannot be combined with withFetch() or withXhr() in the same call to provideHttpClient().`);
    }
  }
  const providers = [HttpClient, FetchBackend, HttpInterceptorHandler, {
    provide: HttpHandler,
    useExisting: HttpInterceptorHandler
  }, {
    provide: HttpBackend,
    useFactory: () => {
      return inject(FetchBackend);
    }
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useValue: xsrfInterceptorFn,
    multi: true
  }];
  for (const feature of features) {
    providers.push(...feature.\u0275providers);
  }
  return makeEnvironmentProviders(providers);
}
function withInterceptorsFromDi() {
  return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [{
    provide: LEGACY_INTERCEPTOR_FN,
    useFactory: legacyInterceptorFnFactory
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useExisting: LEGACY_INTERCEPTOR_FN,
    multi: true
  }]);
}
function withXsrfConfiguration({
  cookieName,
  headerName
}) {
  const providers = [];
  if (cookieName !== void 0) {
    providers.push({
      provide: XSRF_COOKIE_NAME,
      useValue: cookieName
    });
  }
  if (headerName !== void 0) {
    providers.push({
      provide: XSRF_HEADER_NAME,
      useValue: headerName
    });
  }
  return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
function withNoXsrfProtection() {
  return makeHttpFeature(HttpFeatureKind.NoXsrfProtection, [{
    provide: XSRF_ENABLED,
    useValue: false
  }]);
}
function withJsonpSupport() {
  return makeHttpFeature(HttpFeatureKind.JsonpSupport, [JsonpClientBackend, {
    provide: JsonpCallbackContext,
    useFactory: jsonpCallbackContext
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useValue: jsonpInterceptorFn,
    multi: true
  }]);
}
function withXhr() {
  return makeHttpFeature(HttpFeatureKind.Xhr, [HttpXhrBackend, {
    provide: HttpBackend,
    useExisting: HttpXhrBackend
  }]);
}
var HttpHeaders, HttpContext, HttpUrlEncodingCodec, STANDARD_ENCODING_REGEX, STANDARD_ENCODING_REPLACEMENTS, HttpParams, CONTENT_TYPE_HEADER, ACCEPT_HEADER, TEXT_CONTENT_TYPE, JSON_CONTENT_TYPE, ACCEPT_HEADER_VALUE, HttpRequest, HttpEventType, HttpResponseBase, HttpHeaderResponse, HttpResponse, HttpErrorResponse, HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HttpStatusCode, XSSI_PREFIX$1, DEFAULT_SSR_MAX_RESPONSE_BODY_SIZE, HTTP_FETCH_MAX_RESPONSE_SIZE, FetchBackend, FetchFactory, CHARSET_REGEX, XSRF_ENABLED, XSRF_DEFAULT_COOKIE_NAME, XSRF_COOKIE_NAME, XSRF_DEFAULT_HEADER_NAME, XSRF_HEADER_NAME, HttpXsrfCookieExtractor, HttpXsrfTokenExtractor, HttpXsrfInterceptor, HTTP_INTERCEPTORS, HTTP_INTERCEPTOR_FNS, HTTP_ROOT_INTERCEPTOR_FNS, REQUESTS_CONTRIBUTE_TO_STABILITY, HttpBackend, fetchBackendWarningDisplayed, HttpInterceptorHandler, HttpHandler, HttpClient, nextRequestId, foreignDocument, JSONP_ERR_NO_CALLBACK, JSONP_ERR_WRONG_METHOD, JSONP_ERR_WRONG_RESPONSE_TYPE, JSONP_ERR_HEADERS_NOT_SUPPORTED, JSONP_ERR_UNSAFE_URL, JsonpCallbackContext, JsonpClientBackend, JsonpInterceptor, XSSI_PREFIX, HttpXhrBackend, HttpFeatureKind, LEGACY_INTERCEPTOR_FN, HttpClientXsrfModule, HttpClientModule, HttpClientJsonpModule;
var init_module_chunk = __esm({
  "node_modules/@angular/common/fesm2022/_module-chunk.mjs"() {
    init_core();
    init_core();
    init_operators();
    init_xhr_chunk();
    init_platform_location_chunk();
    init_esm();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    HttpHeaders = class _HttpHeaders {
      headers;
      normalizedNames = /* @__PURE__ */ new Map();
      lazyInit;
      lazyUpdate = null;
      constructor(headers) {
        if (!headers) {
          this.headers = /* @__PURE__ */ new Map();
        } else if (typeof headers === "string") {
          this.lazyInit = () => {
            this.headers = /* @__PURE__ */ new Map();
            headers.split("\n").forEach((line) => {
              const index = line.indexOf(":");
              if (index > 0) {
                const name = line.slice(0, index);
                const value = line.slice(index + 1).trim();
                this.addHeaderEntry(name, value);
              }
            });
          };
        } else if (typeof Headers !== "undefined" && headers instanceof Headers) {
          this.headers = /* @__PURE__ */ new Map();
          headers.forEach((value, name) => {
            this.addHeaderEntry(name, value);
          });
        } else {
          this.lazyInit = () => {
            if (typeof ngDevMode === "undefined" || ngDevMode) {
              assertValidHeaders(headers);
            }
            this.headers = /* @__PURE__ */ new Map();
            Object.entries(headers).forEach(([name, values]) => {
              this.setHeaderEntries(name, values);
            });
          };
        }
      }
      has(name) {
        this.init();
        return this.headers.has(name.toLowerCase());
      }
      get(name) {
        this.init();
        const values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
      }
      keys() {
        this.init();
        return Array.from(this.normalizedNames.values());
      }
      getAll(name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
      }
      append(name, value) {
        return this.clone({
          name,
          value,
          op: "a"
        });
      }
      set(name, value) {
        return this.clone({
          name,
          value,
          op: "s"
        });
      }
      delete(name, value) {
        return this.clone({
          name,
          value,
          op: "d"
        });
      }
      maybeSetNormalizedName(name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
          this.normalizedNames.set(lcName, name);
        }
      }
      init() {
        if (!!this.lazyInit) {
          if (this.lazyInit instanceof _HttpHeaders) {
            this.copyFrom(this.lazyInit);
          } else {
            this.lazyInit();
          }
          this.lazyInit = null;
          if (!!this.lazyUpdate) {
            this.lazyUpdate.forEach((update) => this.applyUpdate(update));
            this.lazyUpdate = null;
          }
        }
      }
      copyFrom(other) {
        other.init();
        for (const [key, values] of other.headers.entries()) {
          this.headers.set(key, values);
          this.normalizedNames.set(key, other.normalizedNames.get(key));
        }
      }
      clone(update) {
        const clone = new _HttpHeaders();
        clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof _HttpHeaders ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
      }
      applyUpdate(update) {
        const key = update.name.toLowerCase();
        switch (update.op) {
          case "a":
          case "s":
            let value = update.value;
            if (typeof value === "string") {
              value = [value];
            }
            if (value.length === 0) {
              return;
            }
            this.maybeSetNormalizedName(update.name, key);
            const base = update.op === "a" ? (this.headers.get(key) || []).slice() : [];
            base.push(...value);
            this.headers.set(key, base);
            break;
          case "d":
            const toDelete = update.value;
            if (toDelete === void 0) {
              this.headers.delete(key);
              this.normalizedNames.delete(key);
            } else {
              const valuesToDelete = Array.isArray(toDelete) ? toDelete : [toDelete];
              let existing = this.headers.get(key);
              if (!existing) {
                return;
              }
              existing = existing.filter((value2) => valuesToDelete.indexOf(value2) === -1);
              if (existing.length === 0) {
                this.headers.delete(key);
                this.normalizedNames.delete(key);
              } else {
                this.headers.set(key, existing);
              }
            }
            break;
        }
      }
      addHeaderEntry(name, value) {
        const key = name.toLowerCase();
        this.maybeSetNormalizedName(name, key);
        if (this.headers.has(key)) {
          this.headers.get(key).push(value);
        } else {
          this.headers.set(key, [value]);
        }
      }
      setHeaderEntries(name, values) {
        const headerValues = (Array.isArray(values) ? values : [values]).map((value) => value.toString());
        const key = name.toLowerCase();
        this.headers.set(key, headerValues);
        this.maybeSetNormalizedName(name, key);
      }
      forEach(fn) {
        this.init();
        Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
      }
    };
    HttpContext = class {
      map = /* @__PURE__ */ new Map();
      set(token, value) {
        this.map.set(token, value);
        return this;
      }
      get(token) {
        if (!this.map.has(token)) {
          this.map.set(token, token.defaultValue());
        }
        return this.map.get(token);
      }
      delete(token) {
        this.map.delete(token);
        return this;
      }
      has(token) {
        return this.map.has(token);
      }
      keys() {
        return this.map.keys();
      }
    };
    HttpUrlEncodingCodec = class {
      encodeKey(key) {
        return standardEncoding(key);
      }
      encodeValue(value) {
        return standardEncoding(value);
      }
      decodeKey(key) {
        return decodeURIComponent(key);
      }
      decodeValue(value) {
        return decodeURIComponent(value);
      }
    };
    STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
    STANDARD_ENCODING_REPLACEMENTS = {
      "40": "@",
      "3A": ":",
      "24": "$",
      "2C": ",",
      "3B": ";",
      "3D": "=",
      "3F": "?",
      "2F": "/"
    };
    HttpParams = class _HttpParams {
      map;
      encoder;
      updates = null;
      cloneFrom = null;
      constructor(options = {}) {
        this.encoder = options.encoder || new HttpUrlEncodingCodec();
        if (options.fromString) {
          if (options.fromObject) {
            throw new RuntimeError(2805, ngDevMode && "Cannot specify both fromString and fromObject.");
          }
          this.map = paramParser(options.fromString, this.encoder);
        } else if (!!options.fromObject) {
          this.map = /* @__PURE__ */ new Map();
          Object.keys(options.fromObject).forEach((key) => {
            const value = options.fromObject[key];
            const values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];
            this.map.set(key, values);
          });
        } else {
          this.map = null;
        }
      }
      has(param) {
        this.init();
        return this.map.has(param);
      }
      get(param) {
        this.init();
        const res = this.map.get(param);
        return !!res ? res[0] : null;
      }
      getAll(param) {
        this.init();
        return this.map.get(param) || null;
      }
      keys() {
        this.init();
        return Array.from(this.map.keys());
      }
      append(param, value) {
        return this.clone({
          param,
          value,
          op: "a"
        });
      }
      appendAll(params) {
        const updates = [];
        Object.keys(params).forEach((param) => {
          const value = params[param];
          if (Array.isArray(value)) {
            value.forEach((_value) => {
              updates.push({
                param,
                value: _value,
                op: "a"
              });
            });
          } else {
            updates.push({
              param,
              value,
              op: "a"
            });
          }
        });
        return this.clone(updates);
      }
      set(param, value) {
        return this.clone({
          param,
          value,
          op: "s"
        });
      }
      delete(param, value) {
        return this.clone({
          param,
          value,
          op: "d"
        });
      }
      toString() {
        this.init();
        return this.keys().map((key) => {
          const eKey = this.encoder.encodeKey(key);
          return this.map.get(key).map((value) => eKey + "=" + this.encoder.encodeValue(value)).join("&");
        }).filter((param) => param !== "").join("&");
      }
      clone(update) {
        const clone = new _HttpParams({
          encoder: this.encoder
        });
        clone.cloneFrom = this.cloneFrom || this;
        clone.updates = (this.updates || []).concat(update);
        return clone;
      }
      init() {
        if (this.map === null) {
          this.map = /* @__PURE__ */ new Map();
        }
        if (this.cloneFrom !== null) {
          this.cloneFrom.init();
          for (const [key, values] of this.cloneFrom.map.entries()) {
            this.map.set(key, values);
          }
          this.updates.forEach((update) => {
            switch (update.op) {
              case "a":
              case "s":
                const base = update.op === "a" ? (this.map.get(update.param) || []).slice() : [];
                base.push(valueToString(update.value));
                this.map.set(update.param, base);
                break;
              case "d":
                if (update.value !== void 0) {
                  const base2 = (this.map.get(update.param) || []).slice();
                  const idx = base2.indexOf(valueToString(update.value));
                  if (idx !== -1) {
                    base2.splice(idx, 1);
                  }
                  if (base2.length > 0) {
                    this.map.set(update.param, base2);
                  } else {
                    this.map.delete(update.param);
                  }
                } else {
                  this.map.delete(update.param);
                  break;
                }
            }
          });
          this.cloneFrom = this.updates = null;
        }
      }
    };
    CONTENT_TYPE_HEADER = "Content-Type";
    ACCEPT_HEADER = "Accept";
    TEXT_CONTENT_TYPE = "text/plain";
    JSON_CONTENT_TYPE = "application/json";
    ACCEPT_HEADER_VALUE = `${JSON_CONTENT_TYPE}, ${TEXT_CONTENT_TYPE}, */*`;
    HttpRequest = class _HttpRequest {
      url;
      body = null;
      headers;
      context;
      reportProgress = false;
      reportUploadProgress = false;
      reportDownloadProgress = false;
      withCredentials = false;
      credentials;
      keepalive = false;
      cache;
      priority;
      mode;
      redirect;
      referrer;
      integrity;
      referrerPolicy;
      responseType = "json";
      method;
      params;
      urlWithParams;
      transferCache;
      timeout;
      constructor(method, url, third, fourth) {
        this.url = url;
        this.method = method.toUpperCase();
        let options;
        if (mightHaveBody(this.method) || !!fourth) {
          this.body = third !== void 0 ? third : null;
          options = fourth;
        } else {
          options = third;
        }
        if (options) {
          this.reportProgress = !!options.reportProgress;
          this.reportUploadProgress = !!options.reportUploadProgress;
          this.reportDownloadProgress = !!options.reportDownloadProgress;
          this.withCredentials = !!options.withCredentials;
          this.keepalive = !!options.keepalive;
          if (!!options.responseType) {
            this.responseType = options.responseType;
          }
          if (options.headers) {
            this.headers = options.headers;
          }
          if (options.context) {
            this.context = options.context;
          }
          if (options.params) {
            this.params = options.params;
          }
          if (options.priority) {
            this.priority = options.priority;
          }
          if (options.cache) {
            this.cache = options.cache;
          }
          if (options.credentials) {
            this.credentials = options.credentials;
          }
          if (typeof options.timeout === "number") {
            if (options.timeout < 1 || !Number.isInteger(options.timeout)) {
              throw new RuntimeError(2822, ngDevMode ? "`timeout` must be a positive integer value" : "");
            }
            this.timeout = options.timeout;
          }
          if (options.mode) {
            this.mode = options.mode;
          }
          if (options.redirect) {
            this.redirect = options.redirect;
          }
          if (options.integrity) {
            this.integrity = options.integrity;
          }
          if (options.referrer !== void 0) {
            this.referrer = options.referrer;
          }
          if (options.referrerPolicy) {
            this.referrerPolicy = options.referrerPolicy;
          }
          this.transferCache = options.transferCache;
        }
        this.headers ??= new HttpHeaders();
        this.context ??= new HttpContext();
        if (!this.params) {
          this.params = new HttpParams();
          this.urlWithParams = url;
        } else {
          const params = this.params.toString();
          if (params.length === 0) {
            this.urlWithParams = url;
          } else {
            let urlWithoutFragment = url;
            let fragment = "";
            const hashIdx = url.indexOf("#");
            if (hashIdx !== -1) {
              fragment = url.substring(hashIdx);
              urlWithoutFragment = url.substring(0, hashIdx);
            }
            const qIdx = urlWithoutFragment.indexOf("?");
            const sep = qIdx === -1 ? "?" : qIdx < urlWithoutFragment.length - 1 ? "&" : "";
            this.urlWithParams = urlWithoutFragment + sep + params + fragment;
          }
        }
      }
      serializeBody() {
        if (this.body === null) {
          return null;
        }
        if (typeof this.body === "string" || isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || isUrlSearchParams(this.body)) {
          return this.body;
        }
        if (this.body instanceof HttpParams) {
          return this.body.toString();
        }
        if (typeof this.body === "object" || typeof this.body === "boolean" || Array.isArray(this.body)) {
          return JSON.stringify(this.body);
        }
        return this.body.toString();
      }
      detectContentTypeHeader() {
        if (this.body === null) {
          return null;
        }
        if (isFormData(this.body)) {
          return null;
        }
        if (isBlob(this.body)) {
          return this.body.type || null;
        }
        if (isArrayBuffer(this.body)) {
          return null;
        }
        if (typeof this.body === "string") {
          return TEXT_CONTENT_TYPE;
        }
        if (this.body instanceof HttpParams) {
          return "application/x-www-form-urlencoded;charset=UTF-8";
        }
        if (typeof this.body === "object" || typeof this.body === "number" || typeof this.body === "boolean") {
          return JSON_CONTENT_TYPE;
        }
        return null;
      }
      clone(update = {}) {
        const method = update.method || this.method;
        const url = update.url || this.url;
        const responseType = update.responseType || this.responseType;
        const keepalive = update.keepalive ?? this.keepalive;
        const priority = update.priority || this.priority;
        const cache = update.cache || this.cache;
        const mode = update.mode || this.mode;
        const redirect = update.redirect || this.redirect;
        const credentials = update.credentials || this.credentials;
        const referrer = update.referrer ?? this.referrer;
        const integrity = update.integrity || this.integrity;
        const referrerPolicy = update.referrerPolicy || this.referrerPolicy;
        const transferCache = update.transferCache ?? this.transferCache;
        const timeout = update.timeout ?? this.timeout;
        const body = update.body !== void 0 ? update.body : this.body;
        const withCredentials = update.withCredentials ?? this.withCredentials;
        const reportProgress = update.reportProgress ?? this.reportProgress;
        const reportUploadProgress = update.reportUploadProgress ?? this.reportUploadProgress;
        const reportDownloadProgress = update.reportDownloadProgress ?? this.reportDownloadProgress;
        let headers = update.headers || this.headers;
        let params = update.params || this.params;
        const context = update.context ?? this.context;
        if (update.setHeaders !== void 0) {
          headers = Object.keys(update.setHeaders).reduce((headers2, name) => headers2.set(name, update.setHeaders[name]), headers);
        }
        if (update.setParams) {
          params = Object.keys(update.setParams).reduce((params2, param) => params2.set(param, update.setParams[param]), params);
        }
        return new _HttpRequest(method, url, body, {
          params,
          headers,
          context,
          reportProgress,
          reportUploadProgress,
          reportDownloadProgress,
          responseType,
          withCredentials,
          transferCache,
          keepalive,
          cache,
          priority,
          timeout,
          mode,
          redirect,
          credentials,
          referrer,
          integrity,
          referrerPolicy
        });
      }
    };
    (function(HttpEventType2) {
      HttpEventType2[HttpEventType2["Sent"] = 0] = "Sent";
      HttpEventType2[HttpEventType2["UploadProgress"] = 1] = "UploadProgress";
      HttpEventType2[HttpEventType2["ResponseHeader"] = 2] = "ResponseHeader";
      HttpEventType2[HttpEventType2["DownloadProgress"] = 3] = "DownloadProgress";
      HttpEventType2[HttpEventType2["Response"] = 4] = "Response";
      HttpEventType2[HttpEventType2["User"] = 5] = "User";
    })(HttpEventType || (HttpEventType = {}));
    HttpResponseBase = class {
      headers;
      status;
      statusText;
      url;
      ok;
      type;
      redirected;
      responseType;
      constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== void 0 ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        this.redirected = init.redirected;
        this.responseType = init.responseType;
        this.ok = this.status >= 200 && this.status < 300;
      }
    };
    HttpHeaderResponse = class _HttpHeaderResponse extends HttpResponseBase {
      constructor(init = {}) {
        super(init);
      }
      type = HttpEventType.ResponseHeader;
      clone(update = {}) {
        return new _HttpHeaderResponse({
          headers: update.headers || this.headers,
          status: update.status !== void 0 ? update.status : this.status,
          statusText: update.statusText || this.statusText,
          url: update.url || this.url || void 0
        });
      }
    };
    HttpResponse = class _HttpResponse extends HttpResponseBase {
      body;
      constructor(init = {}) {
        super(init);
        this.body = init.body !== void 0 ? init.body : null;
      }
      type = HttpEventType.Response;
      clone(update = {}) {
        return new _HttpResponse({
          body: update.body !== void 0 ? update.body : this.body,
          headers: update.headers || this.headers,
          status: update.status !== void 0 ? update.status : this.status,
          statusText: update.statusText || this.statusText,
          url: update.url || this.url || void 0,
          redirected: update.redirected ?? this.redirected,
          responseType: update.responseType ?? this.responseType
        });
      }
    };
    HttpErrorResponse = class extends HttpResponseBase {
      name = "HttpErrorResponse";
      message;
      error;
      ok = false;
      constructor(init) {
        super(init, 0, "Unknown Error");
        if (this.status >= 200 && this.status < 300) {
          this.message = `Http failure during parsing for ${init.url || "(unknown url)"}`;
        } else {
          this.message = `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`;
        }
        this.error = init.error || null;
      }
    };
    HTTP_STATUS_CODE_OK = 200;
    HTTP_STATUS_CODE_NO_CONTENT = 204;
    (function(HttpStatusCode2) {
      HttpStatusCode2[HttpStatusCode2["Continue"] = 100] = "Continue";
      HttpStatusCode2[HttpStatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
      HttpStatusCode2[HttpStatusCode2["Processing"] = 102] = "Processing";
      HttpStatusCode2[HttpStatusCode2["EarlyHints"] = 103] = "EarlyHints";
      HttpStatusCode2[HttpStatusCode2["Ok"] = 200] = "Ok";
      HttpStatusCode2[HttpStatusCode2["Created"] = 201] = "Created";
      HttpStatusCode2[HttpStatusCode2["Accepted"] = 202] = "Accepted";
      HttpStatusCode2[HttpStatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
      HttpStatusCode2[HttpStatusCode2["NoContent"] = 204] = "NoContent";
      HttpStatusCode2[HttpStatusCode2["ResetContent"] = 205] = "ResetContent";
      HttpStatusCode2[HttpStatusCode2["PartialContent"] = 206] = "PartialContent";
      HttpStatusCode2[HttpStatusCode2["MultiStatus"] = 207] = "MultiStatus";
      HttpStatusCode2[HttpStatusCode2["AlreadyReported"] = 208] = "AlreadyReported";
      HttpStatusCode2[HttpStatusCode2["ImUsed"] = 226] = "ImUsed";
      HttpStatusCode2[HttpStatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpStatusCode2[HttpStatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpStatusCode2[HttpStatusCode2["Found"] = 302] = "Found";
      HttpStatusCode2[HttpStatusCode2["SeeOther"] = 303] = "SeeOther";
      HttpStatusCode2[HttpStatusCode2["NotModified"] = 304] = "NotModified";
      HttpStatusCode2[HttpStatusCode2["UseProxy"] = 305] = "UseProxy";
      HttpStatusCode2[HttpStatusCode2["Unused"] = 306] = "Unused";
      HttpStatusCode2[HttpStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpStatusCode2[HttpStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpStatusCode2[HttpStatusCode2["BadRequest"] = 400] = "BadRequest";
      HttpStatusCode2[HttpStatusCode2["Unauthorized"] = 401] = "Unauthorized";
      HttpStatusCode2[HttpStatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpStatusCode2[HttpStatusCode2["Forbidden"] = 403] = "Forbidden";
      HttpStatusCode2[HttpStatusCode2["NotFound"] = 404] = "NotFound";
      HttpStatusCode2[HttpStatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpStatusCode2[HttpStatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpStatusCode2[HttpStatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpStatusCode2[HttpStatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpStatusCode2[HttpStatusCode2["Conflict"] = 409] = "Conflict";
      HttpStatusCode2[HttpStatusCode2["Gone"] = 410] = "Gone";
      HttpStatusCode2[HttpStatusCode2["LengthRequired"] = 411] = "LengthRequired";
      HttpStatusCode2[HttpStatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
      HttpStatusCode2[HttpStatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
      HttpStatusCode2[HttpStatusCode2["UriTooLong"] = 414] = "UriTooLong";
      HttpStatusCode2[HttpStatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
      HttpStatusCode2[HttpStatusCode2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
      HttpStatusCode2[HttpStatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
      HttpStatusCode2[HttpStatusCode2["ImATeapot"] = 418] = "ImATeapot";
      HttpStatusCode2[HttpStatusCode2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
      HttpStatusCode2[HttpStatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
      HttpStatusCode2[HttpStatusCode2["Locked"] = 423] = "Locked";
      HttpStatusCode2[HttpStatusCode2["FailedDependency"] = 424] = "FailedDependency";
      HttpStatusCode2[HttpStatusCode2["TooEarly"] = 425] = "TooEarly";
      HttpStatusCode2[HttpStatusCode2["UpgradeRequired"] = 426] = "UpgradeRequired";
      HttpStatusCode2[HttpStatusCode2["PreconditionRequired"] = 428] = "PreconditionRequired";
      HttpStatusCode2[HttpStatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpStatusCode2[HttpStatusCode2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
      HttpStatusCode2[HttpStatusCode2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
      HttpStatusCode2[HttpStatusCode2["InternalServerError"] = 500] = "InternalServerError";
      HttpStatusCode2[HttpStatusCode2["NotImplemented"] = 501] = "NotImplemented";
      HttpStatusCode2[HttpStatusCode2["BadGateway"] = 502] = "BadGateway";
      HttpStatusCode2[HttpStatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpStatusCode2[HttpStatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
      HttpStatusCode2[HttpStatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
      HttpStatusCode2[HttpStatusCode2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
      HttpStatusCode2[HttpStatusCode2["InsufficientStorage"] = 507] = "InsufficientStorage";
      HttpStatusCode2[HttpStatusCode2["LoopDetected"] = 508] = "LoopDetected";
      HttpStatusCode2[HttpStatusCode2["NotExtended"] = 510] = "NotExtended";
      HttpStatusCode2[HttpStatusCode2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
    })(HttpStatusCode || (HttpStatusCode = {}));
    XSSI_PREFIX$1 = /^\)\]\}',?\n/;
    DEFAULT_SSR_MAX_RESPONSE_BODY_SIZE = 1024 * 1024;
    HTTP_FETCH_MAX_RESPONSE_SIZE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_FETCH_MAX_RESPONSE_SIZE" : "", {
      factory: () => false ? DEFAULT_SSR_MAX_RESPONSE_BODY_SIZE : null
    });
    FetchBackend = class _FetchBackend {
      fetchImpl = inject(FetchFactory, {
        optional: true
      })?.fetch ?? ((...args) => globalThis.fetch(...args));
      ngZone = inject(NgZone);
      destroyRef = inject(DestroyRef);
      maxResponseSize = inject(HTTP_FETCH_MAX_RESPONSE_SIZE);
      handle(request) {
        return new Observable((observer) => {
          const aborter = new AbortController();
          let done = false;
          const wrappedObserver = {
            next: (val) => {
              if (val.type === HttpEventType.Response) {
                done = true;
              }
              observer.next(val);
            },
            error: (err) => {
              done = true;
              observer.error(err);
            },
            complete: () => {
              done = true;
              observer.complete();
            }
          };
          this.doRequest(request, aborter.signal, wrappedObserver).then(noop, (error) => wrappedObserver.error(new HttpErrorResponse({
            error
          })));
          let timeoutId;
          if (request.timeout) {
            timeoutId = this.ngZone.runOutsideAngular(() => setTimeout(() => {
              if (!aborter.signal.aborted) {
                aborter.abort(new DOMException("signal timed out", "TimeoutError"));
              }
            }, request.timeout));
          }
          return () => {
            if (timeoutId !== void 0) {
              clearTimeout(timeoutId);
            }
            if (!done && !aborter.signal.aborted) {
              aborter.abort();
            }
          };
        });
      }
      doRequest(request, signal2, observer) {
        return __async(this, null, function* () {
          const init = this.createRequestInit(request);
          let response;
          try {
            const fetchPromise = this.ngZone.runOutsideAngular(() => this.fetchImpl(request.urlWithParams, __spreadValues({
              signal: signal2
            }, init)));
            silenceSuperfluousUnhandledPromiseRejection(fetchPromise);
            observer.next({
              type: HttpEventType.Sent
            });
            response = yield fetchPromise;
          } catch (error) {
            observer.error(new HttpErrorResponse({
              error,
              status: error.status ?? 0,
              statusText: error.statusText,
              url: request.urlWithParams,
              headers: error.headers
            }));
            return;
          }
          const headers = new HttpHeaders(response.headers);
          const statusText = response.statusText;
          const url = response.url || request.urlWithParams;
          let status = response.status;
          let body = null;
          const reportDownloadProgress = request.reportProgress || request.reportDownloadProgress;
          if (reportDownloadProgress) {
            observer.next(new HttpHeaderResponse({
              headers,
              status,
              statusText,
              url
            }));
          }
          if (response.body) {
            const contentType = response.headers.get(CONTENT_TYPE_HEADER) ?? "";
            const contentLength = response.headers.get("content-length");
            const contentLengthValue = contentLength !== null ? Number(contentLength) : NaN;
            if (this.maxResponseSize !== null && Number.isFinite(contentLengthValue) && contentLengthValue > this.maxResponseSize) {
              yield response.body.cancel();
              throwBodyTooLargeError(this.maxResponseSize);
            }
            const chunks = [];
            const reader = response.body.getReader();
            let receivedLength = 0;
            let decoder;
            let partialText;
            const reqZone = typeof Zone !== "undefined" && Zone.current;
            let canceled = false;
            yield this.ngZone.runOutsideAngular(() => __async(this, null, function* () {
              while (true) {
                if (this.destroyRef.destroyed) {
                  yield reader.cancel();
                  canceled = true;
                  break;
                }
                const {
                  done,
                  value
                } = yield reader.read();
                if (done) {
                  break;
                }
                chunks.push(value);
                receivedLength += value.length;
                if (this.maxResponseSize !== null && receivedLength > this.maxResponseSize) {
                  yield reader.cancel();
                  throwBodyTooLargeError(this.maxResponseSize);
                }
                if (reportDownloadProgress) {
                  partialText = request.responseType === "text" ? (partialText ?? "") + (decoder ??= getTextDecoder(contentType)).decode(value, {
                    stream: true
                  }) : void 0;
                  const reportProgress = () => observer.next({
                    type: HttpEventType.DownloadProgress,
                    total: Number.isFinite(contentLengthValue) ? contentLengthValue : void 0,
                    loaded: receivedLength,
                    partialText
                  });
                  reqZone ? reqZone.run(reportProgress) : reportProgress();
                }
              }
            }));
            if (canceled) {
              observer.complete();
              return;
            }
            const chunksAll = this.concatChunks(chunks, receivedLength);
            try {
              body = this.parseBody(request, chunksAll, contentType, status);
            } catch (error) {
              observer.error(new HttpErrorResponse({
                error,
                headers: new HttpHeaders(response.headers),
                status: response.status,
                statusText: response.statusText,
                url: response.url || request.urlWithParams
              }));
              return;
            }
          }
          if (status === 0) {
            status = body ? HTTP_STATUS_CODE_OK : 0;
          }
          const ok = status >= 200 && status < 300;
          const redirected = response.redirected;
          const responseType = response.type;
          if (ok) {
            observer.next(new HttpResponse({
              body,
              headers,
              status,
              statusText,
              url,
              redirected,
              responseType
            }));
            observer.complete();
          } else {
            observer.error(new HttpErrorResponse({
              error: body,
              headers,
              status,
              statusText,
              url,
              redirected,
              responseType
            }));
          }
        });
      }
      parseBody(request, binContent, contentType, status) {
        switch (request.responseType) {
          case "json":
            const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX$1, "");
            if (text === "") {
              return null;
            }
            try {
              return JSON.parse(text);
            } catch (e2) {
              if (status < 200 || status >= 300) {
                return text;
              }
              throw e2;
            }
          case "text":
            return getTextDecoder(contentType).decode(binContent);
          case "blob":
            return new Blob([binContent], {
              type: contentType
            });
          case "arraybuffer":
            return binContent.buffer;
        }
      }
      createRequestInit(req) {
        if (req.reportUploadProgress) {
          throw new RuntimeError(2824, ngDevMode && "The FetchBackend does not support upload progress reporting. Please use `withXhr()` on your `provideHttpClient()` configuration if you want to report upload progress.");
        }
        const headers = {};
        let credentials;
        credentials = req.credentials;
        if (req.withCredentials) {
          (typeof ngDevMode === "undefined" || ngDevMode) && warningOptionsMessage(req);
          credentials = "include";
        }
        req.headers.forEach((name, values) => headers[name] = values.join(","));
        if (!req.headers.has(ACCEPT_HEADER)) {
          headers[ACCEPT_HEADER] = ACCEPT_HEADER_VALUE;
        }
        if (!req.headers.has(CONTENT_TYPE_HEADER)) {
          const detectedType = req.detectContentTypeHeader();
          if (detectedType !== null) {
            headers[CONTENT_TYPE_HEADER] = detectedType;
          }
        }
        return {
          body: req.serializeBody(),
          method: req.method,
          headers,
          credentials,
          keepalive: req.keepalive,
          cache: req.cache,
          priority: req.priority,
          mode: req.mode,
          redirect: req.redirect,
          referrer: req.referrer,
          integrity: req.integrity,
          referrerPolicy: req.referrerPolicy
        };
      }
      concatChunks(chunks, totalLength) {
        const chunksAll = new Uint8Array(totalLength);
        let position = 0;
        for (const chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        return chunksAll;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _FetchBackend,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _FetchBackend
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: FetchBackend,
      decorators: [{
        type: Service
      }]
    });
    FetchFactory = class {
    };
    CHARSET_REGEX = /charset=\s*["']?([^;"'\s]+)["']?/i;
    XSRF_ENABLED = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_ENABLED" : "", {
      factory: () => true
    });
    XSRF_DEFAULT_COOKIE_NAME = "XSRF-TOKEN";
    XSRF_COOKIE_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_COOKIE_NAME" : "", {
      factory: () => XSRF_DEFAULT_COOKIE_NAME
    });
    XSRF_DEFAULT_HEADER_NAME = "X-XSRF-TOKEN";
    XSRF_HEADER_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_HEADER_NAME" : "", {
      factory: () => XSRF_DEFAULT_HEADER_NAME
    });
    HttpXsrfCookieExtractor = class _HttpXsrfCookieExtractor {
      cookieName = inject(XSRF_COOKIE_NAME);
      doc = inject(DOCUMENT);
      lastCookieString = "";
      lastToken = null;
      parseCount = 0;
      getToken() {
        if (false) {
          return null;
        }
        const cookieString = this.doc.cookie || "";
        if (cookieString !== this.lastCookieString) {
          this.parseCount++;
          this.lastToken = parseCookieValue(cookieString, this.cookieName);
          this.lastCookieString = cookieString;
        }
        return this.lastToken;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfCookieExtractor,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfCookieExtractor
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpXsrfCookieExtractor,
      decorators: [{
        type: Service
      }]
    });
    HttpXsrfTokenExtractor = class _HttpXsrfTokenExtractor {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfTokenExtractor,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfTokenExtractor,
        providedIn: "root",
        useExisting: HttpXsrfCookieExtractor
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpXsrfTokenExtractor,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root",
          useExisting: HttpXsrfCookieExtractor
        }]
      }]
    });
    HttpXsrfInterceptor = class _HttpXsrfInterceptor {
      injector = inject(EnvironmentInjector);
      intercept(initialRequest, next) {
        return runInInjectionContext(this.injector, () => xsrfInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfInterceptor,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXsrfInterceptor
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpXsrfInterceptor,
      decorators: [{
        type: Injectable
      }]
    });
    HTTP_INTERCEPTORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTORS" : "");
    HTTP_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTOR_FNS" : "", {
      factory: () => [xsrfInterceptorFn]
    });
    HTTP_ROOT_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_ROOT_INTERCEPTOR_FNS" : "");
    REQUESTS_CONTRIBUTE_TO_STABILITY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "REQUESTS_CONTRIBUTE_TO_STABILITY" : "", {
      factory: () => true
    });
    HttpBackend = class _HttpBackend {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpBackend,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpBackend,
        providedIn: "root",
        useExisting: FetchBackend
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpBackend,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root",
          useExisting: FetchBackend
        }]
      }]
    });
    fetchBackendWarningDisplayed = false;
    HttpInterceptorHandler = class _HttpInterceptorHandler {
      backend;
      injector;
      chain = null;
      pendingTasks = inject(PendingTasks);
      contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
      constructor(backend, injector) {
        this.backend = backend;
        this.injector = injector;
        if ((typeof ngDevMode === "undefined" || ngDevMode) && !fetchBackendWarningDisplayed) {
          const isTestingBackend = this.backend.isTestingBackend;
          if (false) {
            fetchBackendWarningDisplayed = true;
            injector.get(Console).warn(formatRuntimeError(2801, "Angular detected that `HttpClient` is not configured to use `fetch` APIs. It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility. To enable `fetch`, remove the `withXhr()` feature from the `provideHttpClient()` call"));
          }
        }
      }
      handle(initialRequest) {
        if (this.chain === null) {
          const parentHandler = this.injector.get(HttpHandler, null, {
            skipSelf: true
          });
          const isDelegating = parentHandler !== null && this.backend === parentHandler;
          const rootInterceptorFns = this.injector.get(HTTP_ROOT_INTERCEPTOR_FNS, [], isDelegating ? {
            self: true
          } : void 0);
          const dedupedInterceptorFns = Array.from(/* @__PURE__ */ new Set([...this.injector.get(HTTP_INTERCEPTOR_FNS), ...rootInterceptorFns]));
          this.chain = dedupedInterceptorFns.reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
        }
        const chain = this.chain;
        if (this.contributeToStability) {
          const removeTask = this.pendingTasks.add();
          return untracked(() => chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest))).pipe(finalize(removeTask));
        } else {
          return untracked(() => chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest)));
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpInterceptorHandler,
        deps: [{
          token: HttpBackend
        }, {
          token: EnvironmentInjector
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpInterceptorHandler,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpInterceptorHandler,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: HttpBackend
      }, {
        type: EnvironmentInjector
      }]
    });
    HttpHandler = class _HttpHandler {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpHandler,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpHandler,
        providedIn: "root",
        useExisting: HttpInterceptorHandler
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpHandler,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root",
          useExisting: HttpInterceptorHandler
        }]
      }]
    });
    HttpClient = class _HttpClient {
      handler;
      constructor(handler) {
        this.handler = handler;
      }
      request(first2, url, options = {}) {
        let req;
        if (first2 instanceof HttpRequest) {
          req = first2;
        } else {
          let headers = void 0;
          if (options.headers instanceof HttpHeaders) {
            headers = options.headers;
          } else {
            headers = new HttpHeaders(options.headers);
          }
          let params = void 0;
          if (!!options.params) {
            if (options.params instanceof HttpParams) {
              params = options.params;
            } else {
              params = new HttpParams({
                fromObject: options.params
              });
            }
          }
          req = new HttpRequest(first2, url, options.body !== void 0 ? options.body : null, {
            headers,
            context: options.context,
            params,
            reportProgress: options.reportProgress,
            reportUploadProgress: options.reportUploadProgress,
            reportDownloadProgress: options.reportDownloadProgress,
            responseType: options.responseType || "json",
            withCredentials: options.withCredentials,
            transferCache: options.transferCache,
            keepalive: options.keepalive,
            priority: options.priority,
            cache: options.cache,
            mode: options.mode,
            redirect: options.redirect,
            credentials: options.credentials,
            referrer: options.referrer,
            referrerPolicy: options.referrerPolicy,
            integrity: options.integrity,
            timeout: options.timeout
          });
        }
        const events$ = of(req).pipe(concatMap((req2) => this.handler.handle(req2)));
        if (first2 instanceof HttpRequest || options.observe === "events") {
          return events$;
        }
        const res$ = events$.pipe(filter((event) => event instanceof HttpResponse));
        switch (options.observe || "body") {
          case "body":
            switch (req.responseType) {
              case "arraybuffer":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                    throw new RuntimeError(2806, ngDevMode && "Response is not an ArrayBuffer.");
                  }
                  return res.body;
                }));
              case "blob":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof Blob)) {
                    throw new RuntimeError(2807, ngDevMode && "Response is not a Blob.");
                  }
                  return res.body;
                }));
              case "text":
                return res$.pipe(map((res) => {
                  if (res.body !== null && typeof res.body !== "string") {
                    throw new RuntimeError(2808, ngDevMode && "Response is not a string.");
                  }
                  return res.body;
                }));
              case "json":
              default:
                return res$.pipe(map((res) => res.body));
            }
          case "response":
            return res$;
          default:
            throw new RuntimeError(2809, ngDevMode && `Unreachable: unhandled observe type ${options.observe}}`);
        }
      }
      delete(url, options = {}) {
        return this.request("DELETE", url, options);
      }
      get(url, options = {}) {
        return this.request("GET", url, options);
      }
      head(url, options = {}) {
        return this.request("HEAD", url, options);
      }
      jsonp(url, callbackParam) {
        return this.request("JSONP", url, {
          params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json"
        });
      }
      options(url, options = {}) {
        return this.request("OPTIONS", url, options);
      }
      patch(url, body, options = {}) {
        return this.request("PATCH", url, addBody(options, body));
      }
      post(url, body, options = {}) {
        return this.request("POST", url, addBody(options, body));
      }
      put(url, body, options = {}) {
        return this.request("PUT", url, addBody(options, body));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClient,
        deps: [{
          token: HttpHandler
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClient,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClient,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: HttpHandler
      }]
    });
    nextRequestId = 0;
    JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
    JSONP_ERR_WRONG_METHOD = "JSONP requests must use JSONP request method.";
    JSONP_ERR_WRONG_RESPONSE_TYPE = "JSONP requests must use Json response type.";
    JSONP_ERR_HEADERS_NOT_SUPPORTED = "JSONP requests do not support headers.";
    JSONP_ERR_UNSAFE_URL = "JSONP requests only support absolute URLs with HTTP(S) protocols.";
    JsonpCallbackContext = class {
    };
    JsonpClientBackend = class _JsonpClientBackend {
      callbackMap;
      document;
      resolvedPromise = Promise.resolve();
      nonce = inject(CSP_NONCE, {
        optional: true
      });
      constructor(callbackMap, document) {
        this.callbackMap = callbackMap;
        this.document = document;
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          console.warn("JSONP support is deprecated as it can cause XSS vulnerabilities, and will be removed in a future version of Angular. Please use standard HTTP requests instead.");
        }
      }
      nextCallback() {
        return `ng_jsonp_callback_${nextRequestId++}`;
      }
      handle(req) {
        if (req.method !== "JSONP") {
          throw new RuntimeError(2810, ngDevMode && JSONP_ERR_WRONG_METHOD);
        } else if (req.responseType !== "json") {
          throw new RuntimeError(2811, ngDevMode && JSONP_ERR_WRONG_RESPONSE_TYPE);
        }
        if (req.headers.keys().length > 0) {
          throw new RuntimeError(2812, ngDevMode && JSONP_ERR_HEADERS_NOT_SUPPORTED);
        }
        if (!this.isAllowedJsonpUrl(req.urlWithParams)) {
          throw new RuntimeError(2826, ngDevMode && JSONP_ERR_UNSAFE_URL);
        }
        return new Observable((observer) => {
          const callback = this.nextCallback();
          const url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${callback}$1`);
          const node = this.document.createElement("script");
          node.src = url;
          if (this.nonce) {
            node.setAttribute("nonce", this.nonce);
          }
          let body = null;
          let finished = false;
          this.callbackMap[callback] = (data) => {
            delete this.callbackMap[callback];
            body = data;
            finished = true;
          };
          const cleanup2 = () => {
            node.removeEventListener("load", onLoad);
            node.removeEventListener("error", onError);
            node.remove();
            delete this.callbackMap[callback];
          };
          const onLoad = () => {
            this.resolvedPromise.then(() => {
              cleanup2();
              if (!finished) {
                observer.error(new HttpErrorResponse({
                  url,
                  status: 0,
                  statusText: "JSONP Error",
                  error: new Error(JSONP_ERR_NO_CALLBACK)
                }));
                return;
              }
              observer.next(new HttpResponse({
                body,
                status: HTTP_STATUS_CODE_OK,
                statusText: "OK",
                url
              }));
              observer.complete();
            });
          };
          const onError = (error) => {
            cleanup2();
            observer.error(new HttpErrorResponse({
              error,
              status: 0,
              statusText: "JSONP Error",
              url
            }));
          };
          node.addEventListener("load", onLoad);
          node.addEventListener("error", onError);
          this.document.body.appendChild(node);
          observer.next({
            type: HttpEventType.Sent
          });
          return () => {
            if (!finished) {
              this.removeListeners(node);
            }
            cleanup2();
          };
        });
      }
      removeListeners(script) {
        foreignDocument ??= this.document.implementation.createHTMLDocument();
        foreignDocument.adoptNode(script);
      }
      isAllowedJsonpUrl(url) {
        return /^https?:\/\//i.test(url);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _JsonpClientBackend,
        deps: [{
          token: JsonpCallbackContext
        }, {
          token: DOCUMENT
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _JsonpClientBackend
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: JsonpClientBackend,
      decorators: [{
        type: Injectable
      }],
      ctorParameters: () => [{
        type: JsonpCallbackContext
      }, {
        type: void 0,
        decorators: [{
          type: Inject,
          args: [DOCUMENT]
        }]
      }]
    });
    JsonpInterceptor = class _JsonpInterceptor {
      injector;
      constructor(injector) {
        this.injector = injector;
      }
      intercept(initialRequest, next) {
        return runInInjectionContext(this.injector, () => jsonpInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _JsonpInterceptor,
        deps: [{
          token: EnvironmentInjector
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _JsonpInterceptor
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: JsonpInterceptor,
      decorators: [{
        type: Injectable
      }],
      ctorParameters: () => [{
        type: EnvironmentInjector
      }]
    });
    XSSI_PREFIX = /^\)\]\}',?\n/;
    HttpXhrBackend = class _HttpXhrBackend {
      xhrFactory;
      tracingService = inject(TracingService, {
        optional: true
      });
      constructor(xhrFactory) {
        this.xhrFactory = xhrFactory;
      }
      maybePropagateTrace(fn) {
        return this.tracingService?.propagate ? this.tracingService.propagate(fn) : fn;
      }
      handle(req) {
        if (req.method === "JSONP") {
          throw new RuntimeError(-2800, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot make a JSONP request without JSONP support. To fix the problem, either add the \`withJsonpSupport()\` call (if \`provideHttpClient()\` is used) or import the \`HttpClientJsonpModule\` in the root NgModule.`);
        }
        ngDevMode && validateXhrCompatibility(req);
        const xhrFactory = this.xhrFactory;
        const source = false ? from(xhrFactory.\u0275loadImpl()) : of(null);
        return source.pipe(switchMap(() => {
          return new Observable((observer) => {
            const xhr = xhrFactory.build();
            xhr.open(req.method, req.urlWithParams);
            if (req.withCredentials) {
              xhr.withCredentials = true;
            }
            req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(",")));
            if (!req.headers.has(ACCEPT_HEADER)) {
              xhr.setRequestHeader(ACCEPT_HEADER, ACCEPT_HEADER_VALUE);
            }
            if (!req.headers.has(CONTENT_TYPE_HEADER)) {
              const detectedType = req.detectContentTypeHeader();
              if (detectedType !== null) {
                xhr.setRequestHeader(CONTENT_TYPE_HEADER, detectedType);
              }
            }
            if (req.timeout) {
              xhr.timeout = req.timeout;
            }
            if (req.responseType) {
              const responseType = req.responseType.toLowerCase();
              xhr.responseType = responseType !== "json" ? responseType : "text";
            }
            const reqBody = req.serializeBody();
            let headerResponse = null;
            const partialFromXhr = () => {
              if (headerResponse !== null) {
                return headerResponse;
              }
              const statusText = xhr.statusText || "OK";
              const headers = new HttpHeaders(xhr.getAllResponseHeaders());
              const url = xhr.responseURL || req.url;
              headerResponse = new HttpHeaderResponse({
                headers,
                status: xhr.status,
                statusText,
                url
              });
              return headerResponse;
            };
            const onLoad = this.maybePropagateTrace(() => {
              let {
                headers,
                status,
                statusText,
                url
              } = partialFromXhr();
              let body = null;
              if (status !== HTTP_STATUS_CODE_NO_CONTENT) {
                body = typeof xhr.response === "undefined" ? xhr.responseText : xhr.response;
              }
              if (status === 0) {
                status = !!body ? HTTP_STATUS_CODE_OK : 0;
              }
              let ok = status >= 200 && status < 300;
              if (req.responseType === "json" && typeof body === "string") {
                const originalBody = body;
                body = body.replace(XSSI_PREFIX, "");
                try {
                  body = body !== "" ? JSON.parse(body) : null;
                } catch (error) {
                  body = originalBody;
                  if (ok) {
                    ok = false;
                    body = {
                      error,
                      text: body
                    };
                  }
                }
              }
              if (ok) {
                observer.next(new HttpResponse({
                  body,
                  headers,
                  status,
                  statusText,
                  url: url || void 0
                }));
                observer.complete();
              } else {
                observer.error(new HttpErrorResponse({
                  error: body,
                  headers,
                  status,
                  statusText,
                  url: url || void 0
                }));
              }
            });
            const onError = this.maybePropagateTrace((error) => {
              const {
                url
              } = partialFromXhr();
              const res = new HttpErrorResponse({
                error,
                status: xhr.status || 0,
                statusText: xhr.statusText || "Unknown Error",
                url: url || void 0
              });
              observer.error(res);
            });
            let onTimeout = onError;
            if (req.timeout) {
              onTimeout = this.maybePropagateTrace((_) => {
                const {
                  url
                } = partialFromXhr();
                const res = new HttpErrorResponse({
                  error: new DOMException("Request timed out", "TimeoutError"),
                  status: xhr.status || 0,
                  statusText: xhr.statusText || "Request timeout",
                  url: url || void 0
                });
                observer.error(res);
              });
            }
            let sentHeaders = false;
            const onDownProgress = this.maybePropagateTrace((event) => {
              if (!sentHeaders) {
                observer.next(partialFromXhr());
                sentHeaders = true;
              }
              let progressEvent = {
                type: HttpEventType.DownloadProgress,
                loaded: event.loaded
              };
              if (event.lengthComputable) {
                progressEvent.total = event.total;
              }
              if (req.responseType === "text" && !!xhr.responseText) {
                progressEvent.partialText = xhr.responseText;
              }
              observer.next(progressEvent);
            });
            const onUpProgress = this.maybePropagateTrace((event) => {
              let progress = {
                type: HttpEventType.UploadProgress,
                loaded: event.loaded
              };
              if (event.lengthComputable) {
                progress.total = event.total;
              }
              observer.next(progress);
            });
            xhr.addEventListener("load", onLoad);
            xhr.addEventListener("error", onError);
            xhr.addEventListener("timeout", onTimeout);
            xhr.addEventListener("abort", onError);
            const reportUploadProgress = req.reportProgress || req.reportUploadProgress;
            const reportDownloadProgress = req.reportProgress || req.reportDownloadProgress;
            if (reportDownloadProgress) {
              xhr.addEventListener("progress", onDownProgress);
            }
            if (reportUploadProgress && reqBody !== null && xhr.upload) {
              xhr.upload.addEventListener("progress", onUpProgress);
            }
            xhr.send(reqBody);
            observer.next({
              type: HttpEventType.Sent
            });
            return () => {
              xhr.removeEventListener("error", onError);
              xhr.removeEventListener("abort", onError);
              xhr.removeEventListener("load", onLoad);
              xhr.removeEventListener("timeout", onTimeout);
              if (reportDownloadProgress) {
                xhr.removeEventListener("progress", onDownProgress);
              }
              if (reportUploadProgress && reqBody !== null && xhr.upload) {
                xhr.upload.removeEventListener("progress", onUpProgress);
              }
              if (xhr.readyState !== xhr.DONE) {
                xhr.abort();
              }
            };
          });
        }));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXhrBackend,
        deps: [{
          token: XhrFactory
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpXhrBackend,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpXhrBackend,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: XhrFactory
      }]
    });
    (function(HttpFeatureKind2) {
      HttpFeatureKind2[HttpFeatureKind2["Interceptors"] = 0] = "Interceptors";
      HttpFeatureKind2[HttpFeatureKind2["LegacyInterceptors"] = 1] = "LegacyInterceptors";
      HttpFeatureKind2[HttpFeatureKind2["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
      HttpFeatureKind2[HttpFeatureKind2["NoXsrfProtection"] = 3] = "NoXsrfProtection";
      HttpFeatureKind2[HttpFeatureKind2["JsonpSupport"] = 4] = "JsonpSupport";
      HttpFeatureKind2[HttpFeatureKind2["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
      HttpFeatureKind2[HttpFeatureKind2["Fetch"] = 6] = "Fetch";
      HttpFeatureKind2[HttpFeatureKind2["Xhr"] = 7] = "Xhr";
    })(HttpFeatureKind || (HttpFeatureKind = {}));
    LEGACY_INTERCEPTOR_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "LEGACY_INTERCEPTOR_FN" : "");
    HttpClientXsrfModule = class _HttpClientXsrfModule {
      static disable() {
        return {
          ngModule: _HttpClientXsrfModule,
          providers: [withNoXsrfProtection().\u0275providers]
        };
      }
      static withOptions(options = {}) {
        return {
          ngModule: _HttpClientXsrfModule,
          providers: withXsrfConfiguration(options).\u0275providers
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientXsrfModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientXsrfModule
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientXsrfModule,
        providers: [HttpXsrfInterceptor, {
          provide: HTTP_INTERCEPTORS,
          useExisting: HttpXsrfInterceptor,
          multi: true
        }, {
          provide: HttpXsrfTokenExtractor,
          useClass: HttpXsrfCookieExtractor
        }, withXsrfConfiguration({
          cookieName: XSRF_DEFAULT_COOKIE_NAME,
          headerName: XSRF_DEFAULT_HEADER_NAME
        }).\u0275providers, {
          provide: XSRF_ENABLED,
          useValue: true
        }]
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClientXsrfModule,
      decorators: [{
        type: NgModule,
        args: [{
          providers: [HttpXsrfInterceptor, {
            provide: HTTP_INTERCEPTORS,
            useExisting: HttpXsrfInterceptor,
            multi: true
          }, {
            provide: HttpXsrfTokenExtractor,
            useClass: HttpXsrfCookieExtractor
          }, withXsrfConfiguration({
            cookieName: XSRF_DEFAULT_COOKIE_NAME,
            headerName: XSRF_DEFAULT_HEADER_NAME
          }).\u0275providers, {
            provide: XSRF_ENABLED,
            useValue: true
          }]
        }]
      }]
    });
    HttpClientModule = class _HttpClientModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientModule
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientModule,
        providers: [provideHttpClient(withInterceptorsFromDi(), withXhr())]
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClientModule,
      decorators: [{
        type: NgModule,
        args: [{
          providers: [provideHttpClient(withInterceptorsFromDi(), withXhr())]
        }]
      }]
    });
    HttpClientJsonpModule = class _HttpClientJsonpModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientJsonpModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientJsonpModule
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientJsonpModule,
        providers: [withJsonpSupport().\u0275providers]
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClientJsonpModule,
      decorators: [{
        type: NgModule,
        args: [{
          providers: [withJsonpSupport().\u0275providers]
        }]
      }]
    });
  }
});

// node_modules/@angular/common/fesm2022/http.mjs
function canUseOrCacheRequest(req, options) {
  const {
    isCacheActive,
    filter: filter2,
    includePostRequests,
    includeRequestsWithAuthHeaders,
    includeRequestsWithCredentials,
    includeNonCacheableRequests
  } = options;
  const {
    transferCache: requestOptions,
    method: requestMethod
  } = req;
  if (!isCacheActive || requestOptions === false || requestMethod === "POST" && !includePostRequests && !requestOptions || requestMethod !== "POST" && !ALLOWED_METHODS.includes(requestMethod) || !includeRequestsWithAuthHeaders && hasAuthHeaders(req) || !includeRequestsWithCredentials && hasOutgoingCredentials(req) || !includeNonCacheableRequests && (hasUncacheableCacheControl(req.headers) || isNonCacheableRequest(req.cache)) || filter2?.(req) === false) {
    return false;
  }
  return true;
}
function getHeadersToInclude(options, requestOptions) {
  return typeof requestOptions === "object" && requestOptions.includeHeaders ? requestOptions.includeHeaders : options.includeHeaders;
}
function retrieveStateFromCache(req, options, transferState, originMap, storeKey, skipUseCacheChecks = false) {
  if (!skipUseCacheChecks && !canUseOrCacheRequest(req, options)) {
    return null;
  }
  if (originMap) {
    throw new RuntimeError(2803, ngDevMode && "Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and present in the client side code. Please ensure that this token is only provided in the server code of the application.");
  }
  if (!storeKey) {
    const requestUrl = false ? mapRequestOriginUrl(req.url, originMap) : req.url;
    storeKey = makeCacheKey(req, requestUrl);
  }
  const response = transferState.get(storeKey, null);
  if (!response) {
    return null;
  }
  const {
    [BODY]: undecodedBody,
    [RESPONSE_TYPE]: responseType,
    [HEADERS]: httpHeaders,
    [STATUS]: status,
    [STATUS_TEXT]: statusText,
    [REQ_URL]: url
  } = response;
  let body = undecodedBody;
  switch (responseType) {
    case "arraybuffer":
      body = fromBase64(undecodedBody);
      break;
    case "blob":
      body = new Blob([fromBase64(undecodedBody)]);
      break;
  }
  let headers = new HttpHeaders(httpHeaders);
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    const {
      transferCache: requestOptions
    } = req;
    const headersToInclude = getHeadersToInclude(options, requestOptions);
    headers = appendMissingHeadersDetection(req.url, headers, headersToInclude ?? []);
  }
  return new HttpResponse({
    body,
    headers,
    status,
    statusText,
    url
  });
}
function hasAuthHeaders(req) {
  const headers = req.headers;
  return headers.has("authorization") || headers.has("proxy-authorization") || headers.has("cookie");
}
function hasUncacheableCacheControl(headers) {
  const cacheControl = headers.get("cache-control");
  if (!cacheControl) {
    return false;
  }
  return cacheControl.split(",").some((directive) => {
    const directiveName = directive.split("=", 1)[0].trim().toLowerCase();
    return UNCACHEABLE_CACHE_CONTROL_DIRECTIVES.has(directiveName);
  });
}
function isNonCacheableRequest(cache) {
  return cache === "no-cache" || cache === "no-store";
}
function hasOutgoingCredentials(req) {
  const {
    withCredentials,
    credentials
  } = req;
  return withCredentials || credentials === "include" || credentials === "same-origin";
}
function sortAndConcatParams(params) {
  const searchParams = new URLSearchParams(params instanceof URLSearchParams ? params : params.toString());
  searchParams.sort();
  return searchParams.toString();
}
function makeCacheKey(request, mappedRequestUrl) {
  const {
    params,
    method,
    responseType
  } = request;
  const encodedParams = sortAndConcatParams(params);
  let serializedBody = request.serializeBody();
  if (serializedBody instanceof URLSearchParams) {
    serializedBody = sortAndConcatParams(serializedBody);
  } else if (typeof serializedBody !== "string") {
    serializedBody = "";
  }
  const key = [method, responseType, mappedRequestUrl, serializedBody, encodedParams].join("\0");
  const hash = generateHash(key);
  return makeStateKey(hash);
}
function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c3) => c3.charCodeAt(0));
  return bytes.buffer;
}
function appendMissingHeadersDetection(url, headers, headersToInclude) {
  const warningProduced = /* @__PURE__ */ new Set();
  return new Proxy(headers, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      const methods = /* @__PURE__ */ new Set(["get", "has", "getAll"]);
      if (typeof value !== "function" || !methods.has(prop)) {
        return value;
      }
      return (headerName) => {
        const key = (prop + ":" + headerName).toLowerCase();
        if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
          warningProduced.add(key);
          const truncatedUrl = truncateMiddle(url);
          console.warn(formatRuntimeError(-2802, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header was not transferred from the server to the client by the HttpTransferCache. To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either on a request level by adding the \`transferCache\` parameter, or on an application level by adding the \`httpCacheTransfer.includeHeaders\` argument to the \`provideClientHydration()\` call. `));
        }
        return value.apply(target, [headerName]);
      };
    }
  });
}
function generateHash(value) {
  textEncoder ??= new TextEncoder();
  const inputBytes = textEncoder.encode(value);
  let hashState0 = 1779033703;
  let hashState1 = 3144134277;
  let hashState2 = 1013904242;
  let hashState3 = 2773480762;
  let hashState4 = 1359893119;
  let hashState5 = 2600822924;
  let hashState6 = 528734635;
  let hashState7 = 1541459225;
  const messageLengthInBits = inputBytes.length * 8;
  const paddedLengthInBytes = (inputBytes.length + 8 >> 6) + 1 << 6;
  const paddedBytes = new Uint8Array(paddedLengthInBytes);
  paddedBytes.set(inputBytes);
  paddedBytes[inputBytes.length] = 128;
  const paddedBytesView = new DataView(paddedBytes.buffer);
  const lowBits = messageLengthInBits >>> 0;
  const highBits = messageLengthInBits / 4294967296 >>> 0;
  paddedBytesView.setUint32(paddedLengthInBytes - 8, highBits, false);
  paddedBytesView.setUint32(paddedLengthInBytes - 4, lowBits, false);
  const messageSchedule = new Uint32Array(64);
  for (let chunkOffset = 0; chunkOffset < paddedLengthInBytes; chunkOffset += 64) {
    for (let i = 0; i < 16; i++) {
      messageSchedule[i] = paddedBytesView.getUint32(chunkOffset + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const prevWord15 = messageSchedule[i - 15];
      const sigma0 = ((prevWord15 >>> 7 | prevWord15 << 25) ^ (prevWord15 >>> 18 | prevWord15 << 14) ^ prevWord15 >>> 3) >>> 0;
      const prevWord2 = messageSchedule[i - 2];
      const sigma1 = ((prevWord2 >>> 17 | prevWord2 << 15) ^ (prevWord2 >>> 19 | prevWord2 << 13) ^ prevWord2 >>> 10) >>> 0;
      messageSchedule[i] = messageSchedule[i - 16] + sigma0 + messageSchedule[i - 7] + sigma1 >>> 0;
    }
    let workingStateA = hashState0;
    let workingStateB = hashState1;
    let workingStateC = hashState2;
    let workingStateD = hashState3;
    let workingStateE = hashState4;
    let workingStateF = hashState5;
    let workingStateG = hashState6;
    let workingStateH = hashState7;
    for (let i = 0; i < 64; i++) {
      const capitalSigma1 = ((workingStateE >>> 6 | workingStateE << 26) ^ (workingStateE >>> 11 | workingStateE << 21) ^ (workingStateE >>> 25 | workingStateE << 7)) >>> 0;
      const chFunction = (workingStateE & workingStateF ^ ~workingStateE & workingStateG) >>> 0;
      const temp1 = workingStateH + capitalSigma1 + chFunction + SHA256_ROUND_CONSTANTS[i] + messageSchedule[i] >>> 0;
      const capitalSigma0 = ((workingStateA >>> 2 | workingStateA << 30) ^ (workingStateA >>> 13 | workingStateA << 19) ^ (workingStateA >>> 22 | workingStateA << 10)) >>> 0;
      const majFunction = (workingStateA & workingStateB ^ workingStateA & workingStateC ^ workingStateB & workingStateC) >>> 0;
      const temp2 = capitalSigma0 + majFunction >>> 0;
      workingStateH = workingStateG;
      workingStateG = workingStateF;
      workingStateF = workingStateE;
      workingStateE = workingStateD + temp1 >>> 0;
      workingStateD = workingStateC;
      workingStateC = workingStateB;
      workingStateB = workingStateA;
      workingStateA = temp1 + temp2 >>> 0;
    }
    hashState0 = hashState0 + workingStateA >>> 0;
    hashState1 = hashState1 + workingStateB >>> 0;
    hashState2 = hashState2 + workingStateC >>> 0;
    hashState3 = hashState3 + workingStateD >>> 0;
    hashState4 = hashState4 + workingStateE >>> 0;
    hashState5 = hashState5 + workingStateF >>> 0;
    hashState6 = hashState6 + workingStateG >>> 0;
    hashState7 = hashState7 + workingStateH >>> 0;
  }
  return [hashState0, hashState1, hashState2, hashState3, hashState4, hashState5, hashState6, hashState7].map((x) => x.toString(16).padStart(8, "0")).join("");
}
function makeHttpResourceFn(responseType) {
  return function httpResource2(request, options) {
    if (ngDevMode && !options?.injector) {
      assertInInjectionContext(httpResource2);
    }
    const injector = options?.injector ?? inject(Injector);
    const cacheOptions = injector.get(CACHE_OPTIONS, null, {
      optional: true
    });
    const transferState = injector.get(TransferState, null, {
      optional: true
    });
    const originMap = injector.get(HTTP_TRANSFER_CACHE_ORIGIN_MAP, null, {
      optional: true
    });
    const getInitialStream = (req) => {
      if (cacheOptions && transferState && req) {
        const cachedResponse = retrieveStateFromCache(req, cacheOptions, transferState, originMap);
        if (cachedResponse) {
          try {
            const body = cachedResponse.body;
            const parsed = options?.parse ? options.parse(body) : body;
            return signal({
              value: parsed
            });
          } catch (e2) {
            if (typeof ngDevMode === "undefined" || ngDevMode) {
              console.warn(`Angular detected an error while parsing the cached response for the httpResource at \`${req.url}\`. The resource will fall back to its default value and try again asynchronously.`, e2);
            }
          }
        }
      }
      return void 0;
    };
    return new HttpResourceImpl(injector, (ctx) => normalizeRequest(ctx, request, responseType), options?.defaultValue, options?.debugName, options?.parse, options?.equal, getInitialStream);
  };
}
function normalizeRequest(ctx, request, responseType) {
  let unwrappedRequest = typeof request === "function" ? request(ctx) : request;
  if (unwrappedRequest === void 0) {
    return void 0;
  } else if (typeof unwrappedRequest === "string") {
    unwrappedRequest = {
      url: unwrappedRequest
    };
  }
  const headers = unwrappedRequest.headers instanceof HttpHeaders ? unwrappedRequest.headers : new HttpHeaders(unwrappedRequest.headers);
  const params = unwrappedRequest.params instanceof HttpParams ? unwrappedRequest.params : new HttpParams({
    fromObject: unwrappedRequest.params
  });
  return new HttpRequest(unwrappedRequest.method ?? "GET", unwrappedRequest.url, unwrappedRequest.body ?? null, {
    headers,
    params,
    reportDownloadProgress: unwrappedRequest.reportProgress,
    withCredentials: unwrappedRequest.withCredentials,
    keepalive: unwrappedRequest.keepalive,
    cache: unwrappedRequest.cache,
    priority: unwrappedRequest.priority,
    mode: unwrappedRequest.mode,
    redirect: unwrappedRequest.redirect,
    responseType,
    context: unwrappedRequest.context,
    transferCache: unwrappedRequest.transferCache,
    credentials: unwrappedRequest.credentials,
    referrer: unwrappedRequest.referrer,
    referrerPolicy: unwrappedRequest.referrerPolicy,
    integrity: unwrappedRequest.integrity,
    timeout: unwrappedRequest.timeout
  });
}
var HTTP_TRANSFER_CACHE_ORIGIN_MAP, BODY, HEADERS, STATUS, STATUS_TEXT, REQ_URL, RESPONSE_TYPE, CACHE_OPTIONS, ALLOWED_METHODS, UNCACHEABLE_CACHE_CONTROL_DIRECTIVES, SHA256_ROUND_CONSTANTS, textEncoder, httpResource, HttpResourceImpl;
var init_http = __esm({
  "node_modules/@angular/common/fesm2022/http.mjs"() {
    init_module_chunk();
    init_module_chunk();
    init_core();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_CACHE_ORIGIN_MAP" : "");
    BODY = "b";
    HEADERS = "h";
    STATUS = "s";
    STATUS_TEXT = "st";
    REQ_URL = "u";
    RESPONSE_TYPE = "rt";
    CACHE_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_STATE_CACHE_OPTIONS" : "");
    ALLOWED_METHODS = ["GET", "HEAD"];
    UNCACHEABLE_CACHE_CONTROL_DIRECTIVES = /* @__PURE__ */ new Set(["no-store", "private", "no-cache"]);
    SHA256_ROUND_CONSTANTS = /* @__PURE__ */ new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
    httpResource = (() => {
      const jsonFn = makeHttpResourceFn("json");
      jsonFn.arrayBuffer = makeHttpResourceFn("arraybuffer");
      jsonFn.blob = makeHttpResourceFn("blob");
      jsonFn.text = makeHttpResourceFn("text");
      return jsonFn;
    })();
    HttpResourceImpl = class extends ResourceImpl {
      client;
      _headers = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_headers"
      } : {}), {
        source: this.extRequest,
        computation: () => void 0
      }));
      _progress = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_progress"
      } : {}), {
        source: this.extRequest,
        computation: () => void 0
      }));
      _statusCode = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_statusCode"
      } : {}), {
        source: this.extRequest,
        computation: () => void 0
      }));
      headers = computed(() => this.status() === "resolved" || this.status() === "error" ? this._headers() : void 0, ...ngDevMode ? [{
        debugName: "headers"
      }] : []);
      progress = this._progress.asReadonly();
      statusCode = this._statusCode.asReadonly();
      constructor(injector, request, defaultValue, debugName, parse, equal, getInitialStream) {
        super(request, ({
          params: request2,
          abortSignal
        }) => {
          let sub;
          let aborted = false;
          const onAbort = () => {
            aborted = true;
            sub?.unsubscribe();
          };
          abortSignal.addEventListener("abort", onAbort, {
            once: true
          });
          const stream = signal({
            value: void 0
          }, ...ngDevMode ? [{
            debugName: "stream"
          }] : []);
          let resolve;
          const promise = new Promise((r2) => resolve = r2);
          const send = (value) => {
            stream.set(value);
            resolve?.(stream);
            resolve = void 0;
          };
          sub = this.client.request(request2).subscribe({
            next: (event) => {
              switch (event.type) {
                case HttpEventType.Response:
                  this._headers.set(event.headers);
                  this._statusCode.set(event.status);
                  try {
                    send({
                      value: parse ? parse(event.body) : event.body
                    });
                  } catch (error) {
                    send({
                      error: encapsulateResourceError(error)
                    });
                  }
                  break;
                case HttpEventType.DownloadProgress:
                  this._progress.set(event);
                  break;
              }
            },
            error: (error) => {
              if (error instanceof HttpErrorResponse) {
                this._headers.set(error.headers);
                this._statusCode.set(error.status);
              }
              send({
                error
              });
              abortSignal.removeEventListener("abort", onAbort);
            },
            complete: () => {
              if (resolve) {
                send({
                  error: new RuntimeError(-991, ngDevMode && "Resource completed before producing a value")
                });
              }
              abortSignal.removeEventListener("abort", onAbort);
            }
          });
          if (aborted) {
            sub.unsubscribe();
          }
          return promise;
        }, defaultValue, equal, debugName, injector, void 0, getInitialStream);
        this.client = injector.get(HttpClient);
      }
      set(value) {
        super.set(value);
        this._headers.set(void 0);
        this._progress.set(void 0);
        this._statusCode.set(void 0);
      }
    };
  }
});

// node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
function buildMetaSelector(attrSelector) {
  return `meta[${attrSelector}]`;
}
function setMetaElementAttributes(tag, el) {
  Object.keys(tag).forEach((prop) => el.setAttribute(getMetaKeyMap(prop), tag[prop]));
}
function validateMetaDefinition(tag) {
  for (const prop of Object.keys(tag)) {
    const attributeName = getMetaKeyMap(prop);
    if (attributeName.toLowerCase().startsWith("on")) {
      throw new RuntimeError(5203, (typeof ngDevMode === "undefined" || ngDevMode) && `The Meta service does not allow setting event handler attribute '${attributeName}' for security reasons.`);
    }
  }
}
function parseSelector(tag) {
  const attr = tag.name ? "name" : "property";
  return `${attr}=${escapeSelectorValue(String(tag[attr]))}`;
}
function escapeSelectorValue(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function containsAttributes(tag, elem) {
  return Object.keys(tag).every((key) => elem.getAttribute(getMetaKeyMap(key)) === tag[key]);
}
function getMetaKeyMap(prop) {
  return Object.hasOwn(META_KEYS_MAP, prop) ? META_KEYS_MAP[prop] : prop;
}
function isMetaTag(tag) {
  return tag?.nodeName.toLowerCase() === "meta";
}
function elementMatches(n2, selector) {
  if (getDOM().isElementNode(n2)) {
    return n2.matches && n2.matches(selector) || n2.msMatchesSelector && n2.msMatchesSelector(selector) || n2.webkitMatchesSelector && n2.webkitMatchesSelector(selector);
  }
  return false;
}
var Meta, META_KEYS_MAP, Title, By, CssVarNamespacer, HydrationFeatureKind, DomSanitizer, DomSanitizerImpl;
var init_platform_browser = __esm({
  "node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs"() {
    init_common();
    init_core();
    init_core();
    init_dom_renderer_chunk();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    Meta = class _Meta {
      _doc = inject(DOCUMENT);
      _dom = getDOM();
      _cachedHead;
      addTag(tag, forceCreation = false) {
        if (!tag) return null;
        return this._getOrCreateElement(tag, forceCreation);
      }
      addTags(tags, forceCreation = false) {
        return tags.filter((tag) => !!tag).map((tag) => this._getOrCreateElement(tag, forceCreation));
      }
      getTag(attrSelector) {
        if (!attrSelector) return null;
        const meta = this._doc.querySelector(buildMetaSelector(attrSelector));
        return isMetaTag(meta) ? meta : null;
      }
      getTags(attrSelector) {
        if (!attrSelector) return [];
        const list = this._doc.querySelectorAll(buildMetaSelector(attrSelector));
        return list ? Array.from(list).filter((elem) => isMetaTag(elem)) : [];
      }
      updateTag(tag, selector) {
        validateMetaDefinition(tag);
        selector ??= parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
          setMetaElementAttributes(tag, meta);
          return meta;
        }
        return this._getOrCreateElement(tag, true);
      }
      removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
      }
      removeTagElement(meta) {
        if (meta) {
          this._dom.remove(meta);
        }
      }
      _getOrCreateElement(meta, forceCreation = false) {
        validateMetaDefinition(meta);
        if (!forceCreation) {
          const selector = parseSelector(meta);
          const elem = this.getTags(selector).filter((elem2) => containsAttributes(meta, elem2))[0];
          if (elem !== void 0) return elem;
        }
        const element = this._dom.createElement("meta");
        setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName("head")[0];
        head.appendChild(element);
        return element;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Meta,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Meta
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: Meta,
      decorators: [{
        type: Service
      }]
    });
    META_KEYS_MAP = {
      httpEquiv: "http-equiv"
    };
    Title = class _Title {
      _doc;
      constructor(_doc) {
        this._doc = _doc;
      }
      getTitle() {
        return this._doc.title;
      }
      setTitle(newTitle) {
        this._doc.title = newTitle || "";
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Title,
        deps: [{
          token: DOCUMENT
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Title,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: Title,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: void 0,
        decorators: [{
          type: Inject,
          args: [DOCUMENT]
        }]
      }]
    });
    By = class {
      static all() {
        return () => true;
      }
      static css(selector) {
        return (debugElement) => {
          return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
        };
      }
      static directive(type) {
        return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
      }
    };
    CssVarNamespacer = class _CssVarNamespacer {
      namespacePrefix = inject(CSS_VAR_NAMESPACE, {
        optional: true
      }) ?? "";
      namespace(name) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          if (!name.startsWith("--")) {
            throw new Error(`CSS variable names passed to \`CssVarNamespacer\` must start with '--', got: '${name}'`);
          }
        }
        if (!this.namespacePrefix) return name;
        return `--${this.namespacePrefix}${name.substring("--".length)}`;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _CssVarNamespacer,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _CssVarNamespacer
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: CssVarNamespacer,
      decorators: [{
        type: Service
      }]
    });
    (function(HydrationFeatureKind2) {
      HydrationFeatureKind2[HydrationFeatureKind2["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
      HydrationFeatureKind2[HydrationFeatureKind2["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
      HydrationFeatureKind2[HydrationFeatureKind2["I18nSupport"] = 2] = "I18nSupport";
      HydrationFeatureKind2[HydrationFeatureKind2["EventReplay"] = 3] = "EventReplay";
      HydrationFeatureKind2[HydrationFeatureKind2["IncrementalHydration"] = 4] = "IncrementalHydration";
      HydrationFeatureKind2[HydrationFeatureKind2["NoIncrementalHydration"] = 5] = "NoIncrementalHydration";
    })(HydrationFeatureKind || (HydrationFeatureKind = {}));
    DomSanitizer = class _DomSanitizer {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DomSanitizer,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DomSanitizer,
        providedIn: "root",
        useExisting: forwardRef(() => DomSanitizerImpl)
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: DomSanitizer,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root",
          useExisting: forwardRef(() => DomSanitizerImpl)
        }]
      }]
    });
    DomSanitizerImpl = class _DomSanitizerImpl extends DomSanitizer {
      _doc = inject(DOCUMENT);
      sanitize(ctx, value) {
        if (value == null) return null;
        switch (ctx) {
          case SecurityContext.NONE:
            return value;
          case SecurityContext.HTML:
            if (allowSanitizationBypassAndThrow(value, "HTML")) {
              return unwrapSafeValue(value);
            }
            return _sanitizeHtml(this._doc, String(value)).toString();
          case SecurityContext.STYLE:
            if (allowSanitizationBypassAndThrow(value, "Style")) {
              return unwrapSafeValue(value);
            }
            return value;
          case SecurityContext.SCRIPT:
            if (allowSanitizationBypassAndThrow(value, "Script")) {
              return unwrapSafeValue(value);
            }
            throw new RuntimeError(5200, (typeof ngDevMode === "undefined" || ngDevMode) && "unsafe value used in a script context");
          case SecurityContext.URL:
            if (allowSanitizationBypassAndThrow(value, "URL")) {
              return unwrapSafeValue(value);
            }
            return _sanitizeUrl(String(value));
          case SecurityContext.RESOURCE_URL:
            if (allowSanitizationBypassAndThrow(value, "ResourceURL")) {
              return unwrapSafeValue(value);
            }
            throw new RuntimeError(-5201, (typeof ngDevMode === "undefined" || ngDevMode) && `unsafe value used in a resource URL context (see ${XSS_SECURITY_URL})`);
          default:
            throw new RuntimeError(5202, (typeof ngDevMode === "undefined" || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${XSS_SECURITY_URL})`);
        }
      }
      bypassSecurityTrustHtml(value) {
        return bypassSanitizationTrustHtml(value);
      }
      bypassSecurityTrustStyle(value) {
        return bypassSanitizationTrustStyle(value);
      }
      bypassSecurityTrustScript(value) {
        return bypassSanitizationTrustScript(value);
      }
      bypassSecurityTrustUrl(value) {
        return bypassSanitizationTrustUrl(value);
      }
      bypassSecurityTrustResourceUrl(value) {
        return bypassSanitizationTrustResourceUrl(value);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DomSanitizerImpl,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DomSanitizerImpl
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: DomSanitizerImpl,
      decorators: [{
        type: Service
      }]
    });
  }
});

// node_modules/@angular/router/fesm2022/_router-chunk.mjs
function convertToParamMap(params) {
  return new ParamsAsMap(params);
}
function matchParts(routeParts, urlSegments, posParams) {
  for (let i = 0; i < routeParts.length; i++) {
    const part = routeParts[i];
    const segment = urlSegments[i];
    const isParameter = part[0] === ":";
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      return false;
    }
  }
  return true;
}
function defaultUrlMatcher(segments, segmentGroup, route) {
  const parts = route.path.split("/");
  const wildcardIndex = parts.indexOf("**");
  if (wildcardIndex === -1) {
    if (parts.length > segments.length) {
      return null;
    }
    if (route.pathMatch === "full" && (segmentGroup.hasChildren() || parts.length < segments.length)) {
      return null;
    }
    const posParams2 = {};
    const consumed = segments.slice(0, parts.length);
    if (!matchParts(parts, consumed, posParams2)) {
      return null;
    }
    return {
      consumed,
      posParams: posParams2
    };
  }
  if (wildcardIndex !== parts.lastIndexOf("**")) {
    return null;
  }
  const pre = parts.slice(0, wildcardIndex);
  const post = parts.slice(wildcardIndex + 1);
  if (pre.length + post.length > segments.length) {
    return null;
  }
  if (route.pathMatch === "full" && segmentGroup.hasChildren() && route.path !== "**") {
    return null;
  }
  const posParams = {};
  if (!matchParts(pre, segments.slice(0, pre.length), posParams)) {
    return null;
  }
  if (!matchParts(post, segments.slice(segments.length - post.length), posParams)) {
    return null;
  }
  return {
    consumed: segments,
    posParams
  };
}
function firstValueFrom(source) {
  return new Promise((resolve, reject) => {
    source.pipe(first()).subscribe({
      next: (value) => resolve(value),
      error: (err) => reject(err)
    });
  });
}
function shallowEqualArrays(a2, b2) {
  if (a2.length !== b2.length) return false;
  for (let i = 0; i < a2.length; ++i) {
    if (!shallowEqual(a2[i], b2[i])) return false;
  }
  return true;
}
function shallowEqual(a2, b2) {
  const k1 = a2 ? getDataKeys(a2) : void 0;
  const k2 = b2 ? getDataKeys(b2) : void 0;
  if (!k1 || !k2 || k1.length != k2.length) {
    return false;
  }
  let key;
  for (let i = 0; i < k1.length; i++) {
    key = k1[i];
    if (!equalArraysOrString(a2[key], b2[key])) {
      return false;
    }
  }
  return true;
}
function getDataKeys(obj) {
  return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function equalArraysOrString(a2, b2) {
  if (Array.isArray(a2) && Array.isArray(b2)) {
    if (a2.length !== b2.length) return false;
    const aSorted = [...a2].sort();
    const bSorted = [...b2].sort();
    return aSorted.every((val, index) => bSorted[index] === val);
  } else {
    return a2 === b2;
  }
}
function last(a2) {
  return a2.length > 0 ? a2[a2.length - 1] : null;
}
function wrapIntoObservable(value) {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  return of(value);
}
function wrapIntoPromise(value) {
  if (isObservable(value)) {
    return firstValueFrom(value);
  }
  return Promise.resolve(value);
}
function isActive(url, router, matchOptions) {
  const urlTree = url instanceof UrlTree ? url : router.parseUrl(url);
  return computed(() => containsTree(router.lastSuccessfulNavigation()?.finalUrl ?? new UrlTree(), urlTree, matchOptions));
}
function containsTree(container, containee, options) {
  const matchOptions = __spreadValues(__spreadValues({}, subsetMatchOptions), options || {});
  return pathCompareMap[matchOptions.paths](container.root, containee.root, matchOptions.matrixParams) && paramCompareMap[matchOptions.queryParams](container.queryParams, containee.queryParams) && !(matchOptions.fragment === "exact" && container.fragment !== containee.fragment);
}
function equalParams(container, containee) {
  return shallowEqual(container, containee);
}
function equalSegmentGroups(container, containee, matrixParams) {
  if (!equalPath(container.segments, containee.segments)) return false;
  if (!matrixParamsMatch(container.segments, containee.segments, matrixParams)) {
    return false;
  }
  if (container.numberOfChildren !== containee.numberOfChildren) return false;
  for (const c3 in containee.children) {
    if (!container.children[c3]) return false;
    if (!equalSegmentGroups(container.children[c3], containee.children[c3], matrixParams)) return false;
  }
  return true;
}
function containsParams(container, containee) {
  return Object.keys(containee).length <= Object.keys(container).length && Object.keys(containee).every((key) => equalArraysOrString(container[key], containee[key]));
}
function containsSegmentGroup(container, containee, matrixParams) {
  return containsSegmentGroupHelper(container, containee, containee.segments, matrixParams);
}
function containsSegmentGroupHelper(container, containee, containeePaths, matrixParams) {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths)) return false;
    if (containee.hasChildren()) return false;
    if (!matrixParamsMatch(current, containeePaths, matrixParams)) return false;
    return true;
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths)) return false;
    if (!matrixParamsMatch(container.segments, containeePaths, matrixParams)) return false;
    for (const c3 in containee.children) {
      if (!container.children[c3]) return false;
      if (!containsSegmentGroup(container.children[c3], containee.children[c3], matrixParams)) {
        return false;
      }
    }
    return true;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current)) return false;
    if (!matrixParamsMatch(container.segments, current, matrixParams)) return false;
    if (!container.children[PRIMARY_OUTLET]) return false;
    return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next, matrixParams);
  }
}
function matrixParamsMatch(containerPaths, containeePaths, options) {
  return containeePaths.every((containeeSegment, i) => {
    return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
  });
}
function equalSegments(as, bs) {
  return equalPath(as, bs) && as.every((a2, i) => shallowEqual(a2.parameters, bs[i].parameters));
}
function equalPath(as, bs) {
  if (as.length !== bs.length) return false;
  return as.every((a2, i) => a2.path === bs[i].path);
}
function mapChildrenIntoArray(segment, fn) {
  let res = [];
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet === PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  Object.entries(segment.children).forEach(([childOutlet, child]) => {
    if (childOutlet !== PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  return res;
}
function isProtocolRelative(url) {
  try {
    const resolved = new URL(url, DUMMY_BASE_URL);
    return resolved.origin !== DUMMY_BASE_URL || resolved.pathname.startsWith("//");
  } catch (e2) {
    return true;
  }
}
function serializePaths(segment) {
  return segment.segments.map((p2) => serializePath(p2)).join("/");
}
function serializeSegment(segment, root) {
  if (!segment.hasChildren()) {
    return serializePaths(segment);
  }
  if (root) {
    const primary = segment.children[PRIMARY_OUTLET] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : "";
    const children = [];
    Object.entries(segment.children).forEach(([k, v]) => {
      if (k !== PRIMARY_OUTLET) {
        children.push(`${k}:${serializeSegment(v, false)}`);
      }
    });
    return children.length > 0 ? `${primary}(${children.join("//")})` : primary;
  } else {
    const children = mapChildrenIntoArray(segment, (v, k) => {
      if (k === PRIMARY_OUTLET) {
        return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
      }
      return [`${k}:${serializeSegment(v, false)}`];
    });
    if (Object.keys(segment.children).length === 1 && segment.children[PRIMARY_OUTLET] != null) {
      return `${serializePaths(segment)}/${children[0]}`;
    }
    return `${serializePaths(segment)}/(${children.join("//")})`;
  }
}
function encodeUriString(s3) {
  return encodeURIComponent(s3).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
}
function encodeUriQuery(s3) {
  return encodeUriString(s3).replace(/%3B/gi, ";");
}
function encodeUriFragment(s3) {
  return encodeURI(s3);
}
function encodeUriSegment(s3) {
  return encodeUriString(s3).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
}
function decode(s3) {
  return decodeURIComponent(s3);
}
function decodeQuery(s3) {
  return decode(s3.replace(/\+/g, "%20"));
}
function serializePath(path) {
  return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
}
function serializeMatrixParams(params) {
  return Object.entries(params).map(([key, value]) => `;${encodeUriSegment(key)}=${encodeUriSegment(value)}`).join("");
}
function serializeQueryParams(params) {
  const strParams = Object.entries(params).map(([name, value]) => {
    return Array.isArray(value) ? value.map((v) => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join("&") : `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
  }).filter((s3) => s3);
  return strParams.length ? `?${strParams.join("&")}` : "";
}
function setUrlDerivedKey(target, key, value) {
  if (Number(key) >= 32 && !Object.hasOwn(target, SLOW_ELEMENTS_SENTINEL)) {
    target[SLOW_ELEMENTS_SENTINEL] = value;
    delete target[SLOW_ELEMENTS_SENTINEL];
  }
  target[key] = value;
}
function matchSegments(str) {
  const match2 = str.match(SEGMENT_RE);
  return match2 ? match2[0] : "";
}
function matchMatrixKeySegments(str) {
  const match2 = str.match(MATRIX_PARAM_SEGMENT_RE);
  return match2 ? match2[0] : "";
}
function matchQueryParams(str) {
  const match2 = str.match(QUERY_PARAM_RE);
  return match2 ? match2[0] : "";
}
function matchUrlQueryParamValue(str) {
  const match2 = str.match(QUERY_PARAM_VALUE_RE);
  return match2 ? match2[0] : "";
}
function createRoot(rootCandidate) {
  return rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], {
    [PRIMARY_OUTLET]: rootCandidate
  }) : rootCandidate;
}
function squashSegmentGroup(segmentGroup) {
  const newChildren = /* @__PURE__ */ Object.create(null);
  for (const [childOutlet, child] of Object.entries(segmentGroup.children)) {
    const childCandidate = squashSegmentGroup(child);
    if (childOutlet === PRIMARY_OUTLET && childCandidate.segments.length === 0 && childCandidate.hasChildren()) {
      for (const [grandChildOutlet, grandChild] of Object.entries(childCandidate.children)) {
        setUrlDerivedKey(newChildren, grandChildOutlet, grandChild);
      }
    } else if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) {
      setUrlDerivedKey(newChildren, childOutlet, childCandidate);
    }
  }
  const s3 = new UrlSegmentGroup(segmentGroup.segments, newChildren);
  return mergeTrivialChildren(s3);
}
function mergeTrivialChildren(s3) {
  if (s3.numberOfChildren === 1 && s3.children[PRIMARY_OUTLET]) {
    const c3 = s3.children[PRIMARY_OUTLET];
    return new UrlSegmentGroup(s3.segments.concat(c3.segments), c3.children);
  }
  return s3;
}
function isUrlTree(v) {
  return v instanceof UrlTree;
}
function createUrlTreeFromSnapshot(relativeTo, commands, queryParams = null, fragment = null, urlSerializer = new DefaultUrlSerializer()) {
  const relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeTo);
  return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, queryParams, fragment, urlSerializer);
}
function createSegmentGroupFromRoute(route) {
  let targetGroup;
  function createSegmentGroupFromRouteRecursive(currentRoute) {
    const childOutlets = {};
    for (const childSnapshot of currentRoute.children) {
      const root = createSegmentGroupFromRouteRecursive(childSnapshot);
      childOutlets[childSnapshot.outlet] = root;
    }
    const segmentGroup = new UrlSegmentGroup(currentRoute.url, childOutlets);
    if (currentRoute === route) {
      targetGroup = segmentGroup;
    }
    return segmentGroup;
  }
  const rootCandidate = createSegmentGroupFromRouteRecursive(route.root);
  const rootSegmentGroup = createRoot(rootCandidate);
  return targetGroup ?? rootSegmentGroup;
}
function createUrlTreeFromSegmentGroup(relativeTo, commands, queryParams, fragment, urlSerializer) {
  let root = relativeTo;
  while (root.parent) {
    root = root.parent;
  }
  if (commands.length === 0) {
    return tree(root, root, root, queryParams, fragment, urlSerializer);
  }
  const nav = computeNavigation(commands);
  if (nav.toRoot()) {
    return tree(root, root, new UrlSegmentGroup([], {}), queryParams, fragment, urlSerializer);
  }
  const position = findStartingPositionForTargetGroup(nav, root, relativeTo);
  const newSegmentGroup = position.processChildren ? updateSegmentGroupChildren(position.segmentGroup, position.index, nav.commands) : updateSegmentGroup(position.segmentGroup, position.index, nav.commands);
  return tree(root, position.segmentGroup, newSegmentGroup, queryParams, fragment, urlSerializer);
}
function isMatrixParams(command) {
  return typeof command === "object" && command != null && !command.outlets && !command.segmentPath;
}
function isCommandWithOutlets(command) {
  return typeof command === "object" && command != null && command.outlets;
}
function normalizeQueryParams(k, v, urlSerializer) {
  k ||= "\u0275";
  const tree2 = new UrlTree();
  tree2.queryParams = {
    [k]: v
  };
  return urlSerializer.parse(urlSerializer.serialize(tree2)).queryParams[k];
}
function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment, urlSerializer) {
  const qp = {};
  for (const [key, value] of Object.entries(queryParams ?? {})) {
    qp[key] = Array.isArray(value) ? value.map((v) => normalizeQueryParams(key, v, urlSerializer)) : normalizeQueryParams(key, value, urlSerializer);
  }
  let rootCandidate;
  if (oldRoot === oldSegmentGroup) {
    rootCandidate = newSegmentGroup;
  } else {
    rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
  }
  const newRoot = createRoot(squashSegmentGroup(rootCandidate));
  return new UrlTree(newRoot, qp, fragment);
}
function replaceSegment(current, oldSegment, newSegment) {
  const children = /* @__PURE__ */ Object.create(null);
  Object.entries(current.children).forEach(([outletName, c3]) => {
    if (c3 === oldSegment) {
      children[outletName] = newSegment;
    } else {
      children[outletName] = replaceSegment(c3, oldSegment, newSegment);
    }
  });
  return new UrlSegmentGroup(current.segments, children);
}
function computeNavigation(commands) {
  if (typeof commands[0] === "string" && commands.length === 1 && commands[0] === "/") {
    return new Navigation(true, 0, commands);
  }
  let numberOfDoubleDots = 0;
  let isAbsolute = false;
  const res = commands.reduce((res2, cmd, cmdIdx) => {
    if (typeof cmd === "object" && cmd != null) {
      if (cmd.outlets) {
        const outlets = {};
        Object.entries(cmd.outlets).forEach(([name, commands2]) => {
          outlets[name] = typeof commands2 === "string" ? commands2.split("/") : commands2;
        });
        return [...res2, {
          outlets
        }];
      }
      if (cmd.segmentPath) {
        return [...res2, cmd.segmentPath];
      }
    }
    if (!(typeof cmd === "string")) {
      return [...res2, cmd];
    }
    if (cmdIdx === 0) {
      cmd.split("/").forEach((urlPart, partIndex) => {
        if (partIndex == 0 && urlPart === ".") ;
        else if (partIndex == 0 && urlPart === "") {
          isAbsolute = true;
        } else if (urlPart === "..") {
          numberOfDoubleDots++;
        } else if (urlPart != "") {
          res2.push(urlPart);
        }
      });
      return res2;
    }
    return [...res2, cmd];
  }, []);
  return new Navigation(isAbsolute, numberOfDoubleDots, res);
}
function findStartingPositionForTargetGroup(nav, root, target) {
  if (nav.isAbsolute) {
    return new Position(root, true, 0);
  }
  if (!target) {
    return new Position(root, false, NaN);
  }
  if (target.parent === null) {
    return new Position(target, true, 0);
  }
  const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
  const index = target.segments.length - 1 + modifier;
  return createPositionApplyingDoubleDots(target, index, nav.numberOfDoubleDots);
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
  let g2 = group;
  let ci = index;
  let dd = numberOfDoubleDots;
  while (dd > ci) {
    dd -= ci;
    g2 = g2.parent;
    if (!g2) {
      throw new RuntimeError(4005, (typeof ngDevMode === "undefined" || ngDevMode) && "Invalid number of '../'");
    }
    ci = g2.segments.length;
  }
  return new Position(g2, false, ci - dd);
}
function getOutlets(commands) {
  if (isCommandWithOutlets(commands[0])) {
    return commands[0].outlets;
  }
  return {
    [PRIMARY_OUTLET]: commands
  };
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
  segmentGroup ??= new UrlSegmentGroup([], {});
  if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
    return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
  }
  const m2 = prefixedWith(segmentGroup, startIndex, commands);
  const slicedCommands = commands.slice(m2.commandIndex);
  if (m2.match && m2.pathIndex < segmentGroup.segments.length) {
    const g2 = new UrlSegmentGroup(segmentGroup.segments.slice(0, m2.pathIndex), {});
    g2.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m2.pathIndex), segmentGroup.children);
    return updateSegmentGroupChildren(g2, 0, slicedCommands);
  } else if (m2.match && slicedCommands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else if (m2.match && !segmentGroup.hasChildren()) {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  } else if (m2.match) {
    return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
  } else {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  }
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
  if (commands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else {
    const outlets = getOutlets(commands);
    const children = /* @__PURE__ */ Object.create(null);
    if (Object.keys(outlets).some((o2) => o2 !== PRIMARY_OUTLET) && segmentGroup.children[PRIMARY_OUTLET] && segmentGroup.numberOfChildren === 1 && segmentGroup.children[PRIMARY_OUTLET].segments.length === 0) {
      const childrenOfEmptyChild = updateSegmentGroupChildren(segmentGroup.children[PRIMARY_OUTLET], startIndex, commands);
      return new UrlSegmentGroup(segmentGroup.segments, childrenOfEmptyChild.children);
    }
    Object.entries(outlets).forEach(([outlet, commands2]) => {
      if (typeof commands2 === "string") {
        commands2 = [commands2];
      }
      if (commands2 !== null) {
        children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands2);
      }
    });
    Object.entries(segmentGroup.children).forEach(([childOutlet, child]) => {
      if (outlets[childOutlet] === void 0) {
        children[childOutlet] = child;
      }
    });
    return new UrlSegmentGroup(segmentGroup.segments, children);
  }
}
function prefixedWith(segmentGroup, startIndex, commands) {
  let currentCommandIndex = 0;
  let currentPathIndex = startIndex;
  const noMatch2 = {
    match: false,
    pathIndex: 0,
    commandIndex: 0
  };
  while (currentPathIndex < segmentGroup.segments.length) {
    if (currentCommandIndex >= commands.length) return noMatch2;
    const path = segmentGroup.segments[currentPathIndex];
    const command = commands[currentCommandIndex];
    if (isCommandWithOutlets(command)) {
      break;
    }
    const curr = `${command}`;
    const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
    if (currentPathIndex > 0 && curr === void 0) break;
    if (curr && next && typeof next === "object" && next.outlets === void 0) {
      if (!compare(curr, next, path)) return noMatch2;
      currentCommandIndex += 2;
    } else {
      if (!compare(curr, {}, path)) return noMatch2;
      currentCommandIndex++;
    }
    currentPathIndex++;
  }
  return {
    match: true,
    pathIndex: currentPathIndex,
    commandIndex: currentCommandIndex
  };
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
  const paths = segmentGroup.segments.slice(0, startIndex);
  let i = 0;
  while (i < commands.length) {
    const command = commands[i];
    if (isCommandWithOutlets(command)) {
      const children = createNewSegmentChildren(command.outlets);
      return new UrlSegmentGroup(paths, children);
    }
    if (i === 0 && isMatrixParams(commands[0])) {
      const p2 = segmentGroup.segments[startIndex];
      paths.push(new UrlSegment(p2.path, stringify(commands[0])));
      i++;
      continue;
    }
    const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
    const next = i < commands.length - 1 ? commands[i + 1] : null;
    if (curr && next && isMatrixParams(next)) {
      paths.push(new UrlSegment(curr, stringify(next)));
      i += 2;
    } else {
      paths.push(new UrlSegment(curr, {}));
      i++;
    }
  }
  return new UrlSegmentGroup(paths, {});
}
function createNewSegmentChildren(outlets) {
  const children = {};
  Object.entries(outlets).forEach(([outlet, commands]) => {
    if (typeof commands === "string") {
      commands = [commands];
    }
    if (commands !== null) {
      children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
    }
  });
  return children;
}
function stringify(params) {
  const res = {};
  Object.entries(params).forEach(([k, v]) => res[k] = `${v}`);
  return res;
}
function compare(path, params, segment) {
  return path == segment.path && shallowEqual(params, segment.parameters);
}
function findNode(value, node) {
  if (value === node.value) return node;
  for (const child of node.children) {
    const node2 = findNode(value, child);
    if (node2) return node2;
  }
  return null;
}
function findPath(value, node) {
  if (value === node.value) return [node];
  for (const child of node.children) {
    const path = findPath(value, child);
    if (path.length) {
      path.unshift(node);
      return path;
    }
  }
  return [];
}
function nodeChildrenAsMap(node) {
  const map2 = {};
  if (node) {
    node.children.forEach((child) => map2[child.value.outlet] = child);
  }
  return map2;
}
function createEmptyState(rootComponent, injector) {
  const snapshot = createEmptyStateSnapshot(rootComponent, injector);
  const emptyUrl = new BehaviorSubject([new UrlSegment("", {})]);
  const emptyParams = new BehaviorSubject({});
  const emptyData = new BehaviorSubject({});
  const emptyQueryParams = new BehaviorSubject({});
  const fragment = new BehaviorSubject("");
  const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
  activated.snapshot = snapshot.root;
  return new RouterState(new TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(rootComponent, injector) {
  const emptyParams = {};
  const emptyData = {};
  const emptyQueryParams = {};
  const fragment = "";
  const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, {}, injector);
  return new RouterStateSnapshot("", new TreeNode(activated, []));
}
function getInherited(route, parent, paramsInheritanceStrategy) {
  let inherited;
  const {
    routeConfig
  } = route;
  if (parent !== null && (paramsInheritanceStrategy === "always" || routeConfig?.path === "" || !parent.component && !parent.routeConfig?.loadComponent)) {
    inherited = {
      params: Object.keys(route.params).length === 0 ? parent.params : Object.freeze(__spreadValues(__spreadValues({}, parent.params), route.params)),
      data: Object.freeze(__spreadValues(__spreadValues({}, parent.data), route.data)),
      resolve: __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, route.data), parent.data), routeConfig?.data), route._resolvedData)
    };
  } else {
    inherited = {
      params: Object.freeze(__spreadValues({}, route.params)),
      data: Object.freeze(__spreadValues({}, route.data)),
      resolve: __spreadValues(__spreadValues({}, route.data), route._resolvedData ?? {})
    };
  }
  if (routeConfig && hasStaticTitle(routeConfig)) {
    inherited.resolve[RouteTitleKey] = routeConfig.title;
  }
  return inherited;
}
function setRouterState(state, node) {
  node.value._routerState = state;
  node.children.forEach((c3) => setRouterState(state, c3));
}
function serializeNode(node) {
  const c3 = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(", ")} } ` : "";
  return `${node.value}${c3}`;
}
function advanceActivatedRoute(route) {
  if (route.snapshot) {
    const currentSnapshot = route.snapshot;
    const nextSnapshot = route._futureSnapshot;
    route.snapshot = nextSnapshot;
    if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
      route.queryParamsSubject.next(nextSnapshot.queryParams);
    }
    if (currentSnapshot.fragment !== nextSnapshot.fragment) {
      route.fragmentSubject.next(nextSnapshot.fragment);
    }
    if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
      route.paramsSubject.next(nextSnapshot.params);
    }
    if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
      route.urlSubject.next(nextSnapshot.url);
    }
    if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
      route.dataSubject.next(nextSnapshot.data);
    }
  } else {
    route.snapshot = route._futureSnapshot;
    route.dataSubject.next(route._futureSnapshot.data);
  }
}
function equalParamsAndUrlSegments(a2, b2) {
  const equalUrlParams = shallowEqual(a2.params, b2.params) && equalSegments(a2.url, b2.url);
  const parentsMismatch = !a2.parent !== !b2.parent;
  return equalUrlParams && !parentsMismatch && (!a2.parent || equalParamsAndUrlSegments(a2.parent, b2.parent));
}
function hasStaticTitle(config) {
  return typeof config.title === "string" || config.title === null;
}
function standardizeConfig(r2) {
  const children = r2.children && r2.children.map(standardizeConfig);
  const c3 = children ? __spreadProps(__spreadValues({}, r2), {
    children
  }) : __spreadValues({}, r2);
  if (!c3.component && !c3.loadComponent && (children || c3.loadChildren) && c3.outlet && c3.outlet !== PRIMARY_OUTLET) {
    c3.component = \u0275EmptyOutletComponent;
  }
  return c3;
}
function isRedirectingEvent(event) {
  return event instanceof NavigationCancel && (event.code === NavigationCancellationCode.Redirect || event.code === NavigationCancellationCode.SupersededByNewNavigation);
}
function isPublicRouterEvent(e2) {
  return !(e2 instanceof BeforeActivateRoutes) && !(e2 instanceof RedirectRequest) && !(e2 instanceof BeforeRoutesRecognized);
}
function stringifyEvent(routerEvent) {
  switch (routerEvent.type) {
    case EventType.ActivationEnd:
      return `ActivationEnd(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ActivationStart:
      return `ActivationStart(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ChildActivationEnd:
      return `ChildActivationEnd(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.ChildActivationStart:
      return `ChildActivationStart(path: '${routerEvent.snapshot.routeConfig?.path || ""}')`;
    case EventType.GuardsCheckEnd:
      return `GuardsCheckEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state}, shouldActivate: ${routerEvent.shouldActivate})`;
    case EventType.GuardsCheckStart:
      return `GuardsCheckStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.NavigationCancel:
      return `NavigationCancel(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.NavigationSkipped:
      return `NavigationSkipped(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.NavigationEnd:
      return `NavigationEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}')`;
    case EventType.NavigationError:
      return `NavigationError(id: ${routerEvent.id}, url: '${routerEvent.url}', error: ${routerEvent.error})`;
    case EventType.NavigationStart:
      return `NavigationStart(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
    case EventType.ResolveEnd:
      return `ResolveEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.ResolveStart:
      return `ResolveStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.RouteConfigLoadEnd:
      return `RouteConfigLoadEnd(path: ${routerEvent.route.path})`;
    case EventType.RouteConfigLoadStart:
      return `RouteConfigLoadStart(path: ${routerEvent.route.path})`;
    case EventType.RoutesRecognized:
      return `RoutesRecognized(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
    case EventType.Scroll:
      const pos = routerEvent.position ? `${routerEvent.position[0]}, ${routerEvent.position[1]}` : null;
      return `Scroll(anchor: '${routerEvent.anchor}', position: '${pos}')`;
  }
}
function createRouterState(routeReuseStrategy, curr, prevState) {
  const newlyCreatedRoutes = /* @__PURE__ */ new Set();
  const root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : void 0, newlyCreatedRoutes);
  return {
    newlyCreatedRoutes,
    state: new RouterState(root, curr)
  };
}
function createNode(routeReuseStrategy, curr, prevState, newlyCreatedRoutes) {
  if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
    const value = prevState.value;
    value._setPending(curr.value);
    const children = createOrReuseChildren(routeReuseStrategy, curr, prevState, newlyCreatedRoutes);
    return new TreeNode(value, children);
  } else {
    if (routeReuseStrategy.shouldAttach(curr.value)) {
      const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
      if (detachedRouteHandle !== null) {
        const tree2 = detachedRouteHandle.route;
        tree2.value._setPending(curr.value);
        tree2.children = curr.children.map((c3) => createNode(routeReuseStrategy, c3, void 0, newlyCreatedRoutes));
        return tree2;
      }
    }
    const value = createActivatedRoute(curr.value);
    value._setPending(curr.value);
    newlyCreatedRoutes.add(value);
    const children = curr.children.map((c3) => createNode(routeReuseStrategy, c3, void 0, newlyCreatedRoutes));
    return new TreeNode(value, children);
  }
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState, newlyCreatedRoutes) {
  return curr.children.map((child) => {
    for (const p2 of prevState.children) {
      if (routeReuseStrategy.shouldReuseRoute(child.value, p2.value.snapshot)) {
        return createNode(routeReuseStrategy, child, p2, newlyCreatedRoutes);
      }
    }
    return createNode(routeReuseStrategy, child, void 0, newlyCreatedRoutes);
  });
}
function createActivatedRoute(c3) {
  return new ActivatedRoute(new BehaviorSubject(c3.url), new BehaviorSubject(c3.params), new BehaviorSubject(c3.queryParams), new BehaviorSubject(c3.fragment), new BehaviorSubject(c3.data), c3.outlet, c3.component, c3);
}
function redirectingNavigationError(urlSerializer, redirect) {
  const {
    redirectTo,
    navigationBehaviorOptions
  } = isUrlTree(redirect) ? {
    redirectTo: redirect,
    navigationBehaviorOptions: void 0
  } : redirect;
  const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, NavigationCancellationCode.Redirect);
  error.url = redirectTo;
  error.navigationBehaviorOptions = navigationBehaviorOptions;
  return error;
}
function navigationCancelingError(message, code) {
  const error = new Error(`NavigationCancelingError: ${message || ""}`);
  error[NAVIGATION_CANCELING_ERROR] = true;
  error.cancellationCode = code;
  return error;
}
function isRedirectingNavigationCancelingError(error) {
  return isNavigationCancelingError(error) && isUrlTree(error.url);
}
function isNavigationCancelingError(error) {
  return !!error && error[NAVIGATION_CANCELING_ERROR];
}
function getAllRouteGuards(future, curr, parentContexts) {
  const futureRoot = future._root;
  const currRoot = curr ? curr._root : null;
  return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
function getCanActivateChild(p2) {
  const canActivateChild = p2.routeConfig ? p2.routeConfig.canActivateChild : null;
  if (!canActivateChild || canActivateChild.length === 0) return null;
  return {
    node: p2,
    guards: canActivateChild
  };
}
function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
  const NOT_FOUND = /* @__PURE__ */ Symbol();
  const result = injector.get(tokenOrFunction, NOT_FOUND);
  if (result === NOT_FOUND) {
    if (typeof tokenOrFunction === "function" && !isInjectable(tokenOrFunction)) {
      return tokenOrFunction;
    } else {
      return injector.get(tokenOrFunction);
    }
  }
  return result;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const prevChildren = nodeChildrenAsMap(currNode);
  futureNode.children.forEach((c3) => {
    getRouteGuards(c3, prevChildren[c3.value.outlet], contexts, futurePath.concat([c3.value]), checks);
    delete prevChildren[c3.value.outlet];
  });
  Object.entries(prevChildren).forEach(([k, v]) => deactivateRouteAndItsChildren(v, contexts.getContext(k), contexts, checks));
  return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const future = futureNode.value;
  const curr = currNode ? currNode.value : null;
  const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
  if (curr && future.routeConfig === curr.routeConfig) {
    const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
    if (shouldRun) {
      checks.canActivateChecks.push(new CanActivate(futurePath));
    } else {
      future.data = curr.data;
      future._resolvedData = curr._resolvedData;
    }
    if (future.component) {
      getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
    }
    if (shouldRun && context && context.outlet && context.outlet.isActivated) {
      checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
    }
  } else {
    if (curr) {
      deactivateRouteAndItsChildren(currNode, context, parentContexts, checks);
    }
    checks.canActivateChecks.push(new CanActivate(futurePath));
    if (future.component) {
      getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
    }
  }
  return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
  if (typeof mode === "function") {
    return runInInjectionContext(future._environmentInjector, () => mode(curr, future));
  }
  switch (mode) {
    case "pathParamsChange":
      return !equalPath(curr.url, future.url);
    case "pathParamsOrQueryParamsChange":
      return !equalPath(curr.url, future.url) || !shallowEqual(curr.queryParams, future.queryParams);
    case "always":
      return true;
    case "paramsOrQueryParamsChange":
      return !equalParamsAndUrlSegments(curr, future) || !shallowEqual(curr.queryParams, future.queryParams);
    case "paramsChange":
    default:
      return !equalParamsAndUrlSegments(curr, future);
  }
}
function deactivateRouteAndItsChildren(route, context, parentContexts, checks) {
  const children = nodeChildrenAsMap(route);
  const r2 = route.value;
  Object.entries(children).forEach(([childName, node]) => {
    if (!r2.component) {
      deactivateRouteAndItsChildren(node, parentContexts ? parentContexts.getContext(childName) : null, parentContexts, checks);
    } else if (context) {
      deactivateRouteAndItsChildren(node, context.children.getContext(childName), context.children, checks);
    } else {
      deactivateRouteAndItsChildren(node, null, null, checks);
    }
  });
  if (!r2.component) {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r2));
  } else if (context && context.outlet && context.outlet.isActivated) {
    checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r2));
  } else {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r2));
  }
}
function isFunction(v) {
  return typeof v === "function";
}
function isBoolean(v) {
  return typeof v === "boolean";
}
function isCanLoad(guard) {
  return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
  return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
  return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
  return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
  return guard && isFunction(guard.canMatch);
}
function isEmptyError(e2) {
  return e2 instanceof EmptyError || e2?.name === "EmptyError";
}
function prioritizedGuardValue() {
  return switchMap((obs) => {
    return combineLatest(obs.map((o2) => o2.pipe(take(1), startWith(INITIAL_VALUE)))).pipe(map((results) => {
      for (const result of results) {
        if (result === true) {
          continue;
        } else if (result === INITIAL_VALUE) {
          return INITIAL_VALUE;
        } else if (result === false || isRedirect(result)) {
          return result;
        }
      }
      return true;
    }), filter((item) => item !== INITIAL_VALUE), take(1));
  });
}
function isRedirect(val) {
  return isUrlTree(val) || val instanceof RedirectCommand;
}
function abortSignalToObservable(signal2) {
  if (signal2.aborted) {
    return of(void 0).pipe(take(1));
  }
  return new Observable((subscriber) => {
    const handler = () => {
      subscriber.next();
      subscriber.complete();
    };
    signal2.addEventListener("abort", handler);
    return () => signal2.removeEventListener("abort", handler);
  });
}
function takeUntilAbort(signal2) {
  return takeUntil(abortSignalToObservable(signal2));
}
function checkGuards(forwardEvent) {
  return mergeMap((t2) => {
    const {
      targetSnapshot,
      currentSnapshot,
      guards: {
        canActivateChecks,
        canDeactivateChecks
      }
    } = t2;
    if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
      return of(__spreadProps(__spreadValues({}, t2), {
        guardsResult: true
      }));
    }
    return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot).pipe(mergeMap((canDeactivate) => {
      return canDeactivate && isBoolean(canDeactivate) ? runCanActivateChecks(targetSnapshot, canActivateChecks, forwardEvent) : of(canDeactivate);
    }), map((guardsResult) => __spreadProps(__spreadValues({}, t2), {
      guardsResult
    })));
  });
}
function runCanDeactivateChecks(checks, futureRSS, currRSS) {
  return from(checks).pipe(mergeMap((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS)), first((result) => {
    return result !== true;
  }, true));
}
function runCanActivateChecks(futureSnapshot, checks, forwardEvent) {
  return from(checks).pipe(concatMap((check) => {
    return concat(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path), runCanActivate(futureSnapshot, check.route));
  }), first((result) => {
    return result !== true;
  }, true));
}
function fireActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ActivationStart(snapshot));
  }
  return of(true);
}
function fireChildActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ChildActivationStart(snapshot));
  }
  return of(true);
}
function runCanActivate(futureRSS, futureARS) {
  const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
  if (!canActivate || canActivate.length === 0) return of(true);
  const canActivateObservables = canActivate.map((canActivate2) => {
    return defer(() => {
      const closestInjector = futureARS._environmentInjector;
      const guard = getTokenOrFunctionIdentity(canActivate2, closestInjector);
      const guardVal = isCanActivate(guard) ? guard.canActivate(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
      return wrapIntoObservable(guardVal).pipe(first());
    });
  });
  return of(canActivateObservables).pipe(prioritizedGuardValue());
}
function runCanActivateChild(futureRSS, path) {
  const futureARS = path[path.length - 1];
  const canActivateChildGuards = path.slice(0, path.length - 1).reverse().map((p2) => getCanActivateChild(p2)).filter((_) => _ !== null);
  const canActivateChildGuardsMapped = canActivateChildGuards.map((d3) => {
    return defer(() => {
      const guardsMapped = d3.guards.map((canActivateChild) => {
        const closestInjector = d3.node._environmentInjector;
        const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
        const guardVal = isCanActivateChild(guard) ? guard.canActivateChild(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS));
        return wrapIntoObservable(guardVal).pipe(first());
      });
      return of(guardsMapped).pipe(prioritizedGuardValue());
    });
  });
  return of(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS) {
  const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
  if (!canDeactivate || canDeactivate.length === 0) return of(true);
  const canDeactivateObservables = canDeactivate.map((c3) => {
    const closestInjector = currARS._environmentInjector;
    const guard = getTokenOrFunctionIdentity(c3, closestInjector);
    const guardVal = isCanDeactivate(guard) ? guard.canDeactivate(component, currARS, currRSS, futureRSS) : runInInjectionContext(closestInjector, () => guard(component, currARS, currRSS, futureRSS));
    return wrapIntoObservable(guardVal).pipe(first());
  });
  return of(canDeactivateObservables).pipe(prioritizedGuardValue());
}
function runCanLoadGuards(injector, route, segments, urlSerializer, abortSignal) {
  const canLoad = route.canLoad;
  if (canLoad === void 0 || canLoad.length === 0) {
    return of(true);
  }
  const canLoadObservables = canLoad.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanLoad(guard) ? guard.canLoad(route, segments) : runInInjectionContext(injector, () => guard(route, segments));
    const obs$ = wrapIntoObservable(guardVal);
    return abortSignal ? obs$.pipe(takeUntilAbort(abortSignal)) : obs$;
  });
  return of(canLoadObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function redirectIfUrlTree(urlSerializer) {
  return pipe(tap((result) => {
    if (typeof result === "boolean") return;
    throw redirectingNavigationError(urlSerializer, result);
  }), map((result) => result === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer, currentSnapshot, abortSignal) {
  const canMatch = route.canMatch;
  if (!canMatch || canMatch.length === 0) return of(true);
  const canMatchObservables = canMatch.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanMatch(guard) ? guard.canMatch(route, segments, currentSnapshot) : runInInjectionContext(injector, () => guard(route, segments, currentSnapshot));
    return wrapIntoObservable(guardVal).pipe(takeUntilAbort(abortSignal));
  });
  return of(canMatchObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function namedOutletsRedirect(redirectTo) {
  throw new RuntimeError(4e3, (typeof ngDevMode === "undefined" || ngDevMode) && `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`);
}
function canLoadFails(route) {
  throw navigationCancelingError((typeof ngDevMode === "undefined" || ngDevMode) && `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, NavigationCancellationCode.GuardRejected);
}
function getRedirectResult(redirectTo, currentSnapshot, injector) {
  if (typeof redirectTo === "string") {
    return Promise.resolve(redirectTo);
  }
  const redirectToFn = redirectTo;
  return firstValueFrom(wrapIntoObservable(runInInjectionContext(injector, () => redirectToFn(currentSnapshot))));
}
function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
  if (route.providers && !route._injector) {
    route._injector = createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
  }
  return route._injector ?? currentInjector;
}
function validateConfig(config, parentPath = "", requireStandaloneComponents = false) {
  for (let i = 0; i < config.length; i++) {
    const route = config[i];
    const fullPath = getFullPath(parentPath, route);
    validateNode(route, fullPath, requireStandaloneComponents);
  }
}
function assertStandalone(fullPath, component) {
  if (component && isNgModule(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. You are using 'loadComponent' with a module, but it must be used with standalone components. Use 'loadChildren' instead.`);
  } else if (component && !isStandalone(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
  }
}
function validateNode(route, fullPath, requireStandaloneComponents) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!route) {
      throw new RuntimeError(4014, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
    }
    if (Array.isArray(route)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
    }
    if (!route.redirectTo && !route.component && !route.loadComponent && !route.children && !route.loadChildren && route.outlet && route.outlet !== PRIMARY_OUTLET) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
    }
    if (route.redirectTo && route.children) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
    }
    if (route.redirectTo && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
    }
    if (route.children && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
    }
    if (route.component && route.loadComponent) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
    }
    if (route.redirectTo) {
      if (route.component || route.loadComponent) {
        throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
      }
      if (route.canMatch || route.canActivate) {
        throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and ${route.canMatch ? "canMatch" : "canActivate"} cannot be used together.Redirects happen before guards are executed.`);
      }
    }
    if (route.path && route.matcher) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
    }
    if (route.redirectTo === void 0 && !route.component && !route.loadComponent && !route.children && !route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
    }
    if (route.path === void 0 && route.matcher === void 0) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
    }
    if (typeof route.path === "string" && route.path.charAt(0) === "/") {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
    }
    if (route.path === "" && route.redirectTo !== void 0 && route.pathMatch === void 0) {
      const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
      throw new RuntimeError(4014, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
    }
    if (requireStandaloneComponents) {
      assertStandalone(fullPath, route.component);
    }
  }
  if (route.children) {
    validateConfig(route.children, fullPath, requireStandaloneComponents);
  }
}
function getFullPath(parentPath, currentRoute) {
  if (!currentRoute) {
    return parentPath;
  }
  if (!parentPath && !currentRoute.path) {
    return "";
  } else if (parentPath && !currentRoute.path) {
    return `${parentPath}/`;
  } else if (!parentPath && currentRoute.path) {
    return currentRoute.path;
  } else {
    return `${parentPath}/${currentRoute.path}`;
  }
}
function getOutlet(route) {
  return route.outlet || PRIMARY_OUTLET;
}
function sortByMatchingOutlets(routes, outletName) {
  const sortedConfig = routes.filter((r2) => getOutlet(r2) === outletName);
  sortedConfig.push(...routes.filter((r2) => getOutlet(r2) !== outletName));
  return sortedConfig;
}
function createPreMatchRouteSnapshot(snapshot) {
  return {
    routeConfig: snapshot.routeConfig,
    url: snapshot.url,
    params: snapshot.params,
    queryParams: snapshot.queryParams,
    fragment: snapshot.fragment,
    data: snapshot.data,
    outlet: snapshot.outlet,
    title: snapshot.title,
    paramMap: snapshot.paramMap,
    queryParamMap: snapshot.queryParamMap
  };
}
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer, createSnapshot, abortSignal) {
  const result = match(segmentGroup, route, segments);
  if (!result.matched) {
    return of(result);
  }
  const currentSnapshot = createPreMatchRouteSnapshot(createSnapshot(result));
  injector = getOrCreateRouteInjectorIfNeeded(route, injector);
  return runCanMatchGuards(injector, route, segments, urlSerializer, currentSnapshot, abortSignal).pipe(map((v) => v === true ? result : __spreadValues({}, noMatch)));
}
function match(segmentGroup, route, segments) {
  if (route.path === "") {
    if (route.pathMatch === "full" && (segmentGroup.hasChildren() || segments.length > 0)) {
      return __spreadValues({}, noMatch);
    }
    return {
      matched: true,
      consumedSegments: [],
      remainingSegments: segments,
      parameters: {},
      positionalParamSegments: {}
    };
  }
  const matcher = route.matcher || defaultUrlMatcher;
  const res = matcher(segments, segmentGroup, route);
  if (!res) return __spreadValues({}, noMatch);
  const posParams = {};
  Object.entries(res.posParams ?? {}).forEach(([k, v]) => {
    posParams[k] = v.path;
  });
  const parameters = res.consumed.length > 0 ? __spreadValues(__spreadValues({}, posParams), res.consumed[res.consumed.length - 1].parameters) : posParams;
  return {
    matched: true,
    consumedSegments: res.consumed,
    remainingSegments: segments.slice(res.consumed.length),
    parameters,
    positionalParamSegments: res.posParams ?? {}
  };
}
function split(segmentGroup, consumedSegments, slicedSegments, config, outlet) {
  if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config, outlet)) {
    const s4 = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
    return {
      segmentGroup: s4,
      slicedSegments: []
    };
  }
  if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
    const s4 = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
    return {
      segmentGroup: s4,
      slicedSegments
    };
  }
  const s3 = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
  return {
    segmentGroup: s3,
    slicedSegments
  };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
  const res = {};
  for (const r2 of routes) {
    if (emptyPathMatch(segmentGroup, slicedSegments, r2) && !children[getOutlet(r2)]) {
      const s3 = new UrlSegmentGroup([], {});
      res[getOutlet(r2)] = s3;
    }
  }
  return __spreadValues(__spreadValues({}, children), res);
}
function createChildrenForEmptyPaths(routes, primarySegment) {
  const res = {};
  res[PRIMARY_OUTLET] = primarySegment;
  for (const r2 of routes) {
    if (r2.path === "" && getOutlet(r2) !== PRIMARY_OUTLET) {
      const s3 = new UrlSegmentGroup([], {});
      res[getOutlet(r2)] = s3;
    }
  }
  return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes, outlet) {
  return routes.some((r2) => {
    const matchesEmpty = emptyPathMatch(segmentGroup, slicedSegments, r2);
    if (!matchesEmpty) return false;
    const isNamedOutlet = getOutlet(r2) !== PRIMARY_OUTLET;
    if (!isNamedOutlet) return false;
    const isSelfEvaluating = outlet !== void 0 && getOutlet(r2) === outlet;
    return !isSelfEvaluating;
  });
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
  return routes.some((r2) => emptyPathMatch(segmentGroup, slicedSegments, r2));
}
function emptyPathMatch(segmentGroup, slicedSegments, r2) {
  if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r2.pathMatch === "full") {
    return false;
  }
  return r2.path === "";
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
  return segments.length === 0 && !segmentGroup.hasChildren();
}
function recognize$1(injector, configLoader, rootComponentType, config, urlTree, urlSerializer, paramsInheritanceStrategy, abortSignal) {
  return __async(this, null, function* () {
    return new Recognizer(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer, abortSignal).recognize();
  });
}
function sortActivatedRouteSnapshots(nodes) {
  nodes.sort((a2, b2) => {
    if (a2.value.outlet === PRIMARY_OUTLET) return -1;
    if (b2.value.outlet === PRIMARY_OUTLET) return 1;
    return a2.value.outlet.localeCompare(b2.value.outlet);
  });
}
function hasEmptyPathConfig(node) {
  const config = node.value.routeConfig;
  return config && config.path === "";
}
function mergeEmptyPathMatches(nodes) {
  const result = [];
  const mergedNodes = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    if (!hasEmptyPathConfig(node)) {
      result.push(node);
      continue;
    }
    const duplicateEmptyPathNode = result.find((resultNode) => node.value.routeConfig === resultNode.value.routeConfig);
    if (duplicateEmptyPathNode !== void 0) {
      duplicateEmptyPathNode.children.push(...node.children);
      mergedNodes.add(duplicateEmptyPathNode);
    } else {
      result.push(node);
    }
  }
  for (const mergedNode of mergedNodes) {
    const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
    result.push(new TreeNode(mergedNode.value, mergedChildren));
  }
  const merged = result.filter((n2) => !mergedNodes.has(n2));
  checkOutletNameUniqueness(merged);
  return merged;
}
function checkOutletNameUniqueness(nodes) {
  const names = /* @__PURE__ */ Object.create(null);
  nodes.forEach((n2) => {
    const routeWithSameOutletName = names[n2.value.outlet];
    if (routeWithSameOutletName) {
      const p2 = routeWithSameOutletName.url.map((s3) => s3.toString()).join("/");
      const c3 = n2.value.url.map((s3) => s3.toString()).join("/");
      throw new RuntimeError(4006, (typeof ngDevMode === "undefined" || ngDevMode) && `Two segments cannot have the same outlet name: '${p2}' and '${c3}'.`);
    }
    names[n2.value.outlet] = n2.value;
  });
}
function getData(route) {
  return route.data || {};
}
function getResolve(route) {
  return route.resolve || {};
}
function recognize(injector, configLoader, rootComponentType, config, serializer, paramsInheritanceStrategy, abortSignal) {
  return mergeMap((t2) => __async(null, null, function* () {
    const {
      state: targetSnapshot,
      tree: urlAfterRedirects
    } = yield recognize$1(injector, configLoader, rootComponentType, config, t2.extractedUrl, serializer, paramsInheritanceStrategy, abortSignal);
    return __spreadProps(__spreadValues({}, t2), {
      targetSnapshot,
      urlAfterRedirects
    });
  }));
}
function resolveData(paramsInheritanceStrategy) {
  return mergeMap((t2) => {
    const {
      targetSnapshot,
      guards: {
        canActivateChecks
      }
    } = t2;
    if (!canActivateChecks.length) {
      return of(t2);
    }
    const routesWithResolversToRun = new Set(canActivateChecks.map((check) => check.route));
    const routesNeedingDataUpdates = /* @__PURE__ */ new Set();
    for (const route of routesWithResolversToRun) {
      if (routesNeedingDataUpdates.has(route)) {
        continue;
      }
      for (const newRoute of flattenRouteTree(route)) {
        routesNeedingDataUpdates.add(newRoute);
      }
    }
    let routesProcessed = 0;
    return from(routesNeedingDataUpdates).pipe(concatMap((route) => {
      if (routesWithResolversToRun.has(route)) {
        return runResolve(route, targetSnapshot, paramsInheritanceStrategy);
      } else {
        route.data = getInherited(route, route.parent, paramsInheritanceStrategy).resolve;
        return of(void 0);
      }
    }), tap(() => routesProcessed++), takeLast(1), mergeMap((_) => routesProcessed === routesNeedingDataUpdates.size ? of(t2) : EMPTY));
  });
}
function flattenRouteTree(route) {
  const descendants = route.children.map((child) => flattenRouteTree(child)).flat();
  return [route, ...descendants];
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy) {
  const config = futureARS.routeConfig;
  const resolve = futureARS._resolve;
  if (config?.title !== void 0 && !hasStaticTitle(config)) {
    resolve[RouteTitleKey] = config.title;
  }
  return defer(() => {
    futureARS.data = getInherited(futureARS, futureARS.parent, paramsInheritanceStrategy).resolve;
    return resolveNode(resolve, futureARS, futureRSS).pipe(map((resolvedData) => {
      futureARS._resolvedData = resolvedData;
      futureARS.data = __spreadValues(__spreadValues({}, futureARS.data), resolvedData);
      return null;
    }));
  });
}
function resolveNode(resolve, futureARS, futureRSS) {
  const keys = getDataKeys(resolve);
  if (keys.length === 0) {
    return of({});
  }
  const data = {};
  return from(keys).pipe(mergeMap((key) => getResolver(resolve[key], futureARS, futureRSS).pipe(first(), tap((value) => {
    if (value instanceof RedirectCommand) {
      throw redirectingNavigationError(new DefaultUrlSerializer(), value);
    }
    data[key] = value;
  }))), takeLast(1), map(() => data), catchError((e2) => isEmptyError(e2) ? EMPTY : throwError(e2)));
}
function getResolver(injectionToken, futureARS, futureRSS) {
  const closestInjector = futureARS._environmentInjector;
  const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
  const resolverValue = resolver.resolve ? resolver.resolve(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => resolver(futureARS, futureRSS));
  return wrapIntoObservable(resolverValue);
}
function switchTap(next) {
  return switchMap((v) => {
    const nextResult = next(v);
    if (nextResult) {
      return from(nextResult).pipe(map(() => v));
    }
    return of(v);
  });
}
function loadChildren(route, compiler, parentInjector, onLoadEndListener) {
  return __async(this, null, function* () {
    const loaded = yield wrapIntoPromise(runInInjectionContext(parentInjector, () => route.loadChildren()));
    const t2 = yield maybeResolveResources(maybeUnwrapDefaultExport(loaded));
    let factoryOrRoutes;
    if (t2 instanceof NgModuleFactory$1 || Array.isArray(t2)) {
      factoryOrRoutes = t2;
    } else {
      factoryOrRoutes = yield compiler.compileModuleAsync(t2);
    }
    if (onLoadEndListener) {
      onLoadEndListener(route);
    }
    let injector;
    let rawRoutes;
    let requireStandaloneComponents = false;
    let factory = void 0;
    if (Array.isArray(factoryOrRoutes)) {
      rawRoutes = factoryOrRoutes;
      requireStandaloneComponents = true;
    } else {
      injector = factoryOrRoutes.create(parentInjector).injector;
      factory = factoryOrRoutes;
      rawRoutes = injector.get(ROUTES, [], {
        optional: true,
        self: true
      }).flat();
    }
    const routes = rawRoutes.map(standardizeConfig);
    (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(routes, route.path, requireStandaloneComponents);
    return {
      routes,
      injector,
      factory
    };
  });
}
function maybeResolveResources(value) {
  return __async(this, null, function* () {
    if (typeof fetch === "function") {
      try {
        yield resolveComponentResources(fetch);
      } catch (error) {
        console.error(error);
      }
    }
    return value;
  });
}
function createViewTransition(injector, from2, to, hasUAVisualTransition) {
  const transitionOptions = injector.get(VIEW_TRANSITION_OPTIONS);
  const document = injector.get(DOCUMENT);
  if (hasUAVisualTransition) {
    transitionOptions.skipNextTransition = false;
    return;
  }
  if (!document.startViewTransition || transitionOptions.skipNextTransition) {
    transitionOptions.skipNextTransition = false;
    return new Promise((resolve) => setTimeout(resolve));
  }
  let resolveViewTransitionStarted;
  const viewTransitionStarted = new Promise((resolve) => {
    resolveViewTransitionStarted = resolve;
  });
  const transition = document.startViewTransition(() => {
    resolveViewTransitionStarted();
    return createRenderPromise(injector);
  });
  transition.updateCallbackDone.catch((error) => {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.error(error);
    }
  });
  transition.ready.catch((error) => {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.error(error);
    }
  });
  transition.finished.catch((error) => {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.error(error);
    }
  });
  const {
    onViewTransitionCreated
  } = transitionOptions;
  if (onViewTransitionCreated) {
    runInInjectionContext(injector, () => onViewTransitionCreated({
      transition,
      from: from2,
      to
    }));
  }
  return viewTransitionStarted;
}
function createRenderPromise(injector) {
  return new Promise((resolve) => {
    afterNextRender({
      read: () => setTimeout(resolve)
    }, {
      injector
    });
  });
}
function isBrowserTriggeredNavigation(source) {
  return source !== IMPERATIVE_NAVIGATION;
}
function rollbackState(t2) {
  for (const r2 of t2.newlyCreatedRoutes ?? []) {
    r2._localInjector?.destroy();
    r2._localInjector = void 0;
  }
  resetPendingRoutes(t2.targetRouterState);
}
function resetPendingRoutes(targetRouterState) {
  if (!targetRouterState) {
    return;
  }
  const traverse = (node) => {
    node.value.pending?.set(false);
    node.children.forEach(traverse);
  };
  traverse(targetRouterState._root);
}
function afterNextNavigation(router, action) {
  router.events.pipe(filter((e2) => e2 instanceof NavigationEnd || e2 instanceof NavigationCancel || e2 instanceof NavigationError || e2 instanceof NavigationSkipped), map((e2) => {
    if (e2 instanceof NavigationEnd || e2 instanceof NavigationSkipped) {
      return 0;
    }
    const redirecting = e2 instanceof NavigationCancel ? e2.code === NavigationCancellationCode.Redirect || e2.code === NavigationCancellationCode.SupersededByNewNavigation : false;
    return redirecting ? 2 : 1;
  }), filter((result) => result !== 2), take(1)).subscribe(() => {
    action();
  });
}
function validateCommands(commands) {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new RuntimeError(4008, (typeof ngDevMode === "undefined" || ngDevMode) && `The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
var PRIMARY_OUTLET, RouteTitleKey, ParamsAsMap, pathCompareMap, paramCompareMap, exactMatchOptions, subsetMatchOptions, UrlTree, UrlSegmentGroup, UrlSegment, UrlSerializer, DefaultUrlSerializer, DUMMY_BASE_URL, DEFAULT_SERIALIZER, SLOW_ELEMENTS_SENTINEL, SEGMENT_RE, MATRIX_PARAM_SEGMENT_RE, QUERY_PARAM_RE, QUERY_PARAM_VALUE_RE, UrlParser, Navigation, Position, OutletContext, ChildrenOutletContexts, Tree, TreeNode, RouterState, ActivatedRoute, DEFAULT_PARAMS_INHERITANCE_STRATEGY, ActivatedRouteSnapshot, RouterStateSnapshot, ROUTER_OUTLET_DATA, RouterOutlet, OutletInjector, INPUT_BINDER, RoutedComponentInputBinder, \u0275EmptyOutletComponent, IMPERATIVE_NAVIGATION, EventType, RouterEvent, NavigationStart, NavigationEnd, NavigationCancellationCode, NavigationSkippedCode, NavigationCancel, NavigationSkipped, NavigationError, RoutesRecognized, GuardsCheckStart, GuardsCheckEnd, ResolveStart, ResolveEnd, RouteConfigLoadStart, RouteConfigLoadEnd, ChildActivationStart, ChildActivationEnd, ActivationStart, ActivationEnd, Scroll, BeforeActivateRoutes, BeforeRoutesRecognized, RedirectRequest, RedirectCommand, NAVIGATION_CANCELING_ERROR, warnedAboutUnsupportedInputBinding, ActivateRoutes, CanActivate, CanDeactivate, INITIAL_VALUE, NoMatch, AbsoluteRedirect, ApplyRedirects, noMatch, NoLeftoversInUrl, MAX_ALLOWED_REDIRECTS, Recognizer, ROUTER_RESOURCES_FEATURE, TitleStrategy, DefaultTitleStrategy, ROUTER_CONFIGURATION, ROUTES, RouterConfigLoader, UrlHandlingStrategy, DefaultUrlHandlingStrategy, CREATE_VIEW_TRANSITION, VIEW_TRANSITION_OPTIONS, noop2, NAVIGATION_ERROR_HANDLER, NavigationTransitions, ROUTE_INJECTOR_CLEANUP, RouteReuseStrategy, BaseRouteReuseStrategy, DefaultRouteReuseStrategy, StateManager, HistoryStateManager, Router;
var init_router_chunk = __esm({
  "node_modules/@angular/router/fesm2022/_router-chunk.mjs"() {
    init_common();
    init_core();
    init_core();
    init_esm();
    init_operators();
    init_platform_browser();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    PRIMARY_OUTLET = "primary";
    RouteTitleKey = /* @__PURE__ */ Symbol("RouteTitle");
    ParamsAsMap = class {
      params;
      constructor(params) {
        this.params = params || {};
      }
      has(name) {
        return Object.hasOwn(this.params, name);
      }
      get(name) {
        if (this.has(name)) {
          const v = this.params[name];
          return Array.isArray(v) ? v[0] : v;
        }
        return null;
      }
      getAll(name) {
        if (this.has(name)) {
          const v = this.params[name];
          return Array.isArray(v) ? v : [v];
        }
        return [];
      }
      get keys() {
        return Object.keys(this.params);
      }
    };
    pathCompareMap = {
      "exact": equalSegmentGroups,
      "subset": containsSegmentGroup
    };
    paramCompareMap = {
      "exact": equalParams,
      "subset": containsParams,
      "ignored": () => true
    };
    exactMatchOptions = {
      paths: "exact",
      fragment: "ignored",
      matrixParams: "ignored",
      queryParams: "exact"
    };
    subsetMatchOptions = {
      paths: "subset",
      fragment: "ignored",
      matrixParams: "ignored",
      queryParams: "subset"
    };
    UrlTree = class {
      root;
      queryParams;
      fragment;
      _queryParamMap;
      constructor(root = new UrlSegmentGroup([], {}), queryParams = {}, fragment = null) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          if (root.segments.length > 0) {
            throw new RuntimeError(4015, "The root `UrlSegmentGroup` should not contain `segments`. Instead, these segments belong in the `children` so they can be associated with a named outlet.");
          }
        }
      }
      get queryParamMap() {
        this._queryParamMap ??= convertToParamMap(this.queryParams);
        return this._queryParamMap;
      }
      toString() {
        return DEFAULT_SERIALIZER.serialize(this);
      }
    };
    UrlSegmentGroup = class {
      segments;
      children;
      parent = null;
      constructor(segments, children) {
        this.segments = segments;
        this.children = children;
        Object.values(children).forEach((v) => v.parent = this);
      }
      hasChildren() {
        return this.numberOfChildren > 0;
      }
      get numberOfChildren() {
        return Object.keys(this.children).length;
      }
      toString() {
        return serializePaths(this);
      }
    };
    UrlSegment = class {
      path;
      parameters;
      _parameterMap;
      constructor(path, parameters) {
        this.path = path;
        this.parameters = parameters;
      }
      get parameterMap() {
        this._parameterMap ??= convertToParamMap(this.parameters);
        return this._parameterMap;
      }
      toString() {
        return serializePath(this);
      }
    };
    UrlSerializer = class _UrlSerializer {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _UrlSerializer,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _UrlSerializer,
        factory: () => new DefaultUrlSerializer()
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: UrlSerializer,
      decorators: [{
        type: Service,
        args: [{
          factory: () => new DefaultUrlSerializer()
        }]
      }]
    });
    DefaultUrlSerializer = class {
      parse(url) {
        const p2 = new UrlParser(url);
        return new UrlTree(p2.parseRootSegment(), p2.parseQueryParams(), p2.parseFragment());
      }
      serialize(tree2) {
        let segment = `/${serializeSegment(tree2.root, true)}`;
        if (isProtocolRelative(segment)) {
          if (typeof ngDevMode === "undefined" || ngDevMode) {
            console.warn(formatRuntimeError(4019, `Cannot serialize a UrlTree that would produce a protocol-relative URL. Falling back to '/' instead.`));
          }
          segment = "/";
        }
        const query = serializeQueryParams(tree2.queryParams);
        const fragment = typeof tree2.fragment === `string` ? `#${encodeUriFragment(tree2.fragment)}` : "";
        return `${segment}${query}${fragment}`;
      }
    };
    DUMMY_BASE_URL = "http://fake";
    DEFAULT_SERIALIZER = new DefaultUrlSerializer();
    SLOW_ELEMENTS_SENTINEL = 1073741824;
    SEGMENT_RE = /^[^\/()?;#]+/;
    MATRIX_PARAM_SEGMENT_RE = /^[^\/()?;=#]+/;
    QUERY_PARAM_RE = /^[^=?&#]+/;
    QUERY_PARAM_VALUE_RE = /^[^&#]+/;
    UrlParser = class {
      url;
      remaining;
      constructor(url) {
        this.url = url;
        this.remaining = url;
      }
      parseRootSegment() {
        while (this.consumeOptional("/")) {
        }
        if (this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#")) {
          return new UrlSegmentGroup([], {});
        }
        return new UrlSegmentGroup([], this.parseChildren());
      }
      parseQueryParams() {
        const params = {};
        if (this.consumeOptional("?")) {
          do {
            this.parseQueryParam(params);
          } while (this.consumeOptional("&"));
        }
        return params;
      }
      parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
      }
      parseChildren(depth = 0) {
        if (depth > 50) {
          throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && "URL is too deep");
        }
        if (this.remaining === "") {
          return {};
        }
        this.consumeOptional("/");
        const segments = [];
        if (!this.peekStartsWith("(")) {
          segments.push(this.parseSegment());
        }
        while (this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(")) {
          this.capture("/");
          segments.push(this.parseSegment());
        }
        let children = {};
        if (this.peekStartsWith("/(")) {
          this.capture("/");
          children = this.parseParens(true, depth);
        }
        let res = {};
        if (this.peekStartsWith("(")) {
          res = this.parseParens(false, depth);
        }
        if (segments.length > 0 || Object.keys(children).length > 0) {
          res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
        }
        return res;
      }
      parseSegment() {
        const path = matchSegments(this.remaining);
        if (path === "" && this.peekStartsWith(";")) {
          throw new RuntimeError(4009, (typeof ngDevMode === "undefined" || ngDevMode) && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
        }
        this.capture(path);
        return new UrlSegment(decode(path), this.parseMatrixParams());
      }
      parseMatrixParams() {
        const params = {};
        while (this.consumeOptional(";")) {
          this.parseParam(params);
        }
        return params;
      }
      parseParam(params) {
        const key = matchMatrixKeySegments(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        let value = "";
        if (this.consumeOptional("=")) {
          const valueMatch = matchSegments(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        setUrlDerivedKey(params, decode(key), decode(value));
      }
      parseQueryParam(params) {
        const key = matchQueryParams(this.remaining);
        if (!key) {
          return;
        }
        this.capture(key);
        let value = "";
        if (this.consumeOptional("=")) {
          const valueMatch = matchUrlQueryParamValue(this.remaining);
          if (valueMatch) {
            value = valueMatch;
            this.capture(value);
          }
        }
        const decodedKey = decodeQuery(key);
        const decodedVal = decodeQuery(value);
        if (Object.hasOwn(params, decodedKey)) {
          let currentVal = params[decodedKey];
          if (!Array.isArray(currentVal)) {
            currentVal = [currentVal];
            params[decodedKey] = currentVal;
          }
          currentVal.push(decodedVal);
        } else {
          params[decodedKey] = decodedVal;
        }
      }
      parseParens(allowPrimary, depth) {
        const segments = /* @__PURE__ */ Object.create(null);
        this.capture("(");
        while (!this.consumeOptional(")") && this.remaining.length > 0) {
          const path = matchSegments(this.remaining);
          const next = this.remaining[path.length];
          if (next !== "/" && next !== ")" && next !== ";") {
            throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot parse url '${this.url}'`);
          }
          let outletName;
          if (path.indexOf(":") > -1) {
            outletName = path.slice(0, path.indexOf(":"));
            this.capture(outletName);
            this.capture(":");
          } else if (allowPrimary) {
            outletName = PRIMARY_OUTLET;
          }
          const children = this.parseChildren(depth + 1);
          const child = Object.keys(children).length === 1 && children[PRIMARY_OUTLET] ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
          setUrlDerivedKey(segments, outletName ?? PRIMARY_OUTLET, child);
          this.consumeOptional("//");
        }
        return segments;
      }
      peekStartsWith(str) {
        return this.remaining.startsWith(str);
      }
      consumeOptional(str) {
        if (this.peekStartsWith(str)) {
          this.remaining = this.remaining.substring(str.length);
          return true;
        }
        return false;
      }
      capture(str) {
        if (!this.consumeOptional(str)) {
          throw new RuntimeError(4011, (typeof ngDevMode === "undefined" || ngDevMode) && `Expected "${str}".`);
        }
      }
    };
    Navigation = class {
      isAbsolute;
      numberOfDoubleDots;
      commands;
      constructor(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
        if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
          throw new RuntimeError(4003, (typeof ngDevMode === "undefined" || ngDevMode) && "Root segment cannot have matrix parameters");
        }
        const cmdWithOutlet = commands.find(isCommandWithOutlets);
        if (cmdWithOutlet && cmdWithOutlet !== last(commands)) {
          throw new RuntimeError(4004, (typeof ngDevMode === "undefined" || ngDevMode) && "{outlets:{}} has to be the last command");
        }
      }
      toRoot() {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/";
      }
    };
    Position = class {
      segmentGroup;
      processChildren;
      index;
      constructor(segmentGroup, processChildren, index) {
        this.segmentGroup = segmentGroup;
        this.processChildren = processChildren;
        this.index = index;
      }
    };
    OutletContext = class {
      rootInjector;
      outlet = null;
      route = null;
      children;
      attachRef = null;
      get injector() {
        return this.route?.snapshot._environmentInjector ?? this.rootInjector;
      }
      constructor(rootInjector) {
        this.rootInjector = rootInjector;
        this.children = new ChildrenOutletContexts(this.rootInjector);
      }
      resetChildren() {
        this.children = new ChildrenOutletContexts(this.rootInjector);
      }
    };
    ChildrenOutletContexts = class _ChildrenOutletContexts {
      rootInjector;
      contexts = /* @__PURE__ */ new Map();
      constructor(rootInjector) {
        this.rootInjector = rootInjector;
      }
      onChildOutletCreated(childName, outlet) {
        const context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
      }
      onChildOutletDestroyed(childName) {
        const context = this.getContext(childName);
        if (context) {
          context.outlet = null;
          context.attachRef = null;
        }
      }
      onOutletDeactivated() {
        const contexts = this.contexts;
        this.contexts = /* @__PURE__ */ new Map();
        return contexts;
      }
      onOutletReAttached(contexts) {
        this.contexts = contexts;
      }
      getOrCreateContext(childName) {
        let context = this.getContext(childName);
        if (!context) {
          context = new OutletContext(this.rootInjector);
          this.contexts.set(childName, context);
        }
        return context;
      }
      getContext(childName) {
        return this.contexts.get(childName) || null;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _ChildrenOutletContexts,
        deps: [{
          token: EnvironmentInjector
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _ChildrenOutletContexts,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: ChildrenOutletContexts,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: EnvironmentInjector
      }]
    });
    Tree = class {
      _root;
      constructor(root) {
        this._root = root;
      }
      get root() {
        return this._root.value;
      }
      parent(t2) {
        const p2 = this.pathFromRoot(t2);
        return p2.length > 1 ? p2[p2.length - 2] : null;
      }
      children(t2) {
        const n2 = findNode(t2, this._root);
        return n2 ? n2.children.map((t3) => t3.value) : [];
      }
      firstChild(t2) {
        const n2 = findNode(t2, this._root);
        return n2 && n2.children.length > 0 ? n2.children[0].value : null;
      }
      siblings(t2) {
        const p2 = findPath(t2, this._root);
        if (p2.length < 2) return [];
        const c3 = p2[p2.length - 2].children.map((c4) => c4.value);
        return c3.filter((cc) => cc !== t2);
      }
      pathFromRoot(t2) {
        return findPath(t2, this._root).map((s3) => s3.value);
      }
    };
    TreeNode = class {
      value;
      children;
      constructor(value, children) {
        this.value = value;
        this.children = children;
      }
      toString() {
        return `TreeNode(${this.value})`;
      }
    };
    RouterState = class extends Tree {
      snapshot;
      constructor(root, snapshot) {
        super(root);
        this.snapshot = snapshot;
        setRouterState(this, root);
      }
      toString() {
        return this.snapshot.toString();
      }
    };
    ActivatedRoute = class {
      urlSubject;
      paramsSubject;
      queryParamsSubject;
      fragmentSubject;
      dataSubject;
      outlet;
      component;
      snapshot;
      _futureSnapshot;
      _routerState;
      _paramMap;
      _queryParamMap;
      title;
      url;
      params;
      queryParams;
      fragment;
      data;
      resources;
      _localInjector;
      pending;
      paramsSignal;
      queryParamsSignal;
      paramMapSignal;
      queryParamMapSignal;
      fragmentSignal;
      dataSignal;
      constructor(urlSubject, paramsSubject, queryParamsSubject, fragmentSubject, dataSubject, outlet, component, futureSnapshot) {
        this.urlSubject = urlSubject;
        this.paramsSubject = paramsSubject;
        this.queryParamsSubject = queryParamsSubject;
        this.fragmentSubject = fragmentSubject;
        this.dataSubject = dataSubject;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
        this.title = this.dataSubject?.pipe(map((d3) => d3[RouteTitleKey])) ?? of(void 0);
        this.url = urlSubject;
        this.params = paramsSubject;
        this.queryParams = queryParamsSubject;
        this.fragment = fragmentSubject;
        this.data = dataSubject;
      }
      get routeConfig() {
        return this._futureSnapshot.routeConfig;
      }
      get root() {
        return this._routerState.root;
      }
      get parent() {
        return this._routerState.parent(this);
      }
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      get children() {
        return this._routerState.children(this);
      }
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      get paramMap() {
        this._paramMap ??= this.params.pipe(map((p2) => convertToParamMap(p2)));
        return this._paramMap;
      }
      get queryParamMap() {
        this._queryParamMap ??= this.queryParams.pipe(map((p2) => convertToParamMap(p2)));
        return this._queryParamMap;
      }
      toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
      }
      _setPending(snapshot) {
        this._futureSnapshot = snapshot;
        this.pending?.set(true);
      }
    };
    DEFAULT_PARAMS_INHERITANCE_STRATEGY = "always";
    ActivatedRouteSnapshot = class {
      url;
      params;
      queryParams;
      fragment;
      data;
      outlet;
      component;
      routeConfig;
      _resolve;
      _resolvedData;
      _routerState;
      _paramMap;
      _queryParamMap;
      _environmentInjector;
      resources;
      get title() {
        return this.data?.[RouteTitleKey];
      }
      constructor(url, params, queryParams, fragment, data, outlet, component, routeConfig, resolve, environmentInjector) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this.routeConfig = routeConfig;
        this._resolve = resolve;
        this._environmentInjector = environmentInjector;
      }
      get root() {
        return this._routerState.root;
      }
      get parent() {
        return this._routerState.parent(this);
      }
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      get children() {
        return this._routerState.children(this);
      }
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      get paramMap() {
        this._paramMap ??= convertToParamMap(this.params);
        return this._paramMap;
      }
      get queryParamMap() {
        this._queryParamMap ??= convertToParamMap(this.queryParams);
        return this._queryParamMap;
      }
      toString() {
        const url = this.url.map((segment) => segment.toString()).join("/");
        const matched = this.routeConfig ? this.routeConfig.path : "";
        return `Route(url:'${url}', path:'${matched}')`;
      }
    };
    RouterStateSnapshot = class extends Tree {
      url;
      constructor(url, root) {
        super(root);
        this.url = url;
        setRouterState(this, root);
      }
      toString() {
        return serializeNode(this._root);
      }
    };
    ROUTER_OUTLET_DATA = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "RouterOutlet data" : "");
    RouterOutlet = class _RouterOutlet {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = PRIMARY_OUTLET;
      activateEvents = new EventEmitter();
      deactivateEvents = new EventEmitter();
      attachEvents = new EventEmitter();
      detachEvents = new EventEmitter();
      routerOutletData = input(...ngDevMode ? [void 0, {
        debugName: "routerOutletData"
      }] : []);
      parentContexts = inject(ChildrenOutletContexts);
      location = inject(ViewContainerRef);
      changeDetector = inject(ChangeDetectorRef);
      inputBinder = inject(INPUT_BINDER, {
        optional: true
      });
      supportsBindingToComponentInputs = true;
      ngOnChanges(changes) {
        if (changes["name"]) {
          const {
            firstChange,
            previousValue
          } = changes["name"];
          if (firstChange) {
            return;
          }
          if (this.isTrackedInParentContexts(previousValue)) {
            this.deactivate();
            this.parentContexts.onChildOutletDestroyed(previousValue);
          }
          this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        if (this.isTrackedInParentContexts(this.name)) {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
        this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(outletName) {
        return this.parentContexts.getContext(outletName)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        this.parentContexts.onChildOutletCreated(this.name, this);
        if (this.activated) {
          return;
        }
        const context = this.parentContexts.getContext(this.name);
        if (context?.route) {
          if (context.attachRef) {
            this.attach(context.attachRef, context.route);
          } else {
            this.activateWith(context.route, context.injector);
          }
        }
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        return this._activatedRoute;
      }
      get activatedRouteData() {
        if (this._activatedRoute) {
          return this._activatedRoute.snapshot.data;
        }
        return {};
      }
      detach() {
        if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
        this.location.detach();
        const cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        this.detachEvents.emit(cmp.instance);
        return cmp;
      }
      attach(ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
        this.inputBinder?.bindActivatedRouteToOutletComponent(this, this.location.injector);
        this.attachEvents.emit(ref.instance);
      }
      deactivate() {
        if (this.activated) {
          const c3 = this.component;
          this.activated.destroy();
          this.activated = null;
          this._activatedRoute = null;
          this.deactivateEvents.emit(c3);
        }
      }
      activateWith(activatedRoute, environmentInjector) {
        if (this.isActivated) {
          throw new RuntimeError(4013, (typeof ngDevMode === "undefined" || ngDevMode) && "Cannot activate an already activated outlet");
        }
        this._activatedRoute = activatedRoute;
        const location = this.location;
        const snapshot = activatedRoute.snapshot;
        const component = snapshot.component;
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, location.injector, this.routerOutletData);
        this.activated = location.createComponent(component, {
          index: location.length,
          injector,
          environmentInjector
        });
        this.changeDetector.markForCheck();
        this.inputBinder?.bindActivatedRouteToOutletComponent(this, this.location.injector);
        this.activateEvents.emit(this.activated.instance);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterOutlet,
        deps: [],
        target: FactoryTarget.Directive
      });
      static \u0275dir = \u0275\u0275ngDeclareDirective({
        minVersion: "17.1.0",
        version: "22.2.2",
        type: _RouterOutlet,
        isStandalone: true,
        selector: "router-outlet",
        inputs: {
          name: {
            classPropertyName: "name",
            publicName: "name",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          routerOutletData: {
            classPropertyName: "routerOutletData",
            publicName: "routerOutletData",
            isSignal: true,
            isRequired: false,
            transformFunction: null
          }
        },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach"
        },
        exportAs: ["outlet"],
        usesOnChanges: true,
        ngImport: core_exports
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterOutlet,
      decorators: [{
        type: Directive,
        args: [{
          selector: "router-outlet",
          exportAs: "outlet"
        }]
      }],
      propDecorators: {
        name: [{
          type: Input
        }],
        activateEvents: [{
          type: Output,
          args: ["activate"]
        }],
        deactivateEvents: [{
          type: Output,
          args: ["deactivate"]
        }],
        attachEvents: [{
          type: Output,
          args: ["attach"]
        }],
        detachEvents: [{
          type: Output,
          args: ["detach"]
        }],
        routerOutletData: [{
          type: Input,
          args: [{
            isSignal: true,
            alias: "routerOutletData",
            required: false
          }]
        }]
      }
    });
    OutletInjector = class {
      route;
      childContexts;
      parent;
      outletData;
      constructor(route, childContexts, parent, outletData) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
        this.outletData = outletData;
      }
      get(token, notFoundValue) {
        if (token === ActivatedRoute) {
          return this.route;
        }
        if (token === ChildrenOutletContexts) {
          return this.childContexts;
        }
        if (token === ROUTER_OUTLET_DATA) {
          return this.outletData;
        }
        return this.parent.get(token, notFoundValue);
      }
    };
    INPUT_BINDER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "Router Input Binder" : "");
    RoutedComponentInputBinder = class _RoutedComponentInputBinder {
      options;
      feature;
      outletDataSubscriptions = /* @__PURE__ */ new Map();
      outletSeenKeys = /* @__PURE__ */ new Map();
      outletEffects = /* @__PURE__ */ new Map();
      constructor(options, feature = null) {
        this.options = options;
        this.feature = feature;
        this.options.queryParams ??= true;
      }
      bindActivatedRouteToOutletComponent(outlet, injector) {
        this.unsubscribeFromRouteData(outlet);
        this.subscribeToRouteData(outlet, injector);
      }
      unsubscribeFromRouteData(outlet) {
        this.outletDataSubscriptions.get(outlet)?.unsubscribe();
        this.outletDataSubscriptions.delete(outlet);
        this.outletSeenKeys.delete(outlet);
        this.outletEffects.get(outlet)?.forEach((effect2) => effect2.destroy());
        this.outletEffects.delete(outlet);
      }
      subscribeToRouteData(outlet, injector) {
        const {
          activatedRoute
        } = outlet;
        const effects = [];
        let keysBoundToBlockingResources = [];
        if (this.feature?.createResourceOutletBindingEffects && outlet.activatedComponentRef) {
          const {
            handledKeys,
            createdEffects
          } = this.feature.createResourceOutletBindingEffects(outlet.activatedComponentRef, activatedRoute);
          effects.push(...createdEffects);
          keysBoundToBlockingResources = handledKeys;
        }
        if (effects.length > 0) {
          this.outletEffects.set(outlet, effects);
        }
        const dataSubscription = combineLatest([this.options.queryParams ? activatedRoute.queryParams : of({}), activatedRoute.params, activatedRoute.data]).pipe(switchMap(([queryParams, params, data], index) => {
          data = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data), activatedRoute.resources);
          if (index === 0) {
            return of(data);
          }
          return Promise.resolve(data);
        })).subscribe((data) => {
          if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          const currentMirror = reflectComponentType(activatedRoute.component);
          if (!currentMirror) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          let seenKeys = this.outletSeenKeys.get(outlet);
          if (!seenKeys) {
            seenKeys = /* @__PURE__ */ new Set();
            this.outletSeenKeys.set(outlet, seenKeys);
          }
          for (const key of Object.keys(data)) {
            seenKeys.add(key);
          }
          const behavior = this.options.unmatchedInputBehavior ?? "alwaysUndefined";
          for (const {
            templateName
          } of currentMirror.inputs) {
            if (keysBoundToBlockingResources.includes(templateName)) {
              continue;
            }
            const value = data[templateName];
            if (value !== void 0 || behavior === "alwaysUndefined" || seenKeys.has(templateName)) {
              outlet.activatedComponentRef.setInput(templateName, value);
            }
          }
        });
        this.outletDataSubscriptions.set(outlet, dataSubscription);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RoutedComponentInputBinder,
        deps: "invalid",
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RoutedComponentInputBinder
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RoutedComponentInputBinder,
      decorators: [{
        type: Injectable
      }],
      ctorParameters: () => [{
        type: void 0
      }, {
        type: void 0
      }]
    });
    \u0275EmptyOutletComponent = class _\u0275EmptyOutletComponent {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _\u0275EmptyOutletComponent,
        deps: [],
        target: FactoryTarget.Component
      });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({
        minVersion: "14.0.0",
        version: "22.2.2",
        type: _\u0275EmptyOutletComponent,
        isStandalone: true,
        selector: "ng-component",
        exportAs: ["emptyRouterOutlet"],
        ngImport: core_exports,
        template: `<router-outlet />`,
        isInline: true,
        dependencies: [{
          kind: "directive",
          type: RouterOutlet,
          selector: "router-outlet",
          inputs: ["name", "routerOutletData"],
          outputs: ["activate", "deactivate", "attach", "detach"],
          exportAs: ["outlet"]
        }],
        changeDetection: ChangeDetectionStrategy.Eager
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: \u0275EmptyOutletComponent,
      decorators: [{
        type: Component,
        args: [{
          template: `<router-outlet />`,
          imports: [RouterOutlet],
          exportAs: "emptyRouterOutlet",
          changeDetection: ChangeDetectionStrategy.Eager
        }]
      }]
    });
    IMPERATIVE_NAVIGATION = "imperative";
    (function(EventType2) {
      EventType2[EventType2["NavigationStart"] = 0] = "NavigationStart";
      EventType2[EventType2["NavigationEnd"] = 1] = "NavigationEnd";
      EventType2[EventType2["NavigationCancel"] = 2] = "NavigationCancel";
      EventType2[EventType2["NavigationError"] = 3] = "NavigationError";
      EventType2[EventType2["RoutesRecognized"] = 4] = "RoutesRecognized";
      EventType2[EventType2["ResolveStart"] = 5] = "ResolveStart";
      EventType2[EventType2["ResolveEnd"] = 6] = "ResolveEnd";
      EventType2[EventType2["GuardsCheckStart"] = 7] = "GuardsCheckStart";
      EventType2[EventType2["GuardsCheckEnd"] = 8] = "GuardsCheckEnd";
      EventType2[EventType2["RouteConfigLoadStart"] = 9] = "RouteConfigLoadStart";
      EventType2[EventType2["RouteConfigLoadEnd"] = 10] = "RouteConfigLoadEnd";
      EventType2[EventType2["ChildActivationStart"] = 11] = "ChildActivationStart";
      EventType2[EventType2["ChildActivationEnd"] = 12] = "ChildActivationEnd";
      EventType2[EventType2["ActivationStart"] = 13] = "ActivationStart";
      EventType2[EventType2["ActivationEnd"] = 14] = "ActivationEnd";
      EventType2[EventType2["Scroll"] = 15] = "Scroll";
      EventType2[EventType2["NavigationSkipped"] = 16] = "NavigationSkipped";
    })(EventType || (EventType = {}));
    RouterEvent = class {
      id;
      url;
      constructor(id, url) {
        this.id = id;
        this.url = url;
      }
    };
    NavigationStart = class extends RouterEvent {
      type = EventType.NavigationStart;
      navigationTrigger;
      restoredState;
      constructor(id, url, navigationTrigger = "imperative", restoredState = null) {
        super(id, url);
        this.navigationTrigger = navigationTrigger;
        this.restoredState = restoredState;
      }
      toString() {
        return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
      }
    };
    NavigationEnd = class extends RouterEvent {
      urlAfterRedirects;
      type = EventType.NavigationEnd;
      constructor(id, url, urlAfterRedirects) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
      }
      toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
      }
    };
    (function(NavigationCancellationCode2) {
      NavigationCancellationCode2[NavigationCancellationCode2["Redirect"] = 0] = "Redirect";
      NavigationCancellationCode2[NavigationCancellationCode2["SupersededByNewNavigation"] = 1] = "SupersededByNewNavigation";
      NavigationCancellationCode2[NavigationCancellationCode2["NoDataFromResolver"] = 2] = "NoDataFromResolver";
      NavigationCancellationCode2[NavigationCancellationCode2["GuardRejected"] = 3] = "GuardRejected";
      NavigationCancellationCode2[NavigationCancellationCode2["Aborted"] = 4] = "Aborted";
    })(NavigationCancellationCode || (NavigationCancellationCode = {}));
    (function(NavigationSkippedCode2) {
      NavigationSkippedCode2[NavigationSkippedCode2["IgnoredSameUrlNavigation"] = 0] = "IgnoredSameUrlNavigation";
      NavigationSkippedCode2[NavigationSkippedCode2["IgnoredByUrlHandlingStrategy"] = 1] = "IgnoredByUrlHandlingStrategy";
    })(NavigationSkippedCode || (NavigationSkippedCode = {}));
    NavigationCancel = class extends RouterEvent {
      reason;
      code;
      type = EventType.NavigationCancel;
      constructor(id, url, reason, code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
      }
      toString() {
        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
      }
    };
    NavigationSkipped = class extends RouterEvent {
      reason;
      code;
      type = EventType.NavigationSkipped;
      constructor(id, url, reason, code) {
        super(id, url);
        this.reason = reason;
        this.code = code;
      }
    };
    NavigationError = class extends RouterEvent {
      error;
      target;
      type = EventType.NavigationError;
      constructor(id, url, error, target) {
        super(id, url);
        this.error = error;
        this.target = target;
      }
      toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
      }
    };
    RoutesRecognized = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.RoutesRecognized;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    GuardsCheckStart = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.GuardsCheckStart;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    GuardsCheckEnd = class extends RouterEvent {
      urlAfterRedirects;
      state;
      shouldActivate;
      type = EventType.GuardsCheckEnd;
      constructor(id, url, urlAfterRedirects, state, shouldActivate) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.shouldActivate = shouldActivate;
      }
      toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
      }
    };
    ResolveStart = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.ResolveStart;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    ResolveEnd = class extends RouterEvent {
      urlAfterRedirects;
      state;
      type = EventType.ResolveEnd;
      constructor(id, url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
      }
      toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    };
    RouteConfigLoadStart = class {
      route;
      type = EventType.RouteConfigLoadStart;
      constructor(route) {
        this.route = route;
      }
      toString() {
        return `RouteConfigLoadStart(path: ${this.route.path})`;
      }
    };
    RouteConfigLoadEnd = class {
      route;
      type = EventType.RouteConfigLoadEnd;
      constructor(route) {
        this.route = route;
      }
      toString() {
        return `RouteConfigLoadEnd(path: ${this.route.path})`;
      }
    };
    ChildActivationStart = class {
      snapshot;
      type = EventType.ChildActivationStart;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ChildActivationStart(path: '${path}')`;
      }
    };
    ChildActivationEnd = class {
      snapshot;
      type = EventType.ChildActivationEnd;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ChildActivationEnd(path: '${path}')`;
      }
    };
    ActivationStart = class {
      snapshot;
      type = EventType.ActivationStart;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ActivationStart(path: '${path}')`;
      }
    };
    ActivationEnd = class {
      snapshot;
      type = EventType.ActivationEnd;
      constructor(snapshot) {
        this.snapshot = snapshot;
      }
      toString() {
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
        return `ActivationEnd(path: '${path}')`;
      }
    };
    Scroll = class {
      routerEvent;
      position;
      anchor;
      scrollBehavior;
      type = EventType.Scroll;
      constructor(routerEvent, position, anchor, scrollBehavior) {
        this.routerEvent = routerEvent;
        this.position = position;
        this.anchor = anchor;
        this.scrollBehavior = scrollBehavior;
      }
      toString() {
        const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
        return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
      }
    };
    BeforeActivateRoutes = class {
    };
    BeforeRoutesRecognized = class {
    };
    RedirectRequest = class {
      url;
      navigationBehaviorOptions;
      constructor(url, navigationBehaviorOptions) {
        this.url = url;
        this.navigationBehaviorOptions = navigationBehaviorOptions;
      }
    };
    RedirectCommand = class _RedirectCommand extends Error {
      redirectTo;
      navigationBehaviorOptions;
      constructor(redirectTo, navigationBehaviorOptions) {
        super();
        this.redirectTo = redirectTo;
        this.navigationBehaviorOptions = navigationBehaviorOptions;
        Object.setPrototypeOf(this, _RedirectCommand.prototype);
      }
    };
    NAVIGATION_CANCELING_ERROR = "ngNavigationCancelingError";
    warnedAboutUnsupportedInputBinding = false;
    ActivateRoutes = class {
      routeReuseStrategy;
      futureState;
      currState;
      forwardEvent;
      inputBindingEnabled;
      constructor(routeReuseStrategy, futureState, currState, forwardEvent, inputBindingEnabled) {
        this.routeReuseStrategy = routeReuseStrategy;
        this.futureState = futureState;
        this.currState = currState;
        this.forwardEvent = forwardEvent;
        this.inputBindingEnabled = inputBindingEnabled;
      }
      activate(parentContexts) {
        const futureRoot = this.futureState._root;
        const currRoot = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
        advanceActivatedRoute(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentContexts);
      }
      deactivateChildRoutes(futureNode, currNode, contexts) {
        const children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach((futureChild) => {
          const childOutletName = futureChild.value.outlet;
          this.deactivateRoutes(futureChild, children[childOutletName], contexts);
          delete children[childOutletName];
        });
        Object.values(children).forEach((v) => {
          this.deactivateRouteAndItsChildren(v, contexts);
        });
      }
      deactivateRoutes(futureNode, currNode, parentContext) {
        const future = futureNode.value;
        const curr = currNode ? currNode.value : null;
        if (future === curr) {
          if (future.component) {
            const context = parentContext.getContext(future.outlet);
            if (context) {
              this.deactivateChildRoutes(futureNode, currNode, context.children);
            }
          } else {
            this.deactivateChildRoutes(futureNode, currNode, parentContext);
          }
        } else {
          if (curr) {
            this.deactivateRouteAndItsChildren(currNode, parentContext);
          }
        }
      }
      deactivateRouteAndItsChildren(route, parentContexts) {
        if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
          this.detachAndStoreRouteSubtree(route, parentContexts);
        } else {
          this.deactivateRouteAndOutlet(route, parentContexts);
        }
      }
      detachAndStoreRouteSubtree(route, parentContexts) {
        const context = parentContexts.getContext(route.value.outlet);
        const contexts = context && route.value.component ? context.children : parentContexts;
        const children = nodeChildrenAsMap(route);
        for (const treeNode of Object.values(children)) {
          this.deactivateRouteAndItsChildren(treeNode, contexts);
        }
        if (context && context.outlet) {
          const componentRef = context.outlet.detach();
          const contexts2 = context.children.contexts;
          context.resetChildren();
          this.routeReuseStrategy.store(route.value.snapshot, {
            componentRef,
            route,
            contexts: contexts2
          });
        }
      }
      deactivateRouteAndOutlet(route, parentContexts) {
        const context = parentContexts.getContext(route.value.outlet);
        const contexts = context && route.value.component ? context.children : parentContexts;
        const children = nodeChildrenAsMap(route);
        for (const treeNode of Object.values(children)) {
          this.deactivateRouteAndItsChildren(treeNode, contexts);
        }
        if (context) {
          if (context.outlet) {
            context.outlet.deactivate();
            context.children.onOutletDeactivated();
          }
          context.attachRef = null;
          context.route = null;
        }
        route.value._localInjector?.destroy();
      }
      activateChildRoutes(futureNode, currNode, contexts) {
        const children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach((c3) => {
          this.activateRoutes(c3, children[c3.value.outlet], contexts);
          this.forwardEvent(new ActivationEnd(c3.value.snapshot));
        });
        if (futureNode.children.length) {
          this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
        }
      }
      activateRoutes(futureNode, currNode, parentContexts) {
        const future = futureNode.value;
        const curr = currNode ? currNode.value : null;
        advanceActivatedRoute(future);
        if (future === curr) {
          if (future.component) {
            const context = parentContexts.getOrCreateContext(future.outlet);
            this.activateChildRoutes(futureNode, currNode, context.children);
          } else {
            this.activateChildRoutes(futureNode, currNode, parentContexts);
          }
        } else {
          if (future.component) {
            const context = parentContexts.getOrCreateContext(future.outlet);
            if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
              const stored = this.routeReuseStrategy.retrieve(future.snapshot);
              this.routeReuseStrategy.store(future.snapshot, null);
              context.children.onOutletReAttached(stored.contexts);
              context.attachRef = stored.componentRef;
              context.route = stored.route.value;
              if (context.outlet) {
                context.outlet.attach(stored.componentRef, stored.route.value);
              }
              advanceActivatedRoute(stored.route.value);
              this.activateChildRoutes(futureNode, null, context.children);
            } else {
              context.attachRef = null;
              context.route = future;
              if (context.outlet) {
                context.outlet.activateWith(future, context.injector);
              }
              this.activateChildRoutes(futureNode, null, context.children);
            }
          } else {
            this.activateChildRoutes(futureNode, null, parentContexts);
          }
        }
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          const context = parentContexts.getOrCreateContext(future.outlet);
          const outlet = context.outlet;
          if (outlet && this.inputBindingEnabled && !outlet.supportsBindingToComponentInputs && !warnedAboutUnsupportedInputBinding) {
            console.warn(`'withComponentInputBinding' feature is enabled but this application is using an outlet that may not support binding to component inputs.`);
            warnedAboutUnsupportedInputBinding = true;
          }
        }
      }
    };
    CanActivate = class {
      path;
      route;
      constructor(path) {
        this.path = path;
        this.route = this.path[this.path.length - 1];
      }
    };
    CanDeactivate = class {
      component;
      route;
      constructor(component, route) {
        this.component = component;
        this.route = route;
      }
    };
    INITIAL_VALUE = /* @__PURE__ */ Symbol("INITIAL_VALUE");
    NoMatch = class _NoMatch extends Error {
      name = "NoMatch";
      segmentGroup;
      constructor(segmentGroup) {
        super();
        this.segmentGroup = segmentGroup || null;
        Object.setPrototypeOf(this, _NoMatch.prototype);
      }
    };
    AbsoluteRedirect = class _AbsoluteRedirect extends Error {
      urlTree;
      name = "AbsoluteRedirect";
      constructor(urlTree) {
        super();
        this.urlTree = urlTree;
        Object.setPrototypeOf(this, _AbsoluteRedirect.prototype);
      }
    };
    ApplyRedirects = class {
      urlSerializer;
      urlTree;
      constructor(urlSerializer, urlTree) {
        this.urlSerializer = urlSerializer;
        this.urlTree = urlTree;
      }
      lineralizeSegments(route, urlTree) {
        return __async(this, null, function* () {
          let res = [];
          let c3 = urlTree.root;
          while (true) {
            res = res.concat(c3.segments);
            if (c3.numberOfChildren === 0) {
              return res;
            }
            if (c3.numberOfChildren > 1 || !c3.children[PRIMARY_OUTLET]) {
              throw namedOutletsRedirect(`${route.redirectTo}`);
            }
            c3 = c3.children[PRIMARY_OUTLET];
          }
        });
      }
      applyRedirectCommands(segments, redirectTo, posParams, currentSnapshot, injector) {
        return __async(this, null, function* () {
          const redirect = yield getRedirectResult(redirectTo, currentSnapshot, injector);
          if (redirect instanceof UrlTree) {
            throw new AbsoluteRedirect(redirect);
          }
          const newTree = this.applyRedirectCreateUrlTree(redirect, this.urlSerializer.parse(redirect), segments, posParams);
          if (redirect[0] === "/") {
            throw new AbsoluteRedirect(newTree);
          }
          return newTree;
        });
      }
      applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
        const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
        return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
      }
      createQueryParams(redirectToParams, actualParams) {
        const res = {};
        Object.entries(redirectToParams).forEach(([k, v]) => {
          const copySourceValue = typeof v === "string" && v[0] === ":";
          if (copySourceValue) {
            const sourceName = v.substring(1);
            res[k] = actualParams[sourceName];
          } else {
            res[k] = v;
          }
        });
        return res;
      }
      createSegmentGroup(redirectTo, group, segments, posParams) {
        const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
        let children = /* @__PURE__ */ Object.create(null);
        Object.entries(group.children).forEach(([name, child]) => {
          children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
        });
        return new UrlSegmentGroup(updatedSegments, children);
      }
      createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
        return redirectToSegments.map((s3) => s3.path[0] === ":" ? this.findPosParam(redirectTo, s3, posParams) : this.findOrReturn(s3, actualSegments));
      }
      findPosParam(redirectTo, redirectToUrlSegment, posParams) {
        const pos = posParams[redirectToUrlSegment.path.substring(1)];
        if (!pos) throw new RuntimeError(4001, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
        return pos;
      }
      findOrReturn(redirectToUrlSegment, actualSegments) {
        let idx = 0;
        for (const s3 of actualSegments) {
          if (s3.path === redirectToUrlSegment.path) {
            actualSegments.splice(idx);
            return s3;
          }
          idx++;
        }
        return redirectToUrlSegment;
      }
    };
    noMatch = {
      matched: false,
      consumedSegments: [],
      remainingSegments: [],
      parameters: {},
      positionalParamSegments: {}
    };
    NoLeftoversInUrl = class {
    };
    MAX_ALLOWED_REDIRECTS = 31;
    Recognizer = class {
      injector;
      configLoader;
      rootComponentType;
      config;
      urlTree;
      paramsInheritanceStrategy;
      urlSerializer;
      abortSignal;
      applyRedirects;
      absoluteRedirectCount = 0;
      allowRedirects = true;
      queryParams;
      constructor(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer, abortSignal) {
        this.injector = injector;
        this.configLoader = configLoader;
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.paramsInheritanceStrategy = paramsInheritanceStrategy;
        this.urlSerializer = urlSerializer;
        this.abortSignal = abortSignal;
        this.applyRedirects = new ApplyRedirects(this.urlSerializer, this.urlTree);
        this.queryParams = Object.freeze(__spreadValues({}, this.urlTree.queryParams));
      }
      noMatchError(e2) {
        return new RuntimeError(4002, typeof ngDevMode === "undefined" || ngDevMode ? `Cannot match any routes. URL Segment: '${e2.segmentGroup}'` : `'${e2.segmentGroup}'`);
      }
      recognize() {
        return __async(this, null, function* () {
          const rootSegmentGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
          const {
            children,
            rootSnapshot
          } = yield this.match(rootSegmentGroup);
          const rootNode = new TreeNode(rootSnapshot, children);
          const routeState = new RouterStateSnapshot("", rootNode);
          const tree2 = createUrlTreeFromSnapshot(rootSnapshot, [], this.urlTree.queryParams, this.urlTree.fragment);
          tree2.queryParams = this.urlTree.queryParams;
          routeState.url = this.urlSerializer.serialize(tree2);
          return {
            state: routeState,
            tree: tree2
          };
        });
      }
      match(rootSegmentGroup) {
        return __async(this, null, function* () {
          const rootSnapshot = new ActivatedRouteSnapshot([], Object.freeze({}), this.queryParams, this.urlTree.fragment, Object.freeze({}), PRIMARY_OUTLET, this.rootComponentType, null, {}, this.injector);
          try {
            const children = yield this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET, rootSnapshot);
            return {
              children,
              rootSnapshot
            };
          } catch (e2) {
            if (e2 instanceof AbsoluteRedirect) {
              this.absoluteRedirectCount++;
              if (this.absoluteRedirectCount > MAX_ALLOWED_REDIRECTS) {
                if (ngDevMode) {
                  throw new RuntimeError(4016, `Detected possible infinite redirect when redirecting from '${this.urlTree}' to '${e2.urlTree}'.`);
                }
                this.allowRedirects = false;
              }
              this.urlTree = e2.urlTree;
              this.queryParams = Object.freeze(__spreadValues({}, this.urlTree.queryParams));
              return this.match(e2.urlTree.root);
            }
            if (e2 instanceof NoMatch) {
              throw this.noMatchError(e2);
            }
            throw e2;
          }
        });
      }
      processSegmentGroup(injector, config, segmentGroup, outlet, parentRoute) {
        return __async(this, null, function* () {
          if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return this.processChildren(injector, config, segmentGroup, parentRoute);
          }
          const child = yield this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet, true, parentRoute);
          return child instanceof TreeNode ? [child] : [];
        });
      }
      processChildren(injector, config, segmentGroup, parentRoute) {
        return __async(this, null, function* () {
          const childOutlets = [];
          for (const child of Object.keys(segmentGroup.children)) {
            if (child === "primary") {
              childOutlets.unshift(child);
            } else {
              childOutlets.push(child);
            }
          }
          let children = [];
          for (const childOutlet of childOutlets) {
            const child = segmentGroup.children[childOutlet];
            const sortedConfig = sortByMatchingOutlets(config, childOutlet);
            const outletChild = yield this.processSegment(injector, sortedConfig, child, child.segments, childOutlet, true, parentRoute);
            if (outletChild instanceof TreeNode) {
              children.push(outletChild);
            }
          }
          const mergedChildren = mergeEmptyPathMatches(children);
          sortActivatedRouteSnapshots(mergedChildren);
          return mergedChildren;
        });
      }
      processSegment(injector, routes, segmentGroup, segments, outlet, allowRedirects, parentRoute) {
        return __async(this, null, function* () {
          for (const r2 of routes) {
            try {
              return yield this.processSegmentAgainstRoute(r2._injector ?? injector, routes, r2, segmentGroup, segments, outlet, allowRedirects, parentRoute);
            } catch (e2) {
              if (e2 instanceof NoMatch || isEmptyError(e2)) {
                continue;
              }
              throw e2;
            }
          }
          if (noLeftoversInUrl(segmentGroup, segments)) {
            return new NoLeftoversInUrl();
          }
          throw new NoMatch(segmentGroup);
        });
      }
      processSegmentAgainstRoute(injector, routes, route, rawSegment, segments, outlet, allowRedirects, parentRoute) {
        return __async(this, null, function* () {
          if (getOutlet(route) !== outlet && (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route) || !route.children?.length && !route.loadChildren || segments.length === 0 && !rawSegment.hasChildren())) {
            throw new NoMatch(rawSegment);
          }
          if (route.redirectTo === void 0) {
            return this.matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute);
          }
          if (this.allowRedirects && allowRedirects) {
            return this.expandSegmentAgainstRouteUsingRedirect(injector, rawSegment, routes, route, segments, outlet, parentRoute);
          }
          throw new NoMatch(rawSegment);
        });
      }
      expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet, parentRoute) {
        return __async(this, null, function* () {
          const {
            matched,
            parameters,
            consumedSegments,
            positionalParamSegments,
            remainingSegments
          } = match(segmentGroup, route, segments);
          if (!matched) throw new NoMatch(segmentGroup);
          const currentSnapshot = this.createSnapshot(injector, route, segments, parameters, parentRoute);
          if (this.abortSignal.aborted) {
            throw new Error(this.abortSignal.reason);
          }
          const newTree = yield this.applyRedirects.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments, createPreMatchRouteSnapshot(currentSnapshot), injector);
          const newSegments = yield this.applyRedirects.lineralizeSegments(route, newTree);
          return this.processSegment(injector, routes, segmentGroup, newSegments.concat(remainingSegments), outlet, false, parentRoute);
        });
      }
      createSnapshot(injector, route, segments, parameters, parentRoute) {
        const snapshot = new ActivatedRouteSnapshot(segments, parameters, this.queryParams, this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route), injector);
        const inherited = getInherited(snapshot, parentRoute, this.paramsInheritanceStrategy);
        snapshot.params = inherited.params;
        snapshot.data = inherited.data;
        return snapshot;
      }
      matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute) {
        return __async(this, null, function* () {
          if (this.abortSignal.aborted) {
            throw new Error(this.abortSignal.reason);
          }
          const createSnapshot = (result2) => this.createSnapshot(injector, route, result2.consumedSegments, result2.parameters, parentRoute);
          const result = yield firstValueFrom(matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer, createSnapshot, this.abortSignal));
          if (route.path === "**") {
            rawSegment.children = {};
          }
          if (!result?.matched) {
            throw new NoMatch(rawSegment);
          }
          injector = route._injector ?? injector;
          const {
            routes: childConfig
          } = yield this.getChildConfig(injector, route, segments);
          const childInjector = route._loadedInjector ?? injector;
          const {
            parameters,
            consumedSegments,
            remainingSegments
          } = result;
          const snapshot = this.createSnapshot(injector, route, consumedSegments, parameters, parentRoute);
          const {
            segmentGroup,
            slicedSegments
          } = split(rawSegment, consumedSegments, remainingSegments, childConfig, outlet);
          const matchedOnOutlet = getOutlet(route) === outlet;
          if (matchedOnOutlet && slicedSegments.length === 0 && segmentGroup.hasChildren()) {
            const children = yield this.processChildren(childInjector, childConfig, segmentGroup, snapshot);
            return new TreeNode(snapshot, children);
          }
          if (matchedOnOutlet && childConfig.length === 0 && slicedSegments.length === 0) {
            return new TreeNode(snapshot, []);
          }
          const child = yield this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true, snapshot);
          if (!matchedOnOutlet && !(child instanceof TreeNode)) {
            throw new NoMatch(rawSegment);
          }
          return new TreeNode(snapshot, child instanceof TreeNode ? [child] : []);
        });
      }
      getChildConfig(injector, route, segments) {
        return __async(this, null, function* () {
          if (route.children) {
            return {
              routes: route.children,
              injector
            };
          }
          if (route.loadChildren) {
            if (route._loadedRoutes !== void 0) {
              const ngModuleFactory = route._loadedNgModuleFactory;
              if (ngModuleFactory && !route._loadedInjector) {
                route._loadedInjector = ngModuleFactory.create(injector).injector;
              }
              return {
                routes: route._loadedRoutes,
                injector: route._loadedInjector
              };
            }
            if (this.abortSignal.aborted) {
              throw new Error(this.abortSignal.reason);
            }
            const shouldLoadResult = yield firstValueFrom(runCanLoadGuards(injector, route, segments, this.urlSerializer, this.abortSignal));
            if (shouldLoadResult) {
              const cfg = yield this.configLoader.loadChildren(injector, route);
              route._loadedRoutes = cfg.routes;
              route._loadedInjector = cfg.injector;
              route._loadedNgModuleFactory = cfg.factory;
              return cfg;
            }
            throw canLoadFails(route);
          }
          return {
            routes: [],
            injector
          };
        });
      }
    };
    ROUTER_RESOURCES_FEATURE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "Router Resources Feature" : "");
    TitleStrategy = class _TitleStrategy {
      buildTitle(snapshot) {
        let pageTitle;
        let route = snapshot.root;
        while (route !== void 0) {
          pageTitle = this.getResolvedTitleForRoute(route) ?? pageTitle;
          route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
        }
        return pageTitle;
      }
      getResolvedTitleForRoute(snapshot) {
        return snapshot.data[RouteTitleKey];
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _TitleStrategy,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _TitleStrategy,
        factory: () => inject(DefaultTitleStrategy)
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: TitleStrategy,
      decorators: [{
        type: Service,
        args: [{
          factory: () => inject(DefaultTitleStrategy)
        }]
      }]
    });
    DefaultTitleStrategy = class _DefaultTitleStrategy extends TitleStrategy {
      title;
      constructor(title) {
        super();
        this.title = title;
      }
      updateTitle(snapshot) {
        const title = this.buildTitle(snapshot);
        if (title !== void 0) {
          this.title.setTitle(title);
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultTitleStrategy,
        deps: [{
          token: Title
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultTitleStrategy,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: DefaultTitleStrategy,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: Title
      }]
    });
    ROUTER_CONFIGURATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router config" : "", {
      factory: () => ({})
    });
    ROUTES = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ROUTES" : "");
    RouterConfigLoader = class _RouterConfigLoader {
      componentLoaders = /* @__PURE__ */ new WeakMap();
      childrenLoaders = /* @__PURE__ */ new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = inject(Compiler);
      loadComponent(injector, route) {
        return __async(this, null, function* () {
          if (this.componentLoaders.get(route)) {
            return this.componentLoaders.get(route);
          } else if (route._loadedComponent) {
            return Promise.resolve(route._loadedComponent);
          }
          if (this.onLoadStartListener) {
            this.onLoadStartListener(route);
          }
          const loader = (() => __async(this, null, function* () {
            try {
              const loaded = yield wrapIntoPromise(runInInjectionContext(injector, () => route.loadComponent()));
              const component = yield maybeResolveResources(maybeUnwrapDefaultExport(loaded));
              if (this.onLoadEndListener) {
                this.onLoadEndListener(route);
              }
              (typeof ngDevMode === "undefined" || ngDevMode) && assertStandalone(route.path ?? "", component);
              route._loadedComponent = component;
              return component;
            } finally {
              this.componentLoaders.delete(route);
            }
          }))();
          this.componentLoaders.set(route, loader);
          return loader;
        });
      }
      loadChildren(parentInjector, route) {
        if (this.childrenLoaders.get(route)) {
          return this.childrenLoaders.get(route);
        } else if (route._loadedRoutes) {
          return Promise.resolve({
            routes: route._loadedRoutes,
            injector: route._loadedInjector
          });
        }
        if (this.onLoadStartListener) {
          this.onLoadStartListener(route);
        }
        const loader = (() => __async(this, null, function* () {
          try {
            const result = yield loadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
            route._loadedRoutes = result.routes;
            route._loadedInjector = result.injector;
            route._loadedNgModuleFactory = result.factory;
            return result;
          } finally {
            this.childrenLoaders.delete(route);
          }
        }))();
        this.childrenLoaders.set(route, loader);
        return loader;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterConfigLoader,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterConfigLoader
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterConfigLoader,
      decorators: [{
        type: Service
      }]
    });
    UrlHandlingStrategy = class _UrlHandlingStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _UrlHandlingStrategy,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _UrlHandlingStrategy,
        factory: () => inject(DefaultUrlHandlingStrategy)
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: UrlHandlingStrategy,
      decorators: [{
        type: Service,
        args: [{
          factory: () => inject(DefaultUrlHandlingStrategy)
        }]
      }]
    });
    DefaultUrlHandlingStrategy = class _DefaultUrlHandlingStrategy {
      shouldProcessUrl(url) {
        return true;
      }
      extract(url) {
        return url;
      }
      merge(newUrlPart, wholeUrl) {
        return newUrlPart;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultUrlHandlingStrategy,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultUrlHandlingStrategy
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: DefaultUrlHandlingStrategy,
      decorators: [{
        type: Service
      }]
    });
    CREATE_VIEW_TRANSITION = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "view transition helper" : "");
    VIEW_TRANSITION_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "view transition options" : "");
    noop2 = () => {
    };
    NAVIGATION_ERROR_HANDLER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "navigation error handler" : "");
    NavigationTransitions = class _NavigationTransitions {
      currentNavigation = signal(null, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "currentNavigation"
      } : {}), {
        equal: () => false
      }));
      currentTransition = null;
      lastSuccessfulNavigation = signal(null, ...ngDevMode ? [{
        debugName: "lastSuccessfulNavigation"
      }] : []);
      events = new Subject();
      transitionAbortWithErrorSubject = new Subject();
      configLoader = inject(RouterConfigLoader);
      environmentInjector = inject(EnvironmentInjector);
      destroyRef = inject(DestroyRef);
      urlSerializer = inject(UrlSerializer);
      rootContexts = inject(ChildrenOutletContexts);
      location = inject(Location);
      inputBindingEnabled = inject(INPUT_BINDER, {
        optional: true
      }) !== null;
      titleStrategy = inject(TitleStrategy);
      options = inject(ROUTER_CONFIGURATION, {
        optional: true
      }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || DEFAULT_PARAMS_INHERITANCE_STRATEGY;
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      createViewTransition = inject(CREATE_VIEW_TRANSITION, {
        optional: true
      });
      navigationErrorHandler = inject(NAVIGATION_ERROR_HANDLER, {
        optional: true
      });
      routerResourcesFeature = inject(ROUTER_RESOURCES_FEATURE, {
        optional: true
      });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => of(void 0);
      rootComponentType = null;
      destroyed = false;
      constructor() {
        const onLoadStart = (r2) => this.events.next(new RouteConfigLoadStart(r2));
        const onLoadEnd = (r2) => this.events.next(new RouteConfigLoadEnd(r2));
        this.configLoader.onLoadEndListener = onLoadEnd;
        this.configLoader.onLoadStartListener = onLoadStart;
        this.destroyRef.onDestroy(() => {
          this.destroyed = true;
        });
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(request) {
        const id = ++this.navigationId;
        untracked(() => {
          this.transitions?.next(__spreadProps(__spreadValues({}, request), {
            extractedUrl: this.urlHandlingStrategy.extract(request.rawUrl),
            targetSnapshot: null,
            targetRouterState: null,
            guards: {
              canActivateChecks: [],
              canDeactivateChecks: []
            },
            guardsResult: null,
            id,
            routesRecognizeHandler: {},
            beforeActivateHandler: {}
          }));
        });
      }
      setupNavigations(router) {
        this.transitions = new BehaviorSubject(null);
        return this.transitions.pipe(filter((t2) => t2 !== null), switchMap((overallTransitionState) => {
          let abortable = true;
          let completedOrAborted = false;
          const abortController = new AbortController();
          const shouldContinueNavigation = () => {
            return !completedOrAborted && this.currentTransition?.id === overallTransitionState.id;
          };
          return of(overallTransitionState).pipe(switchMap((t2) => {
            if (this.navigationId > overallTransitionState.id) {
              const cancellationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
              this.cancelNavigationTransition(overallTransitionState, cancellationReason, NavigationCancellationCode.SupersededByNewNavigation);
              return EMPTY;
            }
            this.currentTransition = overallTransitionState;
            const lastSuccessfulNavigation = this.lastSuccessfulNavigation();
            this.currentNavigation.set({
              id: t2.id,
              initialUrl: t2.rawUrl,
              extractedUrl: t2.extractedUrl,
              targetBrowserUrl: typeof t2.extras.browserUrl === "string" ? this.urlSerializer.parse(t2.extras.browserUrl) : t2.extras.browserUrl,
              trigger: t2.source,
              extras: t2.extras,
              previousNavigation: !lastSuccessfulNavigation ? null : __spreadProps(__spreadValues({}, lastSuccessfulNavigation), {
                previousNavigation: null
              }),
              abort: () => abortController.abort(),
              routesRecognizeHandler: t2.routesRecognizeHandler,
              beforeActivateHandler: t2.beforeActivateHandler
            });
            const urlTransition = !router.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
            const onSameUrlNavigation = t2.extras.onSameUrlNavigation ?? router.onSameUrlNavigation;
            if (!urlTransition && onSameUrlNavigation !== "reload") {
              const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation to ${t2.rawUrl} was ignored because it is the same as the current Router URL.` : "";
              this.events.next(new NavigationSkipped(t2.id, this.urlSerializer.serialize(t2.rawUrl), reason, NavigationSkippedCode.IgnoredSameUrlNavigation));
              t2.resolve(false);
              return EMPTY;
            }
            if (this.urlHandlingStrategy.shouldProcessUrl(t2.rawUrl)) {
              return of(t2).pipe(switchMap((t3) => {
                this.events.next(new NavigationStart(t3.id, this.urlSerializer.serialize(t3.extractedUrl), t3.source, t3.restoredState));
                if (t3.id !== this.navigationId) {
                  return EMPTY;
                }
                return Promise.resolve(t3);
              }), recognize(this.environmentInjector, this.configLoader, this.rootComponentType, router.config, this.urlSerializer, this.paramsInheritanceStrategy, abortController.signal), tap((t3) => {
                overallTransitionState.targetSnapshot = t3.targetSnapshot;
                overallTransitionState.urlAfterRedirects = t3.urlAfterRedirects;
                this.currentNavigation.update((nav) => {
                  nav.finalUrl = t3.urlAfterRedirects;
                  return nav;
                });
                this.events.next(new BeforeRoutesRecognized());
              }), switchMap((value) => from(overallTransitionState.routesRecognizeHandler.deferredHandle ?? of(void 0)).pipe(map(() => value))), tap(() => {
                const routesRecognized = new RoutesRecognized(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                this.events.next(routesRecognized);
              }));
            } else if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(t2.currentRawUrl)) {
              const {
                id,
                extractedUrl,
                source,
                restoredState,
                extras
              } = t2;
              const navStart = new NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
              this.events.next(navStart);
              const targetSnapshot = createEmptyState(this.rootComponentType, this.environmentInjector).snapshot;
              this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t2), {
                targetSnapshot,
                urlAfterRedirects: extractedUrl,
                extras: __spreadProps(__spreadValues({}, extras), {
                  skipLocationChange: false,
                  replaceUrl: false
                })
              });
              this.currentNavigation.update((nav) => {
                nav.finalUrl = extractedUrl;
                return nav;
              });
              return of(overallTransitionState);
            } else {
              const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation was ignored because the UrlHandlingStrategy indicated neither the current URL ${t2.currentRawUrl} nor target URL ${t2.rawUrl} should be processed.` : "";
              this.events.next(new NavigationSkipped(t2.id, this.urlSerializer.serialize(t2.extractedUrl), reason, NavigationSkippedCode.IgnoredByUrlHandlingStrategy));
              t2.resolve(false);
              return EMPTY;
            }
          }), map((t2) => {
            const guardsStart = new GuardsCheckStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
            this.events.next(guardsStart);
            this.currentTransition = overallTransitionState = __spreadProps(__spreadValues({}, t2), {
              guards: getAllRouteGuards(t2.targetSnapshot, t2.currentSnapshot, this.rootContexts)
            });
            return overallTransitionState;
          }), checkGuards((evt) => this.events.next(evt)), switchMap((t2) => {
            overallTransitionState.guardsResult = t2.guardsResult;
            if (t2.guardsResult && typeof t2.guardsResult !== "boolean") {
              throw redirectingNavigationError(this.urlSerializer, t2.guardsResult);
            }
            const guardsEnd = new GuardsCheckEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot, !!t2.guardsResult);
            this.events.next(guardsEnd);
            if (!shouldContinueNavigation()) {
              return EMPTY;
            }
            if (!t2.guardsResult) {
              this.cancelNavigationTransition(t2, "", NavigationCancellationCode.GuardRejected);
              return EMPTY;
            }
            if (t2.guards.canActivateChecks.length === 0) {
              return of(t2);
            }
            const resolveStart = new ResolveStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
            this.events.next(resolveStart);
            if (!shouldContinueNavigation()) {
              return EMPTY;
            }
            let dataResolved = false;
            return of(t2).pipe(resolveData(this.paramsInheritanceStrategy), tap({
              next: () => {
                dataResolved = true;
                const resolveEnd = new ResolveEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                this.events.next(resolveEnd);
              },
              complete: () => {
                if (!dataResolved) {
                  this.cancelNavigationTransition(t2, typeof ngDevMode === "undefined" || ngDevMode ? `At least one route resolver didn't emit any value.` : "", NavigationCancellationCode.NoDataFromResolver);
                }
              }
            }));
          }), switchTap((t2) => {
            const loadComponents = (route) => {
              const loaders2 = [];
              if (route.routeConfig?._loadedComponent) {
                route.component = route.routeConfig?._loadedComponent;
              } else if (route.routeConfig?.loadComponent) {
                const injector = route._environmentInjector;
                loaders2.push(this.configLoader.loadComponent(injector, route.routeConfig).then((loadedComponent) => {
                  route.component = loadedComponent;
                }));
              }
              for (const child of route.children) {
                loaders2.push(...loadComponents(child));
              }
              return loaders2;
            };
            const loaders = loadComponents(t2.targetSnapshot.root);
            return loaders.length === 0 ? of(t2) : from(Promise.all(loaders).then(() => t2));
          }), switchMap((t2) => {
            const {
              newlyCreatedRoutes,
              state
            } = createRouterState(router.routeReuseStrategy, t2.targetSnapshot, t2.currentRouterState);
            this.currentTransition = overallTransitionState = t2 = __spreadProps(__spreadValues({}, t2), {
              targetRouterState: state,
              newlyCreatedRoutes
            });
            this.currentNavigation.update((nav) => {
              nav.targetRouterState = state;
              return nav;
            });
            return of(t2);
          }), this.routerResourcesFeature?.setupAndRunResources(abortController.signal) ?? ((t2) => t2), switchTap(() => this.afterPreactivation()), switchMap(() => {
            const {
              currentSnapshot,
              targetSnapshot
            } = overallTransitionState;
            const viewTransitionStarted = this.createViewTransition?.(this.environmentInjector, currentSnapshot.root, targetSnapshot.root, overallTransitionState.hasUAVisualTransition);
            return viewTransitionStarted ? from(viewTransitionStarted).pipe(map(() => overallTransitionState)) : of(overallTransitionState);
          }), take(1), switchMap((t2) => {
            abortable = false;
            this.events.next(new BeforeActivateRoutes());
            const deferred = overallTransitionState.beforeActivateHandler.deferredHandle;
            return deferred ? from(deferred.then(() => t2)) : of(t2);
          }), tap((t2) => {
            new ActivateRoutes(router.routeReuseStrategy, overallTransitionState.targetRouterState, overallTransitionState.currentRouterState, (evt) => this.events.next(evt), this.inputBindingEnabled).activate(this.rootContexts);
            t2.newlyCreatedRoutes?.clear();
            if (!shouldContinueNavigation()) {
              return;
            }
            resetPendingRoutes(t2.targetRouterState);
            completedOrAborted = true;
            this.currentNavigation.update((nav) => {
              nav.abort = noop2;
              return nav;
            });
            this.lastSuccessfulNavigation.set(untracked(this.currentNavigation));
            this.events.next(new NavigationEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects)));
            this.titleStrategy?.updateTitle(t2.targetRouterState.snapshot);
            t2.resolve(true);
          }), takeUntil(abortSignalToObservable(abortController.signal).pipe(filter(() => !completedOrAborted && abortable), tap(() => {
            this.cancelNavigationTransition(overallTransitionState, abortController.signal.reason + "", NavigationCancellationCode.Aborted);
          }))), tap({
            complete: () => {
              completedOrAborted = true;
            }
          }), takeUntil(this.transitionAbortWithErrorSubject.pipe(tap((err) => {
            throw err;
          }))), finalize(() => {
            abortController.abort();
            if (!completedOrAborted) {
              const cancelationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
              this.cancelNavigationTransition(overallTransitionState, cancelationReason, NavigationCancellationCode.SupersededByNewNavigation);
            }
            if (this.currentTransition?.id === overallTransitionState.id) {
              this.currentNavigation.set(null);
              this.currentTransition = null;
            }
          }), catchError((e2) => {
            completedOrAborted = true;
            rollbackState(overallTransitionState);
            if (this.destroyed) {
              overallTransitionState.resolve(false);
              return EMPTY;
            }
            if (e2 instanceof RedirectCommand) {
              e2 = redirectingNavigationError(this.urlSerializer, e2);
            }
            if (isNavigationCancelingError(e2)) {
              this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e2.message, e2.cancellationCode));
              if (!isRedirectingNavigationCancelingError(e2)) {
                overallTransitionState.resolve(false);
              } else {
                this.events.next(new RedirectRequest(e2.url, e2.navigationBehaviorOptions));
              }
            } else {
              const navigationError = new NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e2, overallTransitionState.targetSnapshot ?? void 0);
              try {
                const navigationErrorHandlerResult = runInInjectionContext(this.environmentInjector, () => this.navigationErrorHandler?.(navigationError));
                if (navigationErrorHandlerResult instanceof RedirectCommand) {
                  const {
                    message,
                    cancellationCode
                  } = redirectingNavigationError(this.urlSerializer, navigationErrorHandlerResult);
                  this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), message, cancellationCode));
                  this.events.next(new RedirectRequest(navigationErrorHandlerResult.redirectTo, navigationErrorHandlerResult.navigationBehaviorOptions));
                } else {
                  this.events.next(navigationError);
                  throw e2;
                }
              } catch (ee) {
                if (this.options.resolveNavigationPromiseOnError) {
                  overallTransitionState.resolve(false);
                } else {
                  overallTransitionState.reject(ee);
                }
              }
            }
            return EMPTY;
          }));
        }));
      }
      cancelNavigationTransition(t2, reason, code) {
        rollbackState(t2);
        const navCancel = new NavigationCancel(t2.id, this.urlSerializer.serialize(t2.extractedUrl), reason, code);
        this.events.next(navCancel);
        t2.resolve(false);
      }
      isUpdatingInternalState() {
        return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString();
      }
      isUpdatedBrowserUrl() {
        const currentBrowserUrl = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true)));
        const currentNavigation = untracked(this.currentNavigation);
        const targetBrowserUrl = currentNavigation?.targetBrowserUrl ?? currentNavigation?.extractedUrl;
        return currentBrowserUrl.toString() !== targetBrowserUrl?.toString() && !currentNavigation?.extras.skipLocationChange;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NavigationTransitions,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NavigationTransitions
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: NavigationTransitions,
      decorators: [{
        type: Service
      }],
      ctorParameters: () => []
    });
    ROUTE_INJECTOR_CLEANUP = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "RouteInjectorCleanup" : "");
    RouteReuseStrategy = class _RouteReuseStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouteReuseStrategy,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouteReuseStrategy,
        factory: () => inject(DefaultRouteReuseStrategy)
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouteReuseStrategy,
      decorators: [{
        type: Service,
        args: [{
          factory: () => inject(DefaultRouteReuseStrategy)
        }]
      }]
    });
    BaseRouteReuseStrategy = class {
      shouldDetach(route) {
        return false;
      }
      store(route, detachedTree) {
      }
      shouldAttach(route) {
        return false;
      }
      retrieve(route) {
        return null;
      }
      shouldReuseRoute(future, curr) {
        return future.routeConfig === curr.routeConfig;
      }
      shouldDestroyInjector(route) {
        return true;
      }
    };
    DefaultRouteReuseStrategy = class _DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultRouteReuseStrategy,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _DefaultRouteReuseStrategy
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: DefaultRouteReuseStrategy,
      decorators: [{
        type: Service
      }]
    });
    StateManager = class _StateManager {
      urlSerializer = inject(UrlSerializer);
      options = inject(ROUTER_CONFIGURATION, {
        optional: true
      }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
      location = inject(Location);
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      currentUrlTree = new UrlTree();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({
        finalUrl,
        initialUrl,
        targetBrowserUrl
      }) {
        const rawUrl = finalUrl !== void 0 ? this.urlHandlingStrategy.merge(finalUrl, initialUrl) : initialUrl;
        const url = targetBrowserUrl ?? rawUrl;
        const path = url instanceof UrlTree ? this.urlSerializer.serialize(url) : url;
        return path;
      }
      routerUrlState(navigation) {
        if (navigation?.targetBrowserUrl === void 0 || navigation?.finalUrl === void 0) {
          return {};
        }
        return {
          \u0275routerUrl: this.urlSerializer.serialize(navigation.finalUrl)
        };
      }
      commitTransition({
        targetRouterState,
        finalUrl,
        initialUrl
      }) {
        if (finalUrl && targetRouterState) {
          this.currentUrlTree = finalUrl;
          this.rawUrlTree = this.urlHandlingStrategy.merge(finalUrl, initialUrl);
          this.routerState = targetRouterState;
        } else {
          this.rawUrlTree = initialUrl;
        }
      }
      routerState = createEmptyState(null, inject(EnvironmentInjector));
      getRouterState() {
        return this.routerState;
      }
      _stateMemento = this.createStateMemento();
      get stateMemento() {
        return this._stateMemento;
      }
      updateStateMemento() {
        this._stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState
        };
      }
      restoredState() {
        return this.location.getState();
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _StateManager,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _StateManager,
        factory: () => inject(HistoryStateManager)
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: StateManager,
      decorators: [{
        type: Service,
        args: [{
          factory: () => inject(HistoryStateManager)
        }]
      }]
    });
    HistoryStateManager = class _HistoryStateManager extends StateManager {
      currentPageId = 0;
      lastSuccessfulId = -1;
      get browserPageId() {
        if (this.canceledNavigationResolution !== "computed") {
          return this.currentPageId;
        }
        return this.restoredState()?.\u0275routerPageId ?? this.currentPageId;
      }
      registerNonRouterCurrentEntryChangeListener(listener) {
        return this.location.subscribe((event) => {
          if (event["type"] === "popstate") {
            setTimeout(() => {
              listener(event["url"], event.state, "popstate", {
                replaceUrl: true
              }, event.hasUAVisualTransition);
            });
          }
        });
      }
      handleRouterEvent(e2, currentTransition) {
        if (e2 instanceof NavigationStart) {
          this.updateStateMemento();
        } else if (e2 instanceof NavigationSkipped) {
          this.commitTransition(currentTransition);
        } else if (e2 instanceof RoutesRecognized) {
          if (this.urlUpdateStrategy === "eager") {
            if (!currentTransition.extras.skipLocationChange) {
              this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
            }
          }
        } else if (e2 instanceof BeforeActivateRoutes) {
          this.commitTransition(currentTransition);
          if (this.urlUpdateStrategy === "deferred" && !currentTransition.extras.skipLocationChange) {
            this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
          }
        } else if (e2 instanceof NavigationCancel) {
          if (!isRedirectingEvent(e2)) {
            this.restoreHistory(currentTransition);
          } else if (e2.code === NavigationCancellationCode.Redirect && this.routerState === currentTransition.targetRouterState) {
            this.resetInternalState(currentTransition);
          }
        } else if (e2 instanceof NavigationError) {
          this.restoreHistory(currentTransition, true);
        } else if (e2 instanceof NavigationEnd) {
          this.lastSuccessfulId = e2.id;
          this.currentPageId = this.browserPageId;
        }
      }
      setBrowserUrl(path, navigation) {
        const {
          extras,
          id
        } = navigation;
        const {
          replaceUrl,
          state
        } = extras;
        if (this.location.isCurrentPathEqualTo(path) || !!replaceUrl) {
          const currentBrowserPageId = this.browserPageId;
          const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, currentBrowserPageId, navigation));
          this.location.replaceState(path, "", newState);
        } else {
          const newState = __spreadValues(__spreadValues({}, state), this.generateNgRouterState(id, this.browserPageId + 1, navigation));
          this.location.go(path, "", newState);
        }
      }
      restoreHistory(navigation, restoringFromCaughtError = false) {
        if (this.canceledNavigationResolution === "computed") {
          const currentBrowserPageId = this.browserPageId;
          const targetPagePosition = this.currentPageId - currentBrowserPageId;
          if (targetPagePosition !== 0) {
            this.location.historyGo(targetPagePosition);
          } else if (this.getCurrentUrlTree() === navigation.finalUrl && targetPagePosition === 0) {
            this.resetInternalState(navigation);
            this.resetUrlToCurrentUrlTree();
          } else ;
        } else if (this.canceledNavigationResolution === "replace") {
          if (restoringFromCaughtError) {
            this.resetInternalState(navigation);
          }
          this.resetUrlToCurrentUrlTree();
        }
      }
      resetInternalState({
        finalUrl
      }) {
        this.routerState = this.stateMemento.routerState;
        this.currentUrlTree = this.stateMemento.currentUrlTree;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl ?? this.rawUrlTree);
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
      }
      generateNgRouterState(navigationId, routerPageId, navigation) {
        if (this.canceledNavigationResolution === "computed") {
          return __spreadValues({
            navigationId,
            \u0275routerPageId: routerPageId
          }, this.routerUrlState(navigation));
        }
        return __spreadValues({
          navigationId
        }, this.routerUrlState(navigation));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HistoryStateManager,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HistoryStateManager
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HistoryStateManager,
      decorators: [{
        type: Service
      }]
    });
    Router = class _Router {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = false;
      nonRouterCurrentEntryChangeSubscription;
      console = inject(Console);
      stateManager = inject(StateManager);
      options = inject(ROUTER_CONFIGURATION, {
        optional: true
      }) || {};
      pendingTasks = inject(PendingTasksInternal);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      navigationTransitions = inject(NavigationTransitions);
      urlSerializer = inject(UrlSerializer);
      location = inject(Location);
      urlHandlingStrategy = inject(UrlHandlingStrategy);
      injector = inject(EnvironmentInjector);
      _events = new Subject();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = false;
      routeReuseStrategy = inject(RouteReuseStrategy);
      injectorCleanup = inject(ROUTE_INJECTOR_CLEANUP, {
        optional: true
      });
      onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
      config = inject(ROUTES, {
        optional: true
      })?.flat() ?? [];
      componentInputBindingEnabled = !!inject(INPUT_BINDER, {
        optional: true
      });
      currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
      constructor() {
        this.resetConfig(this.config);
        this.navigationTransitions.setupNavigations(this).subscribe({
          error: (e2) => {
          }
        });
        this.subscribeToNavigationEvents();
      }
      eventsSubscription = new Subscription();
      subscribeToNavigationEvents() {
        const subscription = this.navigationTransitions.events.subscribe((e2) => {
          try {
            const currentTransition = this.navigationTransitions.currentTransition;
            const currentNavigation = untracked(this.navigationTransitions.currentNavigation);
            if (currentTransition !== null && currentNavigation !== null) {
              this.stateManager.handleRouterEvent(e2, currentNavigation);
              if (e2 instanceof NavigationCancel && e2.code !== NavigationCancellationCode.Redirect && e2.code !== NavigationCancellationCode.SupersededByNewNavigation) {
                this.navigated = true;
              } else if (e2 instanceof NavigationEnd) {
                this.navigated = true;
                this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config);
              } else if (e2 instanceof RedirectRequest) {
                const opts = e2.navigationBehaviorOptions;
                const mergedTree = this.urlHandlingStrategy.merge(e2.url, currentTransition.currentRawUrl);
                const extras = __spreadValues({
                  scroll: currentTransition.extras.scroll,
                  browserUrl: currentTransition.extras.browserUrl,
                  info: currentTransition.extras.info,
                  skipLocationChange: currentTransition.extras.skipLocationChange,
                  replaceUrl: currentTransition.extras.replaceUrl || this.urlUpdateStrategy === "eager" || isBrowserTriggeredNavigation(currentTransition.source)
                }, opts);
                this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras, currentTransition.hasUAVisualTransition, {
                  resolve: currentTransition.resolve,
                  reject: currentTransition.reject,
                  promise: currentTransition.promise
                });
              }
            }
            if (isPublicRouterEvent(e2)) {
              this._events.next(e2);
            }
          } catch (e3) {
            this.navigationTransitions.transitionAbortWithErrorSubject.next(e3);
          }
        });
        this.eventsSubscription.add(subscription);
      }
      resetRootComponentType(rootComponentType) {
        this.routerState.root.component = rootComponentType;
        this.navigationTransitions.rootComponentType = rootComponentType;
      }
      initialNavigation() {
        this.setUpLocationChangeListener();
        if (!this.navigationTransitions.hasRequestedNavigation) {
          this.navigateToSyncWithBrowser(this.location.path(true), IMPERATIVE_NAVIGATION, this.stateManager.restoredState(), {
            replaceUrl: true
          });
        }
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((url, state, source, extras, hasUAVisualTransition) => {
          this.navigateToSyncWithBrowser(url, source, state, extras, hasUAVisualTransition);
        });
      }
      navigateToSyncWithBrowser(url, source, state, extras, hasUAVisualTransition) {
        const restoredState = state?.navigationId ? state : null;
        const routerUrl = state?.\u0275routerUrl ?? url;
        if (state?.\u0275routerUrl) {
          extras = __spreadProps(__spreadValues({}, extras), {
            browserUrl: url
          });
        }
        if (state) {
          const stateCopy = __spreadValues({}, state);
          delete stateCopy.navigationId;
          delete stateCopy.\u0275routerPageId;
          delete stateCopy.\u0275routerUrl;
          if (Object.keys(stateCopy).length !== 0) {
            extras.state = stateCopy;
          }
        }
        const urlTree = this.parseUrl(routerUrl);
        this.scheduleNavigation(urlTree, source, restoredState, extras, hasUAVisualTransition).catch((e2) => {
          if (this.disposed) {
            return;
          }
          this.injector.get(INTERNAL_APPLICATION_ERROR_HANDLER)(e2);
        });
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return untracked(this.navigationTransitions.currentNavigation);
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(config) {
        (typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this._events.unsubscribe();
        this.navigationTransitions.complete();
        this.nonRouterCurrentEntryChangeSubscription?.unsubscribe();
        this.nonRouterCurrentEntryChangeSubscription = void 0;
        this.disposed = true;
        this.eventsSubscription.unsubscribe();
      }
      createUrlTree(commands, navigationExtras = {}) {
        const {
          relativeTo,
          queryParams,
          fragment,
          queryParamsHandling,
          preserveFragment
        } = navigationExtras;
        const f2 = preserveFragment ? this.currentUrlTree.fragment : fragment;
        let q = null;
        switch (queryParamsHandling ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            q = __spreadValues(__spreadValues({}, this.currentUrlTree.queryParams), queryParams);
            break;
          case "preserve":
            q = this.currentUrlTree.queryParams;
            break;
          default:
            q = queryParams || null;
        }
        if (q !== null) {
          q = this.removeEmptyProps(q);
        }
        let relativeToUrlSegmentGroup;
        try {
          const relativeToSnapshot = relativeTo ? relativeTo.snapshot : this.routerState.snapshot.root;
          relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeToSnapshot);
        } catch (e2) {
          if (typeof commands[0] !== "string" || commands[0][0] !== "/") {
            commands = [];
          }
          relativeToUrlSegmentGroup = this.currentUrlTree.root;
        }
        return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, q, f2 ?? null, this.urlSerializer);
      }
      navigateByUrl(url, extras = {
        skipLocationChange: false
      }) {
        const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
        const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras);
      }
      navigate(commands, extras = {
        skipLocationChange: false
      }) {
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
      }
      serializeUrl(url) {
        return this.urlSerializer.serialize(url);
      }
      parseUrl(url) {
        try {
          return this.urlSerializer.parse(url);
        } catch (e2) {
          this.console.warn(formatRuntimeError(4018, ngDevMode && `Error parsing URL ${url}. Falling back to '/' instead. 
` + e2));
          return this.urlSerializer.parse("/");
        }
      }
      isActive(url, matchOptions) {
        let options;
        if (matchOptions === true) {
          options = __spreadValues({}, exactMatchOptions);
        } else if (matchOptions === false) {
          options = __spreadValues({}, subsetMatchOptions);
        } else {
          options = __spreadValues(__spreadValues({}, subsetMatchOptions), matchOptions);
        }
        if (isUrlTree(url)) {
          return containsTree(this.currentUrlTree, url, options);
        }
        const urlTree = this.parseUrl(url);
        return containsTree(this.currentUrlTree, urlTree, options);
      }
      removeEmptyProps(params) {
        return Object.entries(params).reduce((result, [key, value]) => {
          if (value !== null && value !== void 0) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      scheduleNavigation(rawUrl, source, restoredState, extras, hasUAVisualTransition, priorPromise) {
        if (this.disposed) {
          return Promise.resolve(false);
        }
        let resolve;
        let reject;
        let promise;
        if (priorPromise) {
          resolve = priorPromise.resolve;
          reject = priorPromise.reject;
          promise = priorPromise.promise;
        } else {
          promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
        }
        const taskId = this.pendingTasks.add();
        afterNextNavigation(this, () => {
          queueMicrotask(() => this.pendingTasks.remove(taskId));
        });
        this.navigationTransitions.handleNavigationRequest({
          source,
          restoredState,
          currentUrlTree: this.currentUrlTree,
          currentRawUrl: this.currentUrlTree,
          rawUrl,
          extras,
          hasUAVisualTransition,
          resolve,
          reject,
          promise,
          currentSnapshot: this.routerState.snapshot,
          currentRouterState: this.routerState
        });
        return promise.catch(Promise.reject.bind(Promise));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Router,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _Router
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: Router,
      decorators: [{
        type: Service
      }],
      ctorParameters: () => []
    });
  }
});

// node_modules/@angular/router/fesm2022/_router_module-chunk.mjs
function isActiveMatchOptions(options) {
  const o2 = options;
  return !!(o2.paths || o2.matrixParams || o2.queryParams || o2.fragment);
}
function handleResultRejections(result) {
  result.finished?.catch(() => {
  });
  result.committed?.catch(() => {
  });
  return result;
}
function rootRoute() {
  return inject(Router).routerState.root;
}
function routerFeature(kind, providers) {
  return {
    \u0275kind: kind,
    \u0275providers: providers
  };
}
function getBootstrapListener() {
  const injector = inject(Injector);
  return (bootstrappedComponentRef) => {
    const ref = injector.get(ApplicationRef);
    if (bootstrappedComponentRef !== ref.components[0]) {
      return;
    }
    const router = injector.get(Router);
    const bootstrapDone = injector.get(BOOTSTRAP_DONE);
    if (injector.get(INITIAL_NAVIGATION) === 1) {
      router.initialNavigation();
    }
    injector.get(ROUTER_PRELOADER, null, {
      optional: true
    })?.setUpPreloading();
    injector.get(ROUTER_SCROLLER, null, {
      optional: true
    })?.init();
    router.resetRootComponentType(ref.componentTypes[0]);
    if (!bootstrapDone.closed) {
      bootstrapDone.next();
      bootstrapDone.complete();
      bootstrapDone.unsubscribe();
    }
  };
}
function withEnabledBlockingInitialNavigation() {
  const providers = [{
    provide: IS_ENABLED_BLOCKING_INITIAL_NAVIGATION,
    useValue: true
  }, {
    provide: INITIAL_NAVIGATION,
    useValue: 0
  }, provideAppInitializer(() => {
    const injector = inject(Injector);
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve());
    return locationInitialized.then(() => {
      return new Promise((resolve) => {
        const router = injector.get(Router);
        const bootstrapDone = injector.get(BOOTSTRAP_DONE);
        afterNextNavigation(router, () => {
          resolve(true);
        });
        injector.get(NavigationTransitions).afterPreactivation = () => {
          resolve(true);
          return bootstrapDone.closed ? of(void 0) : bootstrapDone;
        };
        router.initialNavigation();
      });
    });
  })];
  return routerFeature(2, providers);
}
function withDisabledInitialNavigation() {
  const providers = [provideAppInitializer(() => {
    inject(Router).setUpLocationChangeListener();
  }), {
    provide: INITIAL_NAVIGATION,
    useValue: 2
  }];
  return routerFeature(3, providers);
}
function withDebugTracing() {
  let providers = [];
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    providers = [{
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const router = inject(Router);
        return () => router.events.subscribe((e2) => {
          console.group?.(`Router Event: ${e2.constructor.name}`);
          console.log(stringifyEvent(e2));
          console.log(e2);
          console.groupEnd?.();
        });
      }
    }];
  } else {
    providers = [];
  }
  return routerFeature(1, providers);
}
function withPreloading(preloadingStrategy) {
  const providers = [{
    provide: ROUTER_PRELOADER,
    useExisting: RouterPreloader
  }, {
    provide: PreloadingStrategy,
    useExisting: preloadingStrategy
  }];
  return routerFeature(0, providers);
}
function withComponentInputBinding(options = {}) {
  const providers = [{
    provide: INPUT_BINDER,
    useFactory: () => new RoutedComponentInputBinder(options, inject(ROUTER_RESOURCES_FEATURE, {
      optional: true
    }))
  }];
  return routerFeature(8, providers);
}
function withViewTransitions(options) {
  performanceMarkFeature("NgRouterViewTransitions");
  const providers = [{
    provide: CREATE_VIEW_TRANSITION,
    useValue: createViewTransition
  }, {
    provide: VIEW_TRANSITION_OPTIONS,
    useValue: __spreadValues({
      skipNextTransition: !!options?.skipInitialTransition
    }, options)
  }];
  return routerFeature(9, providers);
}
function provideRouterScroller() {
  return {
    provide: ROUTER_SCROLLER,
    useFactory: () => {
      const viewportScroller = inject(ViewportScroller);
      const config = inject(ROUTER_CONFIGURATION);
      if (config.scrollOffset) {
        viewportScroller.setOffset(config.scrollOffset);
      }
      return new RouterScroller(config);
    }
  };
}
function provideHashLocationStrategy() {
  return {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  };
}
function providePathLocationStrategy() {
  return {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  };
}
function provideForRootGuard() {
  const router = inject(Router, {
    optional: true,
    skipSelf: true
  });
  if (router) {
    throw new RuntimeError(4007, `The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.`);
  }
  return "guarded";
}
function provideInitialNavigation(config) {
  return [config.initialNavigation === "disabled" ? withDisabledInitialNavigation().\u0275providers : [], config.initialNavigation === "enabledBlocking" ? withEnabledBlockingInitialNavigation().\u0275providers : []];
}
function provideRouterInitializer() {
  return [{
    provide: ROUTER_INITIALIZER,
    useFactory: getBootstrapListener
  }, {
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useExisting: ROUTER_INITIALIZER
  }];
}
var ReactiveRouterState, RouterLink, RouterLinkActive, PreloadingStrategy, PreloadAllModules, NoPreloading, RouterPreloader, ROUTER_SCROLLER, RouterScroller, NavigationStateManager, BOOTSTRAP_DONE, INITIAL_NAVIGATION, ROUTER_PRELOADER, ROUTER_DIRECTIVES, ROUTER_FORROOT_GUARD, ROUTER_PROVIDERS, RouterModule, ROUTER_INITIALIZER;
var init_router_module_chunk = __esm({
  "node_modules/@angular/router/fesm2022/_router_module-chunk.mjs"() {
    init_common();
    init_common();
    init_core();
    init_core();
    init_router_chunk();
    init_esm();
    init_operators();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    ReactiveRouterState = class _ReactiveRouterState {
      router = inject(Router);
      stateManager = inject(StateManager);
      fragment = signal("", ...ngDevMode ? [{
        debugName: "fragment"
      }] : []);
      queryParams = signal({}, ...ngDevMode ? [{
        debugName: "queryParams"
      }] : []);
      path = signal("", ...ngDevMode ? [{
        debugName: "path"
      }] : []);
      serializer = inject(UrlSerializer);
      constructor() {
        this.updateState();
        this.router.events?.subscribe((e2) => {
          if (e2 instanceof NavigationEnd) {
            this.updateState();
          }
        });
      }
      updateState() {
        const {
          fragment,
          root,
          queryParams
        } = this.stateManager.getCurrentUrlTree();
        this.fragment.set(fragment);
        this.queryParams.set(queryParams);
        this.path.set(this.serializer.serialize(new UrlTree(root)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _ReactiveRouterState,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _ReactiveRouterState
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: ReactiveRouterState,
      decorators: [{
        type: Service
      }],
      ctorParameters: () => []
    });
    RouterLink = class _RouterLink {
      router;
      route;
      tabIndexAttribute;
      renderer;
      el;
      locationStrategy;
      hrefAttributeValue = inject(new HostAttributeToken("href"), {
        optional: true
      });
      reactiveHref = linkedSignal(() => {
        if (!this.isAnchorElement) {
          return this.hrefAttributeValue;
        }
        this.reactiveRouterState.path();
        if (this._preserveFragment()) {
          this.reactiveRouterState.fragment();
        }
        const shouldTrackParams = (handling) => handling === "preserve" || handling === "merge";
        if (shouldTrackParams(this._queryParamsHandling()) || shouldTrackParams(this.options?.defaultQueryParamsHandling)) {
          this.reactiveRouterState.queryParams();
        }
        return this.computeHref(this.createUrlTree());
      }, ...ngDevMode ? [{
        debugName: "reactiveHref"
      }] : []);
      get href() {
        return untracked(this.reactiveHref);
      }
      set href(value) {
        this.reactiveHref.set(value);
      }
      set target(value) {
        this._target.set(value);
      }
      get target() {
        return untracked(this._target);
      }
      _target = signal(void 0, ...ngDevMode ? [{
        debugName: "_target"
      }] : []);
      set queryParams(value) {
        this._queryParams.set(value);
      }
      get queryParams() {
        return untracked(this._queryParams);
      }
      _queryParams = signal(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_queryParams"
      } : {}), {
        equal: () => false
      }));
      set fragment(value) {
        this._fragment.set(value);
      }
      get fragment() {
        return untracked(this._fragment);
      }
      _fragment = signal(void 0, ...ngDevMode ? [{
        debugName: "_fragment"
      }] : []);
      set queryParamsHandling(value) {
        this._queryParamsHandling.set(value);
      }
      get queryParamsHandling() {
        return untracked(this._queryParamsHandling);
      }
      _queryParamsHandling = signal(void 0, ...ngDevMode ? [{
        debugName: "_queryParamsHandling"
      }] : []);
      set state(value) {
        this._state.set(value);
      }
      get state() {
        return untracked(this._state);
      }
      _state = signal(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_state"
      } : {}), {
        equal: () => false
      }));
      set info(value) {
        this._info.set(value);
      }
      get info() {
        return untracked(this._info);
      }
      _info = signal(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "_info"
      } : {}), {
        equal: () => false
      }));
      set relativeTo(value) {
        this._relativeTo.set(value);
      }
      get relativeTo() {
        return untracked(this._relativeTo);
      }
      _relativeTo = signal(void 0, ...ngDevMode ? [{
        debugName: "_relativeTo"
      }] : []);
      set preserveFragment(value) {
        this._preserveFragment.set(value);
      }
      get preserveFragment() {
        return untracked(this._preserveFragment);
      }
      _preserveFragment = signal(false, ...ngDevMode ? [{
        debugName: "_preserveFragment"
      }] : []);
      set skipLocationChange(value) {
        this._skipLocationChange.set(value);
      }
      get skipLocationChange() {
        return untracked(this._skipLocationChange);
      }
      _skipLocationChange = signal(false, ...ngDevMode ? [{
        debugName: "_skipLocationChange"
      }] : []);
      set replaceUrl(value) {
        this._replaceUrl.set(value);
      }
      get replaceUrl() {
        return untracked(this._replaceUrl);
      }
      _replaceUrl = signal(false, ...ngDevMode ? [{
        debugName: "_replaceUrl"
      }] : []);
      browserUrl = input(void 0, ...ngDevMode ? [{
        debugName: "browserUrl"
      }] : []);
      isAnchorElement;
      onChanges = new Subject();
      applicationErrorHandler = inject(INTERNAL_APPLICATION_ERROR_HANDLER);
      options = inject(ROUTER_CONFIGURATION, {
        optional: true
      });
      reactiveRouterState = inject(ReactiveRouterState);
      constructor(router, route, tabIndexAttribute, renderer, el, locationStrategy) {
        this.router = router;
        this.route = route;
        this.tabIndexAttribute = tabIndexAttribute;
        this.renderer = renderer;
        this.el = el;
        this.locationStrategy = locationStrategy;
        const tagName = el.nativeElement.tagName?.toLowerCase();
        this.isAnchorElement = tagName === "a" || tagName === "area" || !!(typeof customElements === "object" && customElements.get(tagName)?.observedAttributes?.includes?.("href"));
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          effect(() => {
            if (isUrlTree(this.routerLinkInput()) && (this._fragment() !== void 0 || this._queryParams() || this._queryParamsHandling() || this._preserveFragment() || this._relativeTo())) {
              throw new RuntimeError(4017, "Cannot configure queryParams or fragment when using a UrlTree as the routerLink input value.");
            }
          });
        }
      }
      setTabIndexIfNotOnNativeEl(newTabIndex) {
        if (this.tabIndexAttribute != null || this.isAnchorElement) {
          return;
        }
        this.applyAttributeValue("tabindex", newTabIndex);
      }
      ngOnChanges(changes) {
        this.onChanges.next(this);
      }
      routerLinkInput = signal(null, ...ngDevMode ? [{
        debugName: "routerLinkInput"
      }] : []);
      set routerLink(commandsOrUrlTree) {
        if (commandsOrUrlTree == null) {
          this.routerLinkInput.set(null);
          this.setTabIndexIfNotOnNativeEl(null);
        } else {
          if (isUrlTree(commandsOrUrlTree)) {
            this.routerLinkInput.set(commandsOrUrlTree);
          } else {
            this.routerLinkInput.set(Array.isArray(commandsOrUrlTree) ? commandsOrUrlTree : [commandsOrUrlTree]);
          }
          this.setTabIndexIfNotOnNativeEl("0");
        }
      }
      onClick(button, ctrlKey, shiftKey, altKey, metaKey) {
        const urlTree = this.urlTree;
        if (urlTree === null) {
          return true;
        }
        if (this.isAnchorElement) {
          if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
            return true;
          }
          if (typeof this.target === "string" && this.target != "_self") {
            return true;
          }
        }
        const browserUrl = this.browserUrl();
        const extras = __spreadValues({
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info
        }, browserUrl !== void 0 && {
          browserUrl
        });
        this.router.navigateByUrl(urlTree, extras)?.catch((e2) => {
          this.applicationErrorHandler(e2);
        });
        return !this.isAnchorElement;
      }
      ngOnDestroy() {
      }
      applyAttributeValue(attrName, attrValue) {
        const renderer = this.renderer;
        const nativeElement = this.el.nativeElement;
        if (attrValue !== null) {
          renderer.setAttribute(nativeElement, attrName, attrValue);
        } else {
          renderer.removeAttribute(nativeElement, attrName);
        }
      }
      createUrlTree() {
        const routerLinkInput = this.routerLinkInput();
        if (routerLinkInput === null || !this.router.createUrlTree) {
          return null;
        } else if (isUrlTree(routerLinkInput)) {
          return routerLinkInput;
        }
        return this.router.createUrlTree(routerLinkInput, {
          relativeTo: this._relativeTo() !== void 0 ? this._relativeTo() : this.route,
          queryParams: this._queryParams(),
          fragment: this._fragment(),
          queryParamsHandling: this._queryParamsHandling(),
          preserveFragment: this._preserveFragment()
        });
      }
      get urlTree() {
        return untracked(() => this.createUrlTree());
      }
      computeHref(urlTree) {
        return urlTree !== null && this.locationStrategy ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(urlTree)) ?? "" : null;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterLink,
        deps: [{
          token: Router
        }, {
          token: ActivatedRoute
        }, {
          token: "tabindex",
          attribute: true
        }, {
          token: Renderer2
        }, {
          token: ElementRef
        }, {
          token: LocationStrategy
        }],
        target: FactoryTarget.Directive
      });
      static \u0275dir = \u0275\u0275ngDeclareDirective({
        minVersion: "17.1.0",
        version: "22.2.2",
        type: _RouterLink,
        isStandalone: true,
        selector: "[routerLink]",
        inputs: {
          target: {
            classPropertyName: "target",
            publicName: "target",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          queryParams: {
            classPropertyName: "queryParams",
            publicName: "queryParams",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          fragment: {
            classPropertyName: "fragment",
            publicName: "fragment",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          queryParamsHandling: {
            classPropertyName: "queryParamsHandling",
            publicName: "queryParamsHandling",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          state: {
            classPropertyName: "state",
            publicName: "state",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          info: {
            classPropertyName: "info",
            publicName: "info",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          relativeTo: {
            classPropertyName: "relativeTo",
            publicName: "relativeTo",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          },
          preserveFragment: {
            classPropertyName: "preserveFragment",
            publicName: "preserveFragment",
            isSignal: false,
            isRequired: false,
            transformFunction: booleanAttribute
          },
          skipLocationChange: {
            classPropertyName: "skipLocationChange",
            publicName: "skipLocationChange",
            isSignal: false,
            isRequired: false,
            transformFunction: booleanAttribute
          },
          replaceUrl: {
            classPropertyName: "replaceUrl",
            publicName: "replaceUrl",
            isSignal: false,
            isRequired: false,
            transformFunction: booleanAttribute
          },
          browserUrl: {
            classPropertyName: "browserUrl",
            publicName: "browserUrl",
            isSignal: true,
            isRequired: false,
            transformFunction: null
          },
          routerLink: {
            classPropertyName: "routerLink",
            publicName: "routerLink",
            isSignal: false,
            isRequired: false,
            transformFunction: null
          }
        },
        host: {
          listeners: {
            "click": "onClick($event.button,$event.ctrlKey,$event.shiftKey,$event.altKey,$event.metaKey)"
          },
          properties: {
            "attr.href": "reactiveHref()",
            "attr.target": "_target()"
          }
        },
        usesOnChanges: true,
        ngImport: core_exports
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterLink,
      decorators: [{
        type: Directive,
        args: [{
          selector: "[routerLink]",
          host: {
            "[attr.href]": "reactiveHref()",
            "[attr.target]": "_target()"
          }
        }]
      }],
      ctorParameters: () => [{
        type: Router
      }, {
        type: ActivatedRoute
      }, {
        type: void 0,
        decorators: [{
          type: Attribute,
          args: ["tabindex"]
        }]
      }, {
        type: Renderer2
      }, {
        type: ElementRef
      }, {
        type: LocationStrategy
      }],
      propDecorators: {
        target: [{
          type: Input
        }],
        queryParams: [{
          type: Input
        }],
        fragment: [{
          type: Input
        }],
        queryParamsHandling: [{
          type: Input
        }],
        state: [{
          type: Input
        }],
        info: [{
          type: Input
        }],
        relativeTo: [{
          type: Input
        }],
        preserveFragment: [{
          type: Input,
          args: [{
            transform: booleanAttribute
          }]
        }],
        skipLocationChange: [{
          type: Input,
          args: [{
            transform: booleanAttribute
          }]
        }],
        replaceUrl: [{
          type: Input,
          args: [{
            transform: booleanAttribute
          }]
        }],
        browserUrl: [{
          type: Input,
          args: [{
            isSignal: true,
            alias: "browserUrl",
            required: false
          }]
        }],
        routerLink: [{
          type: Input
        }],
        onClick: [{
          type: HostListener,
          args: ["click", ["$event.button", "$event.ctrlKey", "$event.shiftKey", "$event.altKey", "$event.metaKey"]]
        }]
      }
    });
    RouterLinkActive = class _RouterLinkActive {
      router;
      element;
      renderer;
      cdr;
      links;
      classes = [];
      routerEventsSubscription;
      linkInputChangesSubscription;
      _isActive = false;
      get isActive() {
        return this._isActive;
      }
      routerLinkActiveOptions = {
        exact: false
      };
      ariaCurrentWhenActive;
      isActiveChange = new EventEmitter();
      link = inject(RouterLink, {
        optional: true
      });
      constructor(router, element, renderer, cdr) {
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.routerEventsSubscription = router.events.subscribe((s3) => {
          if (s3 instanceof NavigationEnd) {
            this.update();
          }
        });
      }
      ngAfterContentInit() {
        of(this.links.changes, of(null)).pipe(mergeAll()).subscribe((_) => {
          this.update();
          this.subscribeToEachLinkOnChanges();
        });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        const allLinkChanges = [...this.links.toArray(), this.link].filter((link) => !!link).map((link) => link.onChanges);
        this.linkInputChangesSubscription = from(allLinkChanges).pipe(mergeAll()).subscribe((link) => {
          if (this._isActive !== this.isLinkActive(this.router)(link)) {
            this.update();
          }
        });
      }
      set routerLinkActive(data) {
        if (data == null) {
          this.classes = [];
          return;
        }
        const classes = Array.isArray(data) ? data : data.split(" ");
        this.classes = classes.filter((c3) => !!c3);
      }
      ngOnChanges(changes) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe();
        this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        if (!this.links || !this.router.navigated) return;
        if (this.routerLinkActiveOptions === null && !this._isActive) return;
        queueMicrotask(() => {
          const hasActiveLinks = this.hasActiveLinks();
          this.classes.forEach((c3) => {
            if (hasActiveLinks) {
              this.renderer.addClass(this.element.nativeElement, c3);
            } else {
              this.renderer.removeClass(this.element.nativeElement, c3);
            }
          });
          if (hasActiveLinks && this.ariaCurrentWhenActive !== void 0) {
            this.renderer.setAttribute(this.element.nativeElement, "aria-current", this.ariaCurrentWhenActive.toString());
          } else {
            this.renderer.removeAttribute(this.element.nativeElement, "aria-current");
          }
          if (this._isActive !== hasActiveLinks) {
            this._isActive = hasActiveLinks;
            this.cdr.markForCheck();
            this.isActiveChange.emit(hasActiveLinks);
          }
        });
      }
      isLinkActive(router) {
        const opts = this.routerLinkActiveOptions;
        if (opts === null) {
          return () => false;
        }
        let options;
        if (opts === void 0) {
          options = __spreadValues({}, subsetMatchOptions);
        } else if (isActiveMatchOptions(opts)) {
          options = opts;
        } else if (opts.exact ?? false) {
          options = __spreadValues({}, exactMatchOptions);
        } else {
          options = __spreadValues({}, subsetMatchOptions);
        }
        return (link) => {
          const urlTree = link.urlTree;
          return urlTree ? untracked(isActive(urlTree, router, options)) : false;
        };
      }
      hasActiveLinks() {
        const isActiveCheckFn = this.isLinkActive(this.router);
        return this.link && isActiveCheckFn(this.link) || this.links.some(isActiveCheckFn);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterLinkActive,
        deps: [{
          token: Router
        }, {
          token: ElementRef
        }, {
          token: Renderer2
        }, {
          token: ChangeDetectorRef
        }],
        target: FactoryTarget.Directive
      });
      static \u0275dir = \u0275\u0275ngDeclareDirective({
        minVersion: "14.0.0",
        version: "22.2.2",
        type: _RouterLinkActive,
        isStandalone: true,
        selector: "[routerLinkActive]",
        inputs: {
          routerLinkActiveOptions: "routerLinkActiveOptions",
          ariaCurrentWhenActive: "ariaCurrentWhenActive",
          routerLinkActive: "routerLinkActive"
        },
        outputs: {
          isActiveChange: "isActiveChange"
        },
        queries: [{
          propertyName: "links",
          predicate: RouterLink,
          descendants: true
        }],
        exportAs: ["routerLinkActive"],
        usesOnChanges: true,
        ngImport: core_exports
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterLinkActive,
      decorators: [{
        type: Directive,
        args: [{
          selector: "[routerLinkActive]",
          exportAs: "routerLinkActive"
        }]
      }],
      ctorParameters: () => [{
        type: Router
      }, {
        type: ElementRef
      }, {
        type: Renderer2
      }, {
        type: ChangeDetectorRef
      }],
      propDecorators: {
        links: [{
          type: ContentChildren,
          args: [RouterLink, {
            descendants: true
          }]
        }],
        routerLinkActiveOptions: [{
          type: Input
        }],
        ariaCurrentWhenActive: [{
          type: Input
        }],
        isActiveChange: [{
          type: Output
        }],
        routerLinkActive: [{
          type: Input
        }]
      }
    });
    PreloadingStrategy = class {
    };
    PreloadAllModules = class _PreloadAllModules {
      preload(route, fn) {
        return fn().pipe(catchError(() => of(null)));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _PreloadAllModules,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _PreloadAllModules
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: PreloadAllModules,
      decorators: [{
        type: Service
      }]
    });
    NoPreloading = class _NoPreloading {
      preload(route, fn) {
        return of(null);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NoPreloading,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NoPreloading
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: NoPreloading,
      decorators: [{
        type: Service
      }]
    });
    RouterPreloader = class _RouterPreloader {
      router;
      injector;
      preloadingStrategy;
      loader;
      subscription;
      constructor(router, injector, preloadingStrategy, loader) {
        this.router = router;
        this.injector = injector;
        this.preloadingStrategy = preloadingStrategy;
        this.loader = loader;
      }
      setUpPreloading() {
        this.subscription = this.router.events.pipe(filter((e2) => e2 instanceof NavigationEnd), concatMap(() => this.preload())).subscribe(() => {
        });
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      processRoutes(injector, routes) {
        const res = [];
        for (const route of routes) {
          if (route.providers && !route._injector) {
            route._injector = createEnvironmentInjector(route.providers, injector, typeof ngDevMode === "undefined" || ngDevMode ? `Route: ${route.path}` : "");
          }
          const injectorForCurrentRoute = route._injector ?? injector;
          if (route._loadedNgModuleFactory && !route._loadedInjector) {
            route._loadedInjector = route._loadedNgModuleFactory.create(injectorForCurrentRoute).injector;
          }
          const injectorForChildren = route._loadedInjector ?? injectorForCurrentRoute;
          if (route.loadChildren && !route._loadedRoutes && route.canLoad === void 0 || route.loadComponent && !route._loadedComponent) {
            res.push(this.preloadConfig(injectorForCurrentRoute, route));
          }
          if (route.children || route._loadedRoutes) {
            res.push(this.processRoutes(injectorForChildren, route.children ?? route._loadedRoutes));
          }
        }
        return from(res).pipe(mergeAll());
      }
      preloadConfig(injector, route) {
        return this.preloadingStrategy.preload(route, () => {
          if (injector.destroyed) {
            return of(null);
          }
          let loadedChildren$;
          if (route.loadChildren && route.canLoad === void 0) {
            loadedChildren$ = from(this.loader.loadChildren(injector, route));
          } else {
            loadedChildren$ = of(null);
          }
          const recursiveLoadChildren$ = loadedChildren$.pipe(mergeMap((config) => {
            if (config === null) {
              return of(void 0);
            }
            route._loadedRoutes = config.routes;
            route._loadedInjector = config.injector;
            route._loadedNgModuleFactory = config.factory;
            return this.processRoutes(config.injector ?? injector, config.routes);
          }));
          if (route.loadComponent && !route._loadedComponent) {
            const loadComponent$ = this.loader.loadComponent(injector, route);
            return from([recursiveLoadChildren$, loadComponent$]).pipe(mergeAll());
          } else {
            return recursiveLoadChildren$;
          }
        });
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterPreloader,
        deps: [{
          token: Router
        }, {
          token: EnvironmentInjector
        }, {
          token: PreloadingStrategy
        }, {
          token: RouterConfigLoader
        }],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterPreloader,
        providedIn: "root"
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterPreloader,
      decorators: [{
        type: Injectable,
        args: [{
          providedIn: "root"
        }]
      }],
      ctorParameters: () => [{
        type: Router
      }, {
        type: EnvironmentInjector
      }, {
        type: PreloadingStrategy
      }, {
        type: RouterConfigLoader
      }]
    });
    ROUTER_SCROLLER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "Router Scroller" : "");
    RouterScroller = class _RouterScroller {
      options;
      routerEventsSubscription;
      scrollEventsSubscription;
      lastId = 0;
      lastSource = IMPERATIVE_NAVIGATION;
      restoredId = 0;
      store = {};
      isHydrating = inject(IS_HYDRATION_DOM_REUSE_ENABLED, {
        optional: true
      }) ?? false;
      urlSerializer = inject(UrlSerializer);
      zone = inject(NgZone);
      viewportScroller = inject(ViewportScroller);
      transitions = inject(NavigationTransitions);
      constructor(options) {
        this.options = options;
        this.options.scrollPositionRestoration ||= "disabled";
        this.options.anchorScrolling ||= "disabled";
        if (this.isHydrating) {
          inject(ApplicationRef).whenStable().then(() => {
            this.isHydrating = false;
          });
        }
      }
      init() {
        if (this.options.scrollPositionRestoration !== "disabled") {
          this.viewportScroller.setHistoryScrollRestoration("manual");
        }
        this.routerEventsSubscription = this.createScrollEvents();
        this.scrollEventsSubscription = this.consumeScrollEvents();
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((e2) => {
          if (e2 instanceof NavigationStart) {
            this.store[this.lastId] = this.viewportScroller.getScrollPosition();
            this.lastSource = e2.navigationTrigger;
            this.restoredId = e2.restoredState ? e2.restoredState.navigationId : 0;
          } else if (e2 instanceof NavigationEnd) {
            this.lastId = e2.id;
            this.scheduleScrollEvent(e2, this.urlSerializer.parse(e2.urlAfterRedirects).fragment);
          } else if (e2 instanceof NavigationSkipped && e2.code === NavigationSkippedCode.IgnoredSameUrlNavigation) {
            this.lastSource = void 0;
            this.restoredId = 0;
            this.scheduleScrollEvent(e2, this.urlSerializer.parse(e2.url).fragment);
          }
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((e2) => {
          if (!(e2 instanceof Scroll) || e2.scrollBehavior === "manual") return;
          const instantScroll = {
            behavior: "instant"
          };
          if (e2.position) {
            if (this.options.scrollPositionRestoration === "top") {
              this.viewportScroller.scrollToPosition([0, 0], instantScroll);
            } else if (this.options.scrollPositionRestoration === "enabled") {
              this.viewportScroller.scrollToPosition(e2.position, instantScroll);
            }
          } else {
            if (e2.anchor && this.options.anchorScrolling === "enabled") {
              this.viewportScroller.scrollToAnchor(e2.anchor);
            } else if (this.options.scrollPositionRestoration !== "disabled") {
              this.viewportScroller.scrollToPosition([0, 0]);
            }
          }
        });
      }
      scheduleScrollEvent(routerEvent, anchor) {
        if (this.isHydrating) return;
        const scroll = untracked(this.transitions.currentNavigation)?.extras.scroll;
        this.zone.runOutsideAngular(() => __async(this, null, function* () {
          yield new Promise((resolve) => {
            setTimeout(resolve);
            if (typeof requestAnimationFrame !== "undefined") {
              requestAnimationFrame(resolve);
            }
          });
          this.zone.run(() => {
            this.transitions.events.next(new Scroll(routerEvent, this.lastSource === "popstate" ? this.store[this.restoredId] : null, anchor, scroll));
          });
        }));
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe();
        this.scrollEventsSubscription?.unsubscribe();
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterScroller,
        deps: "invalid",
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterScroller
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterScroller,
      decorators: [{
        type: Injectable
      }],
      ctorParameters: () => [{
        type: void 0
      }]
    });
    NavigationStateManager = class _NavigationStateManager extends StateManager {
      injector = inject(EnvironmentInjector);
      navigation = inject(PlatformNavigation);
      inMemoryScrollingEnabled = inject(ROUTER_SCROLLER, {
        optional: true
      }) !== null;
      base = new URL(inject(PlatformLocation).href).origin;
      appRootUrl = new URL(this.location.prepareExternalUrl?.("/") ?? "/", this.base);
      precommitHandlerSupported = inject(PRECOMMIT_HANDLER_SUPPORTED);
      activeHistoryEntry = this.navigation.currentEntry;
      currentNavigation = {};
      nonRouterCurrentEntryChangeSubject = new Subject();
      nonRouterEntryChangeListener;
      get registered() {
        return this.nonRouterEntryChangeListener !== void 0 && !this.nonRouterEntryChangeListener.closed;
      }
      constructor() {
        super();
        const navigateListener = (event) => {
          this.handleNavigate(event);
        };
        this.navigation.addEventListener("navigate", navigateListener);
        inject(DestroyRef).onDestroy(() => this.navigation.removeEventListener("navigate", navigateListener));
      }
      registerNonRouterCurrentEntryChangeListener(listener) {
        this.activeHistoryEntry = this.navigation.currentEntry;
        this.nonRouterEntryChangeListener = this.nonRouterCurrentEntryChangeSubject.subscribe(({
          path,
          state,
          hasUAVisualTransition
        }) => {
          listener(path, state, "popstate", !this.precommitHandlerSupported ? {
            replaceUrl: true
          } : {}, hasUAVisualTransition);
        });
        return this.nonRouterEntryChangeListener;
      }
      handleRouterEvent(e2, transition) {
        return __async(this, null, function* () {
          this.currentNavigation = __spreadProps(__spreadValues({}, this.currentNavigation), {
            routerTransition: transition
          });
          if (e2 instanceof NavigationStart) {
            this.updateStateMemento();
            if (this.precommitHandlerSupported) {
              this.maybeCreateNavigationForTransition(transition);
            }
          } else if (e2 instanceof NavigationSkipped) {
            this.finishNavigation();
            this.commitTransition(transition);
          } else if (e2 instanceof BeforeRoutesRecognized) {
            transition.routesRecognizeHandler.deferredHandle = new Promise((resolve) => __async(this, null, function* () {
              if (this.urlUpdateStrategy === "eager") {
                try {
                  this.maybeCreateNavigationForTransition(transition);
                  yield this.currentNavigation.commitUrl?.();
                } catch (e3) {
                  return;
                }
              }
              resolve();
            }));
          } else if (e2 instanceof BeforeActivateRoutes) {
            transition.beforeActivateHandler.deferredHandle = new Promise((resolve) => __async(this, null, function* () {
              if (this.urlUpdateStrategy === "deferred") {
                try {
                  this.maybeCreateNavigationForTransition(transition);
                  yield this.currentNavigation.commitUrl?.();
                } catch (e3) {
                  return;
                }
              }
              this.commitTransition(transition);
              resolve();
            }));
          } else if (e2 instanceof NavigationCancel || e2 instanceof NavigationError) {
            const redirectingBeforeUrlCommit = e2 instanceof NavigationCancel && e2.code === NavigationCancellationCode.Redirect && !!this.currentNavigation.commitUrl;
            if (redirectingBeforeUrlCommit) {
              return;
            }
            void this.cancel(transition, e2);
          } else if (e2 instanceof NavigationEnd) {
            const {
              resolveHandler,
              removeAbortListener
            } = this.currentNavigation;
            this.currentNavigation = {};
            removeAbortListener?.();
            this.activeHistoryEntry = this.navigation.currentEntry;
            afterNextRender({
              read: () => resolveHandler?.()
            }, {
              injector: this.injector
            });
          }
        });
      }
      maybeCreateNavigationForTransition(transition) {
        const {
          navigationEvent,
          commitUrl
        } = this.currentNavigation;
        if (commitUrl || navigationEvent && navigationEvent.navigationType === "traverse" && this.eventAndRouterDestinationsMatch(navigationEvent, transition)) {
          return;
        }
        this.currentNavigation.removeAbortListener?.();
        const path = this.createBrowserPath(transition);
        this.navigate(path, transition);
      }
      navigate(internalPath, transition) {
        const path = transition.extras.skipLocationChange ? this.navigation.currentEntry.url : this.location.prepareExternalUrl(internalPath);
        const state = __spreadValues(__spreadValues({}, transition.extras.state), this.generateNgRouterState(transition));
        const info = {
          \u0275routerInfo: {
            intercept: true
          }
        };
        if (!this.navigation.transition && this.currentNavigation.navigationEvent) {
          transition.extras.replaceUrl = false;
        }
        const history = this.location.isCurrentPathEqualTo(path) || transition.extras.replaceUrl || transition.extras.skipLocationChange ? "replace" : "push";
        handleResultRejections(this.navigation.navigate(path, {
          state,
          history,
          info
        }));
      }
      finishNavigation() {
        this.currentNavigation.commitUrl?.();
        this.currentNavigation?.resolveHandler?.();
        this.currentNavigation = {};
      }
      cancel(transition, cause) {
        return __async(this, null, function* () {
          this.currentNavigation.rejectNavigateEvent?.();
          const clearedState = {};
          this.currentNavigation = clearedState;
          if (isRedirectingEvent(cause)) {
            if (cause instanceof NavigationCancel && cause.code === NavigationCancellationCode.Redirect && this.routerState === transition.targetRouterState) {
              this.resetInternalState(transition.finalUrl, false);
            }
            return;
          }
          const isTraversalReset = this.canceledNavigationResolution === "computed" && this.navigation.currentEntry.key !== this.activeHistoryEntry.key;
          this.resetInternalState(transition.finalUrl, isTraversalReset);
          if (this.navigation.currentEntry.id === this.activeHistoryEntry.id) {
            return;
          }
          if (cause instanceof NavigationCancel && cause.code === NavigationCancellationCode.Aborted) {
            yield Promise.resolve();
            if (this.currentNavigation !== clearedState) {
              return;
            }
          }
          if (isTraversalReset) {
            handleResultRejections(this.navigation.traverseTo(this.activeHistoryEntry.key, {
              info: {
                \u0275routerInfo: {
                  intercept: false
                }
              }
            }));
          } else {
            const internalPath = this.urlSerializer.serialize(this.getCurrentUrlTree());
            const pathOrUrl = this.location.prepareExternalUrl(internalPath);
            handleResultRejections(this.navigation.navigate(pathOrUrl, {
              state: this.activeHistoryEntry.getState(),
              history: "replace",
              info: {
                \u0275routerInfo: {
                  intercept: false
                }
              }
            }));
          }
        });
      }
      resetInternalState(finalUrl, traversalReset) {
        this.routerState = this.stateMemento.routerState;
        this.currentUrlTree = this.stateMemento.currentUrlTree;
        this.rawUrlTree = traversalReset ? this.stateMemento.rawUrlTree : this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl ?? this.rawUrlTree);
      }
      handleNavigate(event) {
        if (!event.canIntercept || event.navigationType === "reload") {
          return;
        }
        const routerInfo = event?.info?.\u0275routerInfo;
        if (routerInfo && !routerInfo.intercept) {
          return;
        }
        const isTriggeredByRouterTransition = !!routerInfo;
        if (!isTriggeredByRouterTransition) {
          const {
            pathname: destPathname,
            origin: destOrigin
          } = new URL(event.destination.url);
          const {
            pathname: rootPathname,
            origin: appOrigin
          } = this.appRootUrl;
          const rootPath = rootPathname.endsWith("/") ? rootPathname : rootPathname + "/";
          if (destOrigin !== appOrigin || destPathname !== rootPathname && !destPathname.startsWith(rootPath)) {
            return;
          }
          this.currentNavigation.routerTransition?.abort();
          if (!this.registered) {
            this.finishNavigation();
            return;
          }
        }
        this.currentNavigation = __spreadValues({}, this.currentNavigation);
        this.currentNavigation.navigationEvent = event;
        const abortHandler = () => {
          this.currentNavigation.routerTransition?.abort();
        };
        event.signal.addEventListener("abort", abortHandler, {
          once: true
        });
        this.currentNavigation.removeAbortListener = () => event.signal.removeEventListener("abort", abortHandler);
        let scroll = this.inMemoryScrollingEnabled ? "manual" : this.currentNavigation.routerTransition?.extras.scroll ?? "after-transition";
        const interceptOptions = {
          scroll
        };
        const {
          promise: handlerPromise,
          resolve: resolveHandler,
          reject: rejectHandler
        } = promiseWithResolvers();
        const {
          promise: precommitHandlerPromise,
          resolve: resolvePrecommitHandler,
          reject: rejectPrecommitHandler
        } = promiseWithResolvers();
        this.currentNavigation.rejectNavigateEvent = () => {
          event.signal.removeEventListener("abort", abortHandler);
          rejectPrecommitHandler();
          rejectHandler();
        };
        this.currentNavigation.resolveHandler = () => {
          this.currentNavigation.removeAbortListener?.();
          resolveHandler();
        };
        handlerPromise.catch(() => {
        });
        precommitHandlerPromise.catch(() => {
        });
        interceptOptions.handler = () => handlerPromise;
        if (this.deferredCommitSupported(event)) {
          const redirect = new Promise((resolve) => {
            interceptOptions.precommitHandler = (controller) => {
              if (this.navigation.transition?.navigationType === "traverse") {
                resolve(() => {
                });
              } else {
                resolve(controller.redirect.bind(controller));
              }
              return precommitHandlerPromise;
            };
          });
          this.currentNavigation.commitUrl = () => __async(this, null, function* () {
            this.currentNavigation.commitUrl = void 0;
            const transition = this.currentNavigation.routerTransition;
            if (transition && !transition.extras.skipLocationChange) {
              const internalPath = this.createBrowserPath(transition);
              const history = this.location.isCurrentPathEqualTo(internalPath) || !!transition.extras.replaceUrl ? "replace" : "push";
              const state = __spreadValues(__spreadValues({}, transition.extras.state), this.generateNgRouterState(transition));
              const pathOrUrl = this.location.prepareExternalUrl(internalPath);
              (yield redirect)(pathOrUrl, {
                state,
                history
              });
            }
            resolvePrecommitHandler();
            return yield this.navigation.transition?.committed;
          });
        }
        event.intercept(interceptOptions);
        if (!isTriggeredByRouterTransition) {
          this.handleNavigateEventTriggeredOutsideRouterAPIs(event);
        }
      }
      handleNavigateEventTriggeredOutsideRouterAPIs(event) {
        const path = event.destination.url.substring(this.appRootUrl.href.length - 1);
        const state = event.destination.getState();
        this.nonRouterCurrentEntryChangeSubject.next({
          path,
          state,
          hasUAVisualTransition: event.hasUAVisualTransition
        });
      }
      eventAndRouterDestinationsMatch(navigateEvent, transition) {
        const internalPath = this.createBrowserPath(transition);
        const eventDestination = new URL(navigateEvent.destination.url);
        const routerDestination = new URL(this.location.prepareExternalUrl(internalPath), eventDestination.origin);
        eventDestination.searchParams.sort();
        routerDestination.searchParams.sort();
        const {
          pathname: destPathname,
          search: destSearch,
          hash: hashDest
        } = routerDestination;
        const {
          pathname: eventDestPathname,
          search: eventDestSearch,
          hash: eventDestHash
        } = eventDestination;
        return destSearch === eventDestSearch && hashDest === eventDestHash && Location.stripTrailingSlash(destPathname) === Location.stripTrailingSlash(eventDestPathname);
      }
      generateNgRouterState(transition) {
        return __spreadProps(__spreadValues({}, this.routerUrlState(transition)), {
          navigationId: transition.id
        });
      }
      deferredCommitSupported(event) {
        return this.precommitHandlerSupported && event.cancelable;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NavigationStateManager,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _NavigationStateManager
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: NavigationStateManager,
      decorators: [{
        type: Service
      }],
      ctorParameters: () => []
    });
    BOOTSTRAP_DONE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "bootstrap done indicator" : "", {
      factory: () => {
        return new Subject();
      }
    });
    INITIAL_NAVIGATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "initial navigation" : "", {
      factory: () => 1
    });
    ROUTER_PRELOADER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router preloader" : "");
    ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkActive, \u0275EmptyOutletComponent];
    ROUTER_FORROOT_GUARD = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router duplicate forRoot guard" : "");
    ROUTER_PROVIDERS = [Location, {
      provide: UrlSerializer,
      useClass: DefaultUrlSerializer
    }, Router, ChildrenOutletContexts, {
      provide: ActivatedRoute,
      useFactory: rootRoute
    }, RouterConfigLoader];
    RouterModule = class _RouterModule {
      constructor() {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          inject(ROUTER_FORROOT_GUARD, {
            optional: true
          });
        }
      }
      static forRoot(routes, config) {
        return {
          ngModule: _RouterModule,
          providers: [ROUTER_PROVIDERS, typeof ngDevMode === "undefined" || ngDevMode ? config?.enableTracing ? withDebugTracing().\u0275providers : [] : [], {
            provide: ROUTES,
            multi: true,
            useValue: routes
          }, typeof ngDevMode === "undefined" || ngDevMode ? {
            provide: ROUTER_FORROOT_GUARD,
            useFactory: provideForRootGuard
          } : [], config?.errorHandler ? {
            provide: NAVIGATION_ERROR_HANDLER,
            useValue: config.errorHandler
          } : [], {
            provide: ROUTER_CONFIGURATION,
            useValue: config ? config : {}
          }, config?.useHash ? provideHashLocationStrategy() : providePathLocationStrategy(), provideRouterScroller(), config?.preloadingStrategy ? withPreloading(config.preloadingStrategy).\u0275providers : [], config?.initialNavigation ? provideInitialNavigation(config) : [], config?.bindToComponentInputs ? withComponentInputBinding(typeof config.bindToComponentInputs === "object" ? config.bindToComponentInputs : {}).\u0275providers : [], config?.enableViewTransitions ? withViewTransitions().\u0275providers : [], provideRouterInitializer()]
        };
      }
      static forChild(routes) {
        return {
          ngModule: _RouterModule,
          providers: [{
            provide: ROUTES,
            multi: true,
            useValue: routes
          }]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterModule,
        imports: [RouterOutlet, RouterLink, RouterLinkActive, \u0275EmptyOutletComponent],
        exports: [RouterOutlet, RouterLink, RouterLinkActive, \u0275EmptyOutletComponent]
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterModule
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterModule,
      decorators: [{
        type: NgModule,
        args: [{
          imports: ROUTER_DIRECTIVES,
          exports: ROUTER_DIRECTIVES
        }]
      }],
      ctorParameters: () => []
    });
    ROUTER_INITIALIZER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "Router Initializer" : "");
  }
});

// node_modules/@angular/router/fesm2022/router.mjs
var init_router = __esm({
  "node_modules/@angular/router/fesm2022/router.mjs"() {
    init_router_chunk();
    init_router_module_chunk();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
  }
});

// node_modules/@ionic/core/components/p-HthJZjZ6.js
var a, d2, c2, p, m, l3, f, u, h, w, b, y, g;
var init_p_HthJZjZ6 = __esm({
  "node_modules/@ionic/core/components/p-HthJZjZ6.js"() {
    init_p_Ct2aBEue();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    a = (o2) => c2(o2);
    d2 = (o2, i) => ("string" == typeof o2 && (i = o2, o2 = void 0), a(o2).includes(i));
    c2 = (o2 = window) => {
      if (void 0 === o2) return [];
      o2.Ionic = o2.Ionic || {};
      let i = o2.Ionic.platforms;
      return null == i && (i = o2.Ionic.platforms = p(o2), i.forEach(((i2) => o2.document.documentElement.classList.add(`plt-${i2}`)))), i;
    };
    p = (i) => {
      const t2 = e.get("platform");
      return Object.keys(g).filter(((o2) => {
        const e2 = t2?.[o2];
        return "function" == typeof e2 ? e2(i) : g[o2](i);
      }));
    };
    m = (o2) => !!b(o2, /iPad/i) || !(!b(o2, /Macintosh/i) || !f(o2));
    l3 = (o2) => b(o2, /android|sink/i);
    f = (o2) => y(o2, "(any-pointer:coarse)");
    u = (o2) => h(o2) || w(o2);
    h = (o2) => !!(o2.cordova || o2.phonegap || o2.PhoneGap);
    w = (o2) => {
      const i = o2.Capacitor;
      return !!i?.isNativePlatform?.();
    };
    b = (o2, i) => i.test(o2.navigator.userAgent);
    y = (o2, i) => o2.matchMedia?.(i).matches;
    g = { ipad: m, iphone: (o2) => b(o2, /iPhone/i), ios: (o2) => b(o2, /iPhone|iPod/i) || m(o2), android: l3, phablet: (o2) => {
      const i = o2.innerWidth, t2 = o2.innerHeight, e2 = Math.min(i, t2), n2 = Math.max(i, t2);
      return e2 > 390 && e2 < 520 && n2 > 620 && n2 < 800;
    }, tablet: (o2) => {
      const i = o2.innerWidth, t2 = o2.innerHeight, e2 = Math.min(i, t2), n2 = Math.max(i, t2);
      return m(o2) || ((o3) => l3(o3) && !b(o3, /mobile/i))(o2) || e2 > 460 && e2 < 820 && n2 > 780 && n2 < 1400;
    }, cordova: h, capacitor: w, electron: (o2) => b(o2, /electron/i), pwa: (o2) => !(!o2.matchMedia?.("(display-mode: standalone)").matches && !o2.navigator.standalone), mobile: f, mobileweb: (o2) => f(o2) && !u(o2), desktop: (o2) => !f(o2), hybrid: u };
  }
});

// node_modules/@ionic/core/components/index.js
var init_components = __esm({
  "node_modules/@ionic/core/components/index.js"() {
    init_p_C7r5Gja6();
    init_p_HthJZjZ6();
    init_p_B4IBdPVJ();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
  }
});

// node_modules/@ionic/angular/dist/common/providers/platform.js
var Platform, readQueryParam, proxyEvent;
var init_platform = __esm({
  "node_modules/@ionic/angular/dist/common/providers/platform.js"() {
    init_common();
    init_core();
    init_components();
    init_esm();
    init_core();
    Platform = class _Platform {
      doc;
      _readyPromise;
      win;
      /**
       * @hidden
       */
      backButton = new Subject();
      /**
       * The keyboardDidShow event emits when the
       * on-screen keyboard is presented.
       */
      keyboardDidShow = new Subject();
      /**
       * The keyboardDidHide event emits when the
       * on-screen keyboard is hidden.
       */
      keyboardDidHide = new Subject();
      /**
       * The pause event emits when the native platform puts the application
       * into the background, typically when the user switches to a different
       * application. This event would emit when a Cordova app is put into
       * the background, however, it would not fire on a standard web browser.
       */
      pause = new Subject();
      /**
       * The resume event emits when the native platform pulls the application
       * out from the background. This event would emit when a Cordova app comes
       * out from the background, however, it would not fire on a standard web browser.
       */
      resume = new Subject();
      /**
       * The resize event emits when the browser window has changed dimensions. This
       * could be from a browser window being physically resized, or from a device
       * changing orientation.
       */
      resize = new Subject();
      constructor(doc, zone) {
        this.doc = doc;
        zone.run(() => {
          this.win = doc.defaultView;
          this.backButton.subscribeWithPriority = function(priority, callback) {
            return this.subscribe((ev) => {
              return ev.register(priority, (processNextHandler) => zone.run(() => callback(processNextHandler)));
            });
          };
          proxyEvent(this.pause, doc, "pause", zone);
          proxyEvent(this.resume, doc, "resume", zone);
          proxyEvent(this.backButton, doc, "ionBackButton", zone);
          proxyEvent(this.resize, this.win, "resize", zone);
          proxyEvent(this.keyboardDidShow, this.win, "ionKeyboardDidShow", zone);
          proxyEvent(this.keyboardDidHide, this.win, "ionKeyboardDidHide", zone);
          let readyResolve;
          this._readyPromise = new Promise((res) => {
            readyResolve = res;
          });
          if (this.win?.["cordova"]) {
            doc.addEventListener("deviceready", () => {
              readyResolve("cordova");
            }, { once: true });
          } else {
            readyResolve("dom");
          }
        });
      }
      /**
       * @returns returns true/false based on platform.
       * @description
       * Depending on the platform the user is on, `is(platformName)` will
       * return `true` or `false`. Note that the same app can return `true`
       * for more than one platform name. For example, an app running from
       * an iPad would return `true` for the platform names: `mobile`,
       * `ios`, `ipad`, and `tablet`. Additionally, if the app was running
       * from Cordova then `cordova` would be true, and if it was running
       * from a web browser on the iPad then `mobileweb` would be `true`.
       *
       * ```
       * import { Platform } from 'ionic-angular';
       *
       * @Component({...})
       * export MyPage {
       *   constructor(public platform: Platform) {
       *     if (this.platform.is('ios')) {
       *       // This will only print when on iOS
       *       console.log('I am an iOS device!');
       *     }
       *   }
       * }
       * ```
       *
       * | Platform Name   | Description                        |
       * |-----------------|------------------------------------|
       * | android         | on a device running Android.       |
       * | capacitor       | on a device running Capacitor.     |
       * | cordova         | on a device running Cordova.       |
       * | ios             | on a device running iOS.           |
       * | ipad            | on an iPad device.                 |
       * | iphone          | on an iPhone device.               |
       * | phablet         | on a phablet device.               |
       * | tablet          | on a tablet device.                |
       * | electron        | in Electron on a desktop device.   |
       * | pwa             | as a PWA app.                      |
       * | mobile          | on a mobile device.                |
       * | mobileweb       | on a mobile device in a browser.   |
       * | desktop         | on a desktop device.               |
       * | hybrid          | is a cordova or capacitor app.     |
       *
       */
      is(platformName) {
        return d2(this.win, platformName);
      }
      /**
       * @returns the array of platforms
       * @description
       * Depending on what device you are on, `platforms` can return multiple values.
       * Each possible value is a hierarchy of platforms. For example, on an iPhone,
       * it would return `mobile`, `ios`, and `iphone`.
       *
       * ```
       * import { Platform } from 'ionic-angular';
       *
       * @Component({...})
       * export MyPage {
       *   constructor(public platform: Platform) {
       *     // This will print an array of the current platforms
       *     console.log(this.platform.platforms());
       *   }
       * }
       * ```
       */
      platforms() {
        return a(this.win);
      }
      /**
       * Returns a promise when the platform is ready and native functionality
       * can be called. If the app is running from within a web browser, then
       * the promise will resolve when the DOM is ready. When the app is running
       * from an application engine such as Cordova, then the promise will
       * resolve when Cordova triggers the `deviceready` event.
       *
       * The resolved value is the `readySource`, which states which platform
       * ready was used. For example, when Cordova is ready, the resolved ready
       * source is `cordova`. The default ready source value will be `dom`. The
       * `readySource` is useful if different logic should run depending on the
       * platform the app is running from. For example, only Cordova can execute
       * the status bar plugin, so the web should not run status bar plugin logic.
       *
       * ```
       * import { Component } from '@angular/core';
       * import { Platform } from 'ionic-angular';
       *
       * @Component({...})
       * export MyApp {
       *   constructor(public platform: Platform) {
       *     this.platform.ready().then((readySource) => {
       *       console.log('Platform ready from', readySource);
       *       // Platform now ready, execute any required native code
       *     });
       *   }
       * }
       * ```
       */
      ready() {
        return this._readyPromise;
      }
      /**
       * Returns if this app is using right-to-left language direction or not.
       * We recommend the app's `index.html` file already has the correct `dir`
       * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
       * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
       */
      get isRTL() {
        return this.doc.dir === "rtl";
      }
      /**
       * Get the query string parameter
       */
      getQueryParam(key) {
        return readQueryParam(this.win.location.href, key);
      }
      /**
       * Returns `true` if the app is in landscape mode.
       */
      isLandscape() {
        return !this.isPortrait();
      }
      /**
       * Returns `true` if the app is in portrait mode.
       */
      isPortrait() {
        return this.win.matchMedia?.("(orientation: portrait)").matches;
      }
      testUserAgent(expression) {
        const nav = this.win.navigator;
        return !!(nav?.userAgent && nav.userAgent.indexOf(expression) >= 0);
      }
      /**
       * Get the current url.
       */
      url() {
        return this.win.location.href;
      }
      /**
       * Gets the width of the platform's viewport using `window.innerWidth`.
       */
      width() {
        return this.win.innerWidth;
      }
      /**
       * Gets the height of the platform's viewport using `window.innerHeight`.
       */
      height() {
        return this.win.innerHeight;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _Platform, deps: [{ token: DOCUMENT }, { token: NgZone }], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _Platform, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: Platform, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }, { type: NgZone }] });
    readQueryParam = (url, key) => {
      key = key.replace(/[[\]\\]/g, "\\$&");
      const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
      const results = regex.exec(url);
      return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : null;
    };
    proxyEvent = (emitter, el, eventName, zone) => {
      if (el) {
        el.addEventListener(eventName, (ev) => {
          zone.run(() => {
            const value = ev != null ? ev.detail : void 0;
            emitter.next(value);
          });
        });
      }
    };
  }
});

// node_modules/@ionic/angular/dist/common/providers/nav-controller.js
var NavController, getAnimation, DEFAULT_DIRECTION, DEFAULT_ANIMATED;
var init_nav_controller = __esm({
  "node_modules/@ionic/angular/dist/common/providers/nav-controller.js"() {
    init_core();
    init_router();
    init_core();
    init_platform();
    init_common();
    init_router();
    NavController = class _NavController {
      location;
      serializer;
      router;
      topOutlet;
      direction = DEFAULT_DIRECTION;
      animated = DEFAULT_ANIMATED;
      animationBuilder;
      guessDirection = "forward";
      guessAnimation;
      lastNavId = -1;
      constructor(platform, location, serializer, router) {
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        if (router) {
          router.events.subscribe((ev) => {
            if (ev instanceof NavigationStart) {
              const id = ev.restoredState ? ev.restoredState.navigationId : ev.id;
              this.guessDirection = this.guessAnimation = id < this.lastNavId ? "back" : "forward";
              this.lastNavId = this.guessDirection === "forward" ? ev.id : id;
            }
            if (ev instanceof NavigationCancel || ev instanceof NavigationError) {
              this.direction = DEFAULT_DIRECTION;
              this.animated = DEFAULT_ANIMATED;
              this.animationBuilder = void 0;
            }
          });
        }
        platform.backButton.subscribeWithPriority(0, (processNextHandler) => {
          this.pop();
          processNextHandler();
        });
      }
      /**
       * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
       * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
       *
       * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
       * and that it will show a "forward" animation by default.
       *
       * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
       *
       * ```html
       * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
       * ```
       */
      navigateForward(url, options = {}) {
        this.setDirection("forward", options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
      }
      /**
       * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
       * it's equivalent to calling:
       *
       * ```ts
       * this.navController.setDirection('back');
       * this.router.navigateByUrl(path);
       * ```
       *
       * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
       * and that it will show a "back" animation by default.
       *
       * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
       *
       * ```html
       * <a routerLink="/path/to/page" routerDirection="back">Link</a>
       * ```
       */
      navigateBack(url, options = {}) {
        this.setDirection("back", options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
      }
      /**
       * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
       * it's equivalent to calling:
       *
       * ```ts
       * this.navController.setDirection('root');
       * this.router.navigateByUrl(path);
       * ```
       *
       * Going **root** means that all existing pages in the stack will be removed,
       * and the navigated page will become the single page in the stack.
       *
       * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
       *
       * ```html
       * <a routerLink="/path/to/page" routerDirection="root">Link</a>
       * ```
       */
      navigateRoot(url, options = {}) {
        this.setDirection("root", options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
      }
      /**
       * Same as [Location](https://angular.io/api/common/Location)'s back() method.
       * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
       * by default.
       */
      back(options = { animated: true, animationDirection: "back" }) {
        this.setDirection("back", options.animated, options.animationDirection, options.animation);
        return this.location.back();
      }
      /**
       * This methods goes back in the context of Ionic's stack navigation.
       *
       * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
       * This is the recommended way to go back when you are using `ion-router-outlet`.
       *
       * Resolves to `true` if it was able to pop.
       */
      pop() {
        return __async(this, null, function* () {
          let outlet = this.topOutlet;
          while (outlet) {
            if (yield outlet.pop()) {
              return true;
            } else {
              outlet = outlet.parentOutlet;
            }
          }
          return false;
        });
      }
      /**
       * This methods specifies the direction of the next navigation performed by the Angular router.
       *
       * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
       *
       * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
       */
      setDirection(direction, animated, animationDirection, animationBuilder) {
        this.direction = direction;
        this.animated = getAnimation(direction, animated, animationDirection);
        this.animationBuilder = animationBuilder;
      }
      /**
       * @internal
       */
      setTopOutlet(outlet) {
        this.topOutlet = outlet;
      }
      /**
       * @internal
       */
      consumeTransition() {
        let direction = "root";
        let animation;
        const animationBuilder = this.animationBuilder;
        if (this.direction === "auto") {
          direction = this.guessDirection;
          animation = this.guessAnimation;
        } else {
          animation = this.animated;
          direction = this.direction;
        }
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.animationBuilder = void 0;
        return {
          direction,
          animation,
          animationBuilder
        };
      }
      navigate(url, options) {
        if (Array.isArray(url)) {
          return this.router.navigate(url, options);
        } else {
          const urlTree = this.serializer.parse(url.toString());
          if (options.queryParams !== void 0) {
            urlTree.queryParams = __spreadValues({}, options.queryParams);
          }
          if (options.fragment !== void 0) {
            urlTree.fragment = options.fragment;
          }
          return this.router.navigateByUrl(urlTree, options);
        }
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _NavController, deps: [{ token: Platform }, { token: Location }, { token: UrlSerializer }, { token: Router, optional: true }], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _NavController, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: NavController, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }], ctorParameters: () => [{ type: Platform }, { type: Location }, { type: UrlSerializer }, { type: Router, decorators: [{
      type: Optional
    }] }] });
    getAnimation = (direction, animated, animationDirection) => {
      if (animated === false) {
        return void 0;
      }
      if (animationDirection !== void 0) {
        return animationDirection;
      }
      if (direction === "forward" || direction === "back") {
        return direction;
      } else if (direction === "root" && animated === true) {
        return "forward";
      }
      return void 0;
    };
    DEFAULT_DIRECTION = "auto";
    DEFAULT_ANIMATED = void 0;
  }
});

// node_modules/@ionic/angular/dist/common/providers/config.js
var Config, ConfigToken, getConfig;
var init_config = __esm({
  "node_modules/@ionic/angular/dist/common/providers/config.js"() {
    init_core();
    init_core();
    Config = class _Config {
      get(key, fallback) {
        const c3 = getConfig();
        if (c3) {
          return c3.get(key, fallback);
        }
        return null;
      }
      getBoolean(key, fallback) {
        const c3 = getConfig();
        if (c3) {
          return c3.getBoolean(key, fallback);
        }
        return false;
      }
      getNumber(key, fallback) {
        const c3 = getConfig();
        if (c3) {
          return c3.getNumber(key, fallback);
        }
        return 0;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _Config, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _Config, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: Config, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }] });
    ConfigToken = new InjectionToken("USERCONFIG");
    getConfig = () => {
      if (typeof window !== "undefined") {
        const Ionic = window.Ionic;
        if (Ionic?.config) {
          return Ionic.config;
        }
      }
      return null;
    };
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/nav-params.js
var NavParams;
var init_nav_params = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/nav-params.js"() {
    NavParams = class {
      data;
      constructor(data = {}) {
        this.data = data;
        console.warn(`[Ionic Warning]: NavParams has been deprecated in favor of using Angular's input API. Developers should migrate to either the @Input decorator or the Signals-based input API.`);
      }
      /**
       * Get the value of a nav-parameter for the current view
       *
       * ```ts
       * import { NavParams } from 'ionic-angular';
       *
       * export class MyClass{
       *  constructor(public navParams: NavParams){
       *    // userParams is an object we have in our nav-parameters
       *    this.navParams.get('userParams');
       *  }
       * }
       * ```
       *
       * @param param Which param you want to look up
       */
      get(param) {
        return this.data[param];
      }
    };
  }
});

// node_modules/@ionic/angular/dist/common/providers/angular-delegate.js
var IonModalToken, AngularDelegate, AngularFrameworkDelegate, attachView, LIFECYCLES, bindLifecycleEvents, NavParamsToken, getProviders, provideNavParamsInjectable;
var init_angular_delegate = __esm({
  "node_modules/@ionic/angular/dist/common/providers/angular-delegate.js"() {
    init_core();
    init_components();
    init_nav_params();
    init_config();
    init_core();
    IonModalToken = new InjectionToken("IonModalToken");
    AngularDelegate = class _AngularDelegate {
      zone = inject(NgZone);
      applicationRef = inject(ApplicationRef);
      config = inject(ConfigToken);
      create(environmentInjector, injector, elementReferenceKey, customInjector) {
        return new AngularFrameworkDelegate(environmentInjector, injector, this.applicationRef, this.zone, elementReferenceKey, this.config.useSetInputAPI ?? false, customInjector);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _AngularDelegate, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _AngularDelegate });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: AngularDelegate, decorators: [{
      type: Injectable
    }] });
    AngularFrameworkDelegate = class {
      environmentInjector;
      injector;
      applicationRef;
      zone;
      elementReferenceKey;
      enableSignalsSupport;
      customInjector;
      elRefMap = /* @__PURE__ */ new WeakMap();
      elEventsMap = /* @__PURE__ */ new WeakMap();
      constructor(environmentInjector, injector, applicationRef, zone, elementReferenceKey, enableSignalsSupport, customInjector) {
        this.environmentInjector = environmentInjector;
        this.injector = injector;
        this.applicationRef = applicationRef;
        this.zone = zone;
        this.elementReferenceKey = elementReferenceKey;
        this.enableSignalsSupport = enableSignalsSupport;
        this.customInjector = customInjector;
      }
      attachViewToDom(container, component, params, cssClasses) {
        return this.zone.run(() => {
          return new Promise((resolve) => {
            const componentProps = __spreadValues({}, params);
            if (this.elementReferenceKey !== void 0) {
              componentProps[this.elementReferenceKey] = container;
            }
            const el = attachView(this.zone, this.environmentInjector, this.injector, this.applicationRef, this.elRefMap, this.elEventsMap, container, component, componentProps, cssClasses, this.elementReferenceKey, this.enableSignalsSupport, this.customInjector);
            resolve(el);
          });
        });
      }
      removeViewFromDom(_container, component) {
        return this.zone.run(() => {
          return new Promise((resolve) => {
            const componentRef = this.elRefMap.get(component);
            if (componentRef) {
              componentRef.destroy();
              this.elRefMap.delete(component);
              const unbindEvents = this.elEventsMap.get(component);
              if (unbindEvents) {
                unbindEvents();
                this.elEventsMap.delete(component);
              }
            }
            resolve();
          });
        });
      }
    };
    attachView = (zone, environmentInjector, injector, applicationRef, elRefMap, elEventsMap, container, component, params, cssClasses, elementReferenceKey, enableSignalsSupport, customInjector) => {
      const providers = getProviders(params);
      if (container.tagName.toLowerCase() === "ion-modal") {
        providers.push({
          provide: IonModalToken,
          useValue: container
        });
      }
      const childInjector = Injector.create({
        providers,
        parent: customInjector ?? injector
      });
      const componentRef = createComponent(component, {
        environmentInjector,
        elementInjector: childInjector
      });
      const instance = componentRef.instance;
      const hostElement = componentRef.location.nativeElement;
      if (params) {
        if (elementReferenceKey && instance[elementReferenceKey] !== void 0) {
          console.error(`[Ionic Error]: ${elementReferenceKey} is a reserved property when using ${container.tagName.toLowerCase()}. Rename or remove the "${elementReferenceKey}" property from ${component.name}.`);
        }
        if (enableSignalsSupport === true && componentRef.setInput !== void 0) {
          const _a = params, { modal, popover } = _a, otherParams = __objRest(_a, ["modal", "popover"]);
          for (const key in otherParams) {
            componentRef.setInput(key, otherParams[key]);
          }
          if (modal !== void 0) {
            Object.assign(instance, { modal });
          }
          if (popover !== void 0) {
            Object.assign(instance, { popover });
          }
        } else {
          Object.assign(instance, params);
        }
      }
      if (cssClasses) {
        for (const cssClass of cssClasses) {
          hostElement.classList.add(cssClass);
        }
      }
      const unbindEvents = bindLifecycleEvents(zone, componentRef.changeDetectorRef, instance, hostElement);
      container.appendChild(hostElement);
      applicationRef.attachView(componentRef.hostView);
      componentRef.changeDetectorRef.detectChanges();
      elRefMap.set(hostElement, componentRef);
      elEventsMap.set(hostElement, unbindEvents);
      return hostElement;
    };
    LIFECYCLES = [
      r,
      t,
      s,
      c,
      l
    ];
    bindLifecycleEvents = (zone, changeDetectorRef, instance, element) => {
      return zone.run(() => {
        const unregisters = LIFECYCLES.filter((eventName) => typeof instance[eventName] === "function").map((eventName) => {
          const handler = (ev) => {
            instance[eventName](ev.detail);
            changeDetectorRef.markForCheck();
          };
          element.addEventListener(eventName, handler);
          return () => element.removeEventListener(eventName, handler);
        });
        return () => unregisters.forEach((fn) => fn());
      });
    };
    NavParamsToken = new InjectionToken("NavParamsToken");
    getProviders = (params) => {
      return [
        {
          provide: NavParamsToken,
          useValue: params
        },
        {
          provide: NavParams,
          useFactory: provideNavParamsInjectable,
          deps: [NavParamsToken]
        }
      ];
    };
    provideNavParamsInjectable = (params) => {
      return new NavParams(params);
    };
  }
});

// node_modules/@ionic/angular/dist/common/utils/proxy.js
function ProxyCmp(opts) {
  const decorator = function(cls) {
    const { defineCustomElementFn, inputs, methods } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs(cls, inputs);
    }
    if (methods) {
      proxyMethods(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var proxyInputs, proxyMethods, proxyOutputs;
var init_proxy = __esm({
  "node_modules/@ionic/angular/dist/common/utils/proxy.js"() {
    init_esm();
    proxyInputs = (Cmp, inputs) => {
      const Prototype = Cmp.prototype;
      inputs.forEach((item) => {
        Object.defineProperty(Prototype, item, {
          get() {
            return this.el[item];
          },
          set(val) {
            this.z.runOutsideAngular(() => this.el[item] = val);
          }
        });
      });
    };
    proxyMethods = (Cmp, methods) => {
      const Prototype = Cmp.prototype;
      methods.forEach((methodName) => {
        Prototype[methodName] = function() {
          const args = arguments;
          return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
        };
      });
    };
    proxyOutputs = (instance, el, events) => {
      events.forEach((eventName) => instance[eventName] = fromEvent(el, eventName));
    };
  }
});

// node_modules/@ionic/angular/dist/common/overlays/modal.js
var MODAL_INPUTS, MODAL_METHODS, IonModal;
var init_modal = __esm({
  "node_modules/@ionic/angular/dist/common/overlays/modal.js"() {
    init_tslib_es6();
    init_core();
    init_proxy();
    init_core();
    MODAL_INPUTS = [
      "animated",
      "keepContentsMounted",
      "backdropBreakpoint",
      "backdropDismiss",
      "breakpoints",
      "canDismiss",
      "cssClass",
      "enterAnimation",
      "expandToScroll",
      "event",
      "focusTrap",
      "handle",
      "handleBehavior",
      "initialBreakpoint",
      "isOpen",
      "keyboardClose",
      "leaveAnimation",
      "mode",
      "presentingElement",
      "showBackdrop",
      "translucent",
      "trigger"
    ];
    MODAL_METHODS = [
      "present",
      "dismiss",
      "onDidDismiss",
      "onWillDismiss",
      "setCurrentBreakpoint",
      "getCurrentBreakpoint"
    ];
    IonModal = class IonModal2 {
      z;
      // TODO(FW-2827): type
      template;
      isCmpOpen = false;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        this.el = r2.nativeElement;
        this.el.addEventListener("ionMount", () => {
          this.isCmpOpen = true;
          c3.detectChanges();
        });
        this.el.addEventListener("didDismiss", () => {
          this.isCmpOpen = false;
          c3.detectChanges();
        });
        proxyOutputs(this, this.el, [
          "ionModalDidPresent",
          "ionModalWillPresent",
          "ionModalWillDismiss",
          "ionModalDidDismiss",
          "ionBreakpointDidChange",
          "didPresent",
          "willPresent",
          "willDismiss",
          "didDismiss",
          "ionDragStart",
          "ionDragMove",
          "ionDragEnd"
        ]);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonModal2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: IonModal2, isStandalone: true, selector: "ion-modal", inputs: { animated: "animated", keepContentsMounted: "keepContentsMounted", backdropBreakpoint: "backdropBreakpoint", backdropDismiss: "backdropDismiss", breakpoints: "breakpoints", canDismiss: "canDismiss", cssClass: "cssClass", enterAnimation: "enterAnimation", expandToScroll: "expandToScroll", event: "event", focusTrap: "focusTrap", handle: "handle", handleBehavior: "handleBehavior", initialBreakpoint: "initialBreakpoint", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", presentingElement: "presentingElement", showBackdrop: "showBackdrop", translucent: "translucent", trigger: "trigger" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: core_exports });
    };
    IonModal = __decorate([
      ProxyCmp({
        inputs: MODAL_INPUTS,
        methods: MODAL_METHODS
      })
      /**
       * @Component extends from @Directive
       * so by defining the inputs here we
       * do not need to re-define them for the
       * lazy loaded popover.
       */
    ], IonModal);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonModal, decorators: [{
      type: Directive,
      args: [{
        selector: "ion-modal",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: MODAL_INPUTS
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { template: [{
      type: ContentChild,
      args: [TemplateRef, { static: false }]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/common/overlays/popover.js
var POPOVER_INPUTS, POPOVER_METHODS, IonPopover;
var init_popover = __esm({
  "node_modules/@ionic/angular/dist/common/overlays/popover.js"() {
    init_tslib_es6();
    init_core();
    init_proxy();
    init_core();
    POPOVER_INPUTS = [
      "alignment",
      "animated",
      "arrow",
      "keepContentsMounted",
      "backdropDismiss",
      "cssClass",
      "dismissOnSelect",
      "enterAnimation",
      "event",
      "focusTrap",
      "isOpen",
      "keyboardClose",
      "leaveAnimation",
      "mode",
      "showBackdrop",
      "translucent",
      "trigger",
      "triggerAction",
      "reference",
      "size",
      "side"
    ];
    POPOVER_METHODS = ["present", "dismiss", "onDidDismiss", "onWillDismiss"];
    IonPopover = class IonPopover2 {
      z;
      // TODO(FW-2827): type
      template;
      isCmpOpen = false;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        this.el = r2.nativeElement;
        this.el.addEventListener("ionMount", () => {
          this.isCmpOpen = true;
          c3.detectChanges();
        });
        this.el.addEventListener("didDismiss", () => {
          this.isCmpOpen = false;
          c3.detectChanges();
        });
        proxyOutputs(this, this.el, [
          "ionPopoverDidPresent",
          "ionPopoverWillPresent",
          "ionPopoverWillDismiss",
          "ionPopoverDidDismiss",
          "didPresent",
          "willPresent",
          "willDismiss",
          "didDismiss"
        ]);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPopover2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: IonPopover2, isStandalone: true, selector: "ion-popover", inputs: { alignment: "alignment", animated: "animated", arrow: "arrow", keepContentsMounted: "keepContentsMounted", backdropDismiss: "backdropDismiss", cssClass: "cssClass", dismissOnSelect: "dismissOnSelect", enterAnimation: "enterAnimation", event: "event", focusTrap: "focusTrap", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", showBackdrop: "showBackdrop", translucent: "translucent", trigger: "trigger", triggerAction: "triggerAction", reference: "reference", size: "size", side: "side" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: core_exports });
    };
    IonPopover = __decorate([
      ProxyCmp({
        inputs: POPOVER_INPUTS,
        methods: POPOVER_METHODS
      })
      /**
       * @Component extends from @Directive
       * so by defining the inputs here we
       * do not need to re-define them for the
       * lazy loaded popover.
       */
    ], IonPopover);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPopover, decorators: [{
      type: Directive,
      args: [{
        selector: "ion-popover",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: POPOVER_INPUTS
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { template: [{
      type: ContentChild,
      args: [TemplateRef, { static: false }]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/stack-utils.js
var insertView, setRoot, setForward, setBack, getUrl, isTabSwitch, computeStackId, toSegments, destroyView;
var init_stack_utils = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/stack-utils.js"() {
    insertView = (views, view, direction) => {
      if (direction === "root") {
        return setRoot(views, view);
      } else if (direction === "forward") {
        return setForward(views, view);
      } else {
        return setBack(views, view);
      }
    };
    setRoot = (views, view) => {
      views = views.filter((v) => v.stackId !== view.stackId);
      views.push(view);
      return views;
    };
    setForward = (views, view) => {
      const index = views.indexOf(view);
      if (index >= 0) {
        views = views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
      } else {
        views.push(view);
      }
      return views;
    };
    setBack = (views, view) => {
      const index = views.indexOf(view);
      if (index >= 0) {
        return views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
      } else {
        return setRoot(views, view);
      }
    };
    getUrl = (router, activatedRoute) => {
      const urlTree = router.createUrlTree(["."], { relativeTo: activatedRoute });
      return router.serializeUrl(urlTree);
    };
    isTabSwitch = (enteringView, leavingView) => {
      if (!leavingView) {
        return true;
      }
      return enteringView.stackId !== leavingView.stackId;
    };
    computeStackId = (prefixUrl, url) => {
      if (!prefixUrl) {
        return void 0;
      }
      const segments = toSegments(url);
      for (let i = 0; i < segments.length; i++) {
        if (i >= prefixUrl.length) {
          return segments[i];
        }
        if (segments[i] !== prefixUrl[i]) {
          return void 0;
        }
      }
      return void 0;
    };
    toSegments = (path) => {
      return path.split("/").map((s3) => s3.trim()).filter((s3) => s3 !== "");
    };
    destroyView = (view) => {
      if (view) {
        view.ref.destroy();
        view.unlistenEvents();
      }
    };
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/stack-controller.js
var StackController, cleanupAsync, cleanup;
var init_stack_controller = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/stack-controller.js"() {
    init_angular_delegate();
    init_stack_utils();
    StackController = class {
      containerEl;
      router;
      navCtrl;
      zone;
      location;
      views = [];
      runningTask;
      skipTransition = false;
      tabsPrefix;
      activeView;
      nextId = 0;
      constructor(tabsPrefix, containerEl, router, navCtrl, zone, location) {
        this.containerEl = containerEl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.location = location;
        this.tabsPrefix = tabsPrefix !== void 0 ? toSegments(tabsPrefix) : void 0;
      }
      createView(ref, activatedRoute) {
        const url = getUrl(this.router, activatedRoute);
        const element = ref?.location?.nativeElement;
        const unlistenEvents = bindLifecycleEvents(this.zone, ref.changeDetectorRef, ref.instance, element);
        return {
          id: this.nextId++,
          stackId: computeStackId(this.tabsPrefix, url),
          unlistenEvents,
          element,
          ref,
          url
        };
      }
      getExistingView(activatedRoute) {
        const activatedUrlKey = getUrl(this.router, activatedRoute);
        const view = this.views.find((vw) => vw.url === activatedUrlKey);
        if (view) {
          view.ref.changeDetectorRef.reattach();
        }
        return view;
      }
      setActive(enteringView) {
        const consumeResult = this.navCtrl.consumeTransition();
        let { direction, animation, animationBuilder } = consumeResult;
        const leavingView = this.activeView;
        const tabSwitch = isTabSwitch(enteringView, leavingView);
        if (tabSwitch) {
          direction = "back";
          animation = void 0;
        }
        const viewsSnapshot = this.views.slice();
        let currentNavigation;
        const router = this.router;
        if (router.getCurrentNavigation) {
          currentNavigation = router.getCurrentNavigation();
        } else if (router.navigations?.value) {
          currentNavigation = router.navigations.value;
        }
        if (currentNavigation?.extras?.replaceUrl) {
          if (this.views.length > 0) {
            this.views.splice(-1, 1);
          }
        }
        const reused = this.views.includes(enteringView);
        const views = this.insertView(enteringView, direction);
        if (!reused) {
          enteringView.ref.changeDetectorRef.detectChanges();
        }
        const customAnimation = enteringView.animationBuilder;
        if (animationBuilder === void 0 && direction === "back" && !tabSwitch && customAnimation !== void 0) {
          animationBuilder = customAnimation;
        }
        if (leavingView) {
          leavingView.animationBuilder = animationBuilder;
        }
        return this.zone.runOutsideAngular(() => {
          return this.wait(() => {
            if (leavingView) {
              leavingView.ref.changeDetectorRef.detach();
            }
            enteringView.ref.changeDetectorRef.reattach();
            return this.transition(enteringView, leavingView, animation, this.canGoBack(1), false, animationBuilder).then(() => cleanupAsync(enteringView, views, viewsSnapshot, this.location, this.zone)).then(() => ({
              enteringView,
              direction,
              animation,
              tabSwitch
            }));
          });
        });
      }
      canGoBack(deep, stackId = this.getActiveStackId()) {
        return this.getStack(stackId).length > deep;
      }
      pop(deep, stackId = this.getActiveStackId()) {
        return this.zone.run(() => {
          const views = this.getStack(stackId);
          if (views.length <= deep) {
            return Promise.resolve(false);
          }
          const view = views[views.length - deep - 1];
          let url = view.url;
          const viewSavedData = view.savedData;
          if (viewSavedData) {
            const primaryOutlet = viewSavedData.get("primary");
            if (primaryOutlet?.route?._routerState?.snapshot.url) {
              url = primaryOutlet.route._routerState.snapshot.url;
            }
          }
          const { animationBuilder } = this.navCtrl.consumeTransition();
          return this.navCtrl.navigateBack(url, __spreadProps(__spreadValues({}, view.savedExtras), { animation: animationBuilder })).then(() => true);
        });
      }
      startBackTransition() {
        const leavingView = this.activeView;
        if (leavingView) {
          const views = this.getStack(leavingView.stackId);
          const enteringView = views[views.length - 2];
          const customAnimation = enteringView.animationBuilder;
          return this.wait(() => {
            return this.transition(
              enteringView,
              // entering view
              leavingView,
              // leaving view
              "back",
              this.canGoBack(2),
              true,
              customAnimation
            );
          });
        }
        return Promise.resolve();
      }
      endBackTransition(shouldComplete) {
        if (shouldComplete) {
          this.skipTransition = true;
          this.pop(1);
        } else if (this.activeView) {
          cleanup(this.activeView, this.views, this.views, this.location, this.zone);
        }
      }
      getLastUrl(stackId) {
        const views = this.getStack(stackId);
        return views.length > 0 ? views[views.length - 1] : void 0;
      }
      /**
       * @internal
       */
      getRootUrl(stackId) {
        const views = this.getStack(stackId);
        return views.length > 0 ? views[0] : void 0;
      }
      getActiveStackId() {
        return this.activeView ? this.activeView.stackId : void 0;
      }
      /**
       * @internal
       */
      getActiveView() {
        return this.activeView;
      }
      hasRunningTask() {
        return this.runningTask !== void 0;
      }
      destroy() {
        this.containerEl = void 0;
        this.views.forEach(destroyView);
        this.activeView = void 0;
        this.views = [];
      }
      getStack(stackId) {
        return this.views.filter((v) => v.stackId === stackId);
      }
      insertView(enteringView, direction) {
        this.activeView = enteringView;
        this.views = insertView(this.views, enteringView, direction);
        return this.views.slice();
      }
      transition(enteringView, leavingView, direction, showGoBack, progressAnimation, animationBuilder) {
        if (this.skipTransition) {
          this.skipTransition = false;
          return Promise.resolve(false);
        }
        if (leavingView === enteringView) {
          return Promise.resolve(false);
        }
        const enteringEl = enteringView ? enteringView.element : void 0;
        const leavingEl = leavingView ? leavingView.element : void 0;
        const containerEl = this.containerEl;
        if (enteringEl && enteringEl !== leavingEl) {
          enteringEl.classList.add("ion-page");
          enteringEl.classList.add("ion-page-invisible");
          if (containerEl?.commit) {
            return containerEl.commit(enteringEl, leavingEl, {
              duration: direction === void 0 ? 0 : void 0,
              direction,
              showGoBack,
              progressAnimation,
              animationBuilder
            });
          }
        }
        return Promise.resolve(false);
      }
      wait(task) {
        return __async(this, null, function* () {
          if (this.runningTask !== void 0) {
            yield this.runningTask;
            this.runningTask = void 0;
          }
          const promise = this.runningTask = task();
          promise.finally(() => this.runningTask = void 0);
          return promise;
        });
      }
    };
    cleanupAsync = (activeRoute, views, viewsSnapshot, location, zone) => {
      if (typeof requestAnimationFrame === "function") {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            cleanup(activeRoute, views, viewsSnapshot, location, zone);
            resolve();
          });
        });
      }
      return Promise.resolve();
    };
    cleanup = (activeRoute, views, viewsSnapshot, location, zone) => {
      zone.run(() => viewsSnapshot.filter((view) => !views.includes(view)).forEach(destroyView));
      views.forEach((view) => {
        const locationWithoutParams = location.path().split("?")[0];
        const locationWithoutFragment = locationWithoutParams.split("#")[0];
        if (view !== activeRoute && view.url !== locationWithoutFragment) {
          const element = view.element;
          element.setAttribute("aria-hidden", "true");
          element.classList.add("ion-page-hidden");
          view.ref.changeDetectorRef.detach();
        }
      });
    };
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/router-outlet.js
function componentInputBindingFactory(router) {
  if (router?.componentInputBindingEnabled) {
    return new RoutedComponentInputBinder2();
  }
  return null;
}
var IonRouterOutlet, OutletInjector2, INPUT_BINDER2, RoutedComponentInputBinder2, provideComponentInputBinding;
var init_router_outlet = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/router-outlet.js"() {
    init_core();
    init_router();
    init_components();
    init_esm();
    init_operators();
    init_config();
    init_nav_controller();
    init_stack_controller();
    init_stack_utils();
    init_core();
    init_common();
    init_router();
    IonRouterOutlet = class _IonRouterOutlet {
      parentOutlet;
      nativeEl;
      activatedView = null;
      tabsPrefix;
      _swipeGesture;
      stackCtrl;
      // Maintain map of activated route proxies for each component instance
      proxyMap = /* @__PURE__ */ new WeakMap();
      // Keep the latest activated route in a subject for the proxy routes to switch map to
      currentActivatedRoute$ = new BehaviorSubject(null);
      activated = null;
      /** @internal */
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      /**
       * The name of the outlet
       */
      name = PRIMARY_OUTLET;
      /** @internal */
      stackWillChange = new EventEmitter();
      /** @internal */
      stackDidChange = new EventEmitter();
      // eslint-disable-next-line @angular-eslint/no-output-rename
      activateEvents = new EventEmitter();
      // eslint-disable-next-line @angular-eslint/no-output-rename
      deactivateEvents = new EventEmitter();
      parentContexts = inject(ChildrenOutletContexts);
      location = inject(ViewContainerRef);
      environmentInjector = inject(EnvironmentInjector);
      inputBinder = inject(INPUT_BINDER2, { optional: true });
      /** @nodoc */
      supportsBindingToComponentInputs = true;
      // Ionic providers
      config = inject(Config);
      navCtrl = inject(NavController);
      set animation(animation) {
        this.nativeEl.animation = animation;
      }
      set animated(animated) {
        this.nativeEl.animated = animated;
      }
      set swipeGesture(swipe) {
        this._swipeGesture = swipe;
        this.nativeEl.swipeHandler = swipe ? {
          canStart: () => this.stackCtrl.canGoBack(1) && !this.stackCtrl.hasRunningTask(),
          onStart: () => this.stackCtrl.startBackTransition(),
          onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue)
        } : void 0;
        this.nativeEl.swipeGesture = swipe;
      }
      constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        this.parentOutlet = parentOutlet;
        this.nativeEl = elementRef.nativeElement;
        this.name = name || PRIMARY_OUTLET;
        this.tabsPrefix = tabs === "true" ? getUrl(router, activatedRoute) : void 0;
        this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, this.navCtrl, zone, commonLocation);
        this.parentContexts.onChildOutletCreated(this.name, this);
      }
      ngOnDestroy() {
        this.stackCtrl.destroy();
        this.inputBinder?.unsubscribeFromRouteData(this);
      }
      getContext() {
        return this.parentContexts.getContext(this.name);
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      // Note: Ionic deviates from the Angular Router implementation here
      initializeOutletWithName() {
        if (!this.activated) {
          const context = this.getContext();
          if (context?.route) {
            this.activateWith(context.route, context.injector);
          }
        }
        new Promise((resolve) => n(this.nativeEl, resolve)).then(() => {
          if (this._swipeGesture === void 0) {
            this.swipeGesture = this.config.getBoolean("swipeBackEnabled", this.nativeEl.mode === "ios");
          }
        });
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) {
          throw new Error("Outlet is not activated");
        }
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) {
          throw new Error("Outlet is not activated");
        }
        return this._activatedRoute;
      }
      get activatedRouteData() {
        if (this._activatedRoute) {
          return this._activatedRoute.snapshot.data;
        }
        return {};
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to detach the subtree
       */
      detach() {
        throw new Error("incompatible reuse strategy");
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      attach(_ref, _activatedRoute) {
        throw new Error("incompatible reuse strategy");
      }
      deactivate() {
        if (this.activated) {
          if (this.activatedView) {
            const context = this.getContext();
            this.activatedView.savedData = new Map(context.children["contexts"]);
            const primaryOutlet = this.activatedView.savedData.get("primary");
            if (primaryOutlet && context.route) {
              primaryOutlet.route = __spreadValues({}, context.route);
            }
            this.activatedView.savedExtras = {};
            if (context.route) {
              const contextSnapshot = context.route.snapshot;
              this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
              this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
            }
          }
          const c3 = this.component;
          this.activatedView = null;
          this.activated = null;
          this._activatedRoute = null;
          this.deactivateEvents.emit(c3);
        }
      }
      activateWith(activatedRoute, environmentInjector) {
        if (this.isActivated) {
          throw new Error("Cannot activate an already activated outlet");
        }
        this._activatedRoute = activatedRoute;
        let cmpRef;
        let enteringView = this.stackCtrl.getExistingView(activatedRoute);
        if (enteringView) {
          cmpRef = this.activated = enteringView.ref;
          const saved = enteringView.savedData;
          if (saved) {
            const context = this.getContext();
            context.children["contexts"] = saved;
          }
          this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
        } else {
          const snapshot = activatedRoute._futureSnapshot;
          const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
          const component$ = new BehaviorSubject(null);
          const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
          const injector = new OutletInjector2(activatedRouteProxy, childContexts, this.location.injector);
          const component = snapshot.routeConfig.component ?? snapshot.component;
          cmpRef = this.activated = this.outletContent.createComponent(component, {
            index: this.outletContent.length,
            injector,
            environmentInjector: environmentInjector ?? this.environmentInjector
          });
          component$.next(cmpRef.instance);
          enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
          this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
          this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute });
        }
        this.inputBinder?.bindActivatedRouteToOutletComponent(this);
        this.activatedView = enteringView;
        this.navCtrl.setTopOutlet(this);
        const leavingView = this.stackCtrl.getActiveView();
        this.stackWillChange.emit({
          enteringView,
          tabSwitch: isTabSwitch(enteringView, leavingView)
        });
        this.stackCtrl.setActive(enteringView).then((data) => {
          this.activateEvents.emit(cmpRef.instance);
          this.stackDidChange.emit(data);
        });
      }
      /**
       * Returns `true` if there are pages in the stack to go back.
       */
      canGoBack(deep = 1, stackId) {
        return this.stackCtrl.canGoBack(deep, stackId);
      }
      /**
       * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
       */
      pop(deep = 1, stackId) {
        return this.stackCtrl.pop(deep, stackId);
      }
      /**
       * Returns the URL of the active page of each stack.
       */
      getLastUrl(stackId) {
        const active = this.stackCtrl.getLastUrl(stackId);
        return active ? active.url : void 0;
      }
      /**
       * Returns the RouteView of the active page of each stack.
       * @internal
       */
      getLastRouteView(stackId) {
        return this.stackCtrl.getLastUrl(stackId);
      }
      /**
       * Returns the root view in the tab stack.
       * @internal
       */
      getRootView(stackId) {
        return this.stackCtrl.getRootUrl(stackId);
      }
      /**
       * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
       */
      getActiveStackId() {
        return this.stackCtrl.getActiveStackId();
      }
      /**
       * Since the activated route can change over the life time of a component in an ion router outlet, we create
       * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
       */
      createActivatedRouteProxy(component$, activatedRoute) {
        const proxy = new ActivatedRoute();
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        proxy._paramMap = this.proxyObservable(component$, "paramMap");
        proxy._queryParamMap = this.proxyObservable(component$, "queryParamMap");
        proxy.url = this.proxyObservable(component$, "url");
        proxy.params = this.proxyObservable(component$, "params");
        proxy.queryParams = this.proxyObservable(component$, "queryParams");
        proxy.fragment = this.proxyObservable(component$, "fragment");
        proxy.data = this.proxyObservable(component$, "data");
        return proxy;
      }
      /**
       * Create a wrapped observable that will switch to the latest activated route matched by the given component
       */
      proxyObservable(component$, path) {
        return component$.pipe(
          // First wait until the component instance is pushed
          filter((component) => !!component),
          switchMap((component) => this.currentActivatedRoute$.pipe(filter((current) => current !== null && current.component === component), switchMap((current) => current && current.activatedRoute[path]), distinctUntilChanged()))
        );
      }
      /**
       * Updates the activated route proxy for the given component to the new incoming router state
       */
      updateActivatedRouteProxy(component, activatedRoute) {
        const proxy = this.proxyMap.get(component);
        if (!proxy) {
          throw new Error(`Could not find activated route proxy for view`);
        }
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        this.currentActivatedRoute$.next({ component, activatedRoute });
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonRouterOutlet, deps: [{ token: "name", attribute: true }, { token: "tabs", attribute: true, optional: true }, { token: Location }, { token: ElementRef }, { token: Router }, { token: NgZone }, { token: ActivatedRoute }, { token: _IonRouterOutlet, optional: true, skipSelf: true }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _IonRouterOutlet, isStandalone: true, selector: "ion-router-outlet", inputs: { animated: "animated", animation: "animation", mode: "mode", swipeGesture: "swipeGesture", name: "name" }, outputs: { stackWillChange: "stackWillChange", stackDidChange: "stackDidChange", activateEvents: "activate", deactivateEvents: "deactivate" }, exportAs: ["outlet"], ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRouterOutlet, decorators: [{
      type: Directive,
      args: [{
        selector: "ion-router-outlet",
        exportAs: "outlet",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "animation", "mode", "swipeGesture"]
      }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Attribute,
      args: ["name"]
    }] }, { type: void 0, decorators: [{
      type: Optional
    }, {
      type: Attribute,
      args: ["tabs"]
    }] }, { type: Location }, { type: ElementRef }, { type: Router }, { type: NgZone }, { type: ActivatedRoute }, { type: IonRouterOutlet, decorators: [{
      type: SkipSelf
    }, {
      type: Optional
    }] }], propDecorators: { name: [{
      type: Input
    }], stackWillChange: [{
      type: Output
    }], stackDidChange: [{
      type: Output
    }], activateEvents: [{
      type: Output,
      args: ["activate"]
    }], deactivateEvents: [{
      type: Output,
      args: ["deactivate"]
    }] } });
    OutletInjector2 = class {
      route;
      childContexts;
      parent;
      constructor(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
      }
      get(token, notFoundValue) {
        if (token === ActivatedRoute) {
          return this.route;
        }
        if (token === ChildrenOutletContexts) {
          return this.childContexts;
        }
        return this.parent.get(token, notFoundValue);
      }
    };
    INPUT_BINDER2 = new InjectionToken("");
    RoutedComponentInputBinder2 = class _RoutedComponentInputBinder {
      outletDataSubscriptions = /* @__PURE__ */ new Map();
      bindActivatedRouteToOutletComponent(outlet) {
        this.unsubscribeFromRouteData(outlet);
        this.subscribeToRouteData(outlet);
      }
      unsubscribeFromRouteData(outlet) {
        this.outletDataSubscriptions.get(outlet)?.unsubscribe();
        this.outletDataSubscriptions.delete(outlet);
      }
      subscribeToRouteData(outlet) {
        const { activatedRoute } = outlet;
        const dataSubscription = combineLatest([activatedRoute.queryParams, activatedRoute.params, activatedRoute.data]).pipe(switchMap(([queryParams, params, data], index) => {
          data = __spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data);
          if (index === 0) {
            return of(data);
          }
          return Promise.resolve(data);
        })).subscribe((data) => {
          if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          const mirror = reflectComponentType(activatedRoute.component);
          if (!mirror) {
            this.unsubscribeFromRouteData(outlet);
            return;
          }
          for (const { templateName } of mirror.inputs) {
            outlet.activatedComponentRef.setInput(templateName, data[templateName]);
          }
        });
        this.outletDataSubscriptions.set(outlet, dataSubscription);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RoutedComponentInputBinder, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RoutedComponentInputBinder });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: RoutedComponentInputBinder2, decorators: [{
      type: Injectable
    }] });
    provideComponentInputBinding = () => {
      return {
        provide: INPUT_BINDER2,
        useFactory: componentInputBindingFactory,
        deps: [Router]
      };
    };
  }
});

// node_modules/@ionic/angular/dist/common/utils/util.js
var raf;
var init_util = __esm({
  "node_modules/@ionic/angular/dist/common/utils/util.js"() {
    raf = (h2) => {
      if (typeof __zone_symbol__requestAnimationFrame === "function") {
        return __zone_symbol__requestAnimationFrame(h2);
      }
      if (typeof requestAnimationFrame === "function") {
        return requestAnimationFrame(h2);
      }
      return setTimeout(h2);
    };
  }
});

// node_modules/@ionic/angular/dist/common/directives/control-value-accessors/value-accessor.js
var ValueAccessor, setIonicClasses, getClasses, setClasses, startsWith;
var init_value_accessor = __esm({
  "node_modules/@ionic/angular/dist/common/directives/control-value-accessors/value-accessor.js"() {
    init_core();
    init_forms();
    init_util();
    init_core();
    ValueAccessor = class _ValueAccessor {
      injector;
      elementRef;
      onChange = () => {
      };
      onTouched = () => {
      };
      lastValue;
      statusChanges;
      constructor(injector, elementRef) {
        this.injector = injector;
        this.elementRef = elementRef;
      }
      writeValue(value) {
        this.elementRef.nativeElement.value = this.lastValue = value;
        setIonicClasses(this.elementRef);
      }
      /**
       * Notifies the ControlValueAccessor of a change in the value of the control.
       *
       * This is called by each of the ValueAccessor directives when we want to update
       * the status and validity of the form control. For example with text components this
       * is called when the ionInput event is fired. For select components this is called
       * when the ionChange event is fired.
       *
       * This also updates the Ionic form status classes on the element.
       *
       * @param el The component element.
       * @param value The new value of the control.
       */
      handleValueChange(el, value) {
        if (el === this.elementRef.nativeElement) {
          if (value !== this.lastValue) {
            this.lastValue = value;
            this.onChange(value);
          }
          setIonicClasses(this.elementRef);
        }
      }
      _handleBlurEvent(el) {
        if (el === this.elementRef.nativeElement) {
          this.onTouched();
          setIonicClasses(this.elementRef);
        } else if (el.closest("ion-radio-group") === this.elementRef.nativeElement) {
          this.onTouched();
        }
      }
      registerOnChange(fn) {
        this.onChange = fn;
      }
      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      setDisabledState(isDisabled) {
        this.elementRef.nativeElement.disabled = isDisabled;
      }
      ngOnDestroy() {
        if (this.statusChanges) {
          this.statusChanges.unsubscribe();
        }
      }
      ngAfterViewInit() {
        let ngControl;
        try {
          ngControl = this.injector.get(NgControl);
        } catch (e2) {
        }
        if (!ngControl) {
          return;
        }
        if (ngControl.statusChanges) {
          this.statusChanges = ngControl.statusChanges.subscribe(() => setIonicClasses(this.elementRef));
        }
        const formControl = ngControl.control;
        if (formControl) {
          const methodsToPatch = ["markAsTouched", "markAllAsTouched", "markAsUntouched", "markAsDirty", "markAsPristine"];
          methodsToPatch.forEach((method) => {
            if (typeof formControl[method] !== "undefined") {
              const oldFn = formControl[method].bind(formControl);
              formControl[method] = (...params) => {
                oldFn(...params);
                setIonicClasses(this.elementRef);
              };
            }
          });
        }
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _ValueAccessor, deps: [{ token: Injector }, { token: ElementRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _ValueAccessor, isStandalone: true, host: { listeners: { "ionBlur": "_handleBlurEvent($event.target)" } }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: ValueAccessor, decorators: [{
      type: Directive
    }], ctorParameters: () => [{ type: Injector }, { type: ElementRef }], propDecorators: { _handleBlurEvent: [{
      type: HostListener,
      args: ["ionBlur", ["$event.target"]]
    }] } });
    setIonicClasses = (element) => {
      raf(() => {
        const input2 = element.nativeElement;
        const hasValue = input2.value != null && input2.value.toString().length > 0;
        const classes = getClasses(input2);
        setClasses(input2, classes);
        const item = input2.closest("ion-item");
        if (item) {
          if (hasValue) {
            setClasses(item, [...classes, "item-has-value"]);
          } else {
            setClasses(item, classes);
          }
        }
      });
    };
    getClasses = (element) => {
      const classList = element.classList;
      const classes = [];
      for (let i = 0; i < classList.length; i++) {
        const item = classList.item(i);
        if (item !== null && startsWith(item, "ng-")) {
          classes.push(`ion-${item.substring(3)}`);
        }
      }
      return classes;
    };
    setClasses = (element, classes) => {
      const classList = element.classList;
      classList.remove("ion-valid", "ion-invalid", "ion-touched", "ion-untouched", "ion-dirty", "ion-pristine");
      classList.add(...classes);
    };
    startsWith = (input2, search) => {
      return input2.substring(0, search.length) === search;
    };
  }
});

// node_modules/@ionic/angular/dist/common/directives/control-value-accessors/index.js
var init_control_value_accessors = __esm({
  "node_modules/@ionic/angular/dist/common/directives/control-value-accessors/index.js"() {
    init_value_accessor();
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/back-button.js
var BACK_BUTTON_INPUTS, IonBackButton;
var init_back_button = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/back-button.js"() {
    init_tslib_es6();
    init_core();
    init_proxy();
    init_core();
    init_router_outlet();
    init_nav_controller();
    init_config();
    BACK_BUTTON_INPUTS = ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"];
    IonBackButton = class IonBackButton2 {
      routerOutlet;
      navCtrl;
      config;
      r;
      z;
      el;
      constructor(routerOutlet, navCtrl, config, r2, z, c3) {
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.config = config;
        this.r = r2;
        this.z = z;
        c3.detach();
        this.el = this.r.nativeElement;
      }
      /**
       * @internal
       */
      onClick(ev) {
        const defaultHref = this.defaultHref || this.config.get("backButtonDefaultHref");
        if (this.routerOutlet?.canGoBack()) {
          this.navCtrl.setDirection("back", void 0, void 0, this.routerAnimation);
          this.routerOutlet.pop();
          ev.preventDefault();
        } else if (defaultHref != null) {
          this.navCtrl.navigateBack(defaultHref, { animation: this.routerAnimation });
          ev.preventDefault();
        }
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBackButton2, deps: [{ token: IonRouterOutlet, optional: true }, { token: NavController }, { token: Config }, { token: ElementRef }, { token: NgZone }, { token: ChangeDetectorRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: IonBackButton2, isStandalone: true, inputs: { color: "color", defaultHref: "defaultHref", disabled: "disabled", icon: "icon", mode: "mode", routerAnimation: "routerAnimation", text: "text", type: "type" }, host: { listeners: { "click": "onClick($event)" } }, ngImport: core_exports });
    };
    IonBackButton = __decorate([
      ProxyCmp({
        inputs: BACK_BUTTON_INPUTS
      })
    ], IonBackButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBackButton, decorators: [{
      type: Directive,
      args: [{
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: BACK_BUTTON_INPUTS
      }]
    }], ctorParameters: () => [{ type: IonRouterOutlet, decorators: [{
      type: Optional
    }] }, { type: NavController }, { type: Config }, { type: ElementRef }, { type: NgZone }, { type: ChangeDetectorRef }], propDecorators: { onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/nav.js
var NAV_INPUTS, NAV_METHODS, IonNav;
var init_nav = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/nav.js"() {
    init_tslib_es6();
    init_core();
    init_proxy();
    init_core();
    init_angular_delegate();
    NAV_INPUTS = ["animated", "animation", "root", "rootParams", "swipeGesture"];
    NAV_METHODS = [
      "push",
      "insert",
      "insertPages",
      "pop",
      "popTo",
      "popToRoot",
      "removeIndex",
      "setRoot",
      "setPages",
      "getActive",
      "getByIndex",
      "canGoBack",
      "getPrevious"
    ];
    IonNav = class IonNav2 {
      z;
      el;
      constructor(ref, environmentInjector, injector, angularDelegate, z, c3) {
        this.z = z;
        c3.detach();
        this.el = ref.nativeElement;
        ref.nativeElement.delegate = angularDelegate.create(environmentInjector, injector);
        proxyOutputs(this, this.el, ["ionNavDidChange", "ionNavWillChange"]);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNav2, deps: [{ token: ElementRef }, { token: EnvironmentInjector }, { token: Injector }, { token: AngularDelegate }, { token: NgZone }, { token: ChangeDetectorRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: IonNav2, isStandalone: true, inputs: { animated: "animated", animation: "animation", root: "root", rootParams: "rootParams", swipeGesture: "swipeGesture" }, ngImport: core_exports });
    };
    IonNav = __decorate([
      ProxyCmp({
        inputs: NAV_INPUTS,
        methods: NAV_METHODS
      })
    ], IonNav);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNav, decorators: [{
      type: Directive,
      args: [{
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: NAV_INPUTS
      }]
    }], ctorParameters: () => [{ type: ElementRef }, { type: EnvironmentInjector }, { type: Injector }, { type: AngularDelegate }, { type: NgZone }, { type: ChangeDetectorRef }] });
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/router-link-delegate.js
var RouterLinkDelegateDirective, RouterLinkWithHrefDelegateDirective;
var init_router_link_delegate = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/router-link-delegate.js"() {
    init_core();
    init_core();
    init_common();
    init_nav_controller();
    init_router();
    RouterLinkDelegateDirective = class _RouterLinkDelegateDirective {
      locationStrategy;
      navCtrl;
      elementRef;
      router;
      routerLink;
      routerDirection = "forward";
      routerAnimation;
      constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
      }
      ngOnInit() {
        this.updateTargetUrlAndHref();
        this.updateTabindex();
        this.elementRef.nativeElement.addEventListener("click", this.onCaptureClick, { capture: true });
      }
      ngOnChanges() {
        this.updateTargetUrlAndHref();
      }
      ngOnDestroy() {
        this.elementRef.nativeElement.removeEventListener("click", this.onCaptureClick, { capture: true });
      }
      onCaptureClick = (ev) => {
        if (this.opensNatively(ev)) {
          ev.stopImmediatePropagation();
        }
      };
      /**
       * True when the browser should handle the click natively instead of routing
       * in-app: a modifier was held (ctrl/meta/shift/alt), or the host targets
       * something other than `_self`. This mirrors the modifier set Angular's own
       * `RouterLink` guards on, so an Ionic `routerLink` behaves like a plain anchor
       * for new-tab, new-window, and download intents.
       */
      opensNatively(ev) {
        if (ev instanceof MouseEvent && (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey)) {
          return true;
        }
        const target = this.elementRef.nativeElement.target;
        return target != null && target !== "" && target !== "_self";
      }
      /**
       * The `tabindex` is set to `0` by default on the host element when
       * the `routerLink` directive is used. This causes issues with Ionic
       * components that wrap an `a` or `button` element, such as `ion-item`.
       * See issue https://github.com/angular/angular/issues/28345
       *
       * This method removes the `tabindex` attribute from the host element
       * to allow the Ionic component to manage the focus state correctly.
       */
      updateTabindex() {
        const ionicComponents = [
          "ION-BACK-BUTTON",
          "ION-BREADCRUMB",
          "ION-BUTTON",
          "ION-CARD",
          "ION-FAB-BUTTON",
          "ION-ITEM",
          "ION-ITEM-OPTION",
          "ION-MENU-BUTTON",
          "ION-SEGMENT-BUTTON",
          "ION-TAB-BUTTON"
        ];
        const hostElement = this.elementRef.nativeElement;
        if (ionicComponents.includes(hostElement.tagName)) {
          if (hostElement.getAttribute("tabindex") === "0") {
            hostElement.removeAttribute("tabindex");
          }
        }
      }
      updateTargetUrlAndHref() {
        if (this.routerLink?.urlTree) {
          const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
          this.elementRef.nativeElement.href = href;
        }
      }
      /**
       * @internal
       */
      onClick(ev) {
        this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
        ev.preventDefault();
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RouterLinkDelegateDirective, deps: [{ token: LocationStrategy }, { token: NavController }, { token: ElementRef }, { token: Router }, { token: RouterLink, optional: true }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _RouterLinkDelegateDirective, isStandalone: true, selector: ":not(a):not(area)[routerLink]", inputs: { routerDirection: "routerDirection", routerAnimation: "routerAnimation" }, host: { listeners: { "click": "onClick($event)" } }, usesOnChanges: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: RouterLinkDelegateDirective, decorators: [{
      type: Directive,
      args: [{
        selector: ":not(a):not(area)[routerLink]"
      }]
    }], ctorParameters: () => [{ type: LocationStrategy }, { type: NavController }, { type: ElementRef }, { type: Router }, { type: RouterLink, decorators: [{
      type: Optional
    }] }], propDecorators: { routerDirection: [{
      type: Input
    }], routerAnimation: [{
      type: Input
    }], onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }] } });
    RouterLinkWithHrefDelegateDirective = class _RouterLinkWithHrefDelegateDirective {
      locationStrategy;
      navCtrl;
      elementRef;
      router;
      routerLink;
      routerDirection = "forward";
      routerAnimation;
      constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
      }
      ngOnInit() {
        this.updateTargetUrlAndHref();
      }
      ngOnChanges() {
        this.updateTargetUrlAndHref();
      }
      updateTargetUrlAndHref() {
        if (this.routerLink?.urlTree) {
          const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
          this.elementRef.nativeElement.href = href;
        }
      }
      /**
       * @internal
       */
      onClick() {
        this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RouterLinkWithHrefDelegateDirective, deps: [{ token: LocationStrategy }, { token: NavController }, { token: ElementRef }, { token: Router }, { token: RouterLink, optional: true }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _RouterLinkWithHrefDelegateDirective, isStandalone: true, selector: "a[routerLink],area[routerLink]", inputs: { routerDirection: "routerDirection", routerAnimation: "routerAnimation" }, host: { listeners: { "click": "onClick()" } }, usesOnChanges: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: RouterLinkWithHrefDelegateDirective, decorators: [{
      type: Directive,
      args: [{
        selector: "a[routerLink],area[routerLink]"
      }]
    }], ctorParameters: () => [{ type: LocationStrategy }, { type: NavController }, { type: ElementRef }, { type: Router }, { type: RouterLink, decorators: [{
      type: Optional
    }] }], propDecorators: { routerDirection: [{
      type: Input
    }], routerAnimation: [{
      type: Input
    }], onClick: [{
      type: HostListener,
      args: ["click"]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/common/directives/navigation/tabs.js
var parseHrefExtras, IonTabs;
var init_tabs = __esm({
  "node_modules/@ionic/angular/dist/common/directives/navigation/tabs.js"() {
    init_core();
    init_core();
    init_nav_controller();
    parseHrefExtras = (href) => {
      if (!href) {
        return void 0;
      }
      const hashIndex = href.indexOf("#");
      const fragment = hashIndex >= 0 && hashIndex < href.length - 1 ? href.slice(hashIndex + 1) : void 0;
      const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
      const queryIndex = beforeHash.indexOf("?");
      const search = queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : "";
      let queryParams;
      if (search) {
        const params = new URLSearchParams(search);
        queryParams = {};
        for (const key of new Set(params.keys())) {
          const all = params.getAll(key);
          queryParams[key] = all.length > 1 ? all : all[0];
        }
      }
      if (!queryParams && fragment === void 0) {
        return void 0;
      }
      const extras = {};
      if (queryParams)
        extras.queryParams = queryParams;
      if (fragment !== void 0)
        extras.fragment = fragment;
      return extras;
    };
    IonTabs = class _IonTabs {
      navCtrl;
      tabsInner;
      /**
       * Emitted before the tab view is changed.
       */
      ionTabsWillChange = new EventEmitter();
      /**
       * Emitted after the tab view is changed.
       */
      ionTabsDidChange = new EventEmitter();
      tabBarSlot = "bottom";
      hasTab = false;
      selectedTab;
      leavingTab;
      constructor(navCtrl) {
        this.navCtrl = navCtrl;
      }
      ngAfterViewInit() {
        const firstTab = this.tabs.length > 0 ? this.tabs.first : void 0;
        if (firstTab) {
          this.hasTab = true;
          this.setActiveTab(firstTab.tab);
          this.tabSwitch();
        }
      }
      ngAfterContentInit() {
        this.detectSlotChanges();
      }
      ngAfterContentChecked() {
        this.detectSlotChanges();
      }
      /**
       * @internal
       */
      onStackWillChange({ enteringView, tabSwitch }) {
        const stackId = enteringView.stackId;
        if (tabSwitch && stackId !== void 0) {
          this.ionTabsWillChange.emit({ tab: stackId });
        }
      }
      /**
       * @internal
       */
      onStackDidChange({ enteringView, tabSwitch }) {
        const stackId = enteringView.stackId;
        if (tabSwitch && stackId !== void 0) {
          if (this.tabBar) {
            this.tabBar.selectedTab = stackId;
          }
          this.ionTabsDidChange.emit({ tab: stackId });
        }
      }
      /**
       * Host listener for the `ionTabButtonClick` event. Angular 22 enabled stricter
       * host-binding type checking, which types `$event` as the DOM `Event`. That is
       * not assignable to `select`'s public `string | CustomEvent` parameter, so this
       * thin wrapper narrows the event before forwarding to keep `select`'s public
       * signature intact.
       */
      onTabButtonClick(ev) {
        return this.select(ev);
      }
      /**
       * When a tab button is clicked, there are several scenarios:
       * 1. If the selected tab is currently active (the tab button has been clicked
       *    again), then it should go to the root view for that tab.
       *
       *   a. Get the saved root view from the router outlet. If the saved root view
       *      matches the tabRootUrl, set the route view to this view including the
       *      navigation extras. Any `queryParams` or `fragment` declared on the tab
       *      button's `href` are also forwarded.
       *   b. If the saved root view from the router outlet does not match, navigate
       *      to the tabRootUrl, forwarding any `queryParams`/`fragment` declared on
       *      the tab button's `href`.
       *
       * 2. If the current tab tab is not currently selected, get the last route
       *    view from the router outlet.
       *
       *   a. If the last route view exists, navigate to that view including any
       *      navigation extras.
       *   b. If the last route view doesn't exist, then navigate to the default
       *      tabRootUrl, forwarding any `queryParams`/`fragment` declared on the
       *      tab button's `href`.
       */
      select(tabOrEvent) {
        const isTabString = typeof tabOrEvent === "string";
        const tab = isTabString ? tabOrEvent : tabOrEvent.detail.tab;
        const href = isTabString ? void 0 : tabOrEvent.detail.href;
        if (this.hasTab) {
          this.setActiveTab(tab);
          this.tabSwitch();
          return;
        }
        const alreadySelected = this.outlet.getActiveStackId() === tab;
        const tabRootUrl = `${this.outlet.tabsPrefix}/${tab}`;
        const hrefExtras = parseHrefExtras(href);
        if (!isTabString) {
          tabOrEvent.stopPropagation();
        }
        if (alreadySelected) {
          const activeStackId = this.outlet.getActiveStackId();
          const activeView = this.outlet.getLastRouteView(activeStackId);
          if (activeView?.url === tabRootUrl) {
            return;
          }
          const rootView = this.outlet.getRootView(tab);
          const navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
          return this.navCtrl.navigateRoot(tabRootUrl, __spreadProps(__spreadValues(__spreadValues({}, navigationExtras), hrefExtras), {
            animated: true,
            animationDirection: "back"
          }));
        } else {
          const lastRoute = this.outlet.getLastRouteView(tab);
          const url = lastRoute?.url || tabRootUrl;
          const navigationExtras = lastRoute?.savedExtras ?? (url === tabRootUrl ? hrefExtras : void 0);
          return this.navCtrl.navigateRoot(url, __spreadProps(__spreadValues({}, navigationExtras), {
            animated: true,
            animationDirection: "back"
          }));
        }
      }
      setActiveTab(tab) {
        const tabs = this.tabs;
        const selectedTab = tabs.find((t2) => t2.tab === tab);
        if (!selectedTab) {
          console.error(`[Ionic Error]: Tab with id: "${tab}" does not exist`);
          return;
        }
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab });
        selectedTab.el.active = true;
      }
      tabSwitch() {
        const { selectedTab, leavingTab } = this;
        if (this.tabBar && selectedTab) {
          this.tabBar.selectedTab = selectedTab.tab;
        }
        if (leavingTab?.tab !== selectedTab?.tab) {
          if (leavingTab?.el) {
            leavingTab.el.active = false;
          }
        }
        if (selectedTab) {
          this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
      }
      getSelected() {
        if (this.hasTab) {
          return this.selectedTab?.tab;
        }
        return this.outlet.getActiveStackId();
      }
      /**
       * Detects changes to the slot attribute of the tab bar.
       *
       * If the slot attribute has changed, then the tab bar
       * should be relocated to the new slot position.
       */
      detectSlotChanges() {
        this.tabBars.forEach((tabBar) => {
          const currentSlot = tabBar.el.getAttribute("slot");
          if (currentSlot !== this.tabBarSlot) {
            this.tabBarSlot = currentSlot;
            this.relocateTabBar();
          }
        });
      }
      /**
       * Relocates the tab bar to the new slot position.
       */
      relocateTabBar() {
        const tabBar = this.tabBar.el;
        if (this.tabBarSlot === "top") {
          this.tabsInner.nativeElement.before(tabBar);
        } else {
          this.tabsInner.nativeElement.after(tabBar);
        }
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonTabs, deps: [{ token: NavController }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _IonTabs, isStandalone: true, selector: "ion-tabs", outputs: { ionTabsWillChange: "ionTabsWillChange", ionTabsDidChange: "ionTabsDidChange" }, host: { listeners: { "ionTabButtonClick": "onTabButtonClick($event)" } }, viewQueries: [{ propertyName: "tabsInner", first: true, predicate: ["tabsInner"], descendants: true, read: ElementRef, static: true }], ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabs, decorators: [{
      type: Directive,
      args: [{
        selector: "ion-tabs"
      }]
    }], ctorParameters: () => [{ type: NavController }], propDecorators: { tabsInner: [{
      type: ViewChild,
      args: ["tabsInner", { read: ElementRef, static: true }]
    }], ionTabsWillChange: [{
      type: Output
    }], ionTabsDidChange: [{
      type: Output
    }], onTabButtonClick: [{
      type: HostListener,
      args: ["ionTabButtonClick", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/common/utils/overlay.js
var OverlayBaseController;
var init_overlay = __esm({
  "node_modules/@ionic/angular/dist/common/utils/overlay.js"() {
    OverlayBaseController = class {
      ctrl;
      constructor(ctrl) {
        this.ctrl = ctrl;
      }
      /**
       * Creates a new overlay
       */
      create(opts) {
        return this.ctrl.create(opts || {});
      }
      /**
       * When `id` is not provided, it dismisses the top overlay.
       */
      dismiss(data, role, id) {
        return this.ctrl.dismiss(data, role, id);
      }
      /**
       * Returns the top overlay.
       */
      getTop() {
        return this.ctrl.getTop();
      }
    };
  }
});

// node_modules/@ionic/angular/dist/common/index.js
var init_common2 = __esm({
  "node_modules/@ionic/angular/dist/common/index.js"() {
    init_nav_controller();
    init_config();
    init_angular_delegate();
    init_modal();
    init_popover();
    init_router_outlet();
    init_control_value_accessors();
    init_back_button();
    init_nav();
    init_router_link_delegate();
    init_tabs();
    init_overlay();
    init_util();
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-router-outlet.js
var IonRouterOutlet2;
var init_ion_router_outlet = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-router-outlet.js"() {
    init_core();
    init_common2();
    init_core();
    init_common();
    init_router();
    IonRouterOutlet2 = class _IonRouterOutlet extends IonRouterOutlet {
      parentOutlet;
      /**
       * `static: true` must be set so the query results are resolved
       * before change detection runs. Otherwise, the view container
       * ref will be ion-router-outlet instead of ng-container, and
       * the first view will be added as a sibling of ion-router-outlet
       * instead of a child.
       */
      outletContent;
      /**
       * We need to pass in the correct instance of IonRouterOutlet
       * otherwise parentOutlet will be null in a nested outlet context.
       * This results in APIs such as NavController.pop not working
       * in nested outlets because the parent outlet cannot be found.
       */
      constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        super(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet);
        this.parentOutlet = parentOutlet;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonRouterOutlet, deps: [{ token: "name", attribute: true }, { token: "tabs", attribute: true, optional: true }, { token: Location }, { token: ElementRef }, { token: Router }, { token: NgZone }, { token: ActivatedRoute }, { token: _IonRouterOutlet, optional: true, skipSelf: true }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonRouterOutlet, isStandalone: false, selector: "ion-router-outlet", viewQueries: [{ propertyName: "outletContent", first: true, predicate: ["outletContent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: core_exports, template: "<ng-container #outletContent><ng-content></ng-content></ng-container>", isInline: true, changeDetection: ChangeDetectionStrategy.Default });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRouterOutlet2, decorators: [{
      type: Component,
      args: [{
        standalone: false,
        selector: "ion-router-outlet",
        // Routed pages are created inside this component's own view, so an OnPush
        // outlet would leave them unreachable from a tick under Zone.js.
        // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
        changeDetection: ChangeDetectionStrategy.Default,
        template: "<ng-container #outletContent><ng-content></ng-content></ng-container>"
      }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Attribute,
      args: ["name"]
    }] }, { type: void 0, decorators: [{
      type: Optional
    }, {
      type: Attribute,
      args: ["tabs"]
    }] }, { type: Location }, { type: ElementRef }, { type: Router }, { type: NgZone }, { type: ActivatedRoute }, { type: IonRouterOutlet2, decorators: [{
      type: SkipSelf
    }, {
      type: Optional
    }] }], propDecorators: { outletContent: [{
      type: ViewChild,
      args: ["outletContent", { read: ViewContainerRef, static: true }]
    }] } });
  }
});

// node_modules/@ionic/core/dist/esm/index.js
var init_esm2 = __esm({
  "node_modules/@ionic/core/dist/esm/index.js"() {
    init_animation_DmtJpz89();
    init_index_BBASprVu();
    init_ios_transition_B8netzsb();
    init_md_transition_DNCSSiXk();
    init_cubic_bezier_hHmYLOfE();
    init_index_BmLuEdV7();
    init_ionic_global_Cep6oYzK();
    init_helpers_BJqKF1pr();
    init_index_BpRUsN_W();
    init_index_CK8uF0iB();
    init_config_DWCzVL3Y();
    init_theme_byZM6qHV();
    init_index_DIouXecD();
    init_overlays_DmDY_El7();
    init_gesture_controller_B_gJaBk0();
    init_dir_Dojwmvde();
    init_framework_delegate_CDjM1vRH();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
  }
});

// node_modules/@ionic/core/dist/index.js
var init_dist = __esm({
  "node_modules/@ionic/core/dist/index.js"() {
    init_esm2();
  }
});

// node_modules/@ionic/core/dist/esm/app-globals-CNfpAPW6.js
var appGlobalScript, globalScripts;
var init_app_globals_CNfpAPW6 = __esm({
  "node_modules/@ionic/core/dist/esm/app-globals-CNfpAPW6.js"() {
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    appGlobalScript = initialize || (() => {
    });
    globalScripts = appGlobalScript;
  }
});

// node_modules/@ionic/core/dist/esm/loader.js
var defineCustomElements;
var init_loader = __esm({
  "node_modules/@ionic/core/dist/esm/loader.js"() {
    init_index_BpRUsN_W();
    init_index_BpRUsN_W();
    init_app_globals_CNfpAPW6();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    defineCustomElements = (win, options) => __async(null, null, function* () {
      if (typeof window === "undefined") return void 0;
      yield globalScripts();
      return bootstrapLazy(JSON.parse('[["ion-datetime",[[289,"ion-datetime",{"color":[1],"name":[1],"disabled":[4],"formatOptions":[16],"readonly":[4],"isDateEnabled":[16],"showAdjacentDays":[4,"show-adjacent-days"],"min":[1025],"max":[1025],"presentation":[1],"cancelText":[1,"cancel-text"],"doneText":[1,"done-text"],"clearText":[1,"clear-text"],"yearValues":[8,"year-values"],"monthValues":[8,"month-values"],"dayValues":[8,"day-values"],"hourValues":[8,"hour-values"],"minuteValues":[8,"minute-values"],"locale":[1],"firstDayOfWeek":[2,"first-day-of-week"],"titleSelectedDatesFormatter":[16],"multiple":[4],"highlightedDates":[16],"value":[1025],"showDefaultTitle":[4,"show-default-title"],"showDefaultButtons":[4,"show-default-buttons"],"showClearButton":[4,"show-clear-button"],"showDefaultTimeLabel":[4,"show-default-time-label"],"hourCycle":[1,"hour-cycle"],"size":[1],"preferWheel":[4,"prefer-wheel"],"showMonthAndYear":[32],"activeParts":[32],"workingParts":[32],"isTimePopoverOpen":[32],"forceRenderDate":[32],"confirm":[64],"reset":[64],"cancel":[64],"getDefaultPart":[64]},null,{"formatOptions":[{"formatOptionsChanged":0}],"disabled":[{"disabledChanged":0}],"min":[{"minChanged":0}],"max":[{"maxChanged":0}],"presentation":[{"presentationChanged":0}],"yearValues":[{"yearValuesChanged":0}],"monthValues":[{"monthValuesChanged":0}],"dayValues":[{"dayValuesChanged":0}],"hourValues":[{"hourValuesChanged":0}],"minuteValues":[{"minuteValuesChanged":0}],"value":[{"valueChanged":0}]}]]],["ion-menu_3",[[289,"ion-menu-button",{"color":[513],"disabled":[4],"menu":[1],"autoHide":[4,"auto-hide"],"type":[1],"visible":[32]},[[16,"ionMenuChange","visibilityChanged"],[16,"ionSplitPaneVisible","visibilityChanged"]]],[289,"ion-menu",{"contentId":[513,"content-id"],"menuId":[513,"menu-id"],"type":[1025],"disabled":[1028],"side":[513],"swipeGesture":[4,"swipe-gesture"],"maxEdgeStart":[2,"max-edge-start"],"isPaneVisible":[32],"isEndSide":[32],"isOpen":[64],"isActive":[64],"open":[64],"close":[64],"toggle":[64],"setOpen":[64]},[[16,"ionSplitPaneVisible","onSplitPaneChanged"],[2,"click","onBackdropClick"]],{"type":[{"typeChanged":0}],"disabled":[{"disabledChanged":0}],"side":[{"sideChanged":0}],"swipeGesture":[{"swipeGestureChanged":0}]}],[257,"ion-menu-toggle",{"menu":[1],"autoHide":[4,"auto-hide"],"visible":[32]},[[16,"ionMenuChange","visibilityChanged"],[16,"ionSplitPaneVisible","visibilityChanged"]]]]],["ion-input-password-toggle",[[33,"ion-input-password-toggle",{"color":[513],"showIcon":[1,"show-icon"],"hideIcon":[1,"hide-icon"],"type":[1025]},null,{"type":[{"onTypeChange":0}]}]]],["ion-fab_3",[[289,"ion-fab-button",{"color":[513],"activated":[4],"disabled":[4],"download":[1],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1],"show":[4],"translucent":[4],"type":[1],"form":[1],"size":[1],"closeIcon":[1,"close-icon"]},null,{"disabled":[{"disabledChanged":0}]}],[257,"ion-fab",{"horizontal":[1],"vertical":[1],"edge":[4],"activated":[1028],"close":[64],"toggle":[64]},null,{"activated":[{"activatedChanged":0}]}],[257,"ion-fab-list",{"activated":[4],"side":[1]},null,{"activated":[{"activatedChanged":0}]}]]],["ion-refresher_2",[[0,"ion-refresher-content",{"pullingIcon":[1025,"pulling-icon"],"pullingText":[1,"pulling-text"],"refreshingSpinner":[1025,"refreshing-spinner"],"refreshingText":[1,"refreshing-text"]}],[32,"ion-refresher",{"pullMin":[2,"pull-min"],"pullMax":[2,"pull-max"],"closeDuration":[1,"close-duration"],"snapbackDuration":[1,"snapback-duration"],"pullFactor":[2,"pull-factor"],"disabled":[4],"nativeRefresher":[32],"state":[32],"complete":[64],"cancel":[64],"getProgress":[64]},null,{"disabled":[{"disabledChanged":0}]}]]],["ion-back-button",[[33,"ion-back-button",{"color":[513],"defaultHref":[1025,"default-href"],"disabled":[516],"icon":[1],"text":[1],"type":[1],"routerAnimation":[16]}]]],["ion-loading",[[34,"ion-loading",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"message":[1],"cssClass":[1,"css-class"],"duration":[2],"backdropDismiss":[4,"backdrop-dismiss"],"showBackdrop":[4,"show-backdrop"],"spinner":[1025],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"isOpen":[{"onIsOpenChange":0}],"trigger":[{"triggerChanged":0}]}]]],["ion-toast",[[33,"ion-toast",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"color":[513],"enterAnimation":[16],"leaveAnimation":[16],"cssClass":[1,"css-class"],"duration":[2],"header":[1],"layout":[1],"message":[1],"keyboardClose":[4,"keyboard-close"],"position":[1],"positionAnchor":[1,"position-anchor"],"buttons":[16],"translucent":[4],"animated":[4],"icon":[1],"htmlAttributes":[16],"swipeGesture":[1,"swipe-gesture"],"isOpen":[4,"is-open"],"trigger":[1],"revealContentToScreenReader":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"swipeGesture":[{"swipeGestureChanged":0}],"isOpen":[{"onIsOpenChange":0}],"trigger":[{"triggerChanged":0}]}]]],["ion-card_5",[[289,"ion-card",{"color":[513],"button":[4],"type":[1],"disabled":[4],"download":[1],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1]}],[32,"ion-card-content"],[289,"ion-card-header",{"color":[513],"translucent":[4]}],[289,"ion-card-subtitle",{"color":[513]}],[289,"ion-card-title",{"color":[513]}]]],["ion-item-option_3",[[289,"ion-item-option",{"color":[513],"disabled":[4],"download":[1],"expandable":[4],"href":[1],"rel":[1],"target":[1],"type":[1]}],[32,"ion-item-options",{"side":[1],"fireSwipeEvent":[64]}],[0,"ion-item-sliding",{"disabled":[4],"state":[32],"getOpenAmount":[64],"getSlidingRatio":[64],"open":[64],"close":[64],"closeOpened":[64]},null,{"disabled":[{"disabledChanged":0}]}]]],["ion-accordion_2",[[305,"ion-accordion",{"value":[1],"disabled":[4],"readonly":[4],"toggleIcon":[1,"toggle-icon"],"toggleIconSlot":[1,"toggle-icon-slot"],"state":[32],"isNext":[32],"isPrevious":[32],"hasInteracted":[32]},null,{"value":[{"valueChanged":0}]}],[289,"ion-accordion-group",{"animated":[4],"multiple":[4],"value":[1025],"disabled":[4],"readonly":[4],"expand":[1],"requestAccordionToggle":[64],"getAccordions":[64]},[[0,"keydown","onKeydown"]],{"value":[{"valueChanged":0}],"disabled":[{"disabledChanged":0}],"readonly":[{"readonlyChanged":0}]}]]],["ion-breadcrumb_2",[[289,"ion-breadcrumb",{"collapsed":[4],"last":[4],"showCollapsedIndicator":[4,"show-collapsed-indicator"],"color":[1],"active":[4],"disabled":[4],"download":[1],"href":[1],"rel":[1],"separator":[4],"target":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16]}],[289,"ion-breadcrumbs",{"color":[513],"maxItems":[2,"max-items"],"itemsBeforeCollapse":[2,"items-before-collapse"],"itemsAfterCollapse":[2,"items-after-collapse"],"collapsed":[32],"activeChanged":[32]},[[0,"collapsedClick","onCollapsedClick"]],{"maxItems":[{"maxItemsChanged":0}],"itemsBeforeCollapse":[{"maxItemsChanged":0}],"itemsAfterCollapse":[{"maxItemsChanged":0}]}]]],["ion-infinite-scroll_2",[[32,"ion-infinite-scroll-content",{"loadingSpinner":[1025,"loading-spinner"],"loadingText":[1,"loading-text"]}],[0,"ion-infinite-scroll",{"threshold":[1],"disabled":[4],"position":[1],"isLoading":[32],"complete":[64]},null,{"threshold":[{"thresholdChanged":0}],"disabled":[{"disabledChanged":0}]}]]],["ion-reorder_2",[[289,"ion-reorder",null,[[2,"click","onClick"]]],[0,"ion-reorder-group",{"disabled":[4],"state":[32],"complete":[64]},null,{"disabled":[{"disabledChanged":0}]}]]],["ion-segment_2",[[289,"ion-segment-button",{"contentId":[513,"content-id"],"disabled":[1028],"layout":[1],"type":[1],"value":[8],"checked":[32],"setFocus":[64]},null,{"value":[{"valueChanged":0}]}],[289,"ion-segment",{"color":[513],"disabled":[4],"scrollable":[4],"swipeGesture":[4,"swipe-gesture"],"value":[1032],"selectOnFocus":[4,"select-on-focus"],"activated":[32]},[[16,"ionSegmentViewScroll","handleSegmentViewScroll"],[0,"keydown","onKeyDown"]],{"color":[{"colorChanged":0}],"swipeGesture":[{"swipeGestureChanged":0}],"value":[{"valueChanged":0}],"disabled":[{"disabledChanged":0}]}]]],["ion-tab-bar_2",[[289,"ion-tab-button",{"disabled":[4],"download":[1],"href":[1],"rel":[1],"layout":[1025],"selected":[1028],"tab":[1],"target":[1]},[[8,"ionTabBarChanged","onTabBarChanged"]]],[289,"ion-tab-bar",{"color":[513],"selectedTab":[1,"selected-tab"],"translucent":[4],"keyboardVisible":[32]},null,{"selectedTab":[{"selectedTabChanged":0}]}]]],["ion-chip",[[289,"ion-chip",{"color":[513],"outline":[4],"disabled":[4]}]]],["ion-datetime-button",[[289,"ion-datetime-button",{"color":[513],"disabled":[516],"datetime":[1],"datetimePresentation":[32],"dateText":[32],"timeText":[32],"datetimeActive":[32],"selectedButton":[32]}]]],["ion-input",[[294,"ion-input",{"color":[513],"autocapitalize":[1],"autocomplete":[1],"autocorrect":[4],"autofocus":[4],"clearInput":[4,"clear-input"],"clearInputIcon":[1,"clear-input-icon"],"clearOnEdit":[4,"clear-on-edit"],"counter":[4],"counterFormatter":[16],"debounce":[2],"disabled":[516],"enterkeyhint":[1],"errorText":[1,"error-text"],"fill":[1],"inputmode":[1],"helperText":[1,"helper-text"],"label":[1],"labelPlacement":[1,"label-placement"],"max":[8],"maxlength":[2],"min":[8],"minlength":[2],"multiple":[4],"name":[1],"pattern":[1],"placeholder":[1],"readonly":[516],"required":[4],"shape":[1],"spellcheck":[4],"step":[1],"type":[1],"value":[1032],"hasFocus":[32],"isInvalid":[32],"setFocus":[64],"getInputElement":[64]},[[2,"click","onClickCapture"]],{"debounce":[{"debounceChanged":0}],"type":[{"onTypeChange":0}],"value":[{"valueChanged":0}],"dir":[{"onDirChanged":0}]}]]],["ion-searchbar",[[34,"ion-searchbar",{"color":[513],"animated":[4],"autocapitalize":[1],"autocomplete":[1],"autocorrect":[4],"cancelButtonIcon":[1,"cancel-button-icon"],"cancelButtonText":[1,"cancel-button-text"],"clearIcon":[1,"clear-icon"],"debounce":[2],"disabled":[4],"inputmode":[1],"enterkeyhint":[1],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"searchIcon":[1,"search-icon"],"showCancelButton":[1,"show-cancel-button"],"showClearButton":[1,"show-clear-button"],"spellcheck":[4],"type":[1],"value":[1025],"focused":[32],"noAnimate":[32],"setFocus":[64],"getInputElement":[64]},null,{"lang":[{"onLangChanged":0}],"dir":[{"onDirChanged":0}],"debounce":[{"debounceChanged":0}],"value":[{"valueChanged":0}],"showCancelButton":[{"showCancelButtonChanged":0}]}]]],["ion-toggle",[[289,"ion-toggle",{"color":[513],"name":[1],"checked":[1028],"disabled":[4],"errorText":[1,"error-text"],"helperText":[1,"helper-text"],"value":[1],"enableOnOffLabels":[4,"enable-on-off-labels"],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1],"required":[4],"activated":[32],"isInvalid":[32],"hintTextId":[32]},null,{"disabled":[{"disabledChanged":0}]}]]],["ion-route_4",[[0,"ion-route",{"url":[1],"component":[1],"componentProps":[16],"beforeLeave":[16],"beforeEnter":[16]},null,{"url":[{"onUpdate":0}],"component":[{"onUpdate":0}],"componentProps":[{"onComponentProps":0}]}],[0,"ion-route-redirect",{"from":[1],"to":[1]},null,{"from":[{"propDidChange":0}],"to":[{"propDidChange":0}]}],[0,"ion-router",{"root":[1],"useHash":[4,"use-hash"],"canTransition":[64],"push":[64],"back":[64],"printDebug":[64],"navChanged":[64]},[[8,"popstate","onPopState"],[4,"ionBackButton","onBackButton"]]],[257,"ion-router-link",{"color":[513],"href":[1],"rel":[1],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"target":[1]}]]],["ion-avatar_3",[[289,"ion-avatar"],[289,"ion-badge",{"color":[513]}],[257,"ion-thumbnail"]]],["ion-col_3",[[257,"ion-col",{"offset":[1],"offsetXs":[1,"offset-xs"],"offsetSm":[1,"offset-sm"],"offsetMd":[1,"offset-md"],"offsetLg":[1,"offset-lg"],"offsetXl":[1,"offset-xl"],"pull":[1],"pullXs":[1,"pull-xs"],"pullSm":[1,"pull-sm"],"pullMd":[1,"pull-md"],"pullLg":[1,"pull-lg"],"pullXl":[1,"pull-xl"],"push":[1],"pushXs":[1,"push-xs"],"pushSm":[1,"push-sm"],"pushMd":[1,"push-md"],"pushLg":[1,"push-lg"],"pushXl":[1,"push-xl"],"size":[1],"sizeXs":[1,"size-xs"],"sizeSm":[1,"size-sm"],"sizeMd":[1,"size-md"],"sizeLg":[1,"size-lg"],"sizeXl":[1,"size-xl"]},[[9,"resize","onResize"]]],[257,"ion-grid",{"fixed":[4]}],[257,"ion-row"]]],["ion-nav_2",[[257,"ion-nav",{"delegate":[16],"swipeGesture":[1028,"swipe-gesture"],"animated":[4],"animation":[16],"rootParams":[16],"root":[1],"push":[64],"insert":[64],"insertPages":[64],"pop":[64],"popTo":[64],"popToRoot":[64],"removeIndex":[64],"setRoot":[64],"setPages":[64],"getActive":[64],"getByIndex":[64],"canGoBack":[64],"getPrevious":[64],"getLength":[64]},null,{"swipeGesture":[{"swipeGestureChanged":0}],"root":[{"rootChanged":0}]}],[0,"ion-nav-link",{"component":[1],"componentProps":[16],"routerDirection":[1,"router-direction"],"routerAnimation":[16]}]]],["ion-tab_2",[[257,"ion-tab",{"active":[1028],"delegate":[16],"tab":[1],"component":[1],"setActive":[64]},null,{"active":[{"changeActive":0}]}],[257,"ion-tabs",{"useRouter":[1028,"use-router"],"selectedTab":[32],"select":[64],"getTab":[64],"getSelected":[64],"setRouteId":[64],"getRouteId":[64]}]]],["ion-img",[[1,"ion-img",{"alt":[1],"src":[1],"loadSrc":[32],"loadError":[32]},null,{"src":[{"srcChanged":0}]}]]],["ion-input-otp",[[294,"ion-input-otp",{"autocapitalize":[1],"color":[513],"disabled":[516],"fill":[1],"inputmode":[1],"length":[2],"pattern":[1],"readonly":[516],"separators":[1],"shape":[1],"size":[1],"type":[1],"value":[1032],"inputValues":[32],"hasFocus":[32],"previousInputValues":[32],"setFocus":[64]},null,{"value":[{"valueChanged":0}],"length":[{"lengthChanged":0},{"processSeparators":0}],"separators":[{"processSeparators":0}]}]]],["ion-progress-bar",[[33,"ion-progress-bar",{"type":[1],"reversed":[4],"value":[2],"buffer":[2],"color":[513]}]]],["ion-range",[[289,"ion-range",{"color":[513],"debounce":[2],"name":[1],"label":[1],"dualKnobs":[4,"dual-knobs"],"min":[2],"max":[2],"pin":[4],"pinFormatter":[16],"snaps":[4],"step":[2],"ticks":[4],"activeBarStart":[1026,"active-bar-start"],"disabled":[4],"value":[1026],"labelPlacement":[1,"label-placement"],"ratioA":[32],"ratioB":[32],"activatedKnob":[32],"focusedKnob":[32],"hoveredKnob":[32],"pressedKnob":[32]},null,{"debounce":[{"debounceChanged":0}],"dualKnobs":[{"dualKnobsChanged":0}],"min":[{"minChanged":0}],"max":[{"maxChanged":0}],"step":[{"stepChanged":0}],"activeBarStart":[{"activeBarStartChanged":0}],"disabled":[{"disabledChanged":0}],"value":[{"valueChanged":0}]}]]],["ion-segment-content",[[257,"ion-segment-content"]]],["ion-segment-view",[[289,"ion-segment-view",{"disabled":[4],"swipeGesture":[4,"swipe-gesture"],"isManualScroll":[32],"setContent":[64]},[[1,"scroll","handleScroll"],[1,"touchstart","handleScrollStart"],[1,"touchend","handleTouchEnd"]]]]],["ion-split-pane",[[289,"ion-split-pane",{"contentId":[513,"content-id"],"disabled":[4],"when":[8],"visible":[32],"isVisible":[64]},null,{"visible":[{"visibleChanged":0}],"disabled":[{"updateState":0}],"when":[{"updateState":0}]}]]],["ion-text",[[257,"ion-text",{"color":[513]}]]],["ion-textarea",[[294,"ion-textarea",{"color":[513],"autocapitalize":[1],"autofocus":[4],"clearOnEdit":[4,"clear-on-edit"],"debounce":[2],"disabled":[516],"fill":[1],"inputmode":[1],"enterkeyhint":[1],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"readonly":[516],"required":[4],"spellcheck":[4],"cols":[514],"rows":[2],"wrap":[1],"autoGrow":[516,"auto-grow"],"value":[1025],"counter":[4],"counterFormatter":[16],"errorText":[1,"error-text"],"helperText":[1,"helper-text"],"label":[1],"labelPlacement":[1,"label-placement"],"shape":[1],"hasFocus":[32],"isInvalid":[32],"setFocus":[64],"getInputElement":[64]},[[2,"click","onClickCapture"]],{"debounce":[{"debounceChanged":0}],"value":[{"valueChanged":0}],"dir":[{"onDirChanged":0}]}]]],["ion-select-modal",[[34,"ion-select-modal",{"header":[1],"cancelText":[1,"cancel-text"],"multiple":[4],"options":[16]}]]],["ion-picker",[[289,"ion-picker",{"exitInputMode":[64]},[[1,"touchstart","preventTouchStartPropagation"]]]]],["ion-picker-column",[[257,"ion-picker-column",{"disabled":[4],"value":[1032],"color":[513],"numericInput":[4,"numeric-input"],"ariaLabel":[32],"isActive":[32],"scrollActiveItemIntoView":[64],"setValue":[64],"setFocus":[64]},null,{"aria-label":[{"ariaLabelChanged":0}],"value":[{"valueChange":0}]}]]],["ion-picker-column-option",[[289,"ion-picker-column-option",{"disabled":[4],"value":[8],"color":[513],"ariaLabel":[32]},null,{"aria-label":[{"onAriaLabelChange":0}]}]]],["ion-backdrop",[[33,"ion-backdrop",{"visible":[4],"tappable":[4],"stopPropagation":[4,"stop-propagation"]},[[2,"click","onMouseDown"]]]]],["ion-app_8",[[0,"ion-app",{"setFocus":[64]}],[292,"ion-footer",{"collapse":[1],"translucent":[4],"keyboardVisible":[32]}],[257,"ion-router-outlet",{"mode":[1025],"delegate":[16],"animated":[4],"animation":[16],"swipeGesture":[1028,"swipe-gesture"],"swipeHandler":[16],"commit":[64],"setRouteId":[64],"getRouteId":[64]},null,{"swipeGesture":[{"swipeGestureChanged":0}],"swipeHandler":[{"swipeHandlerChanged":0}]}],[257,"ion-content",{"color":[513],"fullscreen":[4],"fixedSlotPlacement":[1,"fixed-slot-placement"],"forceOverscroll":[1028,"force-overscroll"],"scrollX":[4,"scroll-x"],"scrollY":[4,"scroll-y"],"scrollEvents":[4,"scroll-events"],"sizeToContent":[32],"recalculateDimensions":[64],"getScrollElement":[64],"getBackgroundElement":[64],"scrollToTop":[64],"scrollToBottom":[64],"scrollByPoint":[64],"scrollToPoint":[64]},[[9,"resize","onResize"]],{"fullscreen":[{"fullscreenChanged":0}]}],[292,"ion-header",{"collapse":[1],"translucent":[4]}],[289,"ion-title",{"color":[513],"size":[1]},null,{"size":[{"sizeChanged":0}]}],[289,"ion-toolbar",{"color":[513]},[[0,"ionStyle","childrenStyle"]]],[294,"ion-buttons",{"collapse":[4]}]]],["ion-ripple-effect",[[1,"ion-ripple-effect",{"type":[1],"addRipple":[64]}]]],["ion-action-sheet",[[34,"ion-action-sheet",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"buttons":[16],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"header":[1],"subHeader":[1,"sub-header"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"activeRadioId":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},[[0,"keydown","onKeydown"]],{"buttons":[{"buttonsChanged":0}],"isOpen":[{"onIsOpenChange":0}],"trigger":[{"triggerChanged":0}]}]]],["ion-alert",[[34,"ion-alert",{"overlayIndex":[2,"overlay-index"],"delegate":[16],"hasController":[4,"has-controller"],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"cssClass":[1,"css-class"],"header":[1],"subHeader":[1,"sub-header"],"message":[1],"buttons":[16],"inputs":[1040],"backdropDismiss":[4,"backdrop-dismiss"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"isButtonGroupWrapped":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64]},[[4,"keydown","onKeydown"]],{"isOpen":[{"onIsOpenChange":0}],"trigger":[{"triggerChanged":0}],"buttons":[{"buttonsChanged":0}],"inputs":[{"inputsChanged":0}]}]]],["ion-modal",[[289,"ion-modal",{"hasController":[4,"has-controller"],"overlayIndex":[2,"overlay-index"],"delegate":[16],"keyboardClose":[4,"keyboard-close"],"enterAnimation":[16],"leaveAnimation":[16],"breakpoints":[16],"expandToScroll":[4,"expand-to-scroll"],"initialBreakpoint":[2,"initial-breakpoint"],"backdropBreakpoint":[2,"backdrop-breakpoint"],"handle":[4],"handleBehavior":[1,"handle-behavior"],"component":[1],"componentProps":[16],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"showBackdrop":[4,"show-backdrop"],"animated":[4],"presentingElement":[16],"htmlAttributes":[16],"isOpen":[4,"is-open"],"trigger":[1],"keepContentsMounted":[4,"keep-contents-mounted"],"focusTrap":[4,"focus-trap"],"canDismiss":[4,"can-dismiss"],"isSheetModal":[32],"presented":[32],"present":[64],"dismiss":[64],"onDidDismiss":[64],"onWillDismiss":[64],"setCurrentBreakpoint":[64],"getCurrentBreakpoint":[64]},[[9,"resize","onWindowResize"]],{"isOpen":[{"onIsOpenChange":0}],"trigger":[{"triggerChanged":0}],"breakpoints":[{"breakpointsChanged":0}]}]]],["ion-popover",[[289,"ion-popover",{"hasController":[4,"has-controller"],"delegate":[16],"overlayIndex":[2,"overlay-index"],"enterAnimation":[16],"leaveAnimation":[16],"component":[1],"componentProps":[16],"keyboardClose":[4,"keyboard-close"],"cssClass":[1,"css-class"],"backdropDismiss":[4,"backdrop-dismiss"],"event":[8],"showBackdrop":[4,"show-backdrop"],"translucent":[4],"animated":[4],"htmlAttributes":[16],"triggerAction":[1,"trigger-action"],"trigger":[1],"size":[1],"dismissOnSelect":[4,"dismiss-on-select"],"reference":[1],"side":[1],"alignment":[1025],"arrow":[4],"isOpen":[4,"is-open"],"keyboardEvents":[4,"keyboard-events"],"focusTrap":[4,"focus-trap"],"keepContentsMounted":[4,"keep-contents-mounted"],"presented":[32],"presentFromTrigger":[64],"present":[64],"dismiss":[64],"getParentPopover":[64],"onDidDismiss":[64],"onWillDismiss":[64]},null,{"trigger":[{"onTriggerChange":0}],"triggerAction":[{"onTriggerChange":0}],"isOpen":[{"onIsOpenChange":0}]}]]],["ion-checkbox",[[289,"ion-checkbox",{"color":[513],"name":[1],"checked":[1028],"indeterminate":[1028],"disabled":[4],"errorText":[1,"error-text"],"helperText":[1,"helper-text"],"value":[8],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1],"required":[4],"isInvalid":[32],"hasLabelContent":[32],"hintTextId":[32],"setFocus":[64]}]]],["ion-spinner",[[1,"ion-spinner",{"color":[513],"duration":[2],"name":[1],"paused":[4]}]]],["ion-radio_2",[[289,"ion-radio",{"color":[513],"name":[1],"disabled":[4],"value":[520],"labelPlacement":[1,"label-placement"],"justify":[1],"alignment":[1],"checked":[32],"buttonTabindex":[32],"setFocus":[64],"setButtonTabindex":[64]},null,{"value":[{"valueChanged":0}]}],[292,"ion-radio-group",{"allowEmptySelection":[4,"allow-empty-selection"],"compareWith":[1,"compare-with"],"name":[1],"value":[1032],"helperText":[1,"helper-text"],"errorText":[1,"error-text"],"isInvalid":[32],"hintTextId":[32],"setFocus":[64]},[[4,"keydown","onKeydown"]],{"value":[{"valueChanged":0}]}]]],["ion-button_2",[[289,"ion-button",{"color":[513],"buttonType":[1025,"button-type"],"disabled":[516],"expand":[513],"fill":[1537],"routerDirection":[1,"router-direction"],"routerAnimation":[16],"download":[1],"href":[1],"rel":[1],"shape":[513],"size":[513],"strong":[4],"target":[1],"type":[1],"form":[1],"isCircle":[32]},null,{"disabled":[{"disabledChanged":0}]}],[257,"ion-icon",{"mode":[1025],"color":[1],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[513],"src":[1],"icon":[8],"size":[1],"lazy":[4],"sanitize":[4],"svgContent":[32],"isVisible":[32]},null,{"name":[{"loadIcon":0}],"src":[{"loadIcon":0}],"icon":[{"loadIcon":0}],"ios":[{"loadIcon":0}],"md":[{"loadIcon":0}]}]]],["ion-item_8",[[289,"ion-item-divider",{"color":[513],"sticky":[4]}],[32,"ion-item-group"],[289,"ion-note",{"color":[513]}],[1,"ion-skeleton-text",{"animated":[4]}],[294,"ion-label",{"color":[513],"position":[1],"noAnimate":[32]},null,{"color":[{"colorChanged":0}],"position":[{"positionChanged":0}]}],[289,"ion-list-header",{"color":[513],"lines":[1]}],[289,"ion-item",{"color":[513],"button":[4],"detail":[4],"detailIcon":[1,"detail-icon"],"disabled":[516],"download":[1],"href":[1],"rel":[1],"lines":[1],"routerAnimation":[16],"routerDirection":[1,"router-direction"],"target":[1],"type":[1],"multipleInputs":[32],"focusable":[32],"isInteractive":[32],"hasSlottedIndicatorControl":[32]},[[0,"ionColor","labelColorChanged"],[0,"ionStyle","itemStyle"]],{"button":[{"buttonChanged":0}]}],[32,"ion-list",{"lines":[1],"inset":[4],"closeSlidingItems":[64]}]]],["ion-select_3",[[289,"ion-select",{"cancelText":[1,"cancel-text"],"color":[513],"compareWith":[1,"compare-with"],"disabled":[4],"fill":[1],"errorText":[1,"error-text"],"helperText":[1,"helper-text"],"interface":[1],"interfaceOptions":[8,"interface-options"],"justify":[1],"label":[1],"labelPlacement":[1,"label-placement"],"multiple":[4],"name":[1],"okText":[1,"ok-text"],"placeholder":[1],"selectedText":[1,"selected-text"],"toggleIcon":[1,"toggle-icon"],"expandedIcon":[1,"expanded-icon"],"shape":[1],"value":[1032],"required":[4],"isExpanded":[32],"hasFocus":[32],"isInvalid":[32],"hintTextId":[32],"open":[64]},[[2,"click","onClickCapture"]],{"disabled":[{"styleChanged":0}],"isExpanded":[{"styleChanged":0}],"placeholder":[{"styleChanged":0}],"value":[{"styleChanged":0}]}],[1,"ion-select-option",{"disabled":[4],"value":[8],"description":[1],"labelPlacement":[1,"label-placement"],"justify":[1]}],[34,"ion-select-popover",{"header":[1],"subHeader":[1,"sub-header"],"message":[1],"multiple":[4],"options":[16]}]]]]'), options);
    });
  }
});

// node_modules/@ionic/core/loader/index.js
var init_loader2 = __esm({
  "node_modules/@ionic/core/loader/index.js"() {
    init_loader();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    (function() {
      if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
        var a2 = HTMLElement;
        window.HTMLElement = function() {
          return Reflect.construct(a2, [], this.constructor);
        };
        HTMLElement.prototype = a2.prototype;
        HTMLElement.prototype.constructor = HTMLElement;
        Object.setPrototypeOf(HTMLElement, a2);
      }
    })();
  }
});

// node_modules/@ionic/angular/dist/lazy/app-initialize.js
var appInitialize;
var init_app_initialize = __esm({
  "node_modules/@ionic/angular/dist/lazy/app-initialize.js"() {
    init_common2();
    init_dist();
    init_loader2();
    appInitialize = (config, doc, zone) => {
      return () => {
        const win = doc.defaultView;
        if (win && typeof window !== "undefined") {
          setupConfig(__spreadProps(__spreadValues({}, config), {
            _zoneGate: (h2) => zone.run(h2)
          }));
          const aelFn = "__zone_symbol__addEventListener" in doc.body ? "__zone_symbol__addEventListener" : "addEventListener";
          return defineCustomElements(win, {
            exclude: ["ion-tabs"],
            syncQueue: true,
            raf,
            jmp: (h2) => zone.runOutsideAngular(h2),
            ael(elm, eventName, cb, opts) {
              elm[aelFn](eventName, cb, opts);
            },
            rel(elm, eventName, cb, opts) {
              elm.removeEventListener(eventName, cb, opts);
            }
          });
        }
      };
    };
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/boolean-value-accessor.js
var BooleanValueAccessorDirective;
var init_boolean_value_accessor = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/boolean-value-accessor.js"() {
    init_core();
    init_forms();
    init_common2();
    init_core();
    BooleanValueAccessorDirective = class _BooleanValueAccessorDirective extends ValueAccessor {
      constructor(injector, el) {
        super(injector, el);
      }
      writeValue(value) {
        this.elementRef.nativeElement.checked = this.lastValue = value;
        setIonicClasses(this.elementRef);
      }
      // Bind `$event` and cast `.target` in the body rather than `['$event.target']`:
      // this directive's multi-element selector makes Angular 22's stricter host-binding
      // type checking infer `$event` as the DOM `Event` (target: `EventTarget | null`),
      // not the concrete element. The single-element standalone CVAs keep `['$event.target']`.
      _handleIonChange(ev) {
        const el = ev.target;
        this.handleValueChange(el, el.checked);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _BooleanValueAccessorDirective, deps: [{ token: Injector }, { token: ElementRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _BooleanValueAccessorDirective, isStandalone: false, selector: "ion-checkbox,ion-toggle", host: { listeners: { "ionChange": "_handleIonChange($event)" } }, providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: _BooleanValueAccessorDirective,
          multi: true
        }
      ], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: BooleanValueAccessorDirective, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "ion-checkbox,ion-toggle",
        providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BooleanValueAccessorDirective,
            multi: true
          }
        ]
      }]
    }], ctorParameters: () => [{ type: Injector }, { type: ElementRef }], propDecorators: { _handleIonChange: [{
      type: HostListener,
      args: ["ionChange", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/numeric-value-accessor.js
var NumericValueAccessorDirective;
var init_numeric_value_accessor = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/numeric-value-accessor.js"() {
    init_core();
    init_forms();
    init_common2();
    init_core();
    NumericValueAccessorDirective = class _NumericValueAccessorDirective extends ValueAccessor {
      el;
      constructor(injector, el) {
        super(injector, el);
        this.el = el;
      }
      // Bind `$event` and cast `.target` in the body rather than `['$event.target']`:
      // this directive's multi-element selector makes Angular 22's stricter host-binding
      // type checking infer `$event` as the DOM `Event` (target: `EventTarget | null`),
      // not the concrete element. The single-element standalone CVAs keep `['$event.target']`.
      handleInputEvent(ev) {
        const el = ev.target;
        this.handleValueChange(el, el.value);
      }
      registerOnChange(fn) {
        if (this.el.nativeElement.tagName === "ION-INPUT" || this.el.nativeElement.tagName === "ION-INPUT-OTP") {
          super.registerOnChange((value) => {
            fn(value === "" ? null : parseFloat(value));
          });
        } else {
          super.registerOnChange(fn);
        }
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _NumericValueAccessorDirective, deps: [{ token: Injector }, { token: ElementRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _NumericValueAccessorDirective, isStandalone: false, selector: "ion-input[type=number],ion-input-otp:not([type=text]),ion-range", host: { listeners: { "ionInput": "handleInputEvent($event)" } }, providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: _NumericValueAccessorDirective,
          multi: true
        }
      ], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: NumericValueAccessorDirective, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "ion-input[type=number],ion-input-otp:not([type=text]),ion-range",
        providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: NumericValueAccessorDirective,
            multi: true
          }
        ]
      }]
    }], ctorParameters: () => [{ type: Injector }, { type: ElementRef }], propDecorators: { handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/select-value-accessor.js
var SelectValueAccessorDirective;
var init_select_value_accessor = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/select-value-accessor.js"() {
    init_core();
    init_forms();
    init_common2();
    init_core();
    SelectValueAccessorDirective = class _SelectValueAccessorDirective extends ValueAccessor {
      constructor(injector, el) {
        super(injector, el);
      }
      // Bind `$event` and cast `.target` in the body rather than `['$event.target']`:
      // this directive's multi-element selector makes Angular 22's stricter host-binding
      // type checking infer `$event` as the DOM `Event` (target: `EventTarget | null`),
      // not the concrete element. The single-element standalone CVAs keep `['$event.target']`.
      _handleChangeEvent(ev) {
        const el = ev.target;
        this.handleValueChange(el, el.value);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _SelectValueAccessorDirective, deps: [{ token: Injector }, { token: ElementRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _SelectValueAccessorDirective, isStandalone: false, selector: "ion-select, ion-radio-group, ion-segment, ion-datetime", host: { listeners: { "ionChange": "_handleChangeEvent($event)" } }, providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: _SelectValueAccessorDirective,
          multi: true
        }
      ], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: SelectValueAccessorDirective, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        /* tslint:disable-next-line:directive-selector */
        selector: "ion-select, ion-radio-group, ion-segment, ion-datetime",
        providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectValueAccessorDirective,
            multi: true
          }
        ]
      }]
    }], ctorParameters: () => [{ type: Injector }, { type: ElementRef }], propDecorators: { _handleChangeEvent: [{
      type: HostListener,
      args: ["ionChange", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/text-value-accessor.js
var TextValueAccessorDirective;
var init_text_value_accessor = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/text-value-accessor.js"() {
    init_core();
    init_forms();
    init_common2();
    init_core();
    TextValueAccessorDirective = class _TextValueAccessorDirective extends ValueAccessor {
      constructor(injector, el) {
        super(injector, el);
      }
      // Bind `$event` and cast `.target` in the body rather than `['$event.target']`:
      // this directive's multi-element selector makes Angular 22's stricter host-binding
      // type checking infer `$event` as the DOM `Event` (target: `EventTarget | null`),
      // not the concrete element. The single-element standalone CVAs keep `['$event.target']`.
      _handleInputEvent(ev) {
        const el = ev.target;
        this.handleValueChange(el, el.value);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _TextValueAccessorDirective, deps: [{ token: Injector }, { token: ElementRef }], target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _TextValueAccessorDirective, isStandalone: false, selector: "ion-input:not([type=number]),ion-input-otp[type=text],ion-textarea,ion-searchbar", host: { listeners: { "ionInput": "_handleInputEvent($event)" } }, providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: _TextValueAccessorDirective,
          multi: true
        }
      ], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: TextValueAccessorDirective, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "ion-input:not([type=number]),ion-input-otp[type=text],ion-textarea,ion-searchbar",
        providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextValueAccessorDirective,
            multi: true
          }
        ]
      }]
    }], ctorParameters: () => [{ type: Injector }, { type: ElementRef }], propDecorators: { _handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event"]]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/index.js
var init_control_value_accessors2 = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/control-value-accessors/index.js"() {
    init_boolean_value_accessor();
    init_numeric_value_accessor();
    init_select_value_accessor();
    init_text_value_accessor();
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-back-button.js
var IonBackButton3;
var init_ion_back_button = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-back-button.js"() {
    init_core();
    init_common2();
    init_core();
    init_ion_router_outlet();
    init_common2();
    IonBackButton3 = class _IonBackButton extends IonBackButton {
      constructor(routerOutlet, navCtrl, config, r2, z, c3) {
        super(routerOutlet, navCtrl, config, r2, z, c3);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonBackButton, deps: [{ token: IonRouterOutlet2, optional: true }, { token: NavController }, { token: Config }, { token: ElementRef }, { token: NgZone }, { token: ChangeDetectorRef }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonBackButton, isStandalone: false, selector: "ion-back-button", usesInheritance: true, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBackButton3, decorators: [{
      type: Component,
      args: [{
        standalone: false,
        selector: "ion-back-button",
        template: "<ng-content></ng-content>",
        changeDetection: ChangeDetectionStrategy.OnPush
      }]
    }], ctorParameters: () => [{ type: IonRouterOutlet2, decorators: [{
      type: Optional
    }] }, { type: NavController }, { type: Config }, { type: ElementRef }, { type: NgZone }, { type: ChangeDetectorRef }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-nav.js
var IonNav3;
var init_ion_nav = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-nav.js"() {
    init_core();
    init_common2();
    init_core();
    init_common2();
    IonNav3 = class _IonNav extends IonNav {
      constructor(ref, environmentInjector, injector, angularDelegate, z, c3) {
        super(ref, environmentInjector, injector, angularDelegate, z, c3);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonNav, deps: [{ token: ElementRef }, { token: EnvironmentInjector }, { token: Injector }, { token: AngularDelegate }, { token: NgZone }, { token: ChangeDetectorRef }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonNav, isStandalone: false, selector: "ion-nav", usesInheritance: true, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNav3, decorators: [{
      type: Component,
      args: [{
        standalone: false,
        selector: "ion-nav",
        template: "<ng-content></ng-content>",
        // Unlike ion-router-outlet, the delegate attaches pages here as root views and
        // IonNavBase detaches this one, so a tick never descends through it.
        changeDetection: ChangeDetectionStrategy.OnPush
      }]
    }], ctorParameters: () => [{ type: ElementRef }, { type: EnvironmentInjector }, { type: Injector }, { type: AngularDelegate }, { type: NgZone }, { type: ChangeDetectorRef }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/angular-component-lib/utils.js
function ProxyCmp2(opts) {
  const decorator = function(cls) {
    const { defineCustomElementFn, inputs, methods } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs2(cls, inputs);
    }
    if (methods) {
      proxyMethods2(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var proxyInputs2, proxyMethods2;
var init_utils = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/angular-component-lib/utils.js"() {
    proxyInputs2 = (Cmp, inputs) => {
      const Prototype = Cmp.prototype;
      inputs.forEach((item) => {
        Object.defineProperty(Prototype, item, {
          get() {
            return this.el[item];
          },
          set(val) {
            this.z.runOutsideAngular(() => this.el[item] = val);
          },
          /**
           * In the event that proxyInputs is called
           * multiple times re-defining these inputs
           * will cause an error to be thrown. As a result
           * we set configurable: true to indicate these
           * properties can be changed.
           */
          configurable: true
        });
      });
    };
    proxyMethods2 = (Cmp, methods) => {
      const Prototype = Cmp.prototype;
      methods.forEach((methodName) => {
        Prototype[methodName] = function() {
          const args = arguments;
          return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
        };
      });
    };
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/proxies.js
var IonAccordion, IonAccordionGroup, IonActionSheet, IonAlert, IonApp, IonAvatar, IonBackdrop, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonInputOtp, IonInputPasswordToggle, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonMenu, IonMenuButton, IonMenuToggle, IonNavLink, IonNote, IonPicker, IonPickerColumn, IonPickerColumnOption, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectModal, IonSelectOption, IonSkeletonText, IonSpinner, IonSplitPane, IonTab, IonTabBar, IonTabButton, IonText, IonTextarea, IonThumbnail, IonTitle, IonToast, IonToggle, IonToolbar;
var init_proxies = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/proxies.js"() {
    init_tslib_es6();
    init_core();
    init_utils();
    init_core();
    IonAccordion = class IonAccordion2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAccordion2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonAccordion2, isStandalone: false, selector: "ion-accordion", inputs: { disabled: "disabled", mode: "mode", readonly: "readonly", toggleIcon: "toggleIcon", toggleIconSlot: "toggleIconSlot", value: "value" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonAccordion = __decorate([
      ProxyCmp2({
        inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"]
      })
    ], IonAccordion);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAccordion, decorators: [{
      type: Component,
      args: [{
        selector: "ion-accordion",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonAccordionGroup = class IonAccordionGroup2 {
      z;
      el;
      ionChange = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAccordionGroup2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonAccordionGroup2, isStandalone: false, selector: "ion-accordion-group", inputs: { animated: "animated", disabled: "disabled", expand: "expand", mode: "mode", multiple: "multiple", readonly: "readonly", value: "value" }, outputs: { ionChange: "ionChange" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonAccordionGroup = __decorate([
      ProxyCmp2({
        inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"]
      })
    ], IonAccordionGroup);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAccordionGroup, decorators: [{
      type: Component,
      args: [{
        selector: "ion-accordion-group",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"],
        outputs: ["ionChange"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }] } });
    IonActionSheet = class IonActionSheet2 {
      z;
      el;
      ionActionSheetDidPresent = new EventEmitter();
      ionActionSheetWillPresent = new EventEmitter();
      ionActionSheetWillDismiss = new EventEmitter();
      ionActionSheetDidDismiss = new EventEmitter();
      didPresent = new EventEmitter();
      willPresent = new EventEmitter();
      willDismiss = new EventEmitter();
      didDismiss = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonActionSheet2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonActionSheet2, isStandalone: false, selector: "ion-action-sheet", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", buttons: "buttons", cssClass: "cssClass", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", subHeader: "subHeader", translucent: "translucent", trigger: "trigger" }, outputs: { ionActionSheetDidPresent: "ionActionSheetDidPresent", ionActionSheetWillPresent: "ionActionSheetWillPresent", ionActionSheetWillDismiss: "ionActionSheetWillDismiss", ionActionSheetDidDismiss: "ionActionSheetDidDismiss", didPresent: "didPresent", willPresent: "willPresent", willDismiss: "willDismiss", didDismiss: "didDismiss" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonActionSheet = __decorate([
      ProxyCmp2({
        inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"],
        methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
      })
    ], IonActionSheet);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonActionSheet, decorators: [{
      type: Component,
      args: [{
        selector: "ion-action-sheet",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"],
        outputs: ["ionActionSheetDidPresent", "ionActionSheetWillPresent", "ionActionSheetWillDismiss", "ionActionSheetDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionActionSheetDidPresent: [{
      type: Output
    }], ionActionSheetWillPresent: [{
      type: Output
    }], ionActionSheetWillDismiss: [{
      type: Output
    }], ionActionSheetDidDismiss: [{
      type: Output
    }], didPresent: [{
      type: Output
    }], willPresent: [{
      type: Output
    }], willDismiss: [{
      type: Output
    }], didDismiss: [{
      type: Output
    }] } });
    IonAlert = class IonAlert2 {
      z;
      el;
      ionAlertDidPresent = new EventEmitter();
      ionAlertWillPresent = new EventEmitter();
      ionAlertWillDismiss = new EventEmitter();
      ionAlertDidDismiss = new EventEmitter();
      didPresent = new EventEmitter();
      willPresent = new EventEmitter();
      willDismiss = new EventEmitter();
      didDismiss = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAlert2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonAlert2, isStandalone: false, selector: "ion-alert", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", buttons: "buttons", cssClass: "cssClass", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", inputs: "inputs", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", subHeader: "subHeader", translucent: "translucent", trigger: "trigger" }, outputs: { ionAlertDidPresent: "ionAlertDidPresent", ionAlertWillPresent: "ionAlertWillPresent", ionAlertWillDismiss: "ionAlertWillDismiss", ionAlertDidDismiss: "ionAlertDidDismiss", didPresent: "didPresent", willPresent: "willPresent", willDismiss: "willDismiss", didDismiss: "didDismiss" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonAlert = __decorate([
      ProxyCmp2({
        inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"],
        methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
      })
    ], IonAlert);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAlert, decorators: [{
      type: Component,
      args: [{
        selector: "ion-alert",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"],
        outputs: ["ionAlertDidPresent", "ionAlertWillPresent", "ionAlertWillDismiss", "ionAlertDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionAlertDidPresent: [{
      type: Output
    }], ionAlertWillPresent: [{
      type: Output
    }], ionAlertWillDismiss: [{
      type: Output
    }], ionAlertDidDismiss: [{
      type: Output
    }], didPresent: [{
      type: Output
    }], willPresent: [{
      type: Output
    }], willDismiss: [{
      type: Output
    }], didDismiss: [{
      type: Output
    }] } });
    IonApp = class IonApp2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonApp2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonApp2, isStandalone: false, selector: "ion-app", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonApp = __decorate([
      ProxyCmp2({
        methods: ["setFocus"]
      })
    ], IonApp);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonApp, decorators: [{
      type: Component,
      args: [{
        selector: "ion-app",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonAvatar = class IonAvatar2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAvatar2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonAvatar2, isStandalone: false, selector: "ion-avatar", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonAvatar = __decorate([
      ProxyCmp2({})
    ], IonAvatar);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonAvatar, decorators: [{
      type: Component,
      args: [{
        selector: "ion-avatar",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonBackdrop = class IonBackdrop2 {
      z;
      el;
      ionBackdropTap = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBackdrop2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonBackdrop2, isStandalone: false, selector: "ion-backdrop", inputs: { stopPropagation: "stopPropagation", tappable: "tappable", visible: "visible" }, outputs: { ionBackdropTap: "ionBackdropTap" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonBackdrop = __decorate([
      ProxyCmp2({
        inputs: ["stopPropagation", "tappable", "visible"]
      })
    ], IonBackdrop);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBackdrop, decorators: [{
      type: Component,
      args: [{
        selector: "ion-backdrop",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["stopPropagation", "tappable", "visible"],
        outputs: ["ionBackdropTap"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionBackdropTap: [{
      type: Output
    }] } });
    IonBadge = class IonBadge2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBadge2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonBadge2, isStandalone: false, selector: "ion-badge", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonBadge = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonBadge);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBadge, decorators: [{
      type: Component,
      args: [{
        selector: "ion-badge",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonBreadcrumb = class IonBreadcrumb2 {
      z;
      el;
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBreadcrumb2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonBreadcrumb2, isStandalone: false, selector: "ion-breadcrumb", inputs: { active: "active", color: "color", disabled: "disabled", download: "download", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", separator: "separator", target: "target" }, outputs: { ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonBreadcrumb = __decorate([
      ProxyCmp2({
        inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"]
      })
    ], IonBreadcrumb);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBreadcrumb, decorators: [{
      type: Component,
      args: [{
        selector: "ion-breadcrumb",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"],
        outputs: ["ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonBreadcrumbs = class IonBreadcrumbs2 {
      z;
      el;
      ionCollapsedClick = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBreadcrumbs2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonBreadcrumbs2, isStandalone: false, selector: "ion-breadcrumbs", inputs: { color: "color", itemsAfterCollapse: "itemsAfterCollapse", itemsBeforeCollapse: "itemsBeforeCollapse", maxItems: "maxItems", mode: "mode" }, outputs: { ionCollapsedClick: "ionCollapsedClick" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonBreadcrumbs = __decorate([
      ProxyCmp2({
        inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"]
      })
    ], IonBreadcrumbs);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonBreadcrumbs, decorators: [{
      type: Component,
      args: [{
        selector: "ion-breadcrumbs",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"],
        outputs: ["ionCollapsedClick"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionCollapsedClick: [{
      type: Output
    }] } });
    IonButton = class IonButton2 {
      z;
      el;
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonButton2, isStandalone: false, selector: "ion-button", inputs: { buttonType: "buttonType", color: "color", disabled: "disabled", download: "download", expand: "expand", fill: "fill", form: "form", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", shape: "shape", size: "size", strong: "strong", target: "target", type: "type" }, outputs: { ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonButton = __decorate([
      ProxyCmp2({
        inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"]
      })
    ], IonButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"],
        outputs: ["ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonButtons = class IonButtons2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonButtons2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonButtons2, isStandalone: false, selector: "ion-buttons", inputs: { collapse: "collapse" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonButtons = __decorate([
      ProxyCmp2({
        inputs: ["collapse"]
      })
    ], IonButtons);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonButtons, decorators: [{
      type: Component,
      args: [{
        selector: "ion-buttons",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["collapse"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCard = class IonCard2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCard2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCard2, isStandalone: false, selector: "ion-card", inputs: { button: "button", color: "color", disabled: "disabled", download: "download", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", target: "target", type: "type" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCard = __decorate([
      ProxyCmp2({
        inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
      })
    ], IonCard);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCard, decorators: [{
      type: Component,
      args: [{
        selector: "ion-card",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCardContent = class IonCardContent2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardContent2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCardContent2, isStandalone: false, selector: "ion-card-content", inputs: { mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCardContent = __decorate([
      ProxyCmp2({
        inputs: ["mode"]
      })
    ], IonCardContent);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardContent, decorators: [{
      type: Component,
      args: [{
        selector: "ion-card-content",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCardHeader = class IonCardHeader2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardHeader2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCardHeader2, isStandalone: false, selector: "ion-card-header", inputs: { color: "color", mode: "mode", translucent: "translucent" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCardHeader = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode", "translucent"]
      })
    ], IonCardHeader);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardHeader, decorators: [{
      type: Component,
      args: [{
        selector: "ion-card-header",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode", "translucent"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCardSubtitle = class IonCardSubtitle2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardSubtitle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCardSubtitle2, isStandalone: false, selector: "ion-card-subtitle", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCardSubtitle = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonCardSubtitle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardSubtitle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-card-subtitle",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCardTitle = class IonCardTitle2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardTitle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCardTitle2, isStandalone: false, selector: "ion-card-title", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCardTitle = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonCardTitle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCardTitle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-card-title",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCheckbox = class IonCheckbox2 {
      z;
      el;
      ionChange = new EventEmitter();
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCheckbox2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCheckbox2, isStandalone: false, selector: "ion-checkbox", inputs: { alignment: "alignment", checked: "checked", color: "color", disabled: "disabled", errorText: "errorText", helperText: "helperText", indeterminate: "indeterminate", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", required: "required", value: "value" }, outputs: { ionChange: "ionChange", ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCheckbox = __decorate([
      ProxyCmp2({
        inputs: ["alignment", "checked", "color", "disabled", "errorText", "helperText", "indeterminate", "justify", "labelPlacement", "mode", "name", "required", "value"]
      })
    ], IonCheckbox);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCheckbox, decorators: [{
      type: Component,
      args: [{
        selector: "ion-checkbox",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["alignment", "checked", "color", "disabled", "errorText", "helperText", "indeterminate", "justify", "labelPlacement", "mode", "name", "required", "value"],
        outputs: ["ionChange", "ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonChip = class IonChip2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonChip2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonChip2, isStandalone: false, selector: "ion-chip", inputs: { color: "color", disabled: "disabled", mode: "mode", outline: "outline" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonChip = __decorate([
      ProxyCmp2({
        inputs: ["color", "disabled", "mode", "outline"]
      })
    ], IonChip);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonChip, decorators: [{
      type: Component,
      args: [{
        selector: "ion-chip",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "disabled", "mode", "outline"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonCol = class IonCol2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCol2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonCol2, isStandalone: false, selector: "ion-col", inputs: { offset: "offset", offsetLg: "offsetLg", offsetMd: "offsetMd", offsetSm: "offsetSm", offsetXl: "offsetXl", offsetXs: "offsetXs", pull: "pull", pullLg: "pullLg", pullMd: "pullMd", pullSm: "pullSm", pullXl: "pullXl", pullXs: "pullXs", push: "push", pushLg: "pushLg", pushMd: "pushMd", pushSm: "pushSm", pushXl: "pushXl", pushXs: "pushXs", size: "size", sizeLg: "sizeLg", sizeMd: "sizeMd", sizeSm: "sizeSm", sizeXl: "sizeXl", sizeXs: "sizeXs" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonCol = __decorate([
      ProxyCmp2({
        inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"]
      })
    ], IonCol);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonCol, decorators: [{
      type: Component,
      args: [{
        selector: "ion-col",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonContent = class IonContent2 {
      z;
      el;
      ionScrollStart = new EventEmitter();
      ionScroll = new EventEmitter();
      ionScrollEnd = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonContent2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonContent2, isStandalone: false, selector: "ion-content", inputs: { color: "color", fixedSlotPlacement: "fixedSlotPlacement", forceOverscroll: "forceOverscroll", fullscreen: "fullscreen", scrollEvents: "scrollEvents", scrollX: "scrollX", scrollY: "scrollY" }, outputs: { ionScrollStart: "ionScrollStart", ionScroll: "ionScroll", ionScrollEnd: "ionScrollEnd" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonContent = __decorate([
      ProxyCmp2({
        inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"],
        methods: ["getScrollElement", "scrollToTop", "scrollToBottom", "scrollByPoint", "scrollToPoint"]
      })
    ], IonContent);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonContent, decorators: [{
      type: Component,
      args: [{
        selector: "ion-content",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"],
        outputs: ["ionScrollStart", "ionScroll", "ionScrollEnd"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionScrollStart: [{
      type: Output
    }], ionScroll: [{
      type: Output
    }], ionScrollEnd: [{
      type: Output
    }] } });
    IonDatetime = class IonDatetime2 {
      z;
      el;
      ionCancel = new EventEmitter();
      ionChange = new EventEmitter();
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonDatetime2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonDatetime2, isStandalone: false, selector: "ion-datetime", inputs: { cancelText: "cancelText", clearText: "clearText", color: "color", dayValues: "dayValues", disabled: "disabled", doneText: "doneText", firstDayOfWeek: "firstDayOfWeek", formatOptions: "formatOptions", highlightedDates: "highlightedDates", hourCycle: "hourCycle", hourValues: "hourValues", isDateEnabled: "isDateEnabled", locale: "locale", max: "max", min: "min", minuteValues: "minuteValues", mode: "mode", monthValues: "monthValues", multiple: "multiple", name: "name", preferWheel: "preferWheel", presentation: "presentation", readonly: "readonly", showAdjacentDays: "showAdjacentDays", showClearButton: "showClearButton", showDefaultButtons: "showDefaultButtons", showDefaultTimeLabel: "showDefaultTimeLabel", showDefaultTitle: "showDefaultTitle", size: "size", titleSelectedDatesFormatter: "titleSelectedDatesFormatter", value: "value", yearValues: "yearValues" }, outputs: { ionCancel: "ionCancel", ionChange: "ionChange", ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonDatetime = __decorate([
      ProxyCmp2({
        inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showAdjacentDays", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"],
        methods: ["confirm", "reset", "cancel"]
      })
    ], IonDatetime);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonDatetime, decorators: [{
      type: Component,
      args: [{
        selector: "ion-datetime",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showAdjacentDays", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"],
        outputs: ["ionCancel", "ionChange", "ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionCancel: [{
      type: Output
    }], ionChange: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonDatetimeButton = class IonDatetimeButton2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonDatetimeButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonDatetimeButton2, isStandalone: false, selector: "ion-datetime-button", inputs: { color: "color", datetime: "datetime", disabled: "disabled", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonDatetimeButton = __decorate([
      ProxyCmp2({
        inputs: ["color", "datetime", "disabled", "mode"]
      })
    ], IonDatetimeButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonDatetimeButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-datetime-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "datetime", "disabled", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonFab = class IonFab2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFab2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonFab2, isStandalone: false, selector: "ion-fab", inputs: { activated: "activated", edge: "edge", horizontal: "horizontal", vertical: "vertical" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonFab = __decorate([
      ProxyCmp2({
        inputs: ["activated", "edge", "horizontal", "vertical"],
        methods: ["close"]
      })
    ], IonFab);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFab, decorators: [{
      type: Component,
      args: [{
        selector: "ion-fab",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["activated", "edge", "horizontal", "vertical"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonFabButton = class IonFabButton2 {
      z;
      el;
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFabButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonFabButton2, isStandalone: false, selector: "ion-fab-button", inputs: { activated: "activated", closeIcon: "closeIcon", color: "color", disabled: "disabled", download: "download", form: "form", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", show: "show", size: "size", target: "target", translucent: "translucent", type: "type" }, outputs: { ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonFabButton = __decorate([
      ProxyCmp2({
        inputs: ["activated", "closeIcon", "color", "disabled", "download", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"]
      })
    ], IonFabButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFabButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-fab-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["activated", "closeIcon", "color", "disabled", "download", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"],
        outputs: ["ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonFabList = class IonFabList2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFabList2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonFabList2, isStandalone: false, selector: "ion-fab-list", inputs: { activated: "activated", side: "side" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonFabList = __decorate([
      ProxyCmp2({
        inputs: ["activated", "side"]
      })
    ], IonFabList);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFabList, decorators: [{
      type: Component,
      args: [{
        selector: "ion-fab-list",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["activated", "side"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonFooter = class IonFooter2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFooter2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonFooter2, isStandalone: false, selector: "ion-footer", inputs: { collapse: "collapse", mode: "mode", translucent: "translucent" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonFooter = __decorate([
      ProxyCmp2({
        inputs: ["collapse", "mode", "translucent"]
      })
    ], IonFooter);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonFooter, decorators: [{
      type: Component,
      args: [{
        selector: "ion-footer",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["collapse", "mode", "translucent"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonGrid = class IonGrid2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonGrid2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonGrid2, isStandalone: false, selector: "ion-grid", inputs: { fixed: "fixed" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonGrid = __decorate([
      ProxyCmp2({
        inputs: ["fixed"]
      })
    ], IonGrid);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonGrid, decorators: [{
      type: Component,
      args: [{
        selector: "ion-grid",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["fixed"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonHeader = class IonHeader2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonHeader2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonHeader2, isStandalone: false, selector: "ion-header", inputs: { collapse: "collapse", mode: "mode", translucent: "translucent" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonHeader = __decorate([
      ProxyCmp2({
        inputs: ["collapse", "mode", "translucent"]
      })
    ], IonHeader);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonHeader, decorators: [{
      type: Component,
      args: [{
        selector: "ion-header",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["collapse", "mode", "translucent"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonIcon = class IonIcon2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonIcon2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonIcon2, isStandalone: false, selector: "ion-icon", inputs: { color: "color", flipRtl: "flipRtl", icon: "icon", ios: "ios", lazy: "lazy", md: "md", mode: "mode", name: "name", sanitize: "sanitize", size: "size", src: "src" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonIcon = __decorate([
      ProxyCmp2({
        inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"]
      })
    ], IonIcon);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonIcon, decorators: [{
      type: Component,
      args: [{
        selector: "ion-icon",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonImg = class IonImg2 {
      z;
      el;
      ionImgWillLoad = new EventEmitter();
      ionImgDidLoad = new EventEmitter();
      ionError = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonImg2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonImg2, isStandalone: false, selector: "ion-img", inputs: { alt: "alt", src: "src" }, outputs: { ionImgWillLoad: "ionImgWillLoad", ionImgDidLoad: "ionImgDidLoad", ionError: "ionError" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonImg = __decorate([
      ProxyCmp2({
        inputs: ["alt", "src"]
      })
    ], IonImg);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonImg, decorators: [{
      type: Component,
      args: [{
        selector: "ion-img",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["alt", "src"],
        outputs: ["ionImgWillLoad", "ionImgDidLoad", "ionError"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionImgWillLoad: [{
      type: Output
    }], ionImgDidLoad: [{
      type: Output
    }], ionError: [{
      type: Output
    }] } });
    IonInfiniteScroll = class IonInfiniteScroll2 {
      z;
      el;
      ionInfinite = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInfiniteScroll2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonInfiniteScroll2, isStandalone: false, selector: "ion-infinite-scroll", inputs: { disabled: "disabled", position: "position", threshold: "threshold" }, outputs: { ionInfinite: "ionInfinite" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonInfiniteScroll = __decorate([
      ProxyCmp2({
        inputs: ["disabled", "position", "threshold"],
        methods: ["complete"]
      })
    ], IonInfiniteScroll);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInfiniteScroll, decorators: [{
      type: Component,
      args: [{
        selector: "ion-infinite-scroll",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled", "position", "threshold"],
        outputs: ["ionInfinite"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionInfinite: [{
      type: Output
    }] } });
    IonInfiniteScrollContent = class IonInfiniteScrollContent2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInfiniteScrollContent2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonInfiniteScrollContent2, isStandalone: false, selector: "ion-infinite-scroll-content", inputs: { loadingSpinner: "loadingSpinner", loadingText: "loadingText" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonInfiniteScrollContent = __decorate([
      ProxyCmp2({
        inputs: ["loadingSpinner", "loadingText"]
      })
    ], IonInfiniteScrollContent);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInfiniteScrollContent, decorators: [{
      type: Component,
      args: [{
        selector: "ion-infinite-scroll-content",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["loadingSpinner", "loadingText"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonInput = class IonInput2 {
      z;
      el;
      ionInput = new EventEmitter();
      ionChange = new EventEmitter();
      ionBlur = new EventEmitter();
      ionFocus = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInput2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonInput2, isStandalone: false, selector: "ion-input", inputs: { autocapitalize: "autocapitalize", autocomplete: "autocomplete", autocorrect: "autocorrect", autofocus: "autofocus", clearInput: "clearInput", clearInputIcon: "clearInputIcon", clearOnEdit: "clearOnEdit", color: "color", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", max: "max", maxlength: "maxlength", min: "min", minlength: "minlength", mode: "mode", multiple: "multiple", name: "name", pattern: "pattern", placeholder: "placeholder", readonly: "readonly", required: "required", shape: "shape", spellcheck: "spellcheck", step: "step", type: "type", value: "value" }, outputs: { ionInput: "ionInput", ionChange: "ionChange", ionBlur: "ionBlur", ionFocus: "ionFocus" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonInput = __decorate([
      ProxyCmp2({
        inputs: ["autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearInputIcon", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "spellcheck", "step", "type", "value"],
        methods: ["setFocus", "getInputElement"]
      })
    ], IonInput);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInput, decorators: [{
      type: Component,
      args: [{
        selector: "ion-input",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearInputIcon", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "spellcheck", "step", "type", "value"],
        outputs: ["ionInput", "ionChange", "ionBlur", "ionFocus"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionInput: [{
      type: Output
    }], ionChange: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }] } });
    IonInputOtp = class IonInputOtp2 {
      z;
      el;
      ionInput = new EventEmitter();
      ionChange = new EventEmitter();
      ionComplete = new EventEmitter();
      ionBlur = new EventEmitter();
      ionFocus = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInputOtp2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonInputOtp2, isStandalone: false, selector: "ion-input-otp", inputs: { autocapitalize: "autocapitalize", color: "color", disabled: "disabled", fill: "fill", inputmode: "inputmode", length: "length", pattern: "pattern", readonly: "readonly", separators: "separators", shape: "shape", size: "size", type: "type", value: "value" }, outputs: { ionInput: "ionInput", ionChange: "ionChange", ionComplete: "ionComplete", ionBlur: "ionBlur", ionFocus: "ionFocus" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonInputOtp = __decorate([
      ProxyCmp2({
        inputs: ["autocapitalize", "color", "disabled", "fill", "inputmode", "length", "pattern", "readonly", "separators", "shape", "size", "type", "value"],
        methods: ["setFocus"]
      })
    ], IonInputOtp);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInputOtp, decorators: [{
      type: Component,
      args: [{
        selector: "ion-input-otp",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["autocapitalize", "color", "disabled", "fill", "inputmode", "length", "pattern", "readonly", "separators", "shape", "size", "type", "value"],
        outputs: ["ionInput", "ionChange", "ionComplete", "ionBlur", "ionFocus"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionInput: [{
      type: Output
    }], ionChange: [{
      type: Output
    }], ionComplete: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }] } });
    IonInputPasswordToggle = class IonInputPasswordToggle2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInputPasswordToggle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonInputPasswordToggle2, isStandalone: false, selector: "ion-input-password-toggle", inputs: { color: "color", hideIcon: "hideIcon", mode: "mode", showIcon: "showIcon" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonInputPasswordToggle = __decorate([
      ProxyCmp2({
        inputs: ["color", "hideIcon", "mode", "showIcon"]
      })
    ], IonInputPasswordToggle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonInputPasswordToggle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-input-password-toggle",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "hideIcon", "mode", "showIcon"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonItem = class IonItem2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItem2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItem2, isStandalone: false, selector: "ion-item", inputs: { button: "button", color: "color", detail: "detail", detailIcon: "detailIcon", disabled: "disabled", download: "download", href: "href", lines: "lines", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", target: "target", type: "type" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItem = __decorate([
      ProxyCmp2({
        inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
      })
    ], IonItem);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItem, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonItemDivider = class IonItemDivider2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemDivider2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItemDivider2, isStandalone: false, selector: "ion-item-divider", inputs: { color: "color", mode: "mode", sticky: "sticky" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItemDivider = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode", "sticky"]
      })
    ], IonItemDivider);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemDivider, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item-divider",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode", "sticky"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonItemGroup = class IonItemGroup2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemGroup2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItemGroup2, isStandalone: false, selector: "ion-item-group", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItemGroup = __decorate([
      ProxyCmp2({})
    ], IonItemGroup);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemGroup, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item-group",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonItemOption = class IonItemOption2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemOption2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItemOption2, isStandalone: false, selector: "ion-item-option", inputs: { color: "color", disabled: "disabled", download: "download", expandable: "expandable", href: "href", mode: "mode", rel: "rel", target: "target", type: "type" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItemOption = __decorate([
      ProxyCmp2({
        inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"]
      })
    ], IonItemOption);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemOption, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item-option",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonItemOptions = class IonItemOptions2 {
      z;
      el;
      ionSwipe = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemOptions2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItemOptions2, isStandalone: false, selector: "ion-item-options", inputs: { side: "side" }, outputs: { ionSwipe: "ionSwipe" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItemOptions = __decorate([
      ProxyCmp2({
        inputs: ["side"]
      })
    ], IonItemOptions);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemOptions, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item-options",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["side"],
        outputs: ["ionSwipe"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionSwipe: [{
      type: Output
    }] } });
    IonItemSliding = class IonItemSliding2 {
      z;
      el;
      ionDrag = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemSliding2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonItemSliding2, isStandalone: false, selector: "ion-item-sliding", inputs: { disabled: "disabled" }, outputs: { ionDrag: "ionDrag" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonItemSliding = __decorate([
      ProxyCmp2({
        inputs: ["disabled"],
        methods: ["getOpenAmount", "getSlidingRatio", "open", "close", "closeOpened"]
      })
    ], IonItemSliding);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonItemSliding, decorators: [{
      type: Component,
      args: [{
        selector: "ion-item-sliding",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled"],
        outputs: ["ionDrag"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionDrag: [{
      type: Output
    }] } });
    IonLabel = class IonLabel2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonLabel2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonLabel2, isStandalone: false, selector: "ion-label", inputs: { color: "color", mode: "mode", position: "position" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonLabel = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode", "position"]
      })
    ], IonLabel);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonLabel, decorators: [{
      type: Component,
      args: [{
        selector: "ion-label",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode", "position"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonList = class IonList2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonList2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonList2, isStandalone: false, selector: "ion-list", inputs: { inset: "inset", lines: "lines", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonList = __decorate([
      ProxyCmp2({
        inputs: ["inset", "lines", "mode"],
        methods: ["closeSlidingItems"]
      })
    ], IonList);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonList, decorators: [{
      type: Component,
      args: [{
        selector: "ion-list",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["inset", "lines", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonListHeader = class IonListHeader2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonListHeader2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonListHeader2, isStandalone: false, selector: "ion-list-header", inputs: { color: "color", lines: "lines", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonListHeader = __decorate([
      ProxyCmp2({
        inputs: ["color", "lines", "mode"]
      })
    ], IonListHeader);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonListHeader, decorators: [{
      type: Component,
      args: [{
        selector: "ion-list-header",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "lines", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonLoading = class IonLoading2 {
      z;
      el;
      ionLoadingDidPresent = new EventEmitter();
      ionLoadingWillPresent = new EventEmitter();
      ionLoadingWillDismiss = new EventEmitter();
      ionLoadingDidDismiss = new EventEmitter();
      didPresent = new EventEmitter();
      willPresent = new EventEmitter();
      willDismiss = new EventEmitter();
      didDismiss = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonLoading2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonLoading2, isStandalone: false, selector: "ion-loading", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", cssClass: "cssClass", duration: "duration", enterAnimation: "enterAnimation", htmlAttributes: "htmlAttributes", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", showBackdrop: "showBackdrop", spinner: "spinner", translucent: "translucent", trigger: "trigger" }, outputs: { ionLoadingDidPresent: "ionLoadingDidPresent", ionLoadingWillPresent: "ionLoadingWillPresent", ionLoadingWillDismiss: "ionLoadingWillDismiss", ionLoadingDidDismiss: "ionLoadingDidDismiss", didPresent: "didPresent", willPresent: "willPresent", willDismiss: "willDismiss", didDismiss: "didDismiss" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonLoading = __decorate([
      ProxyCmp2({
        inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"],
        methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
      })
    ], IonLoading);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonLoading, decorators: [{
      type: Component,
      args: [{
        selector: "ion-loading",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"],
        outputs: ["ionLoadingDidPresent", "ionLoadingWillPresent", "ionLoadingWillDismiss", "ionLoadingDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionLoadingDidPresent: [{
      type: Output
    }], ionLoadingWillPresent: [{
      type: Output
    }], ionLoadingWillDismiss: [{
      type: Output
    }], ionLoadingDidDismiss: [{
      type: Output
    }], didPresent: [{
      type: Output
    }], willPresent: [{
      type: Output
    }], willDismiss: [{
      type: Output
    }], didDismiss: [{
      type: Output
    }] } });
    IonMenu = class IonMenu2 {
      z;
      el;
      ionWillOpen = new EventEmitter();
      ionWillClose = new EventEmitter();
      ionDidOpen = new EventEmitter();
      ionDidClose = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenu2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonMenu2, isStandalone: false, selector: "ion-menu", inputs: { contentId: "contentId", disabled: "disabled", maxEdgeStart: "maxEdgeStart", menuId: "menuId", side: "side", swipeGesture: "swipeGesture", type: "type" }, outputs: { ionWillOpen: "ionWillOpen", ionWillClose: "ionWillClose", ionDidOpen: "ionDidOpen", ionDidClose: "ionDidClose" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonMenu = __decorate([
      ProxyCmp2({
        inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"],
        methods: ["isOpen", "isActive", "open", "close", "toggle", "setOpen"]
      })
    ], IonMenu);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenu, decorators: [{
      type: Component,
      args: [{
        selector: "ion-menu",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"],
        outputs: ["ionWillOpen", "ionWillClose", "ionDidOpen", "ionDidClose"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionWillOpen: [{
      type: Output
    }], ionWillClose: [{
      type: Output
    }], ionDidOpen: [{
      type: Output
    }], ionDidClose: [{
      type: Output
    }] } });
    IonMenuButton = class IonMenuButton2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenuButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonMenuButton2, isStandalone: false, selector: "ion-menu-button", inputs: { autoHide: "autoHide", color: "color", disabled: "disabled", menu: "menu", mode: "mode", type: "type" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonMenuButton = __decorate([
      ProxyCmp2({
        inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"]
      })
    ], IonMenuButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenuButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-menu-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonMenuToggle = class IonMenuToggle2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenuToggle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonMenuToggle2, isStandalone: false, selector: "ion-menu-toggle", inputs: { autoHide: "autoHide", menu: "menu" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonMenuToggle = __decorate([
      ProxyCmp2({
        inputs: ["autoHide", "menu"]
      })
    ], IonMenuToggle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMenuToggle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-menu-toggle",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["autoHide", "menu"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonNavLink = class IonNavLink2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNavLink2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonNavLink2, isStandalone: false, selector: "ion-nav-link", inputs: { component: "component", componentProps: "componentProps", routerAnimation: "routerAnimation", routerDirection: "routerDirection" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonNavLink = __decorate([
      ProxyCmp2({
        inputs: ["component", "componentProps", "routerAnimation", "routerDirection"]
      })
    ], IonNavLink);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNavLink, decorators: [{
      type: Component,
      args: [{
        selector: "ion-nav-link",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["component", "componentProps", "routerAnimation", "routerDirection"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonNote = class IonNote2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNote2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonNote2, isStandalone: false, selector: "ion-note", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonNote = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonNote);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonNote, decorators: [{
      type: Component,
      args: [{
        selector: "ion-note",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonPicker = class IonPicker2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPicker2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonPicker2, isStandalone: false, selector: "ion-picker", inputs: { mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonPicker = __decorate([
      ProxyCmp2({
        inputs: ["mode"]
      })
    ], IonPicker);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPicker, decorators: [{
      type: Component,
      args: [{
        selector: "ion-picker",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonPickerColumn = class IonPickerColumn2 {
      z;
      el;
      ionChange = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPickerColumn2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonPickerColumn2, isStandalone: false, selector: "ion-picker-column", inputs: { color: "color", disabled: "disabled", mode: "mode", value: "value" }, outputs: { ionChange: "ionChange" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonPickerColumn = __decorate([
      ProxyCmp2({
        inputs: ["color", "disabled", "mode", "value"],
        methods: ["setFocus"]
      })
    ], IonPickerColumn);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPickerColumn, decorators: [{
      type: Component,
      args: [{
        selector: "ion-picker-column",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "disabled", "mode", "value"],
        outputs: ["ionChange"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }] } });
    IonPickerColumnOption = class IonPickerColumnOption2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPickerColumnOption2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonPickerColumnOption2, isStandalone: false, selector: "ion-picker-column-option", inputs: { color: "color", disabled: "disabled", value: "value" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonPickerColumnOption = __decorate([
      ProxyCmp2({
        inputs: ["color", "disabled", "value"]
      })
    ], IonPickerColumnOption);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPickerColumnOption, decorators: [{
      type: Component,
      args: [{
        selector: "ion-picker-column-option",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "disabled", "value"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonProgressBar = class IonProgressBar2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonProgressBar2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonProgressBar2, isStandalone: false, selector: "ion-progress-bar", inputs: { buffer: "buffer", color: "color", mode: "mode", reversed: "reversed", type: "type", value: "value" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonProgressBar = __decorate([
      ProxyCmp2({
        inputs: ["buffer", "color", "mode", "reversed", "type", "value"]
      })
    ], IonProgressBar);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonProgressBar, decorators: [{
      type: Component,
      args: [{
        selector: "ion-progress-bar",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["buffer", "color", "mode", "reversed", "type", "value"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonRadio = class IonRadio2 {
      z;
      el;
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRadio2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRadio2, isStandalone: false, selector: "ion-radio", inputs: { alignment: "alignment", color: "color", disabled: "disabled", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", value: "value" }, outputs: { ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRadio = __decorate([
      ProxyCmp2({
        inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "mode", "name", "value"]
      })
    ], IonRadio);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRadio, decorators: [{
      type: Component,
      args: [{
        selector: "ion-radio",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "mode", "name", "value"],
        outputs: ["ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonRadioGroup = class IonRadioGroup2 {
      z;
      el;
      ionChange = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRadioGroup2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRadioGroup2, isStandalone: false, selector: "ion-radio-group", inputs: { allowEmptySelection: "allowEmptySelection", compareWith: "compareWith", errorText: "errorText", helperText: "helperText", name: "name", value: "value" }, outputs: { ionChange: "ionChange" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRadioGroup = __decorate([
      ProxyCmp2({
        inputs: ["allowEmptySelection", "compareWith", "errorText", "helperText", "name", "value"]
      })
    ], IonRadioGroup);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRadioGroup, decorators: [{
      type: Component,
      args: [{
        selector: "ion-radio-group",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["allowEmptySelection", "compareWith", "errorText", "helperText", "name", "value"],
        outputs: ["ionChange"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }] } });
    IonRange = class IonRange2 {
      z;
      el;
      ionChange = new EventEmitter();
      ionInput = new EventEmitter();
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      ionKnobMoveStart = new EventEmitter();
      ionKnobMoveEnd = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRange2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRange2, isStandalone: false, selector: "ion-range", inputs: { activeBarStart: "activeBarStart", color: "color", debounce: "debounce", disabled: "disabled", dualKnobs: "dualKnobs", label: "label", labelPlacement: "labelPlacement", max: "max", min: "min", mode: "mode", name: "name", pin: "pin", pinFormatter: "pinFormatter", snaps: "snaps", step: "step", ticks: "ticks", value: "value" }, outputs: { ionChange: "ionChange", ionInput: "ionInput", ionFocus: "ionFocus", ionBlur: "ionBlur", ionKnobMoveStart: "ionKnobMoveStart", ionKnobMoveEnd: "ionKnobMoveEnd" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRange = __decorate([
      ProxyCmp2({
        inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"]
      })
    ], IonRange);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRange, decorators: [{
      type: Component,
      args: [{
        selector: "ion-range",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"],
        outputs: ["ionChange", "ionInput", "ionFocus", "ionBlur", "ionKnobMoveStart", "ionKnobMoveEnd"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }], ionInput: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }], ionKnobMoveStart: [{
      type: Output
    }], ionKnobMoveEnd: [{
      type: Output
    }] } });
    IonRefresher = class IonRefresher2 {
      z;
      el;
      ionRefresh = new EventEmitter();
      ionPull = new EventEmitter();
      ionStart = new EventEmitter();
      ionPullStart = new EventEmitter();
      ionPullEnd = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRefresher2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRefresher2, isStandalone: false, selector: "ion-refresher", inputs: { closeDuration: "closeDuration", disabled: "disabled", mode: "mode", pullFactor: "pullFactor", pullMax: "pullMax", pullMin: "pullMin", snapbackDuration: "snapbackDuration" }, outputs: { ionRefresh: "ionRefresh", ionPull: "ionPull", ionStart: "ionStart", ionPullStart: "ionPullStart", ionPullEnd: "ionPullEnd" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRefresher = __decorate([
      ProxyCmp2({
        inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"],
        methods: ["complete", "cancel", "getProgress"]
      })
    ], IonRefresher);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRefresher, decorators: [{
      type: Component,
      args: [{
        selector: "ion-refresher",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"],
        outputs: ["ionRefresh", "ionPull", "ionStart", "ionPullStart", "ionPullEnd"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionRefresh: [{
      type: Output
    }], ionPull: [{
      type: Output
    }], ionStart: [{
      type: Output
    }], ionPullStart: [{
      type: Output
    }], ionPullEnd: [{
      type: Output
    }] } });
    IonRefresherContent = class IonRefresherContent2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRefresherContent2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRefresherContent2, isStandalone: false, selector: "ion-refresher-content", inputs: { pullingIcon: "pullingIcon", pullingText: "pullingText", refreshingSpinner: "refreshingSpinner", refreshingText: "refreshingText" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRefresherContent = __decorate([
      ProxyCmp2({
        inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"]
      })
    ], IonRefresherContent);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRefresherContent, decorators: [{
      type: Component,
      args: [{
        selector: "ion-refresher-content",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonReorder = class IonReorder2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonReorder2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonReorder2, isStandalone: false, selector: "ion-reorder", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonReorder = __decorate([
      ProxyCmp2({})
    ], IonReorder);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonReorder, decorators: [{
      type: Component,
      args: [{
        selector: "ion-reorder",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonReorderGroup = class IonReorderGroup2 {
      z;
      el;
      ionItemReorder = new EventEmitter();
      ionReorderStart = new EventEmitter();
      ionReorderMove = new EventEmitter();
      ionReorderEnd = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonReorderGroup2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonReorderGroup2, isStandalone: false, selector: "ion-reorder-group", inputs: { disabled: "disabled" }, outputs: { ionItemReorder: "ionItemReorder", ionReorderStart: "ionReorderStart", ionReorderMove: "ionReorderMove", ionReorderEnd: "ionReorderEnd" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonReorderGroup = __decorate([
      ProxyCmp2({
        inputs: ["disabled"],
        methods: ["complete"]
      })
    ], IonReorderGroup);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonReorderGroup, decorators: [{
      type: Component,
      args: [{
        selector: "ion-reorder-group",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled"],
        outputs: ["ionItemReorder", "ionReorderStart", "ionReorderMove", "ionReorderEnd"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionItemReorder: [{
      type: Output
    }], ionReorderStart: [{
      type: Output
    }], ionReorderMove: [{
      type: Output
    }], ionReorderEnd: [{
      type: Output
    }] } });
    IonRippleEffect = class IonRippleEffect2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRippleEffect2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRippleEffect2, isStandalone: false, selector: "ion-ripple-effect", inputs: { type: "type" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRippleEffect = __decorate([
      ProxyCmp2({
        inputs: ["type"],
        methods: ["addRipple"]
      })
    ], IonRippleEffect);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRippleEffect, decorators: [{
      type: Component,
      args: [{
        selector: "ion-ripple-effect",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["type"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonRow = class IonRow2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRow2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonRow2, isStandalone: false, selector: "ion-row", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonRow = __decorate([
      ProxyCmp2({})
    ], IonRow);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonRow, decorators: [{
      type: Component,
      args: [{
        selector: "ion-row",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSearchbar = class IonSearchbar2 {
      z;
      el;
      ionInput = new EventEmitter();
      ionChange = new EventEmitter();
      ionCancel = new EventEmitter();
      ionClear = new EventEmitter();
      ionBlur = new EventEmitter();
      ionFocus = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSearchbar2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSearchbar2, isStandalone: false, selector: "ion-searchbar", inputs: { animated: "animated", autocapitalize: "autocapitalize", autocomplete: "autocomplete", autocorrect: "autocorrect", cancelButtonIcon: "cancelButtonIcon", cancelButtonText: "cancelButtonText", clearIcon: "clearIcon", color: "color", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", inputmode: "inputmode", maxlength: "maxlength", minlength: "minlength", mode: "mode", name: "name", placeholder: "placeholder", searchIcon: "searchIcon", showCancelButton: "showCancelButton", showClearButton: "showClearButton", spellcheck: "spellcheck", type: "type", value: "value" }, outputs: { ionInput: "ionInput", ionChange: "ionChange", ionCancel: "ionCancel", ionClear: "ionClear", ionBlur: "ionBlur", ionFocus: "ionFocus" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSearchbar = __decorate([
      ProxyCmp2({
        inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"],
        methods: ["setFocus", "getInputElement"]
      })
    ], IonSearchbar);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSearchbar, decorators: [{
      type: Component,
      args: [{
        selector: "ion-searchbar",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"],
        outputs: ["ionInput", "ionChange", "ionCancel", "ionClear", "ionBlur", "ionFocus"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionInput: [{
      type: Output
    }], ionChange: [{
      type: Output
    }], ionCancel: [{
      type: Output
    }], ionClear: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }] } });
    IonSegment = class IonSegment2 {
      z;
      el;
      ionChange = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegment2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSegment2, isStandalone: false, selector: "ion-segment", inputs: { color: "color", disabled: "disabled", mode: "mode", scrollable: "scrollable", selectOnFocus: "selectOnFocus", swipeGesture: "swipeGesture", value: "value" }, outputs: { ionChange: "ionChange" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSegment = __decorate([
      ProxyCmp2({
        inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"]
      })
    ], IonSegment);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegment, decorators: [{
      type: Component,
      args: [{
        selector: "ion-segment",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"],
        outputs: ["ionChange"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }] } });
    IonSegmentButton = class IonSegmentButton2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSegmentButton2, isStandalone: false, selector: "ion-segment-button", inputs: { contentId: "contentId", disabled: "disabled", layout: "layout", mode: "mode", type: "type", value: "value" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSegmentButton = __decorate([
      ProxyCmp2({
        inputs: ["contentId", "disabled", "layout", "mode", "type", "value"]
      })
    ], IonSegmentButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-segment-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["contentId", "disabled", "layout", "mode", "type", "value"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSegmentContent = class IonSegmentContent2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentContent2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSegmentContent2, isStandalone: false, selector: "ion-segment-content", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSegmentContent = __decorate([
      ProxyCmp2({})
    ], IonSegmentContent);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentContent, decorators: [{
      type: Component,
      args: [{
        selector: "ion-segment-content",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSegmentView = class IonSegmentView2 {
      z;
      el;
      ionSegmentViewScroll = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentView2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSegmentView2, isStandalone: false, selector: "ion-segment-view", inputs: { disabled: "disabled", swipeGesture: "swipeGesture" }, outputs: { ionSegmentViewScroll: "ionSegmentViewScroll" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSegmentView = __decorate([
      ProxyCmp2({
        inputs: ["disabled", "swipeGesture"]
      })
    ], IonSegmentView);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSegmentView, decorators: [{
      type: Component,
      args: [{
        selector: "ion-segment-view",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled", "swipeGesture"],
        outputs: ["ionSegmentViewScroll"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionSegmentViewScroll: [{
      type: Output
    }] } });
    IonSelect = class IonSelect2 {
      z;
      el;
      ionChange = new EventEmitter();
      ionCancel = new EventEmitter();
      ionDismiss = new EventEmitter();
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelect2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSelect2, isStandalone: false, selector: "ion-select", inputs: { cancelText: "cancelText", color: "color", compareWith: "compareWith", disabled: "disabled", errorText: "errorText", expandedIcon: "expandedIcon", fill: "fill", helperText: "helperText", interface: "interface", interfaceOptions: "interfaceOptions", justify: "justify", label: "label", labelPlacement: "labelPlacement", mode: "mode", multiple: "multiple", name: "name", okText: "okText", placeholder: "placeholder", required: "required", selectedText: "selectedText", shape: "shape", toggleIcon: "toggleIcon", value: "value" }, outputs: { ionChange: "ionChange", ionCancel: "ionCancel", ionDismiss: "ionDismiss", ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSelect = __decorate([
      ProxyCmp2({
        inputs: ["cancelText", "color", "compareWith", "disabled", "errorText", "expandedIcon", "fill", "helperText", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "mode", "multiple", "name", "okText", "placeholder", "required", "selectedText", "shape", "toggleIcon", "value"],
        methods: ["open"]
      })
    ], IonSelect);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelect, decorators: [{
      type: Component,
      args: [{
        selector: "ion-select",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["cancelText", "color", "compareWith", "disabled", "errorText", "expandedIcon", "fill", "helperText", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "mode", "multiple", "name", "okText", "placeholder", "required", "selectedText", "shape", "toggleIcon", "value"],
        outputs: ["ionChange", "ionCancel", "ionDismiss", "ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }], ionCancel: [{
      type: Output
    }], ionDismiss: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonSelectModal = class IonSelectModal2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelectModal2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSelectModal2, isStandalone: false, selector: "ion-select-modal", inputs: { cancelText: "cancelText", header: "header", multiple: "multiple", options: "options" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSelectModal = __decorate([
      ProxyCmp2({
        inputs: ["cancelText", "header", "multiple", "options"]
      })
    ], IonSelectModal);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelectModal, decorators: [{
      type: Component,
      args: [{
        selector: "ion-select-modal",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["cancelText", "header", "multiple", "options"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSelectOption = class IonSelectOption2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelectOption2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSelectOption2, isStandalone: false, selector: "ion-select-option", inputs: { description: "description", disabled: "disabled", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", value: "value" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSelectOption = __decorate([
      ProxyCmp2({
        inputs: ["description", "disabled", "justify", "labelPlacement", "mode", "value"]
      })
    ], IonSelectOption);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSelectOption, decorators: [{
      type: Component,
      args: [{
        selector: "ion-select-option",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["description", "disabled", "justify", "labelPlacement", "mode", "value"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSkeletonText = class IonSkeletonText2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSkeletonText2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSkeletonText2, isStandalone: false, selector: "ion-skeleton-text", inputs: { animated: "animated" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSkeletonText = __decorate([
      ProxyCmp2({
        inputs: ["animated"]
      })
    ], IonSkeletonText);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSkeletonText, decorators: [{
      type: Component,
      args: [{
        selector: "ion-skeleton-text",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSpinner = class IonSpinner2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSpinner2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSpinner2, isStandalone: false, selector: "ion-spinner", inputs: { color: "color", duration: "duration", name: "name", paused: "paused" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSpinner = __decorate([
      ProxyCmp2({
        inputs: ["color", "duration", "name", "paused"]
      })
    ], IonSpinner);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSpinner, decorators: [{
      type: Component,
      args: [{
        selector: "ion-spinner",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "duration", "name", "paused"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonSplitPane = class IonSplitPane2 {
      z;
      el;
      ionSplitPaneVisible = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSplitPane2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonSplitPane2, isStandalone: false, selector: "ion-split-pane", inputs: { contentId: "contentId", disabled: "disabled", when: "when" }, outputs: { ionSplitPaneVisible: "ionSplitPaneVisible" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonSplitPane = __decorate([
      ProxyCmp2({
        inputs: ["contentId", "disabled", "when"]
      })
    ], IonSplitPane);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonSplitPane, decorators: [{
      type: Component,
      args: [{
        selector: "ion-split-pane",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["contentId", "disabled", "when"],
        outputs: ["ionSplitPaneVisible"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionSplitPaneVisible: [{
      type: Output
    }] } });
    IonTab = class IonTab2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTab2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonTab2, isStandalone: false, selector: "ion-tab", inputs: { component: "component", tab: "tab" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonTab = __decorate([
      ProxyCmp2({
        inputs: ["component", "tab"],
        methods: ["setActive"]
      })
    ], IonTab);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTab, decorators: [{
      type: Component,
      args: [{
        selector: "ion-tab",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["component", { name: "tab", required: true }],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonTabBar = class IonTabBar2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabBar2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonTabBar2, isStandalone: false, selector: "ion-tab-bar", inputs: { color: "color", mode: "mode", selectedTab: "selectedTab", translucent: "translucent" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonTabBar = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode", "selectedTab", "translucent"]
      })
    ], IonTabBar);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabBar, decorators: [{
      type: Component,
      args: [{
        selector: "ion-tab-bar",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode", "selectedTab", "translucent"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonTabButton = class IonTabButton2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabButton2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonTabButton2, isStandalone: false, selector: "ion-tab-button", inputs: { disabled: "disabled", download: "download", href: "href", layout: "layout", mode: "mode", rel: "rel", selected: "selected", tab: "tab", target: "target" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonTabButton = __decorate([
      ProxyCmp2({
        inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"]
      })
    ], IonTabButton);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabButton, decorators: [{
      type: Component,
      args: [{
        selector: "ion-tab-button",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonText = class IonText2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonText2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonText2, isStandalone: false, selector: "ion-text", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonText = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonText);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonText, decorators: [{
      type: Component,
      args: [{
        selector: "ion-text",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonTextarea = class IonTextarea2 {
      z;
      el;
      ionChange = new EventEmitter();
      ionInput = new EventEmitter();
      ionBlur = new EventEmitter();
      ionFocus = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTextarea2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonTextarea2, isStandalone: false, selector: "ion-textarea", inputs: { autoGrow: "autoGrow", autocapitalize: "autocapitalize", autofocus: "autofocus", clearOnEdit: "clearOnEdit", color: "color", cols: "cols", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", maxlength: "maxlength", minlength: "minlength", mode: "mode", name: "name", placeholder: "placeholder", readonly: "readonly", required: "required", rows: "rows", shape: "shape", spellcheck: "spellcheck", value: "value", wrap: "wrap" }, outputs: { ionChange: "ionChange", ionInput: "ionInput", ionBlur: "ionBlur", ionFocus: "ionFocus" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonTextarea = __decorate([
      ProxyCmp2({
        inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"],
        methods: ["setFocus", "getInputElement"]
      })
    ], IonTextarea);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTextarea, decorators: [{
      type: Component,
      args: [{
        selector: "ion-textarea",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"],
        outputs: ["ionChange", "ionInput", "ionBlur", "ionFocus"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }], ionInput: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }] } });
    IonThumbnail = class IonThumbnail2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonThumbnail2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonThumbnail2, isStandalone: false, selector: "ion-thumbnail", ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonThumbnail = __decorate([
      ProxyCmp2({})
    ], IonThumbnail);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonThumbnail, decorators: [{
      type: Component,
      args: [{
        selector: "ion-thumbnail",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: [],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonTitle = class IonTitle2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTitle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonTitle2, isStandalone: false, selector: "ion-title", inputs: { color: "color", size: "size" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonTitle = __decorate([
      ProxyCmp2({
        inputs: ["color", "size"]
      })
    ], IonTitle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTitle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-title",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "size"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
    IonToast = class IonToast2 {
      z;
      el;
      ionToastDidPresent = new EventEmitter();
      ionToastWillPresent = new EventEmitter();
      ionToastWillDismiss = new EventEmitter();
      ionToastDidDismiss = new EventEmitter();
      didPresent = new EventEmitter();
      willPresent = new EventEmitter();
      willDismiss = new EventEmitter();
      didDismiss = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToast2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonToast2, isStandalone: false, selector: "ion-toast", inputs: { animated: "animated", buttons: "buttons", color: "color", cssClass: "cssClass", duration: "duration", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", icon: "icon", isOpen: "isOpen", keyboardClose: "keyboardClose", layout: "layout", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", position: "position", positionAnchor: "positionAnchor", swipeGesture: "swipeGesture", translucent: "translucent", trigger: "trigger" }, outputs: { ionToastDidPresent: "ionToastDidPresent", ionToastWillPresent: "ionToastWillPresent", ionToastWillDismiss: "ionToastWillDismiss", ionToastDidDismiss: "ionToastDidDismiss", didPresent: "didPresent", willPresent: "willPresent", willDismiss: "willDismiss", didDismiss: "didDismiss" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonToast = __decorate([
      ProxyCmp2({
        inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"],
        methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
      })
    ], IonToast);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToast, decorators: [{
      type: Component,
      args: [{
        selector: "ion-toast",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"],
        outputs: ["ionToastDidPresent", "ionToastWillPresent", "ionToastWillDismiss", "ionToastDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionToastDidPresent: [{
      type: Output
    }], ionToastWillPresent: [{
      type: Output
    }], ionToastWillDismiss: [{
      type: Output
    }], ionToastDidDismiss: [{
      type: Output
    }], didPresent: [{
      type: Output
    }], willPresent: [{
      type: Output
    }], willDismiss: [{
      type: Output
    }], didDismiss: [{
      type: Output
    }] } });
    IonToggle = class IonToggle2 {
      z;
      el;
      ionChange = new EventEmitter();
      ionFocus = new EventEmitter();
      ionBlur = new EventEmitter();
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToggle2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonToggle2, isStandalone: false, selector: "ion-toggle", inputs: { alignment: "alignment", checked: "checked", color: "color", disabled: "disabled", enableOnOffLabels: "enableOnOffLabels", errorText: "errorText", helperText: "helperText", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", required: "required", value: "value" }, outputs: { ionChange: "ionChange", ionFocus: "ionFocus", ionBlur: "ionBlur" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonToggle = __decorate([
      ProxyCmp2({
        inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "errorText", "helperText", "justify", "labelPlacement", "mode", "name", "required", "value"]
      })
    ], IonToggle);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToggle, decorators: [{
      type: Component,
      args: [{
        selector: "ion-toggle",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "errorText", "helperText", "justify", "labelPlacement", "mode", "name", "required", "value"],
        outputs: ["ionChange", "ionFocus", "ionBlur"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }], propDecorators: { ionChange: [{
      type: Output
    }], ionFocus: [{
      type: Output
    }], ionBlur: [{
      type: Output
    }] } });
    IonToolbar = class IonToolbar2 {
      z;
      el;
      constructor(c3, r2, z) {
        this.z = z;
        c3.detach();
        this.el = r2.nativeElement;
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToolbar2, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }, { token: NgZone }], target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: IonToolbar2, isStandalone: false, selector: "ion-toolbar", inputs: { color: "color", mode: "mode" }, ngImport: core_exports, template: "<ng-content></ng-content>", isInline: true, changeDetection: ChangeDetectionStrategy.OnPush });
    };
    IonToolbar = __decorate([
      ProxyCmp2({
        inputs: ["color", "mode"]
      })
    ], IonToolbar);
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonToolbar, decorators: [{
      type: Component,
      args: [{
        selector: "ion-toolbar",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>",
        // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
        inputs: ["color", "mode"],
        standalone: false
      }]
    }], ctorParameters: () => [{ type: ChangeDetectorRef }, { type: ElementRef }, { type: NgZone }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-tabs.js
var IonTabs2;
var init_ion_tabs = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/navigation/ion-tabs.js"() {
    init_core();
    init_common2();
    init_proxies();
    init_ion_router_outlet();
    init_core();
    init_common();
    init_ion_router_outlet();
    IonTabs2 = class _IonTabs extends IonTabs {
      outlet;
      tabBar;
      tabBars;
      tabs;
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonTabs, deps: null, target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonTabs, isStandalone: false, selector: "ion-tabs", queries: [{ propertyName: "tabBar", first: true, predicate: IonTabBar, descendants: true }, { propertyName: "tabBars", predicate: IonTabBar }, { propertyName: "tabs", predicate: IonTab }], viewQueries: [{ propertyName: "outlet", first: true, predicate: ["outlet"], descendants: true, read: IonRouterOutlet2 }], usesInheritance: true, ngImport: core_exports, template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        *ngIf="tabs.length === 0"
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
      <ng-content *ngIf="tabs.length > 0" select="ion-tab"></ng-content>
    </div>
    <ng-content></ng-content>
  `, isInline: true, styles: ["\n      :host {\n        display: flex;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n\n        flex-direction: column;\n\n        width: 100%;\n        height: 100%;\n\n        contain: layout size style;\n      }\n      .tabs-inner {\n        position: relative;\n\n        flex: 1;\n\n        contain: layout size style;\n      }\n    "], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: IonRouterOutlet2, selector: "ion-router-outlet" }], changeDetection: ChangeDetectionStrategy.Default });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonTabs2, decorators: [{
      type: Component,
      args: [{ standalone: false, selector: "ion-tabs", changeDetection: ChangeDetectionStrategy.Default, template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        *ngIf="tabs.length === 0"
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
      <ng-content *ngIf="tabs.length > 0" select="ion-tab"></ng-content>
    </div>
    <ng-content></ng-content>
  `, styles: ["\n      :host {\n        display: flex;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n\n        flex-direction: column;\n\n        width: 100%;\n        height: 100%;\n\n        contain: layout size style;\n      }\n      .tabs-inner {\n        position: relative;\n\n        flex: 1;\n\n        contain: layout size style;\n      }\n    "] }]
    }], propDecorators: { outlet: [{
      type: ViewChild,
      args: ["outlet", { read: IonRouterOutlet2, static: false }]
    }], tabBar: [{
      type: ContentChild,
      args: [IonTabBar, { static: false }]
    }], tabBars: [{
      type: ContentChildren,
      args: [IonTabBar]
    }], tabs: [{
      type: ContentChildren,
      args: [IonTab]
    }] } });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/navigation/router-link-delegate.js
var RouterLinkDelegateDirective2, RouterLinkWithHrefDelegateDirective2;
var init_router_link_delegate2 = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/navigation/router-link-delegate.js"() {
    init_core();
    init_common2();
    init_core();
    RouterLinkDelegateDirective2 = class _RouterLinkDelegateDirective extends RouterLinkDelegateDirective {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RouterLinkDelegateDirective, deps: null, target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _RouterLinkDelegateDirective, isStandalone: false, selector: ":not(a):not(area)[routerLink]", usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: RouterLinkDelegateDirective2, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: ":not(a):not(area)[routerLink]"
      }]
    }] });
    RouterLinkWithHrefDelegateDirective2 = class _RouterLinkWithHrefDelegateDirective extends RouterLinkWithHrefDelegateDirective {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _RouterLinkWithHrefDelegateDirective, deps: null, target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _RouterLinkWithHrefDelegateDirective, isStandalone: false, selector: "a[routerLink],area[routerLink]", usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: RouterLinkWithHrefDelegateDirective2, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "a[routerLink],area[routerLink]"
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/overlays/modal.js
var IonModal3;
var init_modal2 = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/overlays/modal.js"() {
    init_core();
    init_common2();
    init_core();
    init_common();
    IonModal3 = class _IonModal extends IonModal {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonModal, deps: null, target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonModal, isStandalone: false, selector: "ion-modal", usesInheritance: true, ngImport: core_exports, template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonModal3, decorators: [{
      type: Component,
      args: [{
        standalone: false,
        selector: "ion-modal",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/overlays/popover.js
var IonPopover3;
var init_popover2 = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/overlays/popover.js"() {
    init_core();
    init_common2();
    init_core();
    init_common();
    IonPopover3 = class _IonPopover extends IonPopover {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonPopover, deps: null, target: FactoryTarget.Component });
      /** @nocollapse */
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "22.0.0", type: _IonPopover, isStandalone: false, selector: "ion-popover", usesInheritance: true, ngImport: core_exports, template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonPopover3, decorators: [{
      type: Component,
      args: [{
        standalone: false,
        selector: "ion-popover",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/proxies-list.js
var DIRECTIVES;
var init_proxies_list = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/proxies-list.js"() {
    init_proxies();
    DIRECTIVES = [
      IonAccordion,
      IonAccordionGroup,
      IonActionSheet,
      IonAlert,
      IonApp,
      IonAvatar,
      IonBackdrop,
      IonBadge,
      IonBreadcrumb,
      IonBreadcrumbs,
      IonButton,
      IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonCheckbox,
      IonChip,
      IonCol,
      IonContent,
      IonDatetime,
      IonDatetimeButton,
      IonFab,
      IonFabButton,
      IonFabList,
      IonFooter,
      IonGrid,
      IonHeader,
      IonIcon,
      IonImg,
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonInput,
      IonInputOtp,
      IonInputPasswordToggle,
      IonItem,
      IonItemDivider,
      IonItemGroup,
      IonItemOption,
      IonItemOptions,
      IonItemSliding,
      IonLabel,
      IonList,
      IonListHeader,
      IonLoading,
      IonMenu,
      IonMenuButton,
      IonMenuToggle,
      IonNavLink,
      IonNote,
      IonPicker,
      IonPickerColumn,
      IonPickerColumnOption,
      IonProgressBar,
      IonRadio,
      IonRadioGroup,
      IonRange,
      IonRefresher,
      IonRefresherContent,
      IonReorder,
      IonReorderGroup,
      IonRippleEffect,
      IonRow,
      IonSearchbar,
      IonSegment,
      IonSegmentButton,
      IonSegmentContent,
      IonSegmentView,
      IonSelect,
      IonSelectModal,
      IonSelectOption,
      IonSkeletonText,
      IonSpinner,
      IonSplitPane,
      IonTab,
      IonTabBar,
      IonTabButton,
      IonText,
      IonTextarea,
      IonThumbnail,
      IonTitle,
      IonToast,
      IonToggle,
      IonToolbar
    ];
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/validators/max-validator.js
var ION_MAX_VALIDATOR, IonMaxValidator;
var init_max_validator = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/validators/max-validator.js"() {
    init_core();
    init_forms();
    init_core();
    ION_MAX_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IonMaxValidator),
      multi: true
    };
    IonMaxValidator = class _IonMaxValidator extends MaxValidator {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonMaxValidator, deps: null, target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _IonMaxValidator, isStandalone: false, selector: "ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]", host: { properties: { "attr.max": "enabled(max) ? max : null" } }, providers: [ION_MAX_VALIDATOR], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMaxValidator, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]",
        providers: [ION_MAX_VALIDATOR],
        host: { "[attr.max]": "enabled(max) ? max : null" }
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/validators/min-validator.js
var ION_MIN_VALIDATOR, IonMinValidator;
var init_min_validator = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/validators/min-validator.js"() {
    init_core();
    init_forms();
    init_core();
    ION_MIN_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IonMinValidator),
      multi: true
    };
    IonMinValidator = class _IonMinValidator extends MinValidator {
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonMinValidator, deps: null, target: FactoryTarget.Directive });
      /** @nocollapse */
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "22.0.0", type: _IonMinValidator, isStandalone: false, selector: "ion-input[type=number][min][formControlName],ion-input[type=number][min][formControl],ion-input[type=number][min][ngModel]", host: { properties: { "attr.min": "enabled(min) ? min : null" } }, providers: [ION_MIN_VALIDATOR], usesInheritance: true, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonMinValidator, decorators: [{
      type: Directive,
      args: [{
        standalone: false,
        selector: "ion-input[type=number][min][formControlName],ion-input[type=number][min][formControl],ion-input[type=number][min][ngModel]",
        providers: [ION_MIN_VALIDATOR],
        host: { "[attr.min]": "enabled(min) ? min : null" }
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/directives/validators/index.js
var init_validators = __esm({
  "node_modules/@ionic/angular/dist/lazy/directives/validators/index.js"() {
    init_max_validator();
    init_min_validator();
  }
});

// node_modules/@ionic/angular/dist/lazy/providers/modal-controller.js
var ModalController;
var init_modal_controller = __esm({
  "node_modules/@ionic/angular/dist/lazy/providers/modal-controller.js"() {
    init_core();
    init_common2();
    init_dist();
    init_core();
    ModalController = class _ModalController extends OverlayBaseController {
      angularDelegate = inject(AngularDelegate);
      injector = inject(Injector);
      environmentInjector = inject(EnvironmentInjector);
      constructor() {
        super(modalController);
      }
      create(opts) {
        const _a = opts, { injector: customInjector } = _a, restOpts = __objRest(_a, ["injector"]);
        return super.create(__spreadProps(__spreadValues({}, restOpts), {
          delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "modal", customInjector)
        }));
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _ModalController, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _ModalController });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: ModalController, decorators: [{
      type: Injectable
    }], ctorParameters: () => [] });
  }
});

// node_modules/@ionic/angular/dist/lazy/providers/popover-controller.js
var PopoverController;
var init_popover_controller = __esm({
  "node_modules/@ionic/angular/dist/lazy/providers/popover-controller.js"() {
    init_core();
    init_common2();
    init_dist();
    PopoverController = class extends OverlayBaseController {
      angularDelegate = inject(AngularDelegate);
      injector = inject(Injector);
      environmentInjector = inject(EnvironmentInjector);
      constructor() {
        super(popoverController);
      }
      create(opts) {
        const _a = opts, { injector: customInjector } = _a, restOpts = __objRest(_a, ["injector"]);
        return super.create(__spreadProps(__spreadValues({}, restOpts), {
          delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "popover", customInjector)
        }));
      }
    };
  }
});

// node_modules/@ionic/angular/dist/lazy/ionic-module.js
var DECLARATIONS, IonicModule;
var init_ionic_module = __esm({
  "node_modules/@ionic/angular/dist/lazy/ionic-module.js"() {
    init_common();
    init_core();
    init_common2();
    init_app_initialize();
    init_control_value_accessors2();
    init_ion_back_button();
    init_ion_nav();
    init_ion_router_outlet();
    init_ion_tabs();
    init_router_link_delegate2();
    init_modal2();
    init_popover2();
    init_proxies_list();
    init_validators();
    init_modal_controller();
    init_popover_controller();
    init_core();
    init_proxies();
    DECLARATIONS = [
      // generated proxies
      ...DIRECTIVES,
      // manual proxies
      IonModal3,
      IonPopover3,
      // ngModel accessors
      BooleanValueAccessorDirective,
      NumericValueAccessorDirective,
      SelectValueAccessorDirective,
      TextValueAccessorDirective,
      // navigation
      IonTabs2,
      IonRouterOutlet2,
      IonBackButton3,
      IonNav3,
      RouterLinkDelegateDirective2,
      RouterLinkWithHrefDelegateDirective2,
      // validators
      IonMinValidator,
      IonMaxValidator
    ];
    IonicModule = class _IonicModule {
      /**
       * @deprecated `IonicModule.forRoot()` is deprecated and will be removed in a future major version.
       * Use `provideIonicAngular()` instead. Any config passed here can be passed as an object to that
       * function. Refer to https://ionicframework.com/docs/angular/build-options for migration steps.
       */
      static forRoot(config = {}) {
        console.warn(`[Ionic Warning]: IonicModule has been deprecated in favor of provideIonicAngular() and will be removed in a future major version. Refer to https://ionicframework.com/docs/angular/build-options for migration steps.`);
        return {
          ngModule: _IonicModule,
          providers: [
            {
              provide: ConfigToken,
              useValue: config
            },
            {
              provide: APP_INITIALIZER,
              useFactory: appInitialize,
              multi: true,
              deps: [ConfigToken, DOCUMENT, NgZone]
            },
            AngularDelegate,
            provideComponentInputBinding()
          ]
        };
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonicModule, deps: [], target: FactoryTarget.NgModule });
      /** @nocollapse */
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.0", ngImport: core_exports, type: _IonicModule, declarations: [
        IonAccordion,
        IonAccordionGroup,
        IonActionSheet,
        IonAlert,
        IonApp,
        IonAvatar,
        IonBackdrop,
        IonBadge,
        IonBreadcrumb,
        IonBreadcrumbs,
        IonButton,
        IonButtons,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCheckbox,
        IonChip,
        IonCol,
        IonContent,
        IonDatetime,
        IonDatetimeButton,
        IonFab,
        IonFabButton,
        IonFabList,
        IonFooter,
        IonGrid,
        IonHeader,
        IonIcon,
        IonImg,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonInput,
        IonInputOtp,
        IonInputPasswordToggle,
        IonItem,
        IonItemDivider,
        IonItemGroup,
        IonItemOption,
        IonItemOptions,
        IonItemSliding,
        IonLabel,
        IonList,
        IonListHeader,
        IonLoading,
        IonMenu,
        IonMenuButton,
        IonMenuToggle,
        IonNavLink,
        IonNote,
        IonPicker,
        IonPickerColumn,
        IonPickerColumnOption,
        IonProgressBar,
        IonRadio,
        IonRadioGroup,
        IonRange,
        IonRefresher,
        IonRefresherContent,
        IonReorder,
        IonReorderGroup,
        IonRippleEffect,
        IonRow,
        IonSearchbar,
        IonSegment,
        IonSegmentButton,
        IonSegmentContent,
        IonSegmentView,
        IonSelect,
        IonSelectModal,
        IonSelectOption,
        IonSkeletonText,
        IonSpinner,
        IonSplitPane,
        IonTab,
        IonTabBar,
        IonTabButton,
        IonText,
        IonTextarea,
        IonThumbnail,
        IonTitle,
        IonToast,
        IonToggle,
        IonToolbar,
        // manual proxies
        IonModal3,
        IonPopover3,
        // ngModel accessors
        BooleanValueAccessorDirective,
        NumericValueAccessorDirective,
        SelectValueAccessorDirective,
        TextValueAccessorDirective,
        // navigation
        IonTabs2,
        IonRouterOutlet2,
        IonBackButton3,
        IonNav3,
        RouterLinkDelegateDirective2,
        RouterLinkWithHrefDelegateDirective2,
        // validators
        IonMinValidator,
        IonMaxValidator
      ], imports: [CommonModule], exports: [
        IonAccordion,
        IonAccordionGroup,
        IonActionSheet,
        IonAlert,
        IonApp,
        IonAvatar,
        IonBackdrop,
        IonBadge,
        IonBreadcrumb,
        IonBreadcrumbs,
        IonButton,
        IonButtons,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCheckbox,
        IonChip,
        IonCol,
        IonContent,
        IonDatetime,
        IonDatetimeButton,
        IonFab,
        IonFabButton,
        IonFabList,
        IonFooter,
        IonGrid,
        IonHeader,
        IonIcon,
        IonImg,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonInput,
        IonInputOtp,
        IonInputPasswordToggle,
        IonItem,
        IonItemDivider,
        IonItemGroup,
        IonItemOption,
        IonItemOptions,
        IonItemSliding,
        IonLabel,
        IonList,
        IonListHeader,
        IonLoading,
        IonMenu,
        IonMenuButton,
        IonMenuToggle,
        IonNavLink,
        IonNote,
        IonPicker,
        IonPickerColumn,
        IonPickerColumnOption,
        IonProgressBar,
        IonRadio,
        IonRadioGroup,
        IonRange,
        IonRefresher,
        IonRefresherContent,
        IonReorder,
        IonReorderGroup,
        IonRippleEffect,
        IonRow,
        IonSearchbar,
        IonSegment,
        IonSegmentButton,
        IonSegmentContent,
        IonSegmentView,
        IonSelect,
        IonSelectModal,
        IonSelectOption,
        IonSkeletonText,
        IonSpinner,
        IonSplitPane,
        IonTab,
        IonTabBar,
        IonTabButton,
        IonText,
        IonTextarea,
        IonThumbnail,
        IonTitle,
        IonToast,
        IonToggle,
        IonToolbar,
        // manual proxies
        IonModal3,
        IonPopover3,
        // ngModel accessors
        BooleanValueAccessorDirective,
        NumericValueAccessorDirective,
        SelectValueAccessorDirective,
        TextValueAccessorDirective,
        // navigation
        IonTabs2,
        IonRouterOutlet2,
        IonBackButton3,
        IonNav3,
        RouterLinkDelegateDirective2,
        RouterLinkWithHrefDelegateDirective2,
        // validators
        IonMinValidator,
        IonMaxValidator
      ] });
      /** @nocollapse */
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _IonicModule, providers: [ModalController, PopoverController], imports: [CommonModule] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: IonicModule, decorators: [{
      type: NgModule,
      args: [{
        declarations: DECLARATIONS,
        exports: DECLARATIONS,
        providers: [ModalController, PopoverController],
        imports: [CommonModule]
      }]
    }] });
  }
});

// node_modules/@ionic/angular/dist/lazy/providers/alert-controller.js
var AlertController;
var init_alert_controller = __esm({
  "node_modules/@ionic/angular/dist/lazy/providers/alert-controller.js"() {
    init_core();
    init_common2();
    init_dist();
    init_core();
    AlertController = class _AlertController extends OverlayBaseController {
      constructor() {
        super(alertController);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _AlertController, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _AlertController, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: AlertController, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }], ctorParameters: () => [] });
  }
});

// node_modules/@ionic/angular/dist/lazy/providers/loading-controller.js
var LoadingController;
var init_loading_controller = __esm({
  "node_modules/@ionic/angular/dist/lazy/providers/loading-controller.js"() {
    init_core();
    init_common2();
    init_dist();
    init_core();
    LoadingController = class _LoadingController extends OverlayBaseController {
      constructor() {
        super(loadingController);
      }
      /** @nocollapse */
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _LoadingController, deps: [], target: FactoryTarget.Injectable });
      /** @nocollapse */
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: _LoadingController, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.0", ngImport: core_exports, type: LoadingController, decorators: [{
      type: Injectable,
      args: [{
        providedIn: "root"
      }]
    }], ctorParameters: () => [] });
  }
});

// node_modules/@ionic/angular/dist/lazy/index.js
var init_lazy = __esm({
  "node_modules/@ionic/angular/dist/lazy/index.js"() {
    init_ion_router_outlet();
    init_proxies();
    init_validators();
    init_alert_controller();
    init_loading_controller();
    init_modal_controller();
    init_popover_controller();
    init_ionic_module();
    init_dist();
  }
});

export {
  HttpHeaders,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode,
  REQUESTS_CONTRIBUTE_TO_STABILITY,
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
  HttpClientModule,
  init_module_chunk,
  init_http,
  By,
  DomSanitizer,
  init_platform_browser,
  ActivatedRoute,
  RouterOutlet,
  ROUTER_CONFIGURATION,
  ROUTES,
  afterNextNavigation,
  Router,
  init_router_chunk,
  RouterLink,
  NoPreloading,
  withPreloading,
  ROUTER_PROVIDERS,
  RouterModule,
  init_router_module_chunk,
  init_router,
  IonContent,
  IonInput,
  IonSelect,
  IonToggle,
  IonRouterOutlet2 as IonRouterOutlet,
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
  IonicModule,
  init_lazy
};
//# debugId=c77822f6-fff9-5743-8bce-6996b027e3c6
//# sourceMappingURL=chunk-BLEMCJOU.js.map
