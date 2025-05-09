import {
  makeGetShortenedUrlController,
  makeShortUrlController,
} from "@factories/controllers";
import { FastifyInstance } from "fastify";

export const urlRoutes = async (app: FastifyInstance) => {
  app.get("/:hash", async (request, reply) => {
    const shortUrlController = makeGetShortenedUrlController();

    return shortUrlController.handle(request, reply);
  });

  app.post("/create", async (request, reply) => {
    const shortUrlController = makeShortUrlController();

    return shortUrlController.handle(request, reply);
  });
};
