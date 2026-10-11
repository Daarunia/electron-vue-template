<div align="center">

# Electron Vue Template

![License](https://img.shields.io/github/license/Daarunia/electron-vue-template)
![Electron](https://img.shields.io/github/package-json/dependency-version/Daarunia/electron-vue-template/dev/electron)
![Vite](https://img.shields.io/github/package-json/dependency-version/Daarunia/electron-vue-template/dev/vite)
![Vue](https://img.shields.io/github/package-json/dependency-version/Daarunia/electron-vue-template/dev/vue)

<img width="794" alt="image" src="https://user-images.githubusercontent.com/32544586/222748627-ee10c9a6-70d2-4e21-b23f-001dd8ec7238.png">

A minimal, up to date starter for a **Vue 3** + **Electron** TypeScript application, built with **Vite** and packaged with **Electron Builder**.

</div>

## About

[Vite](https://vitejs.dev) builds and serves the Vue renderer with Hot Module Replacement ⚡, while the main process is compiled with `tsc` and restarted automatically on every change.

[Electron Builder](https://www.electron.build/) packages the application into distributable installers for Windows, macOS and Linux 😎

This template is the base of [NexTask](https://github.com/Daarunia/NexTask), a desktop Kanban app built on the same tooling.

## What's different from the original template

This project started from [Deluze/electron-vue-template](https://github.com/Deluze/electron-vue-template) and has been modernized.

- **Up to date stack**: Electron 44, Vite 8, Vue 3.5, TypeScript 6, Electron Builder 26.
- **ESM everywhere**: `"type": "module"`, the build scripts, the Vite config (`vite.config.mjs`) and the main process (`nodenext`) all use native ES modules.
- **Sandboxed preload**: the preload lives in `src/main/preload/` with its own CommonJS tsconfig, so the window runs with `sandbox: true` and `contextIsolation: true`.
- **Stricter build**: `scripts/build.js` compiles main, preload and renderer in sequence and exits with an error code when something fails, instead of silently succeeding.
- **Type checking**: `npm run typecheck` checks the main process with `tsc` and the Vue files with `vue-tsc`.
- **`.env` support**: variables from a root `.env` file are loaded in development, for both main and renderer.
- **Lighter tooling**: `picocolors` replaces `chalk`, the local `tsc` binary is used instead of a global one.
- **Smaller installers**: source maps and `node_modules` docs are excluded from the package, static files are shipped as extra resources.
- **Prettier** config included.

## Requirements

- [Node.js](https://nodejs.org) 24 (recommended, at least 20.19 for Vite 8)

## Getting started

Click the green **Use this template** button on top of the repository, and clone your own newly created repository.

**Or..**

Clone this repository: `git clone git@github.com:Daarunia/electron-vue-template.git`

### Install dependencies ⏬

```bash
npm install
```

### Start developing ⚒️

```bash
npm run dev
```

## Additional Commands

```bash
npm run dev # starts application with hot reload
npm run build # builds application, distributable files can be found in "dist" folder
npm run build:dev # transpiles main, preload & renderer into "build" without packaging
npm run typecheck # type checks main process and Vue files
npm run format # formats the code with Prettier

# OR

npm run build:win # uses windows as build target
npm run build:mac # uses mac as build target
npm run build:linux # uses linux as build target
```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).

## Project Structure

```bash
- scripts/ # build & dev server scripts, change as you like
- src/
  - main/ # Main process (Electron application source)
    - preload/ # Preload script, compiled to CommonJS
    - static/ # Files shipped next to the app (see below)
  - renderer/ # Renderer process (Vue application source)
- types/ # Typings shared with the renderer (window API, .vue shims)
```

## Exposing APIs to the renderer

The renderer has no access to Node. Expose what it needs in `src/main/preload/preload.ts` with `contextBridge`, then declare the same shape in `types/electron.d.ts` to get typing in Vue files.

## Using static files

If you have any files that you want to ship with your app, add them to the `src/main/static` directory.

Files in said directory are only accessible to the `main` process, similar to `src/renderer/assets` only being accessible to the `renderer` process. In development they are copied to `build/main/static`, in the packaged app they live in the resources folder.

#### Referencing static files from your main process

```ts
/* Assumes src/main/static/myFile.txt exists */

import { app } from 'electron'
import { join, dirname } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticDir = app.isPackaged ? join(process.resourcesPath, 'static') : join(__dirname, 'static')

const buffer = readFileSync(join(staticDir, 'myFile.txt'))
```

## License

[MIT](LICENSE), originally by Deluze.
