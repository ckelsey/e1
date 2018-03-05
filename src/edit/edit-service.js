const E1 = require("../e1")

class E1EditService {

    constructor() {
        this.editors = {}
    }

}

E1.registerService("E1EditService", new E1EditService())
