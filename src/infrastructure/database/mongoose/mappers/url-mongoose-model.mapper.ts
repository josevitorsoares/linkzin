import { UrlMongooseModel } from "../types";

type UrlModelOutput = {
  id: string;
  originalUrl: string;
  hash: string;
  createdAt: Date;
};

export class UrlMongooseModelMapper {
  static toModel(url: UrlMongooseModel): UrlModelOutput {
    return {
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      hash: url.hash,
      createdAt: url.createdAt,
    };
  }
}
