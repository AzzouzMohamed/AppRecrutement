import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Test11SharedModule } from 'app/shared/shared.module';
import { Test11CoreModule } from 'app/core/core.module';
import { Test11AppRoutingModule } from './app-routing.module';
import { Test11HomeModule } from './home/home.module';
import { Test11EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Test11SharedModule,
    Test11CoreModule,
    Test11HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Test11EntityModule,
    Test11AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class Test11AppModule {}
