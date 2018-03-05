var dropdown = {
    label: "A label",
    list: [
        "A",
        "b",
        "C"
    ]
}

var dropdown_2 = `{
    label: "A label2",
    list: [
        "A2",
        "b2",
        "C2"
    ],
    optionClicked: function (e, opt) { E1.setModel(null, "@demoService.dropdown.selected", opt.textContent) }
}`

var dropdown2 = {
    label: "A label2",
    list: [
        "A2",
        "b2",
        "C2"
    ],
    optionClicked: function (e, opt) { E1.setModel(null, "@demoService.dropdown.selected", opt.textContent) }
}


module.exports = {
    'e1-dropdown': function (browser) {
        browser
            .url(browser.launchUrl + "e1-dropdown")
            .waitForElementVisible('e1-dropdown', 10000)
            .execute(`E1.setModel(null, "@demoService.dropdown", ${JSON.stringify(dropdown)})`)
            .execute(`document.querySelector('e1-dropdown).setAttribute('label', '@demoService.dropdown.label')`)
            .execute(`document.querySelector('e1-dropdown).setAttribute('list', '@demoService.dropdown.list')`)
            .execute(`document.querySelector('[e1-content]').setAttribute('e1-content', '@demoService.dropdown.selected')`)
            .pause(100)
            .assert.containsText(".dropdown-list-label", dropdown.label)
            .assert.hidden(".dropdown-list-options")
            .moveToElement(".dropdown-list-label", 0, 0)
            .assert.visible(".dropdown-list-options")
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(1)", dropdown.list[0])
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(2)", dropdown.list[1])
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(3)", dropdown.list[2])
            .execute(`E1.setModel(null, "@demoService.dropdown", ${dropdown_2})`)
            .pause(100)
            .assert.containsText(".dropdown-list-label", dropdown2.label)
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(1)", dropdown2.list[0])
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(2)", dropdown2.list[1])
            .assert.containsText(".dropdown-list-options .dropdown-list-option:nth-child(3)", dropdown2.list[2])
            .click(".dropdown-list-options .dropdown-list-option:nth-child(1)")
            .pause(1000)
            .assert.hidden(".dropdown-list-options")
            .assert.containsText("[e1-content]", dropdown2.list[0])
            .moveToElement(".dropdown-list-label", 0, 0)
            .assert.visible(".dropdown-list-options")
            .moveToElement("textarea", 0, 0)
            .pause(1000)
            .assert.hidden(".dropdown-list-options")
            .end()
    }
}