import { CounterEntity } from "@entities/counter.entity";
import { model, Schema } from "mongoose";

const counterSchema = new Schema<CounterEntity>(
  {
    count: { type: Number, required: true },
  },
  {
    id: true,
    timestamps: true,
    toObject: { virtuals: true },
  },
);

const CounterModel = model<CounterEntity>("counters", counterSchema);

export { CounterModel };
