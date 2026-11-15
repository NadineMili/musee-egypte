import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DansLaVille } from './dans-la-ville';

describe('DansLaVille', () => {
  let component: DansLaVille;
  let fixture: ComponentFixture<DansLaVille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DansLaVille],
    }).compileComponents();

    fixture = TestBed.createComponent(DansLaVille);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
