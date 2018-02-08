const E1 = require("../e1")

class E1Content {
    constructor(el) {
        this.el = el
        this.el["e1-content-onUpdate"] = this.update
        this.content = E1.cleanHtml(E1.getModel(this.el, "e1-content"), this.el)
        this.el.innerHTML = ""

        if(this.content){
            this.el.appendChild(this.content)
        }
    }

    update() {
        var content = E1.cleanHtml(E1.getModel(this.el, "e1-content"), this.el)
        
        if(content !== this.content){
            this.content = content
            this.el.innerHTML = ""
            
            if(this.content){
                this.el.appendChild(this.content)
            }
        }
    }
}

E1.registerAttribute("e1-content", E1Content)