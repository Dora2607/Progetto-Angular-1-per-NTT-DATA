import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Routing
import { AppRoutingModule } from './app-routing.module';
import { HomeRoutingModule } from './features/home-routing.module';


//module
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //da rimuovere
import { HomeModule} from './features/home.module';
import { SharedModule } from './shared/shared.module';


//components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

//state(ngrx)
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { authReducer } from './state/auth/auth.reducer';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    HttpClientModule, 
    FontAwesomeModule,
    HomeModule,
    SharedModule,
    StoreModule.forRoot({auth:authReducer}),
    EffectsModule.forRoot([AuthEffects])

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
