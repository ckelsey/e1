

exports.command = (file1, file2, callback) => {
    var self = this
    var fs = require('fs')
    var pixelmatch = require('pixelmatch')

    this.compare = function () {
        var img1 = fs.readFile('test.jpg', doneReading),
            img2 = fs.readFile('tests/imgs/screenshot.jpg', doneReading),
            datas = [];

        function doneReading(err, data) {
            datas.push(data)

            if (datas.length === 2) {
                compare()
            }
        }

        function compare() {
            var result = pixelmatch(datas[0], datas[1], null, 400, 236)
            callback.call(self, result)
        }
    }

    this.compare()

    return this
}