import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localeEsPE from '@angular/common/locales/es-PE';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { MovieService, SessionService, tokenInterceptor } from '@cuevana-commons';
import { routes } from './app.routes';
// import { TemplatePageTitleStrategy } from './core/services/title.service';

registerLocaleData(localeEsPE, 'es-PE');

export const appConfig: ApplicationConfig = {
  providers: [
    SessionService,
    MovieService,
    provideRouter(
      routes,
      // this is in place of scrollPositionRestoration: 'enabled',
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
      // in place of  preloadingStrategy: PreloadService,
      // withPreloading(PreloadService),
      withHashLocation()
    ),
    // {
    //   provide: TitleStrategy,
    //   useClass: TemplatePageTitleStrategy
    // },
    provideAnimations(), // required animations providers    
    // provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor
      ])
    ),
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ]
};
