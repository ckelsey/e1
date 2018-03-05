(function () {
	var Utils = require("./utils")

	class RendererFlat {
		constructor(data) {
			var self = this

			var resize = () => {
				self.setTransforms()
			}

			this.destroy = () => {
				window.removeEventListener("resize", resize, false)
				// window.onorientationchange = null

				if (this.canvasWrapper) {
					this.canvasWrapper.innerHTML = ""
				}
			}

			this.destroy()

			this.data = data
			this.canDoVR = false
			this.is3D = data.type && data.type.toLowerCase().indexOf("stereo") > -1
			this.isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)
			this.cache = {}
			this.cacheSize = this.isMobile ? 4000 : 6000
			this.cacheId = 0
			this.previousCache = null
			this.originalImage = {}
			this.activeCache = null
			this.image = null
			this.zoomMin = null
			this.zoomMax = 1
			this.zoomQueue = []
			this.zoom = null
			this.translateX = 0
			this.translateY = 0
			this.canvas = null
			this.canvasWrapper = data.element
			this.canvasWrapper.innerHTML = ""
			this.hasLoadedControls = false
			this.controlOptions = {}
			this.resize = this.setTransforms
			this.reset = () => {
				this.setCanvasImage(this.cache)
				this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height)
				this.zoomMax = this.getMaxZoom()
				this.zoom = this.zoomMin
				this.setTransforms()
			}

			Utils.canDoVr().then((res) => {
				this.canDoVr = res

				this.controlOptions = {
					fullscreen: this.toggleFullscreen,
					onExitFullscreen: this.onExitFullscreen,
					zoom: this.doZoom,
					self: this
				}

				if (this.is3D && this.canDoVR) {
					this.controlOptions.vr = this.toggleVr
				}

				this.run()

				window.addEventListener("resize", resize, false)
				// window.onorientationchange = resize
			})
		}

		setImage(_img, ready) {
			this.image = _img

			if (this.is3D) {
				this.originalImage = this.setCache(true)
			}

			this.activeCache = this.cache = this.setCache()
			this.setCanvasImage(this.cache)
			this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height)
			this.zoomMax = this.getMaxZoom()

			if (!this.zoom) {
				this.zoom = this.zoomMin
			}

			this.setTransforms()

			if (!this.hasLoadedControls && this.data.instance.showControls) {
				this.data.instance.createControls(this.controlOptions)
				this.hasLoadedControls = true
			}

			this.sendUpdate(ready)
		}

		doZoom(amount, self) {
			amount = amount / 4
			var queueCount = 8

			while (queueCount--) {
				self.zoomQueue.push(amount / 8)
			}

			var runZoom = () => {
				window.requestAnimationFrame(() => {
					if (self.zoomQueue.length) {
						self.setZoom(self.zoomQueue.shift())
						self.setTransforms()
						runZoom()
					}
				})
			}

			runZoom()
		}

		toggleVr() {
			if (this.is3D && this.canDoVR) {
				if (this.data.instance.isFullscreen()) {
					this.activeCache = this.cache
					this.setCanvasImage(this.cache)
					this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height)
				} else {
					this.activeCache = this.originalImage
					this.setCanvasImage(this.originalImage)
					this.zoomMin = this.getMinZoom(this.originalImage.width, this.originalImage.height)
				}


				this.zoomMax = this.getMaxZoom()
				this.zoom = this.zoomMin

				this.setZoom(0)
				this.setTransforms()
				this.sendUpdate()

			}

			this.data.instance.toggleFullscreen();
		}

		onExitFullscreen(self) {
			setTimeout(() => {
				self.zoom = self.zoomMin
				self.setTransforms()
			}, 200)
		}

		toggleFullscreen() {
			this.data.instance.toggleFullscreen();
			setTimeout(() => {
				this.setTransforms()
			}, 200)
		}

		setCanvasImage(_imgCache) {
			if (!this.previousCache || _imgCache.id !== this.previousCache.id) {
				this.canvas.width = _imgCache.width
				this.canvas.height = _imgCache.height
				this.canvas.getContext("2d").drawImage(_imgCache.canvas, 0, 0)
				this.previousCache = _imgCache
			}
		}

		setCache(allow3D) {
			return {
				id: this.cacheId++,
				canvas: this.proxyImg(this.cacheSize, allow3D),
				width: this.cacheSize,
				height: this.image.height * (this.cacheSize / this.image.width)
			}
		}

		getMinZoom(w, h) {
			return Math.min(this.canvasWrapper.offsetWidth / w, this.canvasWrapper.offsetHeight / h)
		}

		getMaxZoom() {
			return Math.min(this.canvasWrapper.offsetWidth / this.activeCache.width, this.canvasWrapper.offsetHeight / this.activeCache.height) * (this.data.type === "Super resolution" ? 10 : 5)
		}

		proxyImg(width, allow3D) {
			if (this.is3D && !allow3D) {
				this.image.width = this.image.width / 2
			}

			var height = (this.image.height * (width / this.image.width))
			var pCtx = window.document.createElement("canvas").getContext("2d")
			pCtx.canvas.width = width
			pCtx.canvas.height = height
			pCtx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, width, height)
			return pCtx.canvas
		}

		setTransforms() {
			this.canvas.style.left = -((this.activeCache.width - this.canvasWrapper.offsetWidth) / 2) + "px"
			this.canvas.style.top = -((this.activeCache.height - this.canvasWrapper.offsetHeight) / 2) + "px"

			this.setBounds()

			this.canvas.style.transform = "" +
				"scale(" + this.zoom + ") " +
				"translateX(" + this.translateX + "px)" +
				"translateY(" + this.translateY + "px)" +
				"translateZ(0px)"

			this.sendUpdate()
		}

		sendUpdate(ready) {
			this.data.instance.stats.x = this.translateX
			this.data.instance.stats.y = this.translateY
			this.data.instance.stats.z = this.zoom
			this.data.instance.stats.cropZ = this.zoom
			this.data.instance.stats.viewWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio
			this.data.instance.stats.viewHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio
			this.data.instance.stats.renderWidth = Math.round(Math.min(this.cache.width * this.zoom, this.canvasWrapper.offsetWidth)) * window.devicePixelRatio
			this.data.instance.stats.renderHeight = Math.round(Math.min(this.cache.height * this.zoom, this.canvasWrapper.offsetHeight)) * window.devicePixelRatio
			this.data.instance.stats.status = "drawing"
			this.data.instance.stats.minZoom = this.zoomMin
			this.data.instance.stats.maxZoom = this.zoomMax
			this.data.instance.stats.type = "flat"
			this.data.instance.stats.canvas = this.canvas

			if (ready) {
				this.data.instance.stats.ready = 1
			}

			this.data.instance.updateZoomHandle()

			this.data.instance.trigger("statsUpdate", this.data.instance.stats)
		}

		setZoom(amount) {
			var z = this.zoom + amount

			var ratio = (z - this.zoomMin) / (this.zoomMax - this.zoomMin)

			this.zoomMin = this.getMinZoom(this.activeCache.width, this.activeCache.height)
			this.zoomMax = this.getMaxZoom()

			z = ((this.zoomMax - this.zoomMin) * ratio) + this.zoomMin
			// z = (this.zoomMax * ratio)

			if (z < this.zoomMin) {
				z = this.zoomMin
			}

			if (z > this.zoomMax) {
				z = this.zoomMax
			}

			this.zoom = z
		}

		mouseDown(e) {
			e.preventDefault()

			var self = this
			var box = this.canvas.getBoundingClientRect()
			var originalX = (e.pageX || e.targetTouches[0].pageX) - box.left
			var originalY = (e.pageY || e.targetTouches[0].pageY) - box.top

			var mouseMove = (e) => {
				box = this.canvas.getBoundingClientRect()
				var distanceX = ((e.pageX || e.targetTouches[0].pageX) - box.left) - originalX
				var distanceY = ((e.pageY || e.targetTouches[0].pageY) - box.top) - originalY

				self.translateX = self.translateX + distanceX
				self.translateY = self.translateY + distanceY
				self.setTransforms()
			}

			var mouseUp = () => {
				self.canvas.removeEventListener("mousemove", mouseMove, false)
				window.document.body.removeEventListener("mouseleave", mouseUp, false)
				window.document.body.removeEventListener("mouseup", mouseUp, false)

				self.canvas.removeEventListener("touchmove", mouseMove, false)
				window.document.body.removeEventListener("touchend", mouseUp, false)
				window.document.body.removeEventListener("touchcancel", mouseUp, false)
			}

			self.canvas.addEventListener("mousemove", mouseMove, false)
			window.document.body.addEventListener("mouseleave", mouseUp, false)
			window.document.body.addEventListener("mouseup", mouseUp, false)

			self.canvas.addEventListener("touchmove", mouseMove, false)
			window.document.body.addEventListener("touchend", mouseUp, false)
			window.document.body.addEventListener("touchcancel", mouseUp, false)
		}

		setBounds() {
			this.setZoom(0)

			var maxLeft = (this.activeCache.width - (this.canvasWrapper.offsetWidth / this.zoom)) / 2
			var maxRight = -maxLeft
			var maxTop = (this.activeCache.height - (this.canvasWrapper.offsetHeight / this.zoom)) / 2
			var maxBottom = -maxTop

			if (this.translateX > maxLeft) {
				this.translateX = maxLeft
			}

			if (this.translateX < maxRight) {
				this.translateX = maxRight
			}

			if (this.translateY > maxTop) {
				this.translateY = maxTop
			}

			if (this.translateY < maxBottom) {
				this.translateY = maxBottom
			}

			var renderHeight = this.activeCache.height * this.zoom

			if (renderHeight < this.canvasWrapper.offsetHeight) {
				this.translateY = this.translateY - (((this.canvasWrapper.offsetHeight - renderHeight) / 2) / this.zoom)
			}

			var renderWidth = this.activeCache.width * this.zoom

			if (renderWidth < this.canvasWrapper.offsetWidth) {
				this.translateX = this.translateX - (((this.canvasWrapper.offsetWidth - renderWidth) / 2) / this.zoom)
			}

			this.translateX = Math.round(this.translateX * 100) / 100
			this.translateY = Math.round(this.translateY * 100) / 100
		}

		run() {
			this.canvas = window.document.createElement("canvas")
			this.canvas.style.position = "relative";
			this.canvasWrapper.appendChild(this.canvas)
			this.canvasWrapper.classList.add("flat-render")
			this.canvasWrapper.parentNode.style.paddingTop = '5px;'

			Utils.initImages(this.data, (_img) => {
				this.originalImage = _img
				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((_img.height / (this.is3D ? _img.width / 2 : _img.width)) * 100) + "%";
				this.setImage(_img, true)
			}, (_img) => {
				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((_img.height / (this.is3D ? _img.width / 2 : _img.width)) * 100) + "%";
				this.setImage(_img)
			}, this.reject)

			this.canvas.addEventListener("mousedown", this.mouseDown.bind(this), false)
			this.canvas.addEventListener("touchstart", this.mouseDown.bind(this), false)
			this.data.instance.subscribe("resize", this.setTransforms.bind(this))
			this.data.instance.subscribe("reset", () => {
				this.zoom = this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height)
				this.setTransforms()
			})
		}

	}

	module.exports = RendererFlat

})();