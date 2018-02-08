const E1 = require("../e1")

class AccordianToggle {
    constructor(el) {
        this.el = el
        this.el["e1-accordian-toggle-onUpdate"] = this.update
        this.setup()
    }

    setup(){
        var group = this.el.getAttribute("e1-accordian-toggle-group")

        this.el.addEventListener("click", ()=>{
            var contentSection = window.document.querySelector('[e1-accordian-toggle-group="'+group+'"][e1-accordian-content="'+this.el.getAttribute("e1-accordian-toggle")+'"]')
            var activeTab = window.document.querySelector('[e1-accordian-toggle-group="'+group+'"][e1-accordian-toggle].active-accordian')
            var activeContent = window.document.querySelector('[e1-accordian-toggle-group="'+group+'"][e1-accordian-content].active-accordian')
            
            if(contentSection){
                // contentSection.style.overflow = "hidden"
                // contentSection.style.maxHeight = contentSection.getBoundingClientRect().height + "px"
                contentSection.classList.add("active-accordian")
                this.el.classList.add("active-accordian")

                setTimeout(()=>{
                    contentSection.style.removeProperty("max-height")
                }, 3000)

                if(activeTab){
                    activeTab.classList.remove("active-accordian")
                }

                if(activeContent){
                    activeContent.classList.remove("active-accordian")
                }
            }
        })
    }

    update(){

    }
}

E1.registerAttribute("e1-accordian-toggle", AccordianToggle)

 // var tabs = this.el.querySelectorAll("[accordian-toggle]")
        // var contents = this.el.querySelectorAll("[accordian-content]")
        // var otherTabs = this.el.querySelectorAll("e1-accordian [accordian-toggle]")
        // var _otherTabs = []

        // for (var o = 0; o < otherTabs.length; o++) {
        //     _otherTabs.push(otherTabs[o])
        // }

        // var activate = (e) => {
        //     var index = 0

        //     for (var i = 0; i < tabs.length; i++) {
        //         if(tabs[i] === e.target || tabs[i].contains(e.target)){
        //             index = i
        //             break
        //         }
        //     }

        //     var activeTab = this.el.querySelector("[accordian-toggle].active")

        //     tabs[index].classList.add("active")

        //     if (activeTab) {
        //         activeTab.classList.remove("active")
        //     }

        //     var activeTabContent = this.el.querySelector("[accordian-content].active")

        //     contents[index].style.overflow = "hidden"
        //     var style = window.getComputedStyle(contents[index])
        //     var height = contents[index].getBoundingClientRect().height + parseInt(style.getPropertyValue("padding-top")) + parseInt(style.getPropertyValue("padding-bottom"))
        //     contents[index].style.height = height + "px"
        //     contents[index].style.opacity = 1
            

        //     setTimeout(()=>{
        //         contents[index].classList.add("active")
        //         contents[index].style.removeProperty("height")
        //         // contents[index].style.removeProperty("overflow")
        //         contents[index].style.removeProperty("opacity")
        //     }, 1000)

        //     if (activeTabContent) {
        //         setTimeout(()=>{
        //             activeTabContent.classList.remove("active")
        //         }, 1001)
        //     }
        // }

        // console.log(_otherTabs, this.el)

        // for (var i = 0; i < tabs.length; i++) {
        //     console.log(_otherTabs.indexOf(tabs[i]))
        //     // if(_otherTabs.indexOf(tabs[i]) === -1){
        //         tabs[i].addEventListener("click", activate)
        //     // }
        // }