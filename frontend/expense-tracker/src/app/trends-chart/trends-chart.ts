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

export class TrendsChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() expenses: Expense[] = [];
  chart!: Chart;

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges() {
    console.log('Received new expenses:', this.expenses);
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart();
    
  }

  renderChart() {
    console.log('Rendering chart with expenses:', this.expenses);
    if (!this.chartCanvas || !this.expenses?.length) return;
  
    if (this.chart) this.chart.destroy();

    const grouped: Record<string, number> = {};

  
    this.expenses.forEach((expense) => {
      console.log(expense.amount, expense.date);
      const d = expense.date.slice(0, 10); // Ensure only YYYY-MM-DD
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
