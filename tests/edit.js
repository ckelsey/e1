var txt = "some text"
var newTxt = "some texts"
var initScript = `
E1.registerService("demoService", {
    text: "${txt}",
    save: function(str){
        E1.setModel(null, '@demoService.text', str)
    }
})

window.document.getElementById('main-content').innerHTML = '<e1-edit content="@demoService.text" save="@demoService.save"></e1-edit>'
`

module.exports = {
    'e1-edit': function (browser) {
        browser
            .url("https://localhost:3004/blank.html")
            .waitForElementVisible('#main-content', 10000)
            .execute(initScript)
            .pause(500)
            .assert.containsText("e1-edit", txt)
            .click('[type="edit"]')
            .assert.elementPresent('.edit-content[contenteditable]')
            .click('.edit-content[contenteditable]')
            .execute('window.document.querySelector(".edit-content[contenteditable]").innerHTML = ""')
            .keys(newTxt)
            .assert.containsText("e1-edit", newTxt)
            .click('[type="close"]')
            .assert.containsText("e1-edit", txt)
            .click('[type="edit"]')
            .assert.elementPresent('.edit-content[contenteditable]')
            .click('.edit-content[contenteditable]')
            .execute('window.document.querySelector(".edit-content[contenteditable]").innerHTML = ""')
            .keys(newTxt)
            .assert.containsText("e1-edit", newTxt)
            .click('[type="check"]')
            .assert.containsText("e1-edit", newTxt)
            .end()
    }
}