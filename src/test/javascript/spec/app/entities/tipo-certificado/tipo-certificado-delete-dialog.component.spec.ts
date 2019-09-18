import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TurmasAccTestModule } from '../../../test.module';
import { TipoCertificadoDeleteDialogComponent } from 'app/entities/tipo-certificado/tipo-certificado-delete-dialog.component';
import { TipoCertificadoService } from 'app/entities/tipo-certificado/tipo-certificado.service';

describe('Component Tests', () => {
  describe('TipoCertificado Management Delete Component', () => {
    let comp: TipoCertificadoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoCertificadoDeleteDialogComponent>;
    let service: TipoCertificadoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TipoCertificadoDeleteDialogComponent]
      })
        .overrideTemplate(TipoCertificadoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoCertificadoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoCertificadoService);
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
