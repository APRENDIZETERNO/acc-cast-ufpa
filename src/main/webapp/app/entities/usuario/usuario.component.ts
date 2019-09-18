import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsuario } from 'app/shared/model/usuario.model';
import { AccountService } from 'app/core/auth/account.service';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'jhi-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuarios: IUsuario[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected usuarioService: UsuarioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.usuarioService
      .query()
      .pipe(
        filter((res: HttpResponse<IUsuario[]>) => res.ok),
        map((res: HttpResponse<IUsuario[]>) => res.body)
      )
      .subscribe(
        (res: IUsuario[]) => {
          this.usuarios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUsuarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUsuario) {
    return item.id;
  }

  registerChangeInUsuarios() {
    this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
