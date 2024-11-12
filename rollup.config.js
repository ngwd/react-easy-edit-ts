import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/lib/EasyEdit.tsx',
  external: ['react'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    postcss({
      plugins: [],
      minimize: true
    }),
    terser(),
    typescript()  // Add TypeScript plugin
  ],
  output: {
    file: 'dist/react-easy-edit.js',
    // format: 'umd',
    format: 'cjs',
    name: 'react-easy-edit-ts',
    globals: {
      react: "React",
    }
  }
};