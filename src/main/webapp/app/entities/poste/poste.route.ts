import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPoste, Poste } from 'app/shared/model/poste.model';
import { PosteService } from './poste.service';
import { PosteComponent } from './poste.component';
import { PosteDetailComponent } from './poste-detail.component';
import { PosteUpdateComponent } from './poste-update.component';

@Injectable({ providedIn: 'root' })
export class PosteResolve implements Resolve<IPoste> {
  constructor(private service: PosteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPoste> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((poste: HttpResponse<Poste>) => {
          if (poste.body) {
            return of(poste.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Poste());
  }
}

export const posteRoute: Routes = [
  {
    path: '',
    component: PosteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Postes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PosteDetailComponent,
    resolve: {
      poste: PosteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Postes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PosteUpdateComponent,
    resolve: {
      poste: PosteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Postes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PosteUpdateComponent,
    resolve: {
      poste: PosteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Postes',
    },
    canActivate: [UserRouteAccessService],
  },
];
