import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICandidat } from 'app/shared/model/candidat.model';

type EntityResponseType = HttpResponse<ICandidat>;
type EntityArrayResponseType = HttpResponse<ICandidat[]>;

@Injectable({ providedIn: 'root' })
export class CandidatService {
  public resourceUrl = SERVER_API_URL + 'api/candidats';

  constructor(protected http: HttpClient) {}

  create(candidat: ICandidat): Observable<EntityResponseType> {
    return this.http.post<ICandidat>(this.resourceUrl, candidat, { observe: 'response' });
  }

  update(candidat: ICandidat): Observable<EntityResponseType> {
    return this.http.put<ICandidat>(this.resourceUrl, candidat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandidat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
