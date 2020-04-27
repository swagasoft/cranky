import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoEventPage } from './imo-event.page';

describe('ImoEventPage', () => {
  let component: ImoEventPage;
  let fixture: ComponentFixture<ImoEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImoEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImoEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
