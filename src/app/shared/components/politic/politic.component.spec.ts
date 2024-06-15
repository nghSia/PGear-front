import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticComponent } from './politic.component';

describe('PoliticComponent', () => {
  let component: PoliticComponent;
  let fixture: ComponentFixture<PoliticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliticComponent]
    });
    fixture = TestBed.createComponent(PoliticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
