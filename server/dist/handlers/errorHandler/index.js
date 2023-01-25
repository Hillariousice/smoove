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
exports.errorRouterHandler = exports.errorHandler = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(error);
    res.status(error.code || 500).json({
        code: error.code || 500,
        error: error.message || "Something Went Wrong",
    });
});
exports.errorHandler = errorHandler;
exports.errorRouterHandler = express_1.default.Router();
exports.errorRouterHandler.all("/*", () => {
    throw { code: 404, message: "End of Page" };
});
//# sourceMappingURL=index.js.map