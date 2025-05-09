import { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { IUrlRepository } from "@domain/repositories/url.repository.interface";
import { IShortUrlUseCase } from "@domain/usecases/short-url.usecase.interface";
import { API_URL, COUNTER_OBJECT_ID } from "@environment/env";
import { CounterNotFoundError } from "@errors/counter-not-found.error";
import { HashHelper } from "@helpers/hash.helper";

export class ShortUrlUseCase implements IShortUrlUseCase {
  constructor(
    private readonly _urlRepository: IUrlRepository,
    private readonly _counterRepository: ICounterRepository,
  ) {}

  async execute(url: string): Promise<string> {
    const counter = await this._counterRepository.findById(COUNTER_OBJECT_ID);

    if (typeof counter !== "number") {
      throw new CounterNotFoundError();
    }

    const hash = HashHelper.generateHash(counter);

    await this._urlRepository.create({
      hash,
      originalUrl: url,
    });

    await this._counterRepository.increment();

    const shortedUrl = `${API_URL}/${hash}`;

    return shortedUrl;
  }
}
