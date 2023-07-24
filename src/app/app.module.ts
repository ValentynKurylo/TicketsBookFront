import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {EventService} from "./services/event.service";
import {EventComponent} from "./components/event/event.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { FullEventComponent } from './components/full-event/full-event.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddSectionComponent } from './components/add-section/add-section.component';



const routes: Routes = [
  {path: '', component: EventComponent},
  {path: 'events/:id', component: FullEventComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addEvent', component: AddEventComponent},
  {path: 'addSection/:id', component: AddSectionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    FullEventComponent,
    RegistrationComponent,
    LoginComponent,
    AddEventComponent,
    AddSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
