import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { SalesreportComponent } from './pages/salesreport/salesreport.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { BuyTicketComponent } from './pages/buy-ticket/buy-ticket.component';
import { SearchbarComponent } from './pages/searchbar/searchbar.component';
import { CreatePaymentComponent } from './pages/create-payment/create-payment.component';
import { CreateRacetypeComponent } from './pages/create-racetype/create-racetype.component';
import { RegisterOrganizerComponent } from './pages/register-organizer/register-organizer.component';
import { ViewUserTicketComponent } from './pages/view-user-ticket/view-user-ticket.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventViewComponent } from './pages/event-view/event-view.component';

const routes: Routes = [
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'create-event/:id', component: CreateEventComponent },
  { path: 'salesreport/:id', component: SalesreportComponent },
  { path: 'event-view', component: EventViewComponent },
  { path: 'event-edit/:id', component: EventEditComponent },
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: 'event-detail/:id/buy-ticket', component: BuyTicketComponent },
  { path: 'payment/:id', component: CreatePaymentComponent },
  { path: 'racetype/:id', component: CreateRacetypeComponent },
  { path: "register-user", component: RegisterUserComponent },
  { path: "register-organizer", component: RegisterOrganizerComponent },
  { path: 'user/ticket/:id', component: ViewUserTicketComponent },
  { path: '', component: SearchbarComponent }
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
