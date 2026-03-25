import app from "./infrastructure/server";

const PORT = 3030;

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:${PORT}`);
