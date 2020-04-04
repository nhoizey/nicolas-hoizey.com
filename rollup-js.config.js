import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import entrypointHashmanifest from 'rollup-plugin-entrypoint-hashmanifest';

const plugins = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
];

const pluginsAdditionalIife = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
  entrypointHashmanifest({ manifestName: 'src/_data/hashes_iife.json' }),
];

const pluginsAdditionalEs = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
  entrypointHashmanifest({ manifestName: 'src/_data/hashes_es.json' }),
];

export default [
  {
    input: './src/_assets/scripts/critical.js',
    output: {
      file: './src/_generated/critical.js',
      format: 'iife',
      name: 'critical',
      sourcemap: true,
    },
    plugins: plugins,
  },
  {
    input: './src/_assets/scripts/additional.js',
    output: {
      dir: 'dist/js',
      entryFileNames: '[name]-[format].[hash].js',
      format: 'iife',
      name: 'additional',
      sourcemap: true,
    },
    plugins: pluginsAdditionalIife,
  },
  {
    input: './src/_assets/scripts/additional.js',
    output: {
      dir: 'dist/js',
      entryFileNames: '[name]-[format].[hash].js',
      format: 'es',
      sourcemap: true,
    },
    plugins: pluginsAdditionalEs,
  },
];
