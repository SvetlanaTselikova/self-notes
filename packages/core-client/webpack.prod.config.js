const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation({
  ...config,
  remotes: [['notes-client', 'http://localhost:4201/remoteEntry.js']],
});
