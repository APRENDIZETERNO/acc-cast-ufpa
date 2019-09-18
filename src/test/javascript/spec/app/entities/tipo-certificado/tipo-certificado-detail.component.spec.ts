import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { TipoCertificadoDetailComponent } from 'app/entities/tipo-certificado/tipo-certificado-detail.component';
import { TipoCertificado } from 'app/shared/model/tipo-certificado.model';

describe('Component Tests', () => {
  describe('TipoCertificado Management Detail Component', () => {
    let comp: TipoCertificadoDetailComponent;
    let fixture: ComponentFixture<TipoCertificadoDetailComponent>;
    const route = ({ data: of({ tipoCertificado: new TipoCertificado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TipoCertificadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoCertificadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoCertificadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoCertificado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
