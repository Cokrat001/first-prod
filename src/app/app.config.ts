import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {withFetch} from "@angular/common/http";
import {provideStore, StoreModule} from "@ngrx/store";
import authReducer from "./auth/store/effects/reducer";
import {provideStoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {RegisterEffect} from "./auth/store/effects/register.effect";
import {AuthService} from "./auth/services/auth.service";
import {LoginEffect} from "./auth/store/effects/login.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      AuthService
    ),
    provideStore({auth: authReducer}),
    provideStoreDevtools(),
    provideEffects([RegisterEffect,LoginEffect])
  ]
};
