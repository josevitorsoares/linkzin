import { ShortUrlController } from "@controllers/short-url.controller";
import { makeShortUrlUseCase } from "@factories/usecases";

export const makeShortUrlController = () => {
  const shortUrlUseCase = makeShortUrlUseCase();

  const shortUrlController = new ShortUrlController(shortUrlUseCase);

  return shortUrlController;
};
