import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SummaryStatsComponent } from "../summary-stats/summary-stats/summary-stats";


@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, SummaryStatsComponent],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})
export class ExpenseListComponent implements OnInit{
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => this.expenses = data,
      error: (err) => console.error('❌ Failed to load expenses:', err)
    });
  }

}
