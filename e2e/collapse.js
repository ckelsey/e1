describe(`e1-collapse`, function () {
    var amount = 400
    var targetId = `external_targ`

    E1.setModel(null, `@demoService.collapse.target`, `#collapse_el`)
    E1.setModel(null, `@demoService.collapse.amount`, amount)

    var target = window.document.createElement(`div`)
    target.id = targetId
    target.textContent = `external`
    window.document.body.appendChild(target)

    var el = window.document.createElement(`e1-collapse`)
    el.id = `collapse_el`
    el.textContent = `Some text`
    el.setAttribute(`collapse`, `@demoService.collapse.amount`)
    el.setAttribute(`target`, `@demoService.collapse.target`)
    window.document.body.appendChild(el)

    function cleanup() {
        target.parentNode.removeChild(target)
        el.parentNode.removeChild(el)
    }

    it(`should minimize if width is less than setting`, function (done) {
        el.style.width = `${amount - 100}px`

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(`collapse`)
            chai.expect(opacity).to.equal(0)
            done()
        }, 50)
    })

    it(`should maximize if width is greater than setting`, function (done) {
        el.style.width = `${amount + 100}px`

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(``)
            chai.expect(opacity).to.equal(1)
            done()
        }, 50)
    })

    it(`should minimize if target width is less than setting`, function (done) {
        E1.setModel(null, `@demoService.collapse.target`, `#${targetId}`)

        target.style.width = `${amount - 100}px`

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(`collapse`)
            chai.expect(opacity).to.equal(0)
            done()
        }, 50)
    })

    it(`should maximize if target width is greater than setting`, function (done) {
        target.style.width = `${amount + 100}px`

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(``)
            chai.expect(opacity).to.equal(1)
            done()
        }, 50)
    })

    it(`should open if toggle is clicked`, function (done) {
        target.style.width = `0px`

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(`collapse`)
            chai.expect(opacity).to.equal(0)

            el.querySelector(`[e1-collapse-toggle]`).click()

            setTimeout(function () {
                opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))
                chai.expect(el.className).to.equal(`collapse open`)
                chai.expect(opacity).to.equal(1)

                done()

            }, 500)
        }, 50)
    })

    it(`should close if toggle is clicked`, function (done) {
        el.querySelector(`[e1-collapse-toggle]`).click()

        setTimeout(function () {
            var opacity = parseInt(window.getComputedStyle(el.querySelector(`[e1-collapse-content]`)).getPropertyValue(`opacity`))

            chai.expect(el.className).to.equal(`collapse`)
            chai.expect(opacity).to.equal(0)

            cleanup()

            done()

        }, 500)
    })

})