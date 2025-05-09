export interface IGetShortenedUrlUseCase {
  execute(hash: string): Promise<string>;
}
