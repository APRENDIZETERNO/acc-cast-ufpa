import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICertificado } from 'app/shared/model/certificado.model';
import { AccountService } from 'app/core/auth/account.service';
import { CertificadoService } from './certificado.service';

@Component({
  selector: 'jhi-certificado',
  templateUrl: './certificado.component.html'
})
export class CertificadoComponent implements OnInit, OnDestroy {
  certificados: ICertificado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected certificadoService: CertificadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.certificadoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICertificado[]>) => res.ok),
        map((res: HttpResponse<ICertificado[]>) => res.body)
      )
      .subscribe(
        (res: ICertificado[]) => {
          this.certificados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCertificados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICertificado) {
    return item.id;
  }

  registerChangeInCertificados() {
    this.eventSubscriber = this.eventManager.subscribe('certificadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
