module.exports = {
  root: true, // Indicates that ESLint should stop looking for configuration files in parent directories.

  env: {
    browser: true, // Enables browser global variables.
    es2020: true, // Enables ES2020 syntax.
  },

  extends: [
    'eslint:recommended', // Uses ESLint's recommended rules.
    'plugin:react/recommended', // Uses recommended rules from eslint-plugin-react.
    'plugin:react/jsx-runtime', // Provides support for React JSX runtime.
    'plugin:react-hooks/recommended', // Uses recommended rules from eslint-plugin-react-hooks.
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'], // Files and directories to be ignored by ESLint.

  parserOptions: {
    ecmaVersion: 'latest', // Specifies the ECMAScript version (latest).
    sourceType: 'module', // Allows using ECMAScript modules.
  },

  settings: {
    react: {
      version: '18.2', // Specifies the React version.
    },
  },

  plugins: ['react-refresh'], // Lists the ESLint plugins to use.

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, // React Refresh rule allowing constant exports.
    ],
  },
};
