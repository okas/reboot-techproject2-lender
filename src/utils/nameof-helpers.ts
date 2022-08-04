/**
 * Safe way to get instance keys.
 * @param name
 * @returns Key name.
 * @see {@link [nameof operator](https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html)}
 */
export function nameof<T>(name: keyof T) {
  return name;
}

/**
 * Safe way to get instance keys. Factory allows to reuse variable for specific instance.
 * @returns Key name.
 */
export function nameofFactory<T>() {
  /**
   * Safe way to get instance keys.
   * @param name
   * @returns Key name.
   * @see {@link [nameof operator](https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html)}
   */
  return (name: keyof T) => name;
}
