const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { withModuleFederation } = require('@nx/react/module-federation');
const webpack = require('webpack');

const baseConfig = require('./module-federation.config');

const config = {
  ...baseConfig,
};

function getClientEnvironment() {
  const raw = Object.keys(process.env).reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}
const definePlugin = new webpack.DefinePlugin();
// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  // definePlugin,
  withNx(),
  withReact(),
  withModuleFederation(config)
);
