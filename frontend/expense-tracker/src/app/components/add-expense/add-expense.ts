import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule, CommonModule, ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './add-expense.html',
  styleUrls: ['./add-expense.css']
})

// Component to add a new expense
export class AddExpenseComponent {
  description: string = '';
  amount: number = 0;
  category: string = '';
  date: string = '';

  constructor(private expenseService: ExpenseService, private dialogRef: MatDialogRef<AddExpenseComponent>) {}
  
  // Method to handle form submission, creates a new expense object and calls the service to add it
  onSubmitExpense() {

    const newExpense = {
      description: this.description,
      amount: this.amount,
      category: this.category,
      date: this.date
    };

    this.expenseService.addExpense(newExpense).subscribe({
      next: () => {
        this.expenseService.notifyExpensesChanged();
        this.dialogRef.close('submitted');
      },
      error: (err) => {
        console.error('Failed to add expense:', err);
      },
    });

  
}

}
