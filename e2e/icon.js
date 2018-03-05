describe('e1-icon', function () {
    var _color = "rgb(161, 0, 5)"
    var width = "50px"
    var types = [
        "360",
        "binoculars",
        "bookmark",
        "bookmark-filled",
        "cardboard",
        "check",
        "close-thin",
        "close",
        "contest",
        "delete",
        "down",
        "edit",
        "facebook",
        "fullscreen",
        "heart-filled",
        "heart",
        "image",
        "minus",
        "next",
        "plus",
        "previous",
        "search",
        "share",
        "twitter",
        "up",
        "upload",
        "vr",
        "weibo"
    ]

    E1.setModel(null, "@demoService.iconType", types[0])
    E1.setModel(null, "@demoService.iconColor", _color)
    E1.setModel(null, "@demoService.iconWidth", width)

    var el = window.document.createElement("e1-icon")
    el.setAttribute("type", "@demoService.iconType")
    el.setAttribute("e1-style", "@demoService.iconColor:color && @demoService.iconWidth:width")
    window.document.body.appendChild(el)

    function cleanup() {
        el.parentElement.removeChild(el)
    }


    it('should have correct icon', function (done) {
        function doIcon(i) {

            E1.setModel(null, "@demoService.iconType", types[i])

            window.requestAnimationFrame(function () {
                chai.expect(el.querySelector("svg").getAttribute("type")).be.equal(types[i])
                console.log(i, types[i])
                if (i === types.length - 1) {
                    done()
                } else {
                    doIcon(i + 1)
                }
            })
        }

        chai.expect(el.querySelector("svg").getAttribute("type")).be.equal(types[0])
        doIcon(1)
    })

    it('should have correct color', function (done) {
        var path = el.querySelector("svg path")
        var color = window.getComputedStyle(path, false).getPropertyValue("fill")

        chai.expect(color).be.equal(_color)
        done()
    })

    it('should have correct width and height', function (done) {
        var svg = el.querySelector("svg")

        chai.expect(svg.getBoundingClientRect().width).be.equal(parseInt(width))
        chai.expect(svg.getBoundingClientRect().width).be.equal(parseInt(width))
        cleanup()
        done()
    })

})