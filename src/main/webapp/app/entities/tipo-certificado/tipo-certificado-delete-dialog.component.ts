import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoCertificado } from 'app/shared/model/tipo-certificado.model';
import { TipoCertificadoService } from './tipo-certificado.service';

@Component({
  selector: 'jhi-tipo-certificado-delete-dialog',
  templateUrl: './tipo-certificado-delete-dialog.component.html'
})
export class TipoCertificadoDeleteDialogComponent {
  tipoCertificado: ITipoCertificado;

  constructor(
    protected tipoCertificadoService: TipoCertificadoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoCertificadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoCertificadoListModification',
        content: 'Deleted an tipoCertificado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-certificado-delete-popup',
  template: ''
})
export class TipoCertificadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoCertificado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoCertificadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoCertificado = tipoCertificado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-certificado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-certificado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
