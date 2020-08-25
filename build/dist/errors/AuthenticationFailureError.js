"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFailureError = void 0;
var HTTPError_1 = require("./HTTPError");
var AuthenticationFailureError = /** @class */ (function (_super) {
    __extends(AuthenticationFailureError, _super);
    function AuthenticationFailureError() {
        return _super.call(this, 400, 'Invalid Credentials') || this;
    }
    return AuthenticationFailureError;
}(HTTPError_1.HttpError));
exports.AuthenticationFailureError = AuthenticationFailureError;
//# sourceMappingURL=AuthenticationFailureError.js.map