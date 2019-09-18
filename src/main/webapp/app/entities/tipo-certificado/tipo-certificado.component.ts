import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoCertificado } from 'app/shared/model/tipo-certificado.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoCertificadoService } from './tipo-certificado.service';

@Component({
  selector: 'jhi-tipo-certificado',
  templateUrl: './tipo-certificado.component.html'
})
export class TipoCertificadoComponent implements OnInit, OnDestroy {
  tipoCertificados: ITipoCertificado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoCertificadoService: TipoCertificadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoCertificadoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoCertificado[]>) => res.ok),
        map((res: HttpResponse<ITipoCertificado[]>) => res.body)
      )
      .subscribe(
        (res: ITipoCertificado[]) => {
          this.tipoCertificados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoCertificados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoCertificado) {
    return item.id;
  }

  registerChangeInTipoCertificados() {
    this.eventSubscriber = this.eventManager.subscribe('tipoCertificadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
