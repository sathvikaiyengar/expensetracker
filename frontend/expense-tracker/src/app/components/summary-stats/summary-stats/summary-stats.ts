import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense-service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary-stats',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatTooltip, MatButtonModule],
  templateUrl: './summary-stats.html',
  styleUrls: ['./summary-stats.css']
})
export class SummaryStatsComponent implements OnInit {
 totalAmount: number = 0;
  categoryTotals: { category: string; total: number }[] = [];

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.loadStats();

    // Refresh stats when expenses change
    this.expenseService.getExpenseUpdates().subscribe(() => {
      this.loadStats();
    });
  }

  // Load total expense amount and totals by category
  private loadStats() {
    this.expenseService.getTotalExpenseAmount().subscribe(amount => {
      this.totalAmount = amount;
    });

    this.expenseService.getExpenseAmountByCategory().subscribe(totals => {
      this.categoryTotals = totals.map((item: { category: any; total: any; }) => ({
        category: item.category,
        total: item.total
      }));
    });
  }

  // Get color for category
  getCategoryColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    Food: '#77AADD',
    Transport: '#EE8866',
    Utilities: '#EEDD88',
    Misc: '#FFAABB',
    Beauty: '#44BB99',
    Entertainment: '#BBCC33',
  };
  return colorMap[category] || '#DDDDDD'; // default color
}


  

}
