import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['.next/**/*', 'lib/**/*', 'utils/**/*', 'config/**/*']),
  {
    files: ['**/*.{js,cjs,jsx}'],
    plugins: { js, react },
    extends: ['js/recommended'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    plugins: { js, react },
    extends: ['js/recommended'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname, // resolves absolute path
      },
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.mjs'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...tseslint.configs.recommended,
]);
