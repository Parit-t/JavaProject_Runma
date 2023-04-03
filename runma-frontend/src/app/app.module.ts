import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';

import {MatIconModule} from '@angular/material/icon';
import { SalesreportComponent } from './pages/salesreport/salesreport.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchbarComponent } from './pages/searchbar/searchbar.component';
import { SearchresultComponent } from './pages/searchresult/searchresult.component';
import { PsuiresultComponent } from './pages/psuiresult/psuiresult.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { BuyTicketComponent } from './pages/buy-ticket/buy-ticket.component';
import { CreatePaymentComponent } from './pages/create-payment/create-payment.component';
import { CreateRacetypeComponent } from './pages/create-racetype/create-racetype.component';
import { GetTicketComponent } from './pages/create-payment/get-ticket/get-ticket.component';
import { PostPaymentComponent } from './pages/create-payment/post-payment/post-payment.component';
import { GetRacetypeComponent } from './pages/create-racetype/get-racetype/get-racetype.component';
import { RegisterOrganizerComponent } from './pages/register-organizer/register-organizer.component';
import { ViewUserTicketCardComponent } from './pages/view-user-ticket-card/view-user-ticket-card.component';
import { ViewTicketNotfoundComponent } from './pages/view-ticket-notfound/view-ticket-notfound.component';
import { ViewUserTicketComponent } from './pages/view-user-ticket/view-user-ticket.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { MatchPasswordDirective } from './pages/register-user/Directive/match-password.directive';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    CreateEventComponent,
    EventViewComponent,
    EventEditComponent,
    SalesreportComponent,
    NavbarComponent,
    EventDetailComponent,
    BuyTicketComponent,
    SearchbarComponent,
    SearchresultComponent,
    PsuiresultComponent,
    CreatePaymentComponent,
    CreateRacetypeComponent,
    GetTicketComponent,
    PostPaymentComponent,
    GetRacetypeComponent,
    RegisterOrganizerComponent,
    ViewUserTicketComponent,
    ViewUserTicketCardComponent,
    ViewTicketNotfoundComponent,
    RegisterUserComponent,
    MatchPasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CommonModule ,
    MatIconModule,
    FontAwesomeModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
