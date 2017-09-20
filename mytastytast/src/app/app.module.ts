import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdIconModule, MdInputModule, MdSelectModule, MdSliderModule,
  MdToolbarModule, MdCardModule, MdSlideToggleModule,
  MdSnackBarModule
} from "@angular/material";
import { ServiceWorkerModule } from "@angular/service-worker";

import 'hammerjs';

import { AppComponent } from './app.component';
import { GeolocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';
import { ListComponent } from './component/list/list.component';
import { TastiesComponent } from './component/tasties/tasties.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'tasty', component: TastiesComponent },
  { path: 'tasty/:id', component: TastiesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TastiesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    ServiceWorkerModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule, MdIconModule, MdInputModule, MdSelectModule, MdSliderModule,
    MdToolbarModule, MdCardModule, MdSlideToggleModule, MdSnackBarModule
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
