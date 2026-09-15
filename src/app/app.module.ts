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

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { VodleTranslateLoader, DEFAULT_LANG } from './i18n-loader';

import { LoggingServiceModule, LoggingService, LoggingServiceConfiguration } from 'ionic-logging-service';
import { IonicStorageModule } from '@ionic/storage-angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GlobalService } from './global.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new VodleTranslateLoader(http, './assets/i18n/', '.json');
}
export function configureLogging(loggingService: LoggingService): () => void {
  return () => {
    console.log("VODLE configuring logger with "+JSON.stringify(environment.logging));
    loggingService.configure(environment.logging as LoggingServiceConfiguration);
  }
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        LoggingServiceModule,
        BrowserModule,
        IonicModule.forRoot({
            // vodle's alert and toast messages are HTML -- line breaks and
            // emphasis in the translations. Ionic turned that off by default,
            // which rendered the tags as literal text. Turning it back on is
            // safe here and safer than Ionic 6 was: with it on, Ionic runs the
            // message through its sanitizer (script/style/iframe/meta/link/
            // object/embed dropped, every attribute but class/id/href/src/name/
            // slot dropped, so no on* handlers), whereas Ionic 6 rendered it
            // raw. Values interpolated INTO a translation are escaped at the
            // call site -- see escape_html in global.service.ts -- because
            // href and src do survive sanitizing.
            innerHTMLTemplatesEnabled: true,
        }),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        TranslateModule.forRoot({
            defaultLanguage: DEFAULT_LANG,
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        GlobalService,
        {
            deps: [LoggingService],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: configureLogging
        },
        // HttpClientModule is deprecated as of Angular 18; this is its replacement
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
