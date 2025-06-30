import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-stats.html',
  styleUrls: ['./summary-stats.css']
})
export class SummaryStatsComponent implements OnInit {
 totalAmount: number = 0;
  categoryTotals: { category: string; total: number }[] = [];

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.expenseService.getTotalExpenseAmount().subscribe(amount => {
      this.totalAmount = amount;
    });


    this.expenseService.getExpenseAmountByCategory().subscribe(totals => {
      // totals is an array of objects: [{ category: string, total: number }, ...]
      this.categoryTotals = totals.map((item: { category: any; total: any; }) => ({ category: item.category, total: item.total }));
    });
  }

}
