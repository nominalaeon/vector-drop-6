
module.exports = {
  'default e2e tests': function (browser) {
    var devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#vector-drop-6', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Hello Vector Drop 6')
      .assert.elementCount('img', 0)
      .end()
  }
}
