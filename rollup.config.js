import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import entrypointHashmanifest from 'rollup-plugin-entrypoint-hashmanifest';

const plugins_critical = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
  entrypointHashmanifest({ manifestName: 'src/_data/hashes_critical.json' }),
];

const plugins_additional_iife = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
  entrypointHashmanifest({
    manifestName: 'src/_data/hashes_additional_iife.json',
  }),
];

const plugins_additional_es = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
  entrypointHashmanifest({
    manifestName: 'src/_data/hashes_additional_es.json',
  }),
];

export default [
  {
    input: 'src/_assets/scripts/critical.js',
    output: {
      dir: 'dist/js',
      entryFileNames: '[name]-[format].[hash].js',
      format: 'iife',
      name: 'critical',
      sourcemap: true,
      // sourcemapFile: 'dist/js/critical.js.map',
    },
    plugins: plugins_critical,
  },
  {
    input: 'src/_assets/scripts/additional.js',
    output: {
      dir: 'dist/js',
      entryFileNames: '[name]-[format].[hash].js',
      format: 'iife',
      name: 'additional',
      sourcemap: true,
    },
    plugins: plugins_additional_iife,
  },
  {
    input: 'src/_assets/scripts/additional.js',
    output: {
      dir: 'dist/js',
      entryFileNames: '[name]-[format].[hash].js',
      format: 'es',
      sourcemap: true,
    },
    plugins: plugins_additional_es,
  },
];
