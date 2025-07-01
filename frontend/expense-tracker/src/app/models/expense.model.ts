// Structure for an Expense object in the expense tracker application
export interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: string; 
}
