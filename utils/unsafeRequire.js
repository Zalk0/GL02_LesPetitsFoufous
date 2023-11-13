let unsafeRequire = function (m, stub) {
    let module;
    try {
        module = require("." + m);
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            //throw e;
            module = stub;
        }
    }

    return module;
}
module.exports = unsafeRequire;
