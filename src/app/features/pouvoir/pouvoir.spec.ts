import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pouvoir } from './pouvoir';

describe('Pouvoir', () => {
  let component: Pouvoir;
  let fixture: ComponentFixture<Pouvoir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pouvoir],
    }).compileComponents();

    fixture = TestBed.createComponent(Pouvoir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
