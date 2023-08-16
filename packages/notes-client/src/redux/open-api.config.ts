import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3000/api-json',
  apiFile: './services/api.ts',
  apiImport: 'api',
  outputFile: './services/notes-api.ts',
  exportName: 'notesApi',
  hooks: true,
  filterEndpoints: /^(?!.*auth).*$/,
};

export default config;
