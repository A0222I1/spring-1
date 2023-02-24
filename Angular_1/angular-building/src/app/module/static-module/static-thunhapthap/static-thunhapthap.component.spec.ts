import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticThunhapthapComponent } from './static-thunhapthap.component';

describe('StaticThunhapthapComponent', () => {
  let component: StaticThunhapthapComponent;
  let fixture: ComponentFixture<StaticThunhapthapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticThunhapthapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticThunhapthapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
