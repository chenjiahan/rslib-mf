import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
      },
    }),
  ],

  lib: [{ format: 'esm' }],

  tools: {
    rspack: {
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'federation_provider',
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'federation_provider',
          exposes: {
            './button': './src/Button.tsx',
          },
          shared: ['react', 'react-dom'],
        }),
      ],
    },
  },
});
