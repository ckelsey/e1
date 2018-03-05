describe('e1-if', function () {
    var if1 = true
    var if2 = false
    var text = "is showing"

    E1.setModel(null, "@demoService.if1", if2)
    E1.setModel(null, "@demoService.if2", if1)

    var el = window.document.createElement("p")
    var span = window.document.createElement("span")
    var span2 = window.document.createElement("span")
    span.textContent = text
    span2.textContent = text
    span.setAttribute("e1-if", "@demoService.if2")
    span2.setAttribute("e1-if", "@demoService.if1 && @demoService.if2")
    el.id = "iftext"
    el.appendChild(span)
    el.appendChild(span2)
    window.document.body.appendChild(el)

    function cleanup() {
        el.parentElement.removeChild(el)
    }


    it('should show text', function (done) {

        chai.expect(el.textContent).be.equal(text)
        chai.expect(el.children.length).be.equal(1)
        done()
    })

    it('should not show text', function (done) {
        E1.setModel(null, "@demoService.if2", if2)

        setTimeout(function () {
            chai.expect(el.textContent).be.equal("")
            chai.expect(el.children.length).be.equal(0)
            done()
        }, 50)
    })

    it('should show if both conditions match', function (done) {

        E1.setModel(null, "@demoService.if1", if1)

        setTimeout(function () {
            chai.expect(el.textContent).be.equal("")
            chai.expect(el.children.length).be.equal(0)

            E1.setModel(null, "@demoService.if2", if1)

            setTimeout(function () {
                chai.expect(el.textContent).be.equal(text + text)
                chai.expect(el.children.length).be.equal(2)
                cleanup()
                done()
            }, 50)
        }, 50)
    })

})