import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conclusion } from './conclusion';

describe('Conclusion', () => {
  let component: Conclusion;
  let fixture: ComponentFixture<Conclusion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conclusion],
    }).compileComponents();

    fixture = TestBed.createComponent(Conclusion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
