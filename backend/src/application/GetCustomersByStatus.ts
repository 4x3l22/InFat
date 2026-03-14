import type { Customer, CustomerStatus } from "../domain/Customer";
import type { CustomerRepository } from "../domain/CustomerRepository";

type Result =
  | { ok: true; rows: Customer[]; total: number; page: number; limit: number }
  | { ok: false; error: string };

const VALID_STATUSES: CustomerStatus[] = ["PENDING", "ACCEPTED", "REJECTED"];

export class GetCustomersByStatus {
  constructor(private readonly repo: CustomerRepository) {}

  execute(status: string, page: number, limit: number): Result {
    if (!VALID_STATUSES.includes(status as CustomerStatus)) {
      return { ok: false, error: "Estado inválido. Use PENDING, ACCEPTED o REJECTED." };
    }
    const filtered = this.repo.getByStatus(status as CustomerStatus);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const rows = filtered.slice(start, start + limit);
    return { ok: true, rows, total, page, limit };
  }
}
