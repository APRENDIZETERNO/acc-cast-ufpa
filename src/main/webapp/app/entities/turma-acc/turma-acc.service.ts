import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';

type EntityResponseType = HttpResponse<ITurmaACC>;
type EntityArrayResponseType = HttpResponse<ITurmaACC[]>;

@Injectable({ providedIn: 'root' })
export class TurmaACCService {
  public resourceUrl = SERVER_API_URL + 'api/turma-accs';

  constructor(protected http: HttpClient) {}

  create(turmaACC: ITurmaACC): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turmaACC);
    return this.http
      .post<ITurmaACC>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turmaACC: ITurmaACC): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turmaACC);
    return this.http
      .put<ITurmaACC>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurmaACC>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurmaACC[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(turmaACC: ITurmaACC): ITurmaACC {
    const copy: ITurmaACC = Object.assign({}, turmaACC, {
      inicio: turmaACC.inicio != null && turmaACC.inicio.isValid() ? turmaACC.inicio.format(DATE_FORMAT) : null,
      prazoEnvio: turmaACC.prazoEnvio != null && turmaACC.prazoEnvio.isValid() ? turmaACC.prazoEnvio.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.inicio = res.body.inicio != null ? moment(res.body.inicio) : null;
      res.body.prazoEnvio = res.body.prazoEnvio != null ? moment(res.body.prazoEnvio) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turmaACC: ITurmaACC) => {
        turmaACC.inicio = turmaACC.inicio != null ? moment(turmaACC.inicio) : null;
        turmaACC.prazoEnvio = turmaACC.prazoEnvio != null ? moment(turmaACC.prazoEnvio) : null;
      });
    }
    return res;
  }
}
