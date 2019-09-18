import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertificado } from 'app/shared/model/certificado.model';
import { CertificadoService } from './certificado.service';

@Component({
  selector: 'jhi-certificado-delete-dialog',
  templateUrl: './certificado-delete-dialog.component.html'
})
export class CertificadoDeleteDialogComponent {
  certificado: ICertificado;

  constructor(
    protected certificadoService: CertificadoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.certificadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'certificadoListModification',
        content: 'Deleted an certificado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-certificado-delete-popup',
  template: ''
})
export class CertificadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ certificado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CertificadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.certificado = certificado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/certificado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/certificado', { outlets: { popup: null } }]);
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
