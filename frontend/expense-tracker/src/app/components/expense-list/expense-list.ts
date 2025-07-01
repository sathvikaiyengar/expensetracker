import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense-service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SummaryStatsComponent } from "../summary-stats/summary-stats/summary-stats";
import { AddExpenseComponent } from '../add-expense/add-expense';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ExpenseTrendsComponent } from '../expense-trends/expense-trends';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, SummaryStatsComponent, MatButtonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})

// Component to display the list of expenses
export class ExpenseListComponent implements AfterViewInit {

  displayedColumns: string[] = ['description', 'category', 'date', 'amount',];
  dataSource = new MatTableDataSource<Expense>([]);
  totalExpenses = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  availableCategories: string[] = ['Food', 'Transport', 'Utilities', 'Misc', 'Beauty', 'Entertainment'];
  constructor(private expenseService: ExpenseService, private dialog: MatDialog) {}

  // Initialize data and set up paginator
  ngOnInit() {
    this.loadExpenses();
  }

  // Set the paginator for the data source
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Open the dialog to add a new expense
  openAddExpenseForm() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submitted') {
        this.loadExpenses(); // refresh list after submission
      }
    });
  }

  // Load expenses from the service and update the data source
  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.totalExpenses = data.length;
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  openTrendFilterDialog() {
    const dialogRef = this.dialog.open(ExpenseTrendsComponent, {
    width: '1000px',
    data: { categories: this.availableCategories } 
  });

  }
}