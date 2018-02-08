const E1 = require("../e1")

class Filter {
	constructor(el) {
		this.el = el
		this.update = this.update
        this.components = E1.getModel(el, "components")
        this.data = E1.getModel(el, "model")
        this.results = E1.getModel(el, "model")
        this.getResults = this.getResults

        this.update()
    }
    
    getResults(){

    }

	update() {

	}
}

E1.registerComponent("e1-filter", Filter)