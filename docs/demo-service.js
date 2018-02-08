class DemoService {
    constructor() {
        this.alertMessage = "alert('This has bound href and onclick attributes')"
        this.link = "https://google.com"
        this.repeatObject = [{
            name: "Joe",
            fruit: "bananas",
            count: 2
        }, {
            name: "Sally",
            fruit: "strawberries",
            count: 30
        }, {
            name: "Billy",
            fruit: "blueberries",
            count: 50
        }, {
            name: "Jack",
            fruit: "blueberries",
            count: 10
        }, {
            name: "Jill",
            fruit: "bananas",
            count: 10
        }]

        this.dropdown = {
            label: "Hello dropdown",
            list: [
                `<a onclick="alert('one')">One</a>`,
                `<a onclick="alert('two')">Two</a>`,
                `<a onclick="alert('three')">Three</a>`
            ]
        }

        this.select = {
            label: "Select an option",
            value: {
                label: "Option 1",
                value:1
            },
            options: [{
                label: "All",
                value:0
            },{
                label: "Option 1",
                value:1
            },{
                label: "Option 2",
                value:2
            },{
                label: "Option 3",
                value:3
            }],
            onselect: (v,e)=>{
                console.log(v,e)
            }
        }

        this.searchResults = []
        this.searchPaths = "name, fruit"
        this.searchLabel = "Search"
        this.searchValue = null

        this.e1Value = "<span>Hey, bound text <i>and</i>, <b>bound HTML</b></span>"
        this.e1ClassString = "blue"
        this.e1ClassString2 = "bold"
        this.styles = ".blue{ color: #1a4977 } .bold{ font-weight: bold }"
        this.trueFalse = false
        this.trueFalse2 = false
        this.trueFalse3 = false
        this.trueFalse4 = false
        this.ifContent = '<span e1-test e1-content="<span>Outer value is true <span e1-if=\'@demoService.trueFalse4\'>, inner value is true</span></span>"></span>'
    }
}

window.E1.registerService("demoService", new DemoService())