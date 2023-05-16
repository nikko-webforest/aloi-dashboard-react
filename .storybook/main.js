let config = {
  stories: [
    '../app/src/stories/**/*.mdx',
    '../app/src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../app/public'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    // '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/react-webpack4',
    options: {},
  },
  babel: async (options) => ({
    // Update your babel configuration here
    ...options,
  }),

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    });
    return config;
  },
};

module.exports = config;
