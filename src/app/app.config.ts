import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptor/header.interceptor';
import { errorInterceptor } from './shared/interceptor/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './shared/interceptor/loader.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


function httpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
  
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loaderInterceptor])),provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:"top"}),withViewTransitions()), provideClientHydration(),importProvidersFrom(RouterModule,HttpClientModule,BrowserAnimationsModule ,NgxSpinnerModule,



    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:httpLoaderFactory,
        deps:[HttpClient]
      }
    })








   ),provideToastr()]
};
