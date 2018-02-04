class DemoService{
    constructor(){
        this.dropdown = {
            label: "Hello dropdown",
            list: [
                `<a onclick="alert('one')">One</a>`,
                `<a onclick="alert('two')">Two</a>`,
                `<a onclick="alert('three')">Three</a>`
            ]
        }
    
        this.e1Value = "Hey, bound text"
        this.e1ClassString = "blue"
        this.e1ClassString2 = "bold"
        this.styles = ".blue{ color: #1a4977 } .bold{ font-weight: bold }"
        this.trueFalse = false
        this.trueFalse2 = false
        this.ifContent = '<span e1-test e1-content="Outer value is true <span e1-if=\'@demoService.trueFalse2\'>, inner value is true</span>"></span>'
    }
}

window.E1.registerService("demoService", new DemoService())