export interface ICounterRepository {
  increment(): Promise<void>;

  findById(id: string): Promise<number | null>;
}
