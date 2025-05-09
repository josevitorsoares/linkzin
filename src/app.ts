import { connectDatabase } from "@configs/database/mongoose.database";
import { CounterNotFoundError } from "@errors/counter-not-found.error";
import { UrlNotFoundError } from "@errors/url-not-found.error";
import fastify from "fastify";
import { urlRoutes } from "./infrastructure";

export const app = fastify();

app.register(urlRoutes);

// # Connect to MongoDB
connectDatabase();

// This is a global error handler for the Fastify app.
app.setErrorHandler((error, _, reply) => {
  if (error instanceof UrlNotFoundError || CounterNotFoundError) {
    reply.status(404).send({
      message: error.message,
    });
  }

  reply.status(500).send({
    message: "Internal server error",
    error: error.message,
  });
});
 