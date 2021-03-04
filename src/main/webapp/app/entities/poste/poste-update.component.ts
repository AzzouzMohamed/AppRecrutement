import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPoste, Poste } from 'app/shared/model/poste.model';
import { PosteService } from './poste.service';
import { IExamin } from 'app/shared/model/examin.model';
import { ExaminService } from 'app/entities/examin/examin.service';

@Component({
  selector: 'jhi-poste-update',
  templateUrl: './poste-update.component.html',
})
export class PosteUpdateComponent implements OnInit {
  isSaving = false;
  examins: IExamin[] = [];

  editForm = this.fb.group({
    id: [],
    nomDuPoste: [null, [Validators.required]],
    description: [null, [Validators.required]],
    examins: [],
  });

  constructor(
    protected posteService: PosteService,
    protected examinService: ExaminService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ poste }) => {
      this.updateForm(poste);

      this.examinService.query().subscribe((res: HttpResponse<IExamin[]>) => (this.examins = res.body || []));
    });
  }

  updateForm(poste: IPoste): void {
    this.editForm.patchValue({
      id: poste.id,
      nomDuPoste: poste.nomDuPoste,
      description: poste.description,
      examins: poste.examins,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const poste = this.createFromForm();
    if (poste.id !== undefined) {
      this.subscribeToSaveResponse(this.posteService.update(poste));
    } else {
      this.subscribeToSaveResponse(this.posteService.create(poste));
    }
  }

  private createFromForm(): IPoste {
    return {
      ...new Poste(),
      id: this.editForm.get(['id'])!.value,
      nomDuPoste: this.editForm.get(['nomDuPoste'])!.value,
      description: this.editForm.get(['description'])!.value,
      examins: this.editForm.get(['examins'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPoste>>): void {
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

  getSelected(selectedVals: IExamin[], option: IExamin): IExamin {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
