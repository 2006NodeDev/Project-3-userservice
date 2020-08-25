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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var get_user_service_token_1 = require("./remote/auth0/get-user-service-token");
var patch_password_1 = require("./remote/auth0/patch-password");
var loggers_1 = require("./utils/loggers");
var patch_role_1 = require("./remote/auth0/patch-role");
var new_user_1 = require("./remote/auth0/new-user");
var login_1 = require("./remote/auth0/login");
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger.json';
var body_parser_1 = __importDefault(require("body-parser"));
var cors_filter_1 = require("./middleware/cors-filter");
var jwt_verification_1 = require("./middleware/jwt-verification");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var get_user_role_1 = require("./remote/auth0/get-user-role");
var userConverter_1 = require("./util/userConverter");
var roleConverter_1 = require("./util/roleConverter");
var associate_router_1 = require("./routers/associate-router");
var AuthenticationFailureError_1 = require("./errors/AuthenticationFailureError");
var verifyEmail_1 = require("./service/verifyEmail");
// import { auth0GetUserByEmail } from './remote/auth0/get-user-email';
// import { batchRouter } from './routers/batch-router';
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
// const jwtAuthz = require('express-jwt-authz');
app.use(express_1.default.json());
app.use(cors_filter_1.corsFilter);
var basePath = process.env['AC_BASE_PATH'] || '/user-service';
var basePathRouter = express_1.default.Router();
app.use(basePath, basePathRouter);
//health check! for load balancer and build
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
// const basePath = process.env['AC_BASE_PATH'] || ''
//For a route that needs authentication: include 'checkJwt' in the path
//For a route that needs permissions(scopes): include 'checkJwt, jwtAuthz([ 'read:messages' ])' to the path, similar to the roles array we used before
basePathRouter.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, userToken, result, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (!(!username || !password)) return [3 /*break*/, 1];
                next(new AuthenticationFailureError_1.AuthenticationFailureError());
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, login_1.auth0Login(username, password)];
            case 2:
                userToken = _a.sent();
                res.header('Authorization', "Bearer " + userToken.access_token);
                // let user = await auth0GetUser(userToken);
                // logger.debug(`the getUser result: ${user}`);
                loggers_1.logger.debug(userToken.scopes);
                result = jwt_decode_1.default(userToken.id_token);
                loggers_1.logger.debug(result);
                user = userConverter_1.userConverter(result);
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// app.use(checkJwt);
app.get('/getRole/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, role, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, get_user_role_1.auth0GetRole(id)];
            case 1:
                result = _a.sent();
                role = roleConverter_1.roleConverter(result);
                res.json(role);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                loggers_1.logger.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.patch('/updatePassword', function (req, res, next) {
    var _a = req.body, userId = _a.userId, password = _a.password;
    try {
        var update = patch_password_1.auth0UpdatePassword(userId, password);
        res.json(update);
    }
    catch (error) {
        loggers_1.logger.error('unable to update password');
        loggers_1.logger.error(error);
    }
});
app.patch('/updateRole', function (req, res, next) {
    var _a = req.body, currentUserId = _a.currentUserId, email = _a.email, role = _a.role;
    try {
        var update = patch_role_1.auth0UpdateRole(currentUserId, email, role);
        res.json(update);
    }
    catch (error) {
        loggers_1.logger.error(error);
    }
});
app.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, _b, preferredName, lastName, verifyEmail, newUser, register, error_2, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, _b = _a.user_metadata, preferredName = _b.preferredName, lastName = _b.lastName;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 9, , 10]);
                return [4 /*yield*/, verifyEmail_1.getEmails(email)];
            case 2:
                verifyEmail = _c.sent();
                loggers_1.logger.debug("Is email in caliber: " + verifyEmail);
                if (!(!email || !password)) return [3 /*break*/, 3];
                throw new Error('Please fill out all necessary fields');
            case 3:
                if (!(verifyEmail === false)) return [3 /*break*/, 4];
                throw new Error('You must use an email that is in Caliber.');
            case 4:
                newUser = {
                    email: email,
                    password: password,
                    user_metadata: { preferredName: preferredName, lastName: lastName },
                };
                newUser.user_metadata.preferredName = newUser.user_metadata.preferredName;
                newUser.user_metadata.lastName = newUser.user_metadata.lastName;
                _c.label = 5;
            case 5:
                _c.trys.push([5, 7, , 8]);
                return [4 /*yield*/, new_user_1.auth0CreateNewUser(newUser)];
            case 6:
                register = _c.sent();
                res.json(register);
                return [3 /*break*/, 8];
            case 7:
                error_2 = _c.sent();
                loggers_1.logger.error(error_2);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_3 = _c.sent();
                loggers_1.logger.error(error_3);
                next(error_3);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
basePathRouter.use(jwt_verification_1.checkJwt);
basePathRouter.get('/getRole/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, role, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, get_user_role_1.auth0GetRole(id)];
            case 1:
                result = _a.sent();
                role = roleConverter_1.roleConverter(result);
                res.json(role);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                loggers_1.logger.error(error_4);
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
basePathRouter.patch('/updatePassword', function (req, res, next) {
    var _a = req.body, userId = _a.userId, password = _a.password;
    try {
        var update = patch_password_1.auth0UpdatePassword(userId, password);
        res.json(update);
    }
    catch (error) {
        loggers_1.logger.error('unable to update password');
        loggers_1.logger.error(error);
        next(error);
    }
});
basePathRouter.patch('/updateRole', function (req, res, next) {
    var _a = req.body, currentUserId = _a.currentUserId, userId = _a.userId, role = _a.role;
    try {
        var update = patch_role_1.auth0UpdateRole(currentUserId, userId, role);
        res.json(update);
    }
    catch (error) {
        loggers_1.logger.error(error);
        next(error);
    }
});
// basePathRouter.use(corsFilter)
// app.use('/batches', batchRouter);
basePathRouter.use('/associates', associate_router_1.associateRouter);
app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
        loggers_1.logger.error(err);
    }
    else {
        loggers_1.logger.error(err);
        loggers_1.errorLogger.error(err);
        res.status(500).send('Something Went Wrong');
    }
});
// app.get('/health', (req:Request, res:Response)=>{
//     res.sendStatus(200);
// })
app.listen(2006, function () {
    get_user_service_token_1.auth0GetUserServiceToken();
    // app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    loggers_1.logger.info('Server has started!');
});
process.on('uncaughtException', function (err) {
    loggers_1.logger.fatal("Uncaught Exception: " + err.message + " " + err.stack);
    loggers_1.errorLogger.fatal("Uncaught Exception: " + err.message + " " + err.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map