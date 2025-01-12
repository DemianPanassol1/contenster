import js from '@eslint/js';
import path from 'node:path';
import globals from 'globals';
import react from 'eslint-plugin-react';
import { fileURLToPath } from 'node:url';
import prettier from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';

import tsparser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ),
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['/build', '/public', '/node_modules'],
  },
  {
    plugins: {
      react,
      prettier,
    },
    languageOptions: {
      parser: tsparser,
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': [
        'off',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'arrow-body-style': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.ts', '.tsx'],
        },
      ],
      'comma-dangle': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],
      'operator-linebreak': 'off',
      'object-curly-newline': 'off',
      'react/jsx-wrap-multilines': 'off',
      'implicit-arrow-linebreak': 'off',
      'no-restricted-globals': 'off',
      'linebreak-style': 'off',
      'function-paren-newline': 'off',
      'react/require-default-props': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
