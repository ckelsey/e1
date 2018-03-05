import E1 from "../e1"

class E1UploadZone {
	constructor(el) {
		this.el = el
		this.update = this.update

		this.el.appendChild(E1.cleanHtml([
			'<div class="upload-wrapper">',
			'<div class="upload-wrapper-inner">',
			E1.getModel(this.el, "content", ""),
			'</div>',
			'<input class="file-input" type="file">',
			'</div>',
		].join("")))

		function handleDrag(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		function handleDragOver(e) {
			e.preventDefault();
			e.stopPropagation();
			el.classList.add("dragging")
		}

		function handleDragOut(e) {
			e.preventDefault();
			e.stopPropagation();
			el.classList.remove("dragging")
		}

		function handleDrop(e) {
			e.preventDefault();
			e.stopPropagation();
			el.classList.remove("dragging")

			handleFile((e.dataTransfer.files || e.originalEvent.dataTransfer.files)[0])
		}

		function handleSelect(e) {
			handleFile(e.target.files[0])
		}

		function handleFile(file) {
			if (file) {
				E1.setModel(el, "file", file)

				var validator = E1.getModel(el, "validator")

				if (validator && typeof validator === "function") {
					validator(file, el)
				}
			}
		}

		el.addEventListener('drag', handleDrag, false)
		el.addEventListener('dragstart', handleDrag, false)

		el.addEventListener('dragover', handleDragOver, false)
		el.addEventListener('dragenter', handleDragOver, false)

		el.addEventListener('dragleave', handleDragOut, false)
		el.addEventListener('dragend', handleDragOut, false)

		el.addEventListener('drop', handleDrop, false)

		el.querySelector("input.file-input").addEventListener('change', handleSelect, false)

		el.clear = function () {
			E1.setModel(el, el.getAttribute("file"), "")
			el.querySelector("input.file-input").value = null
		}
	}

	update() {
		var content = E1.getModel(this.el, "content", "")
		var inner = this.el.querySelector(".upload-wrapper-inner")

		if (!inner) { return }

		inner.innerHTML = ""
		inner.appendChild(E1.cleanHtml(`<div>${content}</div>`))
	}
}

E1.registerComponent("e1-upload-zone", E1UploadZone)