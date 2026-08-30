# Package tarball playground

The regular demo imports `../dist/index.js`. For the closest check to a real npm installation, build and pack the library first from the repository root:

```bash
npm run build
npm pack
```

Then create a temporary project outside this repository. Replace the tarball path with the actual path on your machine:

```bash
mkdir tsundere-console-playground
cd tsundere-console-playground
npm init -y
npm install ../path/to/tsundere-console/tsundere-console-0.1.0.tgz
```

Create `index.mjs`:

```js
import { tsundere } from "tsundere-console";

tsundere.success("It works!");
tsundere.error("Something went wrong");

tsundere.dir({
  package: "tsundere-console",
  version: "0.1.0",
});
```

Run it:

```bash
node index.mjs
```

This verifies the packed file list, package `exports`, ESM entry point, and runtime behavior. To check CommonJS as well, use `require("tsundere-console")` from a `.cjs` file. The package also includes its generated `.d.ts` and `.d.cts` declarations for a TypeScript consumer to resolve.

Generated `*.tgz` files are ignored by Git and are not part of the published package's `files` allowlist.
