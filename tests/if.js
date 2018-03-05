var txt = "Some text"
var initScript = `
E1.registerService("demoService", {
    trueFalse: true,
    trueFalse2: true,
    val1: 1,
    val2: 2
})

window.document.getElementById('main-content').innerHTML = '<span e1-if="@demoService.trueFalse">${txt}</span>'
`

module.exports = {
    'e1-if': function (browser) {
        browser
            .url("https://localhost:3004/blank.html")
            .waitForElementVisible('#main-content', 10000)
            .execute(initScript)
            .pause(100)
            .assert.containsText(`[e1-if]`, txt)
            .execute(`E1.setModel(null, "@demoService.trueFalse", false)`)
            .assert.containsText(`#main-content`, "")
            .execute(`window.document.getElementById('main-content').innerHTML = '<span e1-if="@demoService.trueFalse && @demoService.trueFalse2">${txt}</span>'`)
            .pause(100)
            .assert.containsText(`#main-content`, "")
            .execute(`E1.setModel(null, "@demoService.trueFalse", true)`)
            .assert.containsText(`#main-content`, "")
            .execute(`E1.setModel(null, "@demoService.trueFalse2", true)`)
            .assert.containsText(`#main-content`, txt)
            .execute(`window.document.getElementById('main-content').innerHTML = '<span e1-if="@demoService.val1 > @demoService.val2">${txt}</span>'`)
            .assert.containsText(`#main-content`, "")
            .execute(`E1.setModel(null, "@demoService.val1", 3)`)
            .assert.containsText(`#main-content`, txt)
            .execute(`window.document.getElementById('main-content').innerHTML = '<span e1-if="@demoService.val1 <= @demoService.val2">${txt}</span>'`)
            .assert.containsText(`#main-content`, "")
            .execute(`E1.setModel(null, "@demoService.val1", 2)`)
            .assert.containsText(`#main-content`, txt)
            .execute(`E1.setModel(null, "@demoService.val1", 1)`)
            .assert.containsText(`#main-content`, txt)
            .end()
    }
}