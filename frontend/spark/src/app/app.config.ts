import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideServiceWorker} from '@angular/service-worker';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {tokenInterceptor} from './interceptor/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideCharts(withDefaultRegisterables()),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }), provideCharts(withDefaultRegisterables())
  ]
};
