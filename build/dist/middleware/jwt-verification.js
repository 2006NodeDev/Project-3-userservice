"use strict";
// Authentication middleware. When used, the
// Access Token must exist and be verified against
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var express_jwt_1 = __importDefault(require("express-jwt"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
// the Auth0 JSON Web Key Set
exports.checkJwt = express_jwt_1.default({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://revature-net.us.auth0.com/.well-known/jwks.json"
    }),
    // Validate the audience and the issuer.
    audience: 'http://companion.revature.net',
    issuer: "https://revature-net.us.auth0.com/",
    algorithms: ['RS256']
});
//# sourceMappingURL=jwt-verification.js.map