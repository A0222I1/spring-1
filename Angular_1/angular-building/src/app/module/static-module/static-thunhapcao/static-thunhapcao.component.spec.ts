import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticThunhapcaoComponent } from './static-thunhapcao.component';

describe('StaticThunhapcaoComponent', () => {
  let component: StaticThunhapcaoComponent;
  let fixture: ComponentFixture<StaticThunhapcaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticThunhapcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticThunhapcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
