export interface IShortUrlUseCase {
  execute(url: string): Promise<string>;
}
