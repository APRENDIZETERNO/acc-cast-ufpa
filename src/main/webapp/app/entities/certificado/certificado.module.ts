import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TurmasAccSharedModule } from 'app/shared/shared.module';
import { CertificadoComponent } from './certificado.component';
import { CertificadoDetailComponent } from './certificado-detail.component';
import { CertificadoUpdateComponent } from './certificado-update.component';
import { CertificadoDeletePopupComponent, CertificadoDeleteDialogComponent } from './certificado-delete-dialog.component';
import { certificadoRoute, certificadoPopupRoute } from './certificado.route';

const ENTITY_STATES = [...certificadoRoute, ...certificadoPopupRoute];

@NgModule({
  imports: [TurmasAccSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CertificadoComponent,
    CertificadoDetailComponent,
    CertificadoUpdateComponent,
    CertificadoDeleteDialogComponent,
    CertificadoDeletePopupComponent
  ],
  entryComponents: [CertificadoComponent, CertificadoUpdateComponent, CertificadoDeleteDialogComponent, CertificadoDeletePopupComponent]
})
export class TurmasAccCertificadoModule {}
