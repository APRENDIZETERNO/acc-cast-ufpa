import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TurmasAccTestModule } from '../../../test.module';
import { CertificadoComponent } from 'app/entities/certificado/certificado.component';
import { CertificadoService } from 'app/entities/certificado/certificado.service';
import { Certificado } from 'app/shared/model/certificado.model';

describe('Component Tests', () => {
  describe('Certificado Management Component', () => {
    let comp: CertificadoComponent;
    let fixture: ComponentFixture<CertificadoComponent>;
    let service: CertificadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [CertificadoComponent],
        providers: []
      })
        .overrideTemplate(CertificadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Certificado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.certificados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
