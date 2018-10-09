import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  plugins: [
    replace({
      "process.env.NODE_DEBUG": false,
      "process.env.NODE_ENV": '"production"'
    }),
    resolve({ jsnext: true, main: true }),
    commonjs({ include: "node_modules/**" }),
    babel({
      exclude: "node_modules/**",
      babelrc: false,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-proposal-class-properties"]
    })
  ],
  external: ["react"],
  output: [
    {
      format: "umd",
      file: "dist/react-typeahead.umd.js",
      exports: "named",
      name: "ReactTypeAhead",
      globals: { react: "React" }
    },
    {
      format: "iife",
      file: "dist/react-typeahead.browser.js",
      exports: "named",
      name: "ReactTypeAhead",
      globals: { react: "React" }
    },
    {
      format: "amd",
      file: "dist/react-typeahead.amd.js",
      exports: "named",
      name: "ReactTypeAhead",
      globals: { react: "React" }
    },
    {
      format: "cjs",
      file: "dist/react-typeahead.cjs.js",
      exports: "named",
      name: "ReactTypeAhead",
      globals: { react: "React" }
    },
    {
      format: "es",
      file: "dist/react-typeahead.es-modules.js",
      exports: "named",
      name: "ReactTypeAhead",
      globals: { react: "React" }
    }
  ]
};
