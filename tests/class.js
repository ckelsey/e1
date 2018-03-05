module.exports = {
    'e1-class': function (browser) {
        browser
            .url(browser.launchUrl + "e1-class")
            .waitForElementVisible('[e1-class]', 10000)
            .assert.attributeEquals('[e1-class="@demoService.e1ClassString"]', 'class', 'blue')
            .assert.attributeEquals('[e1-class="@demoService.e1ClassString && @demoService.e1ClassString2"]', 'class', "blue bold")
            .assert.attributeEquals('[e1-class="@demoService.trueFalse ? @demoService.e1ClassString && @demoService.trueFalse2 ? @demoService.e1ClassString2"]', 'class', '')
            .execute('window.E1.setModel(null, "@demoService.e1ClassString", "yellow")')
            .execute('window.E1.setModel(null, "@demoService.trueFalse", true)')
            .assert.attributeEquals('[e1-class="@demoService.e1ClassString"]', 'class', 'yellow')
            .assert.attributeEquals('[e1-class="@demoService.e1ClassString && @demoService.e1ClassString2"]', 'class', "bold yellow")
            .assert.attributeEquals('[e1-class="@demoService.trueFalse ? @demoService.e1ClassString && @demoService.trueFalse2 ? @demoService.e1ClassString2"]', 'class', 'yellow')
            .end()
    }
}