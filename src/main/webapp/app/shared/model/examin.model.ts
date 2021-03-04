import { IQuestion } from 'app/shared/model/question.model';
import { IResultat } from 'app/shared/model/resultat.model';
import { IPoste } from 'app/shared/model/poste.model';

export interface IExamin {
  id?: number;
  domaineDeCompetence?: string;
  questions?: IQuestion[];
  resultats?: IResultat[];
  postes?: IPoste[];
}

export class Examin implements IExamin {
  constructor(
    public id?: number,
    public domaineDeCompetence?: string,
    public questions?: IQuestion[],
    public resultats?: IResultat[],
    public postes?: IPoste[]
  ) {}
}
