import { IReponse } from 'app/shared/model/reponse.model';
import { IExamin } from 'app/shared/model/examin.model';
import { Difficulte } from 'app/shared/model/enumerations/difficulte.model';

export interface IQuestion {
  id?: number;
  enonce?: string;
  timing?: number;
  niveaudedifficulte?: Difficulte;
  reponses?: IReponse[];
  examin?: IExamin;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public enonce?: string,
    public timing?: number,
    public niveaudedifficulte?: Difficulte,
    public reponses?: IReponse[],
    public examin?: IExamin
  ) {}
}
