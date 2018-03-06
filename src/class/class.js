const E1 = require("../e1")

class E1Class {
    constructor(el) {
        this.el = el
        this.el["e1-class-onUpdate"] = this.update
        this.classes = []
        this.renderClasses()
    }


    renderClasses() {
        var classString = this.el.getAttribute("e1-class")
        var classes = classString.split("&&").map(c => { return c.trim() })
        var classesQueue = []

        classes.forEach(clss => {
            var conditional = clss.split("?").map(c => { return c.trim() })


            if (conditional.length > 1) {
                var cond = E1.getModel(null, conditional[0])

                if (conditional[1].substring(0, 1) === "@") {
                    conditional[1] = E1.getModel(null, conditional[1])
                }

                if (cond) {
                    if (classesQueue.indexOf(conditional[1]) === -1) {
                        classesQueue.push(conditional[1])
                    }
                } else {
                    if (classesQueue.indexOf(conditional[1]) > -1) {
                        classesQueue.splice(classesQueue.indexOf(conditional[1]), 1)
                    }
                }
            } else {
                var _clss = E1.getModel(null, conditional[0])

                if (_clss) {
                    classesQueue.push(_clss)
                }
            }
        });

        this.classes.forEach(clss => {
            if (classesQueue.indexOf(clss) === -1) {
                this.el.classList.remove(clss)
            }
        })

        this.classes = classesQueue

        this.classes.forEach(clss => {
            this.el.classList.add(clss)
        })
    }

    update() {
        this.renderClasses()
    }
}

E1.registerAttribute("e1-class", E1Class)