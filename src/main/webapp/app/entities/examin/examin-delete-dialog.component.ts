import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExamin } from 'app/shared/model/examin.model';
import { ExaminService } from './examin.service';

@Component({
  templateUrl: './examin-delete-dialog.component.html',
})
export class ExaminDeleteDialogComponent {
  examin?: IExamin;

  constructor(protected examinService: ExaminService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.examinService.delete(id).subscribe(() => {
      this.eventManager.broadcast('examinListModification');
      this.activeModal.close();
    });
  }
}
