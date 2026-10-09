import {
  init_testing as init_testing2,
  provideLocationMocks
} from "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import {
  HttpBackend,
  HttpClientModule,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
  HttpStatusCode,
  NoPreloading,
  REQUESTS_CONTRIBUTE_TO_STABILITY,
  ROUTER_CONFIGURATION,
  ROUTER_PROVIDERS,
  ROUTES,
  Router,
  RouterModule,
  RouterOutlet,
  afterNextNavigation,
  init_module_chunk,
  init_router_chunk,
  init_router_module_chunk,
  withPreloading
} from "./chunk-BLEMCJOU.js";
import {
  ChangeDetectionStrategy,
  Component,
  FactoryTarget,
  Injectable,
  NgModule,
  Service,
  ViewChild,
  core_exports,
  init_core,
  signal,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule,
  ɵɵngDeclareService
} from "./chunk-SGQRHDJN.js";
import {
  Observable,
  init_esm
} from "./chunk-CGNCHVYB.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@angular/router/fesm2022/testing.mjs
var RouterTestingModule, RootFixtureService, RootCmp, RouterTestingHarness;
var init_testing3 = __esm({
  "node_modules/@angular/router/fesm2022/testing.mjs"() {
    init_core();
    init_core();
    init_testing();
    init_router_chunk();
    init_testing2();
    init_router_module_chunk();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    RouterTestingModule = class _RouterTestingModule {
      static withRoutes(routes, config) {
        return {
          ngModule: _RouterTestingModule,
          providers: [{
            provide: ROUTES,
            multi: true,
            useValue: routes
          }, {
            provide: ROUTER_CONFIGURATION,
            useValue: config ? config : {}
          }]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterTestingModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterTestingModule,
        exports: [RouterModule]
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RouterTestingModule,
        providers: [ROUTER_PROVIDERS, provideLocationMocks(), withPreloading(NoPreloading).\u0275providers, {
          provide: ROUTES,
          multi: true,
          useValue: []
        }],
        imports: [RouterModule]
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RouterTestingModule,
      decorators: [{
        type: NgModule,
        args: [{
          exports: [RouterModule],
          providers: [ROUTER_PROVIDERS, provideLocationMocks(), withPreloading(NoPreloading).\u0275providers, {
            provide: ROUTES,
            multi: true,
            useValue: []
          }]
        }]
      }]
    });
    RootFixtureService = class _RootFixtureService {
      fixture;
      harness;
      createHarness() {
        if (this.harness) {
          throw new Error("Only one harness should be created per test.");
        }
        this.harness = new RouterTestingHarness(this.getRootFixture());
        return this.harness;
      }
      getRootFixture() {
        if (this.fixture !== void 0) {
          return this.fixture;
        }
        this.fixture = TestBed.createComponent(RootCmp);
        this.fixture.detectChanges();
        return this.fixture;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RootFixtureService,
        deps: [],
        target: FactoryTarget.Service
      });
      static \u0275prov = \u0275\u0275ngDeclareService({
        minVersion: "22.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RootFixtureService
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: RootFixtureService,
      decorators: [{
        type: Service
      }]
    });
    RootCmp = class _RootCmp {
      outlet;
      routerOutletData = signal(void 0, ...ngDevMode ? [{
        debugName: "routerOutletData"
      }] : []);
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _RootCmp,
        deps: [],
        target: FactoryTarget.Component
      });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({
        minVersion: "14.0.0",
        version: "22.2.2",
        type: _RootCmp,
        isStandalone: true,
        selector: "ng-component",
        viewQueries: [{
          propertyName: "outlet",
          first: true,
          predicate: RouterOutlet,
          descendants: true
        }],
        ngImport: core_exports,
        template: '<router-outlet [routerOutletData]="routerOutletData()"></router-outlet>',
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
      type: RootCmp,
      decorators: [{
        type: Component,
        args: [{
          template: '<router-outlet [routerOutletData]="routerOutletData()"></router-outlet>',
          imports: [RouterOutlet],
          changeDetection: ChangeDetectionStrategy.Eager
        }]
      }],
      propDecorators: {
        outlet: [{
          type: ViewChild,
          args: [RouterOutlet]
        }]
      }
    });
    RouterTestingHarness = class {
      static create(initialUrl) {
        return __async(this, null, function* () {
          const harness = TestBed.inject(RootFixtureService).createHarness();
          if (initialUrl !== void 0) {
            yield harness.navigateByUrl(initialUrl);
          }
          return harness;
        });
      }
      fixture;
      constructor(fixture) {
        this.fixture = fixture;
      }
      detectChanges() {
        this.fixture.detectChanges();
      }
      get routeDebugElement() {
        const outlet = this.fixture.componentInstance.outlet;
        if (!outlet || !outlet.isActivated) {
          return null;
        }
        return this.fixture.debugElement.query((v) => v.componentInstance === outlet.component);
      }
      get routeNativeElement() {
        return this.routeDebugElement?.nativeElement ?? null;
      }
      navigateByUrl(url, requiredRoutedComponentType) {
        return __async(this, null, function* () {
          const router = TestBed.inject(Router);
          let resolveFn;
          const redirectTrackingPromise = new Promise((resolve) => {
            resolveFn = resolve;
          });
          afterNextNavigation(TestBed.inject(Router), resolveFn);
          yield router.navigateByUrl(url);
          yield redirectTrackingPromise;
          this.fixture.detectChanges();
          const outlet = this.fixture.componentInstance.outlet;
          if (outlet && outlet.isActivated && outlet.activatedRoute.component) {
            const activatedComponent = outlet.component;
            if (requiredRoutedComponentType !== void 0 && !(activatedComponent instanceof requiredRoutedComponentType)) {
              throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but got ${activatedComponent.constructor.name}`);
            }
            return activatedComponent;
          } else {
            if (requiredRoutedComponentType !== void 0) {
              throw new Error(`Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but the navigation did not activate any component.`);
            }
            return null;
          }
        });
      }
    };
  }
});

// node_modules/@angular/common/fesm2022/http-testing.mjs
function _toArrayBufferBody(body) {
  if (typeof ArrayBuffer === "undefined") {
    throw new Error("ArrayBuffer responses are not supported on this platform.");
  }
  if (body instanceof ArrayBuffer) {
    return body;
  }
  throw new Error("Automatic conversion to ArrayBuffer is not supported for response type.");
}
function _toBlob(body) {
  if (typeof Blob === "undefined") {
    throw new Error("Blob responses are not supported on this platform.");
  }
  if (body instanceof Blob) {
    return body;
  }
  if (ArrayBuffer && body instanceof ArrayBuffer) {
    return new Blob([body]);
  }
  throw new Error("Automatic conversion to Blob is not supported for response type.");
}
function _toJsonBody(body, format = "JSON") {
  if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) {
    throw new Error(`Automatic conversion to ${format} is not supported for ArrayBuffers.`);
  }
  if (typeof Blob !== "undefined" && body instanceof Blob) {
    throw new Error(`Automatic conversion to ${format} is not supported for Blobs.`);
  }
  if (typeof body === "string" || typeof body === "number" || typeof body === "object" || typeof body === "boolean" || Array.isArray(body)) {
    return body;
  }
  throw new Error(`Automatic conversion to ${format} is not supported for response type.`);
}
function _toTextBody(body) {
  if (typeof body === "string") {
    return body;
  }
  if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) {
    throw new Error("Automatic conversion to text is not supported for ArrayBuffers.");
  }
  if (typeof Blob !== "undefined" && body instanceof Blob) {
    throw new Error("Automatic conversion to text is not supported for Blobs.");
  }
  return JSON.stringify(_toJsonBody(body, "text"));
}
function _maybeConvertBody(responseType, body) {
  if (body === null) {
    return null;
  }
  switch (responseType) {
    case "arraybuffer":
      return _toArrayBufferBody(body);
    case "blob":
      return _toBlob(body);
    case "json":
      return _toJsonBody(body);
    case "text":
      return _toTextBody(body);
    default:
      throw new Error(`Unsupported responseType: ${responseType}`);
  }
}
function describeRequest(testRequest) {
  const url = testRequest.request.urlWithParams;
  const method = testRequest.request.method;
  return `${method} ${url}`;
}
function provideHttpClientTesting() {
  return [HttpClientTestingBackend, {
    provide: HttpBackend,
    useExisting: HttpClientTestingBackend
  }, {
    provide: HttpTestingController,
    useExisting: HttpClientTestingBackend
  }, {
    provide: REQUESTS_CONTRIBUTE_TO_STABILITY,
    useValue: false
  }];
}
var HttpTestingController, TestRequest, HttpClientTestingBackend, HttpClientTestingModule;
var init_http_testing = __esm({
  "node_modules/@angular/common/fesm2022/http-testing.mjs"() {
    init_core();
    init_core();
    init_esm();
    init_module_chunk();
    /**
     * @license Angular v22.2.2
     * (c) 2010-2026 Google LLC. https://angular.dev/
     * License: MIT
     */
    HttpTestingController = class {
    };
    TestRequest = class {
      request;
      observer;
      get cancelled() {
        return this._cancelled;
      }
      _cancelled = false;
      constructor(request, observer) {
        this.request = request;
        this.observer = observer;
      }
      flush(body, opts = {}) {
        if (this.cancelled) {
          throw new Error(`Cannot flush a cancelled request.`);
        }
        const url = this.request.urlWithParams;
        const headers = opts.headers instanceof HttpHeaders ? opts.headers : new HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        let statusText = opts.statusText;
        let status = opts.status !== void 0 ? opts.status : HttpStatusCode.Ok;
        if (opts.status === void 0) {
          if (body === null) {
            status = HttpStatusCode.NoContent;
            statusText ||= "No Content";
          } else {
            statusText ||= "OK";
          }
        }
        if (statusText === void 0) {
          throw new Error("statusText is required when setting a custom status.");
        }
        if (status >= 200 && status < 300) {
          this.observer.next(new HttpResponse({
            body,
            headers,
            status,
            statusText,
            url
          }));
          this.observer.complete();
        } else {
          this.observer.error(new HttpErrorResponse({
            error: body,
            headers,
            status,
            statusText,
            url
          }));
        }
      }
      error(error, opts = {}) {
        if (this.cancelled) {
          throw new Error(`Cannot return an error for a cancelled request.`);
        }
        const headers = opts.headers instanceof HttpHeaders ? opts.headers : new HttpHeaders(opts.headers);
        this.observer.error(new HttpErrorResponse({
          error,
          headers,
          status: opts.status || 0,
          statusText: opts.statusText || "",
          url: this.request.urlWithParams
        }));
      }
      event(event) {
        if (this.cancelled) {
          throw new Error(`Cannot send events to a cancelled request.`);
        }
        this.observer.next(event);
      }
    };
    HttpClientTestingBackend = class _HttpClientTestingBackend {
      open = [];
      isTestingBackend = true;
      handle(req) {
        return new Observable((observer) => {
          const testReq = new TestRequest(req, observer);
          this.open.push(testReq);
          observer.next({
            type: HttpEventType.Sent
          });
          return () => {
            testReq._cancelled = true;
          };
        });
      }
      _match(match) {
        if (typeof match === "string") {
          return this.open.filter((testReq) => testReq.request.urlWithParams === match);
        } else if (typeof match === "function") {
          return this.open.filter((testReq) => match(testReq.request));
        } else {
          return this.open.filter((testReq) => (!match.method || testReq.request.method === match.method.toUpperCase()) && (!match.url || testReq.request.urlWithParams === match.url));
        }
      }
      match(match) {
        const results = this._match(match);
        results.forEach((result) => {
          const index = this.open.indexOf(result);
          if (index !== -1) {
            this.open.splice(index, 1);
          }
        });
        return results;
      }
      expectOne(match, description) {
        description ||= this.descriptionFromMatcher(match);
        const matches = this.match(match);
        if (matches.length > 1) {
          throw new Error(`Expected one matching request for criteria "${description}", found ${matches.length} requests.`);
        }
        if (matches.length === 0) {
          let message = `Expected one matching request for criteria "${description}", found none.`;
          if (this.open.length > 0) {
            const requests = this.open.map(describeRequest).join(", ");
            message += ` Requests received are: ${requests}.`;
          }
          throw new Error(message);
        }
        return matches[0];
      }
      expectNone(match, description) {
        description ||= this.descriptionFromMatcher(match);
        const matches = this.match(match);
        if (matches.length > 0) {
          throw new Error(`Expected zero matching requests for criteria "${description}", found ${matches.length}.`);
        }
      }
      verify(opts = {}) {
        let open = this.open;
        if (opts.ignoreCancelled) {
          open = open.filter((testReq) => !testReq.cancelled);
        }
        if (open.length > 0) {
          const requests = open.map(describeRequest).join(", ");
          throw new Error(`Expected no open requests, found ${open.length}: ${requests}`);
        }
      }
      descriptionFromMatcher(matcher) {
        if (typeof matcher === "string") {
          return `Match URL: ${matcher}`;
        } else if (typeof matcher === "object") {
          const method = matcher.method || "(any)";
          const url = matcher.url || "(any)";
          return `Match method: ${method}, URL: ${url}`;
        } else {
          return `Match by function: ${matcher.name}`;
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientTestingBackend,
        deps: [],
        target: FactoryTarget.Injectable
      });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientTestingBackend
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClientTestingBackend,
      decorators: [{
        type: Injectable
      }]
    });
    HttpClientTestingModule = class _HttpClientTestingModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientTestingModule,
        deps: [],
        target: FactoryTarget.NgModule
      });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({
        minVersion: "14.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientTestingModule,
        imports: [HttpClientModule]
      });
      static \u0275inj = \u0275\u0275ngDeclareInjector({
        minVersion: "12.0.0",
        version: "22.2.2",
        ngImport: core_exports,
        type: _HttpClientTestingModule,
        providers: [provideHttpClientTesting()],
        imports: [HttpClientModule]
      });
    };
    \u0275\u0275ngDeclareClassMetadata({
      minVersion: "12.0.0",
      version: "22.2.2",
      ngImport: core_exports,
      type: HttpClientTestingModule,
      decorators: [{
        type: NgModule,
        args: [{
          imports: [HttpClientModule],
          providers: [provideHttpClientTesting()]
        }]
      }]
    });
  }
});

export {
  RouterTestingModule,
  init_testing3 as init_testing,
  provideHttpClientTesting,
  init_http_testing
};
//# debugId=52c2d544-1abb-51d1-a34a-b3863b3140f3
//# sourceMappingURL=chunk-IGR47T2Z.js.map
