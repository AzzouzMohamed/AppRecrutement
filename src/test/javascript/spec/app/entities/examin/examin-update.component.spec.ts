import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Test11TestModule } from '../../../test.module';
import { ExaminUpdateComponent } from 'app/entities/examin/examin-update.component';
import { ExaminService } from 'app/entities/examin/examin.service';
import { Examin } from 'app/shared/model/examin.model';

describe('Component Tests', () => {
  describe('Examin Management Update Component', () => {
    let comp: ExaminUpdateComponent;
    let fixture: ComponentFixture<ExaminUpdateComponent>;
    let service: ExaminService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test11TestModule],
        declarations: [ExaminUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExaminUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExaminUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExaminService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Examin(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Examin();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
