import { PrismaClient } from "./generated/client/deno/edge.ts";

const db = new PrismaClient({
  datasources: {
    db: {
      url: Deno.env.get("DATABASE_URL"),
    },
  },
});

export default db;
