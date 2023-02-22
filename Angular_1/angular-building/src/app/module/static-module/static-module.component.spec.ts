import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticModuleComponent } from './static-module.component';

describe('StaticModuleComponent', () => {
  let component: StaticModuleComponent;
  let fixture: ComponentFixture<StaticModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
