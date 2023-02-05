import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractComponentComponent } from './contract-component.component';

describe('ContractComponentComponent', () => {
  let component: ContractComponentComponent;
  let fixture: ComponentFixture<ContractComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
