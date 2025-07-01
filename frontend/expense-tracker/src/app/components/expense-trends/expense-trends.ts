import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TrendsChartComponent } from '../../trends-chart/trends-chart';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-trends',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TrendsChartComponent,

  // Material modules
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule],
  templateUrl: './expense-trends.html',
  styleUrl: './expense-trends.css'
})
export class ExpenseTrendsComponent {
  form: FormGroup;
  categories: string[];
  chartData: Expense[] = [];


  constructor(
    public dialogRef: MatDialogRef<ExpenseTrendsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] },
    private fb: FormBuilder,
    private expenseService: ExpenseService
  ) {
    this.categories = data.categories;
    this.form = this.fb.group({
      category: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const filters = this.form.value;
  this.expenseService.getExpensesByDateRangeCat(
    filters.startDate,
    filters.endDate,
    filters.category
  ).subscribe((data: any[]) => {
   console.log('Filtered data:', data);
    this.chartData = data.map((arr: any[]) => ({
      id: arr[0],
      description: arr[1],
      amount: arr[2],
      category: arr[3],
      date: arr[4],
    }));
  });
}
  }

}
