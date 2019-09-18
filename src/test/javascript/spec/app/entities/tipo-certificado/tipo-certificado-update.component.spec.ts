import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { TipoCertificadoUpdateComponent } from 'app/entities/tipo-certificado/tipo-certificado-update.component';
import { TipoCertificadoService } from 'app/entities/tipo-certificado/tipo-certificado.service';
import { TipoCertificado } from 'app/shared/model/tipo-certificado.model';

describe('Component Tests', () => {
  describe('TipoCertificado Management Update Component', () => {
    let comp: TipoCertificadoUpdateComponent;
    let fixture: ComponentFixture<TipoCertificadoUpdateComponent>;
    let service: TipoCertificadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TipoCertificadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoCertificadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoCertificadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoCertificadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoCertificado(123);
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
        const entity = new TipoCertificado();
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
