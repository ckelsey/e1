describe('e1-dropdown', function () {

    var dropdown = {
        label: "A label",
        list: [
            "A",
            "b",
            "C"
        ]
    }

    E1.setModel(null, "@demoService.dropdown", dropdown)

    var el = window.document.createElement("e1-dropdown")
    var el2 = window.document.createElement("p")
    el2.setAttribute("e1-content", "@demoService.dropdown.selectedText")

    el.optionClicked = function (e, opt) {
        E1.setModel(null, "@demoService.dropdown.selectedText", opt.innerHTML)
    }

    el.setAttribute("label", "@demoService.dropdown.label")
    el.setAttribute("list", "@demoService.dropdown.list")

    window.document.body.appendChild(el)
    window.document.body.appendChild(el2)

    function cleanup() {
        el.parentNode.removeChild(el)
        el2.parentNode.removeChild(el2)
    }

    it('should have a label', function (done) {
        chai.expect(el.querySelector(".dropdown-list-label")).to.not.equal(undefined)
        chai.expect(el.querySelector(".dropdown-list-label").innerHTML).to.equal(dropdown.label)
        done()
    })

    it('should update the label', function (done) {
        dropdown.label = "<span><b>A</b> label</span>"
        E1.setModel(null, "@demoService.dropdown", dropdown)

        window.requestAnimationFrame(function () {
            chai.expect(el.querySelector(".dropdown-list-label").innerHTML).to.equal(dropdown.label)
            done()
        })
    })

    it('should have a list', function (done) {
        chai.expect(el.querySelector(".dropdown-list-label").className).to.equal("dropdown-list-label has-options")
        chai.expect(el.querySelectorAll(".dropdown-list-option").length).to.equal(dropdown.list.length)
        chai.expect(el.querySelectorAll(".dropdown-list-option")[0].innerHTML).to.equal(dropdown.list[0])
        chai.expect(el.querySelectorAll(".dropdown-list-option")[1].innerHTML).to.equal(dropdown.list[1])
        chai.expect(el.querySelectorAll(".dropdown-list-option")[2].innerHTML).to.equal(dropdown.list[2])
        done()
    })

    it('should update the list', function (done) {
        dropdown.list = ["D", "e"]
        E1.setModel(null, "@demoService.dropdown", dropdown)

        window.requestAnimationFrame(function () {
            chai.expect(el.querySelector(".dropdown-list-label").className).to.equal("dropdown-list-label has-options")
            chai.expect(el.querySelectorAll(".dropdown-list-option").length).to.equal(dropdown.list.length)
            chai.expect(el.querySelectorAll(".dropdown-list-option")[0].innerHTML).to.equal(dropdown.list[0])
            done()
        })
    })

    it('should open the list on mouseover', function (done) {
        var ev = new MouseEvent("mouseenter", {})
        el.dispatchEvent(ev)

        window.requestAnimationFrame(function () {
            chai.expect(el.querySelector(".dropdown-container").classList.contains("mouseenter")).to.equal(true)
            done()
        })
    })

    it('should close the list on mouseleave', function (done) {
        var ev = new MouseEvent("mouseleave", {})
        el.dispatchEvent(ev)

        setTimeout(function () {
            chai.expect(el.querySelector(".dropdown-container").classList.contains("mouseenter")).to.equal(false)
            done()
        }, 500)
    })

    it('should close the list on list item click', function (done) {
        var ev = new MouseEvent("mouseenter", {})
        el.dispatchEvent(ev)

        window.requestAnimationFrame(function () {
           
            el.querySelector(".dropdown-list-option").click()

            setTimeout(function () {

                chai.expect(el.querySelector(".dropdown-container").classList.contains("mouseenter")).to.equal(false)
                done()
            }, 500)
        })
    })

    it('should call optionClicked function when list item is clicked', function (done) {

        var ev = new MouseEvent("mouseenter", {})
        el.dispatchEvent(ev)

        window.requestAnimationFrame(function () {
           
            el.querySelectorAll(".dropdown-list-option")[dropdown.list.length - 1].click()

            setTimeout(function () {

                chai.expect(el.querySelector(".dropdown-container").classList.contains("mouseenter")).to.equal(false)

                chai.expect(el2.innerHTML).to.equal(dropdown.list[dropdown.list.length - 1])
                done()
            }, 500)
        })
    })

    it('should remove the list', function (done) {
        dropdown.list = []
        E1.setModel(null, "@demoService.dropdown", dropdown)

        setTimeout(function () {
            chai.expect(el.querySelector(".dropdown-list-label").className).to.equal("dropdown-list-label")
            chai.expect(el.querySelectorAll(".dropdown-list-option").length).to.equal(dropdown.list.length)
            cleanup()
            done()
        }, 50)
    })

})