const E1 = require("../e1")

class E1Tooltip {
    constructor(el) {
        this.el = el
        this.el["e1-tooltip-onUpdate"] = this.update
        this.update()
    }

    open() {
        
        this.el.classList.toggle("tooltip-active")
    }

    update() {
        var display = E1.getModel(this.el, "e1-tooltip", false)

        var open = () => {
            this.open()
        }

        if (this.el.parentNode) {
            this.el.parentNode.style.cursor = "pointer"
            this.el.parentNode.style.position = "relative"
            this.el.parentNode.style.display = display ? display : "inline-block"
            this.el.parentNode.removeEventListener("click", open)
            this.el.parentNode.addEventListener("click", open)
        }

    }
}

E1.registerAttribute("e1-tooltip", E1Tooltip)