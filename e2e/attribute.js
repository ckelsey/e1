describe(`e1-attribute`, function () {
    var el = window.document.createElement(`a`)
    el.setAttribute(`e1-attribute`, `@demoService.link:href && @demoService.alertMessage:onclick`)
    window.document.body.appendChild(el)

    it(`should have an href attribute of https://google.com`, function () {

        var href = el.getAttribute(`href`)

        chai.expect(href).to.equal(`https://google.com`)
    })

    it(`should have an onclick attribute`, function () {
        var onclick = el.getAttribute(`onclick`)

        chai.expect(onclick).to.not.equal(null)

    })

    it(`should create an element with blue text`, function (done) {
        var color = `rgb(54, 103, 158)`

        E1.setModel(null, `@demoService.tests.style`, `color:${color};`)

        el.parentNode.removeChild(el)
        el = window.document.createElement(`p`)
        el.id = `text_color`
        el.textContent = `blue text`
        el.setAttribute(`e1-attribute`, `@demoService.tests.style:style`)
        window.document.body.appendChild(el)

        setTimeout(function () {
            var textColor = window.getComputedStyle(el, null).getPropertyValue(`color`)

            chai.expect(color).to.equal(textColor)

            done()
        }, 50)
    })

    it(`should change the text color to green`, function (done) {
        var color = `rgb(54, 158, 88)`

        E1.setModel(null, `@demoService.tests.style`, `color:${color};`)

        setTimeout(function () {
            var textColor = window.getComputedStyle(el, null).getPropertyValue(`color`)

            chai.expect(color).to.equal(textColor)

            el.parentNode.removeChild(el)

            done()
        }, 50)
    })
})