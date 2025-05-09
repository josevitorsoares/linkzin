import { URLEntity } from "@entities/url.entity";
import { Document, Types } from "mongoose";

export type UrlMongooseModel = Document<unknown, {}, URLEntity, {}> &
  URLEntity & {
    _id: Types.ObjectId;
  };
