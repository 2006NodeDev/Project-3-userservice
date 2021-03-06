"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0UpdateRole = void 0;
// import axios from 'axios';
var loggers_1 = require("../../utils/loggers");
var _1 = require(".");
var get_user_role_1 = require("./get-user-role");
var get_user_email_1 = require("./get-user-email");
// import { auth0GetRole } from './get-user-role';
// export class Auth0User{
//     id!:string
//     name!:string
//     description!:string
//     sources!:any[]
// }
function auth0UpdateRole(currentUserId, id, role) {
    return __awaiter(this, void 0, void 0, function () {
        var currentUserRole, UserId, user, associateRoleId, trainerRoleId, adminRoleId, roleId, body1, body2, result, bodyMetadata, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_user_role_1.auth0GetRole(currentUserId)]; //currentUser Id    
                case 1:
                    currentUserRole = _a.sent() //currentUser Id    
                    ;
                    return [4 /*yield*/, get_user_email_1.auth0GetUserByEmail(id)];
                case 2:
                    UserId = _a.sent();
                    user = "auth0|" + UserId;
                    if (!currentUserRole || currentUserRole.name != "Admin") {
                        loggers_1.logger.error("Unauthorized");
                        throw new Error('Unauthorized');
                    }
                    associateRoleId = "rol_CYmNl4fBaIKxFT8Y";
                    trainerRoleId = "rol_N4hP8nXeE5QgxYHf";
                    adminRoleId = "rol_feLElhAtqbyRRgeq";
                    roleId = '';
                    switch (role) {
                        case 'Associate':
                            roleId = associateRoleId;
                            break;
                        case 'Trainer':
                            roleId = trainerRoleId;
                            break;
                        case 'Admin':
                            roleId = adminRoleId;
                            break;
                        default:
                            loggers_1.logger.error("No matching role found");
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    body1 = {
                        data: { "roles": [associateRoleId, trainerRoleId, adminRoleId] }
                    };
                    return [4 /*yield*/, _1.auth0BaseClient.delete("/api/v2/users/" + user + "/roles", body1)];
                case 4:
                    _a.sent(); //weired
                    body2 = {
                        "roles": [roleId]
                    };
                    return [4 /*yield*/, _1.auth0BaseClient.post("/api/v2/users/" + user + "/roles", body2)];
                case 5:
                    result = _a.sent();
                    loggers_1.logger.debug(body2);
                    bodyMetadata = {
                        app_metadata: {
                            role: {
                                role: role,
                                role_id: roleId
                            }
                        }
                    };
                    return [4 /*yield*/, _1.auth0BaseClient.patch("/api/v2/users/" + user, bodyMetadata)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, result];
                case 7:
                    error_1 = _a.sent();
                    loggers_1.logger.error(error_1);
                    throw new Error(error_1);
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.auth0UpdateRole = auth0UpdateRole;
// var request = require("request");
// var options = {
//   method: 'POST',
//   url: 'https://YOUR_DOMAIN/api/v2/users/USER_ID/roles',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer MGMT_API_ACCESS_TOKEN',
//     'cache-control': 'no-cache'
//   },
//   body: {roles: ['ROLE_ID', 'ROLE_ID']},
//   json: true
// };
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(body);
// });
//# sourceMappingURL=patch-role.js.map