import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TurmasAccSharedModule } from 'app/shared/shared.module';
import { TurmaACCComponent } from './turma-acc.component';
import { TurmaACCDetailComponent } from './turma-acc-detail.component';
import { TurmaACCUpdateComponent } from './turma-acc-update.component';
import { TurmaACCDeletePopupComponent, TurmaACCDeleteDialogComponent } from './turma-acc-delete-dialog.component';
import { turmaACCRoute, turmaACCPopupRoute } from './turma-acc.route';

const ENTITY_STATES = [...turmaACCRoute, ...turmaACCPopupRoute];

@NgModule({
  imports: [TurmasAccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TurmaACCComponent,
    TurmaACCDetailComponent,
    TurmaACCUpdateComponent,
    TurmaACCDeleteDialogComponent,
    TurmaACCDeletePopupComponent
  ],
  entryComponents: [TurmaACCComponent, TurmaACCUpdateComponent, TurmaACCDeleteDialogComponent, TurmaACCDeletePopupComponent]
})
export class TurmasAccTurmaACCModule {}
