import { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { COUNTER_OBJECT_ID } from "@environment/env";
import { CounterModel } from "@models/counters.model";
import { Types } from "mongoose";

export class CounterMongooseRepository implements ICounterRepository {
  constructor(private readonly _counterModel: typeof CounterModel) {}

  async increment(): Promise<void> {
    await this._counterModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(COUNTER_OBJECT_ID),
      },
      { $inc: { count: 1 } },
    );
  }

  async findById(id: string): Promise<number | null> {
    const document = await this._counterModel.findById(id);

    if (!document) {
      return null;
    }

    return document.count;
  }
}
