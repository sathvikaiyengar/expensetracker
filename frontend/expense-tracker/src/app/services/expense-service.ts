import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expense.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Service to communicate with backend database for all expense-related operations
export class ExpenseService {

  private baseUrl = 'http://127.0.0.1:5000';

  // BehaviorSubject to track changes in expenses
  private expensesChanged = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // Method to get all expenses as a list
  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/get-expenses`);
  }

  // Method to add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}/add-expenses`, expense);
  }

  // Method to get total expense amount
  getTotalExpenseAmount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/get-total-expenses`);
  }

  // Method to get total expenses by category
  getExpenseAmountByCategory(): Observable<any> {
    return this.http.get<{[category: string]: number }>(`${this.baseUrl}/get-category-total`);
  }

  getExpensesByDateRangeCat(startDate: string, endDate: string, category?: string): Observable<Expense[]> {
    return this.http.post<Expense[]>(`${this.baseUrl}/get-expenses-by-date-cat`, { startDate, endDate, category });
  }

  // Observable for external components to subscribe to updates to expense list
  getExpenseUpdates(): Observable<void> {
    return this.expensesChanged.asObservable();
  }

  // Notification method to inform subscribers about changes
  notifyExpensesChanged() {
    this.expensesChanged.next();
  }
}
