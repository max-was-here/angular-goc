import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './layout/card/card.component';
import { ObservableComponent } from './layout/observable/observable.component';
import { ReactiveComponent } from './layout/reactive/reactive.component';
import { SimpleComponent } from './layout/simple/simple.component';
import { NotificationModule } from './modules/notification/notification.module';
import { DeckOfCardsService } from './services/deck-of-cards.service';
import { DeckEffects } from './store/effects/deck.effect';
import { deckReducer } from './store/reducers/deck.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    SimpleComponent,
    ReactiveComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // Custom modules
    NotificationModule,

    // Material modules
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,

    // NgRx
    StoreModule.forRoot(
      {
        deck: deckReducer,
      }
    ),
    EffectsModule.forRoot([DeckEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    DeckOfCardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
