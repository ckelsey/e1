class E1Test {
    constructor(el) {
        console.log("EEEK", el)
        this.el = el
        this.el["e1-test-onUpdate"] = this.update
    }

    update(){

    }
}

window.E1.registerAttribute("e1-test", E1Test)