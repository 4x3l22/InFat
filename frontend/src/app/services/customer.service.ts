import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type CustomerStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Customer {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ rows: Customer[]; total: number }> {
    return this.http.get<{ rows: Customer[]; total: number }>(`${this.baseUrl}/customers`);
  }

  getByStatus(status: CustomerStatus): Observable<{ rows: Customer[]; total: number }> {
    return this.http.get<{ rows: Customer[]; total: number }>(`${this.baseUrl}/customers/by-status/${status}`);
  }
}
