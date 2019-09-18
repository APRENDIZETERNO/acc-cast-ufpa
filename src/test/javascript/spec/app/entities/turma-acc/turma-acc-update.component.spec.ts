import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { TurmaACCUpdateComponent } from 'app/entities/turma-acc/turma-acc-update.component';
import { TurmaACCService } from 'app/entities/turma-acc/turma-acc.service';
import { TurmaACC } from 'app/shared/model/turma-acc.model';

describe('Component Tests', () => {
  describe('TurmaACC Management Update Component', () => {
    let comp: TurmaACCUpdateComponent;
    let fixture: ComponentFixture<TurmaACCUpdateComponent>;
    let service: TurmaACCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TurmaACCUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TurmaACCUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurmaACCUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurmaACCService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TurmaACC(123);
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
        const entity = new TurmaACC();
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
