const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
const webpack = require('webpack');

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

module.exports = async (wco) => {
  const definePlugin = new webpack.DefinePlugin(getClientEnvironment());
  const wmf = await withModuleFederation({
    ...config,
    remotes: [['notes-client', 'http://localhost:4201/remoteEntry.js']],
  });
  return wmf({
    ...wco,
    plugins: [...(wco.plugins ?? []), definePlugin],
  });
};
