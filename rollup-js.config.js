import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const files = {
  critical: {
    src: './src/_assets/scripts/critical.js',
    dist: './src/_includes/generated/critical.min.js',
  },
  additional: {
    src: './src/_assets/scripts/additional.js',
    dist: {
      iife: './dist/js/additional.iife.min.js',
      esm: './dist/js/additional.esm.min.js',
    },
  },
};

const plugins = [
  commonjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
];

let rollupBuilds = [
  {
    input: files.critical.src,
    output: [
      {
        file: files.critical.dist,
        format: 'iife',
        name: 'critical',
        sourcemap: true,
      },
    ],
    plugins: plugins,
  },
  {
    input: files.additional.src,
    output: [
      {
        file: files.additional.dist.iife,
        format: 'iife',
        name: 'additional',
        sourcemap: true,
      },
    ],
    plugins: plugins,
  },
  {
    input: files.additional.src,
    output: {
      file: files.additional.dist.esm,
      format: 'esm',
      name: 'additional',
      sourcemap: true,
    },
    plugins: plugins,
  },
];

export default rollupBuilds;
