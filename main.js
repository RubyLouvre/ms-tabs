var avalon = require('./avalon')
require('./index')
window.vm = avalon.define({
    $id: 'test',
    config: {
        selectedIndex: 1
    }
})

module.exports = avalon //注意这里必须返回avalon,用于webpack output配置
