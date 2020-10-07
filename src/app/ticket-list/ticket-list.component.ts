import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
    private destructionNotifier$: Subject<void> = new Subject<void>();

    public usersGroupedById: Map<number, User> = new Map();
    public ticketList: Ticket[] = [];

    public loading = true;
    public saving = false;

    constructor(protected backendService: BackendService) {
    }

    public ngOnInit(): void {
        this.backendService.tickets().pipe(takeUntil(this.destructionNotifier$)).subscribe(tickets => {
            console.debug("Tickets :", tickets);
            this.loading = true;
            this.ticketList = tickets;
            this.backendService.users().pipe(takeUntil(this.destructionNotifier$)).subscribe(users => {
                let usersGroupedById: Map<number, User> = new Map<number, User>();

                users.forEach(user => usersGroupedById.set(user.id, user));

                this.usersGroupedById = usersGroupedById;
                this.loading = false;
            })
        });

    }

    public ngOnDestroy(): void {
        this.destructionNotifier$.next();
        this.destructionNotifier$.complete();
    }

    public getUserNameForTicket(ticket: Ticket): string {
        return this.usersGroupedById.get(ticket.assigneeId)?.name;
    }

    public changeTicketStatus(ticketToUpdate: Ticket): void {
        this.saving = true;
        this.backendService.complete(ticketToUpdate.id, !ticketToUpdate.completed).pipe(takeUntil(this.destructionNotifier$)).subscribe(updatedTicket => {
            ticketToUpdate.completed = updatedTicket.completed
            this.saving = false;
        })
    }
}
