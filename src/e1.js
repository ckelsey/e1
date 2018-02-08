class E1 {
	constructor() {
		this.bindings = {}
		this.components = {}
		this.models = {}
		this.services = {}
		this.subscriptions = {}
		this.ids = []

		this.cleanHtml = this.cleanHtml
		this.generateId = this.generateId
		this.getModel = this.getModel
		this.getThis = this.getThis
		this.registerComponent = this.registerComponent
		this.registerElement = this.registerElement
		this.scan = this.scan
		this.setModel = this.setModel
		this.setThis = this.setThis
		this.subscribe = this.subscribe
		this.updateBindings = this.updateBindings

		this.observer = new window.MutationObserver(
			(records) => {

				var components = Object.keys(this.components)

				var initElement = (element, componentName) => {
					if (element.nodeName && element.nodeName.toLowerCase() === componentName) {
						this.components[componentName]._initElement(element)
					}

					if (element.hasAttribute(componentName)) {
						this.components[componentName]._initElement(element)
					}

					var elements = element.querySelectorAll(componentName)

					if(!elements.length){
						elements = element.querySelectorAll("[" + componentName + "]")
					}

					
					if(elements.length){
						for (var i = 0; i < elements.length; i++) {
							this.components[componentName]._initElement(elements[i])
						}
					}
				}

				records.forEach((record) => {
					if (record.addedNodes.length) {
						for (var i = 0; i < record.addedNodes.length; i++) {
							if(record.addedNodes[i].nodeType !== 3){
								components.forEach((componentName) => {
									initElement(record.addedNodes[i], componentName)
								})
							}
						}
					}

					// if(record.removedNodes.length){
					// 	console.log(record.removedNodes)
					// 	var bindingKeys = Object.keys(this.bindings)

					// 	for (var i = 0; i < record.removedNodes.length; i++) {
					// 		if(record.removedNodes[i].nodeType !== 3){
					// 			bindingKeys.forEach((bindingKey) => {
					// 				this.bindings[bindingKey].forEach((el, index) => {
					// 					if(el.hasAttribute("component-id") && record.removedNodes[i].hasAttribute("component-id") && el.getAttribute("component-id") === record.removedNodes[i].getAttribute("component-id")){
					// 						// console.log("removing ", el)
					// 						// this.bindings[bindingKey].splice(index, 1)
					// 					}
					// 				})
					// 			})
					// 		}
					// 	}
					// }
				})
			}
		)
	}

	cleanHtml(html, contextNode) {
		html = html ? html.toString()
			.replace(/<script[^>]*?>.*?<\/script>/gi, "")
			.replace(/<style[^>]*?>.*?<\/style>/gi, "")
			.replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "")
			: ""

		var match = /<\s*\w.*?>/g.exec(html)
		var element = document.createElement('div')

		if (match !== null) {
			if(contextNode && contextNode.parentNode){
				var range = document.createRange()
				range.selectNode(contextNode)
				element = range.createContextualFragment(html)
			}else{
				element = document.createRange().createContextualFragment(html)
			}

			element = element.lastChild
		} else {
			element.innerHTML = html
			element = element.lastChild
		}

		return element
	}

	generateId() {
		var generate = function () {
			var text = ""
			var possible = "abcdefghijklmnopqrstuvwxyz"

			for (var i = 0; i < 26; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length))
			}

			return text
		}

		var id = generate()

		while (this.ids.indexOf(id) > -1) {
			id = generate()
		}

		this.ids.push(id)

		return id
	}

	getModel(element, attribute, defaultValue) {
		var path

		if (!element && !attribute) {
			return defaultValue
		}

		if (element && attribute) {
			var _path = element.getAttribute(attribute)

			if (_path && _path.substring(0, 1) === "@") {

				path = _path.substring(1, _path.length)

			} else {

				try {
					_path = JSON.parse(_path)
				} catch (error) { }

				return _path ? _path : defaultValue
			}
		} else if (!element && attribute && attribute.substring(0, 1) === "@") {
			path = attribute.substring(1, attribute.length)
		}

		if (!path) {
			return defaultValue
		}

		path = path.split(".")

		var service = path.shift()

		if (this.services[service]) {
			service = this.services[service]
		} else {
			path.unshift(service)
			service = window
		}

		path = path.join(".")

		return this.getThis(service, path, defaultValue)
	}

	getThis(el, path, emptyVal) {
		if (path && path.toString().split) {
			path = [el].concat(path.toString().split("."))
		} else {
			path = [el]
		}

		var result = path.reduce(function (accumulator, currentValue) {
			if (accumulator === undefined) {
				return emptyVal
			}

			if (currentValue) {
				return accumulator[currentValue]
			} else {
				return accumulator
			}

		})

		if (result === undefined) {
			return emptyVal
		}

		return result
	}

	registerComponent(name, service) {
		this.components[name] = {
			service: service,
			_initElement: (el) => {
				if (this.components[name].registeredElements.indexOf(el) === -1) {
					var thisService = new this.components[name].service(el)
					this.components[name].registeredElements.push(el)
					el.setAttribute("component-id", this.generateId())
					el["component-id"] = el.getAttribute("component-id")

					if (!el.onUpdate) {
						el.onUpdate = []
					}

					el.onUpdate.push(thisService.update.bind(thisService))

					this.registerElement(el)

				}
			},
			registeredElements: [],
			scan: (element) => {
				var existingElements = element.querySelectorAll(name)

				if (existingElements.length) {
					for (var i = 0; i < existingElements.length; i++) {
						this.components[name]._initElement(existingElements[i])
					}
				}
			}
		}

		if (window.document.readyState === "complete") {
			this.components[name].scan(window.document.body)
		}
	}

	registerAttribute(name, service) {
		this.components[name] = {
			service: service,
			_initElement: (el) => {
				if (this.components[name].registeredElements.indexOf(el) === -1) {
					var thisService = new this.components[name].service(el)
					this.components[name].registeredElements.push(el)

					if(!el.hasAttribute("component-id")){
						el.setAttribute("component-id", this.generateId())
						el["component-id"] = el.getAttribute("component-id")
					}

					if (!el.onUpdate) {
						el.onUpdate = []
					}

					el.onUpdate.push(thisService.update.bind(thisService))
					this.registerElement(el)
				}
			},
			registeredElements: [],
			scan: (element) => {
				var existingElements = element.querySelectorAll("[" + name + "]")

				if (existingElements.length) {
					for (var i = 0; i < existingElements.length; i++) {
						this.components[name]._initElement(existingElements[i])
					}
				}
			}
		}

		if (window.document.readyState === "complete") {
			this.components[name].scan(window.document.body)
		}
	}

	registerElement(el) {
		if (!el || !el.attributes) { return }

		var attributes = el.attributes

		for (var i = 0; i < attributes.length; i++) {
			var attributeValue = attributes[i].value

			if (attributeValue.substring(0, 1) === "@") {
				var bindings = attributeValue.split(",").map(b => { return b.trim() })

				bindings.forEach(binding => {
					var conditionalBinding = binding.split(":")[0]

					if (!this.bindings[conditionalBinding]) {
						this.bindings[conditionalBinding] = []
					}

					this.bindings[conditionalBinding].push(el)
				})
			}
		}
	}

	registerService(name, service) {
		this.services[name] = service
		this.updateBindings("@" + name, service)
	}

	scan(element) {
		for (var c in this.components) {
			if (this.components[c]) {
				this.components[c].scan(element)
			}
		}
	}

	setModel(element, attribute, value) {
		var path

		if (!element && !attribute) {
			return false
		}

		if (element && attribute) {
			var _path = element.getAttribute(attribute)

			if (_path && _path.substring(0, 1) === "@") {
				path = _path.substring(1, _path.length)
			}
		} else if (!element && attribute && attribute.substring(0, 1) === "@") {
			path = attribute.substring(1, attribute.length)
		}

		if (!path) {
			return false
		}

		var boundPath = path
		path = path.split(".")

		var service = path.shift()

		if (this.services[service]) {
			service = this.services[service]
		} else {
			path.unshift(service)
			service = window
		}

		path = path.join(".")

		var clone = this.getThis(service, path)

		try { clone = JSON.parse(JSON.stringify(clone)) } catch (e) { }

		this.setThis(service, path, value)

		var newVal = this.getThis(service, path)

		var updated = clone

		try {
			if (typeof clone === "object" && typeof newVal === "object") {
				updated = Object.assign(clone, newVal)
			} else if (newVal) {
				updated = newVal
			}
		} catch (e) { }

		this.updateBindings("@" + boundPath, updated)

		return newVal
	}

	setThis(el, path, val) {
		if (path) {
			path = [el].concat(path.split("."))
		} else {
			path = [el]
		}

		var result = path.reduce(function (accumulator, currentValue) {
			if (!accumulator) {
				accumulator = {}
			}

			if (!accumulator[currentValue]) {
				accumulator[currentValue] = {}
			}

			if (currentValue) {
				if (currentValue === path[path.length - 1]) {
					accumulator[currentValue] = val
				}

				return accumulator[currentValue]
			} else {
				accumulator[currentValue] = null
				return accumulator
			}
		})

		return result
	}

	subscribe(path, callback) {
		if (!this.subscriptions[path]) {
			this.subscriptions[path] = []
		}

		this.subscriptions[path].push(callback)
	}

	updateBindings(path, clone) {
		var elements = this.bindings[path]
		var subscribes = this.subscriptions[path]

		if (subscribes && subscribes.length) {
			subscribes.forEach((element) => {
				element(clone)
			})
		}

		if (elements && elements.length) {
			elements.forEach((element) => {
				var isShown = window.document.body.contains(element)
				
				if(element.hasAttribute("e1-if") && this.getModel(element, "e1-if")){
					isShown = true
				}

				if (isShown && element.onUpdate) {
					element.onUpdate.forEach((callback) => {
						callback()
					})
				}
			})
		}

		if (clone && typeof clone === "object") {
			for (var p in clone) {
				if (clone[p]) {
					this.updateBindings(path + "." + p, clone[p])
				}
			}
		}
	}
}

window.E1 = new E1()
module.exports = window.E1

if (window.document.readyState === "complete") {
	window.E1.observer.observe(window.document.body, {
		attributes: true,
		attributeOldValue: true,
		childList: true,
		subtree: true,
		characterData: true
	})

	window.E1.scan(window.document.body)
} else {
	window.document.addEventListener("DOMContentLoaded", function () {
		window.E1.observer.observe(window.document.body, {
			attributes: true,
			attributeOldValue: true,
			childList: true,
			subtree: true,
			characterData: true
		})

		window.E1.scan(window.document.body)
	})
}