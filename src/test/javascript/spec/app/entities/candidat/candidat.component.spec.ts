import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Test11TestModule } from '../../../test.module';
import { CandidatComponent } from 'app/entities/candidat/candidat.component';
import { CandidatService } from 'app/entities/candidat/candidat.service';
import { Candidat } from 'app/shared/model/candidat.model';

describe('Component Tests', () => {
  describe('Candidat Management Component', () => {
    let comp: CandidatComponent;
    let fixture: ComponentFixture<CandidatComponent>;
    let service: CandidatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [CandidatComponent],
      })
        .overrideTemplate(CandidatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CandidatComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CandidatService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Candidat(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.candidats && comp.candidats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
