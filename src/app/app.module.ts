import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './layout/card/card.component';
import { ObservableComponent } from './layout/observable/observable.component';
import { SimpleComponent } from './layout/simple/simple.component';
import { NotificationModule } from './modules/notification/notification.module';
import { DeckOfCardsService } from './services/deck-of-cards.service';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    SimpleComponent,
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
  ],
  providers: [
    DeckOfCardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
