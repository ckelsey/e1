// module.exports = {
//     'Demo test Google': function (client) {
//         console.log(client.Keys)
//         client
//             .url('http://www.google.com')
//             .waitForElementVisible('body', 1000)
//             .assert.title('Google')
//             .assert.visible('input[type="text"]')
//             .setValue('input[type="text"]', 'rembrandt van rijn')
//             .sendKeys('input[type="text"]', client.Keys.ENTER)
//             .waitForElementVisible('a[href="https://en.wikipedia.org/wiki/Rembrandt"]', 1000)
//             .assert.elementPresent('a[href="https://en.wikipedia.org/wiki/Rembrandt"]')
//             .end()
//     }
// }