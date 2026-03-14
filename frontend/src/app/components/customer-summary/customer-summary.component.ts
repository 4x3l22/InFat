import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer, CustomerStatus } from '../../services/customer.service';

@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customer-summary.component.html',
  styleUrl: './customer-summary.component.css'
})
export class CustomerSummaryComponent implements OnInit {
  loading: boolean = true;
  hasError: boolean = false;
  countPending: number = 0;
  countAccepted: number = 0;
  countRejected: number = 0;
  allCustomers: Customer[] = [];
  selectedFilter: CustomerStatus | 'ALL' = 'ALL';
  filteredCustomers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: (data: { rows: Customer[]; total: number }) => {
        this.allCustomers      = data.rows;
        this.filteredCustomers = data.rows;
        this.countPending  = data.rows.filter(c => c.status === 'PENDING').length;
        this.countAccepted = data.rows.filter(c => c.status === 'ACCEPTED').length;
        this.countRejected = data.rows.filter(c => c.status === 'REJECTED').length;
        this.loading = false;
      },
      error: () => {
        this.hasError = true;
        this.loading  = false;
      }
    });
  }

  onFilterChange(): void {
    if (this.selectedFilter === 'ALL') {
      this.filteredCustomers = this.allCustomers;
    } else {
      this.filteredCustomers = this.allCustomers.filter(
        c => c.status === this.selectedFilter
      );
    }
  }
}
