const E1 = require("../e1")

class E1Style {
    constructor(el) {
        this.el = el
        this.el["e1-if-style"] = this.update
        this.setStyles()
    }

    setStyles() {
        var styles = this.el.getAttribute("e1-style").split("&&").map(i => i.trim())
        var styleString = ""

        styles.forEach(style => {
            style = style.split(":").map(i => i.trim())

            if(style.length === 2){
                var styleVal = E1.getModel(null, style[0])
                
                if(styleVal || styleVal === 0){
                    styleString += `${style[1]}:${styleVal};`
                }
            }else{
                styleString += E1.getModel(null, style[0])
            }
        });
        
        if(styleString !== ""){
            this.el.setAttribute("style", styleString)
        }else{
            this.el.removeAttribute("style")
        }
    }

    update() {
        this.setStyles()
    }
}

E1.registerAttribute("e1-style", E1Style)