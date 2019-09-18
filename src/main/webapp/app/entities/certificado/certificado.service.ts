import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICertificado } from 'app/shared/model/certificado.model';

type EntityResponseType = HttpResponse<ICertificado>;
type EntityArrayResponseType = HttpResponse<ICertificado[]>;

@Injectable({ providedIn: 'root' })
export class CertificadoService {
  public resourceUrl = SERVER_API_URL + 'api/certificados';

  constructor(protected http: HttpClient) {}

  create(certificado: ICertificado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certificado);
    return this.http
      .post<ICertificado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(certificado: ICertificado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certificado);
    return this.http
      .put<ICertificado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICertificado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICertificado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(certificado: ICertificado): ICertificado {
    const copy: ICertificado = Object.assign({}, certificado, {
      dataEnvio: certificado.dataEnvio != null && certificado.dataEnvio.isValid() ? certificado.dataEnvio.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataEnvio = res.body.dataEnvio != null ? moment(res.body.dataEnvio) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((certificado: ICertificado) => {
        certificado.dataEnvio = certificado.dataEnvio != null ? moment(certificado.dataEnvio) : null;
      });
    }
    return res;
  }
}
