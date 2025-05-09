import { UrlInputDTO, UrlOutputDTO } from "@dtos/url.dto";

export interface IUrlRepository {
  findByHash(hash: string): Promise<UrlOutputDTO | null>;

  create(data: UrlInputDTO): Promise<UrlOutputDTO>;
}
