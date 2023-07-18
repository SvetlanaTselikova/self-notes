module.exports = {
  name: 'notes',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  filename: 'remoteEntry.js',
};
