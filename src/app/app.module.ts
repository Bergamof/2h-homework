import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BackendService} from './backend.service';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {TicketDetailComponent} from './ticket-detail/ticket-detail.component';
import {TicketUpdateComponent} from './ticket-update/ticket-update.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent, TicketListComponent, TicketDetailComponent, TicketUpdateComponent],
    imports: [AppRoutingModule, BrowserModule, RouterModule, ReactiveFormsModule],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
