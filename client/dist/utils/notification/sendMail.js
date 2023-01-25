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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.default.GMAIL_USER,
        pass: config_1.default.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (to.length < 5 || subject.length < 1 || html.length < 1) {
            const errorMessage = to.length < 5 ? "recipient(to) not specified" : subject.length < 1 ? "subject not specified" : "html template not specified";
            throw new Error(errorMessage);
        }
        const response = yield transport.sendMail({
            from: config_1.default.FROM_ADMIN_EMAIL,
            to,
            subject,
            html,
        });
        return response;
    }
    catch (error) {
        throw (error);
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map