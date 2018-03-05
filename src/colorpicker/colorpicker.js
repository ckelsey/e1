import E1 from "../e1"
import template from "./colorpicker.html"

class Colorpicker {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.color = E1.getModel(el, "color")
        this.updateTimer = null
        this.picker = {
            name: this.el.getAttribute("component-id"),
            modal: {
                active: false,
                content: "color"
            },
            values: E1.services.ColorPickerService.convert(this.color),
            type: E1.services.ColorPickerService.getFormat(this.color) ? E1.services.ColorPickerService.getFormat(this.color).split("a").join("").toUpperCase() : E1.services.ColorPickerService.formats[0],
        }

        E1.services.ColorPickerService.pickers[this.picker.name] = this.picker

        this.el.innerHTML = template.split("{{colorAttr}}").join(this.el.getAttribute("color")).split("{{picker}}").join(this.picker.name)

        var input = this.el.querySelector(".color-result")
        var modalInputs = this.el.querySelectorAll(".colorpicker-modal input")
        var saveButton = this.el.querySelector(".save-color")
        var cancelButton = this.el.querySelector(".cancel-color")

        saveButton.addEventListener("click", ()=>{
            if(this.picker.type.label === "HEX"){
                this.color = this.picker.values.hex
            }else{
                var start = this.picker.type.label === "HSL" ? `hsl(` : `rgb(`
                var end = `)`

                if(this.picker.values.a !== 1){
                    start = this.picker.type.label === "HSL" ? `hsla(` : `rgba(`
                    end = `, ${this.picker.values.a})`
                }

                this.color = start + (this.picker.type.label === "HSL" ? `${this.picker.values.h}, ${this.picker.values.s}%, ${this.picker.values.l}%`: `${this.picker.values.r}, ${this.picker.values.g}, ${this.picker.values.b}`) + end
            }

            if(!window.localStorage.getItem("ColorpickerColors")){
                window.localStorage.setItem("ColorpickerColors", JSON.stringify([]))
            }

            var local = JSON.parse(window.localStorage.getItem("ColorpickerColors"))
            local.push(this.color)

            if(local.length > 21){
                local.shift()
            }

            window.localStorage.setItem("ColorpickerColors", JSON.stringify(local))
            
            E1.setModel(el, `color`, this.color)
            E1.setModel(null, `@ColorPickerService.previousColors`, local)
            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.modal.active`, false)
        })

        cancelButton.addEventListener("click", ()=>{
            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.modal.active`, false)
            
        })

        input.addEventListener("click", () => {
            input.blur()
            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.modal.active`, true)
            
            setTimeout(()=>{
                E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.values`, this.picker.values)
            }, 10)
        })

        var handleInput = (modalInput)=>{
            modalInput.addEventListener("input", (e) => {
                var key = e.target.getAttribute("color")
                var val = e.target.value
                var str = ""

                if (key === "hex" && (!val || val.length < 7)) {
                    return
                }

                if (!val) {
                    val = 0
                }

                if (key === "hex") {
                    str = E1.services.ColorPickerService.validHex(val)
                } else {
                    this.picker.values[key] = val
                }

                if (key === "r" || key === "g" || key === "b" || key === "a") {
                    str = `rgba(${this.picker.values.r}, ${this.picker.values.g}, ${this.picker.values.b}, ${this.picker.values.a})`
                }

                if (key === "h" || key === "s" || key === "l") {
                    str = `hsla(${this.picker.values.h}, ${this.picker.values.s}%, ${this.picker.values.l}%, ${this.picker.values.a})`
                }

                this.picker.values = E1.services.ColorPickerService.convert(str)

                E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.values`, this.picker.values)

                this.updateColorSample()
            })
        }

        for (var i = 0; i < modalInputs.length; i++) {
            handleInput(modalInputs[i])
        }

        E1.subscribe(`@ColorPickerService.pickers.${this.picker.name}.values`, ()=>{
            this.updateColorSample()
        })

        this.updateColorSample()

        E1.setModel(null, `@ColorPickerService.previousColors`, JSON.parse(window.localStorage.getItem("ColorpickerColors")) || [])

        window.addEventListener("resize", ()=>{
            E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.values`, this.picker.values)
        })
    }

    updateColorSample(){
        if(this.el.querySelector(".color-sample")){this.el.querySelector(".color-sample").style.background = `hsla(${this.picker.values.h}, ${this.picker.values.s}%, ${this.picker.values.l}%, ${this.picker.values.a})`}
    }

    update() {
        this.color = E1.getModel(this.el, "color")
        this.picker.values = E1.services.ColorPickerService.convert(this.color)
        E1.setModel(null, `@ColorPickerService.pickers.${this.picker.name}.values`, this.picker.values)
        this.el.querySelector("e1-color-wheel").updateColor()
        this.updateColorSample()
    }
}

E1.registerComponent("e1-colorpicker", Colorpicker)