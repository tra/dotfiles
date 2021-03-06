'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('-webkit-mask-position', v);
    },
    get: function () {
        return this.getPropertyValue('-webkit-mask-position');
    },
    enumerable: true,
    configurable: true
};
