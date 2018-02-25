const E1 = require("../e1")

class Modal {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.el.innerHTML = `
        <div class="modal">
            <div class="modal-wrapper">
                <div class="modal-content"></div>
                <div class="modal-close">
                    <e1-icon type="close-thin"></e1-icon>
                </div>
            </div>
        </div>`

        var modal = this.el.querySelector(".modal")
        var closeButton = modal.querySelector(".modal-close")

        closeButton.addEventListener("click", () => {
            E1.setModel(this.el, "active", false)
        }, false)

        this.update()
    }

    update() {

        var modal = this.el.querySelector(".modal")
        var modalContent = modal.querySelector(".modal-content")
        var active = E1.getModel(this.el, "active")

        if (active && active.toString() === 'true') {
            modalContent.innerHTML = ""
            modalContent.appendChild(E1.cleanHtml("<div>" + E1.getModel(this.el, "content") + "</div>"))
            setTimeout(() => {
                modal.classList.add("active")
            }, 10);
        } else {
            modal.classList.remove("active")
            setTimeout(() => {
                modalContent.innerHTML = ""
            }, 200);
        }
    }
}

E1.registerComponent("e1-modal", Modal)