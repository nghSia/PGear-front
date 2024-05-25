import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAcceuilComponent } from './customer-acceuil.component';

describe('CustomerAcceuilComponent', () => {
  let component: CustomerAcceuilComponent;
  let fixture: ComponentFixture<CustomerAcceuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAcceuilComponent]
    });
    fixture = TestBed.createComponent(CustomerAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
