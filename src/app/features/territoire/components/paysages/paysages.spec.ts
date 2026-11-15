import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paysages } from './paysages';

describe('Paysages', () => {
  let component: Paysages;
  let fixture: ComponentFixture<Paysages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paysages],
    }).compileComponents();

    fixture = TestBed.createComponent(Paysages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
