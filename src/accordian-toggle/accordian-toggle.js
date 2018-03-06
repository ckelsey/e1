class AccordianToggle {
    constructor(el) {
        this.el = el
        this.el[`e1-accordian-toggle-onUpdate`] = this.update
        this.setup()
    }

    setup() {
        var group = this.el.getAttribute(`e1-accordian-toggle-group`)

        this.el.addEventListener(`mouseup`, () => {
            var contentSection = window.document.querySelector(`[e1-accordian-toggle-group="${group}"][e1-accordian-content="${this.el.getAttribute(`e1-accordian-toggle`)}"]`)
            var activeTab = window.document.querySelector(`[e1-accordian-toggle-group="${group}"][e1-accordian-toggle].active-accordian`)
            var activeContent = window.document.querySelector(`[e1-accordian-toggle-group="${group}"][e1-accordian-content].active-accordian`)

            if (contentSection) {
                contentSection.classList.add(`active-accordian`)
                this.el.classList.add(`active-accordian`)

                setTimeout(() => {
                    contentSection.style.removeProperty(`max-height`)
                }, 3000)

                if (activeTab) {
                    activeTab.classList.remove(`active-accordian`)
                }

                if (activeContent) {
                    activeContent.classList.remove(`active-accordian`)
                }
            }
        })
    }

    update() { }
}

import E1 from "../e1"

E1.registerAttribute(`e1-accordian-toggle`, AccordianToggle)