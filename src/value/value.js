const E1 = require("../e1")

class E1Value {
    constructor(el) {
        this.el = el
        this.el["e1-value-onUpdate"] = this.update

        if((this.el.value || (this.el.checked && this.el.type === "checkbox") || (this.el.innerHTML && this.el.tagName.toLowerCase() === "textarea")) && E1.getModel(this.el, "e1-value", undefined) === undefined){
            this.value = this.el.value

            if(this.el.type === "checkbox"){
                this.value = true
            }

            if(this.el.tagName.toLowerCase() === "textarea"){
                this.value = this.el.innerHTML
            }

            E1.setModel(this.el, "e1-value", this.value)
        }

        this.setValue()

        if(this.el.type === "checkbox"){
            this.el.addEventListener("click", () => {
                E1.setModel(this.el, "e1-value", this.el.checked)
            })
            return
        }

        this.el.addEventListener("input", () => {
            this.value = this.el.value

            if(this.valueType === "array" || this.valueType === "object"){
                try{
                    this.value = JSON.parse(this.el.value)
                }catch(err){}
            }

            E1.setModel(this.el, "e1-value", this.value)
        })
    }

    typeOfValue(val) {
        try {
            val = JSON.parse(val)
        } catch (e) { }

        if (val === undefined) {
            return "undefined";
        }

        if (val === null) {
            return "null";
        }

        if (val === true || val === false) {
            return "boolean";
        }

        if (typeof val === "number") {
            return "number";
        }

        if (Object.prototype.toString.call(val) === "[object Date]" || (val.indexOf && val.indexOf(":") > -1 && new Date(val) !== "Invalid Date" && !isNaN(new Date(val)))) {
            return "date";
        }

        if (typeof val === "string") {
            return "string";
        }

        var string = {}.toString.apply(val);
        if (string === "[object Array]") {
            return "array";
        }
        if (string === "[object Object]") {
            return "object";
        }
        if (string === "[object Function]") {
            return "function";
        }

        return
    }

    setValue(){
        this.el.setAttribute("value", E1.getModel(this.el, "e1-value"))
        this.value = E1.getModel(this.el, "e1-value")
        this.valueType = this.typeOfValue(this.value)

        if(this.valueType === "array" || this.valueType === "object"){
            try{
                this.value = JSON.stringify(this.value)
            }catch(err){}
        }
        
        if (this.el.type === "text" && this.value !== undefined && this.value !== null) {
            this.value = this.value.toString()
        }

        if (this.el.nodeName.toLowerCase() === "textarea") {
            this.el.innerHTML = this.value
        }

        if (this.el.type === "number" && this.value !== undefined && this.value !== null) {
            this.value = parseFloat(this.value)
        }

        if (this.el.type === "checkbox") {
            if(this.value){
                this.el.checked = true
                this.el.removeAttribute("value")
            }else{
                this.el.checked = false
                this.el.removeAttribute("value")
            }
        }

        this.el.value = this.value
    }

    update() {
        this.setValue()
    }
}

E1.registerAttribute("e1-value", E1Value)