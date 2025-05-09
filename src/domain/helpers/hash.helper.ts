export class HashHelper {
  private static readonly ALPHABET: string =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private static readonly MAX_HASH_LENGTH: number = 7;

  /**
   * Convert a given number to a base 62 string.
   *
   * @param num The number to convert.
   * @returns The base 62 string representation of the number.
   */
  private static _toBase62(num: number): string {
    const value = Math.abs(num);

    let hash: string = "";

    do {
      const remainder = value % 62;

      hash += this.ALPHABET[remainder];
      num = Math.floor(value / 62);
    } while (num > 0);

    return hash;
  }

  /**
   * Checks if a given string has more than 3 repeats of any character.
   *
   * @param hash The string to check.
   * @returns True if the string has more than 3 repeats of any character, false otherwise.
   */
  private static _hasTooManyRepeats(hash: string): boolean {
    const counts = new Map<string, number>();
    for (const char of hash) {
      const count = (counts.get(char) || 0) + 1;

      if (count > 3) {
        return true;
      }

      counts.set(char, count);
    }

    return false;
  }

  /**
   * Checks if a given string has a triple sequence of any character.
   *
   * @param hash The string to check.
   * @returns True if the string has a triple sequence of any character, false otherwise.
   */
  private static _hasTripleSequence(hash: string): boolean {
    for (let i = 0; i < hash.length - 2; i++) {
      if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
        return true;
      }
    }

    return false;
  }

  /**
   * Shuffles a given base string and adds random characters to it until it reaches the given length.
   * The string is shuffled in-place, and the new characters are appended to the end.
   * @param base The base string to shuffle.
   * @param length The desired length of the shuffled string.
   * @returns The shuffled string.
   */
  private static _shuffleHash(base: string, length: number): string {
    const chars = base.split("");

    while (chars.length < length) {
      chars.push(this.ALPHABET[Math.floor(Math.random() * 62)]);
    }

    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.slice(0, length).join("");
  }

  static generateHash(num: number): string {
    const base62 = this._toBase62(num);
    let hash = base62;

    while (hash.length < this.MAX_HASH_LENGTH) {
      const randChar = this.ALPHABET[Math.floor(Math.random() * 62)];
      const insertPosition = Math.floor(Math.random() * (hash.length + 1));
      hash =
        hash.slice(0, insertPosition) + randChar + hash.slice(insertPosition);
    }

    if (hash.length > this.MAX_HASH_LENGTH) {
      hash = hash.slice(0, this.MAX_HASH_LENGTH);
    }

    while (this._hasTooManyRepeats(hash) || this._hasTripleSequence(hash)) {
      hash = this._shuffleHash(hash, this.MAX_HASH_LENGTH);
    }

    return hash;
  }
}
