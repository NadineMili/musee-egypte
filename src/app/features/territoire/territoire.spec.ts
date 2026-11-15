import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Territoire } from './territoire';

describe('Territoire', () => {
  let component: Territoire;
  let fixture: ComponentFixture<Territoire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Territoire],
    }).compileComponents();

    fixture = TestBed.createComponent(Territoire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
