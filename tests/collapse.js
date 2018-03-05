module.exports = {
    'e1-collapse': function (browser) {
        tags: ['collapse']
        browser
            .url(browser.launchUrl + "e1-collapse")
            .resizeWindow(1000, 800)
            .waitForElementVisible('e1-collapse', 10000)
            .execute('window.E1.setModel(null, "@demoService.collapse.width", 400)')
            .assert.cssClassNotPresent('e1-collapse', "collapse")
            .assert.hidden('[e1-collapse-toggle]')
            .assert.visible('[e1-collapse-content]')
            .resizeWindow(300, 800)
            .pause(1000)
            .assert.cssClassPresent('e1-collapse', "collapse")
            .assert.visible('[e1-collapse-toggle]')
            .assert.hidden('[e1-collapse-content]')
            .end()
    }
}