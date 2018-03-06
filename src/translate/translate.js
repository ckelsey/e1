const E1 = require(`../e1`)

class TranslationService {

    constructor() {
        this.strings = {}
        this.locale = `en`
        this.locales = [
            `en`
        ]
        this.serviceUrl = null

        var fetchTimer = null
        var lastUpdate = null

        E1.subscribe(`@TranslationService.locale`, (res) => {
            for (var s in this.strings) {
                if (this.strings[s]) {
                    this.strings[s].default = this.strings[s][res]
                }
            }

            E1.setModel(null, `@TranslationService.strings`, this.strings)
            window.localStorage.setItem(`e1Locale`, res)
        })

        E1.subscribe(`@TranslationService.strings`, () => {

            clearTimeout(fetchTimer)

            fetchTimer = setTimeout(() => {
                if (lastUpdate && new Date().getTime() - lastUpdate < 1000) {
                    return
                }

                this.updateTranslations()

            }, 1000)
        })

        if (window.localStorage.getItem(`e1Locale`)) {
            this.locale = window.localStorage.getItem(`e1Locale`)
        }

        if (window.localStorage.getItem(`e1Translations`)) {
            var data = JSON.parse(window.localStorage.getItem(`e1Translations`))

            if (new Date().getTime() < data.expires) {

                this.strings = data.strings
            }
        }
    }

    get(key) {
        return E1.getThis(E1.services.TranslationService.strings, `${key}.${this.locale}`, key)
    }

    getTranslation(key, code) {
        return new Promise((resolve, reject) => {

            if (code === `en`) {
                return resolve(key)
            }

            if (!this.serviceUrl) {
                return resolve(key)
            }

            var url = `${this.serviceUrl}${this.serviceUrl.indexOf(`?`) > -1 ? "&" : "?"}q=${key}&source=en&target=${code}`

            var response = () => {
                try {
                    var res = JSON.parse(req.responseText)
                    resolve(res.translation)
                } catch (error) {
                    return reject()
                }
            }

            var req = new window.XMLHttpRequest()
            req.addEventListener(`load`, response)
            req.open(`GET`, url)
            req.send()
        })
    }

    updateTranslations() {
        var checkIfDone = () => {
            var done = true

            for (var s in this.strings) {
                if (this.strings[s] && this.strings[s].completed !== this.locales.length) {
                    done = false
                    break
                }
            }

            if (done) {
                E1.setModel(null, `@TranslationService.strings`, this.strings)
                window.localStorage.setItem(`e1Translations`, JSON.stringify({ expires: new Date().getTime() + 3600000, strings: this.strings }))
            }
        }

        var getTranslations = (s) => {
            this.locales.forEach((code) => {
                if (!this.strings[s][code]) {
                    this.getTranslation(this.strings[s].en, code).then((translation) => {
                        this.strings[s][code] = translation
                        this.strings[s].completed++
                        checkIfDone()
                    }, () => {
                        this.strings[s][code] = this.strings[s].default
                        this.strings[s].completed++
                        checkIfDone()
                    })
                } else {
                    this.strings[s].completed++
                    checkIfDone()
                }
            })
        }

        for (var s in this.strings) {
            if (this.strings[s]) {

                if (!this.strings[s].completed) {
                    this.strings[s].completed = 0
                }

                getTranslations(s)
            }
        }
    }

    setLocales(locales) {
        E1.setModel(null, `@TranslationService.locales`, locales)
        this.updateTranslations()
    }
}

E1.registerService(`TranslationService`, new TranslationService())










class E1Translate {
    constructor(el) {
        this.el = el
        this.el[`e1-translate`] = this.update
        this.el.translationKey = this.el.textContent.split(`.`).join(`&period;`)

        if (!this.el.getAttribute(`e1-translate`)) {
            this.el.setAttribute(`e1-translate`, `@TranslationService.strings.${this.el.translationKey}.default`)
            E1.setModel(null, `@TranslationService.strings.${this.el.translationKey}.en`, this.el.textContent)
            E1.setModel(null, `@TranslationService.strings.${this.el.translationKey}.default`, this.el.textContent)
            var newEl = this.el.cloneNode(true)
            this.el.parentNode.insertBefore(newEl, this.el)
            this.el.parentNode.removeChild(this.el)
        } else {
            this.update()
        }
    }

    update() {
        this.el.innerHTML = ``
        this.el.appendChild(E1.cleanHtml(`<span>${E1.services.TranslationService.get(this.el.translationKey)}</span>`))
    }
}

E1.registerAttribute(`e1-translate`, E1Translate)