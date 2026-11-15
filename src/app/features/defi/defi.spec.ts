import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Defi } from './defi';

describe('Defi', () => {
  let component: Defi;
  let fixture: ComponentFixture<Defi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Defi],
    }).compileComponents();

    fixture = TestBed.createComponent(Defi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
