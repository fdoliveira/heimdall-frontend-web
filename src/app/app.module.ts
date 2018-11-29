import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {GMapModule} from 'primeng/gmap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GMapModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
