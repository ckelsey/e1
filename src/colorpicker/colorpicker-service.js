const E1 = require("../e1")

class ColorPickerService {

    constructor() {
        this.hues = [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 5, 15, 25, 35, 45, 55, 65] // 36 values of hue degrees used on the color wheel background
        this.formats = ["HSL", "HEX", "RGB"]
        this.pickers = {}
    }

    hueLightFromPoint(e, wheel) {
        /* Get color wheel dimensions */
        var rect = wheel.getBoundingClientRect()
        var radius = rect.width / 2
        var left = rect.left
        var top = rect.top

        /* Color wheel center points */
        var cx = radius + left
        var cy = radius + top

        /* Mouse position distance from color wheel center */
        var dx = e.pageX - cx
        var dy = e.pageY - cy

        /* Hue degrees */
        var angle = Math.atan2(dy, dx) * (180 / Math.PI)
        var degrees = angle
        if (degrees < 0) {
            degrees = degrees + 360
        }

        /* Lightness */
        var absoluteX = Math.abs(dx)
        var absoluteY = Math.abs(dy)
        var lightness = Math.round(100 - ((Math.sqrt((absoluteX * absoluteX) + (absoluteY * absoluteY)) * 100) / radius))

        return {
            h: (Math.round(degrees) > -1 || Math.round(degrees) < 360) ? Math.round(degrees) : 0,
            l: lightness > -1 ? lightness < 101 ? lightness : 100 : 0
        }
    }

    radialXY(h, l, wheel) {
        /* Get color wheel dimensions */
        var rect = wheel.getBoundingClientRect()
        var outerRadius = rect.width / 2
        var radius = outerRadius * ((100 - l) / 100)
        var degrees = h
        var x = outerRadius + (radius * Math.cos(degrees * Math.PI / 180))
        var y = (outerRadius * 2) - (outerRadius + -(radius * Math.sin(degrees * Math.PI / 180)))

        return {
            x: x,
            y: y
        }
    }

    validHex(data) {
        var chars = data.split('')

        if (chars[0] === '#') {
            chars.shift()
        }

        if (chars.length === 3) {
            chars = chars.concat(chars)
        }

        data = '#' + chars.join('')

        return data
    }

    getFormat(str) {
        if (str.indexOf('#') > -1) {
            return "hex"
        }

        if (str.indexOf('hsla') > -1) {
            return "hsla"
        }

        if (str.indexOf('hsl') > -1) {
            return "hsl"
        }

        if (str.indexOf('rgba') > -1) {
            return "rgba"
        }

        if (str.indexOf('rgb') > -1) {
            return "rgb"
        }

        if (str.indexOf('transparent') > -1) {
            return "transparent"
        }

        return null
    }

    /* Converts any str to all possible values */
    convert(str) {

        var result, type = this.getFormat(str)

        switch (type) {
            case "hex":
                str = this.validHex(str)
                result = this.hexToRgb(str)
                result = Object.assign(result, this.rgbToHsl(result))
                result.a = result.a || 1
                result.hex = str

                return result

            case "hsla":
                str = str.split('(')[1]
                str = str.substring(0, str.length - 1)
                str = str.split(',')

                result = {
                    h: parseInt(str[0]),
                    s: parseInt(str[1]),
                    l: parseInt(str[2]),
                    a: parseFloat(str[3])
                }

                result = Object.assign(result, this.hslToRgb(result))
                result.hex = this.rgbToHex(result)

                return result

            case "hsl":
                str = str.split('(')[1]
                str = str.substring(0, str.length - 1)
                str = str.split(',')

                result = {
                    h: parseInt(str[0]),
                    s: parseInt(str[1]),
                    l: parseInt(str[2])
                }

                result = Object.assign(result, this.hslToRgb(result))
                result.a = 1
                result.hex = this.rgbToHex(result)

                return result

            case "rgba":
                str = str.split('(')[1]
                str = str.substring(0, str.length - 1)
                str = str.split(',')

                result = {
                    r: parseInt(str[0]),
                    g: parseInt(str[1]),
                    b: parseInt(str[2]),
                    a: parseFloat(str[3])
                }

                result = Object.assign(result, this.rgbToHsl(result))
                result.hex = this.rgbToHex(result)

                return result

            case "rgb":
                str = str.split('(')[1]
                str = str.substring(0, str.length - 1)
                str = str.split(',')

                result = {
                    r: parseInt(str[0]),
                    g: parseInt(str[1]),
                    b: parseInt(str[2])
                }

                result = Object.assign(result, this.rgbToHsl(result))
                result.a = 1
                result.hex = this.rgbToHex(result)

                return result

            default:
                return {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 0,
                    r: 0,
                    g: 0,
                    b: 0,
                    hex: "#000000"
                }
        }
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

        return result ? result.length === 4 ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: parseInt(result[4], 8) / 100
            } : null
    }

    rgbToHsl(rgb) {
        var r = rgb.r / 255
        var g = rgb.g / 255
        var b = rgb.b / 255
        var max = Math.max(r, g, b), min = Math.min(r, g, b)
        var h, s, l = (max + min) / 2

        if (max === min) {
            h = s = 0 // achromatic
        } else {
            var d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0)
                    break
                case g: h = (b - r) / d + 2
                    break
                case b: h = (r - g) / d + 4
                    break
            }
            h /= 6
        }

        if (isNaN(h)) {
            h = 0
        }

        return {
            h: (Math.round((h * 360) * 100)) / 100,
            s: (Math.round((s * 100) * 100)) / 100,
            l: (Math.round((l * 100) * 100)) / 100
        }
    }

    hslToRgb(hsl) {
        var h = hsl.h
        var s = hsl.s
        var l = hsl.l
        var r, g, b, m, c, x

        if (!isFinite(h)) { h = 0 }
        if (!isFinite(s)) { s = 0 }
        if (!isFinite(l)) { l = 0 }

        h /= 60
        if (h < 0) { h = 6 - (-h % 6) }
        h %= 6

        s = Math.max(0, Math.min(1, s / 100))
        l = Math.max(0, Math.min(1, l / 100))

        c = (1 - Math.abs((2 * l) - 1)) * s
        x = c * (1 - Math.abs((h % 2) - 1))

        if (h < 1) {
            r = c
            g = x
            b = 0
        } else if (h < 2) {
            r = x
            g = c
            b = 0
        } else if (h < 3) {
            r = 0
            g = c
            b = x
        } else if (h < 4) {
            r = 0
            g = x
            b = c
        } else if (h < 5) {
            r = x
            g = 0
            b = c
        } else {
            r = c
            g = 0
            b = x
        }

        m = l - c / 2
        r = Math.round((r + m) * 255)
        g = Math.round((g + m) * 255)
        b = Math.round((b + m) * 255)

        return { r: r, g: g, b: b }
    }

    intToHex(i) {
        var hex = parseInt(i).toString(16)
        return (hex.length < 2) ? "0" + hex : hex
    }

    rgbToHex(rgb) {
        var result = '#' + this.intToHex(rgb.r) + this.intToHex(rgb.g) + this.intToHex(rgb.b)

        if (rgb.hasOwnProperty("a") && rgb.a < 1) {
            result += this.intToHex(rgb.a * 255)
        }

        return result
    }

}

E1.registerService("ColorPickerService", new ColorPickerService())
