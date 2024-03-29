import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UsuarioService } from 'app/entities/usuario/usuario.service';
import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { Perfil } from 'app/shared/model/enumerations/perfil.model';

describe('Service Tests', () => {
  describe('Usuario Service', () => {
    let injector: TestBed;
    let service: UsuarioService;
    let httpMock: HttpTestingController;
    let elemDefault: IUsuario;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UsuarioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Usuario(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, Perfil.ADMIN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            ultimoLogin: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Usuario', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            ultimoLogin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            ultimoLogin: currentDate
          },
          returnedFromService
        );
        service
          .create(new Usuario(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Usuario', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            login: 'BBBBBB',
            senha: 'BBBBBB',
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            ultimoLogin: currentDate.format(DATE_TIME_FORMAT),
            perfil: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            ultimoLogin: currentDate
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

      it('should return a list of Usuario', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            login: 'BBBBBB',
            senha: 'BBBBBB',
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            ultimoLogin: currentDate.format(DATE_TIME_FORMAT),
            perfil: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            ultimoLogin: currentDate
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

      it('should delete a Usuario', () => {
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
