import E1 from "../e1"

class E1Show {
    constructor(el) {
        this.el = el
        this.el["e1-show-onUpdate"] = this.update
        this.throttle = null
        this.update()
    }

    check(){
        var val = this.el.getAttribute("e1-show")
        var notBoundOrEmpty = val && val[0] !== "@" && val !== "null" && val !== "undefined" && val !== "false"
        return E1.isTruthy(this.el.getAttribute("e1-show")) || notBoundOrEmpty
    }

    update() {
        clearTimeout(this.throttle)

        this.throttle = setTimeout(()=>{    
            if(this.check()){
                this.el.style.removeProperty("display")
            }else{
                this.el.style.display = "none"
            }
        }, 10)
    }
}

E1.registerAttribute("e1-show", E1Show)