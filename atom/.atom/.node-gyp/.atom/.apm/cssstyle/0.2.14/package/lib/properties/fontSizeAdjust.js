'use strict';

module.exports.definition = {
    set: function (v) {
        this.setProperty('font-size-adjust', v);
    },
    get: function () {
        return this.getPropertyValue('font-size-adjust');
    },
    enumerable: true,
    configurable: true
};
