const E1 = require("../e1")

class E1ShortNumber {
    constructor(el) {
        this.el = el
        this.el["e1-short-number-onUpdate"] = this.update
        this.update()
    }

    getString(num) {

        if(isNaN(num) || num === 0){
            return 0
        }

        var sizes = ['', 'K', 'M', 'B', 'G'];
        var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)));
        return (num / Math.pow(1000, i)) + sizes[i];
        // var i = (Math.log(num) / Math.log(1000)).toFixed(2)
        // return Math.round(num / Math.pow(1000, i), 2) + ' ' + sizes[i];
    }

    update() {
        var num = parseInt(E1.getModel(this.el, "number"))
        this.el.textContent = this.getString(num)
    }
}

E1.registerAttribute("e1-short-number", E1ShortNumber)