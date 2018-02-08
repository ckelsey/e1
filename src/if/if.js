const E1 = require("../e1")

class E1If {
    constructor(el) {
        this.el = el
        this.el["e1-if-onUpdate"] = this.update
        this.parentNode = this.el.parentNode
        this.index = Array.prototype.indexOf.call(this.el.parentNode.childNodes, this.el)

        var model = E1.getModel(this.el, "e1-if")

        if(!model){
            this.parentNode.removeChild(this.el)
        }
        
        this.throttle
    }

    update() {
        clearTimeout(this.throttle)

        this.throttle = setTimeout(()=>{

            var model = E1.getModel(this.el, "e1-if")
    
            if(model){
                this.parentNode.insertBefore(this.el, this.parentNode.children[this.index]);
            }else if(this.parentNode.contains(this.el)){
                this.parentNode.removeChild(this.el)
            }
        }, 100)
    }
}

E1.registerAttribute("e1-if", E1If)