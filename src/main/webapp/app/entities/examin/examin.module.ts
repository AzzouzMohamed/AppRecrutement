import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Test11SharedModule } from 'app/shared/shared.module';
import { ExaminComponent } from './examin.component';
import { ExaminDetailComponent } from './examin-detail.component';
import { ExaminUpdateComponent } from './examin-update.component';
import { ExaminDeleteDialogComponent } from './examin-delete-dialog.component';
import { examinRoute } from './examin.route';

@NgModule({
  imports: [Test11SharedModule, RouterModule.forChild(examinRoute)],
  declarations: [ExaminComponent, ExaminDetailComponent, ExaminUpdateComponent, ExaminDeleteDialogComponent],
  entryComponents: [ExaminDeleteDialogComponent],
})
export class Test11ExaminModule {}
