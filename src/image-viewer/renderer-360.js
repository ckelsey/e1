(function () {
	var Utils = require("./utils")
	var RenderVR = require("./renderer-vr")

	class Renderer360 {
		constructor(data) {
			var self = this

			var resize = (e) => {
				this._resize(self, e)
			}

			var onDocumentMouseUp = (e) => {
				this.onDocumentMouseUp(self, e)
			}

			var onDocumentMouseDown = (e) => {
				this.onDocumentMouseDown(self, e)
			}

			var onDocumentMouseMove = (e) => {

				this.onDocumentMouseMove(self, e)
			}

			this.destroy = () => {
				window.cancelAnimationFrame(this.animationFrame)
				window.document.removeEventListener("mouseup", onDocumentMouseUp, false)
				window.document.removeEventListener("mousemove", onDocumentMouseMove, false)
				window.removeEventListener("resize", resize, true)

				if (this.canvasWrapper) {
					this.canvasWrapper.removeEventListener("mousedown", onDocumentMouseDown, false)
					this.canvasWrapper.innerHTML = ""
				}
			}

			this.destroy()

			this.data = data
			this.canDoVr = false
			this.is3D = data.type.toLowerCase().indexOf("stereo") > -1
			this.zoomQueue = []
			this.minZoom = 5
			this.maxZoom = 50
			this.zoom = 40
			this.distance = 50
			this.ready = false
			this.lon = 270
			this.lat = 0
			this.phi = 0
			this.theta = 0
			this.renderer = null
			this.scene = null
			this.camera = null
			this.texture = null
			this.material = null
			this.isUserInteracting = null
			this.originalImage = null
			this.ctxTop = window.document.createElement("canvas").getContext("2d") // for 3d photospheres
			this.onPointerDownPointerX = 0
			this.onPointerDownPointerY = 0
			this.onPointerDownLon = 0
			this.onPointerDownLat = 0
			this.animationFrame = null
			this.canvasWrapper = this.data.element
			this.hasLoadedControls = false
			this.resize = resize
			this.reset = resize

			Utils.canDoVr().then((res) => {
				this.canDoVr = res

				if (this.canDoVr) {
					this.data.instance.renderer = new RenderVR(this.data)
					return
				}

				this.run()

				window.document.addEventListener("mouseup", onDocumentMouseUp, false)
				window.addEventListener("resize", resize, true)
				this.canvasWrapper.addEventListener("mousedown", onDocumentMouseDown, false)
				window.document.addEventListener("mousemove", onDocumentMouseMove, false)
			})
		}

		onDocumentMouseDown(self, event) {
			event.preventDefault()
			self.isUserInteracting = true
			self.onPointerDownPointerX = event.clientX
			self.onPointerDownPointerY = event.clientY
			self.onPointerDownLon = self.lon
			self.onPointerDownLat = self.lat
		}

		onDocumentMouseMove(self, event) {
			if (self.isUserInteracting === true) {
				self.lon = (self.onPointerDownPointerX - event.clientX) * 0.1 + self.onPointerDownLon
				self.lat = (self.onPointerDownPointerY - event.clientY) * 0.1 + self.onPointerDownLat
			}
		}

		onDocumentMouseUp(self) {
			self.isUserInteracting = false
		}

		_resize(self) {

			if (self.data.instance.isFullscreen()) {
				self.canvasWrapper.parentNode.classList.add("fullscreen")
			} else {
				self.canvasWrapper.parentNode.classList.remove("fullscreen")
			}

			if (self.renderer) {
				self.renderer.setSize(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight)
				self.camera.aspect = self.renderer.domElement.clientWidth / self.renderer.domElement.clientHeight
				self.camera.updateProjectionMatrix()
			}
		}

		setImages(_img) {
			if (this.is3D) {
				this.ctxTop.canvas.width = _img.width
				this.ctxTop.canvas.height = _img.height / 2
				this.ctxTop.drawImage(_img, 0, 0)
				_img = this.ctxTop.canvas
			}

			return _img
		}

		sendUpdate() {
			if (
				this.data.instance.stats.ready !== this.ready ||
				this.data.instance.stats.x !== this.lon ||
				this.data.instance.stats.y !== this.lat ||
				this.data.instance.stats.z !== this.distance ||
				this.data.instance.stats.viewWidth !== this.canvasWrapper.offsetWidth * window.devicePixelRatio ||
				this.data.instance.stats.viewHeight !== this.canvasWrapper.offsetHeight * window.devicePixelRatio
			) {
				this.data.instance.stats.ready = this.ready
				this.data.instance.stats.x = this.lon
				this.data.instance.stats.y = this.lat
				this.data.instance.stats.z = this.distance
				this.data.instance.stats.viewWidth = this.data.instance.stats.renderWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio
				this.data.instance.stats.viewHeight = this.data.instance.stats.renderHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio
				this.data.instance.stats.status = "drawing"
				this.data.instance.stats.minZoom = this.minZoom
				this.data.instance.stats.maxZoom = this.maxZoom
				this.data.instance.stats.type = "360"
				this.data.instance.stats.canvas = this.renderer.domElement
				this.data.instance.stats.originalImage = this.originalImage

				this.data.instance.updateZoomHandle(true)

				this.data.instance.trigger("statsUpdate", this.data.instance.stats)
			}
		}

		draw() {
			this.lat = Math.max(- 85, Math.min(85, this.lat))
			this.phi = window.THREE.Math.degToRad(90 - this.lat)
			this.theta = window.THREE.Math.degToRad(this.lon - 180)
			this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta)
			this.camera.position.y = this.distance * Math.cos(this.phi)
			this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta)
			this.camera.lookAt(this.scene.position)

			this.renderer.render(this.scene, this.camera)

			this.sendUpdate()
		}

		animate() {
			this.animationFrame = window.requestAnimationFrame(this.animate.bind(this))
			this.draw()
		}

		fullscreen(e) {
			this.data.instance.toggleFullscreen(e)
			setTimeout(() => {
				this._resize(this)
			}, 200)
		}

		onExitFullscreen(self) {
			setTimeout(() => {
				self._resize(self)
			}, 200)
		}

		doZoom(amount, self) {
			var queueCount = 11

			amount = -amount * 1.5

			while (queueCount--) {
				self.zoomQueue.push(amount)
			}

			var runZoom = () => {
				window.requestAnimationFrame(() => {
					if (self.zoomQueue.length) {
						var queueAmount = self.zoomQueue.shift()
						self.distance = self.distance + queueAmount

						if (self.distance < self.minZoom) {
							self.distance = self.minZoom
						}

						if (self.distance > self.maxZoom) {
							self.distance = self.maxZoom
						}

						runZoom()
					}
				})
			}

			runZoom()
		}

		finish(_img, ready) {
			var i = this.setImages(_img)
			this.texture.image = i
			this.texture.needsUpdate = true

			this.draw()

			if (!this.hasLoadedControls && this.data.instance.showControls) {
				var controlOptions = {
					fullscreen: this.fullscreen,
					onExitFullscreen: this.onExitFullscreen,
					zoom: this.doZoom,
					self: this
				}

				this.data.instance.createControls(controlOptions)
			}

			this.hasLoadedControls = true
			this._resize(this)

			if (ready) {
				this.ready = true
				this.sendUpdate()
			}
		}

		resolve() {

		}

		reject() {

		}

		run() {
			this.renderer = new window.THREE.WebGLRenderer({ antialiasing: false, preserveDrawingBuffer: true })
			this.renderer.setPixelRatio(window.devicePixelRatio)
			this.renderer.setSize(this.canvasWrapper.offsetWidth, this.canvasWrapper.offsetHeight)
			this.canvasWrapper.appendChild(this.renderer.domElement)
			this.renderer.domElement.preserveDrawingBuffer = true
			this.renderer.domElement.id = "viewer-canvas"
			this.renderer.domElement.setAttribute("type", "360")

			this.scene = new window.THREE.Scene()

			this.camera = new window.THREE.PerspectiveCamera(this.zoom, this.canvasWrapper.offsetWidth / this.canvasWrapper.offsetHeight, 1, 2000)
			this.camera.layers.enable(1) // render left view when no stereo available
			this.camera.target = new window.THREE.Vector3(0, 0, 0)
			this.camera.lookAt(this.camera.target)
			this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight
			this.camera.updateProjectionMatrix()


			var geometry = new window.THREE.SphereGeometry(100, 100, 40)
			geometry.applyMatrix(new window.THREE.Matrix4().makeScale(-1, 1, 1))
			geometry.applyMatrix(new window.THREE.Matrix4().makeRotationY(-Math.PI / 2))

			this.texture = new window.THREE.Texture()
			this.texture.format = 1022

			this.material = new window.THREE.MeshBasicMaterial({ transparent: true, map: this.texture })
			var mesh = new window.THREE.Mesh(geometry, this.material)
			this.scene.add(mesh)

			this.animate()

			this.canvasWrapper.parentNode.style.paddingTop = '5px;'

			Utils.initImages(this.data, (_img) => {
				this.originalImage = _img
				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";
				this.finish(_img, true)
				this.resolve()
			}, (_img) => {
				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";
				this.finish(_img)
			}, this.reject)
		}

	}

	module.exports = Renderer360

})()