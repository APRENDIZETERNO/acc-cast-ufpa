import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Certificado } from 'app/shared/model/certificado.model';
import { CertificadoService } from './certificado.service';
import { CertificadoComponent } from './certificado.component';
import { CertificadoDetailComponent } from './certificado-detail.component';
import { CertificadoUpdateComponent } from './certificado-update.component';
import { CertificadoDeletePopupComponent } from './certificado-delete-dialog.component';
import { ICertificado } from 'app/shared/model/certificado.model';

@Injectable({ providedIn: 'root' })
export class CertificadoResolve implements Resolve<ICertificado> {
  constructor(private service: CertificadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICertificado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Certificado>) => response.ok),
        map((certificado: HttpResponse<Certificado>) => certificado.body)
      );
    }
    return of(new Certificado());
  }
}

export const certificadoRoute: Routes = [
  {
    path: '',
    component: CertificadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Certificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CertificadoDetailComponent,
    resolve: {
      certificado: CertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Certificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CertificadoUpdateComponent,
    resolve: {
      certificado: CertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Certificados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CertificadoUpdateComponent,
    resolve: {
      certificado: CertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Certificados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const certificadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CertificadoDeletePopupComponent,
    resolve: {
      certificado: CertificadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Certificados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
