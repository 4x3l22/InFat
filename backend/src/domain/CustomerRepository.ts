import type { Customer, CustomerStatus } from "./Customer";

export interface CustomerRepository {
  getAll(): Customer[];
  getByStatus(status: CustomerStatus): Customer[];
}
