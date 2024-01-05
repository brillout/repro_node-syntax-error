Node.js version: `18.15.0`.

## Error object

```
node repro-syntax-error/load-2.js
```

## Original error

Run:

```
pnpm install
node ./node_modules/@mui/material/Button/index.js
```

Observe:

```
(node:9762) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/romu/tmp/vite-ssr-project/node_modules/.pnpm/@mui+material@5.14.4_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Button/index.js:3
export { default } from './Button';
^^^^^^

SyntaxError: Unexpected token 'export'
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1176:20)
    at Module._compile (node:internal/modules/cjs/loader:1218:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.15.0
```

## Error catched by vite-plugin-ssr

To get the error object, insert the following.

```diff
// ./node_modules/vite-plugin-ssr/dist/cjs/node/prerender/runPrerender.js

// Line 32-34

 async function prerenderFromCLI(options) {
+    try {
     await runPrerender(options, '$ vite-plugin-ssr prerender');
+    }catch(err){
+      console.log(
+        [
+          '{',
+          `  message: ${JSON.stringify(err.message)},`,
+          `  code: ${JSON.stringify(err.code)},`,
+          '  stack: `\n' + err.stack + '\n`',
+          '}'
+        ].join('\n')
+      )
+    }
 }
```

Run:

```
pnpm run build
pnpm exec vite-plugin-ssr prerender
```

Observe:

```
{
  message: "Unexpected token 'export'",
  code: undefined,
  stack: `
/home/romu/tmp/vite-ssr-project/node_modules/.pnpm/@mui+material@5.14.4_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Button/index.js:3
export { default } from './Button';
^^^^^^

SyntaxError: Unexpected token 'export'
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1176:20)
    at Module._compile (node:internal/modules/cjs/loader:1218:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:169:29)
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
`
}
```

## Node.js behavior

Node.js adds the following preamble to `err.stack`:

```
/home/romu/tmp/vite-ssr-project/node_modules/.pnpm/@mui+material@5.14.4_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Button/index.js:3
export { default } from './Button';
^^^^^^
```

This behavior of Node.js seems erratic, see reproduction at `./repro-syntax-error/`.

Node.js version: `18.15.0`.
