import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      importPlugin.flatConfigs.recommended,
      jsxA11y.flatConfigs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        alias: {
          map: [
            ['@', './src'],
          ],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': 'warn',
      'react/button-has-type': 'error',
      'react/react-in-jsx-scope': ['off'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      "jsx-a11y/no-autofocus": "off",
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      'import/no-unresolved': 'error',
       // 'import/no-named-as-default-member': 'off',
       'import/order': [
         'error',
         {
           groups: [
             'builtin', // Built-in imports (come from NodeJS native) go first
             'external', // <- External imports
             'internal', // <- Absolute imports
             ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
             'index', // <- index imports
             'unknown', // <- unknown
           ],
           'newlines-between': 'always',
           alphabetize: {
             /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
             order: 'asc',
             /* ignore case. Options: [true, false] */
             caseInsensitive: true,
           },
         },
       ],
    },
  },
);
