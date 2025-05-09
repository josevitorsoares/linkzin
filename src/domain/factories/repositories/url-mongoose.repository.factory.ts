import { IUrlRepository } from "@domain/repositories/url.repository.interface";
import { URLModel } from "@models/url.model";
import { UrlMongooseRepository } from "@mongoose/repositories/url.repository";

export const makeUrlMongooseRepository = (): IUrlRepository => {
  const urlMongooseRepository = new UrlMongooseRepository(URLModel);

  return urlMongooseRepository;
};
