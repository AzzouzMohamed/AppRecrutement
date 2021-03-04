import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPoste } from 'app/shared/model/poste.model';
import { PosteService } from './poste.service';
import { PosteDeleteDialogComponent } from './poste-delete-dialog.component';

@Component({
  selector: 'jhi-poste',
  templateUrl: './poste.component.html',
})
export class PosteComponent implements OnInit, OnDestroy {
  postes?: IPoste[];
  eventSubscriber?: Subscription;

  constructor(protected posteService: PosteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.posteService.query().subscribe((res: HttpResponse<IPoste[]>) => (this.postes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPostes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPoste): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPostes(): void {
    this.eventSubscriber = this.eventManager.subscribe('posteListModification', () => this.loadAll());
  }

  delete(poste: IPoste): void {
    const modalRef = this.modalService.open(PosteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.poste = poste;
  }
}
