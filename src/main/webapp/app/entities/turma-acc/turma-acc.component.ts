import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { AccountService } from 'app/core/auth/account.service';
import { TurmaACCService } from './turma-acc.service';

@Component({
  selector: 'jhi-turma-acc',
  templateUrl: './turma-acc.component.html'
})
export class TurmaACCComponent implements OnInit, OnDestroy {
  turmaACCS: ITurmaACC[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected turmaACCService: TurmaACCService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.turmaACCService
      .query()
      .pipe(
        filter((res: HttpResponse<ITurmaACC[]>) => res.ok),
        map((res: HttpResponse<ITurmaACC[]>) => res.body)
      )
      .subscribe(
        (res: ITurmaACC[]) => {
          this.turmaACCS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTurmaACCS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITurmaACC) {
    return item.id;
  }

  registerChangeInTurmaACCS() {
    this.eventSubscriber = this.eventManager.subscribe('turmaACCListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
