const E1 = require("../e1")

class Collapse {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.collapse = parseFloat(E1.getModel(this.el, "collapse", 300))
        this.target = window.document.querySelector(E1.getModel(this.el, "target", `[component-id=${this.el.getAttribute("component-id")}]`))

        this.toggle = this.el.querySelector('[e1-collapse-toggle]')
        this.content = this.el.querySelector('[e1-collapse-content]')

        if (!this.toggle) {
            this.toggle = window.document.createElement("div")
            this.toggle.setAttribute("e1-collapse-toggle", "")
            this.toggle.appendChild(E1.cleanHtml('<e1-icon type="down"></e1-icon>'))
        }

        if (!this.content) {
            this.content = window.document.createElement("div")
            this.content.setAttribute("e1-collapse-content", "")
            this.content.innerHTML = this.el.innerHTML
        }

        this.el.innerHTML = ""
        this.el.appendChild(this.toggle)
        this.el.appendChild(this.content)

        var self = this
        var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)

        var click = ()=>{
            self.el.classList.toggle("open")
        }

        if(isMobile){
            this.toggle.addEventListener("touch", click)
        }else{
            this.toggle.addEventListener("click", click)
        }

        var next = () => {
            self.check()
            window.requestAnimationFrame(next)
        }

        next()
    }

    check() {
        if(!this.target){
            return
        }

        if (this.target.getBoundingClientRect().width > this.collapse) {
            this.el.classList.remove("collapse")
        } else {
            this.el.classList.add("collapse")
        }
    }

    update() {
        this.collapse = parseFloat(E1.getModel(this.el, "collapse", 300))
        this.target = window.document.querySelector(E1.getModel(this.el, "target", `[component-id=${this.el.getAttribute("component-id")}]`))
    }
}

E1.registerComponent("e1-collapse", Collapse)