import { IGetShortenedUrlUseCase } from "@domain/usecases/get-shortened-url.usecase.interface";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetShortenedUrlController {
  constructor(
    private readonly _getShortenedUrlUseCase: IGetShortenedUrlUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { hash } = request.params as { hash: string };

      const shortedUrl = await this._getShortenedUrlUseCase.execute(hash);

      reply.status(302).redirect(encodeURI(shortedUrl));
    } catch (error: any) {
      reply.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
