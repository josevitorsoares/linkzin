import { URLEntity } from "@entities/url.entity";
import { model, Schema } from "mongoose";

const urlSchema = new Schema<URLEntity>(
  {
    originalUrl: { type: String, required: true },
    hash: { type: String, required: true },
  },
  {
    id: true,
    timestamps: true,
    toObject: { virtuals: true },
  },
);

const URLModel = model<URLEntity>("urls", urlSchema);

export { URLModel };
