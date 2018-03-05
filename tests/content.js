module.exports = {
    'e1-content': function (browser) {
        browser
            .url(browser.launchUrl + "e1-content")
            .waitForElementVisible("[e1-content]", 10000)
            .assert.elementPresent("[e1-content] span")
            .assert.elementPresent("[e1-content] i")
            .assert.elementPresent("[e1-content] b")
            .assert.containsText("[e1-content]", "Hey, bound text and, bound HTML")
            .execute(`E1.setModel(null, "@demoService.e1Value", "Hello")`)
            .pause(500)
            .assert.containsText("[e1-content]", "Hello")
            .assert.elementNotPresent("[e1-content] span")
            .end()
    }
}