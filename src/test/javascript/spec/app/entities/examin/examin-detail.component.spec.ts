import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Test11TestModule } from '../../../test.module';
import { ExaminDetailComponent } from 'app/entities/examin/examin-detail.component';
import { Examin } from 'app/shared/model/examin.model';

describe('Component Tests', () => {
  describe('Examin Management Detail Component', () => {
    let comp: ExaminDetailComponent;
    let fixture: ComponentFixture<ExaminDetailComponent>;
    const route = ({ data: of({ examin: new Examin(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [ExaminDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExaminDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExaminDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load examin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.examin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
