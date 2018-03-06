import E1 from "../e1"
import "./ui-recorder.css"

class UiRecorder {
    constructor(el) {
        this.elemensToWatch = []
        this.pageActions = []
        this.eventsToWatch = [
            "mousemove",
            "mousedown",
            "mouseup",
            "mouseenter",
            "mouseleave",
            "mouseover",
            "mouseout",
            "keydown",
            "keyup",
            "input",
            "focus",
            "blur",
            "scroll",
            // "wheel"
            // click
        ]

        this.el = el
        this.update = this.update
        this.recording = false

        this.el.appendChild(E1.cleanHtml(require("./ui-recorder.html")))
        this.el.querySelector(".ui-record-button").addEventListener("mousedown", () => {
            this.recording = true
        })

        this.el.querySelector(".ui-stop-button").addEventListener("mousedown", () => {
            this.recording = false
        })

        this.el.querySelector(".ui-play-button").addEventListener("mousedown", () => {
            this.recording = false
            // var playback = eval(this.getPageActions())
            // console.log(playback)
        })

        this.el.querySelector(".ui-edit-button").addEventListener("mousedown", () => {
            this.recording = false
            this.el.querySelector(".ui-edit-section").classList.toggle("active")
            this.el.querySelector(".ui-edit-section").innerHTML = ""
            this.el.querySelector(".ui-edit-section").appendChild(E1.cleanHtml(require("./actions.html")))
        })

        this.el.querySelector(".ui-export-button").addEventListener("mousedown", () => {
            this.recording = false
            this.export()
        })

        Object.keys(window).forEach(key => {
            if (/on/.test(key)) {
                window.addEventListener(key.slice(2), event => {
                    if (this.recording && event.srcElement !== this.el) {
                        if (event.type === "scroll") {
                            var scroll = {
                                el: window.document,
                                evt: event,
                                type: event.type,
                                time: new Date().getTime(),
                                scrollPosition: {
                                    x: window.scrollX,
                                    y: window.scrollY
                                }
                            }

                            if (this.pageActions[this.pageActions.length - 1] && this.pageActions[this.pageActions.length - 1].type === "scroll") {
                                this.pageActions[this.pageActions.length - 1] = scroll
                            } else {
                                this.pageActions.push(scroll)
                            }

                            E1.setModel(null, "@E1UiRecorderService.pageActions", this.pageActions)
                            return
                        }

                        if (this.eventsToWatch.indexOf(event.type) > -1 && event.srcElement.tagName && !this.el.contains(event.srcElement)) {

                            var selector = `${event.srcElement.tagName.toLowerCase()}`
                            var index = 0
                            var els = window.document.querySelectorAll(selector)

                            if (els.length > 1) {
                                for (var i = 0; i < els.length; i++) {
                                    if (els[i] === event.srcElement) {
                                        index = i
                                        break
                                    }
                                }
                            }

                            var data = {
                                el: event.srcElement,
                                evt: event,
                                type: event.type,
                                time: new Date().getTime(),
                                selector: selector,
                                index: index,
                                value: event.srcElement.value
                            }

                            if (this.pageActions[this.pageActions.length - 1] && this.pageActions[this.pageActions.length - 1].type === event.type && this.pageActions[this.pageActions.length - 1].el === event.srcElement) {
                                this.pageActions[this.pageActions.length - 1] = data
                            } else {
                                this.pageActions.push(data)
                            }

                            E1.setModel(null, "@E1UiRecorderService.pageActions", this.pageActions)
                        }
                    }
                })
            }
        })

        E1.setModel(null, "@E1UiRecorderService.pageActions", this.pageActions)
        E1.setModel(null, "@E1UiRecorderService.delete", (index) => {
            this.pageActions.splice(index, 1)
            E1.setModel(null, "@E1UiRecorderService.pageActions", this.pageActions)
        })
        E1.setModel(null, "@E1UiRecorderService.highlight", (index) => {
            var action = this.pageActions[index]
            var elBox = action.el.getBoundingClientRect()
            var highlighter = this.el.querySelector(".ui-highlighter")

            highlighter.style.width = elBox.width + "px"
            highlighter.style.height = elBox.height + "px"
            highlighter.style.left = elBox.left + "px"
            highlighter.style.top = elBox.top + "px"
        })
        E1.setModel(null, "@E1UiRecorderService.unhighlight", () => {
            var highlighter = this.el.querySelector(".ui-highlighter")
            highlighter.style.width = "0px"
            highlighter.style.height = "0px"
            highlighter.style.left = "0px"
            highlighter.style.top = "0px"
        })
    }

    getPageActions() {
        var result = "var evt;"

        var lastType = ""
        var lastEl = null
        var lastTime = this.pageActions[0].time
        var times = []

        this.pageActions.forEach((action) => {

            if (action.type === "scroll") {
                result += `setTimeout(function(){
                    window.scrollTo(${action.scrollPosition.x}, ${action.scrollPosition.y});
                `
                times.push(action.time - lastTime)
                lastTime = action.time
                return
            }

            if (action.type === "input") {
                result += `setTimeout(function(){
                    window.document.querySelectorAll('${action.selector}')[${action.index}].value = "${action.value}"
                    evt = new Event( "input", {});
                    window.document.querySelectorAll('${action.selector}')[${action.index}].dispatchEvent(evt);
                `
                times.push(action.time - lastTime)
                lastTime = action.time
                return
            }

            times.push(action.time - lastTime)
            lastTime = action.time
            lastType = action.type
            lastEl = action.el

            var type = action.evt instanceof window.MouseEvent ? "MouseEvent" :
                action.evt instanceof window.KeyboardEvent ? "KeyboardEvent" :
                    action.evt instanceof window.WheelEvent ? "WheelEvent" :
                        "Event"

            var evtType = action.type === "mouseover" ? "mouseenter" : action.type === "mouseout" ? "mouseleave" : action.type

            result += `setTimeout(function(){
                evt = new ${type}( "${evtType}", {
                    bubbles: ${action.evt.bubbles},
                    cancelable: ${action.evt.cancelable},
                    clientX: ${action.evt.clientX},
                    clientY: ${action.evt.clientY},
                    layerX: ${action.evt.layerX},
                    layerY: ${action.evt.layerY},
                    pageX: ${action.evt.pageX},
                    pageY: ${action.evt.pageY},
                    x: ${action.evt.x},
                    y: ${action.evt.y},
                    screenX: ${action.evt.screenX},
                    screenY: ${action.evt.screenY},
                    which: ${action.evt.which}
                });
                window.document.querySelectorAll('${action.selector}')[${action.index}].dispatchEvent(evt);
                `
        })

        times.forEach(function (time) {
            result += `}, ${time})
            `
        })

        return result
    }

    export() {
        var playback = this.getPageActions()
        var file = new window.Blob([playback], { type: "text/javascript" })
        var a = window.document.createElement("a"),
            url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = "test.js";
        window.document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            window.document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    update() { }
}

E1.registerComponent("e1-ui-recorder", UiRecorder)