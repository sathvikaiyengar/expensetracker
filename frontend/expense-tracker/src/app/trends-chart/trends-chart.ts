import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-trends-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trends-chart.html',
  styleUrls: ['./trends-chart.css']
})

// Component to display a line chart of expenses over time
export class TrendsChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() expenses: Expense[] = [];
  chart!: Chart;

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart();
    
  }

  renderChart() {
    if (!this.chartCanvas || !this.expenses?.length) return;
  
    if (this.chart) this.chart.destroy();

    const grouped: Record<string, number> = {};
  
    // Group expenses by date and sum amounts
    this.expenses.forEach((expense) => {
      const d = expense.date.slice(0, 10); // Extract date part in YYYY-MM-DD format
      grouped[d] = (grouped[d] || 0) + expense.amount;
    });

    const labels = Object.keys(grouped).sort();
    const data = labels.map(date => grouped[date]);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
      labels,
      datasets: [{
        label: 'Expenses for ' + (this.expenses[0]?.category || 'All Categories'),
        data,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.2)',
        tension: 0.4,
        fill: true
      }]
      },
      options: {
      responsive: true,
      scales: {
        x: {
        title: {
          display: true,
          text: 'Dates'
        }
        },
        y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
        }
      }
      }
    });
  }
}
