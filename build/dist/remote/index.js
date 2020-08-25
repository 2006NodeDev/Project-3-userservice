"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caliberBaseClient = void 0;
var axios_1 = __importDefault(require("axios"));
//an optional env for host address or localhost default
//this is the caliber IP (?)
var baseURL = 'http://34.82.182.44' || 'http://localhost:2006';
exports.caliberBaseClient = axios_1.default.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//# sourceMappingURL=index.js.map