import E1 from "../e1"

class E1SocialButtons {
    constructor(el) {
        this.el = el
        this.update = this.update

        this.el.innerHTML = '<div class="share"></div>'

        this.update()
    }

    open() {
        this.el.classList.toggle("tooltip-active")
    }

    update() {
        var components = E1.getModel(this.el, "components")
        var url = E1.getModel(this.el, "url")
        var text = E1.getModel(this.el, "text")
        var hashtags = E1.getModel(this.el, "hashtags")

        if (!components) {
            return
        }

        if (typeof components === "string") {
            components = components.split(",").map(function (component) { return component.trim() })
        }

        var html = '<div class="share">'

        var generate = (type, onclick) => {
            html += '<div class="share-button ' + type + '"><a class="icon-wrapper" onclick="' + onclick + '"><e1-icon type="' + type + '"></e1-icon></a></div>'
        }

        components.forEach( (component) =>{
            var elBtn

            switch (component) {
                case "facebook":
                    generate("facebook", "window.open('https://www.facebook.com/sharer/sharer.php?u=" + url + "&src=sdkpreparse', null, 'menubar=no,width=600,height=300')")
                    break

                case "twitter":
                    var params = []

                    if (text) {
                        text = "text=" + text
                        params.push(text)
                    }

                    if (hashtags) {
                        hashtags = "hashtags=" + hashtags
                        params.push(hashtags)
                    }

                    if (params.length) {
                        params = params.join("&") + "&"
                    } else {
                        params = ""
                    }

                    elBtn = generate("twitter", "window.open('https://twitter.com/share?" + params + "via=NVIDIAGeForce&url=" + encodeURIComponent(url) + "', null, 'menubar=no,width=600,height=300')")
                    break

                case "weibo":
                    elBtn = generate("weibo", "window.open('http://service.weibo.com/share/share.php?url=" + encodeURIComponent(url) + "&title=" + window.document.title + "', null, 'menubar=no,width=600,height=300')")
                    break
            }
        })

        html += '</div>'

        this.el.appendChild(E1.cleanHtml(html))

    }
}

E1.registerComponent("e1-social-buttons", E1SocialButtons)