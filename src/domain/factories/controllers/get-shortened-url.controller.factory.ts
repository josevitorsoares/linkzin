import { GetShortenedUrlController } from "@controllers/get-shortened-url.controller";
import { makeGetShortenedUrlUseCase } from "@factories/usecases";

export const makeGetShortenedUrlController = () => {
  const getShortenedUrlUseCase = makeGetShortenedUrlUseCase();

  const getShortenedUrlController = new GetShortenedUrlController(
    getShortenedUrlUseCase,
  );

  return getShortenedUrlController;
};
