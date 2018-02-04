class E1Show {
    constructor(el) {
        this.el = el
        this.el["e1-show-onUpdate"] = this.update
        this.update()
    }

    update() {
        var model = window.E1.getModel(this.el, "e1-show")

        if(model){
            this.el.style.removeProperty("display")
        }else{
            this.el.style.display = "none"
        }
    }
}

window.E1.registerAttribute("e1-show", E1Show)