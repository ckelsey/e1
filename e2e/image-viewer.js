describe('e1-image-viewer', function () {

    var images = [{
        preview: "image-screenshot-preview.png",
        download: "image-screenshot-download.png",
        url: "image-screenshot.png",
        type: "Screenshot",
        zoom: {
            x: -749,
            y: -421,
            w: 2080,
            h: 1170
        },
        drag: {
            x: -715,
            y: -201
        }
    }]

    var div = window.document.createElement("div")

    var el = window.document.createElement("e1-image-viewer")
    el.setAttribute("type", "@demoService.image.type")
    el.setAttribute("url", "@demoService.image.url")
    el.setAttribute("preview", "@demoService.image.preview")
    el.setAttribute("crop", "@demoService.image.crop")

    div.style.width = "580px"
    div.style.height = "580px"
    div.appendChild(el)
    window.document.body.appendChild(div)

    function cleanup() {
        div.parentElement.removeChild(div)
    }

    function comparePixels(pix1, pix2) {
        var nonMatches = 0
        var total = pix1.length / 4

        for (var i = 0, n = pix1.length; i < n; i += 4) {
            if (pix1[i] !== pix2[i] || pix1[i + 1] !== pix2[i + 1] || pix1[i + 2] !== pix2[i + 2]) {
                nonMatches = nonMatches + 1
            }
        }

        return (total - nonMatches) / total
    }

    function runImageTest(index, done) {
        var img = new Image()
        var hasRun = false

        function run() {
            if (hasRun) {
                return
            }
            hasRun = true
            var canvas = el.querySelector("canvas")
            var originalCtx = canvas.getContext("2d")
            var ctx = window.document.createElement("canvas").getContext("2d")
            ctx.canvas.width = img.width
            ctx.canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            var imgPixels = ctx.getImageData(0, 0, img.width, img.height).data
            var pixels = originalCtx.getImageData(0, 0, canvas.width, canvas.height).data
            var compare = comparePixels(pixels, imgPixels)

            chai.expect(compare).to.be.above(0.9)

            var renderer = el.querySelector(".image-renderer")
            var originalRenderBox = renderer.getBoundingClientRect()
            var originalCanvasBox = canvas.getBoundingClientRect()

            el.querySelector('[type="fullscreen"]').click()

            setTimeout(function () {
                var renderBox = renderer.getBoundingClientRect()

                chai.expect(renderBox.left).to.equal(0)
                chai.expect(renderBox.top).to.equal(0)
                chai.expect(renderBox.width).to.equal(window.innerWidth)
                chai.expect(renderBox.height).to.equal(window.innerHeight)

                el.querySelector('button.fullscreen-button').click()

                setTimeout(function () {
                    renderBox = renderer.getBoundingClientRect()
                    chai.expect(renderBox.left).to.equal(originalRenderBox.left)
                    chai.expect(renderBox.top).to.equal(originalRenderBox.top)
                    chai.expect(renderBox.width).to.equal(originalRenderBox.width)
                    chai.expect(renderBox.height).to.equal(originalRenderBox.height)

                    el.querySelector('[type="plus"]').click()

                    setTimeout(function () {
                        var canvasBox = canvas.getBoundingClientRect()
                        var viewBox = el.getBoundingClientRect()
                        var left = -(viewBox.left - canvasBox.left)
                        var top = -(viewBox.top - canvasBox.top)

                        chai.expect(Math.ceil(left)).to.equal(images[index].zoom.x)
                        chai.expect(Math.ceil(top)).to.equal(images[index].zoom.y)
                        chai.expect(Math.ceil(canvasBox.width)).to.equal(images[index].zoom.w)
                        chai.expect(Math.ceil(canvasBox.height)).to.equal(images[index].zoom.h)

                        var x = canvasBox.left + (canvasBox.width * 0.8)
                        var y = canvasBox.top + (canvasBox.height / 2)

                        var evt = new MouseEvent("mousedown", {
                            bubbles: false,
                            cancelable: true,
                            view: window,
                            clientX: x,
                            clientY: y
                        })

                        canvas.dispatchEvent(evt)

                        evt = new MouseEvent("mousemove", {
                            bubbles: false,
                            cancelable: true,
                            view: window,
                            clientX: x + 100,
                            clientY: y + 100
                        })

                        canvas.dispatchEvent(evt)

                        evt = new MouseEvent("mouseup", {
                            bubbles: false,
                            cancelable: true,
                            view: window,
                            clientX: x + 100,
                            clientY: y + 100
                        })

                        canvas.dispatchEvent(evt)

                        canvasBox = canvas.getBoundingClientRect()

                        chai.expect(Math.ceil(canvasBox.left)).to.equal(images[index].drag.x)
                        chai.expect(Math.ceil(canvasBox.top)).to.equal(images[index].drag.y)

                        el.querySelector('[type="minus"]').click()

                        setTimeout(function () {
                            canvasBox = canvas.getBoundingClientRect()
                            viewBox = el.getBoundingClientRect()
                            left = -(viewBox.left - canvasBox.left)
                            top = -(viewBox.top - canvasBox.top)

                            chai.expect(canvasBox.left).to.equal(originalCanvasBox.left)
                            chai.expect(canvasBox.top).to.equal(originalCanvasBox.top)
                            chai.expect(canvasBox.width).to.equal(originalCanvasBox.width)
                            chai.expect(canvasBox.height).to.equal(originalCanvasBox.height)

                            done()
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }

        img.onload = run

        img.src = images[index].download
    }

    var runCropTest = function () {
        var handles = {
            nw: document.getElementById("north-west-handle"),
            n: document.getElementById("north-handle"),
            ne: document.getElementById("north-east-handle"),
            sw: document.getElementById("south-west-handle"),
            s: document.getElementById("south-handle"),
            se: document.getElementById("south-east-handle"),
            w: document.getElementById("west-handle"),
            e: document.getElementById("east-handle"),
        }

        console.log(handles.nw)

        // for (var p in handles) {
        var e = new MouseEvent("mousedown", {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: handles.w.getBoundingClientRect().left + 1,
            clientY: handles.w.getBoundingClientRect().top + 1
        })

        handles.w.dispatchEvent(e)

        e = new MouseEvent("mousemove", {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: 0,
            clientY: 0
        })

        window.document.querySelector(".image-renderer").dispatchEvent(e)

        e = new MouseEvent("mouseup", {
            bubbles: false,
            cancelable: true,
            view: window,
            clientX: 50,
            clientY: 50
        })

        window.document.dispatchEvent(e)
        // }
    }

    var createNew = function () {
        div.innerHTML = ""
        el = window.document.createElement("e1-image-viewer")
        el.setAttribute("type", "@demoService.image.type")
        el.setAttribute("url", "@demoService.image.url")
        el.setAttribute("preview", "@demoService.image.preview")
        el.setAttribute("crop", "@demoService.image.crop")

        div.style.width = "580px"
        div.style.height = "580px"
        div.appendChild(el)
        window.document.body.appendChild(div)
    }


    it('should load screenshot image', function (done) {
        this.timeout(10000)

        el.onready = function () {
            runImageTest(0, done)
        }

        E1.setModel(null, "@demoService.image", images[0])
    })

    it('should load screenshot image with crop', function (done) {
        this.timeout(10000)

        createNew()

        el.onready = function () {
            runCropTest()
        }

        images[0].crop = true

        E1.setModel(null, "@demoService.image", images[0])

    })

})