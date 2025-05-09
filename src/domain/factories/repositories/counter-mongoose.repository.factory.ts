import { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { CounterModel } from "@models/counters.model";
import { CounterMongooseRepository } from "@mongoose/repositories/counter.repository";

export const makeCounterMongooseRepository = (): ICounterRepository => {
  const counterMongooseRepository = new CounterMongooseRepository(CounterModel);

  return counterMongooseRepository;
};
