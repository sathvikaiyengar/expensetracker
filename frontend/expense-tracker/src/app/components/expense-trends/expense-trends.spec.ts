import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTrendsComponent } from './expense-trends';

describe('ExpenseTrendsComponent', () => {
  let component: ExpenseTrendsComponent;
  let fixture: ComponentFixture<ExpenseTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTrendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
