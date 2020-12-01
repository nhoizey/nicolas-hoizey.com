import dotenv from 'dotenv';
dotenv.config();

import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const config = require('./pack11ty.config.js');

const ASSETS_DIR = config.dir.assets;
const DIST_DIR = config.dir.dist;

const JS_SRC = path.join(ASSETS_DIR, 'js');

export default [
  {
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
  },
];
