const accordianHtml = `
<div class="accordian-tabs">
    <span e1-accordian-toggle="one" e1-accordian-toggle-group="demo">One</span>
    <span e1-accordian-toggle="two" e1-accordian-toggle-group="demo">Two</span>
    <span e1-accordian-toggle="three" e1-accordian-toggle-group="demo">Three</span>
</div>
<div class="accordian-contents">
    <div style="padding: 14px 0px;" e1-accordian-content="one" e1-accordian-toggle-group="demo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
    <div style="padding: 14px 0px;" e1-accordian-content="two" e1-accordian-toggle-group="demo">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
    <div style="padding: 14px 0px;" e1-accordian-content="three" e1-accordian-toggle-group="demo">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
</div>
`

describe(`e1-accordian`, function () {

    let el

    function checkHeight(el, max, amount) {
        return new Promise(function (resolve, reject) {
            function check() {
                var height = el.getBoundingClientRect().height
                if (!max) {
                    return reject(height)
                }

                if (amount !== undefined) {
                    if (height === amount) {
                        return resolve(height)
                    }
                } else if (height) {
                    return resolve(height)
                }

                return window.requestAnimationFrame(check)
            }

            window.requestAnimationFrame(check)
        })
    }

    it(`should open first tab once clicked`, function (done) {
        el = window.document.body.appendChild(E1.cleanHtml(`<div>${accordianHtml}</div>`))

        window.requestAnimationFrame(function () {
            var tab1 = window.document.querySelector(`[e1-accordian-toggle="one"]`)
            var content = window.document.querySelector(`[e1-accordian-content="one"]`)

            tab1.click()

            checkHeight(content, 1500).then(function () {
                chai.expect(tab1.className).to.equal("active-accordian")
                chai.expect(content.className).to.equal("active-accordian")
                done()
            }, function (res) {
                chai.expect(res).to.be.above(10)
                done()
            })
        })
    })

    it(`should close first tab once clicked`, function (done) {
        var tab1 = window.document.querySelector(`[e1-accordian-toggle="one"]`)
        var content = window.document.querySelector(`[e1-accordian-content="one"]`)

        tab1.click()

        checkHeight(content, 1500, 0).then(function () {
            chai.expect(tab1.className).to.equal("")
            chai.expect(content.className).to.equal("")
            done()
        }, function (res) {
            chai.expect(res).to.equal(0)
            done()
        })

    })

    it(`should open second tab once clicked`, function (done) {
        var tab = window.document.querySelector(`[e1-accordian-toggle="two"]`)
        var content = window.document.querySelector(`[e1-accordian-content="two"]`)

        tab.click()

        checkHeight(content, 1500).then(function () {
            chai.expect(tab.className).to.equal("active-accordian")
            chai.expect(content.className).to.equal("active-accordian")
            done()
        }, function (res) {
            chai.expect(res).to.be.above(10)
            done()
        })
    })

    it(`should close second tab once third is clicked`, function (done) {
        var tab = window.document.querySelector(`[e1-accordian-toggle="two"]`)
        var content = window.document.querySelector(`[e1-accordian-content="two"]`)
        var tab3 = window.document.querySelector(`[e1-accordian-toggle="three"]`)
        var content3 = window.document.querySelector(`[e1-accordian-content="three"]`)

        tab3.click()

        checkHeight(content, 1500, 0).then(function () {
            chai.expect(tab.className).to.equal("")
            chai.expect(content.className).to.equal("")
            chai.expect(tab3.className).to.equal("active-accordian")
            chai.expect(content3.className).to.equal("active-accordian")
            el.parentNode.removeChild(el)
            done()
        }, function (res) {
            chai.expect(res).to.be.above(10)
            el.parentNode.removeChild(el)
            done()
        })
    })

})