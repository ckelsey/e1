import E1 from "../e1"

class Select {
	constructor(el) {
		this.el = el
		this.update = this.update

		var html = `
        <div class="select-container">
			<span class="select-menu-label" e1-if="${el.getAttribute("label")}"></span>
			<input readonly tabindex="-1" type="text" class="select-menu-selected-text" e1-value="${el.getAttribute("value") + ".label"}">
			<span class="select-menu-options"></span>
			<button class="select-menu-arrow"><span style="color:transparent !important; pointer-events:none;">V</span></button>
        </div>`

		this.el.innerHTML = html

		var selectContainer = el.querySelector(".select-container")
		var clickThrottle = false

		window.document.body.addEventListener("mousedown", (e) => {
			clearTimeout(clickThrottle)

			clickThrottle = setTimeout(() => {
				var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target

				try {
					if (target !== el && !el.contains(target)) {
						selectContainer.classList.remove("mouseenter")
					}
				} catch (error) { }

			}, 10)
		})

		var leaveTimer

		var mouseenter = (e) => {
			clearTimeout(leaveTimer)
			e.preventDefault()
			selectContainer.classList.add("mouseenter")
		}

		if (!(/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent))) {

			el.addEventListener("mouseenter", mouseenter, false)

			el.addEventListener("mouseleave", () => {
				leaveTimer = setTimeout(() => {
					selectContainer.classList.remove("mouseenter")
				}, 10)
			})
		} else {
			el.addEventListener("touchstart", (e) => {
				clearTimeout(leaveTimer)
				e.preventDefault()
				selectContainer.classList.toggle("mouseenter")
			}, false)
		}

		this.update()
	}

	handleSelect(e) {
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

	optionFromString(option) {
		return {
			value: option.trim(),
			label: option.trim()
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


		if (value && typeof value === "string") {
			value = this.optionFromString(value)
			E1.setModel(this.el, "value", value)
		}

		var label = this.el.querySelector(".select-menu-label")
		var labelText = E1.getModel(this.el, "label")

		if (label && labelText) {
			label.innerHTML = ""
			label.appendChild(E1.cleanHtml(labelText))
		}

		try {
			options = JSON.parse(options)
		} catch (error) { }

		if (options && typeof options === "string") {
			options = options.split(",").map((option) => {
				return this.optionFromString(option)
			})
		}

		var optionsContainer = this.el.querySelector(".select-menu-options")
		optionsContainer.innerHTML = ""

		if (options && Array.isArray(options) && options.length) {
			options.forEach((element, key) => {
				if (typeof element === "string") {
					element = this.optionFromString(element)
				}

				var option = window.document.createElement("span")
				option.className = "select-menu-option"
				option.textContent = element.label
				option.setAttribute("option-key", key)
				option.setAttribute("selected", (value && value === element.value ? true : false))
				optionsContainer.appendChild(option)

				var clickThrottle = false

				if (!(/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent))) {

					option.addEventListener("mousedown", (e) => {
						clearTimeout(clickThrottle)

						clickThrottle = setTimeout(() => {
							if (selectContainer.classList.contains("mouseenter")) {
								window.requestAnimationFrame(() => {
									this.handleSelect(e)
									selectContainer.classList.remove("mouseenter")
								})
							}
						}, 10)
					})
				} else {
					option.addEventListener("touchstart", (e) => {
						this.handleSelect(e)
						selectContainer.classList.remove("mouseenter")
					})
				}
			});
		}

		this.el.ready = true
	}
}

E1.registerComponent("e1-select", Select)