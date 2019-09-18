import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { CertificadoUpdateComponent } from 'app/entities/certificado/certificado-update.component';
import { CertificadoService } from 'app/entities/certificado/certificado.service';
import { Certificado } from 'app/shared/model/certificado.model';

describe('Component Tests', () => {
  describe('Certificado Management Update Component', () => {
    let comp: CertificadoUpdateComponent;
    let fixture: ComponentFixture<CertificadoUpdateComponent>;
    let service: CertificadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [CertificadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CertificadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Certificado(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Certificado();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
