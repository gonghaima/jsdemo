module.exports = {
    rollDice: function () {
        return Math.ceil(Math.random() * 6);
    },
    extend: function (object, extend) {

        var prop;

        for (prop in extend) {
            if (extend.hasOwnProperty(prop)) {
                object[prop] = object[prop] || extend[prop];
            }
        }

        return object;
    },
    repeat: function (callback, scope, timeout) {

        if (callback && typeof callback !== 'function') {
            throw new Error('repeat callback method is not a function');
        }

        return setInterval(function () {
            callback.call(scope);
        }, timeout);
    }
};