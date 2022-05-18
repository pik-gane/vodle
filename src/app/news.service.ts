/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK) authors, and contributors, see AUTHORS file.

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

import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { news_t } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private G: GlobalService;

  constructor() { }

  init(G:GlobalService) { 
    // called by GlobalService
    G.L.entry("NewsService.init");
    this.G = G; 
  }

  generate_nid(): string {
    return this.G.D.generate_id(environment.data_service.nid_length);
  }

  add(data: any) {
    /** add a news item */
    try {
      const news = data as news_t;
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
        })
        .then(res => {
          this.G.L.trace("NewsService.add localNotifications.schedule succeeded:", res);
        }).catch(err => {
          this.G.L.warn("NewsService.add localNotifications.schedule failed:", err);
        });
      }
    } catch {
      this.G.L.warn("NewsService.add bad data:", data);
    }
  }

  dismiss(key: string) {
    /** called when user dismisses news item or it was automatically dismissed */
    if (this.G.D.news_keys.has(key)) {
      this.G.L.entry("NewsService.dismiss", key);
      this.G.D.news_keys.delete(key);
    } else {
      this.G.L.warn("NewsService.dismiss unknown key", key);
    }
    this.G.D.delu(key);
    this.G.D.save_state();
  }

  filter(filter: any): Set<news_t> {
    /** return a set of news items that match all entries specified in filter,
     * such as class or pid
     */
    this.G.L.entry("NewsService.filter", filter);
    let res = new Set() as Set<news_t>;
    for (let key of this.G.D.news_keys) {
      try {
        const news = JSON.parse(this.G.D.getu(key)) as news_t;
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
      } catch {}
    }
    return res;
  }
}
