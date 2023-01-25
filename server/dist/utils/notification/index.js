"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passworTemplate = exports.sendEmail = exports.welcomeEmail = void 0;
const welcomeEmail_1 = __importDefault(require("./emailTemplate/welcomeEmail"));
exports.welcomeEmail = welcomeEmail_1.default;
const resetPassword_1 = require("./ResetPassword/resetPassword");
Object.defineProperty(exports, "passworTemplate", { enumerable: true, get: function () { return resetPassword_1.passworTemplate; } });
const sendMail_1 = require("./sendMail");
Object.defineProperty(exports, "sendEmail", { enumerable: true, get: function () { return sendMail_1.sendEmail; } });
//# sourceMappingURL=index.js.map