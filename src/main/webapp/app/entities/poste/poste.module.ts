import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Test11SharedModule } from 'app/shared/shared.module';
import { PosteComponent } from './poste.component';
import { PosteDetailComponent } from './poste-detail.component';
import { PosteUpdateComponent } from './poste-update.component';
import { PosteDeleteDialogComponent } from './poste-delete-dialog.component';
import { posteRoute } from './poste.route';

@NgModule({
  imports: [Test11SharedModule, RouterModule.forChild(posteRoute)],
  declarations: [PosteComponent, PosteDetailComponent, PosteUpdateComponent, PosteDeleteDialogComponent],
  entryComponents: [PosteDeleteDialogComponent],
})
export class Test11PosteModule {}
