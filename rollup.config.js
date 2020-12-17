import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import entrypointHashmanifest from 'rollup-plugin-entrypoint-hashmanifest';
// import visualizer from 'rollup-plugin-visualizer';

const config = require('./pack11ty.config.js');

const SRC_DIR = config.dir.src;
const ASSETS_DIR = config.dir.assets;
const DIST_DIR = config.dir.dist;

const JS_SRC = path.join(ASSETS_DIR, 'js');
const JS_DIST = path.join(DIST_DIR, 'js');
const HASH = path.join(SRC_DIR, '_data');

const JS_NAME =
  process.env.NODE_ENV === 'production'
    ? '[name]-[format].[hash].js'
    : '[name]-[format].js';

const plugins_critical = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  process.env.NODE_ENV === 'production' && terser(),
  process.env.NODE_ENV === 'production' &&
    entrypointHashmanifest({
      manifestName: path.join(HASH, 'hashes_critical.json'),
    }),
];

// only in production, for old browsers
const plugins_additional_iife = [
  replace({
    'process.env.NODE_ENV': 'production',
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    // exclude: 'node_modules/**',
    presets: ['@babel/preset-env'],
  }),
  terser(),
  entrypointHashmanifest({
    manifestName: path.join(HASH, 'hashes_additional_iife.json'),
  }),
];

const plugins_additional_es = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  babel({
    // exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { esmodules: true },
          bugfixes: true,
          loose: true,
        },
      ],
    ],
  }),
  process.env.NODE_ENV === 'production' && terser(),
  process.env.NODE_ENV === 'production' &&
    entrypointHashmanifest({
      manifestName: path.join(HASH, 'hashes_additional_es.json'),
    }),
];

const plugins_archives = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
    'process.env.ALGOLIA_READ_ONLY_API_KEY': JSON.stringify(
      process.env.ALGOLIA_READ_ONLY_API_KEY
    ),
    'process.env.ALGOLIA_INDEX_NAME': JSON.stringify(
      process.env.ALGOLIA_INDEX_NAME
    ),
  }),
  nodeResolve({ browser: true, preferBuiltins: false }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { esmodules: true },
          bugfixes: true,
          loose: true,
        },
      ],
    ],
  }),
  process.env.NODE_ENV === 'production' && terser(),
  process.env.NODE_ENV === 'production' &&
    entrypointHashmanifest({
      manifestName: path.join(HASH, 'hashes_archives.json'),
    }),
  // visualizer(),
];

const targets = [
  {
    input: path.join(JS_SRC, 'critical.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: JS_NAME,
      format: 'iife',
      name: 'critical',
      sourcemap: true,
    },
    plugins: plugins_critical,
  },
  {
    input: path.join(JS_SRC, 'additional.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: JS_NAME,
      format: 'es',
      sourcemap: true,
    },
    plugins: plugins_additional_es,
  },
  {
    input: path.join(JS_SRC, 'archives.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: JS_NAME,
      format: 'es',
      sourcemap: true,
      globals: {
        events: 'events',
      },
    },
    plugins: plugins_archives,
  },
];

if (process.env.NODE_ENV === 'production') {
  targets.push({
    input: path.join(JS_SRC, 'additional.js'),
    output: {
      dir: JS_DIST,
      entryFileNames: JS_NAME,
      format: 'iife',
      name: 'additional',
      sourcemap: true,
    },
    plugins: plugins_additional_iife,
  });
  targets.push({
    input: path.join(JS_SRC, 'service-worker.js'),
    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['chrome >= 71'],
              },
              modules: false,
            },
          ],
        ],
      }),
      terser(),
    ],
    output: {
      file: path.join(DIST_DIR, 'service-worker.js'),
      format: 'iife',
    },
  });
}

export default targets;
