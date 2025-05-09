import { IUrlRepository } from "@domain/repositories/url.repository.interface";
import { IGetShortenedUrlUseCase } from "@domain/usecases/get-shortened-url.usecase.interface";
import { UrlNotFoundError } from "@errors/url-not-found.error";

export class GetShortenedUrlUseCase implements IGetShortenedUrlUseCase {
  constructor(private readonly _urlRepository: IUrlRepository) {}

  async execute(hash: string): Promise<string> {
    const url = await this._urlRepository.findByHash(hash);

    if (!url) {
      throw new UrlNotFoundError();
    }

    return url.originalUrl;
  }
}
