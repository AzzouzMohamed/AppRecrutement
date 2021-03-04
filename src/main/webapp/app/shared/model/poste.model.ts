import { ICandidat } from 'app/shared/model/candidat.model';
import { IExamin } from 'app/shared/model/examin.model';

export interface IPoste {
  id?: number;
  nomDuPoste?: string;
  description?: string;
  candidats?: ICandidat[];
  examins?: IExamin[];
}

export class Poste implements IPoste {
  constructor(
    public id?: number,
    public nomDuPoste?: string,
    public description?: string,
    public candidats?: ICandidat[],
    public examins?: IExamin[]
  ) {}
}
