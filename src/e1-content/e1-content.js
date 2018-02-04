class E1Content {
    constructor(el) {
        this.el = el
        this.el["e1-content-onUpdate"] = this.update
        this.content = window.E1.cleanHtml(window.E1.getModel(this.el, "e1-content"))
        // if(this.el.getAttribute("e1-if") && !window.E1.getModel(this.el, "e1-if")){
        //     console.log("RETURN")
        //     return
        // }

        this.el.innerHTML = this.content
    }

    update() {
        var content = window.E1.cleanHtml(window.E1.getModel(this.el, "e1-content"))
        if(content !== this.content){
            this.content = content
            this.el.innerHTML = this.content
        }
    }
}

window.E1.registerAttribute("e1-content", E1Content)