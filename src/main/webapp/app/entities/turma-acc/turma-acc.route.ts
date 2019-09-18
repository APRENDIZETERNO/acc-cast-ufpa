import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TurmaACC } from 'app/shared/model/turma-acc.model';
import { TurmaACCService } from './turma-acc.service';
import { TurmaACCComponent } from './turma-acc.component';
import { TurmaACCDetailComponent } from './turma-acc-detail.component';
import { TurmaACCUpdateComponent } from './turma-acc-update.component';
import { TurmaACCDeletePopupComponent } from './turma-acc-delete-dialog.component';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';

@Injectable({ providedIn: 'root' })
export class TurmaACCResolve implements Resolve<ITurmaACC> {
  constructor(private service: TurmaACCService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITurmaACC> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TurmaACC>) => response.ok),
        map((turmaACC: HttpResponse<TurmaACC>) => turmaACC.body)
      );
    }
    return of(new TurmaACC());
  }
}

export const turmaACCRoute: Routes = [
  {
    path: '',
    component: TurmaACCComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TurmaACCS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TurmaACCDetailComponent,
    resolve: {
      turmaACC: TurmaACCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TurmaACCS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TurmaACCUpdateComponent,
    resolve: {
      turmaACC: TurmaACCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TurmaACCS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TurmaACCUpdateComponent,
    resolve: {
      turmaACC: TurmaACCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TurmaACCS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const turmaACCPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TurmaACCDeletePopupComponent,
    resolve: {
      turmaACC: TurmaACCResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TurmaACCS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
