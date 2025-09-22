import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
});

const eslintConfig = [
   ...compat.extends('next/core-web-vitals', 'next/typescript'),
   eslintPluginPrettier,
   {
      ignores: [
         'node_modules/**',
         '.next/**',
         'out/**',
         'build/**',
         'next-env.d.ts',
      ],
      rules: {
         'no-console': ['warn', { allow: ['warn', 'error'] }],
         '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
         ],
         'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
   },
];

export default eslintConfig;
