import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Test11SharedModule } from 'app/shared/shared.module';
import { ReponseComponent } from './reponse.component';
import { ReponseDetailComponent } from './reponse-detail.component';
import { ReponseUpdateComponent } from './reponse-update.component';
import { ReponseDeleteDialogComponent } from './reponse-delete-dialog.component';
import { reponseRoute } from './reponse.route';

@NgModule({
  imports: [Test11SharedModule, RouterModule.forChild(reponseRoute)],
  declarations: [ReponseComponent, ReponseDetailComponent, ReponseUpdateComponent, ReponseDeleteDialogComponent],
  entryComponents: [ReponseDeleteDialogComponent],
})
export class Test11ReponseModule {}
