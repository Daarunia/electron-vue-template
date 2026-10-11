import { execFileSync } from 'node:child_process'
import path from 'node:path'
import compile from './private/tsc.js'
import { ROOT } from './private/paths.js'

/**
 * Compile the main
 */
export async function compileMain() {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build.js')], {
    stdio: 'inherit',
  })
  await compile(path.join(ROOT, 'src', 'main'))
}

/**
 * Electron launch arguments
 */
export function electronArgs(rendererPort, extraArgs = []) {
  return [path.join(ROOT, 'build', 'main', 'main.js'), String(rendererPort), ...extraArgs]
}

/**
 * Start the renderer
 *
 * @param {import('vite').ServerOptions} [server] Server options, on top of those from vite.config.mjs
 */
export async function startRenderer(server = {}) {
  // Lazy import, so modules importing this file without starting Vite
  // do not load Vite and rolldown for nothing
  const { createServer } = await import('vite')
  let viteServer = await createServer({
    configFile: path.join(ROOT, 'vite.config.mjs'),
    mode: 'development',
    server,
  })
  return viteServer.listen()
}
