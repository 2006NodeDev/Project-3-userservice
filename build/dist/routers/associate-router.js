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
exports.batchRouter = exports.associateRouter = void 0;
var express_1 = __importDefault(require("express"));
var get_all_associates_1 = require("../remote/associate/get-all-associates");
var get_current_batches_1 = require("../remote/batch/get-current-batches");
var get_associates_filter_skill_1 = require("../remote/associateFilter/get-associates-filter-skill");
var get_associate_filter_year_1 = require("../remote/associateFilter/get-associate-filter-year");
var get_associate_by_trainer_1 = require("../remote/associate/get-associate-by-trainer");
var get_skills_list_1 = require("../remote/batch/get-skills-list");
var get_associate_filter_quarter_1 = require("../remote/associateFilter/get-associate-filter-quarter");
exports.associateRouter = express_1.default.Router();
exports.batchRouter = express_1.default.Router();
// auth middleware goes here
// associatesRouter.use(authenticationMiddleware);
// associateRouter.get('/batches/:batchId', async (req:Request, res:Response, next:NextFunction) => {
//     let {batchId} = req.params;
//     try{
//         let user = await getAssociatesByBatchId(batchId)
//         res.json(user)
//     } catch (e){
//         next(e)
//     }
// })
exports.associateRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, get_all_associates_1.getAllAssociates()];
            case 1:
                user = _a.sent();
                res.json(user);
                console.log("return length = " + user.length);
                console.log(user[0].email);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.associateRouter.get('/currentBatches', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var batch, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("we hit the batch router!");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_current_batches_1.getCurrentBatches()];
            case 2:
                batch = _a.sent();
                res.json(batch);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                next(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.associateRouter.get('/skill/:skillname', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skillName, assocBySkill, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skillName = req.params.skillname;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_associates_filter_skill_1.getAssocBySkill(skillName)];
            case 2:
                assocBySkill = _a.sent();
                res.json(assocBySkill);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                next(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.associateRouter.get('/year/:yearValue', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var year, assocByYear, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                year = req.params.yearValue;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_associate_filter_year_1.getAssociatesWithYear(year)];
            case 2:
                assocByYear = _a.sent();
                console.log(assocByYear);
                res.json(assocByYear);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                next(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.associateRouter.get('/quarter/:quarterValue', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var quarter, assocByYear, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                quarter = req.params.quarterValue;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_associate_filter_quarter_1.getAssociateswithQuarter(quarter)];
            case 2:
                assocByYear = _a.sent();
                console.log(assocByYear);
                res.json(assocByYear);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                next(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//getBatchIdsByTrainer
//As a Trainer, I should be able to view the profiles of all 
//Associates across all my batches so that I can best accommodate
//the preferences of my Associates. 
// get associates by batch id
exports.associateRouter.get('/trainer/:trainerEmail', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var trainerEmail, batches, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainerEmail = req.params.trainerEmail;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_associate_by_trainer_1.getAssociatesByTrainer(trainerEmail)];
            case 2:
                batches = _a.sent();
                res.json(batches);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                next(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//gets the list of skills being taught by currently active batches
exports.associateRouter.get('/batch/skills', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, get_skills_list_1.getSkillsList()];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                next(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=associate-router.js.map