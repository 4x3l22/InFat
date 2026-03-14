import type { Customer } from "../domain/Customer";
import type { CustomerRepository } from "../domain/CustomerRepository";

export class GetAllCustomers {
  constructor(private readonly repo: CustomerRepository) {}

  execute(): { rows: Customer[]; total: number } {
    const rows = this.repo.getAll();
    return { rows, total: rows.length };
  }
}
