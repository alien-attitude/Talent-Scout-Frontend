import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    // Make sure TypeScript parser + rules are wired correctly
    ...tseslint.configs.recommended[0],
    languageOptions: {
      ...tseslint.configs.recommended[0].languageOptions,
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ...tseslint.configs.recommended[0].languageOptions.parserOptions,
        // Point to your tsconfig; adjust path if needed
        project: ['./tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },
    plugins: {
      ...tseslint.configs.recommended[0].plugins,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tseslint.configs.recommended[0].rules,
      // add or override rules here if needed
    },
  },
  {
    // JS-only files
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
  },
])