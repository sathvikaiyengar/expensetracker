import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list';
import { HttpClientModule } from '@angular/common/http';
import { SummaryStatsComponent } from './components/summary-stats/summary-stats/summary-stats';


@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [ExpenseListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',

})
export class App {
  protected title = 'expense-tracker';
}
