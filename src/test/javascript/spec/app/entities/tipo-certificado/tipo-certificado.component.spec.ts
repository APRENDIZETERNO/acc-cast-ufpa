import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TurmasAccTestModule } from '../../../test.module';
import { TipoCertificadoComponent } from 'app/entities/tipo-certificado/tipo-certificado.component';
import { TipoCertificadoService } from 'app/entities/tipo-certificado/tipo-certificado.service';
import { TipoCertificado } from 'app/shared/model/tipo-certificado.model';

describe('Component Tests', () => {
  describe('TipoCertificado Management Component', () => {
    let comp: TipoCertificadoComponent;
    let fixture: ComponentFixture<TipoCertificadoComponent>;
    let service: TipoCertificadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TurmasAccTestModule],
        declarations: [TipoCertificadoComponent],
        providers: []
      })
        .overrideTemplate(TipoCertificadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoCertificadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoCertificadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoCertificado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoCertificados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
