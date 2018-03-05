describe('e1-edit', function () {
    var content = "Hello"
    var content2 = "Holla"
    var content3 = ""

    E1.setModel(null, "@demoService.contentsSave", function (text) {
        E1.setModel(null, "@demoService.contents3", text)
    })
    E1.setModel(null, "@demoService.contents", content)
    E1.setModel(null, "@demoService.contents2", "")
    E1.setModel(null, "@demoService.contents3", "")

    var el = window.document.createElement("e1-edit")
    el.setAttribute("content", "@demoService.contents")
    el.setAttribute("save", "@demoService.contentsSave")
    window.document.body.appendChild(el)

    var el2 = window.document.createElement("p")
    el2.setAttribute("e1-content", "@demoService.contents3")
    window.document.body.appendChild(el2)

    function cleanup() {
        el.parentNode.removeChild(el)
        el2.parentNode.removeChild(el2)
    }

    it('should add the content supplied', function (done) {
        chai.expect(el.querySelector(".edit-content").innerHTML).to.equal(content)
        done()
    })

    it('should not accept html', function (done) {
        E1.setModel(null, "@demoService.contents", "<b>Halo</b>")

        setTimeout(function () {
            chai.expect(el.querySelector(".edit-content").innerHTML).to.equal("Halo")
            done()
        }, 50)
    })

    it('should update the content', function (done) {
        E1.setModel(null, "@demoService.contents", content2)

        window.requestAnimationFrame(function () {
            chai.expect(el.querySelector(".edit-content").innerHTML).to.equal(content2)
            done()
        })
    })

    it('should enable edit mode', function (done) {
        el.querySelector('[type="edit"]').click()

        window.requestAnimationFrame(function () {
            chai.expect(el.querySelector(".edit-content").hasAttribute("contenteditable")).to.equal(true)
            chai.expect(el.querySelectorAll('[type="check"]').length).to.equal(1)
            chai.expect(el.querySelectorAll('[type="close"]').length).to.equal(1)
            el.querySelector('[type="close"]').click()
            done()
        })
    })

    it('should cancel changes', function (done) {
        el.querySelector('[type="edit"]').click()

        window.requestAnimationFrame(function () {
            el.querySelector(".edit-content").textContent = content
            el.querySelector('[type="close"]').click()

            window.requestAnimationFrame(function () {
                chai.expect(el.querySelector(".edit-content").textContent).to.equal(content2)

                done()
            })
        })
    })

    it('should save changes', function (done) {
        el.querySelector('[type="edit"]').click()

        window.requestAnimationFrame(function () {
            el.querySelector(".edit-content").textContent = content

            el.querySelector('[type="check"]').click()

            window.requestAnimationFrame(function () {
                chai.expect(el.querySelector(".edit-content").textContent).to.equal(content)

                done()
            })
        })
    })

    it('should call save function on save', function (done) {
        chai.expect(el2.textContent).to.equal(content)
        cleanup()
        done()
    })

})