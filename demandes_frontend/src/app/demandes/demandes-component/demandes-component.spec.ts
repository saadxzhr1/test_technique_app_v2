import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesComponent } from './demandes-component';

describe('DemandesComponent', () => {
  let component: DemandesComponent;
  let fixture: ComponentFixture<DemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemandesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
