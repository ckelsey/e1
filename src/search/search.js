const E1 = require("../e1")

class Search {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.data = E1.getModel(el, "model")
        this.value = E1.getModel(el, "value")
        this.results = E1.getModel(el, "results")
        this.placeholder = E1.getModel(el, "placeholder")
        this.paths = E1.getModel(el, "paths")

        this.el.getResults = this.getResults
        this.el.results = this.results

        if (typeof this.paths === "string") {
            this.paths = this.paths.split(",").map(function (path) { return path.trim() })
        }

        this.el.innerHTML = `<div class="search"><input type="text" placeholder="${this.placeholder}" /><button class="search-button"><span style="color:transparent !important; pointer-events:none;">W</span><e1-icon type="search"></e1-icon></button><button e1-if="${el.getAttribute("value")}" class="cancel-search-button"><span style="color:transparent !important; pointer-events:none;">W</span><e1-icon type="close-thin"></e1-icon></button></div>`

        this.el.querySelector(".search-button").addEventListener("click", () => {
            this.getResults()
        })

        this.el.querySelector(".cancel-search-button").addEventListener("click", () => {
            this.el.querySelector("input").value = ""
            this.value = ""
            E1.setModel(this.el, "value", "")
            this.getResults()
        })

        this.el.querySelector("input").addEventListener("input", () => {
            var val = this.el.querySelector("input").value
            this.value = val
            E1.setModel(this.el, "value", val)
        })

        this.el.querySelector("input").addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.getResults()
            }
        })

        this.getResults()
    }

    getResults() {
        var val = this.value ? this.value.toString().toLowerCase() : this.value

        var reportResults = () => {
            if (!this.results) {
                this.results = []
            }

            this.el.results = this.results

            E1.setModel(this.el, "results", this.results)

            if (this.el.onresults && typeof this.el.onresults === "function") {
                this.el.onresults(this.results)
            }
        }

        if (!val || !this.data || !this.data.length) {
            this.el.results = this.results = this.data
            return reportResults()
        }

        if (!this.paths || !this.paths.length) {
            this.results = this.data[this.data.toString().toLowerCase().indexOf(val)]
            return reportResults()
        }

        this.results = []

        this.data.forEach(item => {
            for (var i = 0; i < this.paths.length; i++) {
                if (E1.getThis(item, this.paths[i]).toString().toLowerCase().indexOf(val) > -1) {
                    this.results.push(item)
                    break
                }
            }
        });

        return reportResults()
    }

    update() {
        var doSearch = false
        var value = E1.getModel(this.el, "value")
        var data = E1.getModel(this.el, "model")
        var paths = E1.getModel(this.el, "paths")
        var input = this.el.querySelector("input")

        if (typeof paths === "string") {
            paths = paths.split(",").map(function (path) { return path.trim() })
        }

        this.placeholder = E1.getModel(this.el, "placeholder")
        input.setAttribute("placeholder", this.placeholder)

        if (JSON.stringify(data) !== JSON.stringify(this.data)) {
            this.data = data
            doSearch = true
        }

        if (JSON.stringify(paths) !== JSON.stringify(this.paths)) {
            this.paths = paths
            doSearch = true
        }

        if (value !== input.value) {
            this.value = input.value = value
            doSearch = true
        }

        if (doSearch) {
            this.getResults()
        }
    }
}

E1.registerComponent("e1-search", Search)