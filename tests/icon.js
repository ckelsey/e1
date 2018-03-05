var _color = "rgb(161, 0, 5)"
var width = "50px"
var types = [
    "360",
    "binoculars",
    "bookmark",
    "bookmark-filled",
    "cardboard",
    "check",
    "close-thin",
    "close",
    "contest",
    "delete",
    "down",
    "edit",
    "facebook",
    "fullscreen",
    "heart-filled",
    "heart",
    "image",
    "minus",
    "next",
    "plus",
    "previous",
    "search",
    "share",
    "twitter",
    "up",
    "upload",
    "vr",
    "weibo"
]
var initScript = `
E1.registerService("demoService", {
    icon: ${types[0]},
    iconColor: "${_color}",
    iconWidth: "${width}"
})

window.document.getElementById('main-content').innerHTML = '<e1-icon type="@demoService.icon" e1-style="@demoService.iconColor:color && @demoService.iconWidth:width"></e1-icon>'
`

module.exports = {
    'e1-icon': function (browser) {
        browser
            .url("https://localhost:3004/blank.html")
            .waitForElementVisible('#main-content', 10000)
            .execute(initScript)
            .pause(500)
            .assert.elementPresent(`svg[type="${types[0]}"]`)
            .execute(`return window.getComputedStyle(document.querySelector("svg"), false).getPropertyValue("fill")`, [], function (res) {
                browser.expect(res.value).to.equal(_color)
            })
            .execute(`return window.getComputedStyle(document.querySelector("svg"), false).getPropertyValue("width")`, [], function (res) {
                browser.expect(res.value).to.equal(width)
            })
            .execute(`E1.setModel(null, "@demoService.icon", "${types[1]}")`)
            .assert.elementPresent(`svg[type="${types[1]}"]`)
            .end()
    }
}