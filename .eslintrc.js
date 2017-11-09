
module.exports = {
  env: {
    browser: false,
  },
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'html'
  ],
  root: true,
  'rules': {
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
