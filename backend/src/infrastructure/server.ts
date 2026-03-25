import { Hono } from "hono";
import { cors } from "hono/cors";
import { CustomerInMemoryRepository } from "./CustomerInMemoryRepository";
import { GetAllCustomers } from "../application/GetAllCustomers";
import { GetCustomersByStatus } from "../application/GetCustomersByStatus";

const app = new Hono();
app.use(cors());

const repo = new CustomerInMemoryRepository();
const getAllCustomers = new GetAllCustomers(repo);
const getCustomersByStatus = new GetCustomersByStatus(repo);

const MAX_LIMIT = 100;

app.get("/customers/by-status/:status", (c) => {
  try {
    const rawPage  = parseInt(c.req.query("page")  ?? "", 10);
    const rawLimit = parseInt(c.req.query("limit") ?? "", 10);
    const page  = isNaN(rawPage)  || rawPage  < 1 ? 1  : rawPage;
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, MAX_LIMIT);
    const result = getCustomersByStatus.execute(c.req.param("status"), page, limit);
    if (!result.ok) {
      return c.json({ error: result.error }, 400);
    }
    return c.json({ rows: result.rows, total: result.total, page: result.page, limit: result.limit });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error interno del servidor." }, 500);
  }
});

app.get("/customers", (c) => {
  try {
    return c.json(getAllCustomers.execute());
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error interno del servidor." }, 500);
  }
});

app.notFound((c) => c.json({ error: "Ruta no encontrada." }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Error interno del servidor." }, 500);
});

export default app;
