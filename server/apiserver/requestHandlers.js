/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;



var verification = require('./handlers/verification');
requestHandlers.verification = function (request, response, pathObject, data) {
    var operation = pathObject["operation"];
    if (operation == "get") {
        verification.get(data, response);
    }else if (operation == "auth") {
        verification.auth(data, response);
    }
};


module.exports = requestHandlers;