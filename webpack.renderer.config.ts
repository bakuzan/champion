import type { Configuration } from 'webpack';
import path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
});

export const rendererConfig: Configuration = {
  module: {
    rules
  },
  plugins,
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      context: path.resolve(__dirname, './src/context'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      views: path.resolve(__dirname, './src/views')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
};
