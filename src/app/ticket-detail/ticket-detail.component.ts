import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
    public ticket: Ticket = null;
    public user: User = null;


    private destuctionNotifier$: Subject<void> = new Subject<void>();

    constructor(private backendService: BackendService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(takeUntil(this.destuctionNotifier$)).subscribe(params => {
            this.backendService.ticket(params.id).pipe(takeUntil(this.destuctionNotifier$)).subscribe(ticket => {
                this.backendService.user(ticket.assigneeId).pipe(takeUntil(this.destuctionNotifier$)).subscribe(user => {
                    this.user = user;
                    this.ticket = ticket;
                })
            })

        })
    }

    ngOnDestroy(): void {
        this.destuctionNotifier$.next();
        this.destuctionNotifier$.complete()
    }


}
