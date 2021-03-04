import { IUser } from 'app/core/user/user.model';
import { IResultat } from 'app/shared/model/resultat.model';
import { IPoste } from 'app/shared/model/poste.model';

export interface ICandidat {
  id?: number;
  fullName?: string;
  email?: string;
  diplome?: string;
  phone?: string;
  city?: string;
  user?: IUser;
  resultats?: IResultat[];
  poste?: IPoste;
}

export class Candidat implements ICandidat {
  constructor(
    public id?: number,
    public fullName?: string,
    public email?: string,
    public diplome?: string,
    public phone?: string,
    public city?: string,
    public user?: IUser,
    public resultats?: IResultat[],
    public poste?: IPoste
  ) {}
}
