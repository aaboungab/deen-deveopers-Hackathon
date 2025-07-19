// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

const compat = new FlatCompat({
  baseDirectory: currentDir,
});

export default [
  // Legacy configs using FlatCompat
  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ),

  // Custom rules
  {
    rules: {
      // React rules
      'react/no-unescaped-entities': ['warn'], // Prevent invalid characters in JSX
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js
      'prefer-const': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage any
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^',
          varsIgnorePattern: '^',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Next.js rules
      '@next/next/no-page-custom-font': 'warn',
    },
  },
];
