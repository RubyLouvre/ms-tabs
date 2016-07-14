var avalon = require('./avalon')
require('./style.scss')
avalon.component('ms-tabs', {
    template: require('./template.html'),
    defaults: {
        triggers: [111, 222, 333],
        panels: [],
        selectedIndex: 0,
        cbProxy: function (e, i) {
            if (typeof this.onSwitch === 'function') {
                var ret = this.onSwitch(e, i)
            }
            if (ret !== false) {
                this.selectedIndex = i
            }
        }
    }
})

module.exports = avalon