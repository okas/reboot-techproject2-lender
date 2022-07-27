export function toTitleCase(phrase: string) {
  return `${phrase.charAt(0).toUpperCase()}${phrase.slice(1).toLowerCase()}`;
}
