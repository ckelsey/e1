describe(`e1-colorpicker`, function () {

    var color = `rgb(170, 170, 170)`
    E1.setModel(null, `@demoService.color`, color)

    var el = window.document.createElement(`e1-colorpicker`)
    el.id = `color_picker`
    el.setAttribute(`color`, `@demoService.color`)
    window.document.body.appendChild(el)

    function cleanup() {
        el.parentNode.removeChild(el)
    }

    it(`should have an input with the correct color value`, function (done) {
        var input = el.querySelectorAll(`input.color-result`)
        var swatch = el.querySelectorAll(`font`)

        chai.expect(input.length).to.equal(1)
        chai.expect(swatch.length).to.equal(1)
        chai.expect(input[0].value).to.equal(color)
        chai.expect(swatch[0].style.backgroundColor).to.equal(color)
        done()
    })

    it(`should open modal when input is clicked`, function (done) {
        var input = el.querySelector(`input.color-result`)
        var modal = el.querySelector(`.colorpicker-modal`)

        input.click()

        setTimeout(function () {
            var display = window.getComputedStyle(modal, false).getPropertyValue(`display`)
            chai.expect(display).to.equal(`flex`)
            done()
        }, 50)
    })

    it(`should update the color when dragging on color wheel`, function (done) {
        var wheel = el.querySelector(`e1-color-wheel`)
        var wheelPosition = wheel.getBoundingClientRect()
        var x = wheelPosition.left + (wheelPosition.width / 3)
        var y = wheelPosition.top + (wheelPosition.height / 2)

        var evt = new MouseEvent(`mousedown`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        wheel.dispatchEvent(evt)

        evt = new MouseEvent(`mouseleave`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        wheel.dispatchEvent(evt)

        var newColor = el.querySelector(`.color-sample`).style.background

        chai.expect(newColor).to.equal(`rgb(166, 166, 166)`)

        done()
    })

    it(`should update the color when dragging on saturation bar`, function (done) {
        var slider = el.querySelector(`e1-color-slider[key="s"]`)
        var sliderPosition = slider.getBoundingClientRect()
        var x = sliderPosition.left + (sliderPosition.width * 0.6)
        var y = sliderPosition.top + (sliderPosition.height / 2)

        var evt = new MouseEvent(`mousedown`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        slider.dispatchEvent(evt)

        evt = new MouseEvent(`mouseleave`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        slider.dispatchEvent(evt)

        var newColor = el.querySelector(`.color-sample`).style.background

        chai.expect(newColor).to.equal(`rgb(112, 220, 193)`)

        done()
    })

    it(`should update the color when dragging on alpha bar`, function (done) {
        var slider = el.querySelector(`e1-color-slider[key="a"]`)
        var sliderPosition = slider.getBoundingClientRect()
        var x = sliderPosition.left + (sliderPosition.width * 0.8)
        var y = sliderPosition.top + (sliderPosition.height / 2)

        var evt = new MouseEvent(`mousedown`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        slider.dispatchEvent(evt)

        evt = new MouseEvent(`mouseleave`, {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        })

        slider.dispatchEvent(evt)

        var newColor = el.querySelector(`.color-sample`).style.background

        chai.expect(newColor).to.equal(`rgba(112, 219, 193, 0.8)`)

        done()
    })

    it(`should update format when changed`, function (done) {
        chai.expect(el.querySelector(`.select-menu-selected-text`).value.toLowerCase()).to.equal(`rgb`)

        var ev = new MouseEvent(`mouseenter`, {})
        el.querySelector(`e1-select`).dispatchEvent(ev)

        window.requestAnimationFrame(function () {
            el.querySelector(`.select-menu-option[option-key="0"]`).click()

            setTimeout(function () {
                chai.expect(el.querySelector(`.select-menu-selected-text`).value.toLowerCase()).to.equal(`hsl`)
                chai.expect(el.querySelector(`.color-input[color="h"]`).parentElement.style.display).to.not.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="s"]`).parentElement.style.display).to.not.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="l"]`).parentElement.style.display).to.not.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="a"]`).parentElement.style.display).to.not.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="r"]`).parentElement.style.display).to.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="g"]`).parentElement.style.display).to.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="b"]`).parentElement.style.display).to.equal(`none`)
                chai.expect(el.querySelector(`.color-input[color="hex"]`).parentElement.style.display).to.equal(`none`)

                done()
            }, 500)
        })
    })

    it(`should update alpha when alpha value is updated`, function (done) {
        var ev = new MouseEvent(`mouseenter`, {})
        el.querySelector(`e1-select`).dispatchEvent(ev)

        window.requestAnimationFrame(function () {

            el.querySelector(`.select-menu-option[option-key="2"]`).click()

            setTimeout(function () {

                el.querySelector(`.color-input[color="a"]`).value = 1
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="a"]`).dispatchEvent(ev)

                ev = new MouseEvent(`mouseenter`, {})
                el.querySelector(`e1-select`).dispatchEvent(ev)

                window.requestAnimationFrame(function () {

                    el.querySelector(`.select-menu-option[option-key="0"]`).click()

                    setTimeout(function () {

                        chai.expect(parseInt(el.querySelector(`.color-input[color="a"]`).value)).to.equal(1)

                        done()
                    }, 500)
                })
            }, 500)
        })
    })

    it(`should update color when hex value is updated`, function (done) {
        var ev = new MouseEvent(`mouseenter`, {})
        el.querySelector(`e1-select`).dispatchEvent(ev)

        window.requestAnimationFrame(function () {

            el.querySelector(`.select-menu-option[option-key="1"]`).click()

            setTimeout(function () {

                el.querySelector(`.color-input[color="hex"]`).value = `#a10005`
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="hex"]`).dispatchEvent(ev)

                ev = new MouseEvent("mouseenter", {})
                el.querySelector("e1-select").dispatchEvent(ev)

                window.requestAnimationFrame(function () {

                    el.querySelector(`.select-menu-option[option-key="2"]`).click()

                    setTimeout(function () {

                        chai.expect(parseInt(el.querySelector(`.color-input[color="r"]`).value)).to.equal(161)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="g"]`).value)).to.equal(0)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="b"]`).value)).to.equal(5)

                        done()
                    }, 500)
                })
            }, 500)
        })
    })

    it(`should update color when rgb value is updated`, function (done) {
        var ev = new MouseEvent(`mouseenter`, {})
        el.querySelector(`e1-select`).dispatchEvent(ev)

        window.requestAnimationFrame(function () {

            el.querySelector(`.select-menu-option[option-key="2"]`).click()

            setTimeout(function () {

                el.querySelector(`.color-input[color="r"]`).value = 20
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="r"]`).dispatchEvent(ev)

                el.querySelector(`.color-input[color="g"]`).value = 100
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="g"]`).dispatchEvent(ev)

                el.querySelector(`.color-input[color="b"]`).value = 50
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="b"]`).dispatchEvent(ev)

                ev = new MouseEvent(`mouseenter`, {})
                el.querySelector(`e1-select`).dispatchEvent(ev)

                window.requestAnimationFrame(function () {

                    el.querySelector(`.select-menu-option[option-key="0"]`).click()

                    setTimeout(function () {

                        chai.expect(parseInt(el.querySelector(`.color-input[color="h"]`).value)).to.equal(142)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="s"]`).value)).to.equal(66)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="l"]`).value)).to.equal(23)

                        done()
                    }, 500)
                })
            }, 500)
        })
    })

    it(`should update color when hsl value is updated`, function (done) {
        var ev = new MouseEvent(`mouseenter`, {})
        el.querySelector(`e1-select`).dispatchEvent(ev)

        window.requestAnimationFrame(function () {

            el.querySelector(`.select-menu-option[option-key="0"]`).click()

            setTimeout(function () {

                el.querySelector(`.color-input[color="h"]`).value = 20
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="h"]`).dispatchEvent(ev)

                el.querySelector(`.color-input[color="s"]`).value = 100
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="s"]`).dispatchEvent(ev)

                el.querySelector(`.color-input[color="l"]`).value = 50
                ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="l"]`).dispatchEvent(ev)

                ev = new MouseEvent(`mouseenter`, {})
                el.querySelector(`e1-select`).dispatchEvent(ev)

                window.requestAnimationFrame(function () {

                    el.querySelector(`.select-menu-option[option-key="2"]`).click()

                    setTimeout(function () {

                        chai.expect(parseInt(el.querySelector(`.color-input[color="r"]`).value)).to.equal(255)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="g"]`).value)).to.equal(85)
                        chai.expect(parseInt(el.querySelector(`.color-input[color="b"]`).value)).to.equal(0)

                        done()
                    }, 500)
                })
            }, 500)
        })
    })

    it(`should not save the color if cancel is cicked`, function (done) {
        el.querySelector(`.cancel-color`).click()
        var input = el.querySelector(`input.color-result`)
        chai.expect(input.value).to.equal(color)
        done()
    })

    it(`should save the color if save is cicked`, function (done) {
        setTimeout(function () {
            var input = el.querySelector(`input.color-result`)
            var modal = el.querySelector(`.colorpicker-modal`)

            input.click()

            setTimeout(function () {
                el.querySelector(`.color-input[color="hex"]`).value = `#a10005`
                var ev = new Event(`input`, {})
                el.querySelector(`.color-input[color="hex"]`).dispatchEvent(ev)

                el.querySelector(`.save-color`).click()
                var input = el.querySelector(`input.color-result`)
                chai.expect(input.value).to.equal(`rgb(161, 0, 5)`)
                done()
            }, 50)
        }, 50)
    })

    it(`should save the color in the color history`, function (done) {
        setTimeout(function () {
            var input = el.querySelector(`input.color-result`)
            var modal = el.querySelector(`.colorpicker-modal`)

            input.click()

            setTimeout(function () {
                var prev = el.querySelectorAll(`.previous-color`)

                chai.expect(prev.length).to.not.equal(0)

                prev = prev[prev.length - 1]

                chai.expect(prev.style.backgroundColor).to.equal(`rgb(161, 0, 5)`)

                cleanup()

                done()
            }, 50)
        }, 50)
    })

})