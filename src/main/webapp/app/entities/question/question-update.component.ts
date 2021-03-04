import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { IExamin } from 'app/shared/model/examin.model';
import { ExaminService } from 'app/entities/examin/examin.service';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html',
})
export class QuestionUpdateComponent implements OnInit {
  isSaving = false;
  examins: IExamin[] = [];

  editForm = this.fb.group({
    id: [],
    enonce: [null, [Validators.required]],
    timing: [null, [Validators.required]],
    niveaudedifficulte: [null, [Validators.required]],
    examin: [],
  });

  constructor(
    protected questionService: QuestionService,
    protected examinService: ExaminService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);

      this.examinService.query().subscribe((res: HttpResponse<IExamin[]>) => (this.examins = res.body || []));
    });
  }

  updateForm(question: IQuestion): void {
    this.editForm.patchValue({
      id: question.id,
      enonce: question.enonce,
      timing: question.timing,
      niveaudedifficulte: question.niveaudedifficulte,
      examin: question.examin,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  private createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id'])!.value,
      enonce: this.editForm.get(['enonce'])!.value,
      timing: this.editForm.get(['timing'])!.value,
      niveaudedifficulte: this.editForm.get(['niveaudedifficulte'])!.value,
      examin: this.editForm.get(['examin'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>): void {
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

  trackById(index: number, item: IExamin): any {
    return item.id;
  }
}
