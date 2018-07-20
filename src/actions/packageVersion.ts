import { readJSON } from 'fs-extra'
import { join } from 'path'

export default async () => {
  const packageJson = await readJSON(join(__dirname, '../../package.json'))
  return packageJson.version
}
