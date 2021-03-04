import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReponse, Reponse } from 'app/shared/model/reponse.model';
import { ReponseService } from './reponse.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question/question.service';

@Component({
  selector: 'jhi-reponse-update',
  templateUrl: './reponse-update.component.html',
})
export class ReponseUpdateComponent implements OnInit {
  isSaving = false;
  questions: IQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    enoncedelaReponse: [null, [Validators.required]],
    verite: [null, [Validators.required]],
    question: [],
  });

  constructor(
    protected reponseService: ReponseService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reponse }) => {
      this.updateForm(reponse);

      this.questionService.query().subscribe((res: HttpResponse<IQuestion[]>) => (this.questions = res.body || []));
    });
  }

  updateForm(reponse: IReponse): void {
    this.editForm.patchValue({
      id: reponse.id,
      enoncedelaReponse: reponse.enoncedelaReponse,
      verite: reponse.verite,
      question: reponse.question,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reponse = this.createFromForm();
    if (reponse.id !== undefined) {
      this.subscribeToSaveResponse(this.reponseService.update(reponse));
    } else {
      this.subscribeToSaveResponse(this.reponseService.create(reponse));
    }
  }

  private createFromForm(): IReponse {
    return {
      ...new Reponse(),
      id: this.editForm.get(['id'])!.value,
      enoncedelaReponse: this.editForm.get(['enoncedelaReponse'])!.value,
      verite: this.editForm.get(['verite'])!.value,
      question: this.editForm.get(['question'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReponse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IQuestion): any {
    return item.id;
  }
}
