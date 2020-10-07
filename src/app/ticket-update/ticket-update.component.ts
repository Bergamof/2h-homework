import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {Subject} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-ticket-update',
    templateUrl: './ticket-update.component.html',
    styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit, OnDestroy {
    public ticketForm: FormGroup = this.formBuilder.group({
        assignee: null,
        description: ''
    });
    public loading = true;
    public saving = false;
    public userList: User[] = [];

    private destructionNotifier$: Subject<void> = new Subject<void>();

    constructor(
        private backendService: BackendService,
        private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.backendService.users().pipe(takeUntil(this.destructionNotifier$)).subscribe(users => {
            this.userList = users;
            this.loading = false;
        });
    }

    ngOnDestroy(): void {
        this.destructionNotifier$.next();
        this.destructionNotifier$.complete();
    }

    public save() {
        this.saving = true;
        this.backendService.newTicket({description: this.ticketForm.controls.description.value}).pipe(takeUntil(this.destructionNotifier$)).subscribe(ticket => {
            const assigneeId = this.ticketForm.controls.assignee.value;

            if (assigneeId) {
                this.backendService.assign(ticket.id, assigneeId).pipe(takeUntil(this.destructionNotifier$)).subscribe(() => this.router.navigateByUrl(""));
            } else {
                this.router.navigateByUrl("");
            }

        });
    }
}
