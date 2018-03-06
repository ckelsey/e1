describe(`e1-content`, function () {
    var content = `<span><b>Hi</b> hello</span>`
    var content2 = `Holla`
    var content3_1 = `JS?`
    var content3 = `<script>alert("hi")</script>${content3_1}`

    E1.setModel(null, `@demoService.content`, content)

    var el = window.document.createElement(`p`)
    el.setAttribute(`e1-content`, `@demoService.content`)
    window.document.body.appendChild(el)

    function cleanup() {
        el.parentNode.removeChild(el)
    }

    it(`should add the content supplied`, function (done) {
        chai.expect(el.innerHTML).to.equal(content)
        done()
    })

    it(`should update the content`, function (done) {
        E1.setModel(null, `@demoService.content`, content2)

        window.requestAnimationFrame(function () {
            chai.expect(el.innerHTML).to.equal(content2)
            done()
        })
    })

    it(`should strip out script tags`, function (done) {
        E1.setModel(null, `@demoService.content`, content3)

        window.requestAnimationFrame(function () {
            chai.expect(el.innerHTML).to.equal(content3_1)
            cleanup()
            done()
        })
    })

})