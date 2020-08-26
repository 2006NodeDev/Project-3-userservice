"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
var loggers_1 = require("../utils/loggers");
//same as lightly-burning
//when someone sends us a request, we want to log where they sent it from and what kind of a request they sent
function loggingMiddleware(req, res, next) {
    loggers_1.logger.debug(req.method + " Request from " + req.ip + " to " + req.path);
    next(); //tells function to move on to next matching piece of middleware
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging-middleware.js.map