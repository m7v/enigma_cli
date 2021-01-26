module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['@typescript-eslint', 'functional'],
  overrides: [
    {
      files: ['*.spec.tsx', '*.spec.ts'],
      rules: {
        'no-unused-expressions': 'off',
        'functional/immutable-data': 'off',
        'max-len': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-param-reassign': 'error',
    'no-empty': 'error',
    'quote-props': 'off',
    'space-in-parens': 'error',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-fallthrough': 'off',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowFunctions: true,
      },
    ],
    'no-useless-catch': 'error',
    'no-prototype-builtins': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'guard-for-in': 'error',
    'no-underscore-dangle': [
      'error',
      { allow: ['_pt', '_tp', '_gg', '_t', '_nt', '_npt', '_ngg', '_pgg', '_npgg'] },
    ],
    'no-unused-expressions': 'error',
    'no-shadow': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-console': 'error',
    'no-bitwise': 'error',
    'no-plusplus': 'error',
    'react/jsx-no-literals': [2, { 'allowedStrings': ['-', '+'] }],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'functional/immutable-data': [
      'off',
      {
        assumeTypes: {
          forArrays: false,
          forObjects: true,
        },
        ignoreImmediateMutation: true,
        ignorePattern: ['^mutable', '^_mutable', '^classNames'],
        ignoreAccessorPattern: [
          '*.displayName',
          '**.mutable*.**',
          '**._mutable*.**',
          'div.**',
          'this.**',
          'window.**',
          '*.document.**',
          '*ef.current',
          '*.exports',
        ],
      },
    ],
    /**
     * Вместо localStorage используй core/lib/storage — localStorage ломается в некоторых браузерах
     */
    'no-restricted-globals': ['error', 'event', 'name', 'localStorage'],
     /**
     * Не импортим весь lodash
     */
    'no-restricted-imports': ['error', {
      paths: [
        { name: 'lodash', message: 'Уволен! Мы не используем jQuery' },
        { name: 'lodash-es', message: 'Уволен! Мы не используем jQuery' }
      ],
      patterns: ['lodash/*']
    }]
  }
}
