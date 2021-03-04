import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICandidat, Candidat } from 'app/shared/model/candidat.model';
import { CandidatService } from './candidat.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPoste } from 'app/shared/model/poste.model';
import { PosteService } from 'app/entities/poste/poste.service';

type SelectableEntity = IUser | IPoste;

@Component({
  selector: 'jhi-candidat-update',
  templateUrl: './candidat-update.component.html',
})
export class CandidatUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  postes: IPoste[] = [];

  editForm = this.fb.group({
    id: [],
    fullName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    diplome: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
    user: [],
    poste: [],
  });

  constructor(
    protected candidatService: CandidatService,
    protected userService: UserService,
    protected posteService: PosteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidat }) => {
      this.updateForm(candidat);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.posteService.query().subscribe((res: HttpResponse<IPoste[]>) => (this.postes = res.body || []));
    });
  }

  updateForm(candidat: ICandidat): void {
    this.editForm.patchValue({
      id: candidat.id,
      fullName: candidat.fullName,
      email: candidat.email,
      diplome: candidat.diplome,
      phone: candidat.phone,
      city: candidat.city,
      user: candidat.user,
      poste: candidat.poste,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidat = this.createFromForm();
    if (candidat.id !== undefined) {
      this.subscribeToSaveResponse(this.candidatService.update(candidat));
    } else {
      this.subscribeToSaveResponse(this.candidatService.create(candidat));
    }
  }

  private createFromForm(): ICandidat {
    return {
      ...new Candidat(),
      id: this.editForm.get(['id'])!.value,
      fullName: this.editForm.get(['fullName'])!.value,
      email: this.editForm.get(['email'])!.value,
      diplome: this.editForm.get(['diplome'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      city: this.editForm.get(['city'])!.value,
      user: this.editForm.get(['user'])!.value,
      poste: this.editForm.get(['poste'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidat>>): void {
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
