import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Test11TestModule } from '../../../test.module';
import { ResultatComponent } from 'app/entities/resultat/resultat.component';
import { ResultatService } from 'app/entities/resultat/resultat.service';
import { Resultat } from 'app/shared/model/resultat.model';

describe('Component Tests', () => {
  describe('Resultat Management Component', () => {
    let comp: ResultatComponent;
    let fixture: ComponentFixture<ResultatComponent>;
    let service: ResultatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [ResultatComponent],
      })
        .overrideTemplate(ResultatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultatComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultatService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Resultat(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.resultats && comp.resultats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
