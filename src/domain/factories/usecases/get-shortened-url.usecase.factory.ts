import { IGetShortenedUrlUseCase } from "@domain/usecases/get-shortened-url.usecase.interface";
import { makeUrlMongooseRepository } from "@factories/repositories";
import { GetShortenedUrlUseCase } from "@usecases/get-shortened-url.usecase";

export const makeGetShortenedUrlUseCase = (): IGetShortenedUrlUseCase => {
  const urlRepository = makeUrlMongooseRepository();

  const getShortenedUrlUseCase = new GetShortenedUrlUseCase(urlRepository);

  return getShortenedUrlUseCase;
};
