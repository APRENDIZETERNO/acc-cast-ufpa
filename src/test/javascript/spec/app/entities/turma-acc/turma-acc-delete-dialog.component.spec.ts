import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TurmasAccTestModule } from '../../../test.module';
import { TurmaACCDeleteDialogComponent } from 'app/entities/turma-acc/turma-acc-delete-dialog.component';
import { TurmaACCService } from 'app/entities/turma-acc/turma-acc.service';

describe('Component Tests', () => {
  describe('TurmaACC Management Delete Component', () => {
    let comp: TurmaACCDeleteDialogComponent;
    let fixture: ComponentFixture<TurmaACCDeleteDialogComponent>;
    let service: TurmaACCService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TurmaACCDeleteDialogComponent]
      })
        .overrideTemplate(TurmaACCDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurmaACCDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurmaACCService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
