var avalon = require('avalon')
require('./index')
window.vm = avalon.define({
    $id: 'test',
    config: {
        selectedIndex: 1
    }
})

//module.exports = avalon //现在调整了webpack.config.js不需要返回avalon
