module.exports = {
    'e1-accordian': function (browser) {
        var texts =

            browser
                .url(browser.launchUrl + "e1-accordian-toggle")
                .waitForElementVisible('[e1-accordian-toggle="one"]', 10000)
                .click('[e1-accordian-toggle="one"]')
                .waitForElementVisible('[e1-accordian-content="one"]', 500)
                .assert.cssClassPresent('[e1-accordian-content="one"]', 'active-accordian')
                .click('[e1-accordian-toggle="two"]')
                .waitForElementVisible('[e1-accordian-content="two"]', 500)
                .assert.cssClassNotPresent('[e1-accordian-content="one"]', 'active-accordian')
                .assert.cssClassPresent('[e1-accordian-content="two"]', 'active-accordian')
                .click('[e1-accordian-toggle="two"]')
                .assert.cssClassNotPresent('[e1-accordian-content="two"]', 'active-accordian')
                .end()
    }
}