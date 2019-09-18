import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TurmasAccTestModule } from '../../../test.module';
import { TurmaACCComponent } from 'app/entities/turma-acc/turma-acc.component';
import { TurmaACCService } from 'app/entities/turma-acc/turma-acc.service';
import { TurmaACC } from 'app/shared/model/turma-acc.model';

describe('Component Tests', () => {
  describe('TurmaACC Management Component', () => {
    let comp: TurmaACCComponent;
    let fixture: ComponentFixture<TurmaACCComponent>;
    let service: TurmaACCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TurmaACCComponent],
        providers: []
      })
        .overrideTemplate(TurmaACCComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurmaACCComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurmaACCService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TurmaACC(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.turmaACCS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
