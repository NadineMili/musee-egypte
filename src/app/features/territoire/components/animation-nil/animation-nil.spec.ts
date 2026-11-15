import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimationNil } from './animation-nil';

describe('AnimationNil', () => {
  let component: AnimationNil;
  let fixture: ComponentFixture<AnimationNil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationNil],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimationNil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
