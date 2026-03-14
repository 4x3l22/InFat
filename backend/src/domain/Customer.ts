export type CustomerStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Customer {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  created: string;
}
