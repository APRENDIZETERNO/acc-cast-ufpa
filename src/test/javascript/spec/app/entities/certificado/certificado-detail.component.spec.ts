import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TurmasAccTestModule } from '../../../test.module';
import { CertificadoDetailComponent } from 'app/entities/certificado/certificado-detail.component';
import { Certificado } from 'app/shared/model/certificado.model';

describe('Component Tests', () => {
  describe('Certificado Management Detail Component', () => {
    let comp: CertificadoDetailComponent;
    let fixture: ComponentFixture<CertificadoDetailComponent>;
    const route = ({ data: of({ certificado: new Certificado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [CertificadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CertificadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertificadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.certificado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
