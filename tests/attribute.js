module.exports = {
    'e1-accordian': function (browser) {
        browser
            .url(browser.launchUrl + "e1-attribute")
            .waitForElementVisible('[e1-attribute]', 10000)
            .assert.attributeEquals('[e1-attribute]', 'href', 'https://google.com/')
            .assert.attributeEquals('[e1-attribute]', 'onclick', "alert('This has bound href and onclick attributes')")
            .execute('window.E1.setModel(null, "@demoService.link", "https://yahoo.com/")')
            .waitForElementVisible('[e1-attribute][href="https://yahoo.com/"]', 50000)
            .assert.attributeEquals('[e1-attribute]', 'href', 'https://yahoo.com/')
            .end()
    }
}