var options = [{
    preview: "https://localhost:3004/image-screenshot.png",
    url: "https://localhost:3004/image-screenshot.png",
    type: "Screenshot"
}, {
    preview: "https://localhost:3004/image-superres.jpg",
    url: "https://localhost:3004/image-superres.jpg",
    type: "Super resolution"
}, {
    preview: "https://images.nvidia.com/ansel/images/ansel-images/Um9oaXRHNzE1MTI0NDkxOTU5MDMyNzA1NTY1_small.jpg",
    preview: "https://localhost:3004/image-screenshot.jpg",
    url: "https://localhost:3004/image-screenshot.jpg",
    type: "Stereo"
}, {
    preview: "https://localhost:3004/image-screenshot.jpg",
    url: "https://localhost:3004/image-screenshot.jpg",
    type: "360mono"
}, {
    preview: "https://localhost:3004/image-screenshot.jpg",
    url: "https://localhost:3004/image-screenshot.jpg",
    type: "360stereo"
}]

var initScript = `
E1.registerService("demoService", {
    type: "${options[0].type}",
    url: "${options[0].url}",
    preview: "${options[0].preview}",
    crop: false
})

window.document.getElementById('main-content').style.width = "300px"
window.document.getElementById('main-content').style.height = "300px"
window.document.getElementById('main-content').innerHTML = '<e1-image-viewer type="@demoService.type" url="@demoService.url" preview="@demoService.preview" crop="@demoService.crop"></e1-image-viewer>'
`

const run = function (browser, type, cb) {
    browser
        .saveScreenshot("test.jpg")
        .compareImages("test.jpg", `tests/imgs/${type}.jpg`, function (res) {

            browser.expect(res).to.equal(0)

            browser.click('.zoom-plus')
                .pause(1000)
                .click('.zoom-plus')
                .pause(1000)
                .saveScreenshot("test.jpg")
                .compareImages("test.jpg", `tests/imgs/${type}-zoom.jpg`, function (res) {

                    browser.expect(res).to.equal(0)

                    browser
                        .execute(`
                                var canvas = window.document.querySelector("canvas"); 
                                var evt = new MouseEvent("mousedown", {
                                    bubbles: false,
                                    cancelable: true,
                                    view: window,
                                    clientX: 100,
                                    clientY: 100
                                })
                                canvas.dispatchEvent(evt)

                                evt = new MouseEvent("mousemove", {
                                    bubbles: false,
                                    cancelable: true,
                                    view: window,
                                    clientX: 200,
                                    clientY: 200
                                })
                                canvas.dispatchEvent(evt)

                                evt = new MouseEvent("mouseup", {
                                    bubbles: false,
                                    cancelable: true,
                                    view: window,
                                    clientX: 200,
                                    clientY: 200
                                })
                                canvas.dispatchEvent(evt)
                            `)
                        .saveScreenshot("test.jpg")
                        .compareImages("test.jpg", `tests/imgs/${type}-drag.jpg`, function (res) {
                            browser.expect(res).to.equal(0)

                            browser
                                .click('button.fullscreen-button')
                                .pause(2000)
                                .saveScreenshot("test.jpg")
                                .compareImages("test.jpg", `tests/imgs/${type}-fullscreen.jpg`, function (res) {
                                    browser.expect(res).to.equal(0)

                                    browser.keys(browser.Keys.ESCAPE)
                                        .saveScreenshot("test.jpg")
                                        .compareImages("test.jpg", `tests/imgs/${type}.jpg`, function (res) {
                                            browser.expect(res).to.equal(0)

                                            browser
                                                .click('button.fullscreen-button')
                                                .pause(3000)
                                                .click('button.fullscreen-button')
                                                .pause(2000)
                                                .saveScreenshot("test.jpg")
                                                .compareImages("test.jpg", `tests/imgs/${type}.jpg`, function (res) {
                                                    browser.expect(res).to.equal(0)

                                                    cb()
                                                })
                                        })
                                })
                        })
                })

        })
}

module.exports = {
    'e1-image-viewer': function (browser) {

        browser
            .url("https://localhost:3004/blank.html")
            .resizeWindow(350, 350)
            .waitForElementVisible('#main-content', 10000)
            .execute(initScript)
            .waitForElementVisible('e1-icon[type="plus"]', 10000)
            .pause(1000)

        run(browser, options[0].type, function () {
            console.log("done")

            browser.execute(`E1.setModel(null, "@demoService.url", "${options[1].url}"); E1.setModel(null, "@demoService.preview", "${options[1].preview}"); E1.setModel(null, "@demoService.type", "${options[1].type}")`)
                .waitForElementVisible('e1-icon[type="plus"]', 10000)
                .pause(1000)

            run(browser, options[1].type, function () {
                console.log("done")

                // browser.execute(`E1.setModel(null, "@demoService.url", "${options[1].url}"); E1.setModel(null, "@demoService.preview", "${options[1].preview}"); E1.setModel(null, "@demoService.type", "${options[1].type}")`)
                //     .waitForElementVisible('e1-icon[type="plus"]', 10000)
                //     .pause(1000)
            })
        })

    }
}