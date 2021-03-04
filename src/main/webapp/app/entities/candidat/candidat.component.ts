import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICandidat } from 'app/shared/model/candidat.model';
import { CandidatService } from './candidat.service';
import { CandidatDeleteDialogComponent } from './candidat-delete-dialog.component';

@Component({
  selector: 'jhi-candidat',
  templateUrl: './candidat.component.html',
})
export class CandidatComponent implements OnInit, OnDestroy {
  candidats?: ICandidat[];
  eventSubscriber?: Subscription;

  constructor(protected candidatService: CandidatService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.candidatService.query().subscribe((res: HttpResponse<ICandidat[]>) => (this.candidats = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCandidats();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICandidat): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCandidats(): void {
    this.eventSubscriber = this.eventManager.subscribe('candidatListModification', () => this.loadAll());
  }

  delete(candidat: ICandidat): void {
    const modalRef = this.modalService.open(CandidatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.candidat = candidat;
  }
}
