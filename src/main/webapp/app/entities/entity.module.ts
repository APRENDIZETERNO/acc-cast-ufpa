import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.TurmasAccUsuarioModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./curso/curso.module').then(m => m.TurmasAccCursoModule)
      },
      {
        path: 'turma-acc',
        loadChildren: () => import('./turma-acc/turma-acc.module').then(m => m.TurmasAccTurmaACCModule)
      },
      {
        path: 'tipo-certificado',
        loadChildren: () => import('./tipo-certificado/tipo-certificado.module').then(m => m.TurmasAccTipoCertificadoModule)
      },
      {
        path: 'certificado',
        loadChildren: () => import('./certificado/certificado.module').then(m => m.TurmasAccCertificadoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class TurmasAccEntityModule {}
