import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoCertificado } from 'app/shared/model/tipo-certificado.model';
import { TipoCertificadoService } from './tipo-certificado.service';
import { TipoCertificadoComponent } from './tipo-certificado.component';
import { TipoCertificadoDetailComponent } from './tipo-certificado-detail.component';
import { TipoCertificadoUpdateComponent } from './tipo-certificado-update.component';
import { TipoCertificadoDeletePopupComponent } from './tipo-certificado-delete-dialog.component';
import { ITipoCertificado } from 'app/shared/model/tipo-certificado.model';

@Injectable({ providedIn: 'root' })
export class TipoCertificadoResolve implements Resolve<ITipoCertificado> {
  constructor(private service: TipoCertificadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoCertificado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoCertificado>) => response.ok),
        map((tipoCertificado: HttpResponse<TipoCertificado>) => tipoCertificado.body)
      );
    }
    return of(new TipoCertificado());
  }
}

export const tipoCertificadoRoute: Routes = [
  {
    path: '',
    component: TipoCertificadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoCertificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoCertificadoDetailComponent,
    resolve: {
      tipoCertificado: TipoCertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoCertificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoCertificadoUpdateComponent,
    resolve: {
      tipoCertificado: TipoCertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoCertificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoCertificadoUpdateComponent,
    resolve: {
      tipoCertificado: TipoCertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoCertificados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoCertificadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoCertificadoDeletePopupComponent,
    resolve: {
      tipoCertificado: TipoCertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoCertificados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
