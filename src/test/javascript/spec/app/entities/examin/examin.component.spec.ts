import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Test11TestModule } from '../../../test.module';
import { ExaminComponent } from 'app/entities/examin/examin.component';
import { ExaminService } from 'app/entities/examin/examin.service';
import { Examin } from 'app/shared/model/examin.model';

describe('Component Tests', () => {
  describe('Examin Management Component', () => {
    let comp: ExaminComponent;
    let fixture: ComponentFixture<ExaminComponent>;
    let service: ExaminService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [ExaminComponent],
      })
        .overrideTemplate(ExaminComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExaminComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExaminService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Examin(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.examins && comp.examins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
