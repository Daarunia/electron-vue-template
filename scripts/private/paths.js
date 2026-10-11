import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Project root, computed once here instead of in every script
export const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../..')
