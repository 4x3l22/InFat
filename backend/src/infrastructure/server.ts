import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { CustomerInMemoryRepository } from "./CustomerInMemoryRepository";
import { GetAllCustomers } from "../application/GetAllCustomers";
import { GetCustomersByStatus } from "../application/GetCustomersByStatus";

const app = express();
app.use(cors());

const repo = new CustomerInMemoryRepository();
const getAllCustomers = new GetAllCustomers(repo);
const getCustomersByStatus = new GetCustomersByStatus(repo);

const MAX_LIMIT = 100;

app.get("/customers/by-status/:status", (req: Request, res: Response) => {
  try {
    const rawPage  = parseInt(String(req.query["page"]  ?? ""), 10);
    const rawLimit = parseInt(String(req.query["limit"] ?? ""), 10);
    const page  = isNaN(rawPage)  || rawPage  < 1 ? 1  : rawPage;
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, MAX_LIMIT);
    const result = getCustomersByStatus.execute(String(req.params["status"] ?? ""), page, limit);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.json({ rows: result.rows, total: result.total, page: result.page, limit: result.limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.get("/customers", (_req: Request, res: Response) => {
  try {
    res.json(getAllCustomers.execute());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor." });
});

export { app };
