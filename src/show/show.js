const E1 = require("../e1")

class E1Show {
    constructor(el) {
        this.el = el
        this.el["e1-show-onUpdate"] = this.update
        this.update()
    }

    update() {
        var model = E1.getModel(this.el, "e1-show")

        if(model){
            this.el.style.removeProperty("display")
        }else{
            this.el.style.display = "none"
        }
    }
}

E1.registerAttribute("e1-show", E1Show)