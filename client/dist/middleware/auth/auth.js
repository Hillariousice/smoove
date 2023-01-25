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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Premium = exports.auth = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../../model");
const config_1 = __importDefault(require("../../config"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.protect = protect;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw {
                code: 401,
                message: "Not Authorised",
            };
        }
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, config_1.default.APP_SECRETE);
        if (!verified)
            throw { code: 401, message: "Not Authorised" };
        const { id } = verified;
        const user = (yield model_1.UserInstance.findOne({
            where: { id: id },
        }));
        if (!user)
            throw { code: 400, message: "Invalide Credentials" };
        if (!user.verified)
            throw { code: 400, message: "Account Not Activated" };
        if (!verified.isLoggedIn)
            throw { code: 400, message: "Not Authenticated" };
        req.user = verified;
        next();
    }
    catch (error) {
        next({ code: 400, message: error.message });
    }
});
exports.auth = auth;
const Premium = (req, res, next) => { };
exports.Premium = Premium;
//# sourceMappingURL=auth.js.map