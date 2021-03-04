import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IResultat, Resultat } from 'app/shared/model/resultat.model';
import { ResultatService } from './resultat.service';
import { IExamin } from 'app/shared/model/examin.model';
import { ExaminService } from 'app/entities/examin/examin.service';
import { ICandidat } from 'app/shared/model/candidat.model';
import { CandidatService } from 'app/entities/candidat/candidat.service';

type SelectableEntity = IExamin | ICandidat;

@Component({
  selector: 'jhi-resultat-update',
  templateUrl: './resultat-update.component.html',
})
export class ResultatUpdateComponent implements OnInit {
  isSaving = false;
  examins: IExamin[] = [];
  candidats: ICandidat[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required]],
    mention: [null, [Validators.required]],
    examin: [],
    candidat: [],
  });

  constructor(
    protected resultatService: ResultatService,
    protected examinService: ExaminService,
    protected candidatService: CandidatService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resultat }) => {
      this.updateForm(resultat);

      this.examinService.query().subscribe((res: HttpResponse<IExamin[]>) => (this.examins = res.body || []));

      this.candidatService.query().subscribe((res: HttpResponse<ICandidat[]>) => (this.candidats = res.body || []));
    });
  }

  updateForm(resultat: IResultat): void {
    this.editForm.patchValue({
      id: resultat.id,
      note: resultat.note,
      mention: resultat.mention,
      examin: resultat.examin,
      candidat: resultat.candidat,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resultat = this.createFromForm();
    if (resultat.id !== undefined) {
      this.subscribeToSaveResponse(this.resultatService.update(resultat));
    } else {
      this.subscribeToSaveResponse(this.resultatService.create(resultat));
    }
  }

  private createFromForm(): IResultat {
    return {
      ...new Resultat(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      mention: this.editForm.get(['mention'])!.value,
      examin: this.editForm.get(['examin'])!.value,
      candidat: this.editForm.get(['candidat'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultat>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
