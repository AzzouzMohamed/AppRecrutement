import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultat } from 'app/shared/model/resultat.model';
import { ResultatService } from './resultat.service';

@Component({
  templateUrl: './resultat-delete-dialog.component.html',
})
export class ResultatDeleteDialogComponent {
  resultat?: IResultat;

  constructor(protected resultatService: ResultatService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.resultatService.delete(id).subscribe(() => {
      this.eventManager.broadcast('resultatListModification');
      this.activeModal.close();
    });
  }
}
