import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { cjsInterop } from "vite-plugin-cjs-interop";
// import vercel from "vite-plugin-vercel";
// import vercelSsr from "@magne4000/vite-plugin-vercel-ssr";

export default defineConfig(async ({ command, mode }) => {
  console.log("defineConfig", command, mode);
  return {
    plugins: [
      react(),
      ssr({
        // Use the default pre-render config:
        // prerender: true,
        ...(process.env.NODE_ENV === "production"
          ? {
              noExternal: [
                "@mui/material",
                // "react-bootstrap",              
              ],
            }
          : { noExternal: [] }),
      }),
      cjsInterop({
        // List of CJS dependencies that require interop
        dependencies: [
          "@mui/material/*",
          // "react-bootstrap/*"
        ],
      }),
      // vercel(),
      // vercelSsr(),
    ],
  };
});
