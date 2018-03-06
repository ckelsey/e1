describe(`e1-class`, function () {
    var el, clss = `blue`, clss2 = `bold`

    E1.setModel(null, `@demoService.condition`, false)
    E1.setModel(null, `@demoService.condition2`, false)
    E1.setModel(null, `@demoService.clss`, clss)
    E1.setModel(null, `@demoService.clss2`, clss2)

    it(`should give an element a class`, function (done) {

        el = window.document.createElement(`p`)
        el.textContent = `hi`
        el.setAttribute(`e1-class`, `@demoService.clss`)
        window.document.body.appendChild(el)

        window.requestAnimationFrame(function () {
            chai.expect(el.className).to.equal(clss)
            done()
        })
    })

    it(`should change an elements class`, function (done) {
        E1.setModel(null, `@demoService.clss`, clss2)

        window.requestAnimationFrame(function () {
            chai.expect(el.className).to.equal(clss2)
            done()
        })
    })

    it(`should give an element 2 classes`, function (done) {
        E1.setModel(null, `@demoService.clss`, clss)

        el.parentNode.removeChild(el)
        el.setAttribute(`e1-class`, `@demoService.clss && @demoService.clss2`)
        window.document.body.appendChild(el)

        window.requestAnimationFrame(function () {
            chai.expect(el.className).to.equal(`${clss} ${clss2}`)
            done()
        })
    })

    it(`should give an element a class on a condition`, function (done) {

        el.parentNode.removeChild(el)
        el = window.document.createElement(`p`)
        el.setAttribute(`e1-class`, `@demoService.condition ? @demoService.clss`)
        window.document.body.appendChild(el)

        window.requestAnimationFrame(function () {
            chai.expect(el.className).to.equal(``)

            E1.setModel(null, `@demoService.condition`, true)

            window.requestAnimationFrame(function () {
                chai.expect(el.className).to.equal(clss)
                done()
            })
        })
    })

    it(`should give an element a classes if it meets conditions`, function (done) {


        el.parentNode.removeChild(el)
        el = window.document.createElement(`p`)
        el.setAttribute(`e1-class`, `@demoService.condition ? @demoService.clss && @demoService.condition2 ? @demoService.clss2`)
        window.document.body.appendChild(el)

        window.requestAnimationFrame(function () {
            chai.expect(el.className).to.equal(clss)

            E1.setModel(null, `@demoService.condition2`, true)

            window.requestAnimationFrame(function () {
                chai.expect(el.className).to.equal(`${clss} ${clss2}`)
                el.parentNode.removeChild(el)
                done()
            })
        })
    })

})