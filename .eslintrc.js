module.exports = {
  extends: [
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            enums: 'always-multiline',
            objects: 'always-multiline',
            imports: 'only-multiline',
            exports: 'only-multiline',
            functions: 'only-multiline',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'local',
            args: 'none',
            caughtErrors: 'none',
          },
        ],
      },
    },
  ],
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'radix': ['error', 'as-needed'],
    // no rules
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    // a11y rules
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    // react rules
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
  },
};
