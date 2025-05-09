import { IShortUrlUseCase } from "@domain/usecases/short-url.usecase.interface";
import { FastifyReply, FastifyRequest } from "fastify";

export class ShortUrlController {
  constructor(private readonly _shortUrlUseCase: IShortUrlUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { originalUrl, customAlias } = request.body as {
      originalUrl: string;
      customAlias?: string;
    };

    const shortedUrl = await this._shortUrlUseCase.execute(originalUrl, {
      customAlias,
    });

    reply.status(201).send({ shortedUrl });
  }
}
