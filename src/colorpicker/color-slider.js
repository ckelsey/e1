import E1 from "../e1"

class ColorSSlider {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.el.innerHTML = `<div class="input-range"><div class="input-range-handle"></div></div>`
        this.picker = E1.getModel(this.el, "picker")
        this.key = E1.getModel(this.el, "key")
        this.max = parseInt(E1.getModel(this.el, "max"))

        var dragging = false

        var mouseMove = (e) => {
            if (!dragging) {
                return
            }

            var box = this.el.getBoundingClientRect()
            var val = ((e.pageX - box.left) / box.width) * 100
            val = val < 0 ? 0 : val > 100 ? 100 : val
            val = val ? (val / 100) * this.max : val

            this.picker.values[this.key] = val

            if (["h", "s", "l"].indexOf(this.key) > -1) {
                this.picker.values = E1.services.ColorPickerService.convert(`hsla(${this.picker.values.h}, ${this.picker.values.s}, ${this.picker.values.l}, ${this.picker.values.a})`)
            } else {
                this.picker.values = E1.services.ColorPickerService.convert(`rgba(${this.picker.values.r}, ${this.picker.values.g}, ${this.picker.values.b}, ${this.picker.values.a})`)
            }

            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}`, this.picker)
        }

        var clear = () => {
            dragging = false
            window.document.removeEventListener("mousemove", mouseMove)
        }

        this.el.addEventListener("mousedown", (e) => {
            e.preventDefault()
            dragging = true

            mouseMove(e)

            window.document.addEventListener("mousemove", mouseMove)
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

        E1.subscribe(`@ColorPickerService.pickers.${this.picker.name}.values`, () => {
            this.update()
        })

        window.requestAnimationFrame(() => {
            this.update()
        })
    }

    update() {
        this.key = E1.getModel(this.el, "key")
        this.max = parseInt(E1.getModel(this.el, "max"))

        var handle = this.el.querySelector(".input-range-handle")
        handle.style.left = `calc(${(this.picker.values[this.key] / this.max) * 100}% - ${handle.offsetWidth / 2}px)`

        var rangeBg

        if (this.key === "a") {
            rangeBg = `linear-gradient(to right, hsla(${this.picker.values.h}, ${this.picker.values.s}%, ${this.picker.values.l}%, 0), hsla(${this.picker.values.h}, ${this.picker.values.s}%, ${this.picker.values.l}%, 1) 100%)`
        } else {
            rangeBg = `linear-gradient(to right, hsl(${this.picker.values.h}, 0%, ${this.picker.values.l}%), hsl(${this.picker.values.h}, 100%, ${this.picker.values.l}%) 100%)`
        }

        var range = this.el.querySelector(".input-range")
        range.style.background = rangeBg
    }
}

E1.registerComponent("e1-color-slider", ColorSSlider)