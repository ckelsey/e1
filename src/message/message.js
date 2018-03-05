import E1 from "../e1"

class E1Message {
    constructor(el) {
        this.el = el
        this.update = this.update

        this.el.innerHTML = require("./message.html")

        this.update()
    }

    update() {

        var container = this.el.querySelector(".popup")
        var iconElement = this.el.querySelector(".message-icon")
        var messageElement = this.el.querySelector(".message-container")
        var buttonsElement = this.el.querySelector(".popup-buttons")

        var icon = window.E1.getModel(this.el, "icon")
        var type = window.E1.getModel(this.el, "type")
        var message = window.E1.getModel(this.el, "message")
        var active = window.E1.getModel(this.el, "active")
        var buttons = window.E1.getModel(this.el, "buttons")

        if (active && active.toString() === "true") {
            container.classList.add("active")

            messageElement.innerHTML = ""
            iconElement.innerHTML = ""
            buttonsElement.innerHTML = ""

            messageElement.appendChild(E1.cleanHtml(`<div>${message}</div>`))
            iconElement.appendChild(E1.cleanHtml(`<div>${icon}</div>`))
            iconElement.className = "message-icon" + (type ? " " + type : "")

            var buttonHtml = ""

            if (buttons && buttons.length) {


                buttons.forEach(function (element) {
                    buttonHtml += '<button onclick="' + element.click + '">' + element.text + '</button>'
                });
            } else {
                buttonHtml = '<button onclick="window.E1.setModel(null, \'' + this.el.getAttribute('active') + '\', false)">Ok</button>'
            }

            buttonsElement.appendChild(E1.cleanHtml(`<div>${buttonHtml}</div>`))

        } else {
            container.classList.remove("active")
        }
    }
}

E1.registerComponent("e1-message", E1Message)