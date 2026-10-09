import {
  LocalNotifications,
  init_esm
} from "./chunk-CHXUQIDJ.js";
import {
  Injectable,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/news.service.ts
var NewsService;
var init_news_service = __esm({
  "src/app/news.service.ts"() {
    init_tslib_es6();
    init_core();
    init_esm();
    init_environment();
    NewsService = class NewsService2 {
      constructor() {
      }
      init(G) {
        G.L.entry("NewsService.init");
        this.G = G;
      }
      generate_nid() {
        return this.G.D.generate_id(environment.data_service.nid_length);
      }
      add(data) {
        try {
          const news = data;
          const key = "news." + this.generate_nid();
          news.key = key;
          this.G.D.news_keys.add(key);
          this.G.D.setu(key, JSON.stringify(news));
          this.G.L.trace("NewsService.add", key, news);
          if (this.G.S.get_notify_of(news.class)) {
            LocalNotifications.schedule({
              notifications: [{
                title: news.title,
                body: news.body,
                id: null
              }]
            }).then((res) => {
              this.G.L.trace("NewsService.add localNotifications.schedule succeeded:", res);
            }).catch((err) => {
              this.G.L.warn("NewsService.add localNotifications.schedule failed:", err);
            });
          }
        } catch (e) {
          this.G.L.warn("NewsService.add bad data:", data);
        }
      }
      dismiss(key) {
        if (this.G.D.news_keys.has(key)) {
          this.G.L.entry("NewsService.dismiss", key);
          this.G.D.news_keys.delete(key);
        } else {
          this.G.L.warn("NewsService.dismiss unknown key", key);
        }
        this.G.D.delu(key);
        this.G.D.save_state();
      }
      filter(filter) {
        this.G.L.entry("NewsService.filter", filter);
        let res = /* @__PURE__ */ new Set();
        for (let key of this.G.D.news_keys) {
          try {
            const news = JSON.parse(this.G.D.getu(key));
            let good = true;
            for (let [entrykey, value] of Object.entries(filter)) {
              if (news[entrykey] != value) {
                good = false;
                break;
              }
            }
            if (good) {
              res.add(news);
            }
          } catch (e) {
          }
        }
        return res;
      }
      static {
        this.ctorParameters = () => [];
      }
    };
    NewsService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], NewsService);
  }
});

export {
  NewsService,
  init_news_service
};
//# debugId=c5edfd9d-1a37-53d7-a98d-dc2572346a2e
//# sourceMappingURL=chunk-4BFNV2UU.js.map
