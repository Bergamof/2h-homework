import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {TicketUpdateComponent} from "./ticket-update/ticket-update.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: TicketListComponent},
            {path: 'tickets/new', component: TicketUpdateComponent,},
            {path: 'tickets/:id', component: TicketDetailComponent}
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}