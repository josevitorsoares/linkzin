import { makeShortUrlController } from "@factories/controllers";
import { FastifyInstance } from "fastify";

export const urlRoutes = async (app: FastifyInstance) => {
  app.post("/create", async (request, reply) => {
    const shortUrlController = makeShortUrlController();

    return shortUrlController.handle(request, reply);
  });
};
