import { PrismaClient } from "./generated/client/deno/edge.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { config } from "https://deno.land/std@0.163.0/dotenv/mod.ts";

const envVars = await config();

/**
 * Initialize.
 */

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});

const app = new Application();
const router = new Router();

/**
 * Setup routes.
 */

router.get("/", (context) => {
  context.response.body = "Welcome to the Dinosaur API!";
});

router.get("/dinosaurs", async (context) => {
  // Get all dinosaurs.
  const dinosaurs = await prisma.dinosaur.findMany();
  context.response.body = dinosaurs;
});

router.get("/dinosaurs/:id", async (context) => {
  // Get one dinosaur by id.
  const { id } = context.params;
  const dinosaur = await prisma.dinosaur.findUnique({
    where: {
      id: Number(id),
    },
  });
  context.response.body = dinosaur;
});

router.post("/dinosaurs", async (context) => {
  // Create a new dinosaur.
  const { name, description } = await context.request.body({ type: "json" })
    .value;

  const result = await prisma.dinosaur.create({
    data: {
      name,
      description,
    },
  });

  context.response.body = result;
});

router.delete("/dinosaurs/:id", async (context) => {
  // Delete a dinosaur by id.
  const { id } = context.params;
  const dinosaur = await prisma.dinosaur.delete({
    where: {
      id: Number(id),
    },
  });
  context.response.body = dinosaur;
});

/**
 * Setup middleware.
 */

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * Start server.
 */

console.log("Server started on port http://localhost:8000");
await app.listen({ port: 8000 });
