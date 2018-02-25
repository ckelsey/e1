const E1 = require("../e1")

class E1Attribute {
    constructor(el) {
        this.el = el
        this.el["e1-attribute-onUpdate"] = this.update
        this.renderAttributes()
    }

    renderAttributes() {
        var attrString = this.el.getAttribute("e1-attribute")
        var attributes = attrString.split("&&").map(c => { return c.trim() })

        attributes.forEach(attr => {
            var valueAttr = attr.split(":").map(c => { return c.trim() })

            if (valueAttr.length > 1) {
                var value = E1.getModel(null, valueAttr[0])
                
                if (value) {
                    this.el.setAttribute(valueAttr[1], value)
                } else {
                    this.el.removeAttribute(valueAttr[1])
                }
            }
        })
    }

    update() {
        this.renderAttributes()
    }
}

E1.registerAttribute("e1-attribute", E1Attribute)