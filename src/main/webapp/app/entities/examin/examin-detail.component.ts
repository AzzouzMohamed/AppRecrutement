import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExamin } from 'app/shared/model/examin.model';

@Component({
  selector: 'jhi-examin-detail',
  templateUrl: './examin-detail.component.html',
})
export class ExaminDetailComponent implements OnInit {
  examin: IExamin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examin }) => (this.examin = examin));
  }

  previousState(): void {
    window.history.back();
  }
}
