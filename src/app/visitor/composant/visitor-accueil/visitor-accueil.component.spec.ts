import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAccueilComponent } from './visitor-accueil.component';

describe('VisitorAccueilComponent', () => {
  let component: VisitorAccueilComponent;
  let fixture: ComponentFixture<VisitorAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorAccueilComponent]
    });
    fixture = TestBed.createComponent(VisitorAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
