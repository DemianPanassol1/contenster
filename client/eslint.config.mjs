import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  configPrettier,
  {
    ...pluginReact.configs.flat.recommended,
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: pluginPrettier,
      react: pluginReact,
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: { react: { version: 'detect' } },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { 'prettier/prettier': ['error', {}, { usePrettierrc: true }] },
  },
];
