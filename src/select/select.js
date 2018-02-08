const E1 = require("../e1")

class Select {
	constructor(el) {
		this.el = el
        this.update = this.update

        var html = `
        <div class="select-container">
			<span class="select-menu-label"></span>
			<span class="select-menu-selected-text"></span>
			<span class="select-menu-options"></span>
			<span class="select-menu-arrow"></span>
        </div>`
        
        this.el.innerHTML = html

        var selectContainer = el.querySelector(".select-container")
		var clickThrottle = false

		window.document.body.addEventListener("click", (e)=>{
			clearTimeout(clickThrottle)

			clickThrottle = setTimeout(()=>{
				var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target

				try {
					if (target === el.querySelector(".select-menu-selected-text") || target === el.querySelector(".select-menu-arrow")) {
						// selectContainer.classList.toggle("mouseenter")
					} else if (target !== el && !el.contains(target)) {
						selectContainer.classList.remove("mouseenter")
					}
				} catch (error) { }

			}, 10)
		})

		var leaveTimer

		var mouseenter = () =>{
			clearTimeout(leaveTimer)
			selectContainer.classList.add("mouseenter")
		}

		if (!(/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent))) {

			el.addEventListener("mouseenter", mouseenter, false)

			el.addEventListener("mouseleave", () =>{
				leaveTimer = setTimeout( ()=> {
					selectContainer.classList.remove("mouseenter")
				}, 10)
			})
        }
        
        this.update()
    }
    
    handleSelect(e){
        e.preventDefault()
		e.stopPropagation()

		var options = E1.getModel(this.el, "options")
		var optionElements = this.el.querySelector(".select-menu-option")
		var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target
		var valueKey = target.getAttribute("option-key")
		var value = options[valueKey]

		for (var i = 0; i < optionElements.length; i++) {
			if (i === parseInt(valueKey)) {
				optionElements[i].setAttribute("selected", true)
			} else {
				optionElements[i].setAttribute("selected", false)
			}
		}

		E1.setModel(this.el, "value", value)

		var onselected = E1.getModel(this.el, "onselected")

		if (onselected && typeof onselected === "function") {
			onselected(value, this.el)
		}

		if (this.el.onselected && typeof this.el.onselected === "function") {
			this.el.onselected(value, this.el)
		}
    }

	update() {

		if (!this.el.getAttribute("value")) {
			var id = E1.getModel(this.el, "component-id")
			this.el.setAttribute("value", "@bound.models." + id + ".value")
			E1.setModel(this.el, "value")
		}

		var selectContainer = this.el.querySelector(".select-container")
		var options = E1.getModel(this.el, "options")
		var value = E1.getModel(this.el, "value")

		this.el.querySelector(".select-menu-selected-text").textContent = (value && value.label ? value.label : "Select")

        var label = this.el.querySelector(".select-menu-label")
        label.innerHTML = ""

		if (label) {
			label.appendChild(E1.cleanHtml(E1.getModel(this.el, "label")))
		}

		try {
			options = JSON.parse(options)
		} catch (error) { }

		var optionsContainer = this.el.querySelector(".select-menu-options")
		optionsContainer.innerHTML = ""

		if (options && Array.isArray(options) && options.length) {
			options.forEach((element, key)=>{
				var option = window.document.createElement("span")
				option.className = "select-menu-option"
				option.textContent = element.label
				option.setAttribute("option-key", key)
				option.setAttribute("selected", (value && value === element.value ? true : false))
				optionsContainer.appendChild(option)

				var clickThrottle = false

				option.addEventListener("click", (e)=>{
					clearTimeout(clickThrottle)

					clickThrottle = setTimeout(()=>{
						if (selectContainer.classList.contains("mouseenter")) {
							window.requestAnimationFrame(()=>{
								this.handleSelect(e)
								selectContainer.classList.remove("mouseenter")
							})
						}
					}, 10)
				})
			});
		}

		this.el.ready = true
	}
}

E1.registerComponent("e1-select", Select)