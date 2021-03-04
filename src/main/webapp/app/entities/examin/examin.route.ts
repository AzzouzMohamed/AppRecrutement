import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExamin, Examin } from 'app/shared/model/examin.model';
import { ExaminService } from './examin.service';
import { ExaminComponent } from './examin.component';
import { ExaminDetailComponent } from './examin-detail.component';
import { ExaminUpdateComponent } from './examin-update.component';

@Injectable({ providedIn: 'root' })
export class ExaminResolve implements Resolve<IExamin> {
  constructor(private service: ExaminService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExamin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((examin: HttpResponse<Examin>) => {
          if (examin.body) {
            return of(examin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Examin());
  }
}

export const examinRoute: Routes = [
  {
    path: '',
    component: ExaminComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Examins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExaminDetailComponent,
    resolve: {
      examin: ExaminResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Examins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExaminUpdateComponent,
    resolve: {
      examin: ExaminResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Examins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExaminUpdateComponent,
    resolve: {
      examin: ExaminResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Examins',
    },
    canActivate: [UserRouteAccessService],
  },
];
