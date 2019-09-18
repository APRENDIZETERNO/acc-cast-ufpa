import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CertificadoService } from 'app/entities/certificado/certificado.service';
import { ICertificado, Certificado } from 'app/shared/model/certificado.model';
import { TipoCertificado } from 'app/shared/model/enumerations/tipo-certificado.model';
import { StatusCertificado } from 'app/shared/model/enumerations/status-certificado.model';

describe('Service Tests', () => {
  describe('Certificado Service', () => {
    let injector: TestBed;
    let service: CertificadoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICertificado;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CertificadoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Certificado(
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        TipoCertificado.LOCAL,
        0,
        0,
        StatusCertificado.REJEITADO,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataEnvio: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Certificado', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataEnvio: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataEnvio: currentDate
          },
          returnedFromService
        );
        service
          .create(new Certificado(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Certificado', () => {
        const returnedFromService = Object.assign(
          {
            titulo: 'BBBBBB',
            descricao: 'BBBBBB',
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            motivoPendente: 'BBBBBB',
            motivoRejeitado: 'BBBBBB',
            motivoParcial: 'BBBBBB',
            tipo: 'BBBBBB',
            chPedida: 1,
            chConcedida: 1,
            estado: 'BBBBBB',
            caminhoArquivo: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataEnvio: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Certificado', () => {
        const returnedFromService = Object.assign(
          {
            titulo: 'BBBBBB',
            descricao: 'BBBBBB',
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            motivoPendente: 'BBBBBB',
            motivoRejeitado: 'BBBBBB',
            motivoParcial: 'BBBBBB',
            tipo: 'BBBBBB',
            chPedida: 1,
            chConcedida: 1,
            estado: 'BBBBBB',
            caminhoArquivo: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataEnvio: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Certificado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
