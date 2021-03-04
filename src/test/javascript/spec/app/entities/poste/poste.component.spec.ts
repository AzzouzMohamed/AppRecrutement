import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Test11TestModule } from '../../../test.module';
import { PosteComponent } from 'app/entities/poste/poste.component';
import { PosteService } from 'app/entities/poste/poste.service';
import { Poste } from 'app/shared/model/poste.model';

describe('Component Tests', () => {
  describe('Poste Management Component', () => {
    let comp: PosteComponent;
    let fixture: ComponentFixture<PosteComponent>;
    let service: PosteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [PosteComponent],
      })
        .overrideTemplate(PosteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PosteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Poste(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.postes && comp.postes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
