// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  beforeEach: async (browser) => browser.init(),
  'Test first Run site': (browser) => {
    browser.waitForElementVisible('#app');
    browser
      .getLogTypes((result) => {
        console.log('aaaaaa');
        console.log(result);
      })
      .getLog('browser', (result) => {
        console.log('bbbb');
        console.log(result);
      });
    browser.pause(1000);
    browser.end();
  },
};
