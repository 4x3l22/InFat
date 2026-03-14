import type { Customer, CustomerStatus } from "../domain/Customer";
import type { CustomerRepository } from "../domain/CustomerRepository";

const CUSTOMERS: Customer[] = [
  { id: "1",  name: "Laura",     last_name: "Gómez",    email: "lgomez@mail.com",    phone: "3001234567", status: "PENDING",  created: "2024-01-10T08:00:00Z" },
  { id: "2",  name: "Carlos",    last_name: "Ruiz",     email: "cruiz@mail.com",     phone: "3109876543", status: "ACCEPTED", created: "2024-01-12T09:30:00Z" },
  { id: "3",  name: "Sofía",     last_name: "Martínez", email: "smartinez@mail.com", phone: "3205551234", status: "REJECTED", created: "2024-01-14T11:00:00Z" },
  { id: "4",  name: "Andrés",    last_name: "López",    email: "alopez@mail.com",    phone: "3154449900", status: "PENDING",  created: "2024-02-01T07:45:00Z" },
  { id: "5",  name: "Valentina", last_name: "Torres",   email: "vtorres@mail.com",   phone: "3007778899", status: "ACCEPTED", created: "2024-02-03T10:15:00Z" },
  { id: "6",  name: "Miguel",    last_name: "Herrera",  email: "mherrera@mail.com",  phone: "3112223344", status: "PENDING",  created: "2024-02-10T14:00:00Z" },
  { id: "7",  name: "Isabella",  last_name: "Vargas",   email: "ivargas@mail.com",   phone: "3206667788", status: "ACCEPTED", created: "2024-02-15T16:30:00Z" },
  { id: "8",  name: "Felipe",    last_name: "Castro",   email: "fcastro@mail.com",   phone: "3001112233", status: "REJECTED", created: "2024-03-01T09:00:00Z" },
  { id: "9",  name: "Natalia",   last_name: "Díaz",     email: "ndiaz@mail.com",     phone: "3158889900", status: "PENDING",  created: "2024-03-05T11:30:00Z" },
  { id: "10", name: "Sebastián", last_name: "Moreno",   email: "smoreno@mail.com",   phone: "3204445566", status: "ACCEPTED", created: "2024-03-10T13:00:00Z" },
];

export class CustomerInMemoryRepository implements CustomerRepository {
  getAll(): Customer[] {
    return [...CUSTOMERS];
  }

  getByStatus(status: CustomerStatus): Customer[] {
    return CUSTOMERS.filter(c => c.status === status);
  }
}
