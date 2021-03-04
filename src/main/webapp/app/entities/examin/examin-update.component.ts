import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExamin, Examin } from 'app/shared/model/examin.model';
import { ExaminService } from './examin.service';

@Component({
  selector: 'jhi-examin-update',
  templateUrl: './examin-update.component.html',
})
export class ExaminUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    domaineDeCompetence: [null, [Validators.required]],
  });

  constructor(protected examinService: ExaminService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examin }) => {
      this.updateForm(examin);
    });
  }

  updateForm(examin: IExamin): void {
    this.editForm.patchValue({
      id: examin.id,
      domaineDeCompetence: examin.domaineDeCompetence,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const examin = this.createFromForm();
    if (examin.id !== undefined) {
      this.subscribeToSaveResponse(this.examinService.update(examin));
    } else {
      this.subscribeToSaveResponse(this.examinService.create(examin));
    }
  }

  private createFromForm(): IExamin {
    return {
      ...new Examin(),
      id: this.editForm.get(['id'])!.value,
      domaineDeCompetence: this.editForm.get(['domaineDeCompetence'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExamin>>): void {
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
}
