import { IUrlRepository } from "@domain/repositories/url.repository.interface";
import { UrlInputDTO, UrlOutputDTO } from "@dtos/url.dto";
import { URLModel } from "@models/url.model";
import { UrlMongooseModelMapper } from "../mappers";

export class UrlMongooseRepository implements IUrlRepository {
  constructor(private readonly _urlModel: typeof URLModel) {}

  async findByHash(hash: string): Promise<UrlOutputDTO | null> {
    const url = await this._urlModel.findOne({ hash });

    if (!url) {
      return null;
    }

    return UrlMongooseModelMapper.toModel(url);
  }

  async create(data: UrlInputDTO): Promise<UrlOutputDTO> {
    const { originalUrl, hash } = data;

    const newURL = await this._urlModel.create({
      originalUrl,
      hash,
    });

    return UrlMongooseModelMapper.toModel(newURL);
  }
}
