class DemoService {
    constructor() {

        this.edit = {
            text: "This is some editable text",
            save: (el) => {
                console.log(el.textContent)
            }
        }
        this.progress = {
            amount: 10,
            type: "circle",
            types: ["circle", "bar"],
            width: "50px",
            change: (val) => {

                if (val === "circle") {
                    E1.setModel(null, "@demoService.progress.width", "50px")
                } else {
                    E1.setModel(null, "@demoService.progress.width", "100%")
                }

                E1.setModel(null, "@demoService.progress.type", val)
            }
        }
        this.proximity = [{
            inProximity: () => {
                E1.setModel(null, "@demoService.proximity.0.isVisible", "true")
            },
            outProximity: () => {
                E1.setModel(null, "@demoService.proximity.0.isVisible", "false")
            },
            isVisible: "false"
        }, {
            inProximity: () => {
                E1.setModel(null, "@demoService.proximity.1.isVisible", "true")
            },
            outProximity: () => {
                E1.setModel(null, "@demoService.proximity.1.isVisible", "false")
            },
            isVisible: "false"
        }, {
            inProximity: () => {
                E1.setModel(null, "@demoService.proximity.2.isClose", "true")
            },
            outProximity: () => {
                E1.setModel(null, "@demoService.proximity.2.isClose", "false")
            },
            isClose: "false"
        }]
        this.imageData = {
            "itemPageUrl": "https:\/\/wwwdev.nvidia.com\/content\/nvidiaGDC\/products\/?m=V3sibyI6InRyZW5kaW5nU2NvwociLCJpwoMzNDh9",
            "socialPageUrl": "https:\/\/wwwdev.nvidia.com\/content\/nvidiaGDC\/products\/?m=V3siaSI6MzQ4fQ",
            "categoryPage": "\/content\/nvidiaGDC\/zz\/en_ZZ\/geforce\/shot-with-ansel?m=V3siYyI6IjkifQ",
            "authorUrl": "\/content\/nvidiaGDC\/zz\/en_ZZ\/geforce\/shot-with-ansel\/user?m=V3siYSI6IjExNTgwOTIwNcKHMDAyNDY0MCJ9",
            "gameUrl": "\/content\/nvidiaGDC\/zz\/en_ZZ\/geforce\/shot-with-ansel\/games?m=V3siZyI6NjB9",
            "thumbnail": "https:\/\/s3.amazonaws.com\/swgf.nvidia.com\/geforceimage\/115809205150024640\/348\/custom_thumbnail_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",
            "preview": "https:\/\/s3.amazonaws.com\/swgf.nvidia.com\/geforceimage\/115809205150024640\/348\/low_resolution_25_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",
            "image": "https:\/\/s3.amazonaws.com\/swgf.nvidia.com\/geforceimage\/115809205150024640\/348\/low_resolution_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",
            "category": "Screenshots",
            "categoryId": "9",
            "shareComponents": "facebook, twitter, weibo",
            "socialText": "Checkout my game photograph at",
            "hashTags": "SHOTWITHGEFORCE",
            "showItemActionText": "",
            "itemActionComponents": [
                "like",
                "bookmark",
                "share",
                "contest",
                "edit",
                "delete"
            ],
            "user": {
                "id": "115809205150024640",
                "name": "Ram Prasad",
                "email": "yprasad@nvidia.com"
            },
            "game": {
                "id": 60,
                "name": "ShooterGame",
                "description": "screenshot"
            },
            "formattedCreatedDate": "Jan 05, 2018",
            "trendingScore": 5,
            "createdDate": 1515171025000,
            "title": "rTest Ram Dev Upload - 5Jan2018",
            "id": 348,
            "views": 6600,
            "viewText": "66 \n            Views\n        ",
            "viewerId": "174046602571285228",
            "viewerAdmin": true,
            "viewerName": "ckcreates",
            "isLiked": 942,
            "likes": 11,
            "liked": true,
            "likeClass": "active",
            "likeIcon": "heart-filled",
            "bookmarkIcon": "bookmark",
            "bookmarkClass": "",
            "contestClass": "",
            "editClass": "",
            onlike: (el) => {
                console.log(el)
            },
            "commentUrl": "https:\/\/appdev.nvidia.com\/geforce\/cevo\/comment",
            "commentDelegate": "https:\/\/appdev.nvidia.com\/geforce\/cevo\/auth?sessionToken=eyJhbGciOiJIUzI1NiJ9.eyJkZCI6IklETU1pbmlTaXRlRGV2aWNlSWQiLCJzZCI6InBEN3I5UEJsOV8xNjgxNDE4MDAiLCJjZCI6IjE2MzkwMDEwNzgwNzI2MDg4OCIsInNlIjoiYXBpcWpfS1c5b0JTZDFHcExPeS11TGUwTGF3TFhGaVgiLCJpZCI6IjE3NDA0NjYwMjU3MTI4NTIyOCIsImV4cCI6MTUxOTExNjk3OSwicG0iOiJSZWFkV3JpdGVEZWxldGUifQ.-35tO5e_PpR0700vs9bo5Uwp69GD0HTc_AbeWafVw_A"
        }
        this.image = {
            type: "",
            url: "",
            preview: "",
            crop: true,
            options: [{
                label: "Super resolution",
                preview: "https://images.nvidia.com/ansel/images/ansel-images/Y2tsc3l0ZXN0ZXIyMTUwNzEyNjE4OTYzMjMzMTI1ODky_small.jpg",
                url: "https://images.nvidia.com/ansel/images/ansel-images/Y2tsc3l0ZXN0ZXIyMTUwNzEyNjE4OTYzMjMzMTI1ODky_large.jpg",
                type: "Super resolution"
            }, {
                label: "Screenshot",
                preview: "https://images.nvidia.com/ansel/images/ansel-images/cWFhZG1pbjE1MDc3NTUxNTc3ODc0NjQzMjU1_small.jpg",
                url: "https://images.nvidia.com/ansel/images/ansel-images/cWFhZG1pbjE1MDc3NTUxNTc3ODc0NjQzMjU1_large.jpg",
                type: "Screenshot"
            }, {
                label: "Stereo",
                preview: "https://images.nvidia.com/ansel/images/ansel-images/Um9oaXRHNzE1MTI0NDkxOTU5MDMyNzA1NTY1_small.jpg",
                url: "https://images.nvidia.com/ansel/images/ansel-images/Um9oaXRHNzE1MTI0NDkxOTU5MDMyNzA1NTY1_large.jpg",
                type: "Stereo"
            }, {
                label: "360mono",
                preview: "https://images.nvidia.com/ansel/images/ansel-images/YWR1bW15NTMyMTUxMjcxNzIwNzU5MDk0NjUwNjA_small.jpg",
                url: "https://images.nvidia.com/ansel/images/ansel-images/YWR1bW15NTMyMTUxMjcxNzIwNzU5MDk0NjUwNjA_vr.jpg",
                type: "360mono"
            }, {
                label: "360stereo",
                preview: "https://s3.amazonaws.com/cktestupload/small_360stereo2.jpg",
                url: "https://s3.amazonaws.com/cktestupload/large_360stereo2.jpg",
                type: "360stereo"
            }],

            onselect: (option) => {
                this.image.type = option.type
                this.image.url = option.url
                this.image.preview = option.preview

                E1.setModel(null, "@demoService.image", this.image)
            }
        }

        this.inputs = {
            onchange: function (inputs) {
                console.log(inputs)
            },
            searchValue: "",
            sortValue: {
                value: 1,
                label: "one"
            },
            filterValue: {
                value: 4,
                label: "four"
            },
            sortOptions: [{
                value: 1,
                label: "one"
            }, {
                value: 2,
                label: "two"
            }, {
                value: 3,
                label: "three"
            }],
            filterOptions: [{
                value: 4,
                label: "four"
            }, {
                value: 5,
                label: "five"
            }, {
                value: 6,
                label: "six"
            }]
        }

        this.share = {
            components: ["facebook", "twitter", "weibo"],
            url: "https://www.google.com",
            text: "Here is some text to pre-populate",
            hashtags: "e1, socialButtons"
        }

        this.message = {
            active: false,
            message: '<span style="display:block;font-weight:bold;font-size:21px;line-height:35px;">Error</span><span>Here is an error message</span>',
            icon: "!",
            type: "error",
            buttons: [{
                text: "close",
                click: "window.E1.setModel(null, '@demoService.message.active', false)"
            }]
        }

        this.tooltip = "Here's a tooltip"
        this.upload = {
            content: "An upload message. Drag files here or click to browse.",
            validator: (file) => {
                if (file.type !== "image/jpeg") {
                    alert("Only jpegs are valid!")
                }
            }
        }
        this.modal = {
            active: false,
            content: "<div><h2>Hi!</h2><p>You can add whatever content you heart desires here</p></div>"
        }
        this.alertMessage = "alert('This has bound href and onclick attributes')"
        this.link = "https://google.com"
        this.color = "#ca8500"
        this.color2 = "#008500"
        this.styleString = "color: blue; text-decoration: underline;"
        this.styleString2 = "font-size: 14px;"
        this.icon = {
            styles: "color: #ca8500;",
            value: {
                value: Object.keys(new E1.components["e1-icon"].service(null).templates)[0],
                label: Object.keys(new E1.components["e1-icon"].service(null).templates)[0]
            },
            options: Object.keys(new E1.components["e1-icon"].service(null).templates).map((o) => {
                return {
                    value: o,
                    label: o
                }
            })
        }
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
                `<a style="display: block;" onclick="alert('one')">One</a>`,
                `<a style="display: block;" onclick="alert('two')">Two</a>`,
                `<a style="display: block;" onclick="alert('three')">Three</a>`
            ],
            optionClicked: function (e, opt) {
                E1.setModel(null, "@demoService.dropdown.selected", opt.textContent)
            }
        }

        this.select = {
            label: "Select an option",
            value: {
                label: "Option 1",
                value: 1
            },
            options: [{
                label: "All",
                value: 0
            }, {
                label: "Option 1",
                value: 1
            }, {
                label: "Option 2",
                value: 2
            }, {
                label: "Option 3",
                value: 3
            }],
            onselect: (v, e) => {
                console.log(v, e)
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
        this.trueFalse5 = false
        this.trueFalse6 = false
        this.ifVal1 = 2
        this.ifVal2 = 3
        this.ifVal3 = "c"
        this.ifVal4 = "b"
        this.ifVal5 = 5
        this.ifContent = '<span e1-test e1-content="<span>Outer value is true <span e1-if=\'@demoService.trueFalse4\'>, inner value is true</span></span>"></span>'

        this.collapse = {
            target: "#collapse-target",
            width: 600
        }

        this.localeValue = "en"
        this.localeChange = (val) => {
            E1.setModel(null, "@TranslationService.locale", val)
        }

        this.locales = [{
            label: "en",
            value: "en"
        }, {
            label: "ru",
            value: "ru"
        }, {
            label: "de",
            value: "de"
        }, {
            label: "zh-CN",
            value: "zh-CN"
        }]

        this.page = {}

        this.utilities = [
            "e1-attribute",
            "e1-class",
            "e1-content",
            "e1-if",
            "e1-repeat",
            "e1-show",
            "e1-style",
            "e1-value"
        ]

        this.elements = [
            "e1-accordian-toggle",
            "e1-collapse",
            "e1-colorpicker",
            "e1-dropdown",
            "e1-edit",
            // "e1-filter",
            "e1-icon",
            "e1-image-viewer",
            "e1-message",
            "e1-modal",
            "e1-progress",
            "e1-proximity",
            "e1-search",
            "e1-social-buttons",
            "e1-select",
            "e1-short-number",
            "e1-tooltip",
            "e1-translate",
            "e1-upload-zone"
        ]

        this.init = () => {
            this.page.utilityDirectives = []

            this.utilities.forEach((utility) => {
                this.page.utilityDirectives.push(`<div e1-accordian-toggle="${utility}" e1-accordian-toggle-group="main">${utility}</div>`)
            })


            this.page.prebuiltDirectives = []

            this.elements.forEach((el) => {
                this.page.prebuiltDirectives.push(`<div e1-accordian-toggle="${el}" e1-accordian-toggle-group="main">${el}</div>`)
            })

            E1.setModel(null, "@demoService.page", this.page)

            var mainSection = window.document.getElementById("main-content")
            var allContent = this.utilities.concat(this.elements)
            var mainHtml = ""

            allContent.push("todo")
            allContent.push("tests")

            allContent.forEach(function (element) {
                mainHtml += `<div e1-accordian-content="${element}" e1-accordian-toggle-group="main"></div>`
            })

            mainSection.innerHTML = mainHtml

            var sections = window.document.querySelectorAll('[e1-accordian-toggle-group="main"][e1-accordian-content]')

            sections.forEach(function (section) {

                var req = new XMLHttpRequest()
                req.open("GET", section.getAttribute("e1-accordian-content") + ".html")

                req.addEventListener("load", function () {

                    section.innerHTML = "<div>" + this.responseText + "</div>"

                    var codeSection = section.querySelectorAll("code")
                    var demoEl = section.querySelectorAll("[demo-el]")

                    for (var i = 0; i < demoEl.length; i++) {
                        if (codeSection[i] && demoEl[i]) {
                            codeSection[i].innerHTML = Prism.highlight(demoEl[i].innerHTML.split("&amp;&amp;").join("&&").trim(), Prism.languages.html)
                        }
                    }
                })
                req.send()
            })
        }

        this.initTests = () => {

            mocha.run()
        }

        this.initE2e = () => {

            var file = window.location.search.split("?")[1].split("file=")[1].split("&")[0] + ".html"

            var req = new XMLHttpRequest()
            req.open("GET", file)

            req.addEventListener("load", function () {

                window.document.getElementById("main-content").innerHTML = "<div>" + this.responseText + "</div>"

            })
            req.send()
        }
    }
}

window.E1.registerService("demoService", new DemoService())