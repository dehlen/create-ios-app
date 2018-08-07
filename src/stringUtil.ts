export default class StringUtility {
  constructor() {}

  removeTrailingDot(string: string): string {
    return string.replace(/\.$/, '')
  }

  removeTrailingSlash(string: string): string {
    return string.replace(/\/$/, '')
  }

  camelize(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
      })
      .replace(/\s+/g, '')
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
