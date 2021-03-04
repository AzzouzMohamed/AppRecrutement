import { IQuestion } from 'app/shared/model/question.model';

export interface IReponse {
  id?: number;
  enoncedelaReponse?: string;
  verite?: boolean;
  question?: IQuestion;
}

export class Reponse implements IReponse {
  constructor(public id?: number, public enoncedelaReponse?: string, public verite?: boolean, public question?: IQuestion) {
    this.verite = this.verite || false;
  }
}
