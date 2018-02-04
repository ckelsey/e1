class DropdownList {
	constructor(el) {
		this.el = el
		this.update = this.update
		this.label = window.E1.getModel(this.el, "label")
		this.list = this.getList()

		var container = window.document.createElement("div")
		container.className = "dropdown-container"

		if (!(/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent))) {
			container.classList.add("non-mobile")
		}

		// Build
		container.appendChild(this.getLabel())
		container.appendChild(this.getOptions())

		this.el.appendChild(container)

		var clickThrottle = false

		window.document.body.addEventListener("click", (e) => {
			clearTimeout(clickThrottle)
			var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target

			clickThrottle = setTimeout(() => {
				var container = this.el.querySelector(".dropdown-container")

				try {
					if (target === this.el.querySelector(".dropdown-list-label")) {
						container.classList.toggle("mouseenter")
					} else if (target !== this.el && !this.el.contains(target)) {
						container.classList.remove("mouseenter")
					}
				} catch (e) { }

			}, 10)
		})

		var leaveTimer

		var mouseenter = () => {
			clearTimeout(leaveTimer)
			this.el.querySelector(".dropdown-container").classList.add("mouseenter")
		}

		if (!(/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent))) {

			this.el.addEventListener("mouseenter", () => {
				mouseenter()
			}, false)

			this.el.addEventListener("mouseleave", () => {
				leaveTimer = setTimeout(() => {
					this.el.querySelector(".dropdown-container").classList.remove("mouseenter")
				}, 380)
			})
		}
	}

	getLabel() {
		var labelHtml = window.E1.getModel(this.el, "label")
		var labelElement = window.document.createElement("div")
		labelElement.className = "dropdown-list-label"
		labelElement.innerHTML = window.E1.cleanHtml(labelHtml)

		if (this.list && this.list.length) {
			labelElement.classList.add("has-options")
		}

		return labelElement
	}

	getOptions() {
		var optionContainer = window.document.createElement("div")
		optionContainer.className = "dropdown-list-options"

		if (this.list && this.list.length) {
			this.list.forEach((option, key) => {
				var optionWrapper = window.document.createElement("div")
				optionWrapper.className = "dropdown-list-option"
				optionWrapper.innerHTML = window.E1.cleanHtml(option)
				optionWrapper.setAttribute("option-key", key)

				var clickThrottle = false

				optionWrapper.addEventListener("click", (e) => {
					clearTimeout(clickThrottle)

					clickThrottle = setTimeout(() => {
						var container = this.el.querySelector(".dropdown-container")

						if (container.classList.contains("mouseenter")) {
							if (this.el.optionClicked && typeof this.el.optionClicked === "function") {
								this.el.optionClicked(e, optionWrapper)
							}

							window.requestAnimationFrame(() => {
								container.classList.remove("mouseenter")
							})
						}
					}, 10)
				})

				optionContainer.appendChild(optionWrapper)
			});
		}

		return optionContainer
	}

	getList() {
		var list = window.E1.getModel(this.el, "list")

		try {
			list = JSON.parse(list)
		} catch (error) { }

		if (typeof list === "string") {
			list = list.split(",").map(function (option) { return option.trim() })
		}

		return list
	}

	update() {
		var container = this.el.querySelector(".dropdown-container")
		var label = window.E1.getModel(this.el, "label")
		var list = this.getList()

		if (JSON.stringify(list) !== JSON.stringify(this.list)) {
			this.list = list
			container.replaceChild(this.getOptions(), container.querySelector(".dropdown-list-options"))
		}

		if (label !== this.label) {
			this.label = label
			container.replaceChild(this.getLabel(), container.querySelector(".dropdown-list-label"))
		}
	}
}

window.E1.registerComponent("dropdown-list", DropdownList)