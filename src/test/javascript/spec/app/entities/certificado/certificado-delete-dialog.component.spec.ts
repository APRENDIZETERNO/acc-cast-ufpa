import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TurmasAccTestModule } from '../../../test.module';
import { CertificadoDeleteDialogComponent } from 'app/entities/certificado/certificado-delete-dialog.component';
import { CertificadoService } from 'app/entities/certificado/certificado.service';

describe('Component Tests', () => {
  describe('Certificado Management Delete Component', () => {
    let comp: CertificadoDeleteDialogComponent;
    let fixture: ComponentFixture<CertificadoDeleteDialogComponent>;
    let service: CertificadoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [CertificadoDeleteDialogComponent]
      })
        .overrideTemplate(CertificadoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertificadoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificadoService);
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
