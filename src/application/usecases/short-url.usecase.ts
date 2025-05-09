import { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { IUrlRepository } from "@domain/repositories/url.repository.interface";
import { IShortUrlUseCase } from "@domain/usecases/short-url.usecase.interface";
import {
  API_URL,
  COUNTER_OBJECT_ID,
  MAX_CUSTOM_ALIAS_LENGTH,
  MIN_CUSTOM_ALIAS_LENGTH,
} from "@environment/env";
import { CounterNotFoundError } from "@errors/counter-not-found.error";
import { CustomAliasAlreadyExistsError } from "@errors/custom-alias-already-exists.error";
import { CustomAliasLengthError } from "@errors/custom-alias-length.error";
import { HashHelper } from "@helpers/hash.helper";

export class ShortUrlUseCase implements IShortUrlUseCase {
  constructor(
    private readonly _urlRepository: IUrlRepository,
    private readonly _counterRepository: ICounterRepository,
  ) {}

  async execute(
    url: string,
    options: { customAlias?: string } = {
      customAlias: undefined,
    },
  ): Promise<string> {
    const { customAlias } = options;

    const counter = await this._counterRepository.findById(COUNTER_OBJECT_ID);

    if (typeof counter !== "number") {
      throw new CounterNotFoundError();
    }

    if (customAlias) {
      const existingUrl = await this._urlRepository.findByHash(customAlias);

      if (existingUrl) {
        throw new CustomAliasAlreadyExistsError();
      }

      if (
        customAlias.length < MIN_CUSTOM_ALIAS_LENGTH ||
        customAlias.length > MAX_CUSTOM_ALIAS_LENGTH
      ) {
        throw new CustomAliasLengthError();
      }

      await this._urlRepository.create({
        hash: customAlias,
        originalUrl: url,
      });

      await this._counterRepository.increment();

      return `${API_URL}/${customAlias}`;
    }

    const hash = HashHelper.generateHash(counter);

    await this._urlRepository.create({
      hash,
      originalUrl: url,
    });

    await this._counterRepository.increment();

    return `${API_URL}/${hash}`;
  }
}
