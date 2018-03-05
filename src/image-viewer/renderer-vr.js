(function () {
	var Utils = require("./utils")

	class RendererVR {
		constructor(data) {
			var self = this

			var resize = () => {
				self.positionCanvas(self)
			}

			this.destroy = () => {
				window.removeEventListener("resize", positionCanvas, false);
				window.removeEventListener("vrdisplaypresentchange", presentChange, false);
			}

			var positionCanvas = () => {
				self.positionCanvas(self)
			}

			var presentChange = () => {
				self.presentChange(self)
			}

			this.destroy()

			this.data = data
			this.canDoVR = false
			this.is3D = data.type.toLowerCase().indexOf("stereo") > -1
			this.canvasWrapper = data.element

			this.glAttribs = {
				antialias: true,
			};

			if (this.data.crop) {
				this.glAttribs.preserveDrawingBuffer = true
			}

			this.frameData = new window.VRFrameData();
			this.vrDisplay = null
			this.vrSceneFrame = null
			this.panorama = null
			this.panorama2 = null
			this.viewMat = window.mat4.create()

			this.canvas = window.document.createElement("canvas");
			this.img1 = null
			this.img2 = null
			this.originalImage = null
			this.ctxTop = window.document.createElement("canvas").getContext("2d")
			this.ctxBottom = window.document.createElement("canvas").getContext("2d")

			this.gl = this.canvas.getContext("webgl", this.glAttribs);
			this.isPresenting = false
			this.normalSceneFrame = null

			this.resize = resize

			this.hasLoadedControls = false

			Utils.canDoVr().then((res) => {
				this.canDoVR = res ? true : false
				this.vrDisplay = res

				this.run()

				window.addEventListener("resize", positionCanvas, false);
				window.addEventListener("vrdisplaypresentchange", presentChange, false);
			})
		}

		present(self) {
			self.vrDisplay.requestPresent([{ source: self.canvas }]).then(() => {
				self.onPresent();
			});
		}

		setImages(img) {
			this.ctxTop.canvas.width = this.ctxBottom.canvas.width = 4096;
			this.ctxTop.canvas.height = this.ctxBottom.canvas.height = 2048;

			if (img.width > 4096) {
				var height = (img.height * (4096 / img.width))
				var pCtx = window.document.createElement("canvas").getContext("2d")
				pCtx.canvas.width = 4096
				pCtx.canvas.height = height
				pCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 4096, height)
				img = pCtx.canvas
			}

			if (this.is3D || img.width === img.height) {
				this.ctxTop.drawImage(img, 0, 0, img.width, img.height / 2, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
				this.ctxBottom.drawImage(img, 0, img.height / 2, img.width, img.height / 2, 0, 0, this.ctxBottom.canvas.width, this.ctxBottom.canvas.height);
				this.img1 = this.ctxTop.canvas
				this.img2 = this.ctxBottom.canvas
			} else {
				this.ctxTop.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
				this.img1 = this.ctxTop.canvas
				this.img2 = this.ctxTop.canvas
			}
		}

		getPoseMatrix(out, pose) {
			var orientation = pose.orientation;
			if (!orientation) { orientation = [0, 0, 0, 1]; }

			window.mat4.fromQuat(out, orientation);
			window.mat4.invert(out, out);
		}

		sendUpdate() {
			if (
				this.data.instance.stats.ready !== this.ready ||
				this.data.instance.stats.viewWidth !== this.canvasWrapper.offsetWidth * window.devicePixelRatio ||
				this.data.instance.stats.viewHeight !== this.canvasWrapper.offsetHeight * window.devicePixelRatio
			) {
				this.data.instance.stats.x = 0;
				this.data.instance.stats.y = 0;
				this.data.instance.stats.z = 0;
				this.data.instance.stats.viewWidth = this.data.instance.stats.renderWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio;
				this.data.instance.stats.viewHeight = this.data.instance.stats.renderHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio;
				this.data.instance.stats.status = "drawing";
				this.data.instance.stats.type = "vr"
				this.data.instance.stats.canvas = this.canvas
				this.data.instance.stats.originalImage = this.originalImage
				this.data.instance.stats.ready = this.ready;
				this.data.instance.trigger("statsUpdate", this.data.instance.stats)
			}
		}

		drawVRScene() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

			this.vrSceneFrame = this.vrDisplay.requestAnimationFrame(this.drawVRScene.bind(this));
			this.vrDisplay.getFrameData(this.frameData);

			this.getPoseMatrix(this.viewMat, this.frameData.pose);

			this.gl.viewport(0, 0, this.canvas.width * 0.5, this.canvas.height);
			this.panorama.render(this.frameData.leftProjectionMatrix, this.viewMat);

			this.gl.viewport(this.canvas.width * 0.5, 0, this.canvas.width * 0.5, this.canvas.height);
			this.panorama2.render(this.frameData.rightProjectionMatrix, this.viewMat);

			this.vrDisplay.submitFrame();
			this.sendUpdate()
		}

		drawScene() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

			this.normalSceneFrame = window.requestAnimationFrame(this.drawScene.bind(this));
			this.vrDisplay.getFrameData(this.frameData);

			this.getPoseMatrix(this.viewMat, this.frameData.pose);

			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.panorama.render(this.frameData.leftProjectionMatrix, this.viewMat);

			this.vrDisplay.submitFrame();
			this.sendUpdate()
		}

		onPresent() {
			try {
				window.cancelAnimationFrame(this.normalSceneFrame);
			} catch (e) { }

			var btnWrapper = window.document.querySelector(".buttonWrapper")

			if (btnWrapper) {
				btnWrapper.parentElement.removeChild(btnWrapper)
			}

			this.canvasWrapper.parentNode.classList.add("fullscreen")

			setTimeout(() => {
				this.isPresenting = true;

				this.positionCanvas(this);

				if (!this.panorama) {
					this.panorama = new window.VRPanorama(this.gl);
				}
				this.panorama.useImage(this.img1);

				if (!this.panorama2) {
					this.panorama2 = new window.VRPanorama(this.gl);
				}
				this.panorama2.useImage(this.img2);

				this.drawVRScene();
			}, 500);
		}

		fullscreen(e) {
			this.data.instance.toggleFullscreen(e)
			setTimeout(() => {
				this.positionCanvas(this);
			}, 200)
		}

		onNormalScene() {
			this.canvasWrapper.parentNode.classList.remove("fullscreen")

			try {
				this.vrDisplay.cancelAnimationFrame(this.vrSceneFrame);
			} catch (e) { }

			this.positionCanvas(this);

			if (!this.panorama) {
				this.panorama = new window.VRPanorama(this.gl);
			}
			this.panorama.useImage(this.img1);

			if (!this.panorama2) {
				this.panorama2 = new window.VRPanorama(this.gl);
			}
			this.panorama2.useImage(this.img2);

			return this.drawScene();
		}

		presentChange(self) {
			if (!self.vrDisplay.isPresenting) {
				self.isPresenting = false
				self.run()
			}
		}

		positionCanvas(self) {

			if (self.isPresenting) {
				var leftEye = self.vrDisplay.getEyeParameters("left");
				var rightEye = self.vrDisplay.getEyeParameters("right");
				self.canvas.width = (Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2);
				self.canvas.height = (Math.max(leftEye.renderHeight, rightEye.renderHeight));
				self.canvas.style.width = "100%";
				self.canvas.style.height = "100%";
				self.canvas.style.top = "0px";
				self.canvas.style.left = "0px";
			} else {
				self.canvas.style.position = "relative";
				self.canvas.width = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
				self.canvas.height = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
				self.canvas.style.width = (self.canvas.width / window.devicePixelRatio) + "px";
				self.canvas.style.height = (self.canvas.height / window.devicePixelRatio) + "px";
				self.canvas.style.top = ((self.canvasWrapper.offsetHeight - (self.canvas.height / window.devicePixelRatio)) / 2) + "px";
				self.canvas.style.left = ((self.canvasWrapper.offsetWidth - (self.canvas.width / window.devicePixelRatio)) / 2) + "px";
			}
		}

		reject() {

		}

		onExitFullscreen(self) {
			setTimeout(() => {
				self.positionCanvas(self)
			}, 200)
		}

		run() {
			this.canvasWrapper.appendChild(this.canvas)
			this.canvas.setAttribute("type", "vr")

			if (!this.gl) {
				this.gl = this.canvas.getContext("experimental-webgl", this.glAttribs);
			}

			if (this.img1) {
				this.originalImage = this.img1
				this.onNormalScene()
				this.data.instance.createControls({
					fullscreen: this.fullscreen,
					onExitFullscreen: this.onExitFullscreen,
					vr: this.present,
					self: this
				})
				this.hasLoadedControls = true
				this.ready = true
				window.E1.scan(this.canvasWrapper)
				return
			}

			this.img1 = new window.Image();
			this.img2 = new window.Image();

			Utils.initImages(this.data, (_img) => {
				this.originalImage = _img
				this.setImages(_img);

				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";

				if (this.vrDisplay.isPresenting) {
					this.onPresent()
				} else {
					this.onNormalScene();
				}

				if (!this.hasLoadedControls) {
					this.data.instance.createControls({
						vr: this.present,
						self: this
					})
					this.hasLoadedControls = true
					this.ready = true
				}
			}, (_img) => {
				this.canvasWrapper.parentNode.style.display = "block";
				this.canvasWrapper.parentNode.style.height = "0px";
				this.canvasWrapper.parentNode.style.width = "100%";
				this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";
				this.setImages(_img);
				this.onNormalScene()
			}, this.reject)
		}

	}

	module.exports = RendererVR

})()