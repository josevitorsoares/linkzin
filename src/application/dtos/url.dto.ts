import { URLEntity } from "@entities/url.entity";

export type UrlInputDTO = {
  originalUrl: string;
  hash: string;
};

export type UrlOutputDTO = URLEntity;
