import E1 from "../e1"

class E1Proximity {
    constructor(el) {
        this.el = el
        this.el["e1-proximity-onUpdate"] = this.update

        this.dimension = "top"
        this.target = this.el.parentNode.tagName.toLowerCase() === "body" ? this.el.parentNode : this.el.parentNode.parentNode
        this.targetDimension = "bottom"
        this.threshold = 0
        this.isInProximity = false
        this.inProximity = () => {}
        this.outProximity = () => {}

        this.update()

        var self = this

        var next = () => {
            self.check()
            window.requestAnimationFrame(next)
        }

        next()
    }

    check() {
        if (!this.target) {
            return
        }

        var targetDimension = this.target.getBoundingClientRect()[this.targetDimension]
        var dimension = this.el.getBoundingClientRect()[this.dimension]
        var proximity = dimension - targetDimension

        if(proximity < this.threshold && !this.isInProximity){
            this.isInProximity = true
            this.inProximity()
        }else if(proximity > this.threshold && this.isInProximity){
            this.isInProximity = false
            this.outProximity()
        }
    }

    update() {
        var dimensionOtions = ["top", "bottom", "left", "right"]
        var dimension = E1.getModel(this.el, "e1-proximity")
        var target = E1.getModel(this.el, "e1-proximity-target")
        var targetDimension = E1.getModel(this.el, "e1-proximity-target-dimension")
        var threshold = E1.getModel(this.el, "e1-proximity-threshold")

        if (!isNaN(parseFloat(threshold))) {
            this.threshold = parseFloat(threshold)
        }

        if (dimension && dimensionOtions.indexOf(dimension.toLowerCase())) {
            this.dimension = dimension.toLowerCase()
        }

        if (targetDimension && dimensionOtions.indexOf(targetDimension.toLowerCase())) {
            this.targetDimension = targetDimension.toLowerCase()
        }

        if (target) {
            target = window.document.querySelector(target)

            if (target) {
                this.target = target
            }
        }

        this.inProximity = E1.getModel(this.el, "e1-proximity-in", this.inProximity)
        this.outProximity = E1.getModel(this.el, "e1-proximity-out", this.outProximity)
    }
}

E1.registerAttribute("e1-proximity", E1Proximity)