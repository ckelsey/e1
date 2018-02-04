class E1If {
    constructor(el) {
        this.el = el
        this.el["e1-if-onUpdate"] = this.update
        this.content = this.el.innerHTML
        this.el.innerHTML = ""
        this.update()
    }

    update() {
        var model = window.E1.getModel(this.el, "e1-if")

        if(model){
            this.el.innerHTML = this.content
        }else{
            this.el.innerHTML = ""
        }

        window.E1.scan(this.el)
    }
}

window.E1.registerAttribute("e1-if", E1If)