import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/get-expenses`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}/expenses`, expense);
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/expenses/total`);
  }

  getByCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/expenses/total-by-category`);
  }
}
