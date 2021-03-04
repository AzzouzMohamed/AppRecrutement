import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExamin } from 'app/shared/model/examin.model';

type EntityResponseType = HttpResponse<IExamin>;
type EntityArrayResponseType = HttpResponse<IExamin[]>;

@Injectable({ providedIn: 'root' })
export class ExaminService {
  public resourceUrl = SERVER_API_URL + 'api/examins';

  constructor(protected http: HttpClient) {}

  create(examin: IExamin): Observable<EntityResponseType> {
    return this.http.post<IExamin>(this.resourceUrl, examin, { observe: 'response' });
  }

  update(examin: IExamin): Observable<EntityResponseType> {
    return this.http.put<IExamin>(this.resourceUrl, examin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExamin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExamin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
