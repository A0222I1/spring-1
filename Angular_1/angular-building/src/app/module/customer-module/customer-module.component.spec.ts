import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModuleComponent } from './customer-module.component';

describe('CustomerModuleComponent', () => {
  let component: CustomerModuleComponent;
  let fixture: ComponentFixture<CustomerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
