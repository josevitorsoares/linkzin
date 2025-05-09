export interface IShortUrlUseCase {
  execute(
    url: string,
    options?: {
      customAlias?: string;
    },
  ): Promise<string>;
}
