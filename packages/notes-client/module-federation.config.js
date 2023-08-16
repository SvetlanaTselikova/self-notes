module.exports = {
  name: 'notes-client',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  filename: 'remoteEntry.js',
};
