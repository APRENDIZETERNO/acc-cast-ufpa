import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { TurmaACCService } from './turma-acc.service';

@Component({
  selector: 'jhi-turma-acc-delete-dialog',
  templateUrl: './turma-acc-delete-dialog.component.html'
})
export class TurmaACCDeleteDialogComponent {
  turmaACC: ITurmaACC;

  constructor(protected turmaACCService: TurmaACCService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.turmaACCService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'turmaACCListModification',
        content: 'Deleted an turmaACC'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-turma-acc-delete-popup',
  template: ''
})
export class TurmaACCDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turmaACC }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TurmaACCDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.turmaACC = turmaACC;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/turma-acc', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/turma-acc', { outlets: { popup: null } }]);
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
