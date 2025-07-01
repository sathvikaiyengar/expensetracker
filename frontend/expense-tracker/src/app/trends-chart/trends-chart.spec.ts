import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsChart } from './trends-chart';

describe('TrendsChart', () => {
  let component: TrendsChart;
  let fixture: ComponentFixture<TrendsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
