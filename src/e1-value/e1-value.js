class E1Value{
    constructor(el){
        this.el = el
        this.el["e1-value-onUpdate"] = this.update

        this.value = E1.getModel(this.el, "e1-value")
        this.valueType = this.typeOfValue(this.value)

        this.el.setAttribute("value", E1.getModel(this.el, "e1-value"))

        if(this.el.nodeName.toLowerCase() === "textarea"){
            this.el.innerHTML = E1.getModel(this.el, "e1-value")
        }

        this.el.addEventListener("input", ()=>{
            E1.setModel(this.el, "e1-value", this.el.value)
        })
    }

    typeOfValue(val){
		try {
			val = JSON.parse(val)
		} catch (e) { }

		if (val === undefined) {
			return 'undefined';
		}

		if (val === null) {
			return 'null';
		}

		if (val === true || val === false) {
			return 'boolean';
		}

		if (typeof val === 'number') {
			return 'number';
		}

		if (Object.prototype.toString.call(val) === '[object Date]' || (val.indexOf && val.indexOf(':') > -1 && new Date(val) !== "Invalid Date" && !isNaN(new Date(val)))) {
			return 'date';
		}

		if (typeof val === 'string') {
			return 'string';
		}

		var string = {}.toString.apply(val);
		if (string === '[object Array]') {
			return 'array';
		}
		if (string === '[object Object]') {
			return 'object';
		}
		if (string === '[object Function]') {
			return 'function';
		}

		return
	}

    update(){
        this.value = E1.getModel(this.el, "e1-value")
        this.valueType = this.typeOfValue(this.value)
        this.el.setAttribute("value", E1.getModel(this.el, "e1-value"))
    }
}

E1.registerAttribute("e1-value", E1Value)