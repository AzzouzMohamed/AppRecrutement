import { IExamin } from 'app/shared/model/examin.model';
import { ICandidat } from 'app/shared/model/candidat.model';
import { Mention } from 'app/shared/model/enumerations/mention.model';

export interface IResultat {
  id?: number;
  note?: number;
  mention?: Mention;
  examin?: IExamin;
  candidat?: ICandidat;
}

export class Resultat implements IResultat {
  constructor(public id?: number, public note?: number, public mention?: Mention, public examin?: IExamin, public candidat?: ICandidat) {}
}
