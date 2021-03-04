import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IResultat } from 'app/shared/model/resultat.model';
import { ResultatService } from './resultat.service';
import { ResultatDeleteDialogComponent } from './resultat-delete-dialog.component';

@Component({
  selector: 'jhi-resultat',
  templateUrl: './resultat.component.html',
})
export class ResultatComponent implements OnInit, OnDestroy {
  resultats?: IResultat[];
  eventSubscriber?: Subscription;

  constructor(protected resultatService: ResultatService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.resultatService.query().subscribe((res: HttpResponse<IResultat[]>) => (this.resultats = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInResultats();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IResultat): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInResultats(): void {
    this.eventSubscriber = this.eventManager.subscribe('resultatListModification', () => this.loadAll());
  }

  delete(resultat: IResultat): void {
    const modalRef = this.modalService.open(ResultatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.resultat = resultat;
  }
}
