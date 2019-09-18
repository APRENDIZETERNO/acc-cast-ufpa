import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { TurmaACCDetailComponent } from 'app/entities/turma-acc/turma-acc-detail.component';
import { TurmaACC } from 'app/shared/model/turma-acc.model';

describe('Component Tests', () => {
  describe('TurmaACC Management Detail Component', () => {
    let comp: TurmaACCDetailComponent;
    let fixture: ComponentFixture<TurmaACCDetailComponent>;
    const route = ({ data: of({ turmaACC: new TurmaACC(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TurmaACCDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TurmaACCDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurmaACCDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turmaACC).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
