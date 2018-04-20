// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  globals: {
    Back: true,
    TimelineLite: true,
    TimelineMax: true,
    TweenLite: true,
    TweenMax: true
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'align': 'off',
    'function-name': 'off',
    'import-name': 'off',
    'key-spacing': 'off',
    'max-line-length': 'off',
    'no-boolean-literal-compare': 'off',
    'no-duplicate-imports': 'off',
    'no-increment-decrement': 'off',
    'no-multi-spaces': 'off',
    'no-new': 'off',
    'no-parameter-reassignment': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-var-keyword': 'off',
    'object-literal-key-quotes': 'off',
    'object-literal-shorthand': 'off',
    'object-property-newline': 'off',
    'prefer-const': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'strict-boolean-expressions': 'off',
    'trailing-comma': 'off'
  }
}
