const E1 = require("../e1")
const wheelHtml = require("./wheel.html")

class ColorWheel {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.el.innerHTML = wheelHtml
        this.picker = E1.getModel(this.el, "picker")
        this.el.updateColor = ()=>{
            this.update()
        }

        var dragging = false

        var mouseMove = (e) => {
            if (!dragging) {
                return
            }

            var hueLight = E1.services.ColorPickerService.hueLightFromPoint(e, this.el.querySelector(".c-ckolor__wheel-value"))

            this.picker.values = E1.services.ColorPickerService.convert(`hsla(${hueLight.h}, ${this.picker.values.s}%, ${hueLight.l}%, ${this.picker.values.a})`)

            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.values`, this.picker.values)
            this.update()
        }

        var clear = () => {
            dragging = false
            this.el.removeEventListener("mousemove", mouseMove)
        }

        this.el.addEventListener("mousedown", (e) => {
            e.preventDefault()
            dragging = true

            mouseMove(e)

            this.el.addEventListener("mousemove", mouseMove)
        })

        this.el.addEventListener("mouseleave", () => {
            clear()
        })

        window.document.addEventListener("mouseup", () => {
            clear()
        })

        window.document.addEventListener("mouseleave", () => {
            clear()
        })

        window.requestAnimationFrame(()=>{
            this.update()
        })

        E1.subscribe(`@ColorPickerService.pickers.${this.picker.name}.values`, ()=>{
            this.update()
        })
    }

    update() {
        window.requestAnimationFrame(() => {
            var scoop = this.el.querySelector(".c-ckolor__wheel-scoop")
            var hues = this.el.querySelectorAll(".c-ckolor__wheel-color-inner2")
            var h = E1.getModel(this.el, "picker").values.h
            var s = E1.getModel(this.el, "picker").values.s
            var l = E1.getModel(this.el, "picker").values.l
            var radialPoints = E1.services.ColorPickerService.radialXY(h, l, this.el.querySelector(".c-ckolor__wheel-value"))

            for (var i = 0; i < hues.length; i++) {
                var color = `hsl(${E1.services.ColorPickerService.hues[i]}, ${s}%, 50%)`
                hues[i].style.backgroundColor = color
            }

            scoop.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`
            scoop.style.left = radialPoints.x + "px"
            scoop.style.top = radialPoints.y + "px"
        })

    }
}

E1.registerComponent("e1-color-wheel", ColorWheel)