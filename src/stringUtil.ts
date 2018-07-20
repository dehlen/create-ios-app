export default class StringUtility {
  constructor() {}

  removeTrailingDot(string: string): string {
    return string.replace(/\.$/, '')
  }

  removeTrailingSlash(string: string): string {
    return string.replace(/\/$/, '')
  }
}
