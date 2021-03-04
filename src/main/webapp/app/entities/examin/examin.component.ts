import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExamin } from 'app/shared/model/examin.model';
import { ExaminService } from './examin.service';
import { ExaminDeleteDialogComponent } from './examin-delete-dialog.component';

@Component({
  selector: 'jhi-examin',
  templateUrl: './examin.component.html',
})
export class ExaminComponent implements OnInit, OnDestroy {
  examins?: IExamin[];
  eventSubscriber?: Subscription;

  constructor(protected examinService: ExaminService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.examinService.query().subscribe((res: HttpResponse<IExamin[]>) => (this.examins = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExamins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExamin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExamins(): void {
    this.eventSubscriber = this.eventManager.subscribe('examinListModification', () => this.loadAll());
  }

  delete(examin: IExamin): void {
    const modalRef = this.modalService.open(ExaminDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.examin = examin;
  }
}
