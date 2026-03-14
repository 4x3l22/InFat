import express, { type Request, type Response } from "express";
import cors from "cors";
import { CustomerInMemoryRepository } from "./CustomerInMemoryRepository";
import { GetAllCustomers } from "../application/GetAllCustomers";
import { GetCustomersByStatus } from "../application/GetCustomersByStatus";

const app = express();
app.use(cors());

const repo = new CustomerInMemoryRepository();
const getAllCustomers = new GetAllCustomers(repo);
const getCustomersByStatus = new GetCustomersByStatus(repo);

app.get("/customers/by-status/:status", (req: Request, res: Response) => {
  const rawPage  = parseInt(String(req.query["page"]  ?? ""), 10);
  const rawLimit = parseInt(String(req.query["limit"] ?? ""), 10);
  const page  = isNaN(rawPage)  || rawPage  < 1 ? 1  : rawPage;
  const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : rawLimit;
  const result = getCustomersByStatus.execute(String(req.params["status"] ?? ""), page, limit);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.json({ rows: result.rows, total: result.total, page: result.page, limit: result.limit });
});

app.get("/customers", (_req: Request, res: Response) => {
  res.json(getAllCustomers.execute());
});

export { app };
