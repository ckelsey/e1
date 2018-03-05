const E1 = require("../e1")
const templates = {
    circle: require("./progress-circle.html"),
    bar: require("./progress-bar.html")
}

class Progress {
    constructor(el) {
        this.el = el
        this.update = this.update

        this.update()
    }

    update() {
        this.progress = E1.getModel(this.el, "progress", 0)
        this.type = E1.getModel(this.el, "type", "circle")

        this.el.innerHTML = ""
        this.el.appendChild(E1.cleanHtml(templates[this.type]))

        if(this.progress < 0){
            this.progress = 0
        }else if(this.progress > 100){
            this.progress = 100
        }

        if(this.type === "circle"){

            var text = this.el.querySelector("text")
            var circle = this.el.querySelector("ellipse")
            var percent = (1 - (parseFloat(this.progress) / 100))
            var width = parseFloat(circle.getAttribute("stroke-dasharray"))
            
            circle.setAttribute("stroke-dashoffset",  percent * width)
            text.textContent = this.progress + "%"

        }else if(this.type === "bar"){
            
            var textEl = this.el.querySelector(".progress-text")
            var bar = this.el.querySelector(".progress-bar")
            
            bar.style.width = this.progress + "%"
            textEl.textContent = this.progress + "%"
        }
    }
}

E1.registerComponent("e1-progress", Progress)