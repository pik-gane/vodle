import {
  NewsService,
  init_news_service
} from "./chunk-4BFNV2UU.js";
import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/news.service.spec.ts
init_testing();
init_news_service();
describe("NewsService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# debugId=20d88c63-37b3-5846-9e9f-93beffe1c305
//# sourceMappingURL=spec-app-news.service.spec.js.map
