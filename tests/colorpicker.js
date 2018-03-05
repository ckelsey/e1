var color = "#a10005"
var rgb = "rgb(161, 0, 5)"

module.exports = {
    'e1-colorpicker': function (browser) {
        browser
            // Setup
            .url(browser.launchUrl + "e1-colorpicker")
            .resizeWindow(1000, 800)
            .waitForElementVisible('e1-colorpicker', 10000)
            .execute(`E1.setModel(document.querySelector("e1-colorpicker"), "color", "${color}")`)

            // Check initial values
            .assert.elementPresent("input.color-result[readonly]")
            .assert.value("input.color-result[readonly]", color)
            .assert.elementPresent(".color-picker-wrapper font")
            .assert.attributeContains('.color-picker-wrapper font', 'style', rgb)
            .assert.hidden(".colorpicker-modal")

            // Open modal
            .click("input.color-result[readonly]")
            .assert.visible(".colorpicker-modal")

            // Set hue/lightness
            .moveToElement("e1-color-wheel", 0, 0)
            .mouseButtonDown(0)
            .assert.value(".color-input.hex", "#000000")
            .moveToElement("e1-color-wheel", 100, 100)
            .mouseButtonUp(0)
            .assert.value(".color-input.hex", "#0a43ff")

            // Set saturation
            .assert.visible(`e1-color-slider[key="s"]`)
            .moveToElement(`e1-color-slider[key="s"]`, 50, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .assert.value(".color-input.hex", "#717a98")

            // Set Alpha
            .assert.visible(`e1-color-slider[key="a"]`)
            .moveToElement(`e1-color-slider[key="a"]`, 100, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .assert.value(".color-input.hex", "#717a9854")

            // Change format to HSL
            .moveToElement(`.select-menu-selected-text`, 10, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .moveToElement(`.select-menu-option:nth-child(1)`, 10, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .pause(500)
            .assert.hidden(`.color-input.hex`)
            .assert.hidden(`.color-input[color="r"]`)
            .assert.hidden(`.color-input[color="g"]`)
            .assert.hidden(`.color-input[color="b"]`)
            .assert.visible(`.color-input[color="h"]`)
            .assert.value(`.color-input[color="h"]`, "226.15")
            .assert.visible(`.color-input[color="s"]`)
            .assert.value(`.color-input[color="s"]`, "15.92")
            .assert.visible(`.color-input[color="l"]`)
            .assert.value(`.color-input[color="l"]`, "51.96")
            .assert.visible(`.color-input[color="a"]`)
            .assert.value(`.color-input[color="a"]`, "0.33333333333333326")

            // Change format to HSL
            .moveToElement(`.select-menu-selected-text`, 10, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .moveToElement(`.select-menu-option:nth-child(3)`, 10, 10)
            .mouseButtonDown(0)
            .mouseButtonUp(0)
            .pause(500)
            .assert.hidden(`.color-input.hex`)
            .assert.hidden(`.color-input[color="h"]`)
            .assert.hidden(`.color-input[color="s"]`)
            .assert.hidden(`.color-input[color="l"]`)
            .assert.visible(`.color-input[color="r"]`)
            .assert.value(`.color-input[color="r"]`, "113")
            .assert.visible(`.color-input[color="g"]`)
            .assert.value(`.color-input[color="g"]`, "122")
            .assert.visible(`.color-input[color="b"]`)
            .assert.value(`.color-input[color="b"]`, "152")
            .assert.visible(`.color-input[color="a"]`)
            .assert.value(`.color-input[color="a"]`, "0.33333333333333326")

            // Change alpha back to 1
            // .click('.color-input[color="a"]')
            // .setValue('.color-input[color="a"]', 1)
            .execute(`var ev = new Event('input', {}); var input = window.document.querySelector('.color-input[color="a"]'); input.value = 1; input.dispatchEvent(ev)`)
            .execute(`window.document.querySelector('.color-input[color="a"]').value = 1`)
            .assert.hidden('.color-input[color="a"]')

            // Cancel
            .click(".cancel-color")
            .assert.hidden(".colorpicker-modal")
            .assert.value("input.color-result[readonly]", color)

            // Save
            .click("input.color-result[readonly]")
            .assert.visible(".colorpicker-modal")
            .moveToElement("e1-color-wheel", 100, 100)
            .mouseButtonUp(0)
            .click(".save-color")
            .assert.hidden(".colorpicker-modal")
            .assert.value("input.color-result[readonly]", "rgba(113, 122, 152, 1)")

            // Previous color
            .click("input.color-result[readonly]")
            .assert.visible(".colorpicker-modal")
            .moveToElement("e1-color-wheel", 200, 200)
            .mouseButtonUp(0)
            .assert.attributeContains('.previous-color', 'style', "rgb(113, 122, 152)")
            .click(".previous-color")
            .assert.value(".color-input.hex", "#717a98")
            .end()
    }
}