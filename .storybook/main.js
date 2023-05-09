let config = {
  stories: [
    '../app/src/**/*.mdx',
    '../app/src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../app/'],
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
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => ({
    // Update your babel configuration here
    ...options,
  }),

  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },
};

module.exports = config;
