if (!window.HTMLCanvasElement.prototype.toBlob) {
	Object.defineProperty(window.HTMLCanvasElement.prototype, 'toBlob', {
		value: function (callback, type, quality) {
			var canvas = this
			setTimeout(function () {

				var binStr = window.atob(canvas.toDataURL(type, quality).split(',')[1]),
					len = binStr.length,
					arr = new Uint8Array(len)

				for (var i = 0; i < len; i++) {
					arr[i] = binStr.charCodeAt(i)
				}

				callback(new window.Blob([arr], { type: type || 'image/png' }))
			})
		}
	})
}


(function () {
	var Utils = require("./utils")
	var RendererFlat = require("./renderer-flat")
	var Renderer360 = require("./renderer-360")
	var Cropper = require("./cropper")

	class ImageRenderer {
		constructor(data) {
			var self = this
			var doKeyPress = (e) => {
				self.keyDown(self, e)
			}

			var doFullscreenChange = () => {
				if (self.isFullscreen()) {
					self.exitFullscreen()
				}
			}

			this.destroy = () => {
				window.removeEventListener('keydown', doKeyPress, false)
				window.document.removeEventListener('webkitfullscreenchange', doFullscreenChange, false);
				window.document.removeEventListener('mozfullscreenchange', doFullscreenChange, false);
				window.document.removeEventListener('fullscreenchange', doFullscreenChange, false);
				window.document.removeEventListener('MSFullscreenChange', doFullscreenChange, false);

				if (this.renderer) {
					this.renderer.destroy()
				}
			}

			this.destroy()

			this.data = data
			this.data.instance = this
			this.stats = {}
			this.subscriptions = {}
			this.utils = Utils
			this.showControls = this.data.crop ? false : true
			this.fullscreen = false

			if (!this.data.type || this.data.type.indexOf("360") === -1) {
				this.renderer = new RendererFlat(this.data)
			} else {
				this.renderer = new Renderer360(this.data)
			}


			if (this.data.crop) {
				this.data.cropper = new Cropper(this.data)
			}

			window.addEventListener('keydown', doKeyPress, false)

			window.document.addEventListener('webkitfullscreenchange', doFullscreenChange, false);
			window.document.addEventListener('mozfullscreenchange', doFullscreenChange, false);
			window.document.addEventListener('fullscreenchange', doFullscreenChange, false);
			window.document.addEventListener('MSFullscreenChange', doFullscreenChange, false);
		}

		download() {
			var canvas = this.data.element.querySelector("canvas")
			canvas.toBlob((file) => {

				var a = window.document.createElement("a")
				a.download = true
				a.href = window.URL.createObjectURL(file)
				a.click()

			})
		}

		isFullscreen() {
			return this.fullscreen
		}

		exitFullscreen() {
			var canvasWrapper = this.data.element;
			canvasWrapper.parentNode.classList.remove("fullscreen");

			if (window.document.exitFullscreen) {
				window.document.exitFullscreen();
			} else if (window.document.webkitExitFullscreen) {
				window.document.webkitExitFullscreen();
			} else if (window.document.mozCancelFullScreen) {
				window.document.mozCancelFullScreen();
			} else if (window.document.msExitFullscreen) {
				window.document.msExitFullscreen();
			}
		}

		enterFullscreen() {
			var canvasWrapper = this.data.element;
			canvasWrapper.parentNode.classList.add("fullscreen");

			if (canvasWrapper.requestFullscreen) {
				canvasWrapper.requestFullscreen();
			} else if (canvasWrapper.webkitRequestFullscreen) {
				canvasWrapper.webkitRequestFullscreen();
			} else if (canvasWrapper.mozRequestFullScreen) {
				canvasWrapper.mozRequestFullScreen();
			} else if (canvasWrapper.msRequestFullscreen) {
				canvasWrapper.msRequestFullscreen();
			}
		}

		toggleFullscreen() {

			if (this.isFullscreen()) {
				this.exitFullscreen()
			} else {
				this.enterFullscreen()
			}

			this.fullscreen = !this.fullscreen

			// var iOS = !!window.navigator.platform && /iPad|iPhone|iPod/.test(window.navigator.platform);
			// if (iOS) {
			// 	this.fullscreen = !this.fullscreen
			// }
		}

		keyDown(self, e) {
			if ((e.key.toLowerCase() === 'escape' || e.key.toLowerCase() === 'esc' || e.keyCode === 27)) {
				self.exitFullscreen()
			}
		}

		subscribe(event, callback) {
			if (!this.subscriptions[event]) {
				this.subscriptions[event] = [];
			}

			this.subscriptions[event].push(callback);
		}

		trigger(event, data) {
			if (!this.subscriptions[event]) {
				return;
			}

			for (var i = 0; i < this.subscriptions[event].length; i++) {
				this.subscriptions[event][i](data);
			}
		}

		updateZoomHandle(invert) {
			var zoomRangeHandle = this.data.element.querySelector(".zoom-range-handle")

			if (!zoomRangeHandle) {
				return
			}

			var range = this.stats.maxZoom - this.stats.minZoom
			var currentPosition = this.stats.z - this.stats.minZoom
			var percent = currentPosition / range
			zoomRangeHandle.style.bottom = (invert ? 100 - (percent * 100) : percent * 100) + "%"
		}

		createControls(options) {
			var self = this
			var exitHandler = () => {
				self.fullscreen = !self.fullscreen

				if (!self.fullscreen) {
					var canvasWrapper = self.data.element;
					canvasWrapper.classList.remove("fullscreen");

					if (options.onExitFullscreen) {
						options.onExitFullscreen(options.self)
					}
				}
			}

			var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)
			var buttonWrapper = this.data.element.querySelectorAll(".buttonWrapper")
			var zoomControlsWrapper

			if (buttonWrapper && buttonWrapper.length) {
				for (var b = 0; b < buttonWrapper.length; b++) {
					buttonWrapper[b].parentNode.removeChild(buttonWrapper[b])
				}
			}

			buttonWrapper = window.document.createElement("div");
			buttonWrapper.classList.add("buttonWrapper")
			this.data.element.appendChild(buttonWrapper);

			var vr = options.vr
			var fullscreen = options.fullscreen
			var zoom = options.zoom
			var zoomSelf = options.self

			var zoomMouseDown = (e) => {
				e.preventDefault()
				e.stopPropagation()

				zoomControlsWrapper.classList.add("active")
				var isDragging = true
				var y = 0;
				var lastY = e.clientY;

				var mouseMove = (e) => {
					e.preventDefault()
					e.stopPropagation()

					if (isDragging === true) {
						y = -(e.clientY - lastY);
						zoom(y / 20, zoomSelf)
						lastY = e.clientY
					}

				}

				var mouseUp = () => {
					zoomControlsWrapper.classList.remove("active")
					window.document.removeEventListener("mousemove", mouseMove, false);
					window.document.removeEventListener("mouseup", mouseUp, false);
				}

				window.document.addEventListener("mousemove", mouseMove, false);
				window.document.addEventListener("mouseup", mouseUp, false);
			}

			if (vr) {
				var vrButton = window.document.createElement("button");
				vrButton.innerHTML = '<e1-icon type="cardboard"></e1-icon>'
				vrButton.addEventListener('click', () => {
					vr(options.self)
				}, false);
				buttonWrapper.appendChild(vrButton);
			}

			if (fullscreen) {
				window.document.removeEventListener('webkitfullscreenchange', exitHandler, false);
				window.document.removeEventListener('mozfullscreenchange', exitHandler, false);
				window.document.removeEventListener('fullscreenchange', exitHandler, false);
				window.document.removeEventListener('MSFullscreenChange', exitHandler, false);

				var fullscreenButton = window.document.createElement("button");
				fullscreenButton.className = "fullscreen-button"
				fullscreenButton.innerHTML = '<e1-icon type="fullscreen"></e1-icon>'
				fullscreenButton.addEventListener('click', fullscreen.bind(options.self), false);
				buttonWrapper.appendChild(fullscreenButton);

				window.document.addEventListener('webkitfullscreenchange', exitHandler, false);
				window.document.addEventListener('mozfullscreenchange', exitHandler, false);
				window.document.addEventListener('fullscreenchange', exitHandler, false);
				window.document.addEventListener('MSFullscreenChange', exitHandler, false);
			}

			if (zoom) {
				zoomControlsWrapper = window.document.createElement("div")
				zoomControlsWrapper.className = isMobile ? "zoom-controls mobile" : "zoom-controls"

				var zoomPlus = window.document.createElement("button")
				zoomPlus.className = "zoom-plus"
				zoomPlus.innerHTML = '<e1-icon type="plus"></e1-icon>'
				zoomPlus.addEventListener("click", () => {
					zoom(1, options.self)
				}, false)

				var zoomMinus = window.document.createElement("button")
				zoomMinus.className = "zoom-minus"
				zoomMinus.innerHTML = '<e1-icon type="minus"></e1-icon>'
				zoomMinus.addEventListener("click", () => {
					zoom(-1, options.self)
				}, false)

				var zoomRange = window.document.createElement("div")
				zoomRange.className = "zoom-range"
				zoomRange.addEventListener("mousedown", zoomMouseDown.bind(this), false)

				var zoomRangeHandle = window.document.createElement("div")
				zoomRangeHandle.className = "zoom-range-handle"
				zoomRangeHandle.addEventListener("mousedown", zoomMouseDown.bind(this), false)

				zoomRange.appendChild(zoomRangeHandle)
				zoomControlsWrapper.appendChild(zoomPlus)
				zoomControlsWrapper.appendChild(zoomRange)
				zoomControlsWrapper.appendChild(zoomMinus)
				buttonWrapper.appendChild(zoomControlsWrapper)
			}
		}
	}

	module.exports = ImageRenderer
	window.ImageRenderer = ImageRenderer

})();
