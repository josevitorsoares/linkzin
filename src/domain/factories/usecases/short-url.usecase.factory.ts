import { IShortUrlUseCase } from "@domain/usecases/short-url.usecase.interface";
import { makeUrlMongooseRepository } from "@factories/repositories";
import { makeCounterMongooseRepository } from "@factories/repositories/counter-mongoose.repository.factory";
import { ShortUrlUseCase } from "@usecases/short-url.usecase";

export const makeShortUrlUseCase = (): IShortUrlUseCase => {
  const urlRepository = makeUrlMongooseRepository();
  const counterRepository = makeCounterMongooseRepository();

  const shortUrlUseCase = new ShortUrlUseCase(urlRepository, counterRepository);

  return shortUrlUseCase;
};
