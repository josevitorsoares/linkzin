import { IShortUrlUseCase } from "@domain/usecases/short-url.usecase.interface";
import { FastifyReply, FastifyRequest } from "fastify";

export class ShortUrlController {
  constructor(private readonly _shortUrlUseCase: IShortUrlUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { originalUrl } = request.body as { originalUrl: string };

      const shortedUrl = await this._shortUrlUseCase.execute(originalUrl);

      reply.status(201).send({ shortedUrl });
    } catch (error: any) {
      reply.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
