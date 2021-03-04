import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPoste } from 'app/shared/model/poste.model';
import { PosteService } from './poste.service';

@Component({
  templateUrl: './poste-delete-dialog.component.html',
})
export class PosteDeleteDialogComponent {
  poste?: IPoste;

  constructor(protected posteService: PosteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.posteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('posteListModification');
      this.activeModal.close();
    });
  }
}
