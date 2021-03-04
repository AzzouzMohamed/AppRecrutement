import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IResultat, Resultat } from 'app/shared/model/resultat.model';
import { ResultatService } from './resultat.service';
import { ResultatComponent } from './resultat.component';
import { ResultatDetailComponent } from './resultat-detail.component';
import { ResultatUpdateComponent } from './resultat-update.component';

@Injectable({ providedIn: 'root' })
export class ResultatResolve implements Resolve<IResultat> {
  constructor(private service: ResultatService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResultat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((resultat: HttpResponse<Resultat>) => {
          if (resultat.body) {
            return of(resultat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Resultat());
  }
}

export const resultatRoute: Routes = [
  {
    path: '',
    component: ResultatComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Resultats',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ResultatDetailComponent,
    resolve: {
      resultat: ResultatResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Resultats',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ResultatUpdateComponent,
    resolve: {
      resultat: ResultatResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Resultats',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ResultatUpdateComponent,
    resolve: {
      resultat: ResultatResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Resultats',
    },
    canActivate: [UserRouteAccessService],
  },
];
