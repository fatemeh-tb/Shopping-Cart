import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
