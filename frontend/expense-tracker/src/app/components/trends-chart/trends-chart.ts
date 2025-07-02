import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';
import { Expense } from '../../models/expense.model';

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

  // Method to render the chart with the provided expenses data
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

    // Determine if there is a single category or multiple categories for label
    const uniqueCategories = Array.from(new Set(this.expenses.map(e => e.category)));
    const label = uniqueCategories.length === 1 ? `Expenses for ${uniqueCategories[0]}` : 'Expenses for All Categories';

    // Create chart with correspdoning labels and data
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
      labels,
      datasets: [{
        label,
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

  // Method to generate a message summarizing the expense trends
  getExpenseTrendMessage(expenses: Expense[]): string {
    if (!this.expenses || this.expenses.length === 0) {
      return 'No expenses recorded yet.';
    }

    // Calculate the first and last expense dates, total amount, highest and lowest expenses
    const firstExpenseDate = new Date(this.expenses[0].date);
    const lastExpenseDate = new Date(this.expenses[this.expenses.length - 1].date);
    const totalAmount = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const highestExpense = Math.max(...this.expenses.map(expense => expense.amount));
    const highestExpenseDate = this.expenses.find(expense => expense.amount === highestExpense)?.date;
    const highestExpenseCategory = this.expenses.find(expense => expense.amount === highestExpense)?.category;
    const lowestExpense = Math.min(...this.expenses.map(expense => expense.amount));
    const lowestExpenseDate = this.expenses.find(expense => expense.amount === lowestExpense)?.date;
    const lowestExpenseCategory = this.expenses.find(expense => expense.amount === lowestExpense)?.category;

    const highestExpenseDateStr = highestExpenseDate ? new Date(highestExpenseDate).toLocaleDateString() : 'N/A';
    const lowestExpenseDateStr = lowestExpenseDate ? new Date(lowestExpenseDate).toLocaleDateString() : 'N/A';

    return `${this.expenses.length} expense entries from ${firstExpenseDate.toLocaleDateString()} to ${lastExpenseDate.toLocaleDateString()}.
  The total expenses amount to $${totalAmount}.
  The highest expense was $${highestExpense} on ${highestExpenseDateStr} in the ${highestExpenseCategory} category.
  The lowest was $${lowestExpense} on ${lowestExpenseDateStr} in the ${lowestExpenseCategory} category.`;
  }
}
