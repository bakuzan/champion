import fs from 'fs';
import path from 'path';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const appIcon = path.resolve(__dirname, './src/assets/trophy.ico');

const config: ForgeConfig = {
  packagerConfig: {
    icon: appIcon
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: appIcon
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({
      options: {
        icon: appIcon
      }
    })
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts'
            }
          }
        ]
      }
    })
  ],
  hooks: {
    packageAfterCopy: async (
      config,
      buildPath,
      electronVersion,
      platform,
      arch
    ) => {
      const srcs = [
        {
          src: 'src/api/database/scripts',
          dest: path.join(buildPath, '.webpack/renderer/main_window', 'scripts')
        },
        {
          src: 'src/api/database/storedProceedures',
          dest: path.join(buildPath, '.webpack/renderer/main_window')
        }
      ];

      for (const item of srcs) {
        fs.cpSync(item.src, item.dest, { recursive: true });
      }
    }
  }
};

export default config;
