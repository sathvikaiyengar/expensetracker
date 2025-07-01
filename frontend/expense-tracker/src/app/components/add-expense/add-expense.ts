import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  expenseForm: FormGroup;

  constructor(private expenseService: ExpenseService, private dialogRef: MatDialogRef<AddExpenseComponent>) {
    this.expenseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }
  
  // Method to handle form submission, creates a new expense object and calls the service to add it
  onSubmitExpense() {
    const expense = this.expenseForm.value;
    const newExpense = {
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
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
