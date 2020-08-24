"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserServiceJWT = exports.auth0BaseClient = void 0;
var axios_1 = __importDefault(require("axios"));
var baseURL = 'https://revature-net.us.auth0.com';
var userServiceJWT;
/*
 * This functions sets the Auth0 Base Client,
 * our connection to the Auth0 API.
 */
exports.auth0BaseClient = axios_1.default.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});
/*
 * This function updates user token for each user.
 */
function updateUserServiceJWT(newToken) {
    userServiceJWT = newToken;
}
exports.updateUserServiceJWT = updateUserServiceJWT;
/*
 * This function modifies every request that goes out from this client,
 * so that if we are not sending a request to get a new token, we add
 * on our Authorization token, then return the config after our modifications.
 */
exports.auth0BaseClient.interceptors.request.use(function (config) {
    if (config.url != '/oauth/token') {
        config.headers.Authorization = "Bearer " + userServiceJWT;
    }
    return config;
});
//# sourceMappingURL=index.js.map