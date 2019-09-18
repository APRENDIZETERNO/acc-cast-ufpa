import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TurmasAccSharedModule } from 'app/shared/shared.module';
import { TipoCertificadoComponent } from './tipo-certificado.component';
import { TipoCertificadoDetailComponent } from './tipo-certificado-detail.component';
import { TipoCertificadoUpdateComponent } from './tipo-certificado-update.component';
import { TipoCertificadoDeletePopupComponent, TipoCertificadoDeleteDialogComponent } from './tipo-certificado-delete-dialog.component';
import { tipoCertificadoRoute, tipoCertificadoPopupRoute } from './tipo-certificado.route';

const ENTITY_STATES = [...tipoCertificadoRoute, ...tipoCertificadoPopupRoute];

@NgModule({
  imports: [TurmasAccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoCertificadoComponent,
    TipoCertificadoDetailComponent,
    TipoCertificadoUpdateComponent,
    TipoCertificadoDeleteDialogComponent,
    TipoCertificadoDeletePopupComponent
  ],
  entryComponents: [
    TipoCertificadoComponent,
    TipoCertificadoUpdateComponent,
    TipoCertificadoDeleteDialogComponent,
    TipoCertificadoDeletePopupComponent
  ]
})
export class TurmasAccTipoCertificadoModule {}
