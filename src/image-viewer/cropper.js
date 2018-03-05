(function () {

	class Cropper {
		constructor(data) {
			this.element = data.element
			this._data = data
			this.data = {
				mousemove: false,
				positions: {
					y1: 0,
					y2: 0,
					x1: 0,
					x2: 0
				},
				elements: {}
			}
			this.container = null
			this.onUpdateCallbacks = []
			this.canvas = data.element.querySelector("canvas") || data.element.querySelector("img")
			this.sizeWatcher = null
			this.takeScreenshot = this.takeScreenshot

			this.init()
		}

		init() {
			var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)
			this.container = window.document.createElement("div")
			this.container.id = "crop-positioner"
			this.container.innerHTML = this.createHtml()
			this.element.appendChild(this.container)

			this.data.elements = {
				north: this.container.querySelector("#north-handle"),
				south: this.container.querySelector("#south-handle"),
				east: this.container.querySelector("#east-handle"),
				west: this.container.querySelector("#west-handle"),
				northeast: this.container.querySelector("#north-east-handle"),
				northwest: this.container.querySelector("#north-west-handle"),
				southeast: this.container.querySelector("#south-east-handle"),
				southwest: this.container.querySelector("#south-west-handle")
			}

			var self = this

			var mouseDown = (e) => {
				e.preventDefault()
				e.stopPropagation()

				if (self.data.mousemove) { return }

				self.data.mousemove = true

				var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target

				var mode = target.id

				var move = (e) => {

					if (!self.data.mousemove) { return }

					e.stopPropagation()
					e.preventDefault()

					var x = e.pageX
					var y = e.pageY

					if (x === undefined) {
						x = e.changedTouches[0].clientX
					}

					if (y === undefined) {
						y = e.changedTouches[0].clientY
					}

					var box = self.container.getBoundingClientRect(),
						x1 = self.data.positions.x1,
						x2 = self.data.positions.x2,
						y1 = self.data.positions.y1,
						y2 = self.data.positions.y2,
						scrollTop = window.pageYOffset || window.document.documentElement.scrollTop,
						scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft

					if (mode.toString().indexOf("north") > -1 || mode.toString().indexOf("south") > -1) {
						if (mode.toString().indexOf("north") > -1) {
							y1 = (y - (box.top + scrollTop)) - 10
						} else {
							y2 = y - (box.top + scrollTop)
						}
					}

					if (mode.toString().indexOf("west") > -1 || mode.toString().indexOf("east") > -1) {
						if (mode.toString().indexOf("west") > -1) {
							x1 = (x - (box.left + scrollLeft)) - 10
						} else {
							x2 = x - (box.left + scrollLeft)
						}
					}

					self.setPositions(x1, x2, y1, y2)
				}

				var clearMove = () => {
					self.data.mousemove = false
					self.container.parentNode.removeEventListener('mousemove', move)
					self.container.parentNode.removeEventListener('mouseleave', clearMove)
					window.document.removeEventListener('mouseup', clearMove)
					window.document.removeEventListener('mouseleave', clearMove)

				}

				if (isMobile) {
					self.container.ontouchmove = move
				} else {
					self.container.parentNode.addEventListener('mousemove', move)
					self.container.parentNode.addEventListener('mouseleave', clearMove)
					window.document.addEventListener('mouseup', clearMove)
					window.document.addEventListener('mouseleave', clearMove)
				}
			}

			for (var handle in self.data.elements) {
				if (self.data.elements[handle]) {
					if (isMobile) {
						self.container.ontouchstart = mouseDown
					} else {
						self.data.elements[handle].addEventListener("mousedown", mouseDown, false)
					}
				}
			}

			this.position(this)

			var revealedSpace = this.element.querySelector("#revealed-space")

			var moveRevealedSpace = (e) => {
				e.preventDefault();
				e.stopPropagation();

				if (self.data.mousemove) { return }

				self.data.mousemove = true

				var _x = e.x
				var _y = e.y

				if (_x === undefined) {
					_x = e.changedTouches[0].clientX
				}

				if (_y === undefined) {
					_y = e.changedTouches[0].clientY
				}

				var box = self.container.getBoundingClientRect()
				var distanceX1 = _x - self.data.elements.west.getBoundingClientRect().left + (self.data.elements.west.offsetWidth / 2.2)
				var distanceX2 = (self.data.elements.east.getBoundingClientRect().left + (self.data.elements.east.offsetWidth / 2.2)) - _x
				var distanceY1 = _y - self.data.elements.north.getBoundingClientRect().top + (self.data.elements.north.offsetHeight / 2.2)
				var distanceY2 = (self.data.elements.south.getBoundingClientRect().top + (self.data.elements.south.offsetHeight / 2.2)) - _y

				var mousemove = (e) => {
					e.preventDefault();
					e.stopPropagation();

					if (!self.data.mousemove) { return }

					var x = e.x
					var y = e.y

					if (x === undefined) {
						x = e.changedTouches[0].clientX
					}

					if (y === undefined) {
						y = e.changedTouches[0].clientY
					}

					self.setPositions(
						(x - box.left) + (self.data.elements.west.offsetWidth / 2.2) - distanceX1,
						(x - box.left) + (self.data.elements.east.offsetWidth / 2.2) + distanceX2,
						(y - box.top) + (self.data.elements.north.offsetHeight / 2.2) - distanceY1,
						(y - box.top) + (self.data.elements.south.offsetHeight / 2.2) + distanceY2
					)
				}

				var clear = () => {
					self.data.mousemove = false
					revealedSpace.removeEventListener("mousemove", mousemove)
					window.document.removeEventListener('mouseup', clear)
					window.document.removeEventListener('mouseleave', clear)
				}

				if (isMobile) {
					self.container.ontouchmove = mousemove
				} else {
					revealedSpace.addEventListener("mousemove", mousemove)
					window.document.addEventListener('mouseup', clear)
					window.document.addEventListener('mouseleave', clear)
				}
			}

			if (isMobile) {
				revealedSpace.addEventListener('touchstart', moveRevealedSpace)
				window.document.addEventListener('touchend', () => {
					self.data.mousemove = false
					self.container.ontouchmove = function () { return false }
				})

				window.document.addEventListener('touchleave', () => {
					self.data.mousemove = false
					self.container.ontouchmove = function () { return false }
				})
			} else {
				revealedSpace.addEventListener("mousedown", moveRevealedSpace, true)
			}

			var initCropper = () => {
				var stats = this._data.instance.stats
				this.canvas = this._data.element.querySelector("canvas") || this._data.element.querySelector("img")

				if (this.canvas && stats.ready) {
					var canvasBox = this.canvas.getBoundingClientRect()
					var x = canvasBox.width / 4
					var y = canvasBox.height / 4

					this.setPositions(
						x,
						x + x + x,
						y,
						y + y + y
					)

					this.container.classList.add("active")

					var buttons = this.container.parentNode.querySelector(".buttonWrapper")
					if (buttons) {
						buttons.style.display = "none"
					}
				} else {
					window.requestAnimationFrame(initCropper)
				}
			}

			initCropper()
		}

		setPositions(x1, x2, y1, y2) {
			var minWidth = 200
			var minHeight = 200

			var checkPositions = () => {
				if (x1 < 5) {
					x1 = 5
				}

				if (x2 > this.container.offsetWidth - 5) {
					x2 = this.container.offsetWidth - 5
				}

				if (y1 < 5) {
					y1 = 5
				}

				if (y2 > this.container.offsetHeight - 5) {
					y2 = this.container.offsetHeight - 5
				}
			}

			checkPositions()

			if (minWidth && x2 - x1 < minWidth) {
				x2 = x1 + minWidth

				if (x2 > this.container.offsetWidth - 5) {
					x2 = this.container.offsetWidth - 5
					x1 = (this.container.offsetWidth - 5) - minWidth
				}
			}

			if (minHeight && y2 - y1 < minHeight) {
				y2 = y1 + minHeight

				if (y2 > this.container.offsetHeight - 5) {
					y2 = this.container.offsetHeight - 5
					y1 = y2 - minHeight > 5 ? y2 - minHeight : 5
				}
			}

			this.data.positions.x1 = x1
			this.data.positions.x2 = x2
			this.data.positions.y1 = y1
			this.data.positions.y2 = y2

			this.container.querySelector("#north-space").style.height = ((this.data.positions.y1 / this.container.offsetHeight) * 100) + "%"
			this.container.querySelector("#south-space").style.height = (((this.container.offsetHeight - this.data.positions.y2) / this.container.offsetHeight) * 100) + "%"
			this.container.querySelector("#west-space").style.width = ((this.data.positions.x1 / this.container.offsetWidth) * 100) + "%"
			this.container.querySelector("#east-space").style.width = (((this.container.offsetWidth - this.data.positions.x2) / this.container.offsetWidth) * 100) + "%"

			this.onUpdateCallbacks.forEach((cb) => {
				cb(this.getCoordinates())
			})
		}

		position(self) {

			if (!this.container || !this.element) {
				return;
			}

			var currentCoords = this.getCoordinates();
			var currentW = parseInt(this.container.style.width)
			var currentH = parseInt(this.container.style.height)
			var currentL = parseInt(this.container.style.left)
			var currentT = parseInt(this.container.style.top)

			var newW = Math.min(currentCoords.viewWidth, currentCoords.renderWidth) / currentCoords.pixelRatio
			var newH = Math.min(currentCoords.viewHeight, currentCoords.renderHeight) / currentCoords.pixelRatio
			var newL = Math.min(currentCoords.viewWidth, currentCoords.renderWidth) === currentCoords.viewWidth ? 0 : (((currentCoords.viewWidth - currentCoords.renderWidth) / 2) / currentCoords.pixelRatio)
			var newT = Math.min(currentCoords.viewHeight, currentCoords.renderHeight) === currentCoords.viewHeight ? 0 : (((currentCoords.viewHeight - currentCoords.renderHeight) / 2) / currentCoords.pixelRatio)

			if (currentH !== newH || currentW !== newW || currentL !== newL || currentT !== newT) {
				this.container.style.width = newW + "px"
				this.container.style.height = newH + "px"
				this.container.style.left = newL + "px"
				this.container.style.top = newT + "px"
			}

			var runPosition = () => {
				self.position(self)
			}

			this.sizeWatcher = window.requestAnimationFrame(runPosition)
		}

		getCoordinates() {
			var data = {
				x: this.data.positions.x1,
				y: this.data.positions.y1,
				width: this.data.positions.x2 - this.data.positions.x1,
				height: this.data.positions.y2 - this.data.positions.y1
			}

			for (var p in data) {
				if (data[p]) {
					data[p] = data[p] * window.devicePixelRatio
				}
			}

			data.viewWidth = this._data.instance.stats.viewWidth
			data.viewHeight = this._data.instance.stats.viewHeight
			data.renderWidth = this._data.instance.stats.renderWidth
			data.renderHeight = this._data.instance.stats.renderHeight
			data.pan = this._data.instance.stats.x
			data.tilt = this._data.instance.stats.y
			data.zoom = this._data.instance.stats.z
			data.pixelRatio = window.devicePixelRatio

			return data
		}

		createHtml() {
			return require("./cropper.html")
		}

		screenshotCanvas() {
			var self = this
			try {
				var coords = self.getCoordinates();
				var ctx = window.document.createElement("canvas").getContext("2d")
				var w = 600
				var h = coords.height * (600 / coords.width)

				if (h < 300) {
					w = w * (300 / h)
					h = 300
				}

				ctx.canvas.width = w
				ctx.canvas.height = h

				var x = coords.x
				var y = coords.y
				var width = coords.width
				var height = coords.height

				var revealed = self._data.element.querySelector("#revealed-space")
				var westHandle = self._data.element.querySelector("#west-handle")
				var northHandle = self._data.element.querySelector("#north-handle")

				x = ((westHandle.getBoundingClientRect().left - self.canvas.getBoundingClientRect().left) / self.canvas.getBoundingClientRect().width) * self.canvas.offsetWidth
				y = ((northHandle.getBoundingClientRect().top - self.canvas.getBoundingClientRect().top) / self.canvas.getBoundingClientRect().height) * self.canvas.offsetHeight
				width = (((westHandle.getBoundingClientRect().width * 2) + revealed.getBoundingClientRect().width) / self.canvas.getBoundingClientRect().width) * self.canvas.offsetWidth
				height = (((northHandle.getBoundingClientRect().height * 2) + revealed.getBoundingClientRect().height) / self.canvas.getBoundingClientRect().height) * self.canvas.offsetHeight

				var tmp = self.canvas

				var normalScreen = (tmp, x, y, width, height, w, h) => {
					ctx.drawImage(
						tmp,
						x,
						y,
						width,
						height,
						0, 0, w, h
					)
					return ctx.canvas
				}

				var alternateScreen = (tmp, x, y, width, height, w, h) => {
					var glAttribs = {
						antialias: true,
						preserveDrawingBuffer: true
					}
					var tmpCtx = window.document.createElement("canvas").getContext("2d")
					var gl = tmp.getContext("webgl", glAttribs) || tmp.getContext("experimental-webgl")

					var _width = tmpCtx.canvas.width = tmp.width;
					var _height = tmpCtx.canvas.height = tmp.height;

					var size = _width * _height * 4;
					var pixels = new Uint8Array(size);
					var image = tmpCtx.createImageData(_width, _height);

					gl.readPixels(0, 0, _width, _height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

					for (var i = 0; i < size; i++) {
						image.data[i] = pixels[i];
					}

					tmpCtx.putImageData(image, 0, 0)

					ctx.drawImage(
						tmpCtx.canvas,
						x,
						y,
						width,
						height,
						0, 0, w, h
					)

					var _imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
					var flipped = window.document.createElement("canvas")
					var flippedCTX = flipped.getContext('2d');
					flipped.width = _imageData.width;
					flipped.height = _imageData.height;
					flippedCTX.putImageData(_imageData, 0, 0);
					// flippedCTX.globalCompositeOperation = 'copy';
					flippedCTX.scale(1, -1); // Y flip
					flippedCTX.translate(0, -_imageData.height); // so we can draw at 0,0
					flippedCTX.drawImage(flipped, 0, 0);
					flippedCTX.setTransform(1, 0, 0, 1, 0, 0);
					flippedCTX.globalCompositeOperation = 'source-over';

					return flipped
				}

				var testForBlank = (c) => {
					var pixels = c.getContext("2d").getImageData(0, 0, c.width, c.height).data
					var isNotBlank = false

					for (var i = 0, n = pixels.length; i < n; i += 4) {

						if (pixels[i] !== 0 || pixels[i + 1] !== 0 || pixels[i + 2] !== 0) {
							isNotBlank = true
							break
						}
					}

					if (!isNotBlank) {
						return false
					}

					return true
				}

				var canvas = normalScreen(tmp, x, y, width, height, w, h)
				var isGood = testForBlank(canvas)

				if (!isGood) {

					canvas = alternateScreen(tmp, x, y, width, height, w, h)
					isGood = testForBlank(canvas)

					if (isGood) {
						return canvas
					} else {
						return false
					}
				} else {
					return canvas
				}
			} catch (err) {
				return false
			}
		}

		takeScreenshot() {
			return new Promise((resolve, reject) => {
				var type = "image/jpeg"
				var quality = 0.92
				var scaledWidth = 1500
				var parent = this.container.parentElement.parentElement.parentElement
				var renderer = this._data.instance.renderer

				parent.style.opacity = "0"
				parent.style.minWidth = scaledWidth + "px"
				parent.style.maxWidth = scaledWidth + "px"
				parent.style.height = "auto"

				setTimeout(() => {
					renderer.resize()

					setTimeout(() => {
						var screenshotCanvas = this.screenshotCanvas()

						if (!screenshotCanvas) {
							return reject()
						}

						return screenshotCanvas.toBlob((file) => {

							setTimeout(() => {
								parent.style.removeProperty("opacity")
								parent.style.removeProperty("min-width")
								parent.style.removeProperty("max-width")
								parent.style.removeProperty("height")
								renderer.resize()

								return resolve(file)
							}, 10);

						}, type, quality)

					}, 10);
				}, 10);

			})
		}

		downloadScreenshot() {
			this.takeScreenshot().then(file => {
				var a = window.document.createElement("a")
				a.download = true
				a.href = window.URL.createObjectURL(file)
				a.click()
			})
		}
	}

	module.exports = Cropper

})();