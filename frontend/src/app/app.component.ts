import { Component } from '@angular/core';
import { CustomerSummaryComponent } from './components/customer-summary/customer-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomerSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
