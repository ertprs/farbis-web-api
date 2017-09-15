var constants = require('.././util/constants');

class views {
    static viewFile(viewName) {
        return constants.dirname + '/views/' + viewName;
    }

    static anotherMethod () {
        console.log('Doing anotherMethod');
    }
}

module.exports = views;
