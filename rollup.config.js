import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import html, { makeHtmlAttributes } from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    resolve(),
    commonjs(),
    typescript(),
    html({
      template({ attributes, files, meta, publicPath, title }) {
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join("\n");

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join("\n");

        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join("\n");

        return `
          <!doctype html>
          <html${makeHtmlAttributes(attributes.html)}>
            <head>
              ${metas}
              <title>${title}</title>
              ${links}
              <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script
            </head>
            <body>
              ${scripts}
            </body>
          </html>`;
      },
    }),
    process.env.NODE_ENV === "development" &&
      serve({
        open: true,
        contentBase: ["dist"],
      }),
    process.env.NODE_ENV === "development" && livereload(),
  ],
  external: ["react", "react-dom"],
};
